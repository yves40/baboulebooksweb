'use client';

/**
 * Providers component to wrap the application with Redux store provider.
 * 
 * Look at this article : https://khizerrehandev.medium.com/how-to-configure-redux-toolkit-with-nextjs-using-typescript-384531fa7501
 * 
 * This is a crucial step as in order to wrap the Next.js Application with store so that 
 * component access store Root Layout needs to be wrapped with custom provider which 
 * can pass store to all children components.
 */
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store';

export function Providers({ children }) {
  return 
    <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
      {children}
    {/* </PersistGate> */}
    </Provider>;
}

export default Providers;