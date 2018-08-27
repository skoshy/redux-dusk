import { createHandler } from '../lib/src/dusk';

function insertTodo(state, action) {
  console.log('new todo', state, action);
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

export const initialState = {
  todos: [],
};

export const { nameSpace, types, actions, reducer } = createHandler({
  nameSpace: 'TODOS',
  initialState,
  types: {
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
  },
});

console.log('types', types);
