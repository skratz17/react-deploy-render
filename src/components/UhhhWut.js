import React from 'react';
import { Route } from 'react-router-dom';

import ApplicationViews from './ApplicationViews';
import UnauthorizedUserLandingPage from './auth/UnauthorizedUserLandingPage/UnauthorizedUserLandingPage';
import Header from './header/Header';
import { UserProvider } from './user/UserProvider';

const UhhhWut = () => (
  <>
    <Route render={props => {
      if(localStorage.getItem('current_user')) {
        return (
          <>
            <Header />
            <nav>navigation</nav>
            <ApplicationViews />
          </>
        );
      }
      else {
        return (
          <UserProvider>
            <UnauthorizedUserLandingPage {...props} />
          </UserProvider>
        );
      }
    }} />
  </>
);

export default UhhhWut;