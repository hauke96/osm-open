This file describes the basic development setup.

This project uses the following libraries and frameworks:

* npm
* Angular
* OpenLayers
* opening_hours

## Setup

1. Clone repo
2. Go into `client` folder and execute `npm install`

### Start using dev-server

The development server can be started manually or via your IDE.

**Manually:**

1. Go into `client` folder
2. Execute `npm run serve`

**Via IntelliJ/WebStorm:**

1. Edit run configurations
2. Add new npm config
3. Specify path to `package.json`
4. Use the following values
  * Command: npm
  * Script: start

After starting the dev server, the application is available under [localhost:4200](http://localhost:4200).

## Development

### Some principles

* Keep components simple
* Rather use `@Input()` instead of subscriptions to services
* Of course use descriptive variable, function and class names
* Write tests!

### Tests

Write tests for your code!

The coverage should be as high as possible.
Some things (like the styling on the POI-layer) are either to complex to test or there's little benefit, it's ok to not test this then. 

#### Run tests

Execute `npm run test` or `npm run test:coverage` to also have a coverage analysis.

## Translation

This project uses `ngx-translate` for internationalization (i18n).
Checkout the folder `assets/i18n`, there you'll find a file `en.json` with the original english texts.

### Create translation

1. Copy the `en.json` file and use the language code of your target language (e.g. `de`).
2. Now translate the values in the file. E.g. `"load-data": "Load data",` becomes `"load-data": "Loade Daten",`
3. In the `app.component.ts` there's a call to `addLangs`, add your language here

Note that there's currently no selection menu and therefore no support for other languages yet.

## Deployment

This project compiles basically into an HTML, JS and CSS file which can easily be hosted on any HTTP web server.

### Build project

Execute `npm run build:prod` for a production build, which sets the base-path to `/osm-open/` by default. 
The result can be found within the `dist` folder.

The `build:stage` script uses `/osm-open-stage/` as path.

### Hosting in sub-folder

If you want to host the application in a sub-folder other than `osm-open` or `osm-open-stage`, then you need to create a new build-script in the `package.json` to set a custom base path.
