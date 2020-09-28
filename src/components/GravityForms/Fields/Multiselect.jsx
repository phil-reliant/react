import React, { useState } from 'react';
import Select from 'react-select';

export default ({
  field,
  value,
  validationMessage,
  touched,
  setTouched,
  updateForm,
  hideField,
  styledComponents,
  error,
  unsetError,
  cssClass,
  ...props
}) => {
  const {
    id,
    formId,
    type,
    label,
    isRequired,
    choices,
    placeholder,
    description,
    descriptionPlacement,
    labelPlacement,
    width,
    customName,
  } = field;
  // Map options
  const options = choices.map(choice => ({
    value: choice.value,
    label: choice.text,
  }));
  let preselected = choices.filter(choice => choice.isSelected);
  if (preselected.length) {
    preselected = [
      {
        label: preselected[0].text,
        value: preselected[0].value,
      },
    ];
  } else {
    preselected = '';
  }
  // Handle State
  const [selectedOption, selectOption] = useState(value || preselected);
  // Handle change
  const handleChange = (option) => {
    selectOption(option);
    const event = {
      target: {
        value: option,
      },
    };
    updateForm(event, field);
    unsetError(id);
  };
  // Handle Blur
  const handleBlur = () => {
    const event = {
      target: {
        value: selectedOption,
      },
    };
    updateForm(event, field);
    setTouched(id);
  };
  const { SelectStyles, Label = 'label', Box = 'div' } = styledComponents || false;
  return (
    <Box
      width={width}
      className={
        (validationMessage && touched) || error
          ? `form-field error ${cssClass}`
          : `form-field ${cssClass}`
      }
      style={{ display: hideField ? 'none' : undefined }}
    >
      <div className={type}>
        <Label htmlFor={`input_${formId}_${id}`} className={`group-label ${labelPlacement}`}>
          {label}
          {isRequired ? <abbr>*</abbr> : null}
        </Label>
        {descriptionPlacement === 'above' && description ? (
          description && <div className="description">{description}</div>
        ) : (
          <React.Fragment>
            <Select
              name={customName || `input_${id}[]`}
              required={isRequired}
              value={selectedOption}
              onChange={(option) => {
                handleChange(option, field);
              }}
              onBlur={() => handleBlur()}
              placeholder={placeholder}
              options={options}
              isMulti
              inputId={`input_${formId}_${id}`}
              styles={SelectStyles}
            />
            {description && <div className="description">{description}</div>}
          </React.Fragment>
        )}
        {((validationMessage && touched) || error) && (
          <span className="error-message" id={`error_${formId}_${id}`}>
            {validationMessage || error}
          </span>
        )}
      </div>
    </Box>
  );
};
