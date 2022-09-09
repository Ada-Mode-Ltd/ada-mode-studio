// /deskStructure.js
import S from '@sanity/desk-tool/structure-builder'
import { windscope, adaMode  } from './utils/logos';

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
      .params({
        type: schemaType,
        site
      })
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
    .icon(adaMode)
    .child(
      S.list()
      .title('Content')
      .id('am')
      .items([
        siteSpecificSchema('Posts', 'am', 'post', 'publishTo'),
        siteSpecificSchema('Job listings', 'am', 'job', 'publishTo'),
        siteSpecificSchema('General page', 'am', 'generalPage', 'publishTo'),
        // S.documentTypeListItems().filter(
        //     item => item.getSchemaType().name.startsWith('am-')
        //   )
      ])
    ),
    S.listItem()
    .title('Windscope')
    .icon(windscope)
    .child(
      S.list()
      .title('Content')
      .id('ws')
      .items([
        siteSpecificSchema('Posts', 'ws', 'post', 'publishTo'),
        siteSpecificSchema('CTA pages', 'ws', 'ctaPage', 'publishTo'),
        siteSpecificSchema('General page', 'ws', 'generalPage', 'publishTo'),
        // S.documentTypeListItems().filter(
        //     item => item.getSchemaType().name.startsWith('ws-')
        //   )  
      ])
    ),
    S.divider(),
    S.listItem()
    .title('Blog settings')
    .child(
      S.list()
       .title('All blog settings')
       .items([
      S.listItem()
      .title('All blog posts')
      .child(
        S.documentTypeList('post')
        // .title(``) 
        .filter('_type == "post"')
        .child(documentId =>
          S.document()
          .documentId(documentId)
          .schemaType('post')
        )
      ),
      S.listItem()
      .title('Categories')
      .child(
        S.documentTypeList('blogPostCategory')
        .title('Categories')
        .filter('_type == "blogPostCategory"')
        .child(documentId =>
          S.document()
          .documentId(documentId)
          .schemaType('blogPostCategory')
        )
      ),
    ])),

    // The rest of this document is from the original manual grouping in this series of articles
    ...S.documentTypeListItems().filter(listItem => ![hiddenFromBase, 'parentStaff', 'blogPostCategories', 'ctaPage', 'job', 'generalPage', 'post'].includes(listItem.getId())),
  ])