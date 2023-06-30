import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {codeInput} from '@sanity/code-input'
import {sanitySchemaTypes} from 'content-models'

export default defineConfig({
  name: 'default',
  title: 'davidwitt.me',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: 'production',

  plugins: [deskTool(), visionTool(), codeInput()],

  schema: {
    types: sanitySchemaTypes,
  },
})
