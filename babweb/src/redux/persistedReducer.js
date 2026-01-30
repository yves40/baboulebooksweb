import { persistReducer } from 'redux-persist';
import storageEngine from './storageEngine';
import menuproperties from './menuProperties';
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage: storageEngine,
};

const rootReducer = combineReducers({
  // Your reducers here
  menuproperties: menuproperties,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
