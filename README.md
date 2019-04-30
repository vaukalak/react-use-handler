# useHandler

[![NPM version](https://img.shields.io/npm/v/react-use-handler.svg?style=flat-square)](https://npmjs.org/package/react-use-handler)
[![Build Status](https://img.shields.io/travis/vadzim/react-use-handler/master.svg?style=flat-square)](https://travis-ci.org/vadzim/react-use-handler) <!-- [![Coverage Status](https://img.shields.io/codecov/c/github/vadzim/react-use-handler/master.svg?style=flat-square)](https://codecov.io/gh/vadzim/react-use-handler/branch/master) -->

## TL;DR

In most cases [`useCallback`](https://reactjs.org/docs/hooks-reference.html#usecallback "Hook API Reference") hook should work for you. But if it's not, you're in the right place :)

## What is it about?

This is an analogue of bound methods in class components, but for hooks.
Here is an example of a class component:

```javascript
  class ClassComponent extends React.Component {
    myHandler = (data) => {
      doSmth(data, this.props.prop1)
    }
    render() {
      return <ChildComponent onEvent={this.myHandler} />
    }
  }
```

or in a more brutal way

```javascript
  class ClassComponent extends React.Component {
    constructor() {
      this.myHandler = this.myHandler.bind(this)
    }
    myHandler(data) {
      doSmth(data, this.props.prop1)
    }
    render() {
      return <ChildComponent onEvent={this.myHandler} />
    }
  }
```

`myHandler` method has access to actual `props` and `state` while `ChildComponent` receives the same instance of `myHandler` in its prop on every render.
This feature can be usefull in some cases.

### Use case #1.

Suppose you are using ChildComponent and want to get notifications from it on some events:

```javascript
  <ChildComponent onCoolEvent={(data) => { /* .... */ })} />
```

Actually `ChildComponent` receives newly created instance of a function in `onCoolEvent` prop on each render.
Sometimes it is not a problem, sometimes it is. Sometimes [`useCallback`](https://reactjs.org/docs/hooks-reference.html#usecallback "Hook API Reference") will help you. In case it's a problem and [`useCallback`](https://reactjs.org/docs/hooks-reference.html#usecallback "Hook API Reference") is not enough just wrap that function with `useHandler` like this

```javascript
  <ChildComponent onCoolEvent={useHandler((data) => { /* .... */ })} />
```

`useHandler` guarantees that its return value will never change, but it'll always call the actual instance of your function with correct bindings.

### Use case #2.

Suppose you are developing a component with some expensive async effects. Like so:

```javascript
  const EffectiveComponent = ({ prop1, prop2, onFirstStage, onSecondStage }) => {
    /*...*/
    useEffect(() => {
      let mounted = true

      void async function () {
        // very expensive calcaulations1....
        if (!mounted) return
        onFirstStage()
        // even more expensive calcaulations2....
        if (!mounted) return
        onSecondStage()
      }()

      return () => { mounted = false }
    }, [prop1, prop2])
  }
```

Let's imagine you appreciate your effect very much and do not want to restart it if some of event props change. You want your effect to just do its work and emit some events. But there is a problem. If `on...` prop change you should restart your effect otherwise eventually it will call obsolete things. If you restart your effect on minor prop changes you can end up with some bad user experience.

To escape this you could make a ref, store there your event handler and then call it inside your effect without any trouble. But that's exactly what `useHandler` does! Let's use it:

```javascript
  const EffectiveComponent = ({ prop1, prop2, onFirstStage, onSecondStage }) => {
    /*...*/
    const onFirstEvent = useHandler(onFirstStage)
    const onSecondEvent = useHandler(onSecondStage)

    useEffect(() => {
      let mounted = true

      void async function () {
        // very expensive calcaulations #1....
        if (!mounted) return
        onFirstEvent()
        // even more expensive calcaulations #2....
        if (!mounted) return
        onSecondEvent()
      }()

      return () => { mounted = false }
    }, [prop1, prop2])

    return /*....*/
  }
```

`useHandler` also handles the case when callback is actually undefined or null. In those cases it calls nothing and returns undefined.

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [useHandler](#usehandler)
    -   [Parameters](#parameters)

### useHandler

This hook makes a proxy for a function.
It guarantees to return the same instance across multiple renders. It calls nothing if actual handler is nullish.

#### Parameters

-   `f` **Func?** Some recreatable function to wrap.

Returns **Func** function.

## License

MIT © [Vadzim Zieńka](https://github.com/vadzim)
