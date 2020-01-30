# rollup-plugin-esm-import-to-url

Rollup plugin to transform "bare" import specifiers to absolute URLs in ES modules

[![Dependencies](https://img.shields.io/david/trygve-lie/rollup-plugin-esm-import-to-url.svg)](https://david-dm.org/trygve-lie/rollup-plugin-esm-import-to-url)
[![GitHub Actions status](https://github.com/trygve-lie/rollup-plugin-esm-import-to-url/workflows/Run%20Lint%20and%20Tests/badge.svg)](https://github.com/trygve-lie/rollup-plugin-esm-import-to-url/actions)
[![Known Vulnerabilities](https://snyk.io/test/github/trygve-lie/rollup-plugin-esm-import-to-url/badge.svg)](https://snyk.io/test/github/trygve-lie/rollup-plugin-esm-import-to-url)

## Installation

```bash
$ npm install rollup-plugin-esm-import-to-url
```

## Usage

```js
import esmImportToUrl from 'rollup-plugin-esm-import-to-url';

export default {
    input: 'source/main.js',
    plugins: [esmImportToUrl({
        imports: {
            'some-library': 'http://cdn.com/some-library/v1',
        },
    })],
    output: {
        file: 'build.js',
        format: 'esm'
    }
};
```

## Description

This plugin transforms "bare" import specifiers to absolute URL specifiers in
ES modules. The module refered to by the "bare" import specifier will be
treated as an external and its source will not be included in the bundle but
refered to by the URL.

In our source:

```js
import { LitElement, html, css } from 'lit-element';
```

In our Rollup config, we map `lit-element` to a bundle on a CDN:

```js
export default {
    input: 'source/main.js',
    plugins: [esmImportToUrl({
        imports: {
            'lit-element': 'https://cdn.pika.dev/lit-element/v2',
        },
    })],
    output: {
        file: 'build.js',
        format: 'esm'
    }
};
```

Our output bundle will then be:

```js
import { LitElement, html, css } from 'https://cdn.pika.dev/lit-element/v2';
```

## Options

This plugin takes an [import map](https://github.com/WICG/import-maps) as options:

| option             | default  | type      | required | details                                                     |
| ------------------ | -------- | --------- | -------- | ----------------------------------------------------------- |
| imports            | `{}`     | `object`  | `false`  | Mapping between "bare" import specifiers and absolute URLs. |

This module will only care about "bare" import specifiers which maps to absolute
URLs in the import map. Any other import specifiers defined in the import map
will be ignored.

## Note on externals

The imports defined for `imports` to this module must not occure in the Rollup `external` option.
If so, this module will throw.

In other words, this will not work:

```js
export default {
    input: 'source/main.js',
    external: ['lit-element'],
    plugins: [esmImportToUrl({
        imports: {
            'lit-element': 'https://cdn.pika.dev/lit-element/v2',
        },
    })],
    output: {
        file: 'build.js',
        format: 'esm'
    }
};
```

## ESM only

This module will only work when the output are ES modules.

## License

Copyright (c) 2019 Trygve Lie

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
