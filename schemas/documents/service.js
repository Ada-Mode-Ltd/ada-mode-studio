import { service  } from "../../utils/icons"
import { imageFields } from "../../utils/imageFields"
import React from 'react';

export default {
    name: 'service',
    title: 'Service',
    type: 'document',
    icon: service,
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
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            fields: imageFields
        },
        {
            name: 'publishTo',
            title: 'Parent website',
            type: 'array',
            of: [{type: 'string'}],
            initialValue: ['am'],
            hidden: true,
        options: {
          list: [
            {title: 'Windscope', value: 'ws'},
            {title: 'Ada Mode', value: 'am'},
          ],
          layout: 'grid',
        },
        validation: Rule => [
          Rule.required()
        ]
          },
    ],
    preview: {
        select: {
          title: 'title',
          media: 'image',
        },
        prepare(selection) {
          return Object.assign({}, selection)
        },
      },
}