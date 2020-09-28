import Variables from '../assets/scss/config/_variables.scss'

const GetMappedColor = (colorName) => {
	if (colorName) {
		if (colorName === 'green') {
			return Variables.greenColor;
		} else if (colorName === 'grey') {
			return Variables.lightGreyColor;
		} else if (colorName === 'white') {
			return Variables.whiteColor;
		} else if (colorName === 'black') {
			return Variables.pseudoBlackColor;
		}
	}

	return Variables.pseudoBlackColor; // default
}

export default GetMappedColor;
