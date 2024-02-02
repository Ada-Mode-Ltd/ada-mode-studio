import {
  OITextLeftOverlap,
  OITextRightOverlap,
  blockLayout,
  externalLink,
  internalLink,
} from "../../utils/icons";
import { imageFields } from "../../utils/imageFields";

export default {
  name: "blockLayout",
  title: "Block layout",
  type: "object",
  icon: blockLayout,
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
      name: "image",
      title: "Image",
      type: "image",
      fields: imageFields,
    },
    {
      name: "text",
      title: "Text",
      type: "blockContent",
    },
    {
      name: "sectionLink",
      title: "Action link",
      type: "object",
      fields: [
        {
          name: "text",
          title: "Text",
          type: "string",
          validation: (Rule) => [Rule.required()],
        },
        {
          name: "linkType",
          title: "Link type",
          type: "string",
          options: {
            list: [
              { title: "Internal", value: "internal" },
              { title: "External", value: "external" },
            ],
          },
        },
        {
          name: "url",
          title: "Url",
          type: "url",
          icon: externalLink,
          hidden: ({ parent }) => parent.linkType !== "external",
          // If the link type is external, this field is required
          validation: (Rule) =>
            Rule.custom((value, context) => {
              const { parent } = context;
              return parent.linkType === "external" && !value
                ? "An external url is required."
                : true;
            }),
        },
        {
          name: "internalLink",
          type: "reference",
          title: "Internal link",
          icon: internalLink,
          hidden: ({ parent }) => parent.linkType !== "internal",
          to: [{ type: "page" }, { type: "ctaPage" }],
          options: {
            disableNew: true,
            filter: `publishTo == "ws" && !(_id in path("drafts.**"))`,
          },
          validation: (Rule) =>
            Rule.custom((value, context) => {
              const { parent } = context;
              return parent.linkType === "internal" && !value
                ? "Please link to a page."
                : true;
            }),
        },
      ],
    },
  ],
  preview: {
    select: {
      layout: "layout",
      media: "image",
      text: "text",
      // media: 'photo',
    },
    prepare(selection) {
      const block = (selection.text.content || []).find(
        (block) => block._type === "block"
      );
      return {
        title: block
          ? block.children
              .filter((child) => child._type === "span")
              .map((span) => span.text)
              .join("")
          : "No title",
        media: selection.media,
        subtitle:
          selection.layout === "right"
            ? "Text Right / Image Left"
            : "Text Left / Image Right",
      };
    },
  },
};
