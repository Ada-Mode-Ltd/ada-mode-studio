import { slugify } from "../../utils/schema"

export default {
    name: 'ctaPage',
    title: 'CTA Page',
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
            name: 'form',
            title: 'Form',
            // default: true,
          },
    ],
    fields: [
        {
            name: 'publishTo',
            title: 'Publish to',
            type: 'string',
            initialValue: 'ws',
            options: {
              list: [
                {title: 'Ada Mode', value: 'am'},
                {title: 'Windscope', value: 'ws'},
              ],
            },
            hidden: true,
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
            validation: Rule => [
              Rule.required()
          ],
            options: {
              source: 'title',
              maxLength: 96,
              slugify: slugify,
            },
          },
          {
            name: 'body',
            title: 'Body',
            type: 'blockContent',
            group: 'content',
          },
          {
            name: 'form',
            title: 'Form fields',
            type: 'array',
            of: [{type: 'formField'}],
            group: 'form',
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