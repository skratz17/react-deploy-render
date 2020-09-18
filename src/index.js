import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import UhhhWut from './components/UhhhWut';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <IntlProvider>
        <UhhhWut />
      </IntlProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);