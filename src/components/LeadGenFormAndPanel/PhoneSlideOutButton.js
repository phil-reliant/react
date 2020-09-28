import React, { useState } from "react";
import GlobalConstants from '../../GlobalConstants';
import PhoneIcon from '../../assets/svgs/phone-icon';

const PhoneSlideOutButton = () => {
	const [phoneDetailsShown, setPhoneDetailsShown] = useState(false);

	const phoneButtonClicked = () => {
		window.location.href=`tel:${GlobalConstants.contactInfo.phoneNumberAsDialed}`;
	}

	return (
		<div className={`sticky-drawer-side__right-rail__phone`}>
			<button className="link-button sticky-drawer-side__right-rail__phone__button"
				onMouseEnter={() => setPhoneDetailsShown(true)}
				onMouseLeave={() => setPhoneDetailsShown(false)}
				onClick={phoneButtonClicked}>
				<div className={`button-dropshadow sticky-drawer-side__right-rail__phone__button__inner
					${phoneDetailsShown === true ? 'expanded' : ''}`}>
					<div className={`sticky-drawer-side__right-rail__phone__button__inner__number-area
						${phoneDetailsShown === true ? 'expanded' : ''}`}>
						<span>{GlobalConstants.contactInfo.phoneNumber}</span>
					</div>
					<div className="sticky-drawer-side__right-rail__phone__button__inner__icon-inset">
						<PhoneIcon />
					</div>
				</div>
			</button>
		</div>

	);
}

export default PhoneSlideOutButton;
