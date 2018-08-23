import * as Todos from './Todos';
import * as News from './News';

export const shadows = {
  TODOS: Todos.name,
  NEWS: News.name,
};

export const shadowsMap = {
  [shadows.TODOS]: Todos,
  [shadows.NEWS]: News,
};
