import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TranscriptionRequestWorkshop from './transcriptionRequestWorkshop/TranscriptionRequestWorkshop';

const ApplicationViews = props => (
  <>
    <Route exact path="/" render={() => <Redirect to="/workshop" />} />
    <Route path="/logout" render={() => {
      localStorage.removeItem('current_user');
      return <Redirect to="/" />;
    }} />
    <Route path="/workshop" component={TranscriptionRequestWorkshop} />
  </>
);

export default ApplicationViews;