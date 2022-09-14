import { industry  } from "../../utils/icons"

export default {
    name: 'industry',
    title: 'Industry',
    type: 'document',
    icon: industry,
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
        {
            name: 'logo',
            title: 'Logo',
            type: 'image',
        },
        {
            name: 'publishTo',
            title: 'Parent website',
            type: 'array',
            hidden: true,
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