import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LanguageProvider } from './language/LanguageProvider';
import { TranscriptionRequestProvider } from './transcriptionRequest/TranscriptionRequestProvider';
import TranscriptionRequestWorkshop from './transcriptionRequestWorkshop/TranscriptionRequestWorkshop';

const ApplicationViews = props => (
  <>
    <Route exact path="/" render={() => <Redirect to="/workshop" />} />
    <Route path="/logout" render={() => {
      localStorage.removeItem('current_user');
      return <Redirect to="/" />;
    }} />

    <TranscriptionRequestProvider>
      <LanguageProvider>
        <Route path="/workshop" component={TranscriptionRequestWorkshop} />
      </LanguageProvider>
    </TranscriptionRequestProvider>
  </>
);

export default ApplicationViews;