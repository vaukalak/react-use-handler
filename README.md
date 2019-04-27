# nod

[![NPM version](https://img.shields.io/npm/v/react-use-handler.svg?style=flat-square)](https://npmjs.org/package/react-use-handler)
[![Build Status](https://img.shields.io/travis/vadzim/react-use-handler/master.svg?style=flat-square)](https://travis-ci.org/vadzim/react-use-handler) [![Coverage Status](https://img.shields.io/codecov/c/github/vadzim/react-use-handler/master.svg?style=flat-square)](https://codecov.io/gh/vadzim/react-use-handler/branch/master)

## TL;DR

In most cases [`useCallback`](https://reactjs.org/docs/hooks-reference.html#usecallback "Hook API Reference") hook should work for you. But if it's not, you're in the right place :)

## What is it about?

Suppose you have the code

```javascript
  <ChildComponent onCoolEvent={(data) => { /* .... */ })} />
```

`ChildComponent` receives newly created instance of a function in `onCoolEvent` prop on each render.
Sometimes it is not a problem, sometimes it is. Sometimes [`useCallback`](https://reactjs.org/docs/hooks-reference.html#usecallback "Hook API Reference") will help you. In case it's a problem and [`useCallback`](https://reactjs.org/docs/hooks-reference.html#usecallback "Hook API Reference") is not enough just wrap that function with `useHandler` like this

```javascript
  <ChildComponent onCoolEvent={useHandler((data) => { /* .... */ })} />
```

`useHandler` guarantees that its return value will never change, but it'll always call the actual instance of your function with correct bindings.

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [useHandler](#usehandler)
    -   [Parameters](#parameters)

### useHandler

This hook makes a proxy for a function.
It guarantees to return the same instance across multiple renders.

#### Parameters

-   `f` **Func** Some recreatable function to wrap in.

Returns **Func** function.

## License

MIT © [Vadzim Zieńka](https://github.com/vadzim)
