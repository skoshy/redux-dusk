import { createHandler } from '../../lib';

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

export const initialState = {
  todos: [],
  todoListTitle: 'My Todos',
  numberOfTitleResets: 0,
};

export const { nameSpace, types, actions, reducer } = createHandler({
  nameSpace: 'TODOS',
  initialState,
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
