---
title: Functions
---

redux-dusk provides the following functions:

## setupDusk

```jsx
setupDusk(handlers, [options])
```

### Parameters

- `handlers` - an object containing all the app's handlers, keyed by the handler's namespace. Or just an array of the handlers, and `setupDusk` will do the work of mapping them based on their namespaces.

  ```jsx
  const handlers = {
    [App.nameSpace]: App,
    [Todos.nameSpace]: Todos,
    [News.nameSpace]: News,
  };
  ```

  ```jsx
  const handlers = [
    App,
    Todos,
    News,
  ];
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
    - `(state) => {}` - function that performs a reduction to your state

      Example:

      ```jsx
      (state) => {
        return {
          ...state,
          numberOfTitleResets: state.numberOfTitleResets + 1
        };
      },
      ```
    - `{}` - object structured as follows:
      - `reduce` - Either an array as mentioned above, or a function as mentioned above.
      - `reset` - a list of state variables to reset to their initial state. Or set to `true` to reset the whole handler's state.
      - Example:

        ```jsx
        reducer: {
          reduce: (state) => {
            return { ...state, numberOfTitleResets: state.numberOfTitleResets + 1 };
          },
          reset: ['todoListTitle'],
        },
        ```

### Usage

```jsx
function insertTodo(state, action) {
  state.todos.push({
    id: state.todos.length + Math.random(),
    title: action.title,
  });
  return { ...state };
}

function deleteTodo(state, action) {
  return {
    ...state,
    todos: state.todos.filter((todo) => {
      // filter out the todo with the given todoId
      return todo.id !== action.todoId;
    }),
  };
}

const { nameSpace, types, actions, reducer } = createHandler({
  nameSpace: 'TODOS',
  initialState: {
    todos: [],
    todoListTitle: 'My Todos',
    numberOfTitleResets: 0,
  },
  types: {
    UPDATE: {
      TITLE: {
        // TODOS_UPDATE_TITLE
        action: ['todoListTitle'],       // $actions.TODOS.updateTitle(todoListTitle);
        reducer: ['todoListTitle'],      // case 'TODOS_UPDATE_TITLE': return { ...state, todoListTitle }
      },
    },
    INSERT: {
      // TODOS_INSERT
      action: ['title'],
      reducer: insertTodo,
    },
    DELETE: {
      // TODOS_DELETE
      action: ['todoId'],
      reducer: deleteTodo,

      ALL: {
        // TODOS_DELETE_ALL
        action: [],
        reducer: {
          reset: true,
        },
      },
    },
    RESET: {
      ALL: {
        // TODOS_RESET_ALL
        action: [],
        reducer: {
          reset: true,
        },
      },
      TITLE: {
        // TODOS_RESET_TITLE
        action: [],
        reducer: {
          reduce: (state) => {
            return { ...state, numberOfTitleResets: state.numberOfTitleResets + 1 };
          },
          reset: ['todoListTitle'],
        },
      },
    },
  },
});
```
