import { slugify } from "../schemaUtils"

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
            title: 'publishTo',
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
          {
            name: 'form',
            title: 'Form fields',
            type: 'array',
            of: [
                {
                    name: 'formField',
                    title: 'Field',
                    type: 'object',
                    fields: [
                        {
                            name: 'type',
                            title: 'Type',
                            type: 'string',
                            options: {
                                list: [
                                    {title: 'Text', value: 'text'},
                                    {title: 'Email', value: 'email'},
                                    {title: 'Dropdown', value: 'dropdown'},
                                    {title: 'Textarea', value: 'textarea'},
                                    {title: 'Phone', value: 'phone'},
                                    {title: 'URL', value: 'url'},
                                ],
                            },
                            validation: Rule => Rule.required(),
                        },
                        {
                            name: 'name',
                            title: 'Name',
                            type: 'string',
                        },
                        {
                            name: 'placeholder',
                            title: 'Placeholder text',
                            type: 'string',
                        },
                        {
                            name: 'values',
                            title: 'Values',
                            type: 'array',
                            of: [ {type: 'string'} ],
                            hidden: ({parent}) => parent.type !== 'dropdown',
                        },
                        {
                            name: 'required',
                            title: 'Required',
                            type: 'boolean',
                            description: 'Is this field required?',
                        },
                    ],
                },
            ],
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