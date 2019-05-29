import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Dimmer, Loader } from 'semantic-ui-react';
import 'semantic-ui-css-rtl/semantic.rtl.css';
import './css/index.css';

import database, { firebase } from './firebase/firebase';
import { storeUser } from './actions';
import reducers from './reducers';
import App from './components/App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  {},
  composeEnhancers(applyMiddleware(thunk))
);

const loader = (
  <Dimmer active inverted>
    <Loader inverted size="large">
      يرجى الإنتظار
    </Loader>
  </Dimmer>
);

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(loader, document.getElementById('root'));

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRendered = true;
  }
};

firebase.auth().onAuthStateChanged(async user => {
  if (user) {
    const snapshot = await database.ref(`/users/${user.uid}`).once('value');
    if (snapshot.val() && snapshot.val().userInfo.isAdmin) {
      store.dispatch(storeUser(user.uid, snapshot.val().userInfo.role));
    }
    renderApp();
  } else {
    renderApp();
  }
});
