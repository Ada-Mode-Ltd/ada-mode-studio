import { slugify } from "../../utils/schema"

export default {
    name: 'job',
    title: 'Job listing',
    type: 'document',
    groups: [
        {
            name: 'metadata',
            title: 'Metadata',
            default: true,
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
        type: 'array',
        of: [{type: 'string'}],
        initialValue: ['am', 'ws'],
    options: {
      list: [
        {title: 'Windscope', value: 'ws'},
        {title: 'Ada Mode', value: 'am'},
      ],
      layout: 'grid',
    },
    group: 'metadata',
  },
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            group: 'metadata',
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
            },
          },
          {
            name: 'open',
            title: 'Open',
            type: 'boolean',
            description: 'Is this vacancy still open?',
            group: 'metadata',
            initialValue: true,
          },
          {
            name: 'body',
            title: 'Body',
            type: 'blockContent',
            group: 'content',
          },
          {
            name: 'positionAbout',
            title: 'Position of "About us" text',
            type: 'string',
            options: {
              list: [
                {title: 'Before content', value: 'top'},
                {title: 'After content', value: 'bottom'},
              ],
              layout: 'radio',
            },
            initialValue: 'top',
            group: 'content',
          },
    ],
    preview: {
        select: {
          title: 'title',
          description: 'description',
          open: 'open'
        },
        prepare(selection) {
          const {description, open} = selection
          return Object.assign({}, selection, {
            subtitle: `Status: ${open ? 'Open' : 'Closed'}`,
          })
        },
      },
}