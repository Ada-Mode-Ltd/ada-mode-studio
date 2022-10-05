import { imageFields } from "../../utils/imageFields"
import { pageHeading  } from "../../utils/icons"
import React from 'react';

export default {
    name: 'pageHeading',
    title: 'Page Heading',
    type: 'object',
    icon: pageHeading,
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required(),
          },
        {
            name: 'tagline',
            title: 'Tagline',
            type: 'string',
          },
          {
            name: 'showDate',
            title: 'Show last updated date',
            type: 'boolean',
            description: "Display the date this page was last updated above the title.",
          },
          {
            name: 'textAlign',
            title: 'Text align',
            type: 'string',
            options: {
              list: [
                {title: 'Left', value: 'left'},
                {title: 'Center', value: 'center'},
              ],
            }
          },
        {
          name: 'keyVisual',
          title: 'Key visual',
          type: 'array',
          of: [{
            type: 'image',
            fields: imageFields,
          },
          {
            title: 'Youtube video',
            name: 'youtubeVideo',
            type: 'url',
          }],
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