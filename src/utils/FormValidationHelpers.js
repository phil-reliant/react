export const GetFieldsWithErrors = (formHTMLId) => {
	var fieldsWithErrors = [];
	var inputFields = document.querySelectorAll(`${formHTMLId} input, #contactForm textarea`);
	for (var fieldIndex in inputFields) {
		let field = inputFields[fieldIndex];
		if (typeof field.checkValidity === 'function') {
			if (!field.checkValidity()) {
				fieldsWithErrors.push(field);
			}
		}
	}
	return fieldsWithErrors;
}
