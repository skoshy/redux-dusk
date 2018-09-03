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

### Parameters

- `actionsList` - Array of namespaces that you'd like to inherit actions from .

### Returns

Used in Redux's `connect` function, returns essentially the same thing as `mapDispatchToProps`

### Usage

```jsx
export default connect(
  stateMapper({}),
  // actions -> maps to this.props.$actions.{HANDLER_NAMESPACE}
  actionsMapper([
    nameSpaces.TODOS // maps actions to this.props.$actions.TODOS.{actionName}()
  ]),
)(View);
```

## getPartFromHandlers

```jsx
getPartFromHandlers(handlers, partName)
```

### Parameters

- `handlers`
- `partName` - The part of the handlers to get

### Returns

Returns either an {} or a [] depending on how the `partName` is defined within the handlers. For instance, logic returns as an [].

### Usage

```jsx
const combinedLogic = getPartFromHandlers(handlers, 'logic');
```

## createHandler

```jsx
createHandler(params = {
  nameSpace,
  initialState,
  types,
})
```

### Parameters

Takes in an object that contains the following keys

- `nameSpace` - a name to prefix all your types with and a unique identifier for this handler
- `initialState` - the initial state/variables of this handler
- `types` - A nested object that defines the types for this handler and what actions/reducers should be mapped to each type.

  - `action` - can be one of the following:
    - `[]` - a list of variable names corresponding with the arguments of the generated action. For example, if we do:

      ```jsx
      // assuming the nameSpace is TODOS

      INSERT: {
        action: ['title', 'text']
      }
      ```

      This will generate an action that can be used within components/pages as follows:

      ```jsx
      this.props.$actions.TODOS.insert('My Todo Title', 'My todo text');
      ```
    - `({ type }, ...params) => {}` - a function that takes in an object with the generated type, as well as other params that can be used within your Views.

      Example:

      ```jsx
      // assuming the nameSpace is TODOS

      INSERT: {
        action: ({ type }, title, text) => {
          // this will return an object to be dispatched to the reducers
          return {
            type,
            title,
            text,
          };
        }
      }
      ```

      And in your action you can use:

      ```jsx
      this.props.$actions.TODOS.insert('My Todo Title', 'My todo text');
      ```
  - `reducer` - can be one of the following:
    - `[]` - list containing the following:
      - string of a state variable you'd like to update
      - an object with the keys being variables to update from the state and values being the new values
