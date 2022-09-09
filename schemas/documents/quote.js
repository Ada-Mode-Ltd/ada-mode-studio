export default {
    name: 'quote',
    title: 'Partner Quote',
    type: 'document',
    fields: [
        {
            name: 'publishTo',
            title: 'Display on',
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
            name: 'text',
            title: 'Text',
            type: 'text',
          },
          {
            name: 'attribution',
            title: 'Attribution',
            type: 'object',
            fields: [
                {
                    name: 'name',
                    title: 'Name',
                    type: 'string',
                },
                {
                    name: 'title',
                    title: 'Title',
                    type: 'string',
                }
            ]
          },
          {
            name: 'partner',
            title: 'Partner',
            type: 'reference',
            to: [{ type: 'partner' }],
          },
    ],
    preview: {
        select: {
          title: 'text',
          name: 'attribution.name',
          partner: 'partner.name',
        },
        prepare(selection) {
          const {name, partner} = selection
          return Object.assign({}, selection, {
            subtitle: `${name} at ${partner}`,
          })
        },
      },
}