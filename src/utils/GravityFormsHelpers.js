import { GravityFormConstants } from '../GravityFormsConstants';

const SubmitGravityForm = async (formId, jsonObject, processResults, extraValue) => {
	var fullUrl = `${GravityFormConstants.rootUrl}/forms/${formId}/entries`;

	jsonObject['form_id'] = formId; // append the form ID to the collection
	// console.log('jsonObject', jsonObject);

	fetch(fullUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Basic ${GravityFormConstants.authString}`
		},
		body: JSON.stringify(jsonObject)
	})
	.then(res => {
		if (res.ok) {
			return res.json();
		} else {
			throw Error(res.statusText);
		}
	})
	.then(json => {
		processResults({
			success: true,
			errorMsg: '',
			extraValue: extraValue
		});
	})
	.catch(error => {
		processResults({
			success: false,
			errorMsg: error,
			extraValue: extraValue
		});
	});
}

export default SubmitGravityForm;
