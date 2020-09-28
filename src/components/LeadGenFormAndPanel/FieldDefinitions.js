import { GravityFormConstants } from '../../GravityFormsConstants';

const fieldDefinitions = [
	{
		key: 'firstName',
		placeholder: 'First Name',
		cssClass: 'two-up',
		type: 'text',
		gfFieldId: GravityFormConstants.fieldIds.leadGen_firstName,
		isRequired: true
	},
	{
		key: 'lastName',
		placeholder: 'Last Name',
		cssClass: 'two-up',
		type: 'text',
		gfFieldId: GravityFormConstants.fieldIds.leadGen_lastName,
		isRequired: true
	},
	{
		key: 'companyName',
		placeholder: 'Company Name',
		cssClass: '',
		type: 'text',
		gfFieldId: GravityFormConstants.fieldIds.leadGen_companyName,
		isRequired: false
	},
	{
		key: 'companyEmail',
		placeholder: 'Company Email',
		cssClass: '',
		type: 'email',
		gfFieldId: GravityFormConstants.fieldIds.leadGen_companyEmail,
		isRequired: true
	},
	{
		key: 'phone',
		placeholder: 'Phone',
		cssClass: '',
		type: 'phone',
		gfFieldId: GravityFormConstants.fieldIds.leadGen_phone,
		isRequired: false
	},
	{
		key: 'tellUsAbout',
		placeholder: 'Tell us a little about your needs.',
		cssClass: '',
		type: 'text',
		gfFieldId: GravityFormConstants.fieldIds.leadGen_tellUsAbout,
		isRequired: false
	}
];

export default fieldDefinitions;
