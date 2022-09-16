export default {
  name: 'blogPostCategory',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'publishTo',
      title: 'Category for',
      type: 'array',
      of: [{type: 'string'}],
      initialValue: ['am'],
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
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
}
