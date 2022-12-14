import { slugify } from "../../utils/schema"
import { imageFields } from "../../utils/imageFields"

export default {
  name: 'post',
  title: 'Post',
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
    {
      name: 'related',
      title: 'Related posts',
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
      {title: 'Windscope', value: 'ws'},
      {title: 'Ada Mode', value: 'am'},
    ],
    layout: 'grid',
  },
  validation: Rule => [
    Rule.required()
  ]
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'publishing',
      // Hide if Windscope is not set in publishTo
      hidden: ({document}) => !document?.publishTo?.includes('ws'),
      description: 'This sets the post as a featured post on the Windscope blog.',
      // TODO: Need to add validation so that only one blog post is featured at a time
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
      name: 'blurb',
      title: 'Blurb',
      type: 'text',
      description: 'This content will be shown on the blog index page. It can be the same as the description, or a shorter version.',
      group: 'content',
      validation: Rule => [
        Rule.required()
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