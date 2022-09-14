// /deskStructure.js
import S from '@sanity/desk-tool/structure-builder'
import { windscope, adaMode  } from './utils/logos';
import { keyboard, partner, note, briefcase, quote, click, write, person, team, industry, confetti } from './utils/icons';

const hiddenFromBase = S.documentTypeListItems().filter(item => item.getId().startsWith('am') || item.getId().startsWith('ws')).map(item => item.getId())

const returnIcon = (schemaType) => {
  if (schemaType === 'partner') {
    return partner;
  }

  if (schemaType === 'post') {
    return write;
  }

  if (schemaType === 'job') {
    return briefcase;
  }

  if (schemaType === 'quote') {
    return quote;
  }

  if (schemaType === 'ctaPage') {
    return click;
  }

  if (schemaType === 'generalPage') {
    return note;
  }
  
  if (schemaType === 'person') {
    return person;
  }

  if (schemaType === 'productFeature') {
    return confetti;
  }

  if (schemaType === 'industry') {
    return industry;
  }
  
  return
}

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
    .icon(returnIcon(schemaType))
    .child(
      S.documentTypeList(schemaType)
      .title(`${company} ${title}`)
      .filter(`_type == $type && $site in ${validationField}`)
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

// Filters schema documents based on a reference field
const siteSpecificSchemaRef = (title, site, schemaType, refSchema, validationField) => {
  const company = site === 'ws' ? 'Windscope' : 'Ada Mode';

  return S.listItem()
    .title(title)
    .icon(returnIcon(schemaType))
    .child(
      S.documentTypeList(schemaType)
      .title(`${company} ${title}`)
      .filter(`_type == $type && $site in ${refSchema}->${validationField}`)
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
        S.divider(),
        siteSpecificSchema('Partners', 'am', 'partner', 'publishTo'),
        siteSpecificSchema('Quotes', 'am', 'quote', 'publishTo'),
        S.divider(),
        siteSpecificSchemaRef('Product features', 'am', 'productFeature', 'product', 'publishTo'),
        siteSpecificSchema('People', 'am', 'person', 'publishTo'),
        siteSpecificSchema('Industries', 'am', 'industry', 'publishTo')
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
            S.divider(),
            siteSpecificSchema('Partners', 'ws', 'partner', 'publishTo'),
            siteSpecificSchema('Quotes', 'ws', 'quote', 'publishTo'),
            S.divider(),
            siteSpecificSchemaRef('Product features', 'ws', 'productFeature', 'product', 'publishTo'),
            siteSpecificSchema('People', 'ws', 'person', 'publishTo')
        // S.documentTypeListItems().filter(
        //     item => item.getSchemaType().name.startsWith('ws-')
        //   )  
      ])
    ),
    S.divider(),
    S.listItem()
    .title('Cross-site blog')
    .icon(keyboard)
    .child(
      S.list()
       .title('All blog items')
       .items([
      S.listItem()
      .title('All blog posts')
      .icon(write)
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
    S.divider(),
    S.listItem()
    .title('Partners')
    .icon(partner)
    .child(
      S.list()
       .title('All partners')
       .items([
      S.listItem()
      .title('All partners')
      .child(
        S.documentTypeList('partner')
        // .title(``) 
        .filter('_type == "partner"')
        .child(documentId =>
          S.document()
          .documentId(documentId)
          .schemaType('partner')
        )
      )
    ])),
    S.divider(),
    S.listItem()
    .title('People')
    .icon(person)
    .child(
      S.list()
       .title('Cross-company team')
       .items([
      S.listItem()
      .title('All people')
      .icon(team)
      .child(
        S.documentTypeList('person')
        // .title(``) 
        .filter('_type == "people"')
        .child(documentId =>
          S.document()
          .documentId(documentId)
          .schemaType('person')
        )
      )
    ])),

    // The rest of this document is from the original manual grouping in this series of articles
    ...S.documentTypeListItems().filter(listItem => ![hiddenFromBase, 'industry', '', 'parentStaff', 'blogPostCategory', 'ctaPage', 'job', 'generalPage', 'post', 'partner', 'quote', 'person'].includes(listItem.getId())),
  ])