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

export const useFormConfig = initialFormConfig => {
  const [ formConfig, setFormConfig ] = useState(initialFormConfig);

  const handleChange = changeData => {
    const { name, value, isValid, isTouched } = changeData;

    const updatedFormConfig = { ...formConfig };
    const updatedFormElement = { 
      ...updatedFormConfig[name], 
      value,
      isValid,
      isTouched
    };
    updatedFormConfig[name] = updatedFormElement;

    setFormConfig(updatedFormConfig);
  };

  return [ formConfig, handleChange ];
};