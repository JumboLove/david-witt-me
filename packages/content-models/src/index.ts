import * as concept from "./concept";
export * from "./concept";

import * as post from "./post";
export * from "./post";

import * as project from "./project";
export * from "./project";

import * as resource from "./resource";
export * from "./resource";

import * as resourceContent from "./resourceContent";
export * from "./resourceContent";

import * as tag from "./tag";
export * from "./tag";

import * as partial from "./partial";
export * from "./partial";

import * as blockContent from "./blockContent";
export * from "./blockContent";

import * as callout from "./blockContent/callout";
export * from "./blockContent/callout";

import * as image from "./blockContent/image";
export * from "./blockContent/image";

import * as figure from "./blockContent/figure";
export * from "./blockContent/figure";

import * as internalLink from "./blockContent/internalLink";
export * from "./blockContent/internalLink";

import * as codeBlock from "./blockContent/codeBlock";
export * from "./blockContent/codeBlock";

import * as embed from "./blockContent/embed";
export * from "./blockContent/embed";

import * as partialInclude from "./blockContent/partialInclude";
export * from "./blockContent/partialInclude";

// Export all Sanity Definitions, Zod Schemas, and Typescript Types

export const sanitySchemaTypes = [
  concept.conceptSanityDefinition,
  post.postSanityDefinition,
  project.projectSanityDefinition,
  resource.resourceSanityDefinition,
  resourceContent.resourceContentSanityDefinition,
  tag.tagSanityDefinition,
  blockContent.blockContentSanityDefinition,
  partial.partialSanityDefinition,
];
