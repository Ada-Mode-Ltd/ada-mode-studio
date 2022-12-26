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
        initialValue: ['am', 'ws'],
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
            validation: Rule => [
              Rule.required()
            ]       
          },
          {
            name: 'position',
            title: 'Position',
            type: 'string',
            validation: Rule => [
              Rule.required()
            ]
          },
          {
            name: 'photo',
            title: 'Photo',
            type: 'image',
            options: {
              hotspot: true,
            },
            validation: Rule => [
              Rule.required()
            ]
          },
          {
            name: 'linkedIn',
            title: 'LinkedIn Profile',
            type: 'url',
          },
          {
            name: 'displayOrder',
            title: 'Display Order',
            type: 'number',
            description: 'Optional: Use this field to set a specific display order for this person.'
          },
    ],
    preview: {
        select: {
          title: 'name',
          media: 'photo',
          order: 'displayOrder',
          company: 'publishTo',
        },
        prepare(selection) {
          const { order, company } = selection
          const comp = company[0] === 'am' ? 'Ada Mode' : 'Windscope'
          return Object.assign({}, selection, {
            subtitle: order ? `${comp} | Display order: ${order}` : comp
          })
        },
      },
}