# An ExpressJS Website Template Incorporating Gulp, React, Bootsrap and Other Popular Libraries

> (That's a mouthful)

> #### Based on NodeJS, of course!

This is a [NodeJS](https://nodejs.org/) website template with a working gulpfile. It combines the following packages:

- Twitter Bootstrap 3
- Bower
- React (+Bootstrap Specific Modules)
- Gulp

Vendors included in bower:

- bootstrap v3.3
- jquery (gets auto-downloaded by bootstrap)
- font-awesome v4.3
- react v0.14
- lodash v4.11
- numeraljs v1.5.3
- validator-js v3.30
- react-bootstrap v0.28.3

Gulp tasks will do the following:

- Clean and download bower files
- Combine into one file all vendor js and css files
- Build react files and combine into a single file
- Start server and restart if any files change

Production mode will minify css and uglify javascript.

The gulpfile contains an editable `vendors` array. Use this to control what gets combined into one file and how react files map vendor libraries (eg jquery).

## Installation

```bash
$ git clone https://github.com/jpfluger/expressjs-website-template-with-gulp-react-bootstrap.git
$ cd expressjs-website-template-with-gulp-react-bootstrap
$ npm install
```

## RUN

Production:

```js
gulp prod-server
```

Development:

```js
gulp dev-server
```

The default server runs at [http://localhost:3083](http://localhost:3083).  The `server.js` is found in `src/server.js`.

## BUILD (no run)

Production:

```js
gulp prod-build
```

Development:

```js
gulp dev-build
```

#### Clean Project

Run task `clean`:

```js
gulp clean
```

Clean deletes the contents of the following directories:

- `public/third/`: contains a copy of bower libraries
- `public/build/`: the compiled third party bower libraries and react modules

#### Default Gulp Task

Clean and Download Bower libraries:

```js
gulp default
```

## [MIT Licensed](LICENSE)
