import React, { useRef, useState } from "react";
import { GravityFormConstants } from '../../GravityFormsConstants';
import PropTypes from "prop-types";
import Loading from '../GravityForms/Fields/Loading';
import GravityForm from '../GravityForms';
import Variables from '../../assets/scss/config/_variables.scss';

const ContactForm = props => {
	const {
		titleText,
		subtext,
		tabDefinitions,
		forceSingleColumn, // will ignore CSS class 2-up (used on product page)
		forceSplitTabWidth // will force tabs to each be 50% (used on product page)
	} = props;

	const [selectedTab, setSelectedTab] = useState(0);
	const gfForm1 = useRef(null);
	const gfForm2 = useRef(null);

	// temp variable to keep track of submitted forms that need resetting
	let submittedFormsPendingResetQueue = [];

	const tabClicked = (index) => {
		setSelectedTab(index);
	}

	const submitSuccessFunction = () => {
		// console.log('submitsuccess, selectedTab is', selectedTab);
		submittedFormsPendingResetQueue.push(selectedTab);
		clearSubmissionAfterTimer();
		return true;
	}

	const clearSubmissionAfterTimer = () => {
		let formToReset = submittedFormsPendingResetQueue.shift(); // take the first item pushed that is still queued
		if (!formToReset) {
			return;
		}
		// console.log('startingtimer, formToReset is', formToReset);
		setTimeout(function () {
			// console.log('timer done, formToReset is', formToReset);
			if (formToReset === 0) {
				if (gfForm1 && gfForm1.current) {
					// console.log('resetting form 1');
					gfForm1.current.resetForm();
				}
			} else if (formToReset === 1) {
				if (gfForm2 && gfForm2.current) {
					// console.log('resetting form 2');
					gfForm2.current.resetForm();
				}
			}
		}, Variables.formResetDurationInMS);
	}

	const forms = tabDefinitions.map((item,index) => {
		var formClasses = ``;
		if( selectedTab !== index ){
			formClasses += ` hidden`;
		}
		return  (
			<div key={index} className={formClasses}>
				<GravityForm
					ref={index === 0 ? gfForm1 : gfForm2}
					backendUrl={GravityFormConstants.rootUrl + `/forms`}
					authString={GravityFormConstants.authString}
					formID={item.formId}
					// onChange={changeFunction} // optional
					onSubmitSuccess={submitSuccessFunction} // optional - calls after form has been submitted successfully
					styledComponents={{Loading}}
					populatedFields={{parameterName: "Value"}}
					jumpToConfirmation={false} // optional, default is equal to true
					handleRedirectSuccessWithMessage='Thanks for contacting us! We will get in touch with you shortly.'
				/>
			</div>
		);
	})

	const tabs = tabDefinitions.map((item, index) => {
		var tabClasses = `contact-form--tab-wrapper--inner--tabs--tab tab ${forceSplitTabWidth ? 'force-split-width' : ''}`;
		if (selectedTab === index) {
			tabClasses += ` selected`;
		}
		return (
			<div key={`tab_${index}`}
				className={tabClasses}
				onClick={() => tabClicked(index)}>
				{item.tabTitle}
			</div>
		);
	})

	let tabInernalHeaderText = tabDefinitions[selectedTab].internalHeader;

	var contentClasses = `contact-form--tab-wrapper--inner--tab-content`;
	if( forceSingleColumn ){
		contentClasses += ` single-column-inputs`;
	}

	return (
		<div className={`contact-form`}>
		{ ( titleText || subtext )? (
			<div className="container contact-form--headings">
				<div className="row">
					<div className="col-12">
						<h4>{titleText}</h4>
						<p className="subtext">{subtext}</p>
					</div>
				</div>
			</div>
			) : <></>
		}

			<div className="container">
				<div className="row">
					<div className="col-12 contact-form--tab-wrapper">
						<div className={`contact-form--tab-wrapper--inner`}>
							<div className={`contact-form--tab-wrapper--inner--tabs`}>
								{tabs}
							</div>
							<div className={contentClasses}>
								<h6 className="h7">{tabInernalHeaderText}</h6>
								{forms}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

ContactForm.propTypes = {
	titleText: PropTypes.string,
	subtext: PropTypes.string,
	tabDefinitions: PropTypes.array
};


export default ContactForm;
