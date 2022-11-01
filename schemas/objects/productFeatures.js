import { confetti } from '../../utils/icons'

export default {
    type: 'object',
    title: 'Product features',
    name: 'productFeatures',
    icon: confetti,
    fields: [
      {
        name: 'featureType',
        title: 'Feature type',
        type: 'string',
        initialValue: 'large',
    options: {
      list: [
        {title: 'Large', value: 'large'},
        {title: 'Medium', value: 'medium'},
        {title: 'Small', value: 'small'},
      ],
    },
    validation: Rule => [
      Rule.required()
    ]
  },
  {
    name: 'product',
    title: 'Product',
    type: 'reference',
    to: [{ type: 'product' }],
    validation: Rule => [
      Rule.required()
    ]
      },
  {
        name: 'allFeatures',
        title: 'Show all features',
        type: 'boolean',
      },
      {
        name: 'features',
        title: 'Features',
        type: 'array',
        of: [{
          type: 'reference',
          to: {
            type: 'productFeature'
          },
          options: {
            filter: ({document, parentPath}) => {
              const parent = document[parentPath[0]].find(item => item._key === parentPath[1]._key)
              return {
                filter: `featureType == "${parent.featureType}" && product._ref == "${parent.product._ref}" && !(_id in path("drafts.**"))`
              }
            }
          }
        }],
        hidden: ({document, parentPath}) => {
          const parent = document[parentPath[0]].find(item => item._key === parentPath[1]._key)
          return parent?.allFeatures
        },
      },
    ],
    preview: {
      select: {
        allFeatures: 'allFeatures',
        features: 'features',
        size: 'featureType',
      },
      prepare({ allFeatures, features, size }) {
        return {
          title: 'Product features',
          subtitle: allFeatures ? `Show all ${size} features` : `Show ${features.length} features`,
        };
      },
    },
  }