// This method will take directional quotes (aka 'smart quotes') into straight / non-directional quotes
export const UnescapeText = (badQuotes) => {
	// sanity checks
	if (!badQuotes || (typeof badQuotes === 'undefined'))
		return badQuotes;

	let theTitle = document.createElement('p');
	theTitle.innerHTML = badQuotes;
	return theTitle.innerText;
}

// Truncate text with an elipses
// NOTE:: This variant will not truncate mid-word
// ref: https://stackoverflow.com/a/42256471/18005
export const TruncateText = (text, limit) => {
	if (text.length > limit) {
		for (let i = limit; i > 0; i--){
			if(text.charAt(i) === ' ' && (text.charAt(i-1) !== ','||text.charAt(i-1) !== '.'||text.charAt(i-1) !== ';')) {
				return text.substring(0, i) + '...';
			}
		}
			return text.substring(0, limit) + '&hellip;';
	}
	else
		return text;
	};
