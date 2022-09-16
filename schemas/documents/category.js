import { category } from "../../utils/icons"

export default {
  name: 'blogPostCategory',
  title: 'Category',
  type: 'document',
  icon: category,
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
  validation: Rule => [
    Rule.required()
  ]
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
}
