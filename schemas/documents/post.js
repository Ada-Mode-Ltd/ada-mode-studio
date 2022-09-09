import { slugify } from "../schemaUtils"

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
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'parentStaff'},
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
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'blurb',
      title: 'Blurb',
      type: 'text',
      description: 'This content will be shown on the blog index page. It can be the same as the description, or a shorter version.',
      group: 'content',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      group: 'content',
    },
    {
      name: 'related',
      title: 'Related Posts',
      type: 'array',
      of: [{type: 'reference', to: {type: 'post'}}],
      group: 'related',
      // TODO: Would be nice to have some filtering logic here (e.g. only show posts from the same site)
      validation: Rule => [
        Rule.max(3)
          .error('This field can have a maximum of 3 entries.'),
        Rule.unique()
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