// /deskStructure.js
import S from '@sanity/desk-tool/structure-builder'
import { windscope, adaMode  } from './utils/logos';
import { keyboard, partner, note, briefcase, quote, click, write, person, team, industry, confetti, productTM, category, home } from './utils/icons';
import Iframe from 'sanity-plugin-iframe-pane'


const wsBaseUrl = 'https://verdant-cucurucho-b5ae26.netlify.app'
const amBaseUrl = 'https://velvety-salmiakki-87c150.netlify.app'

const resolveProductionUrl = (doc) => {
  return `${baseUrl}/preview/${doc.slug.current}/`
}

const componentPreview = (doc, url) => {
  return `${url}/preview/${doc._type}/${doc._id}/`
}

const pagePreview = (doc, url) => {
  let type = 'page'

  if (doc._type === 'wsHomepage', 'amHomepage') {
    type = 'homepage'
  } else if (doc._type === 'ctaPage') {
    type = 'cta'
  } else if (doc._type === 'post') {
    type = 'post'
  } else if (doc._type === 'job') {
    type = 'job'
  }

  return `${url}/${type}/preview/${doc._id}/`
}

const componentPreviewTypes = ['person', 'productFeature', 'quote']
const pagePreviewTypes = ['wsHomepage', 'page', 'ctaPage', 'job', 'post', 'caseStudy', 'amHomepage']

const hiddenFromBase = S.documentTypeListItems().filter(item => item.getId().startsWith('am') || item.getId().startsWith('ws')).map(item => item.getId())

const returnIcon = (schemaType) => {
  if (schemaType === 'partner') {
    return partner;
  }

  if (schemaType === 'post' || schemaType === 'caseStudy') {
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

  if (schemaType === 'page') {
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

  if (schemaType === 'category') {
    return category;
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

const siteSpecificSchema = (title, site, schemaType, validationField, orderBy = {field: '_updatedAt', direction: 'desc'}) => {
  const company = site === 'ws' ? 'Windscope' : 'Ada Mode';
  const baseUrl = site === 'ws' ? wsBaseUrl : amBaseUrl;
  let views = [S.view.form()]
  if (componentPreviewTypes.includes(schemaType)) {
    views.push(S.view
      .component(Iframe)
      .options({
        url: (doc) => componentPreview(doc, baseUrl),
      })
      .title('Preview'))
    } else if (pagePreviewTypes.includes(schemaType)) {
      views.push(S.view
        .component(Iframe)
        .options({
          url: (doc) => pagePreview(doc, baseUrl),
        })
        .title('Preview'))
    }

  return S.listItem()
    .title(title)
    .icon(returnIcon(schemaType))
    .child(
      S.documentTypeList(schemaType)
      .title(`${company} ${title}`)
      .filter(`_type == $type && ($site in ${validationField} || $site == ${validationField})`)
      .defaultOrdering([orderBy])
      .params({
        type: schemaType,
        site
      })
      .child(documentId =>
        S.document()
        .documentId(documentId)
        .schemaType(schemaType)
        .views(views)
      )
    )
}

// Filters schema documents based on a reference field
const siteSpecificSchemaRef = (title, site, schemaType, refSchema, validationField) => {
  const company = site === 'ws' ? 'Windscope' : 'Ada Mode';
  const baseUrl = site === 'ws' ? wsBaseUrl : amBaseUrl;
  let views = [S.view.form()]
  if (componentPreviewTypes.includes(schemaType)) {
    views.push(S.view
      .component(Iframe)
      .options({
        url: (doc) => componentPreview(doc, baseUrl),
      })
      .title('Preview'))
    } else if (pagePreviewTypes.includes(schemaType)) {
      views.push(S.view
        .component(Iframe)
        .options({
          url: (doc) => pagePreview(doc, baseUrl),
        })
        .title('Preview'))
    }

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
        .views(views)
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
        S.listItem()
            .title('Homepage')
            .icon(home)
            .child(
              
              S.documentTypeList('amHomepage')
              // .title(``) 
              .filter('_type == "amHomepage"')
      .child(documentId =>
        S.document()
          .documentId(documentId)
          .schemaType('amHomepage')
          .views([
            S.view.form(),
            S.view
              .component(Iframe)
              .options({
                url: (doc) => pagePreview(doc),
              })
              .title('Preview')
          ])
          )
          ),
        siteSpecificSchema('Blog posts', 'am', 'post', 'publishTo'),
        siteSpecificSchema('Case study', 'am', 'caseStudy', 'publishTo'),
        siteSpecificSchema('Page builder', 'am', 'page', 'publishTo'),
        siteSpecificSchema('Job listings', 'am', 'job', 'publishTo', {field: 'open', direction: 'desc'}),
        S.divider(),
        siteSpecificSchema('Partners', 'am', 'partner', 'publishTo'),
        siteSpecificSchema('Quotes', 'am', 'quote', 'publishTo'),
        S.divider(),
        siteSpecificSchemaRef('Product features', 'am', 'productFeature', 'product', 'publishTo'),
        siteSpecificSchema('People', 'am', 'person', 'publishTo', {field: 'displayOrder', direction: 'asc'}),
        siteSpecificSchema('Industries', 'am', 'industry', 'publishTo'),
        // siteSpecificSchema('Services', 'am', 'service', 'publishTo'),
        S.listItem()
        .title('Settings')
        .icon(home)
        .child(
          
          S.documentTypeList('amSettings')
          // .title(``) 
          .filter('_type == "amSettings"')
          .child(documentId =>
            S.document()
              .documentId(documentId)
              .schemaType('amSettings')
            )
        ),
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
            S.listItem()
            .title('Homepage')
            .icon(home)
            .child(
              
              S.documentTypeList('wsHomepage')
              // .title(``) 
              .filter('_type == "wsHomepage"')
      .child(documentId =>
        S.document()
          .documentId(documentId)
          .schemaType('wsHomepage')
          .views([
            S.view.form(),
            S.view
              .component(Iframe)
              .options({
                url: (doc) => pagePreview(doc),
              })
              .title('Preview')
          ])
          )
          ),
          siteSpecificSchema('Blog posts', 'ws', 'post', 'publishTo'),
          siteSpecificSchema('CTA pages', 'ws', 'ctaPage', 'publishTo'),
          siteSpecificSchema('Page builder', 'ws', 'page', 'publishTo'),
          siteSpecificSchema('Job listings', 'ws', 'job', 'publishTo', {field: 'open', direction: 'desc'}),
            S.divider(),
            siteSpecificSchema('Partners', 'ws', 'partner', 'publishTo'),
            siteSpecificSchema('Quotes', 'ws', 'quote', 'publishTo'),
            S.divider(),
            siteSpecificSchemaRef('Product features', 'ws', 'productFeature', 'product', 'publishTo'),
            siteSpecificSchema('People', 'ws', 'person', 'publishTo', {field: 'displayOrder', direction: 'asc'}),
            S.listItem()
    .title('Settings')
    .icon(home)
    .child(
      
      S.documentTypeList('wsSettings')
      // .title(``) 
      .filter('_type == "wsSettings"')
      .child(documentId =>
        S.document()
          .documentId(documentId)
          .schemaType('wsSettings')
        )
    ),
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
      .icon(category)
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
    .title('Job listings')
    .icon(briefcase)
    .child(
      S.list()
       .title('All job listings')
       .items([
      S.listItem()
      .title('All job listings')
      .icon(write)
      .child(
        S.documentTypeList('job')
        // .title(``) 
        .filter('_type == "job"')
        .defaultOrdering([{field: 'open', direction: 'desc'}])
        .child(documentId =>
          S.document()
          .documentId(documentId)
          .schemaType('job')
        )
      ),
      S.divider(),
      S.listItem()
      .title('Open Listings')
      .icon(briefcase)
      .child(
        S.documentTypeList('job')
        .title('Open Jobs')
        .filter('_type == "job" && open == true')
        .child(documentId =>
          S.document()
          .documentId(documentId)
          .schemaType('job')
        )
      ),
      S.listItem()
      .title('Closed Listings')
      .icon(briefcase)
      .child(
        S.documentTypeList('job')
        .title('Open Jobs')
        .filter('_type == "job" && (open == false || !defined(open))')
        .child(documentId =>
          S.document()
          .documentId(documentId)
          .schemaType('job')
        )
      ),
    ])),
    S.divider(),
    S.listItem()
    .title('Partners')
    .icon(partner)
    .child(
     
        S.documentTypeList('partner')
        // .title(``) 
        .filter('_type == "partner"')
        .child(documentId =>
          S.document()
          .documentId(documentId)
          .schemaType('partner')
        )
    ),
    S.divider(),
    S.listItem()
    .title('People')
    .icon(person)
    .child(
      S.documentTypeList('person')
      // .title(``) 
      .filter('_type == "person"')
      .defaultOrdering([{field: 'displayOrder', direction: 'asc'}])
      .menuItems([
        S.orderingMenuItem({title: 'Display order ascending', by: [{field: 'displayOrder', direction: 'asc'}]}),
        S.orderingMenuItem({title: 'Display order descending', by: [{field: 'displayOrder', direction: 'desc'}]}),
        S.orderingMenuItem({title: 'Name ascending', by: [{field: 'name', direction: 'asc'}]}),
        S.orderingMenuItem({title: 'Name descending', by: [{field: 'name', direction: 'desc'}]}),
      ])
      .child(documentId =>
        S.document()
        .documentId(documentId)
        .schemaType('person')
      )
      ),
    S.listItem()
    .title('Products')
    .icon(productTM)
    .child(
      
        S.documentTypeList('product')
        // .title(``) 
        .filter('_type == "product"')
        .child(documentId =>
          S.document()
          .documentId(documentId)
          .schemaType('product')
        )
      
    ),

    // The rest of this document is from the original manual grouping in this series of articles
    ...S.documentTypeListItems().filter(listItem => ![hiddenFromBase, 'service', 'industry', 'product', 'productFeature', 'parentStaff', 'blogPostCategory', 'ctaPage', 'job', 'page', 'post', 'partner', 'quote', 'person', 'wsHomepage', 'wsSettings', 'amHomepage', 'caseStudy', 'amSettings'].includes(listItem.getId())),
  ])