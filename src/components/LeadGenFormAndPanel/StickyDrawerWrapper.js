import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import StickyDrawerBottom from "./StickyDrawerBottom";
import StickyDrawerSide from "./StickyDrawerSide";
import fieldDefinitions from "./FieldDefinitions";
import interestDefinitions from "./InterestDefinitions";
import { GravityFormConstants } from '../../GravityFormsConstants';
import { GetFieldsWithErrors } from '../../utils/FormValidationHelpers';
import SubmitGravityForm from '../../utils/GravityFormsHelpers';
import Variables from '../../assets/scss/config/_variables.scss';

const StickyDrawerWrapper = props => {
	const {
		showFormArea
	} = props;

	// NOTE:: we must set initial values for checkboxes, otherwise we will receive an error stating:
	// "A component is changing an uncontrolled input of type checkbox"
	// ref: https://stackoverflow.com/a/53072573/18005

	// NOTE:: if these values change, must update resetAllFields() as well
	const [checkedInterests, setCheckedInterests] = useState(
		{
			[GravityFormConstants.selectionIds.leadGen_interests_maintenance]: false,
			[GravityFormConstants.selectionIds.leadGen_interests_hardware]: false,
			[GravityFormConstants.selectionIds.leadGen_interests_consultation]: false,
			[GravityFormConstants.selectionIds.leadGen_interests_imNotSure]: false
		}
	);

	// NOTE:: if these values change, must update resetAllFields() as well
	const [fieldValues, setFieldValues] = useState(
		{
			[GravityFormConstants.fieldIds.leadGen_firstName]: '',
			[GravityFormConstants.fieldIds.leadGen_lastName]: '',
			[GravityFormConstants.fieldIds.leadGen_companyName]: '',
			[GravityFormConstants.fieldIds.leadGen_companyEmail]: '',
			[GravityFormConstants.fieldIds.leadGen_phone]: '',
			[GravityFormConstants.fieldIds.leadGen_tellUsAbout]: ''
		}
	);

	const [invalidFields, setInvalidFields] = useState({}); // stores field values (prefixed by tab) ex: `tab0_firstName`, `tab1_firstName`
	const [successfullySubmitted, setSuccessfullySubmitted] = useState(false);
	const [submitInProgress, setSubmitInProgress] = useState(false); // whether an async call to submit the form is in progress (for showing loader)

	const handleCheckedInterestsChanged = (event) => {
		setCheckedInterests({...checkedInterests, [event.target.name] : event.target.checked });
	}

	const handleFieldValueChanged = (event) => {
		setFieldValues({...fieldValues, [event.target.name] : event.target.value});
	}

	const resetAllFields = () => {
		setCheckedInterests({
			[GravityFormConstants.selectionIds.leadGen_interests_maintenance]: false,
			[GravityFormConstants.selectionIds.leadGen_interests_hardware]: false,
			[GravityFormConstants.selectionIds.leadGen_interests_consultation]: false,
			[GravityFormConstants.selectionIds.leadGen_interests_imNotSure]: false
		});
		setFieldValues({
			[GravityFormConstants.fieldIds.leadGen_firstName]: '',
			[GravityFormConstants.fieldIds.leadGen_lastName]: '',
			[GravityFormConstants.fieldIds.leadGen_companyName]: '',
			[GravityFormConstants.fieldIds.leadGen_companyEmail]: '',
			[GravityFormConstants.fieldIds.leadGen_phone]: '',
			[GravityFormConstants.fieldIds.leadGen_tellUsAbout]: ''
		});
	}

	const getSelectedInterestsAsArray = () => {
		let selectedInterestsArray = [];
		for (var interest in checkedInterests) {
			if (checkedInterests[interest] === true) {
				selectedInterestsArray.push(interest);
			}
		}
		return selectedInterestsArray;
	}

	const getValuesForForm = () => {
		let values = {};

		// set the value for the interest selections
		let interests = getSelectedInterestsAsArray();
		values[GravityFormConstants.fieldIds.leadGen_interests] = interests;

		// iterate all the text fields and add them to our collection
		for (var fieldValue in fieldValues) {
			values[fieldValue] = fieldValues[fieldValue];
		}

		return values;
	}

	const handleSubmit = (event) => {
		// console.log('handleSubmit');
		event.preventDefault();

		// console.log('setSubmitInProgress = true');
		setSubmitInProgress(true);

		let newInvalidFields = GetFieldsWithErrors('#lead-gen-form');
		if (newInvalidFields && newInvalidFields.length > 0) {
			let newCollection = {};
			for (let invalidFieldIndex in newInvalidFields) {
				let invalidField = newInvalidFields[invalidFieldIndex];
				let keyField = invalidField.name;
				newCollection[keyField] = 'error';
			}
			setInvalidFields(newCollection);
		}
		else {
			setInvalidFields({});
		}

		var subscribeForm = document.querySelector('#lead-gen-form');
		if (!subscribeForm.checkValidity()) {
			subscribeForm.reportValidity();
			setSubmitInProgress(false);
			return;
		}

		let jsonObject = getValuesForForm();
		// console.log('jsonObject1', jsonObject);
		SubmitGravityForm(GravityFormConstants.formIds.leadGen, jsonObject, processResults);
	}

	const processResults = async (results) => {
		// console.log('processResults setSubmitInProgress = false');
		setSubmitInProgress(false);

		if (results.success) {
			setSuccessfullySubmitted(true);
			clearSubmissionAfterTimer();
		}
		else {
			console.error('request error', results.errorMsg);
			alert('Something went wrong. Please try again or give us a call at 877-227-0828.');
		}
	}

	const clearSubmissionAfterTimer = () => {
		setTimeout(function () {
			resetAllFields();
			setSuccessfullySubmitted(false);
		}, Variables.formResetDurationInMS);
	}

	// fired when the selection of checked interests (on panel 1) changes
	useEffect(() => {
		// console.log("checkedItems: ", checkedInterests)
	}, [checkedInterests]);

	// fired when the selection of checked interests (on panel 1) changes
	useEffect(() => {
		// console.log("fieldValues: ", fieldValues)
	}, [fieldValues]);

	return (
		<>
			<div className="--desktop-only">
				<StickyDrawerSide
					showFormArea={showFormArea}
					interestDefinitions={interestDefinitions}
					checkedInterests={checkedInterests}
					handleCheckedInterestsChanged={handleCheckedInterestsChanged}
					fieldDefinitions={fieldDefinitions}
					fieldValues={fieldValues}
					invalidFields={invalidFields}
					submitInProgress={submitInProgress}
					successfullySubmitted={successfullySubmitted}
					handleFieldValueChanged={handleFieldValueChanged}
					handleSubmit={handleSubmit} />
			</div>
			<div className="--mobile-only sticky-drawer-bottom-wrapper">
				<StickyDrawerBottom
					showFormArea={showFormArea}
					interestDefinitions={interestDefinitions}
					checkedInterests={checkedInterests}
					handleCheckedInterestsChanged={handleCheckedInterestsChanged}
					fieldDefinitions={fieldDefinitions}
					fieldValues={fieldValues}
					invalidFields={invalidFields}
					submitInProgress={submitInProgress}
					successfullySubmitted={successfullySubmitted}
					handleFieldValueChanged={handleFieldValueChanged}
					handleSubmit={handleSubmit} />
			</div>
		</>
	);
};

StickyDrawerWrapper.propTypes = {
	showFormArea: PropTypes.bool
};


export default StickyDrawerWrapper;
