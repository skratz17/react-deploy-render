import React from 'react';
import { Route } from 'react-router-dom';

import ApplicationViews from './ApplicationViews';
import UnauthorizedUserLandingPage from './auth/UnauthorizedUserLandingPage/UnauthorizedUserLandingPage';

const UhhhWut = () => (
  <>
    <Route render={() => {
      if(localStorage.getItem('current_user')) {
        return (
          <>
            <h1>website</h1>
            <nav>navigation</nav>
            <ApplicationViews />
          </>
        );
      }
      else {
        return (
          <UnauthorizedUserLandingPage />
        );
      }
    }} />
  </>
);

export default UhhhWut;