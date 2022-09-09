export default {
  name: 'childSettings',
  title: 'Website settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Website Title',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Promotional Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'footerLinks',
      title: 'Footer links',
      type: 'array',
      of: [
        {
          title: 'link',
          type: 'reference',
          to: [{type: 'post'}]
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
}
