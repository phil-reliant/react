# Reliant Technology React App #

## Overview ##

Front-end for the Reliant Technology website, built using React and GraphQL which queries the Wordpress based backend.

## Technologies Used ##

* React
* GraphQL
* Apollo

## Useful Tools ##

* [Apollo Client Developer Tools](https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm?hl=en-US) - Chrome extension used for creating and testing GraphQL queries. Accessible as dev tools in the browser
* [GraphiQL](https://github.com/graphql/graphiql) - Native mac app for running test GraphQL queries
* [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) - Enforce .editorconfig settings in VS Code
* [SCSS Formatter for VS Code](https://marketplace.visualstudio.com/items?itemName=sibiraj-s.vscode-scss-formatter&ssr=false#overview) - .scss formatter for VS Code (see Repo Standards section below for further details)
* [React Slick](https://react-slick.neostack.com/docs/api) - Library for using slick sliders in React.

## Important Notes ##

* The backend environment should not be setup locally. Instead, the Pantheon hosted dev environment (https://dev-reliant.pantheonsite.io) should be used when adding/editing fields to have a single source of truth and avoid ACF json merging issues.
* When flexible content is edited in the Wordpress backend, run the command `npm run build-fragment` locally to have the Apollo fragment schema regenerated (handled by `schemaQuery.js` pulling schema from remote server).

### Repo Standards ###

* This repo uses tabs for formatting.
	* Please note that `SCSS Formatter for VS Code` does not respect VS Code settings and must have its settings specified independently (`Settings > Extensions > SCSS Formatter > Use Tabs`)

## Local Setup ##

* Clone repo locally
* Run `npm install` from root folder
* Run `npm start` to start local dev environment (monitoring, etc.)

## Deployment ##

TODO

## Known Issues / TODO ##

* Likely need to consolidate uses of GraphQL endpoint to an environment variable (referencing https://dev-reliant.pantheonsite.io/graphql in `schemaQuery.js` and `index.js`)

## Known Errors ##

* Pages may sometimes entirely fail to load. In these cases, you may need to edit the page, and turn on/off any checkboxes that have been created since the page was created and republish the page.
* Apollo dev tool may sometimes fail to load the Explorer, and give an error similar to `GraphQLError: Syntax Error: Invalid number, expected digit but got: "g"` (found by inspecting the Explorer window itself). In this case, you likely have a new checkbox ACF field that needs to be turned on/off and the page republished. This seems to only happen the first time after the field is added.

## Who to Contact ##

Mike Zevitas
Roger Peters
