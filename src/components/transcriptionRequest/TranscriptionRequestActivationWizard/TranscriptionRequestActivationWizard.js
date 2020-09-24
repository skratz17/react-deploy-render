import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { TranscriptionRequestContext } from '../TranscriptionRequestProvider';
import { LanguageContext } from '../../language/LanguageProvider';
import { UserContext } from '../../user/UserProvider';
import { TranscriptionContext } from '../../transcription/TranscriptionProvider';
import TranscriptionRequestConfirm from './TranscriptionRequestConfirm/TranscriptionRequestConfirm';
import initialTranscriptionRequestFormConfig from './TranscriptionRequestConfirm/transcriptionRequestConfirmConfig';
import TranscriptionCreator from './TranscriptionCreator/TranscriptionCreator';
import initialTranscriptionFormConfig from './TranscriptionCreator/transcriptionCreatorFormConfig';
import { useFormConfig, useIsFormValid } from '../../form/formCustomHooks';
import Modal from '../../modal/Modal';
import './TranscriptionRequestActivationWizard.css';

const WIZARD_STATES = {
  TRANSCRIPTION_REQUEST_CONFIRM: 0,
  TRANSCRIPTION_CREATION: 1
};

const TranscriptionRequestActivationWizard = props => {
  const { transcriptionRequestId, onClose } = props;

  const { getTranscriptionRequestById, updateTranscriptionRequest, getTranscriptionRequestToFulfillForLanguage, activateTranscriptionRequest } = useContext(TranscriptionRequestContext);
  const { languages, getLanguages } = useContext(LanguageContext);
  const { getUserById } = useContext(UserContext);
  const { saveTranscription } = useContext(TranscriptionContext);

  const [ currentStep, setCurrentStep ] = useState(WIZARD_STATES.TRANSCRIPTION_REQUEST_CONFIRM);
  const [ transcriptionRequestToConfirm, setTranscriptionRequestToConfirm ] = useState(null);
  const [ transcriptionRequestToFulfill, setTranscriptionRequestToFulfill ] = useState(null);

  const [ transciptionRequestFormConfig, handleTranscriptionRequestChange, updateTranscriptionRequestFormConfig, resetTranscriptionRequestFormConfig ] = useFormConfig(initialTranscriptionRequestFormConfig);
  const isTranscriptionRequestFormValid = useIsFormValid(transciptionRequestFormConfig);

  const [ transcriptionFormConfig, handleTranscriptionChange, updateTranscriptionFormConfig, resetTranscriptionFormConfig ] = useFormConfig(initialTranscriptionFormConfig);
  const isTranscriptionFormValid = useIsFormValid(transcriptionFormConfig);

  useEffect(() => {
    // react yells at you if your useEffect callback is async so it recommends you do this, that's the only reason these functions exists otherwise i'd just do these async operation directly in the useEffect callback
    const _getTranscriptionRequestById = async id => {
      const _transcriptionRequestToConfirm = await getTranscriptionRequestById(id);
      setTranscriptionRequestToConfirm(_transcriptionRequestToConfirm);
    }

    const _getTranscriptionRequestToFulfill = async () => {
      const user = await getUserById(localStorage.getItem('current_user'));
      const _transcriptionRequestToFulfill = await getTranscriptionRequestToFulfillForLanguage(user.nativeLanguageId);
      setTranscriptionRequestToFulfill(_transcriptionRequestToFulfill);
    }

    // if a new transcription request id is coming in via props, reinitialize the form config states, perform the various async calls needed for the wizard to run, and set the current step to the first wizard step
    if(transcriptionRequestId) {
      resetTranscriptionRequestFormConfig();
      resetTranscriptionFormConfig();
      setCurrentStep(WIZARD_STATES.TRANSCRIPTION_REQUEST_CONFIRM);

      getLanguages();
      _getTranscriptionRequestById(transcriptionRequestId);
      _getTranscriptionRequestToFulfill();
    }

    // otherwise if the transcription request id coming in is not an id (e.g., null), set wizard state to null to indicate not active
    else {
      const timeoutId = setTimeout(() => setCurrentStep(null), 1000);
      return () => clearTimeout(timeoutId);
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

  const updateAndConfirmTranscriptionRequest = async () => {
    const transcriptionRequestData = {
      startTime: parseInt(transciptionRequestFormConfig.startTime.value),
      endTime: parseInt(transciptionRequestFormConfig.endTime.value),
      languageId: parseInt(transciptionRequestFormConfig.languageId.value)
    };

    await updateTranscriptionRequest(transcriptionRequestToConfirm.id, transcriptionRequestData);
    setCurrentStep(currentStepVal => currentStepVal + 1);
  };

  const submitTranscription = async () => {
    if(transcriptionRequestToFulfill) {
      const transcriptionData = {
        transcription: transcriptionFormConfig.transcription.value,
        transcriptionRequestId: transcriptionRequestToFulfill.id
      };

      await saveTranscription(transcriptionData);
    }

    await activateTranscriptionRequest(transcriptionRequestToConfirm.id);
    onClose();
  };

  let transcriptionRequestActivationWizardBody;
  switch(currentStep) {
    case WIZARD_STATES.TRANSCRIPTION_REQUEST_CONFIRM:
      transcriptionRequestActivationWizardBody =  <>
        <TranscriptionRequestConfirm videoId={transcriptionRequestToConfirm ? transcriptionRequestToConfirm.videoId : ''}
          formConfig={transciptionRequestFormConfig}
          onChange={handleTranscriptionRequestChange} />
        <div className="wizardActionsWrapper">
          <button className="btn btn--action" onClick={updateAndConfirmTranscriptionRequest} disabled={!isTranscriptionRequestFormValid}>
            <FormattedMessage id="transcriptionRequestActivationWizard.saveAndConfirmButton"
              defaultMessage="Save and Confirm" />
          </button>
        </div>
      </>;
      break;
    case WIZARD_STATES.TRANSCRIPTION_CREATION:
      transcriptionRequestActivationWizardBody = <>
          <TranscriptionCreator transcriptionRequest={transcriptionRequestToFulfill}
            formConfig={transcriptionFormConfig}
            onChange={handleTranscriptionChange} />
          <div className="wizardActionsWrapper">
            <button className="btn btn--neutral" onClick={() => setCurrentStep(currentStep => currentStep - 1)}>
              <FormattedMessage id="transcriptionRequestActivationWizard.backButton"
                defaultMessage="Back" />
            </button>
            <button className="btn btn--action" onClick={submitTranscription} disabled={transcriptionRequestToFulfill !== false && !isTranscriptionFormValid}>
              <FormattedMessage id="transcriptionRequestActivationWizard.activateTranscriptionRequestButton"
                defaultMessage="Activate Transcription Request" />
            </button>
          </div>
      </>;
      break;
    default:
      transcriptionRequestActivationWizardBody = null;
  }

  return (
    <Modal isShowing={transcriptionRequestId !== null} onClose={onClose}>
      <div className="transcriptionRequestActivationWizard">
        <div className="transcriptionRequestActivationWizard__headerWrapper">
          <h2 className="transcriptionRequestActivationWizard__header">
            <FormattedMessage id="transcriptionRequestActivationWizard.header"
              defaultMessage="Activate Transcription Request" />
          </h2>
        </div>
        { transcriptionRequestActivationWizardBody }
      </div>
    </Modal>
  );
};

TranscriptionRequestActivationWizard.propTypes = {
  transcriptionRequestId: PropTypes.number,
  onClose: PropTypes.func
};

export default TranscriptionRequestActivationWizard;