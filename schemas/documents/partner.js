export default {
    name: 'partner',
    title: 'Partner',
    type: 'document',
    fields: [
      {
        name: 'publishTo',
        title: 'Partner for',
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
            name: 'name',
            title: 'Name',
            type: 'string',
          },
          {
            name: 'logo',
            title: 'Logo',
            type: 'image',
          },
          {
            name: 'website',
            title: 'Website',
            type: 'url',
          }
    ],
    preview: {
        select: {
          title: 'name',
          media: 'logo',
        },
        prepare(selection) {
          return Object.assign({}, selection, {
          })
        },
      },
}