import { productTM  } from "../../utils/icons"

export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    icon: productTM,
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            description: 'The name of the product as it should appear on the website.',
        },
        {
            name: 'logo',
            title: 'Logo',
            type: 'image',
        },
        {
            name: 'publishTo',
            title: 'Parent website',
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
    ],
    preview: {
        select: {
          title: 'name',
          media: 'logo',
        },
        prepare(selection) {
          const {author} = selection
          return Object.assign({}, selection)
        },
      },
}