import React from 'react';

export default ({
  field,
  value,
  validationMessage,
  touched,
  setTouched,
  hideField,
  updateForm,
  styledComponents,
  error,
  unsetError,
  ...props
}) => {
  const {
    id,
    formId,
    type,
    label,
    cssClass,
    isRequired,
    choices,
    inputs,
    description,
    descriptionPlacement,
    labelPlacement,
    width,
    customName,
  } = field;

  const { Checkbox = 'fieldset', Label = 'legend', Box = 'div' } = styledComponents || false;

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
      <Checkbox className="checkboxes">
        <Label as="legend" className={`group-label ${labelPlacement}`}>
          {label}
          {label && isRequired ? <abbr>*</abbr> : null}
        </Label>
        {descriptionPlacement === 'above' && description ? (
          description && <div className="description">{description}</div>
        ) : (
          <React.Fragment>
            {choices.map((choice, i) => (
              <div className={type} key={choice.value}>
                <input
                  id={`input_${formId}_${inputs[i].id}`}
                  type="checkbox"
                  name={customName || `input_${inputs[i].id}`}
                  value={choice.value}
                  checked={value.includes(choice.value)}
                  onChange={(event) => {
                    updateForm(event, field);
                    setTouched(id);
                    unsetError(id);
                  }}
                />
                <label htmlFor={`input_${formId}_${inputs[i].id}`}>{choice.text}</label>
              </div>
            ))}
            {description && <div className="description">{description}</div>}
          </React.Fragment>
        )}
        {((validationMessage && touched) || error) && (
          <span className="error-message" id={`error_${formId}_${id}`}>
            {validationMessage || error}
          </span>
        )}
      </Checkbox>
    </Box>
  );
};
