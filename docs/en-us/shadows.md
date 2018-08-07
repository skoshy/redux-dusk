# Shadows

Let's see the typical structure of a shadow file.

```javascript
// Auth.js, a shadow file for Authentication
​
import { createLogic } from 'redux-logic';
import { createSelector } from 'reselect';
import axios from 'axios';
​
export const name = 'auth';
​
export const initialState = {
  isLoading: false,
  error: null,
  token: '',
};
​
export const types = {
  AUTO_LOGIN: `${name}/AUTH_AUTO_LOGIN`,
  LOGIN_REQUEST: `${name}/LOGIN_REQUEST`,
  LOGIN_SUCCESS: `${name}/LOGIN_SUCCESS`,
  LOGIN_FAILURE: `${name}/LOGIN_FAILURE`,
  LOGOUT: `${name}/LOGOUT`,
};
​
export const actions = {
  signup: (email, password) => ({ type: types.SIGNUP_REQUEST, email, password }),
  login: (email, password) => ({ type: types.LOGIN_REQUEST, email, password }),
  logout: () => ({ type: types.LOGOUT }),
};
​
const selectors = {};
selectors.getToken = state => state[name].token;
selectors.isTokenValid = createSelector([selectors.getToken], token => !!token && token !== '');
export { selectors };
​
export const logic = {
  login: createLogic({
    type: types.LOGIN_REQUEST, // only apply this logic to this type
    cancelType: types.LOGIN_FAILURE, // cancel on this type
    latest: true, // only take latest
​
    process({ action }, dispatch, done) {
      const url = '/app/authenticate';
      const body = {
        username: action.username,
        password: action.password,
      };
      const options = { headers: { Accept: 'application/json' } };
​
      axios.post(url, body, options)
        .then(resp => resp.userInfo)
        .then(userInfo => dispatch({
          type: types.LOGIN_SUCCESS,
          payload: userInfo,
        }))
        .catch(
          err => console.error(err)
          && dispatch({
            type: types.LOGIN_FAILURE,
            payload: err,
            error: true,
          }),
        )
        .then(() => done());
    },
  }),
};
​
export function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return { ...state, isLoading: true, error: null };
    case types.LOGIN_SUCCESS:
      return { ...state, isLoading: false, token: action.token };
    case types.LOGIN_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    case types.LOGOUT:
      return { ...state, token: null };
    default:
      return state;
  }
}
```
​
There's a lot going on here, so let's break it down piece by piece.

## Name & Initial State

```javascript
export const name = 'auth';
​
export const initialState = {
  isLoading: false,
  error: null,
  token: '',
};
```

These two variables lay out the basic information for this shadow:

1. what is its name
1. what is its initial state

The state here will be mapped in Redux and any shine will be able to grab this shadow's state by just specifying the state variable name. More on that later.

## Types

```javascript
export const types = {
  AUTO_LOGIN: `${name}/AUTH_AUTO_LOGIN`,
  LOGIN_REQUEST: `${name}/LOGIN_REQUEST`,
  LOGIN_SUCCESS: `${name}/LOGIN_SUCCESS`,
  LOGIN_FAILURE: `${name}/LOGIN_FAILURE`,
  LOGOUT: `${name}/LOGOUT`,
};
```

Types are used in a shadow to indicate the type of action being performed. These types will be referenced within `actions`, `selectors`, and `logic`.

Notice how each type is a string with a prefix being the `name` of the shadow. This helps to prevent conflicts in case two shadows use the same type name.

## Actions & Selectors

```javascript
export const actions = {
  signup: (email, password) => ({ type: types.SIGNUP_REQUEST, email, password }),
  login: (email, password) => ({ type: types.LOGIN_REQUEST, email, password }),
  logout: () => ({ type: types.LOGOUT }),
};
​
const selectors = {};
selectors.getToken = state => state[name].token;
selectors.isTokenValid = createSelector([selectors.getToken], token => !!token && token !== '');
export { selectors };
```

Actions are the methods passed to shines that let them instruct a shadow to change some part of the state or run some logic.

For example, a shine can have a `<Button />` that triggers the `login` action. We'll get into this in the [Shines](en-us/shines) section.
