import React from 'react';
import { connect } from 'react-redux';
import { nameSpaces, stateMapper, actionsMapper } from '../handlers';

class View extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newTodoText: '',
    };
  }

  generateTodosList() {
    const { $state } = this.props;

    return (
      $state.todos.map(todo => (
        <li key={todo.id}>
          {todo.title}
        </li>
      ))
    );
  }

  generateDeleteTodosButton() {
    const { $state, $actions } = this.props;

    let button = null;
    if ($state.todos.length > 0) {
      button = (
        <div>
          <br />
          <button onClick={$actions.TODOS.deleteAll}>
            Click here to destroy all your ambitions
          </button>
        </div>
      );
    }

    return button;
  }

  render() {
    const {
      state,
      props: { $actions },
    } = this;

    return (
      <div>
        <h1>Trello, made for the 22nd century.</h1>
        <input
          type="text"
          placeholder="Add a new todo here"
          value={state.newTodoText}
          onChange={
            event => this.setState({ newTodoText: event.target.value })
          }
          onKeyDown={
            // save todo
            (event) => {
              if (event.key === 'Enter') {
                $actions.TODOS.insert(state.newTodoText);
                this.setState({ newTodoText: '' });
              }
            }
          }
        />
        {this.generateDeleteTodosButton()}
        <ul>
          {this.generateTodosList()}
        </ul>
      </div>
    );
  }
}

export default connect(
  // variables from the store -> maps to this.props.$state
  stateMapper({
    todos: [nameSpaces.TODOS],
  }),
  // actions -> maps to this.props.$actions.{SHADOW_NAME}
  actionsMapper([
    nameSpaces.TODOS,
  ]),
)(View);
