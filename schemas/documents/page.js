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
            name: 'body',
            title: 'Body',
            type: 'blockContent',
            group: 'content',
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