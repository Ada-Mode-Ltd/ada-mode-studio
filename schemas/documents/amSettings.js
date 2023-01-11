export default {
  name: "amSettings",
  title: "Site settings",
  type: "document",
  // icon: quote,
  fields: [
    {
      name: "topMenu",
      title: "Top menu",
      type: "array",
      of: [
        {
          name: "topMenuLink",
          type: "object",
          fields: [
            {
              name: "page",
              type: "reference",
              to: [{ type: "page" }],
              description: 'Use this field to link to a single page.',
              options: {
                filter: 'publishTo == "am" && !(_id in path("drafts.**"))',
              },
            },
            {
              name: 'dropdownTitle',
              title: 'Dropdown title',
              type: 'string',
              hidden: ({ parent }) => parent?.page,
              description: 'Use this field to link to create a dropdown menu.'
            },
            {
              name: "children",
              title: "Children",
              hidden: ({ parent }) => (parent?.page || !parent?.dropdownTitle),
              type: "array",
              of: [
                {
                  type: "reference",
                  to: [{ type: "page" }],
                  options: {
                    filter: 'publishTo == "am" && !(_id in path("drafts.**"))',
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: "page.title",
              subtitle: "children",
              dropdown: "dropdownTitle",
            },
            prepare({ title, subtitle, dropdown }) {
              return {
                title: title || dropdown,
                subtitle: subtitle?.length > 0 ? "Has children" : "No children",
              };
            },
          },
        },
      ],
    },
    {
      name: "footerLinks",
      title: "Footer links",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "page" }],
          options: {
            filter: 'publishTo == "am" && !(_id in path("drafts.**"))',
          },
        },
      ],
    },
    {
      name: "blogFallbackImage",
      title: "Blog post fallback image",
      type: "image",
      description:
        "This image will be used as a fallback image for blog posts without a featured image",
    },
    {
      name: "aboutText",
      title: "About company text",
      description: "This text will be shown above or below job listings.",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
        },
        {
          name: "text",
          title: "Text",
          type: "array",
          of: [
            {
              type: "block",
              styles: [{ title: "Normal", value: "normal" }],
              lists: [],
              marks: {
                decorators: [
                  { title: "Strong", value: "strong" },
                  { title: "Emphasis", value: "em" },
                ],
                annotations: [],
              },
            },
          ],
        },
      ],
    },
  ],
};
