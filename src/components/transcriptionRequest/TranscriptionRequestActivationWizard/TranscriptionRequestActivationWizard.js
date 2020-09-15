import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { TranscriptionRequestContext } from '../TranscriptionRequestProvider';
import { LanguageContext, LangugageContext } from '../../language/LanguageProvider';
import TranscriptionRequestConfirm from './TranscriptionRequestConfirm/TranscriptionRequestConfirm';
import transcriptionRequestConfirmFormConfig from './TranscriptionRequestConfirm/transcriptionRequestConfirmConfig';
import { useFormConfig } from '../../form/formCustomHooks';

const WIZARD_STATES = {
  0: TranscriptionRequestConfirm
};

const TranscriptionRequestActivationWizard = props => {
  const { transcriptionRequestId, isShowing } = props;

  const { getTranscriptionRequestById } = useContext(TranscriptionRequestContext);
  const { languages, getLanguages } = useContext(LanguageContext);

  const [ currentStep, setCurrentStep ] = useState(0);
  const [ transcriptionRequestToConfirm, setTranscriptionRequestToConfirm ] = useState(null);
  const [ transciptionRequestFormConfig, handleTranscriptionRequestChange, updateTranscriptionRequestFormConfig ] = useFormConfig(transcriptionRequestConfirmFormConfig);

  useEffect(() => {
    // react yells at you if your useEffect callback is async so it recommends you do this
    const _getTranscriptionRequestById = async id => {
      const _transcriptionRequestToConfirm = await getTranscriptionRequestById(id);
      setTranscriptionRequestToConfirm(_transcriptionRequestToConfirm);
    }

    if(transcriptionRequestId) {
      getLanguages();
      _getTranscriptionRequestById(transcriptionRequestId);
    }
  }, [ transcriptionRequestId ]);

  useEffect(() => {
    if(languages.length && !transciptionRequestFormConfig.languageId.items.length) {
      const items = languages.map(l => ({ value: l.id, displayName: l.name }));
      updateTranscriptionRequestFormConfig('languageId', items, 'items');
    }
  }, [ languages, transciptionRequestFormConfig, updateTranscriptionRequestFormConfig ]);

  useEffect(() => {
    if(transcriptionRequestToConfirm) {
      const { startTime, endTime } = transcriptionRequestToConfirm;

      updateTranscriptionRequestFormConfig('startTime', startTime);
      updateTranscriptionRequestFormConfig('endTime', endTime);
    }
  }, [ transcriptionRequestToConfirm ]);

  if(transcriptionRequestId === null) {
    return null;
  }

  return (
    <div className="transcriptionRequestActivationWizardWrapper">
      {transcriptionRequestToConfirm && 
        <TranscriptionRequestConfirm videoId={transcriptionRequestToConfirm.videoId}
          formConfig={transciptionRequestFormConfig}
          onChange={handleTranscriptionRequestChange} />
      }
    </div>
  );
};

TranscriptionRequestActivationWizard.propTypes = {
  transcriptionRequestId: PropTypes.number,
  isShowing: PropTypes.bool
};

export default TranscriptionRequestActivationWizard;