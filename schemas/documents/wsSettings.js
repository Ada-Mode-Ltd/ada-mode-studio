export default {
    name: 'wsSettings',
    title: 'Site settings',
    type: 'document',
    // icon: quote,
    fields: [
        {
            name: 'topMenu',
            title: 'Top menu',
            type: 'array',
            description: 'Set a maximum of 5 menu items',
            validation: Rule => [
                Rule.required()
                    .max(5)
            ],
            of: [{ type: 'reference',
                   to: [{ type: 'page' }],
                     options: {
                          filter: 'publishTo == "ws" && !(_id in path("drafts.**"))',
                     }
                    }],

        },  
    ],
}