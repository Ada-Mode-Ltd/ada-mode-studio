import { slugify } from "../../utils/schema"
import { textField, dropdownField } from "../../utils/icons"
import React from 'react'


export default {
    name: 'formField',
    title: 'Field',
    type: 'object',
    fields: [
        {
            name: 'type',
            title: 'Type',
            type: 'string',
            initialValue: 'text',
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
            name: 'label',
            title: 'Label',
            type: 'string',
            description: 'The text label that will be shown on the website with this field.',
            validation: Rule => 
            Rule.required(),
        },
        {
            name: 'name',
            title: 'Name',
            type: 'slug',
            description: 'A lowercase name for this field. Avoid using spaces or special characters.',
            options: {
                source: (doc, options) => options.parent.label,
                maxLength: 96,
                slugify: slugify,
              },
            validation: Rule => Rule.required(),
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
            validation: Rule => Rule.custom((value, context) => {
                const { parent } = context
                if (parent?.type === 'dropdown' && (!value || value?.length < 1)) {
                    return 'Dropdowns must have at least one value'
                }
                return true
            }  ),
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
          name: 'label',
          required: 'required',
        },
        prepare(selection) {
          const {title, name, required} = selection
          return Object.assign({}, selection, {
            title: `Field type: ${title.toUpperCase()}`,
            subtitle: `${name ? name + ' |' : ''} ${required ? 'Required field' : 'Optional field'}`,
            media: title === 'dropdown' ? dropdownField : textField,
        })
        },
      },
}