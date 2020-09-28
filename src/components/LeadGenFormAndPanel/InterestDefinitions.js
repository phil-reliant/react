import { GravityFormConstants } from '../../GravityFormsConstants';

// NOTE:: 'key' is used both for the iterating key for React, as well as for the 'name' value for the input
const interestDefinitions = [
	{
		key: GravityFormConstants.selectionIds.leadGen_interests_maintenance,
		label: 'Maintenance'
	},
	{
		key: GravityFormConstants.selectionIds.leadGen_interests_hardware,
		label: 'Hardware'
	},
	{
		key: GravityFormConstants.selectionIds.leadGen_interests_consultation,
		label: 'Consultation'
	},
	{
		key: GravityFormConstants.selectionIds.leadGen_interests_imNotSure,
		label: 'I\'m not sure.'
	},
];

export default interestDefinitions;
