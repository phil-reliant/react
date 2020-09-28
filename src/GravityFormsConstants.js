// TODO:: Update these variables to be the defaults for production

// Gravity Forms Settings
var env_rootUrl = "";
var env_user = "";
var env_pass = "";
var env_authString = new Buffer(env_user + ":" + env_pass).toString('base64');

// Gravity Forms Form Ids
var env_formId_footerSubscribe = -1;
var env_formId_leadGen = -1;

// Gravity Forms Field Ids
var env_leadGen_interests = "-1";
var env_leadGen_firstName = "-1";
var env_leadGen_lastname = "-1";
var env_leadGen_companyName = "-1";
var env_leadGen_companyEmail = "-1";
var env_leadGen_phone = "-1";
var env_leadGen_tellUsAbout = "-1";

// multi-select options (should not need to be environment specific)
var env_leadGen_interests_maintenance = "maintenance";
var env_leadGen_interests_hardware = "hardware";
var env_leadGen_interests_consultation = "consultation";
var env_leadGen_interests_imNotSure = "im-not-sure";

const env = process.env.ENV || `test`;
if (env === 'test') {
	env_rootUrl = "https://cms.reliant-technology.com/wp-json/gf/v2";
	env_user = "ck_86a6754bb7e018a141208f8837e5909fcaf9c29d";
	env_pass = "cs_0ae3080acbdae42f520e9e31b925648b83f90129";
	env_authString = new Buffer(env_user + ":" + env_pass).toString('base64');

	// Gravity Forms Form Ids
	env_formId_footerSubscribe = 2;
	env_formId_leadGen = 7;

	env_leadGen_interests = "7";
	env_leadGen_firstName = "1";
	env_leadGen_lastname = "2";
	env_leadGen_companyName = "3";
	env_leadGen_companyEmail = "4";
	env_leadGen_phone = "5";
	env_leadGen_tellUsAbout = "6";
} else if (env === '????') {
// TODO:: add variables for other environments
}

export const GravityFormConstants =
{
	rootUrl: env_rootUrl,
	authString: env_authString,
	formIds: {
		footerSubscribe: env_formId_footerSubscribe,
		leadGen: env_formId_leadGen
	},
	fieldIds: {
		// lead gen fields
		leadGen_interests: env_leadGen_interests,
		leadGen_firstName: env_leadGen_firstName,
		leadGen_lastName: env_leadGen_lastname,
		leadGen_companyName: env_leadGen_companyName,
		leadGen_companyEmail: env_leadGen_companyEmail,
		leadGen_phone: env_leadGen_phone,
		leadGen_tellUsAbout: env_leadGen_tellUsAbout
	},
	selectionIds: {
		// multi-select fields
		leadGen_interests_maintenance: env_leadGen_interests_maintenance,
		leadGen_interests_hardware: env_leadGen_interests_hardware,
		leadGen_interests_consultation: env_leadGen_interests_consultation,
		leadGen_interests_imNotSure: env_leadGen_interests_imNotSure
	}
};
