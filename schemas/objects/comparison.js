import { scales } from '../../utils/icons'

export default {
    name: 'comparison',
    title: 'Comparison table',
    type: 'object',
    icon: scales,
    fields: [
        {
          name: 'left',
          title: 'Left side content',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Check', value: 'check'},
                  {title: 'Cross', value: 'cross'},
                  {title: 'Up symbol', value: 'up'},
                  {title: 'Down symbol', value: 'down'},
                ],
                layout: 'radio',
              }
            },
            {
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
          },
          {
            name: 'right',
            title: 'Right side content',
            type: 'object',
            fields: [
              {
                name: 'title',
                title: 'Title',
                type: 'string',
              },
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
                of: [{ type: 'string' }],
              },
            ],
            }
          ],
    // Todo: Need to fix up this preview
    preview: {
        select: {
          left: 'left.title',
          right: 'right.title',
          // media: 'photo',
        },
        prepare(selection) {
          return Object.assign({}, selection, {
            title: `${selection.left} vs ${selection.right}`,
          })
        },
      },
}