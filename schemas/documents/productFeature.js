import { confetti  } from "../../utils/icons"
import { imageFields } from "../../utils/imageFields"
import { highlightBlue, highlightGreen } from "../../utils/icons";
import React from 'react';

const largeStatIcon = () => (
  <span style={{ fontWeight: 'bold' }}>20%</span>
)
const largeStatRender = props => (
  <span style={{ fontSize: '2rem' }}>{props.children}</span>
)

const renderHighlightBlue = props => <span style={{ color: '#2276fc' }}>{props.children}</span>
const renderHighlightGreen = props => <span style={{ color: '#2276fc' }}>{props.children}</span>

const validation = (featureType, parent) => parent.featureType === featureType ? true : false

export default {
    name: 'productFeature',
    title: 'Product feature',
    type: 'document',
    icon: confetti,
    fieldsets: [
      {
        name: 'large',
        title: 'Large',
        // options: { collapsible: true, collapsed: false },
        hidden: ({document}) => (document.featureType !== 'large'),
      },
      {
        name: 'medium',
        title: 'Medium',
        // options: { collapsible: true, collapsed: false },
        hidden: ({document}) => (document.featureType !== 'medium'),
      },
      {
        name: 'small',
        title: 'Small',
        // options: { collapsible: true, collapsed: false },
        hidden: ({document}) => (document.featureType !== 'small'),
      },
    ],
    fields: [
      {
        name: 'featureType',
        title: 'Feature type',
        type: 'string',
        initialValue: 'large',
    options: {
      list: [
        {title: 'Large', value: 'large'},
        {title: 'Medium', value: 'medium'},
        {title: 'Small', value: 'small'},
      ],
    },
    validation: Rule => [
      Rule.required()
    ]
  },
  {
    name: 'product',
    title: 'Product',
    type: 'reference',
    to: [{ type: 'product' }],
    // TODO: Would be handy to have some filtering here
    validation: Rule => [
      Rule.required()
    ]
      },
      // All fields for large feature type
        {
            name: 'longTitle',
            title: 'Long title',
            type: 'array', 
          of: [{type: 'block', marks: {
            decorators: [
          {
            title: 'Highlight Blue',
            value: 'highlightBlue',
            blockEditor: {
              icon: highlightBlue,
              render: renderHighlightBlue,
            },
          },
          {
            title: 'Highlight Green',
            value: 'highlightGreen',
            blockEditor: {
              icon: highlightGreen,
              render: renderHighlightGreen,
            },
          }
            ],
          },}],
            fieldset: 'large',
            validation: Rule => Rule.custom((value, context) => {
              const { parent } = context
              return validation('large', parent) && !value ? 'A title is required.' : true
            }),
        },
        {
            name: 'secondaryTitle',
            title: 'Secondary title',
            type: 'string',
            fieldset: 'large'
        },
        {
          name: 'largeText',
          title: 'Large text',
          type: 'array', 
          of: [{type: 'block', marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
               { title: 'Large Statistic', value: 'largeStat', blockEditor: {
            icon: largeStatIcon,
            render: largeStatRender
          }},
          {
            title: 'Highlight Blue',
            value: 'highlightBlue',
            blockEditor: {
              icon: highlightBlue,
              render: renderHighlightBlue,
            },
          },
          {
            title: 'Highlight Green',
            value: 'highlightGreen',
            blockEditor: {
              icon: highlightGreen,
              render: renderHighlightGreen,
            },
          }
            ],
          },}],
          fieldset: 'large',
          validation: Rule => Rule.custom((value, context) => {
            const { parent } = context
            return validation('large', parent) && !value ? 'A block of text is required.' : true
          }),
        },
        {
          name: 'largeImage',
          title: 'Large image',
          type: 'image',
          fieldset: 'large',
          fields: [
            ...imageFields,
            {
              name: 'offset',
              title: 'Offset',
              type: 'string',
              options: {
                list: [
                  {title: 'Left', value: 'left'},
                  {title: 'Right', value: 'right'},
                  {title: 'Down', value: 'down'},
                  {title: 'Up', value: 'up'},
                ],
              },
              description: 'This will offset the image in the direction specified, and a dark background will be placed behind it.',
            },
          ],
          validation: Rule => Rule.custom((value, context) => {
            const { parent } = context
            return validation('large', parent) && !value ? 'An image is required.' : true
          }),
        },
        {
          name: 'link',
          title: 'Link',
          type: 'object',
          fieldset: 'large',
          fields: [
            {
              name: 'text',
              title: 'Text',
              type: 'string',
            },
            {
              name: 'linkType',
              title: 'Link type',
              type: 'string',
              options: {
                list: [
                  {title: 'Internal', value: 'internal'},
                  {title: 'External', value: 'external'},
                ],
              }
            },
            {
              name: 'url',
              title: 'Url',
              type: 'url',
              hidden: ({parent}) => parent.linkType !== 'external',
            },
            {
              name: 'internalLink',
              type: 'object',
              title: 'Internal link',
              hidden: ({parent}) => parent.linkType !== 'internal',
              fields: [
                {
                  name: 'reference',
                  type: 'reference',
                  title: 'Reference',
                  to: [
                    { type: 'page' },
                    { type: 'ctaPage' },
                  ],
                  options: {
                    filter: `publishTo == "ws" && !(_id in path("drafts.**"))`,
                    collapsed: false,
                    editModal: 'dialog',
                  }
                },
              ],
              options: {
                collapsed: false,
                disableNew: true,
              }
            }
          ],
          options: {
            collapsed: false,
          }
        },
        // Fields for medium sized feature blocks
        {
            name: 'mediumTitle',
            title: 'Medium title',
            type: 'array', 
          of: [{type: 'block', 
          styles: [
            {title: 'Normal', value: 'normal'},
          ],
          lists: [
          ],
          marks: {
            decorators: [],
            annotations: []
          }},
            ],
            fieldset: 'medium'
        },
        {
          name: 'mediumText',
          title: 'Medium text',
          type: 'array', 
          of: [{type: 'block', 
          styles: [
            {title: 'Normal', value: 'normal'},
          ],
          lists: [
          ],
          marks: {
            decorators: [],
            annotations: []
          }},
            ],
          fieldset: 'medium'
        },
        {
          name: 'mediumImage',
          title: 'Medium image',
          type: 'image',
          fieldset: 'medium',
          fields: imageFields
        },
        // Fields for small sized feature blocks
        {
            name: 'smallTitle',
            title: 'Small title',
            type: 'array', 
          of: [{type: 'block', 
          styles: [
            {title: 'Normal', value: 'normal'},
          ],
          lists: [
          ],
          marks: {
            decorators: [],
            annotations: []
          }},
            ],
            fieldset: 'small'
        },
        {
          name: 'smallText',
          title: 'Small text',
          type: 'array', 
          of: [{type: 'block', 
          styles: [
            {title: 'Normal', value: 'normal'},
          ],
          lists: [
          ],
          marks: {
            decorators: [],
            annotations: []
          }},
            ],
          fieldset: 'small'
        },
        {
          name: 'smallImage',
          title: 'Small image',
          type: 'image',
          fieldset: 'small' ,
          fields: imageFields
        },
    ],
    preview: {
        select: {
          type: 'featureType',
          titleL: 'longTitle',
          titleM: 'mediumTitle',
          titleS: 'smallTitle',
          mediaL: 'largeImage',
          mediaM: 'mediumImage',
          mediaS: 'smallImage',
        },
        prepare(selection) {
          const {type, titleL, titleM, titleS, mediaL, mediaM, mediaS} = selection
          let title;
          let media

          if (type === 'large') {
            title = titleL
            media = mediaL
          } else if (type === 'medium') {
            title = titleM
            media = mediaM
          } else if (type === 'small') {
            title = titleS
            media = mediaS
          }

          let block
            block = (title || []).find(block => block._type === 'block').children
            .filter(child => child._type === 'span')
            .map(span => span.text)
            .join('')
          


          return Object.assign({title, media}, selection,  {
            title: block,
            subtitle: `Display type: ${type}`,
            media,
          })
        },
      },
}