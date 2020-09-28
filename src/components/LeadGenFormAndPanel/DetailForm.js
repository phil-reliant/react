import React from "react";
import ArrowNoStem from '../../assets/svgs/arrow-no-stem';
import LoadingSpinner from '../../components/LoadingSpinner';

// The detail section (ex: First name, last name, etc.) shared between both side and bottom versions
const DetailForm = ({ fieldDefinitions, fieldValues, invalidFields, handleFieldValueChanged, submitInProgress, handleSubmit }) => {
	// console.log('fieldDefinitions', fieldDefinitions);

	return (
		<form id="lead-gen-form"
			className="lead-gen-detail-form">
			{
				/* Show the collection of fields */
				fieldDefinitions.map(item => (
					<input
						key={item.key}
						className={`${item.cssClass} ${invalidFields[item.gfFieldId]}`}
						name={item.gfFieldId}
						type={item.type}
						value={fieldValues[item.gfFieldId]}
						placeholder={item.placeholder}
						onChange={handleFieldValueChanged}
						required={item.isRequired} />
				))
			}

			<div className="lead-gen-detail-form__bottom-area">
				<div className="buttons --align-left">
					<button className={`button --standard --left`}
						disabled={submitInProgress}
						onClick={handleSubmit}>
						<span>Submit</span>
						<div className={`arrow-icon`}>
							<ArrowNoStem />
						</div>
					</button>
				</div>

				<div className={`lead-gen-detail-form__bottom-area__loading-area ${submitInProgress ? '' : 'hidden'}`}>
					<LoadingSpinner />
				</div>
			</div>
		</form>
	);
}

export default DetailForm;
