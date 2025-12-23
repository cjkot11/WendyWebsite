import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: "Wendy's Travel Blog",
  projectId: '798nmkhx',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool()],
  schema,
})
