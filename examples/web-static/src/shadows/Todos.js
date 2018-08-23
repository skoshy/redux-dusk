export const name = 'todos';

export const initialState = {
  todos: [],
};

export const types = {
  INSERT_TODO: `${name}/INSERT_TODO`,
  CLEAR_TODOS: `${name}/CLEAR_TODOS`,
};

export const actions = {
  insertTodo: title => ({ type: types.INSERT_TODO, title }),
  clearTodos: () => ({ type: types.CLEAR_PROGRESS }),
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case types.INSERT_TODO:
      return {
        ...state,
        todos: state.todos.push({
          id: Math.random(),
          title: action.title,
        }),
      };
    case types.CLEAR_TODOS:
      return { ...initialState };
    default:
      return state;
  }
}
