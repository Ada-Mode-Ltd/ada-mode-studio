import { slugify } from "../../utils/schema"
import { client } from "../../utils/sanity"
import { industry, write, stack } from "../../utils/icons"

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
              // If publishTo is Ada Mode, show the following blocks
              {
                type: 'object',
                name: 'caseStudies',
                title: 'Case studies',
                icon: write,
                hidden: ({parent}) => parent.publishTo !== 'am',
                fields: [
                  {
                    name: 'title',
                    title: 'Title',
                    type: 'string',
                    initialValue: 'Our work'
                  },
                  {
                    name: 'showLatest',
                    title: 'Show latest',
                    type: 'boolean',
                    description: 'If checked, the latest 3 case studies will be shown. Otherwise, the case studies below will be shown.',
                  },
                  {
                    name: 'caseStudies',
                    title: 'Case studies',
                    type: 'array',
                    hidden: ({parent}) => parent.showLatest,
                    of: [
                      {
                        type: 'reference',
                        to: {type: 'caseStudy'},
                        title: 'Case study',
                      }
                    ],
                    validation: Rule => [
                      Rule.min(1)
                        .max(3)
                        .error('Required field with at least 1 and at most 3 entries.'),
                      Rule.unique()
                    ]
                  }, 
                ],
                preview: {
                  select: {
                    title: 'title',
                  },
                  prepare({title}) {
                    return {
                      title: title,
                      subtitle: 'Case studies',
                    }
                  }
              },
            },
              {
                type: 'object',
                name: 'industries',
                title: 'Industries',
                icon: industry,
                hidden: ({parent}) => parent.publishTo !== 'am',
                fields: [
                  {
                    name: 'title',
                    title: 'Title',
                    type: 'string',
                    initialValue: 'Industries we work with'
                  },
                  {
                    name: 'showAll',
                    title: 'Show all',
                    type: 'boolean',
                  },
                  {
                    name: 'industries',
                    title: 'Industries',
                    type: 'array',
                    hidden: ({parent}) => parent.showAll,
                    of: [
                      {
                        type: 'reference',
                        to: {type: 'industry'},
                        title: 'Industry',
                      }
                    ],
                    validation: Rule => Rule.custom((industries, context) => {
                      if (context.parent.showAll) {
                          return true;
                          }
                          if (!industries || industries.length === 0) {
                              return 'Required field with at least 1 entry.';
                              }})
                  }, 
                ],
                preview: {
                  select: {
                    title: 'title',
                  },
                  prepare({title}) {
                    return {
                      title: title || 'Industries',
                      subtitle: 'Industries',
                    }
                  }
              },
            },
              { type: 'careers' },
              { type: 'rowOfLogos' },
              { type: 'stackedTabs' },
              { type: 'comparison' },
              {
                name: 'accordion',
                title: 'Accordion',
                type: 'object',
                icon: stack,
                hidden: ({parent}) => parent.publishTo !== 'am',
                fields: [
                  {
                    name: 'title',
                    title: 'Title',
                    type: 'string',
                  },
                  {
                    name: 'list',
                    title: 'List',
                    type: 'array',
                    of: [
                      {
                        name: 'accordionItem',
                        title: 'Accordion item',
                        type: 'object',
                        fields: [
                          {
                            name: 'title',
                            title: 'Title',
                            type: 'string',
                          },
                          {
                            name: 'text',
                            title: 'Text',
                            type: 'text',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
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