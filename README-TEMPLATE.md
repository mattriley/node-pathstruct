<%- lib.renderOpening() %>

## Install

<%- await lib.renderCode('npm install pathstruct', 'sh', 'https://www.npmjs.com/package/pathstruct') %>

## Example Usage

### `stringify`

```js
const pathstruct = require('pathstruct');
const obj = { val: 'foobar', arr: ['foo', 'bar'], x: { val: 'foobar', arr: ['foo', 'bar']} };
const str = pathstruct.stringify(obj);
// val=foobar arr=[foo,bar] x.val=foobar x.arr=[foo,bar]
```

### `parse`

```js
const pathstruct = require('pathstruct');
const str = 'val=foobar arr=[foo,bar] x.val=foobar x.arr=[foo,bar]';
const obj = pathstruct.parse(str);
// { val: 'foobar', arr: ['foo', 'bar'], x: { val: 'foobar', arr: ['foo', 'bar']} }
```

## Architecture

<%- await lib.renderModuleDiagram() %>
