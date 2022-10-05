import { OITextLeftOverlap, OITextRightOverlap } from '../../utils/icons'
import { imageFields } from "../../utils/imageFields"

export default {
    name: 'blockLayout',
    title: 'Block layout',
    type: 'object',
    fields: [
        {
            name: "layout",
            title: "Layout",
            type: "visualOptions",
            options: {
              showTooltip: true,
              optionSize: "small",
              list: {
                left: {
                  name: "Text Left / Image Right",
                  icon: OITextLeftOverlap,
                  default: true,
                },
                right: {
                  name: "Text Right / Image Left",
                  icon: OITextRightOverlap,
                },
              },
            },
          },
          {
            name: 'image',
            title: "Image",
            type: 'image',
            fields: imageFields,
          },
          {
            name: 'text',
            title: 'Text',
            type: 'blockContent',
          }
    ],
    preview: {
        select: {
          layout: 'layout',
            media: 'image',
            text: 'text',
          // media: 'photo',
        },
        prepare(selection) {
          const block = (selection.text.content || []).find(block => block._type === 'block')
      return {
        title: block
          ? block.children
            .filter(child => child._type === 'span')
            .map(span => span.text)
            .join('')
          : 'No title',
          media: selection.media,
          subtitle: selection.layout === 'right' ? "Text Right / Image Left" : "Text Left / Image Right"
      }
        },
      },
}