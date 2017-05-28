import { createStore } from 'redux'
import reducer, { createGaState } from '../reducers/reducer';
import { defaultConfig } from '../containers/App';

function configureStore() {
  const preloadstate = createGaState(defaultConfig)
  return createStore(reducer, preloadstate)
}

export default configureStore

