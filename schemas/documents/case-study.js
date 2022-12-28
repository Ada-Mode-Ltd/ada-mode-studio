import { slugify } from "../../utils/schema"
import { imageFields } from "../../utils/imageFields"

export default {
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  groups: [
    {
      name: 'metadata',
      title: 'Metadata',
      default: true,
    },
    {
      name: 'publishing',
      title: 'Publishing details',
      // default: true,
    },
    {
      name: 'content',
      title: 'Content',
      // default: true,
    },
  ],
  fields: [
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
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'person'},
      group: 'metadata',
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'metadata',
      of: [{type: 'reference', to: {type: 'blogPostCategory'}}],
      // TODO: Add some filtering here so that categories for the specific site can only be referenced.
    },
    {
      name: 'publishTo',
      title: 'Publish To',
      type: 'array',
      of: [{type: 'string'}],
      initialValue: ['am'],
      group: 'publishing',
  options: {
    list: [
      // {title: 'Windscope', value: 'ws'},
      {title: 'Ada Mode', value: 'am'},
    ],
    layout: 'grid',
  },
  validation: Rule => [
    Rule.required()
  ]
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
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      group: 'content',
      fields: imageFields,
    },
    {
      name: 'byline',
      title: 'By line',
      type: 'text',
      description: 'This text will be shown under the title.',
      group: 'content',
      validation: Rule => [
        // Rule.required()
      ],
    },
    {
      name: 'intro',
      title: 'Introductory paragraph',
      type: 'text',
      group: 'content',
      validation: Rule => [
        // Rule.required()
      ],
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      group: 'content',
      validation: Rule => [
        Rule.required()
      ],
    },
    {
      name: 'slides',
      title: 'Slides',
      type: 'file',
      group: 'content',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
      ]
    },
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      })
    },
  },
}