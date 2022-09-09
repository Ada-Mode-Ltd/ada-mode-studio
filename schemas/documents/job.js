export default {
    name: 'job',
    title: 'Job listing',
    type: 'document',
    groups: [
        {
            name: 'metadata',
            title: 'Metadata',
            default: true,
        }, 
        {
            name: 'content',
            title: 'Content',
            // default: true,
          },
    ],
    fields: [
        {
            name: 'publishTo',
            title: 'publishTo',
            type: 'string',
            initialValue: 'am',
            options: {
              list: [
                {title: 'Ada Mode', value: 'am'},
                {title: 'Windscope', value: 'ws'},
              ],
            },
            hidden: true,
          },
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            group: 'metadata',
          },
          {
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'This content will be used by search engines to display a description of the page.',
            group: 'metadata',
          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            group: 'metadata',
            options: {
              source: 'title',
              maxLength: 96,
              slugify: input => {
                input = input
                  .toLowerCase()
                  .replace(/[*+~.,()'"!:@?\s]+/g, '-')
                  .slice(0, 96)
                if (input.substr(-1) == "-") {
                  input = input.slice(0, -1)
                }
      
                return (`${input}`).toLowerCase()
              }
            },
          },
          {
            name: 'open',
            title: 'Open',
            type: 'boolean',
            description: 'Is this vacancy still open?',
            group: 'metadata',
            initialValue: true,
          },
          {
            name: 'body',
            title: 'Body',
            type: 'blockContent',
            group: 'content',
          },
    ],
    preview: {
        select: {
          title: 'title',
          description: 'description',
        },
        prepare(selection) {
          const {description} = selection
          return Object.assign({}, selection, {
            subtitle: description && `${description}`,
          })
        },
      },
}