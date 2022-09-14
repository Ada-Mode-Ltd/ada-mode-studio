import { productDetails  } from "../../utils/icons"

export default {
    name: 'productDetails',
    title: 'Product details',
    type: 'object',
    icon: productDetails,
    fields: [
        {
            name: 'title',
            title: 'Section title',
            type: 'string',
            description: 'The heading of this section of the page.',
        },
        {
          name: 'product',
          title: 'Product',
          type: 'reference',
          to: [{ type: 'product' }],
          // TODO: Would be handy to have some filtering here
        },
        {
          name: 'details',
          title: 'Details',
          type: 'array',
          of: [{
            name: 'detail',
            title: 'Detail',
            type: 'object',
            fields: [
              {
                name: 'title',
                title: 'Title',
                type: 'string',
              },
              {
                name: 'text',
                title: 'Text',
                type: 'text',
              },
            ],
          },],
        },
    ],
    preview: {
        select: {
          title: 'title',
          product: 'product.name',
        },
        prepare(selection) {
          const {product} = selection
          return Object.assign({}, selection,  {
            subtitle: product && `for ${product}`,
          })
        },
      },
}