import { imageFields } from "../../utils/imageFields"
import { highlightBlue, highlightGreen } from "../../utils/icons";
import React from 'react';
/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

 const largeStatIcon = () => (
  <span style={{ fontWeight: 'bold' }}>20%</span>
)
const largeStatRender = props => (
  <span style={{ fontSize: '2rem' }}>{props.children}</span>
)

const renderHighlightBlue = props => <span style={{ color: '#2276fc' }}>{props.children}</span>
const renderHighlightGreen = props => <span style={{ color: '#2276fc' }}>{props.children}</span>

export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'object',
  fields: [
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{
        title: 'Block',
        type: 'block',
        // Styles let you set what your user can mark up blocks with. These
        // correspond with HTML tags, but you can set any title or value
        // you want and decide how you want to deal with it where you want to
        // use your content.
        styles: [
          {title: 'Normal', value: 'normal'},
          // {title: 'H1', value: 'h1'},
          {title: 'H2', value: 'h2'},
          {title: 'H3', value: 'h3'},
          {title: 'H4', value: 'h4'},
          {title: 'Quote', value: 'blockquote'},
        ],
        lists: [
          {title: 'Bullet', value: 'bullet'},
          {title: 'Numbered', value: 'number'}
        ],
        // Marks let you mark up inline text in the block editor.
        marks: {
          // Decorators usually describe a single property – e.g. a typographic
          // preference or highlighting by editors.
          decorators: [
            {title: 'Strong', value: 'strong'},
            {title: 'Emphasis', value: 'em'},
            { title: 'Large Statistic', value: 'largeStat', blockEditor: {
              icon: largeStatIcon,
              render: largeStatRender
            }},
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
          // Annotations can be any object structure – e.g. a link or a footnote.
          annotations: [
            {
              title: 'URL',
              name: 'link',
              type: 'object',
              fields: [
                {
                  title: 'URL',
                  name: 'href',
                  type: 'url',
                },
              ],
            },
          ],
        },
      },
      // You can add additional types here. Note that you can't use
      // primitive types such as 'string' and 'number' in the same array
      // as a block type.
      {
        type: 'image',
        fields: [
          {
            name: 'caption',
            title: 'Caption',
            type: 'text',
          },
          ...imageFields,
        ]
      },
      {
        type: 'video',
        type: 'videoId',
        title: 'Video (YouTube/Vimeo)'
      }
      // TODO: Add internal linking references here
      
    ],
    },
    
  ],
}
