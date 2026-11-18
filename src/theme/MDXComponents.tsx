import MDXComponents from '@theme-original/MDXComponents';
import * as Doc from '@site/src/components/Doc';
import ApiReference from '@site/src/components/ApiReference';
import Glossary from '@site/src/components/Glossary';

/** Composants disponibles dans tous les articles, sans import. */
export default {
  ...MDXComponents,
  ...Doc,
  ApiReference,
  Glossary,
};
