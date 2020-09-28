import React from "react";
import GlobalConstants from '../../GlobalConstants';
import PhoneInCircle from '../../assets/svgs/phone-in-circle';

const PhoneDialButton = (props) => {
	const { extraCSSClasses } = props;

	const phoneButtonClicked = (e) =>
	{
		// prevent this from bubbling up and opening the drawer
		var event = e || window.event;
		event.stopPropagation();

		window.location.href=`tel:${GlobalConstants.contactInfo.phoneNumberAsDialed}`;
	}

	return (
		<button className={`link-button button-dropshadow ${extraCSSClasses}`}
			onClick={(e) => phoneButtonClicked(e)}>
			<PhoneInCircle />
		</button>

	);
}

export default PhoneDialButton;
