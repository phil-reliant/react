import React from "react";
import IconMagnifyingGlass from '../../assets/svgs/icon-magnifying-glass';

const SearchField = ({
	searchText, onSearchTextChange, onSearchFormSubmit,
}) => {

	return (
		<div className={`search-panel__input-container`}>
			<form onSubmit={(e) => onSearchFormSubmit(e)}>
				<IconMagnifyingGlass />
				<input
					type={`text`}
					onChange={(e) => onSearchTextChange(e)}
					className={`post-search__input`}
					value={searchText}
					placeholder={`Search hardware`}
				/>
			</form>
		</div>
	)
}
export default SearchField;
