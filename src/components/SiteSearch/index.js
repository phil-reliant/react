import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import IconMagnifyingGlass from '../../assets/svgs/icon-magnifying-glass';

const SiteSearch = props => {
	const [ searchTextVal, setSearchTextVal ] = useState(``);
	const [ searchActive, setSearchActive ] = useState(false);
	const [ redirectPath, setRedirectPath ] = useState("");
	const { location, isMobile, doToggleMenuIfMobile } = props;

	const inputClass = searchActive ? `active` : ``;

	const searchTextChange = (event) => {
		setSearchTextVal(event.target.value);
	};

	const submitForm = () => {
		if (searchTextVal !== "") {
			let submittedText = searchTextVal;
			setSearchTextVal("");
			setRedirectPath(`/products?searchTerm=${submittedText}`);

			// unfocus the field so that the cursor goes away and to fix issue with ghosted field still having focus on mobile on search results page
			if (document && document.activeElement) {
				document.activeElement.blur();
			}

			// close the menu on mobile
			doToggleMenuIfMobile();
		}
	}

	const formSubmit = (event) => {
		event.preventDefault();
		submitForm();
	}

	const renderRedirect = () => {
		if (redirectPath !== "") {
			return (
				<Redirect to={redirectPath} />
			)
		}
	}

	const searchIconClicked = () => {
		console.log('searchIconClicked', isMobile);
		if (!isMobile) {
			setSearchActive(!searchActive);
		} else {
			submitForm();
		}
	}

	return (
		<>
		{ renderRedirect() }
		<div className={`site-search ${location}`}>
			<div className={`site-search__inner`}>
				<button onClick={searchIconClicked}>
					<IconMagnifyingGlass />
				</button>
				<div className={`site-search__form ${inputClass}`}>
					<form onSubmit={(ev) => formSubmit(ev)}>
						<input
							type={`text`}
							className={`site-search__input`}
							placeholder={`Search Hardware...`}
							onChange={(ev) => searchTextChange(ev)}
							value={searchTextVal}
						/>
					</form>
				</div>
			</div>
		</div>
		</>
	)
}

export default SiteSearch;
