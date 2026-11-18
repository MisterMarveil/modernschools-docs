import React from 'react';
import { useT } from './i18n';
import directory from '@site/src/data/openapi/directory-v1.json';

/**
 * Référence d'API générée depuis le contrat OpenAPI (cahier §19.1) :
 * openapi/*.yaml → src/data/openapi/*.json (tools/validate.mjs). Rien n'est
 * recopié à la main : la page suit toujours le contrat.
 */
type Spec = Record<string, any>;
const SPECS: Record<string, Spec> = { directory: directory as Spec };

function ref(spec: Spec, o: any): any {
  if (o && o.$ref) {
    return o.$ref.replace('#/', '').split('/').reduce((a: any, k: string) => a[k], spec);
  }
  return o;
}

function Schema({ spec, schema }: { spec: Spec; schema: any }) {
  const t = useT().api;
  const s = ref(spec, schema);
  if (!s) return null;
  if (s.type === 'array') return <>{t.arrayOf} <Schema spec={spec} schema={s.items} /></>;
  if (s.type === 'object' && s.properties) {
    return (
      <table className="ms-api__table">
        <thead><tr><th>{t.field}</th><th>{t.type}</th><th>{t.description}</th></tr></thead>
        <tbody>
          {Object.entries<any>(s.properties).map(([k, v]) => {
            const r = ref(spec, v);
            return (
              <tr key={k}>
                <td><code>{k}</code>{(s.required ?? []).includes(k) ? ' *' : ''}</td>
                <td>{r.$ref ? t.object : r.type}{r.enum ? <> : {r.enum.map((e: string) => <code key={e}>{e} </code>)}</> : null}{r.format ? ` (${r.format})` : ''}</td>
                <td>{r.description ?? (r.example !== undefined ? <>{t.example} <code>{String(r.example)}</code></> : null)}{v.$ref ? <code>{v.$ref.split('/').pop()}</code> : null}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  return <code>{s.type}</code>;
}

export default function ApiReference({ spec: name }: { spec: string }) {
  const t = useT().api;
  const spec = SPECS[name];
  if (!spec) return null;
  const server = spec.servers?.[0]?.url ?? '';
  return (
    <div className="ms-api">
      <p>{t.version} <code>{spec.info.version}</code> · {t.base} <code>{server}</code></p>
      {Object.entries<any>(spec.paths).map(([path, ops]) =>
        Object.entries<any>(ops).map(([method, op]) => (
          <section key={method + path} className="ms-api__op">
            <h3 id={`${method}-${path.replace(/[^a-z0-9]+/gi, '-')}`}>
              <span className={`ms-api__method ms-api__method--${method}`}>{method.toUpperCase()}</span> <code>{path}</code>
            </h3>
            <p>{op.summary}</p>
            {op.parameters?.length ? (
              <table className="ms-api__table">
                <thead><tr><th>{t.param}</th><th>{t.where}</th><th>{t.description}</th></tr></thead>
                <tbody>
                  {op.parameters.map((p: any) => (
                    <tr key={p.name}><td><code>{p.name}</code>{p.required ? ' *' : ''}</td><td>{p.in}</td><td>{p.description ?? ''} {p.schema?.maximum ? `(max. ${p.schema.maximum})` : ''}</td></tr>
                  ))}
                </tbody>
              </table>
            ) : null}
            {Object.entries<any>(op.responses).map(([code, r]) => {
              const resp = ref(spec, r);
              const schema = resp.content?.['application/json']?.schema;
              return (
                <div key={code} className="ms-api__resp">
                  <p><strong>{code}</strong> — {resp.description}</p>
                  {schema && code.startsWith('2') ? <Schema spec={spec} schema={schema} /> : null}
                </div>
              );
            })}
          </section>
        )),
      )}
      <h3 id="schema-school">{t.object} <code>School</code></h3>
      <Schema spec={spec} schema={{ $ref: '#/components/schemas/School' }} />
    </div>
  );
}
