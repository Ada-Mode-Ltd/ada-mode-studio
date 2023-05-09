import { partner } from "../../utils/icons";

export default {
    name: 'amHomepage',
    title: 'Ada Mode homepage',
    type: 'document',
    fields: [
        {
            name: 'quote',
            title: 'Quote',
            type: 'array',
            validation: Rule => [
                Rule.required()
                    .min(1)
                    .max(1)
                    .error('Must have exactly one quote'),
            ],
            of: [{ type: 'reference', to: [{ type: 'quote' }], options: {
                filter: '"am" in publishTo',
            }, }],
        },
        {
            type: 'object',
            name: 'partners',
            title: 'Partners',
            // hidden: ({parent}) => parent.publishTo !== 'am',
            fields: [
              {
                name: 'title',
                title: 'Title',
                type: 'string',
                initialValue: 'Partners and customers'
              },
              {
                name: 'showAll',
                title: 'Show all',
                type: 'boolean',
              },
              {
                name: 'partners',
                title: 'Partners',
                type: 'array',
                hidden: ({parent}) => parent.showAll,
                of: [
                  {
                    type: 'reference',
                    to: {type: 'partner'},
                    title: 'Partner',
                  }
                ],
                validation: Rule => Rule.custom((partners, context) => {
                    if (context.parent.showAll) {
                        return true;
                        }
                        if (!partners || partners.length === 0) {
                            return 'Required field with at least 1 entry.';
                            }
                        return true;
                    })
              }, 
            ],
            preview: {
              select: {
                title: 'title',
              },
              prepare({title}) {
                return {
                  title: title || 'Partners',
                  subtitle: 'Partners',
                }
              }
          },
        },
        {
            name: 'smallCaseStudies',
            title: 'Small Case Studies',
            type: 'array',
            description: 'These appear in the middle of the page, with a title & some description text.',
            validation: Rule => [
                Rule.required()
                    .min(1)
                    .error('Must have at least one case study'),
            ],
            of: [
                {
                    name: 'smallCaseStudy',
                    title: 'Small Case Study',
                    type: 'object',
                    fields: [
                        {
                            name: 'title',
                            title: 'Title',
                            type: 'string',
                        },
                        {
                            name: 'description',
                            title: 'Description',
                            type: 'string',
                        },
                        { name: 'caseStudy', type: 'reference', to: [{ type: 'caseStudy' }], options: {
                            filter: '"am" in publishTo',
                        }, }
                    ],
                },
            ],
        },
        {
            name: 'featuredCaseStudies',
            title: 'Featured Case Studies',
            description: 'These case studies will be shown towards the bottom of the page, in large blocks with their feature image.',
            type: 'array',
            validation: Rule => [
                Rule.required()
                    .min(1)
                    .max(2)
                    .error('Must have at least one case study, no more than two.'),
            ],
            of: [{ type: 'reference', to: [{ type: 'caseStudy' }], options: {
                filter: '"am" in publishTo',
            }, }],
        },
    ],
    preview: {
        select: {
            // title: 'Windscope homepage',
        },
        prepare({ title, subtitle, media }) {
            return {
                title: 'Ada Mode homepage',
            };
        },
    },
}