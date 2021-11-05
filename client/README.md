This file describes the basic development setup.

This project uses

* npm
* Angular
* OpenLayers
* opening_hours

# Setup

* Clone repo
* Go into `client` folder and execute `npm install`

# Start using dev-server

Either via your IDE or:

* Go into `client` folder
* Execute `npm run serve`

The application is not available under [localhost:4200](http://localhost:4200)

# Run tests

* Execute `npm run test`

# Build project

* Execute `npm run build`

The result can be found within the `dist` folder.

## Hosting in sub-folder

If you want to host the application in a subfolder (like the `osm-open` folder in `https://hauke-stieler.de/osm-open/`), then some steps are necessary **before** building:

* Adjust the `<base href="...">` value in the `index.html`
* Add a prefix value in the `app.module.ts`: Instead of the normal factory function use `useFactory: (httpClient: HttpClient) => new TranslateHttpLoader(httpClient, "/osm-open/assets/i18n/")`. Here `/osm-open/assets/i18n/` specified the path to the translation files.
* Build application as described above

# Deployment

Just upload is to your webspace.
