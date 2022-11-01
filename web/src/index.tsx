import React from 'react';
import ReactDOM from 'react-dom/client';
import NavigationProvider from './Providers/Navigation/NavigationProvider';

import App from './Pages/App/App';

import './index.css';
import FetchProvider from './Providers/Fetch/FetchProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <NavigationProvider>
      <FetchProvider>
        <App />
      </FetchProvider>
    </NavigationProvider>
  </React.StrictMode>
);
