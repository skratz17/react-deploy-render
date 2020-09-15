import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { TranscriptionRequestContext } from '../TranscriptionRequestProvider';
import { LanguageContext } from '../../language/LanguageProvider';
import TranscriptionRequestConfirm from './TranscriptionRequestConfirm/TranscriptionRequestConfirm';
import transcriptionRequestConfirmFormConfig from './TranscriptionRequestConfirm/transcriptionRequestConfirmConfig';
import { useFormConfig, useIsFormValid } from '../../form/formCustomHooks';

const WIZARD_STATES = {
  TRANSCRIPTION_REQUEST_CONFIRM: 0,
  TRANSCRIPTION_CREATION: 1
};

const TranscriptionRequestActivationWizard = props => {
  const { transcriptionRequestId, isShowing } = props;

  const { getTranscriptionRequestById } = useContext(TranscriptionRequestContext);
  const { languages, getLanguages } = useContext(LanguageContext);

  const [ currentStep, setCurrentStep ] = useState(0);
  const [ transcriptionRequestToConfirm, setTranscriptionRequestToConfirm ] = useState(null);
  const [ transciptionRequestFormConfig, handleTranscriptionRequestChange, updateTranscriptionRequestFormConfig, resetTranscriptionRequestFormConfig ] = useFormConfig(transcriptionRequestConfirmFormConfig);
  const isTranscriptionRequestFormValid = useIsFormValid(transciptionRequestFormConfig);

  useEffect(() => {
    // react yells at you if your useEffect callback is async so it recommends you do this, that's the only reason this function exists otherwise i'd just do that async operation directly in the useEffect callback
    const _getTranscriptionRequestById = async id => {
      const _transcriptionRequestToConfirm = await getTranscriptionRequestById(id);
      setTranscriptionRequestToConfirm(_transcriptionRequestToConfirm);
    }

    if(transcriptionRequestId) {
      resetTranscriptionRequestFormConfig();
      getLanguages();
      _getTranscriptionRequestById(transcriptionRequestId);
    }
  }, [ transcriptionRequestId ]);

  // populate language dropdown in form with loaded languages data
  useEffect(() => {
    if(languages.length && !transciptionRequestFormConfig.languageId.items.length) {
      const items = languages.map(l => ({ value: l.id, displayName: l.name }));
      updateTranscriptionRequestFormConfig('languageId', items, 'items');
    }
  }, [ languages, transciptionRequestFormConfig, updateTranscriptionRequestFormConfig ]);

  // populate startTime and endTime inputs in form with loaded transcriptionRequest data
  useEffect(() => {
    if(transcriptionRequestToConfirm) {
      const { startTime, endTime, languageId } = transcriptionRequestToConfirm;

      updateTranscriptionRequestFormConfig('startTime', startTime + '');
      updateTranscriptionRequestFormConfig('endTime', endTime + '');
      updateTranscriptionRequestFormConfig('languageId', languageId ? languageId + '' : '');
    }
  }, [ transcriptionRequestToConfirm ]);

  if(transcriptionRequestId === null) {
    return null;
  }

  let transcriptionRequestActivationWizardBody;
  switch(currentStep) {
    case WIZARD_STATES.TRANSCRIPTION_REQUEST_CONFIRM:
      transcriptionRequestActivationWizardBody =  <>
        <TranscriptionRequestConfirm videoId={transcriptionRequestToConfirm ? transcriptionRequestToConfirm.videoId : ''}
          formConfig={transciptionRequestFormConfig}
          onChange={handleTranscriptionRequestChange} />
        <div className="wizardActionsWrapper">
          <button onClick={() => setCurrentStep(currentStep => currentStep + 1)} disabled={!isTranscriptionRequestFormValid}>Save and Confirm</button>
        </div>
      </>;
      break;
    case WIZARD_STATES.TRANSCRIPTION_CREATION:
      transcriptionRequestActivationWizardBody = (
        <>
          <div>create a transcription lmao</div>
          <button onClick={() => setCurrentStep(currentStep => currentStep - 1)}>Back</button>
        </>
      )
      break;
    default:
      throw new Error('Invalid state in TranscriptionRequestActivationWizard');
  }

  return (
    <div className="transcriptionRequestActivationWizardWrapper">
      { transcriptionRequestActivationWizardBody }
    </div>
  );
};

TranscriptionRequestActivationWizard.propTypes = {
  transcriptionRequestId: PropTypes.number,
  isShowing: PropTypes.bool
};

export default TranscriptionRequestActivationWizard;