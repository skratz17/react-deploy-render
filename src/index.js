import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import UhhhWut from './components/UhhhWut';
import { ApiProvider } from './ApiProvider';
import localeData from './locales.json';
import './index.css';

const DEFAULT_LANGUAGE = 'en';

// figure out the user's language acc. to browser settings
const language = (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage;

// remove the region code from their language (e.g., en-US -> en)
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

// get the set of messages for that language, or fall back to DEFAULT_LANGUAGE messages if not found
const messages = localeData[languageWithoutRegionCode] ||
  localeData[language] ||
  localeData[DEFAULT_LANGUAGE];

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <IntlProvider locale={language} messages={messages}>
        <ApiProvider>
          <UhhhWut />
        </ApiProvider>
      </IntlProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);