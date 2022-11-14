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
        {
            name: 'footerLinks',
            title: 'Footer links',
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
        {
            name: 'blogFallbackImage',
            title: 'Blog post fallback image',
            type: 'image',
            description: 'This image will be used as a fallback image for blog posts without a featured image',
        },  
        {
            name: 'aboutText',
            title: 'About company text',
            description: 'This text will be shown above or below job listings.',
            type: 'object',
            fields: [
                {
                    name: 'title',
                    title: 'Title',
                    type: 'string',
                },
                {
                    name: 'text',
                    title: 'Text',
                    type: 'array', 
          of: [{type: 'block', 
          styles: [
            {title: 'Normal', value: 'normal'},
          ],
          lists: [
          ],
          marks: {
            decorators: [
                { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: []
          }},
            ],
                },
            ],
        }
    ],
}