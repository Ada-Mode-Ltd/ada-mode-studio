export default {
    name: 'comparison',
    title: 'Comparison table',
    type: 'object',
    fields: [
        {
            name: 'title',
            title: 'Section title',
            type: 'string',
          },
        {
          name: 'left',
          title: 'Left side content',
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Check', value: 'check'},
                  {title: 'Cross', value: 'cross'},
                ],
                layout: 'radio',
              }
            },
            {
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [{ type: 'text' }],
            },
          ],
          },
          {
            name: 'right',
            title: 'Right side content',
            type: 'object',
            fields: [
              {
                name: 'icon',
                title: 'Icon',
                type: 'string',
                options: {
                  list: [
                    {title: 'Check', value: 'check'},
                    {title: 'Cross', value: 'cross'},
                  ],
                  layout: 'radio',
                }
              },
              {
                name: 'items',
                title: 'Items',
                type: 'array',
                of: [{ type: 'text' }],
              },
            ],
            }
          ],
    // Todo: Need to fix up this preview
    preview: {
        select: {
          title: 'title',
          // media: 'photo',
        },
        prepare(selection) {
          return Object.assign({}, selection, {
            title: title || 'Comparison table',
          })
        },
      },
}