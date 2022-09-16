import { confetti  } from "../../utils/icons"
import { imageFields } from "../../utils/imageFields"
import React from 'react';

const largeStatIcon = () => (
  <span style={{ fontWeight: 'bold' }}>20%</span>
)
const largeStatRender = props => (
  <span style={{ fontSize: '2rem' }}>{props.children}</span>
)

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
            type: 'string',
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
          }}
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
                ],
              },
              description: 'This will offset the image and generate a dark background to create visual effect.',
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
              name: 'url',
              title: 'Url',
              type: 'url',
              // TODO: Create a way to link to internal pages
            },
          ],
        },
        // Fields for medium sized feature blocks
        {
            name: 'mediumTitle',
            title: 'Medium title',
            type: 'string',
            fieldset: 'medium'
        },
        {
          name: 'mediumText',
          title: 'Medium text',
          type: 'text',
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
            type: 'string',
            fieldset: 'small'
        },
        {
          name: 'smallText',
          title: 'Small text',
          type: 'text',
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
          return Object.assign({}, selection,  {
            title: type === 'large' ? titleL : type === 'medium' ? titleM : titleS,
            subtitle: `Display type: ${type}`,
            media: type === 'large' ? mediaL : type === 'medium' ? mediaM : mediaS,
          })
        },
      },
}