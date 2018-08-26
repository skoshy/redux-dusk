import React from 'react';
import { connect } from '../lib/src/dusk';
import { shadows } from '../shadows';

class TrelloPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newTodoText: '',
    };
  }

  generateTodosList() {
    const {
      $state: {
        todos,
      },
    } = this.props;

    return (
      todos.map(todo => (
        <li key={todo.id}>
          {todo.title}
        </li>
      ))
    );
  }

  generateDeleteTodosButton() {
    let button = null;
    if (this.props.$state.todos.length > 0) {
      button = (
        <div>
          <br />
          <button onClick={this.props.$actions.todos.clearTodos}>
            Click here to destroy all your ambitions
          </button>
        </div>
      );
    }

    return button;
  }

  render() {
    return (
      <div>
        <h1>Trello, made for the 22nd century.</h1>
        <input
          type="text"
          placeholder="Add a new todo here"
          value={this.state.newTodoText}
          onChange={
            event => this.setState({ newTodoText: event.target.value })
          }
          onKeyDown={
            // save todo
            (event) => {
              if (event.key === 'Enter') {
                this.props.$actions.todos.insertTodo(this.state.newTodoText);
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

// all of mapStateToProps and everything else redux does is right here :)
export default connect(
  TrelloPage,      // the view we're connecting
  [shadows.TODOS], // actions -> maps to this.props.$actions.{SHADOW_NAME}

  // variables from the store -> maps to this.props.$state
  {
    todos: [shadows.TODOS],
  },
);
