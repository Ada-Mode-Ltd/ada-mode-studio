import { briefcase } from '../../utils/icons'

export default {
    type: 'object',
    title: 'Careers section',
    name: 'careers',
    icon: briefcase,
    fields: [
      {
        name: 'allJobs',
        title: 'Show all open jobs for this company',
        type: 'boolean',
      },
      {
        name: 'jobs',
        title: 'Jobs',
        type: 'array',
        of: [{
          type: 'reference',
          to: {
            type: 'job'
          }
        }],
        hidden: ({
          parent
        }) => parent?.allJobs,
      },
    ],
    preview: {
      select: {
        allJobs: 'allJobs',
        jobs: 'jobs',
      },
      prepare({ allJobs, jobs }) {
        return {
          title: 'Careers section',
          subtitle: allJobs ? 'Show all jobs for this company' : `Show ${jobs.length} jobs`,
        };
      },
    },
  }