import React from 'react';
import { Route } from 'react-router-dom';

import ApplicationViews from './ApplicationViews';
import UnauthorizedUserLandingPage from './unauthorizedUserLandingPage/UnauthorizedUserLandingPage';
import Header from './header/Header';
import NavBar from './navbar/NavBar';
import { UserProvider } from './user/UserProvider';
import { LanguageProvider } from './language/LanguageProvider';

const UhhhWut = () => (
  <>
    <Route render={props => {
      if(localStorage.getItem('current_user')) {
        return (
          <>
            <Header />
            <NavBar />
            <ApplicationViews />
          </>
        );
      }
      else {
        return (
          <UserProvider>
            <LanguageProvider>
              <UnauthorizedUserLandingPage {...props} />
            </LanguageProvider>
          </UserProvider>
        );
      }
    }} />
  </>
);

export default UhhhWut;