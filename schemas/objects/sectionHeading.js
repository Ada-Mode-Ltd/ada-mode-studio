import {h2} from '../../utils/icons'

export default {
    name: 'sectionHeading',
    title: 'Section Heading',
    type: 'object',
    icon: h2,
    fields: [
        {
            name: 'title',
            title: 'Section title',
            type: 'string',
            validation: Rule => Rule.required(),
          },
        {
            name: 'text',
            title: 'Text',
            type: 'text',
          },
    ],
    // Todo: Need to fix up this preview
    preview: {
        select: {
          title: 'title',
          // media: 'photo',
        },
        prepare(selection) {
          return Object.assign({}, selection, {
          })
        },
      },
}