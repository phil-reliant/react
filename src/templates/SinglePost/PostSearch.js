import React, { useState } from 'react';
import IconMagnifyingGlass from '../../assets/svgs/icon-magnifying-glass';
import { useHistory } from 'react-router-dom';

const PostSearch = props => {
	const [ inputVal, setInputVal ] = useState(``);
	let history = useHistory();

	const onInputChange = (ev) => {
		ev.preventDefault();
		setInputVal(ev.target.value);
	}

	const onFormSubmit = (ev) => {
		ev.preventDefault();
		history.push(`/blog-search?s=${inputVal}`);
	}

	return (
		<div className={`post-search`}>
			<div className={`post-search__input-container`}>
				<form onSubmit={(e) => onFormSubmit(e)}>
					<IconMagnifyingGlass />
					<input
						type={`text`}
						onChange={(e) => onInputChange(e)}
						className={`post-search__input`}
						value={inputVal}
						placeholder={`Search Posts...`}
					/>
				</form>
			</div>
		</div>
	)
}

export default PostSearch;
