import {
  OITextLeftOverlap,
  OITextRightOverlap,
  OIImage,
  OIText,
  OITextBottomOverlap,
  OITextTopOverlap,
  click,
} from "../../utils/icons"

export default {
    name: 'ctaSection',
    title: 'CTA Section',
    type: 'object',
    icon: click,
    fields: [
      {
        name: "blockLayout",
        title: "Section Layout",
        type: "visualOptions",
        options: {
          showTooltip: true,
          optionSize: "small",
          list: {
            noimage: {
              name: "Text only",
              icon: OIText,
              default: true,
            },
            left: {
              name: "Text Left / Image Right",
              icon: OITextLeftOverlap,
            },
            right: {
              name: "Text Right / Image Left",
              icon: OITextRightOverlap,
            },
          },
        },
      },
        {
            name: 'title',
            title: 'Section title',
            type: 'string',
          },
        {
            name: 'text',
            title: 'Text',
            type: 'text',
          },
          {
            name: 'media',
            title: 'Media',
            type: 'object',
            hidden: ({parent}) => (parent.blockLayout === 'noimage'),
            fields: [
              {
                name: 'mediaType',
                title: 'Media Type',
                type: 'string',
                options: {
                  list: [
                    {title: 'Image', value: 'image'},
                    {title: 'Video', value: 'video'},
                  ],
                },
              },
              {
                name: 'image',
                title: 'Image',
                type: 'image',
                hidden: ({parent}) => parent?.mediaType !== 'image',
              },
              {
                name: 'video',
                title: 'Video',
                type: 'videoId',
                hidden: ({parent}) => parent?.mediaType !== 'video',
              }
            ]
          },
          {
            name: 'ctaButtons',
            title: 'CTA Buttons',
            type: 'array',
            of: [{ 
              type: 'object',
              fields: [
                {
                  name: 'text',
                  title: 'Text',
                  type: 'string',
                },
                {
                  name: 'link',
                  title: 'Link',
                  type: 'url',
                },
            ],
          }],
          validation: Rule => [
            Rule.required()
              .min(1)
              .max(2)
              .error('Required field with at least 1 and at most 2 entries.'),
          ]
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