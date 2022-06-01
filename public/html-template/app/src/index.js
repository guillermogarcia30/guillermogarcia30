import React from 'react';
import { BrowserRouter } from "react-router-dom"
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async'
import App from './App';
import { store } from './store/store';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <HelmetProvider>
      <App>
      <Helmet>
        <title>Synapse</title>
      </Helmet>
      </App>
    </HelmetProvider>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);