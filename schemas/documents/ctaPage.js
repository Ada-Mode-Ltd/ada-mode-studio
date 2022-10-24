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
            type: 'array',
      of: [{
        title: 'Block',
        type: 'block',
        // Styles let you set what your user can mark up blocks with. These
        // correspond with HTML tags, but you can set any title or value
        // you want and decide how you want to deal with it where you want to
        // use your content.
        styles: [
          {title: 'Normal', value: 'normal'},
          {title: 'H1', value: 'h1'},
          {title: 'H2', value: 'h2'},
          {title: 'H3', value: 'h3'},
          {title: 'H4', value: 'h4'},
          {title: 'Quote', value: 'blockquote'},
        ],
        lists: [
          {title: 'Bullet', value: 'bullet'},
          {title: 'Numbered', value: 'number'}
        ],
        // Marks let you mark up inline text in the block editor.
        marks: {
          // Decorators usually describe a single property – e.g. a typographic
          // preference or highlighting by editors.
          decorators: [
            {title: 'Strong', value: 'strong'},
            {title: 'Emphasis', value: 'em'},
          ]
        },
      },
      {
        name: 'quote',
        title: 'Quote',
        type: 'reference',
        to: [{ type: 'quote' }],
      },],
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