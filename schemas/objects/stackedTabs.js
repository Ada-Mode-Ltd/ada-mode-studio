import { imageFields } from "../../utils/imageFields"
import React from 'react';

export default {
    name: 'stackedTabs',
    title: 'Stacked Tabs',
    type: 'object',
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
              },
              {
                name: 'text',
                title: 'Text',
                type: 'Text',
              },
              {
                name: 'image',
                title: 'Image',
                type: 'image',
                fields: imageFields
              },
            ],
          },],
          validation: Rule => [
            Rule.min(2)
              .max(3)
              .error('Required field with at least 2 and at most 3 entries.'),
          ]
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