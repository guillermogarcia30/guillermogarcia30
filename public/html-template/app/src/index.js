import React from 'react';
import { BrowserRouter } from "react-router-dom"
import { createRoot } from 'react-dom/client';
// React helmet for SEO
import { Helmet, HelmetProvider } from 'react-helmet-async'
// App component
import App from './App';
// redux
import { Provider } from 'react-redux';
import { store } from './store/store';
// styles
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
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
);