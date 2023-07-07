<%- lib.renderOpening() %>

## Install

<%- await lib.renderCode('npm install pathstruct', 'sh', 'https://www.npmjs.com/package/pathstruct') %>

## Example Usage

### parse

Parse key-value pairs from a file path:

```js
const pathstruct = require('pathstruct');
const str = 'event="Birthday party"/IMG1234 caption="Blowing out candles".jpg';
const obj = pathstruct.parse(str);
// { event: 'Birthday party', caption: 'Blowing out candles' }
```

Parse key-value pairs including arrays and nested object structures:

```js
const pathstruct = require('pathstruct');
const str = 'val=foobar arr=[foo,bar] x.val=foobar x.arr=[foo,bar]';
const obj = pathstruct.parse(str);
// { val: 'foobar', arr: ['foo', 'bar'], x: { val: 'foobar', arr: ['foo', 'bar']} }
```

### stringify

```js
const pathstruct = require('pathstruct');
const obj = { val: 'foobar', arr: ['foo', 'bar'], x: { val: 'foobar', arr: ['foo', 'bar']} };
const str = pathstruct.stringify(obj);
// val=foobar arr=[foo,bar] x.val=foobar x.arr=[foo,bar]
```

## Architecture

<%- await lib.renderModuleDiagram() %>
