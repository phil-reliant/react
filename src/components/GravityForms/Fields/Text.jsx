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
  setFocusClass,
  cssClass,
  setCurrentFocus,
  ...props
}) => {
  const {
    id,
    formId,
    type,
    label,
	placeholder,
    isRequired,
    maxLength,
    description,
    descriptionPlacement,
    labelPlacement,
    width,
    customName,
  } = field;
  const { Input = 'input', Label = 'label', Box = 'div' } = styledComponents || false;
  if(touched) {
    cssClass += ' touched ';
  }
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
        <Label htmlFor={`input_${formId}_${id}`} className={`gf-label ${labelPlacement}`}>
          {label}
        </Label>
        {descriptionPlacement === 'above' && description ? (
          description && <div className="description"></div>
        ) : (
          <React.Fragment>
            <Input
              id={`input_${formId}_${id}`}
              name={customName || `input_${id}`}
              type={type}
              value={!value ? '' : value}
			  placeholder={placeholder}
              maxLength={maxLength}
              required={isRequired}
              onChange={(event) => {
                updateForm(event, field);
                unsetError(id);
              }}
              onBlur={(event) => {
                updateForm(event, field);
                setTouched(id);
                setFocusClass(value !== '');
                setCurrentFocus(false);
              }}
              onFocus={() => {
                setFocusClass(true);
                setCurrentFocus(true);
              }}
              aria-label={label}
              aria-describedby={`error_${formId}_${id}`}
              aria-invalid={(!!validationMessage && touched) || !!error}
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
