import React, { useState } from "react";
import RenderField from "./RenderField";

const divideFieldsIntoPages = (fields, pages) => {
  const tmpFields = pages.map(item => []);

  for (let i = 0; i < fields.length; i++) {
    // const arr = tmpFields[fields[i].pageNumber];
    if (tmpFields[fields[i].pageNumber - 1]) {
      // move page field to the first group
      if (fields[i].type === "page") {
        tmpFields[fields[i].pageNumber - 2].push(fields[i]);
      } else {
        tmpFields[fields[i].pageNumber - 1].push(fields[i]);
      }
    }
  }
  return tmpFields;
};

const getMaxFieldId = fields => {
  let max = 0;
  for (let i = 0; i < fields.length; i++) {
    if (parseInt(fields[i].id) > max) {
      max = parseInt(fields[i].id);
    }
  }
  return max + 1;
};

const fieldTypes = [
  "checkbox",
  "email",
  "hidden",
  "html",
  "number",
  "phone",
  "radio",
  "select",
  "multiselect",
  "text",
  "textarea",
  "website",
  "page",
  "date",
  "fileupload",
  "consent",
  "password",
  "section",
  "custom"
];

const honeyPotLables = ["Name", "Email", "Phone", "Comments"];
const honeypotLabel = honeyPotLables[Math.floor(Math.random() * Math.floor(4))];

export default props => {
  const {
    fields,
    formValues,
    updateForm,
    submitFailed,
    submitSuccess,
    touched,
    setTouched,
    pagination,
    activePage,
    prevStep,
    nextStep,
    isNextDisabled,
    checkConditionalLogic,
    saveStateToHtmlField,
    enableHoneypot,
    styledComponents,
    customComponents,
    unsetError,
    errors,
    dropzoneText
  } = props;

  // get page indexes
  const dividedFields = pagination
    ? divideFieldsIntoPages(fields, pagination.pages)
    : undefined;
  const maxID = getMaxFieldId(fields);
  const [honeypotValue, setHoneypotValue] = useState("");

  return (
    <div
      className={`form-fields${
        pagination && pagination.pages.length > 1 ? " hasPages" : ""
      }`}
    >
      {pagination && pagination.pages.length > 1
        ? pagination.pages.map((page, index) => (
            <div
              className={`page${activePage === index + 1 ? " active" : ""}`}
              key={`page-${index}`}
            >
              {page && (
                <div className="gf_step">
                  <span>{page}</span>
                </div>
              )}
              {dividedFields[index].map(
                field =>
                  fieldTypes.includes(field.type) && (
                    <RenderField
                      key={field.id}
                      field={field}
                      formValues={formValues}
                      submitFailed={submitFailed}
                      setTouched={setTouched}
                      submitSuccess={submitSuccess}
                      updateForm={updateForm}
                      touched={touched}
                      pages={pagination.pages.length}
                      prevStep={prevStep}
                      nextStep={nextStep}
                      isNextDisabled={isNextDisabled}
                      checkConditionalLogic={checkConditionalLogic}
                      saveStateToHtmlField={saveStateToHtmlField}
                      styledComponents={styledComponents}
                      customComponents={customComponents}
                      error={
                        errors && errors[field.id] ? errors[field.id] : false
                      }
                      unsetError={unsetError}
                      dropzoneText={dropzoneText}
                    />
                  )
              )}
            </div>
          ))
        : fields.map(
            field =>
              fieldTypes.includes(field.type) && (
                <RenderField
                  key={field.id}
                  field={field}
                  formValues={formValues}
                  submitFailed={submitFailed}
                  setTouched={setTouched}
                  submitSuccess={submitSuccess}
                  updateForm={updateForm}
                  touched={touched}
                  checkConditionalLogic={checkConditionalLogic}
                  styledComponents={styledComponents}
                  error={errors && errors[field.id] ? errors[field.id] : false}
                  unsetError={unsetError}
                  dropzoneText={dropzoneText}
                />
              )
          )}
      {enableHoneypot && (
        <div className="form-field gform_validation_container">
          <label htmlFor={`input_${maxID}`} className="gf-label ">
            {honeypotLabel}
          </label>
          <input
            type="text"
            name={`input_${maxID}`}
            id={`input_${maxID}`}
            value={honeypotValue}
            onChange={e => setHoneypotValue(e.target.value)}
            autoComplete="off"
          />
        </div>
      )}
    </div>
  );
};
