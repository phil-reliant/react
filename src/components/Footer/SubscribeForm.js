import React, { useRef } from 'react';
import { GravityFormConstants } from '../../GravityFormsConstants';
import GravityForm from '../../components/GravityForms';
import ErrorBoundary from '../ErrorBoundary';
import Loading from '../GravityForms/Fields/Loading';
import Variables from '../../assets/scss/config/_variables.scss';

const SubscribeForm = () => {

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
		<ErrorBoundary message={`Unable to load form data`}>
			<div className={`h3`}>
				Subscribe to get EOL updates and more!
			</div>
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
		</ErrorBoundary>
	);
}

export default SubscribeForm;
