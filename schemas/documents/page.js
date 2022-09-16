import { slugify } from "../../utils/schema"

export default {
    name: 'generalPage',
    title: 'General page',
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
          {
            name: 'publishing',
            title: 'Publishing details',
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
            },
            validation: Rule => [
              Rule.required()
            ]
          },
          {
            name: 'body',
            title: 'Body',
            type: 'blockContent',
            group: 'content',
            validation: Rule => [
              Rule.required()
            ]
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