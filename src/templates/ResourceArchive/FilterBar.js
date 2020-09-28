import React from "react";
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import IconMagnifyingGlass from '../../assets/svgs/icon-magnifying-glass';
import Select from 'react-select';
import Variables from '../../assets/scss/config/_variables.scss';
import { UnescapeText } from '../../utils/TextHelpers';
import { CATEGORY_QUERY_PARTIAL } from '../../queries/GetCategories';

const FilterBar = ({
	searchText, searchTextChanged, onSearchSubmit,
	selectedTopics, onSelectedTopicsChanged,
	resourceTypeDropdownItems, selectedResourceTypes, onSelectedResourceTypesChanged
}) => {
	const CATEGORY_QUERY = gql`${CATEGORY_QUERY_PARTIAL}`;

	const buildTopicCollection = (rawCategories) => {
		let topicCollection = [];

		for (let i = 0; i < rawCategories.length; i++) {
			let cat = rawCategories[i];
			topicCollection.push({ value: cat.node.categoryId, label: UnescapeText(cat.node.name) });
		}

		// console.log('topicCollection', topicCollection);
		return topicCollection;
	}

	const customStyles = {
		option: (provided, { data, isDisabled, isFocused, isSelected }) => ({
			...provided,
			cursor: 'pointer',
			borderBottom: `1px solid ${Variables.medGreyColor}`,
			fontSize: '14px',
			fontFamily: Variables.headingFont,
			backgroundColor: isFocused ? Variables.greenColor : 'white'
		}),
		control: (provided) => ({
			...provided,
			cursor: 'pointer',
			border: `1px solid ${Variables.pseudoBlackColor}`,
			borderRadius: 0
		}),
		multiValue: (styles, { data }) => {
			return {
			  ...styles
			};
		  },
		multiValueLabel: (styles, { data }) => ({
			...styles,
			cursor: 'pointer',
			color: Variables.blueColor,
			backgroundColor: Variables.medGreyColor,
			fontSize: '16px',
			fontFamily: Variables.headingFont,
			borderRadius: 0
		}),
		multiValueRemove: (styles, { data }) => ({
			...styles,
			cursor: 'pointer',
			backgroundColor: Variables.medGreyColor,
			color: Variables.blueColor,
			borderRadius: 0,
			':hover': {
			  backgroundColor: Variables.greyColor,
			},
		  }),
	  }

	const baseClass = `filter-bar`;
	return (
		<div className={`${baseClass} container`}>
			<div className={`row`}>
				<div className={`${baseClass}__topic-dropdown col-lg-4`}>
					<Query query={CATEGORY_QUERY}>
						{({ loading, error, data }) => {
							if (loading) {
								return <p></p>
							}
							if (error || !data.categories || !data.categories.edges) {
								console.error('FilterBar unable to get categories!');
								return <p>Error</p>;
							}

							const topicDropdownItems = buildTopicCollection(data.categories.edges);
							return (
								<Select
									className="basic-multi-select"
									classNamePrefix="select"
									isSearchable={false}
									options={topicDropdownItems}
									styles={customStyles}
									isMulti
									onChange={onSelectedTopicsChanged}
									value={selectedTopics}
									placeholder={`Topics`} />
							);
						}}
					</Query>

				</div>
				<div className={`${baseClass}__resource-type-dropdown col-lg-4`}>
					<Select
						className="basic-multi-select"
						classNamePrefix="select"
						isSearchable={false}
						options={resourceTypeDropdownItems}
						styles={customStyles}
						isMulti
						onChange={onSelectedResourceTypesChanged}
						value={selectedResourceTypes}
						placeholder={`Resource Type`} />
				</div>
				<div className={`${baseClass}__search-area col-lg-4`}>
					<div className={`post-search__input-container`}>
						<form onSubmit={(e) => onSearchSubmit(e)}>
							<IconMagnifyingGlass />
							<input
								type={`text`}
								onChange={searchTextChanged}
								className={`post-search__input no-max-width`}
								value={searchText}
								placeholder={`Search Resources...`}
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FilterBar;
