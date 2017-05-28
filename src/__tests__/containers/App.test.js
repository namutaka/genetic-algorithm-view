import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from '../../containers/App';
import configureStore from '../../store'

injectTapEventPlugin();

it('renders without crashing', () => {
  const store = configureStore()
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </Provider>
    , div);
});

