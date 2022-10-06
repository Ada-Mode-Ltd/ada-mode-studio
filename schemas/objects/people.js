import { team } from '../../utils/icons'

export default {
    type: 'object',
    title: 'People',
    name: 'people',
    icon: team,
    fields: [
      {
        name: 'sectionTitle',
        type: 'sectionHeading'
      },
      {
        name: 'allPeople',
        title: 'Show all people for this company',
        type: 'boolean',
      },
      {
        name: 'people',
        title: 'People',
        type: 'array',
        of: [{
          type: 'reference',
          to: {
            type: 'person'
          }
        }],
        hidden: ({
          parent
        }) => parent?.allPeople,
      },
    ],
    preview: {
      select: {
        allPeople: 'allPeople',
        people: 'people',
      },
      prepare({ allPeople, people }) {
        return {
          title: 'People',
          subtitle: allPeople ? 'Show all people for this company' : `Show ${people.length} people`,
        };
      },
    },
  }