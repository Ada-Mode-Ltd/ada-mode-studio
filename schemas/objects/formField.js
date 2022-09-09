export default {
    name: 'formField',
    title: 'Field',
    type: 'object',
    fields: [
        {
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
                list: [
                    {title: 'Text', value: 'text'},
                    {title: 'Email', value: 'email'},
                    {title: 'Dropdown', value: 'dropdown'},
                    {title: 'Textarea', value: 'textarea'},
                    {title: 'Phone', value: 'phone'},
                    {title: 'URL', value: 'url'},
                ],
            },
            validation: Rule => Rule.required(),
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'placeholder',
            title: 'Placeholder text',
            type: 'string',
        },
        {
            name: 'values',
            title: 'Values',
            type: 'array',
            of: [ {type: 'string'} ],
            hidden: ({parent}) => parent.type !== 'dropdown',
        },
        {
            name: 'required',
            title: 'Required',
            type: 'boolean',
            description: 'Is this field required?',
        },
    ],
    preview: {
        select: {
          title: 'type',
          name: 'name',
          required: 'required',
        },
        prepare(selection) {
          const {title, name, required} = selection
          return Object.assign({}, selection, {
            title: `Field type: ${title.toUpperCase()}`,
            subtitle: `${name ? name + ' |' : ''} ${required ? 'Required field' : 'Optional field'}`,
          })
        },
      },
}