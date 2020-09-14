import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ApplicationViews = props => (
  <>
    <Route exact path="/" render={() => <Redirect to="/workshop" />} />
    <Route path="/logout" render={() => {
      localStorage.removeItem('current_user');
      return <Redirect to="/" />;
    }} />
    <Route path="/workshop" render={() => <div>workshop</div>} />
  </>
);

export default ApplicationViews;