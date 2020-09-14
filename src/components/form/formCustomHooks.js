import { useEffect, useState } from 'react';

export const useIsFormValid = formConfig => {
  const [ isFormValid, setIsFormValid ] = useState(false);

  useEffect(() => {
    const _isFormValid = Object.keys(formConfig)
      .every(fieldName => formConfig[fieldName].isValid);
  
    if(_isFormValid !== isFormValid) {
      setIsFormValid(_isFormValid);
    }
  }, [ formConfig ]);

  return isFormValid;
};