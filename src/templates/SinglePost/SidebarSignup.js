import React, { useRef } from 'react';
import { GravityFormConstants } from '../../GravityFormsConstants';
import GravityForm from '../../components/GravityForms';
import Loading from '../../components/GravityForms/Fields/Loading';
import Variables from '../../assets/scss/config/_variables.scss';

const SidebarSignup = props => {
	const gfForm = useRef(null);

	const submitSuccessFunction = () => {
		clearSubmissionAfterTimer();
		return true;
	}

	const clearSubmissionAfterTimer = () => {
		setTimeout(function () {
			if (gfForm && gfForm.current) {
				gfForm.current.resetForm();
			}
		}, Variables.formResetDurationInMS);
	}

	return (
		<div className={`post-sidebar__signup`}>
			<div className={`post-sidebar__signup__inner`}>
				<h6 className={`h7`}>Newsletter Sign-up</h6>
				<GravityForm
					ref={gfForm}
					backendUrl={GravityFormConstants.rootUrl + `/forms`}
					authString={GravityFormConstants.authString}
					formID={GravityFormConstants.formIds.footerSubscribe}
					// onChange={changeFunction} // optional
					onSubmitSuccess={submitSuccessFunction} // optional - calls after form has been submitted successfully
					styledComponents={{Loading}}
					populatedFields={{parameterName: "Value"}}
					jumpToConfirmation={false} // optional, default is equal to true
					handleRedirectSuccessWithMessage='Thank you for subscribing.'
				/>
			</div>
		</div>
	)
}

export default SidebarSignup;
