import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import UhhhWut from './components/UhhhWut';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UhhhWut />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);