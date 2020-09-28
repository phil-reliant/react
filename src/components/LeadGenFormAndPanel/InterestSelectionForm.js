import React from "react";

// The interest selection portion (ex: Consultation, Hardware, etc.) shared between both side and bottom versions
const StickyFormInterestSelection = ({ interestDefinitions, checkedInterests, handleCheckedInterestsChanged }) => {
	return (
		<>
			<p className="lead-gen-interest-selection-form__subtext">What are you looking for?</p>
			<p className="lead-gen-interest-selection-form__instructions">Select all that apply.</p>
			<form className="lead-gen-interest-selection-form__form">
			{
				/* Show the collection of interests */
				interestDefinitions.map(item => (
					<label className="lead-gen-interest-selection-form__form__item" key={item.key}>
						<input className="text"
							name={item.key}
							type="checkbox"
							checked={checkedInterests[item.key]}
							onChange={handleCheckedInterestsChanged} />
						<span className="check">{item.label}</span>
					</label>
				))
			}
			</form>
		</>
	);
}

export default StickyFormInterestSelection;
