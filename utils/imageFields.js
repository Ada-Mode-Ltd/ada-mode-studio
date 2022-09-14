export const imageFields = [
    {
        name: 'altText',
        title: 'Alt text',
        type: 'string',
        description: 'This text will be used by screen readers and search engines to describe the image. If this is a decorative image, enter a space.',
        initialValue: '&nbsp;',
        validation: (Rule) => Rule.required().min(1).error('Please enter alt text. If this is a decorative image, enter a space.'),
        options: {
            isHighlighted: true // <-- make this field easily accessible
          }
    },
]