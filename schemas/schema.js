// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
// Pages type schemas
import post from './documents/post'
import ctaPage from './documents/ctaPage'
import job from './documents/job'
import generalPage from './documents/page'
// Component schemas
import quote from './documents/quote'
// Other content schemas
import blogPostCategory from './category'
import partner from './documents/partner'

// Objects
import formField from './objects/formField'
import blockContent from './base/blockContent'
// import parentPost from './parentPost'
// import childPost from './childPost'
import author from './author'
import childSettings from './settings'

// const amSchema = [
//   post('am'),
// ]

// const wsSchema = [
//   post('ws'),
// ]

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    author,
    childSettings,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
    formField,
    
    // Documents
    post,
    ctaPage,
    job,
    generalPage,
    
    // Components
    quote,
    
    // Other content
    partner,
    blogPostCategory,
    
    // ...amSchema,
    // ...wsSchema,
  ]),
})
