export default {
    name: 'wsHomepage',
    title: 'Windscope homepage',
    type: 'document',
    fields: [
        {
            name: 'tabs',
            title: 'Featured content in tabs',
            type: 'stackedTabs',
        },
        {
            name: 'feature',
            title: 'Product feature',
            type: 'reference',
            to: [{ type: 'productFeature' }],
            options: {
                filter: 'featureType == "large" && "ws" in product->publishTo',
            },
        },
        {
            name: 'quotes',
            title: 'Quotes',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'quote' }], options: {
                filter: '"ws" in publishTo',
            }, }],
        },
    ],
    preview: {
        select: {
            // title: 'Windscope homepage',
        },
        prepare({ title, subtitle, media }) {
            return {
                title: 'Windscope homepage',
            };
        },
    },
}