export const name = 'todos';

export const initialState = {
  todos: [],
};

export const types = {
  INSERT_TODO: `${name}/INSERT_TODO`,
  DELETE_TODO: `${name}/DELETE_TODO`,
  CLEAR_TODOS: `${name}/CLEAR_TODOS`,
};

export const actions = {
  insertTodo: title => ({ type: types.INSERT_TODO, title }),
  deleteTodo: todoId => ({ type: types.DELETE_TODO, todoId }),
  clearTodos: () => ({ type: types.CLEAR_TODOS }),
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case types.INSERT_TODO:
      state.todos.push({
        id: state.todos.length + Math.random(),
        title: action.title,
      });
      return { ...state };
    case types.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => {
          // filter out the todo with the given todoId
          return todo.id !== action.todoId;
        }),
      };
    case types.CLEAR_TODOS:
      console.log('should be clearing');
      return { ...initialState };
    default:
      return state;
  }
}
