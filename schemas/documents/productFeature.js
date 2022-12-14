import { confetti } from "../../utils/icons";
import { imageFields } from "../../utils/imageFields";
import { highlightBlue, highlightGreen, externalLink, internalLink } from "../../utils/icons";
import React from "react";

const largeStatIcon = () => <span style={{ fontWeight: "bold" }}>X%</span>;

const renderHighlightBlue = (props) => (
  <span style={{ color: "#2276fc" }}>{props.children}</span>
);
const renderHighlightGreen = (props) => (
  <span style={{ color: "#2276fc" }}>{props.children}</span>
);

const validation = (featureType, parent) =>
  parent.featureType === featureType ? true : false;

export default {
  name: "productFeature",
  title: "Product feature",
  type: "document",
  icon: confetti,
  fieldsets: [
    {
      name: "large",
      title: "Large",
      // options: { collapsible: true, collapsed: false },
      hidden: ({ document }) => document.featureType !== "large",
    },
    {
      name: "medium",
      title: "Medium",
      // options: { collapsible: true, collapsed: false },
      hidden: ({ document }) => document.featureType !== "medium",
    },
    {
      name: "small",
      title: "Small",
      // options: { collapsible: true, collapsed: false },
      hidden: ({ document }) => document.featureType !== "small",
    },
  ],
  fields: [
    {
      name: "featureType",
      title: "Feature type",
      type: "string",
      initialValue: "large",
      options: {
        list: [
          { title: "Large", value: "large" },
          { title: "Medium", value: "medium" },
          { title: "Small", value: "small" },
        ],
      },
      validation: (Rule) => [Rule.required()],
    },
    {
      name: "product",
      title: "Product",
      type: "reference",
      to: [{ type: "product" }],
      // TODO: Would be handy to have some filtering here
      validation: (Rule) => [Rule.required()],
    },
    // All fields for large feature type
    {
      name: "longTitle",
      title: "Long title",
      type: "array",
      of: [
        {
          type: "block",
          marks: {
            decorators: [
              {
                title: "Highlight Blue",
                value: "highlightBlue",
                blockEditor: {
                  icon: highlightBlue,
                  render: renderHighlightBlue,
                },
              },
              {
                title: "Highlight Green",
                value: "highlightGreen",
                blockEditor: {
                  icon: highlightGreen,
                  render: renderHighlightGreen,
                },
              },
            ],
          },
        },
      ],
      fieldset: "large",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const { parent } = context;
          return validation("large", parent) && !value
            ? "A title is required."
            : true;
        }),
    },
    {
      name: "secondaryTitle",
      title: "Secondary title",
      type: "string",
      fieldset: "large",
    },
    {
      name: "largeText",
      title: "Large text",
      type: "array",
      of: [
        {
          type: "block",
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              {
                title: "Highlight Blue",
                value: "highlightBlue",
                blockEditor: {
                  icon: highlightBlue,
                  render: renderHighlightBlue,
                },
              },
              {
                title: "Highlight Green",
                value: "highlightGreen",
                blockEditor: {
                  icon: highlightGreen,
                  render: renderHighlightGreen,
                },
              },
            ],
          },
        },
        {
          name: 'largeStat',
          title: 'Large Statistic',
          type: 'object',
          icon: largeStatIcon,
          fields: [
            {
              name: 'stat',
              title: 'Statistic',
              type: 'string',
              description: 'The statistic to display, e.g. 20%, 1000, 1.5x etc',
            },
            {
              name: 'statDescription',
              title: 'Statistic Description',
              type: 'string',
              description: 'The description of the statistic, e.g. "20% Reduction in O&M costs"',
            }
          ]
        }
      ],
      fieldset: "large",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const { parent } = context;
          return validation("large", parent) && !value
            ? "A block of text is required."
            : true;
        }),
    },
    {
      name: "largeImage",
      title: "Large image",
      type: "image",
      fieldset: "large",
      fields: [
        ...imageFields,
        {
          name: "offset",
          title: "Offset",
          type: "string",
          options: {
            list: [
              { title: "Left", value: "left" },
              { title: "Right", value: "right" },
              { title: "Down", value: "down" },
              { title: "Up", value: "up" },
            ],
          },
          description:
            "This will offset the image in the direction specified, and a dark background will be placed behind it.",
        },
      ],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const { parent } = context;
          return validation("large", parent) && !value
            ? "An image is required."
            : true;
        }),
    },
    {
      name: "link",
      title: "Link",
      type: "object",
      fieldset: "large",
      fields: [
        {
          name: "text",
          title: "Text",
          type: "string",
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
    // Fields for medium sized feature blocks
    {
      name: "mediumTitle",
      title: "Medium title",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "H3", value: "h3" },
            { title: "Normal", value: "normal" },
          ],
          lists: [],
          marks: {
            decorators: [],
            annotations: [],
          },
        },
      ],
      fieldset: "medium",
    },
    {
      name: "mediumText",
      title: "Medium text",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
          marks: {
            decorators: [],
            annotations: [],
          },
        },
      ],
      fieldset: "medium",
    },
    {
      name: "mediumImage",
      title: "Medium image",
      type: "image",
      fieldset: "medium",
      fields: imageFields,
    },
    // Fields for small sized feature blocks
    {
      name: "smallTitle",
      title: "Small title",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "H3", value: "h3" },
            { title: "Normal", value: "normal" },
          ],
          lists: [],
          marks: {
            decorators: [],
            annotations: [],
          },
        },
      ],
      fieldset: "small",
    },
    {
      name: "smallText",
      title: "Small text",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
          marks: {
            decorators: [],
            annotations: [],
          },
        },
      ],
      fieldset: "small",
    },
    {
      name: "smallImage",
      title: "Small image",
      type: "image",
      fieldset: "small",
      fields: imageFields,
    },
  ],
  preview: {
    select: {
      type: "featureType",
      titleL: "longTitle",
      titleM: "mediumTitle",
      titleS: "smallTitle",
      mediaL: "largeImage",
      mediaM: "mediumImage",
      mediaS: "smallImage",
    },
    prepare(selection) {
      const { type, titleL, titleM, titleS, mediaL, mediaM, mediaS } =
        selection;
      let title;
      let media;

      if (type === "large") {
        title = titleL;
        media = mediaL;
      } else if (type === "medium") {
        title = titleM;
        media = mediaM;
      } else if (type === "small") {
        title = titleS;
        media = mediaS;
      }

      let block;
      block = (title || [])
        .find((block) => block._type === "block")
        .children.filter((child) => child._type === "span")
        .map((span) => span.text)
        .join("");

      return Object.assign({ title, media }, selection, {
        title: block,
        subtitle: `Display type: ${type}`,
        media,
      });
    },
  },
};
