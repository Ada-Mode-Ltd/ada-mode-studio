export default {
    name: 'person',
    title: 'People',
    type: 'document',
    fields: [
      {
        name: 'publishTo',
        title: 'Member of',
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
            name: 'position',
            title: 'Position',
            type: 'string',
          },
          {
            name: 'photo',
            title: 'Photo',
            type: 'image',
          },
          {
            name: 'linkedIn',
            title: 'LinkedIn Profile',
            type: 'url',
          }
    ],
    preview: {
        select: {
          title: 'name',
          media: 'photo',
        },
        prepare(selection) {
          return Object.assign({}, selection, {
          })
        },
      },
}