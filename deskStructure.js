// /deskStructure.js
import S from '@sanity/desk-tool/structure-builder'

const hiddenFromBase = S.documentTypeListItems().filter(item => item.getId().startsWith('am') || item.getId().startsWith('ws')).map(item => item.getId())

/**
 * 
 * @param {string} title The title of the section (e.g. Posts, Staff, etc.)
 * @param {string} site The site to filter by (e.g. am, ws)
 * @param {string} schemaType The schema type to filter by (e.g. post, author)
 * @param {string} validationField The field in the schema that contains the site name (e.g. publishTo)
 * @returns Sanity structure builder object
 */

const siteSpecificSchema = (title, site, schemaType, validationField) => {
  const company = site === 'ws' ? 'Windscope' : 'Ada Mode';

  return S.listItem()
    .title(title)
    .child(
      S.documentTypeList(schemaType)
        .title(`${company} ${title}`)
        .filter('_type == $type && $site in publishTo')
        .params({type: schemaType, site})
        .child(documentId =>
          S.document()
            .documentId(documentId)
            .schemaType(schemaType)
        )
    )
        }


export default () =>
  S.list()
    .title('Base')
    .items([
      S.listItem()
        .title('Ada Mode')
        .child(
          S.list()
            .title('Content')
            .id('am')
            .items([
              siteSpecificSchema('Posts', 'am', 'post', 'publishTo'),
                // S.documentTypeListItems().filter(
                //     item => item.getSchemaType().name.startsWith('am-')
                //   )
            ])
        ),
      S.listItem()
        .title('Windscope')
        .child(
          S.list()
            .title('Content')
            .id('ws')
            .items([
              siteSpecificSchema('Posts', 'ws', 'post', 'publishTo'),
              siteSpecificSchema('CTA pages', 'ws', 'ctaPage', 'publishTo'),
              // S.documentTypeListItems().filter(
              //     item => item.getSchemaType().name.startsWith('ws-')
              //   )  
            ]
            )
        ),
      S.divider(),
      
      // The rest of this document is from the original manual grouping in this series of articles
      ...S.documentTypeListItems().filter(listItem => ![ hiddenFromBase, 'parentStaff', 'category', 'ctaPage' ].includes(listItem.getId())),
    ])