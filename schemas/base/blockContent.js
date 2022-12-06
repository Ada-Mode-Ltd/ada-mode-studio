import { imageFields } from "../../utils/imageFields"
import { highlightBlue, highlightGreen, paragraph, externalLink, internalLink } from "../../utils/icons";
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
const renderHighlightGreen = props => <span style={{ color: '#1fca51' }}>{props.children}</span>

export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'object',
  icon: paragraph,
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
              title: 'External Link',
              name: 'link',
              type: 'object',
              icon: externalLink,
              fields: [
                {
                  title: 'External Link',
                  name: 'href',
                  type: 'url',
                },
              ],
            },
            {
              name: 'internalLink',
              type: 'object',
              title: 'Internal link',
              icon: internalLink,
              fields: [
                {
                  name: 'reference',
                  type: 'reference',
                  title: 'Reference',
                  to: [
                    { type: 'page' },
                    // { type: 'post' },
                    { type: 'ctaPage' },
                    // other types you may want to link to
                  ]
                },
              ],
              options: {
                disableNew: true,
                filter: `(publishTo == "ws" || "ws" in publishTo) && !(_id in path("drafts.**"))`
              }
            }
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
            options: {
              isHighlighted: true // <-- make this field easily accessible
            }
          },
          ...imageFields,
        ]
      },
      {
        type: 'video',
        type: 'videoId',
        title: 'Video'
      }
      // TODO: Add internal linking references here
      
    ],
    },
    
  ],
}
