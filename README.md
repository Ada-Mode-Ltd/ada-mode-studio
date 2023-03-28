# Sanity Studio (Backend)

The backend for this website is built using the Sanity headless CMS. Once deployed, the backend can be accessed at [https://ada-mode.sanity.studio](https://ada-mode.sanity.studio).

## Getting started

1. Clone the repository `git clone https://github.com/Ada-Mode-Ltd/ada-mode-studio.git`
1. Open the director `cd ada-mode-studio`
1. Run `npm install`
1. You will also want to install the [Sanity CLI](https://www.sanity.io/docs/cli)
1. If you are new to Sanity, [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started)

## Making changes

- Documents (pages, posts, events etc.) and objects (blocks, content types etc.) can be created, edited and managed in the `schemas` folder
- To make changes to the desk structure, edit [/deskStructure.js](/deskStructure.js)
- To change project ID, or other sanity configurations, edit the [/sanity.json](/sanity.json) file

## Deploying

To deploy the Studio to production ([https://ada-mode.sanity.studio](https://ada-mode.sanity.studio)) run the `sanity deploy` CLI command.

## Local development

- To run the Studio locally run the `npm run start` command
- To build the Studio locally run the `npm run build` command

## More details

- Website: <https://sanity.io>
- Account Management: <https://www.sanity.io/manage>
