import { imageFields } from "../../utils/imageFields"
import { pageHeading, highlightBlue, highlightGreen  } from "../../utils/icons"
const renderHighlightBlue = props => <span style={{ color: '#3065FB' }}>{props.children}</span>
const renderHighlightGreen = props => <span style={{ color: '#1FCA51' }}>{props.children}</span>
import React from 'react';

export default {
    name: 'pageHeading',
    title: 'Page Heading',
    type: 'object',
    icon: pageHeading,
    fields: [
      {
        name: 'logo',
        title: 'Logo',
        type: 'image',
        description: 'Optional. A small logo that will appear above the title.',
        hidden: ({ document }) => document?.publishTo !== 'am',
      },
        {
            name: 'title',
            title: 'Title',
            type: 'array',
            of: [{
                type: 'block',
                styles: [
                    {title: 'H1', value: 'h1'},
                    {title: 'Normal', value: 'normal'},
                ],
                lists: [],
                marks: {
                  // Decorators usually describe a single property – e.g. a typographic
                  // preference or highlighting by editors.
                  decorators: [
                    {title: 'Strong', value: 'strong'},
                    {title: 'Emphasis', value: 'em'},
                    {
                      title: 'Highlight Blue',
                      value: 'highlightBlue',
                      blockEditor: {
                        icon: highlightBlue,
                        render: renderHighlightBlue,
                      },
                    },
                    {
                      title: 'Highlight Green',
                      value: 'highlightGreen',
                      blockEditor: {
                        icon: highlightGreen,
                        render: renderHighlightGreen,
                      },
                    }
                  ],
                  annotations: []
                }
        }],
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
            title: 'Video',
            name: 'video',
            type: 'videoId',
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
          const block = (selection.title || []).find(block => block._type === 'block')
      return {
        title: block
          ? block.children
            .filter(child => child._type === 'span')
            .map(span => span.text)
            .join('')
          : 'No title'
      }
        },
      },
}