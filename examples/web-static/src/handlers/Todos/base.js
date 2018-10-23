import { createHandler } from '../../lib';
import { insertTodo, deleteTodo, resetTitle } from './actions';

const initialState = {
  todos: [],
  todoListTitle: `My Todos`,
  numberOfTitleResets: 0,
};

export const { nameSpace, types, actions, reducer } = createHandler({
  // namespace this handler, so it can be separated from other handlers
  nameSpace: `TODOS`,

  // must pass in the initial state
  initialState,

  // define types, actions, and reducers here in a nested format
  types: {
    UPDATE: {
      TITLE: {
        // TODOS_UPDATE_TITLE
        action: [`todoListTitle`],    // $actions.TODOS.updateTitle(todoListTitle);
        reducer: [`todoListTitle`],   // case 'TODOS_UPDATE_TITLE': return { ...state, todoListTitle }
      },
    },
    INSERT: {
      // TODOS_INSERT
      action: [`title`],              // $actions.TODOS.insert(title);
      reducer: insertTodo,
    },
    DELETE: {
      // TODOS_DELETE
      action: [`todoId`],             // $actions.TODOS.delete(todoId);
      reducer: deleteTodo,

      ALL: {
        // TODOS_DELETE_ALL
        action: [],                   // $actions.TODOS.deleteAll();
        reducer: {
          reset: [`todos`],           // this will just reset `todos` back to its initial
        },
      },
    },
    RESET: {
      ALL: {
        // TODOS_RESET_ALL
        action: [],                   // $actions.TODOS.resetAll();
        reducer: {
          reset: true,                // this will revert the entire TODOS state to its initial
        },
      },
      TITLE: {
        // TODOS_RESET_TITLE
        action: [],                   // $actions.TODOS.resetTitle();
        reducer: {
          reduce: resetTitle,
          reset: [`todoListTitle`],   // this will just reset `todoListTitle` back to its initial
        },
      },
    },
  },
});
