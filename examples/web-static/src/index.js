import React from 'react';
import ReactDOM from 'react-dom';
import { IS_BROWSER } from './helpers/globals';

// Your top level component
import App from './App';

// Export your top level component as JSX (for static rendering)
export default App;

// Render your app
if (IS_BROWSER) {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate || ReactDOM.render;
  const render = (Comp) => {
    renderMethod(<Comp />, document.getElementById(`root`));
  };

  // Render!
  render(App);
}
