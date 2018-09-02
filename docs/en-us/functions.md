---
title: Functions
---

redux-dusk provides the following functions:

## setupDusk

```jsx
setupDusk(handlers, [options])
```

### Parameters

- `handlers` - an object containing all the app's handlers, keyed by the handler's namespace

  ```jsx
  const handlers = {
    [App.nameSpace]: App,
    [Todos.nameSpace]: Todos,
    [News.nameSpace]: News,
  };
  ```

- `options` - an object containing options for redux-dusk. Currently unimplemented.

### Returns

```jsx
{
  reducers,      // root reducer
  types,         // all the handlers' generated types
  nameSpaces,    // the namespaces
  
  // functions - see docs for info
  stateMapper,
  actionsMapper,
}
```

### Usage

Used in your root `handler` file.

## stateMapper

```jsx
stateMapper(stateMap)
```

### Parameters

- `stateMap` - An object keyed with the variable names you want to map to your view. The values are an array with structure `[nameSpace, ?stateNameInHandler, ?type]`

### Returns

Used in Redux's `connect` function, returns essentially the same thing as `mapStateToProps`

### Usage

```jsx
export default connect(
  // variables from the store -> maps to this.props.$state
  stateMapper({
    todos: [nameSpaces.TODOS],           // accessible via this.props.$state.todos
    todoListTitle: [nameSpaces.TODOS],   // accessible via this.props.$state.todoListTitle
  }),
  actionsMapper([]),
)(View);
```

## actionsMapper

```jsx
actionsMapper(actionsList)
```
