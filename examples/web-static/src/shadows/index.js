import * as Todos from './Todos';
import * as News from './News';
import { setupDusk } from '../lib/src/dusk';

export const shadows = {
  TODOS: Todos.name,
  NEWS: News.name,
};

export const shadowsMap = {
  [shadows.TODOS]: Todos,
  [shadows.NEWS]: News,
};
