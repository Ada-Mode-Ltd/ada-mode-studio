import { slugify } from "../../utils/schema"
import { client } from "../../utils/sanity"

async function isUniqueAcrossAllDocuments(slug, context) {
  const {document} = context
  const publishTo = document?.publishTo
  const id = document._id.replace(/^drafts\./, '')
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
  }
  const query = `!defined(*[!(_id in [$draft, $published]) && slug.current == $slug  && (publishTo == "${publishTo}" || "${publishTo}" in publishTo)][0]._id)`
  const result = await client.fetch(query, params)
  console.log('result', result)
  return result
}

export default {
    name: 'page',
    title: 'Page builder',
    type: 'document',
    groups: [
        {
            name: 'metadata',
            title: 'Metadata',
            default: true,
        }, 
        {
          name: 'publishing',
          title: 'Publishing details',
          // default: true,
        },
        {
            name: 'content',
            title: 'Content',
            // default: true,
          },
    ],
    fields: [
        {
            name: 'publishTo',
            title: 'Publish to',
            type: 'string',
            options: {
              list: [
                {title: 'Ada Mode', value: 'am'},
                {title: 'Windscope', value: 'ws'},
              ],
            },
            group: 'publishing',
            validation: Rule => [
              Rule.required()
            ],
          },
          {
            name: 'policyPage',
            title: 'Is policy page?',
            type: 'boolean',
            group: 'publishing',
            description: "If this is a policy page, it will have /policies/ added to the start of the URL path.",
            hidden: ({parent}) => parent.publishTo !== 'am',
          },
          {
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            group: 'publishing',
            initialValue: () => new Date().toISOString(),
            validation: Rule => [
              Rule.required()
            ],
            options: {
              dateFormat: 'DD-MMM-YYYY',
            }
          },
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            group: 'metadata',
            validation: Rule => [
              Rule.required()
            ]
          },
          {
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'This content will be used by search engines to display a description of the page.',
            group: 'metadata',
          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            group: 'metadata',
            options: {
              source: 'title',
              maxLength: 96,
              slugify: slugify,
              isUnique: isUniqueAcrossAllDocuments
            },
            validation: Rule => [
              Rule.required()
            ]
          },
          {
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
              { type: 'pageHeading' },
              { type: 'blockContent' },
              { type: 'sectionHeading' },
              { type: 'blockLayout' },
              { type: 'productFeatures' },
              { type: 'reference', to: { type: 'quote'}, title: 'Quote' },
              { type: 'quoteCarousel' },
              { type: 'people' },
              // { type: 'service' },
              { type: 'careers' },
              { type: 'rowOfLogos' },
              { type: 'stackedTabs' },
              { type: 'comparison' },
              { type: 'ctaSection' },
            ],
            group: 'content',
            validation: Rule => Rule.required().custom((blocks) => {
                const pageHeading = blocks.filter(block => block._type === 'pageHeading')
                if (pageHeading) {
                  if(blocks.findIndex(block => block._type === 'pageHeading') !== 0)
                  return 'Page heading must be the first block'
                }
                
                const quoteCarousels = blocks.filter(block => block._type === 'quoteCarousel')
                if (quoteCarousels?.length > 1) {
                  return 'Only one quote carousel is allowed per page'
                }

                return true
              }),
          },
    ],
    preview: {
        select: {
          title: 'title',
          description: 'description',
        },
        prepare(selection) {
          const {description} = selection
          return Object.assign({}, selection, {
            subtitle: description && `${description}`,
          })
        },
      },
}