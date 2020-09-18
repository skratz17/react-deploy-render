import { useEffect, useState } from 'react';

export const useIsFormValid = formConfig => {
  const [ isFormValid, setIsFormValid ] = useState(false);

  useEffect(() => {
    const _isFormValid = Object.keys(formConfig)
      .every(fieldName => formConfig[fieldName].isValid);
  
    if(_isFormValid !== isFormValid) {
      setIsFormValid(_isFormValid);
    }
  }, [ formConfig, isFormValid ]);

  return isFormValid;
};

export const useFormConfig = initialFormConfig => {
  const [ formConfig, setFormConfig ] = useState(initialFormConfig);

  const handleChange = changeData => {
    const { name, value, isValid, isTouched } = changeData;

    updateFormConfig(name, value, 'value');
    updateFormConfig(name, isValid, 'isValid');
    updateFormConfig(name, isTouched, 'isTouched');

    // update validation for a "paired" field as well, if the field being updated currently is part of a pair wherein the validity of one of the pair implies the validity of the other
    const pairedElement = formConfig[name].validation.mustBeLessThan || formConfig[name].validation.mustBeGreaterThan || formConfig[name].validation.mustMatch;
    if(pairedElement) {
      updateFormConfig(pairedElement, isValid, 'isValid');
    }
  };

  const updateFormConfig = (formFieldName, newValue, propertyToUpdate = 'value') => {
    setFormConfig(prevFormConfig => {
      const updatedFormConfig = { ...prevFormConfig };
      const updatedFormElement = { ...updatedFormConfig[formFieldName] };
      updatedFormElement[propertyToUpdate] = newValue;
      updatedFormConfig[formFieldName] = updatedFormElement
      return updatedFormConfig;
    });
  };

  const resetFormConfig = () => {
    setFormConfig({ ...initialFormConfig });
  };

  return [ formConfig, handleChange, updateFormConfig, resetFormConfig ];
};