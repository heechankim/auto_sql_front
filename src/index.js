import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from 'components/Root';

// 3rd-party
import {Provider} from 'react-redux'
import {PersistGate} from "redux-persist/integration/react";

// applictaion
import {Store, Persistor} from 'Store'

ReactDOM.render(
  <Provider store={Store}>
      <PersistGate persistor={Persistor}>
        <Root />
      </PersistGate>
  </Provider>,
  document.getElementById('root')
);
