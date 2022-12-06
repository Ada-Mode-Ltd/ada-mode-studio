import { imageFields } from "../../utils/imageFields"
import { externalLink, internalLink, stack } from "../../utils/icons"
import React from 'react';

export default {
    name: 'stackedTabs',
    title: 'Stacked Tabs',
    type: 'object',
    icon: stack,
    fields: [
        {
            name: 'title',
            title: 'Section title',
            type: 'string',
          },
          {
            name: 'tabs',
            title: 'Tabs',
            type: 'array',
            of: [{
            name: 'tab',
            title: 'Tab',
            type: 'object',
            fields: [
              {
                name: 'title',
                title: 'Title',
                type: 'string',
                validation: Rule => [
                  Rule.required()
                ]
              },
              {
                name: 'text',
                title: 'Text',
                type: 'text',
                validation: Rule => [
                  Rule.required()
                ]
              },
              {
                name: 'image',
                title: 'Image',
                type: 'image',
                fields: imageFields,
                validation: Rule => [
                  Rule.required()
                ]
              },
            ],
          },],
          validation: Rule => [
            Rule.min(2)
              .max(3)
              .error('Required field with at least 2 and at most 3 entries.'),
            ]
          },
          {
              name: 'sectionLink',
              title: 'Action link',
              type: 'object',
              fields: [
                {
                  name: 'text',
                  title: 'Text',
                  type: 'string',
                  validation: Rule => [
                    Rule.required()
                  ]
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
                  icon: externalLink,
                  hidden: ({parent}) => parent.linkType !== 'external',
                  // If the link type is external, this field is required
                  validation: Rule => Rule.custom((value, context) => {
                    const { parent } = context
                    return parent.linkType === 'external' && !value ? 'An external url is required.' : true
                  }),
                },
                {
                  name: 'internalLink',
                  type: 'reference',
                  title: 'Internal link',
                  icon: internalLink,
                  hidden: ({parent}) => parent.linkType !== 'internal',
                  to: [
                    { type: 'page' },
                    { type: 'ctaPage' },
                  ],
                  options: {
                    disableNew: true,
                    filter: `publishTo == "ws" && !(_id in path("drafts.**"))`
                  },
                  validation: Rule => Rule.custom((value, context) => {
                    const { parent } = context
                    return parent.linkType === 'internal' && !value ? 'Please link to a page.' : true
                  }), 
                }]
            },
    ],
    // Todo: Need to fix up this preview
    preview: {
        select: {
          title: 'title',
          // media: 'photo',
        },
        prepare(selection) {
          return Object.assign({}, selection, {
          })
        },
      },
}