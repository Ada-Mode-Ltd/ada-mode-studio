import { imageFields } from "../../utils/imageFields"
import React from 'react';

export default {
    name: 'pageHeading',
    title: 'Page Heading',
    type: 'object',
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