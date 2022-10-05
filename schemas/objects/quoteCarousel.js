import { quote } from '../../utils/icons'

export default {
    type: 'object',
    title: 'Quote carousel',
    name: 'quoteCarousel',
    icon: quote,
    fields: [{
        name: 'allQuotes',
        title: 'Show all quotes',
        type: 'boolean',
      },
      {
        name: 'quotes',
        title: 'Quotes',
        type: 'array',
        of: [{
          type: 'reference',
          to: {
            type: 'quote'
          }
        }],
        hidden: ({
          parent
        }) => parent?.allQuotes,
      },
    ],
    preview: {
      select: {
        allQuotes: 'allQuotes',
        quotes: 'quotes',
      },
      prepare({ allQuotes, quotes }) {
        return {
          title: 'Quote carousel',
          subtitle: allQuotes ? 'Show all quotes' : `Show ${quotes.length} quotes`,
        };
      },
    },
  }