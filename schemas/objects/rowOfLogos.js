import { row } from '../../utils/icons'

export default {
    type: 'object',
    title: 'Row of logos',
    name: 'rowOfLogos',
    icon: row,
    fields: [
      {
        name: 'sectionTitle',
        type: 'sectionHeading'
      },
      {
        name: 'logos',
        title: 'Logos',
        type: 'array',
        of: [{
          type: 'image',
        }],
      },
    ],
    preview: {
      select: {
        title: 'sectionTitle.title',
      },
      prepare({ title }) {
        return {
          title: `Row of logos`,
          subtitle: title,
        };
      },
    },
  }