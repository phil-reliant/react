import React, { useState, useEffect } from "react";
import ResourcesHeaderImg from '../../assets/images/resources-lander-header@3x.jpg';
import FilterBar from './FilterBar';
import FilterResultsPage from './FilterResultsPage';
import LandingPage from './LandingPage';
import SideBars9 from '../../assets/images/side-bars-9.png';
import * as ResourceConstants from './ResourceConstants';

const ResourceArchive = props => {

	const VIEW_LANDING_PAGE = 0;
	const VIEW_RESULTS_PAGE = 1;

	const resourceTypeDropdownItems = [
		{ value: ResourceConstants.Articles.PostType, label: ResourceConstants.Articles.PluralName },
		{ value: ResourceConstants.CaseStudy.PostType, label: ResourceConstants.CaseStudy.PluralName },
		{ value: ResourceConstants.Infographics.PostType, label: ResourceConstants.Infographics.PluralName },
		{ value: ResourceConstants.Podcasts.PostType, label: ResourceConstants.Podcasts.PluralName },
		{ value: ResourceConstants.Videos.PostType, label: ResourceConstants.Videos.PluralName },
		{ value: ResourceConstants.WhitePapers.PostType, label: ResourceConstants.WhitePapers.PluralName },
		{ value: ResourceConstants.Guides.PostType, label: ResourceConstants.Guides.PluralName }
	]

	const [ searchText, setSearchText ] = useState('');
	const [ submittedSearchText, setSubmittedSearchText] = useState('');
	const [ selectedTopics, setSelectedTopics ] = useState(null); // categoryId
	const [ selectedResourceTypes, setSelectedResourceTypes] = useState(null);
	const [ viewToShow, setViewToShow ] = useState(VIEW_LANDING_PAGE);

	const searchTextChanged = (event) => {
		event.preventDefault();
		setSearchText(event.target.value);
	}

	const onSearchSubmit = (event) => {
		event.preventDefault();
		setSubmittedSearchText(searchText);
	}

	const onSelectedTopicsChanged = (selectedOption) => {
		setSelectedTopics(selectedOption);
	}

	const onSelectedResourceTypesChanged = (selectedOption) => {
		setSelectedResourceTypes(selectedOption);
	}

	// Changes filters to show all items of a given resource type (ex: when user clicks 'See All Case Studies')
	const onShowAllOfResourceType = (resourceType) => {
		setSearchText("");
		setSubmittedSearchText("");
		setSelectedTopics(null);
		setSelectedResourceTypes([{ value: resourceType.PostType, label: resourceType.PluralName}]);
	}

	useEffect(() => {
		// console.log('shouldShowLandingPage?? selectedTopics', selectedTopics);
		// console.log('shouldShowLandingPage?? selectedResourceTypes', selectedResourceTypes);
		// console.log('shouldShowLandingPage?? submittedSearchText', submittedSearchText);

		let viewToBeShown = VIEW_LANDING_PAGE;
		if ((selectedTopics !== null && selectedTopics.length > 0) ||
			(selectedResourceTypes !== null && selectedResourceTypes.length > 0) ||
			submittedSearchText !== '') {
			viewToBeShown = VIEW_RESULTS_PAGE;
		}
		// console.log('shouldShowLandingPage?? ', viewToBeShown);
		setViewToShow(viewToBeShown);

	}, [selectedTopics, selectedResourceTypes, submittedSearchText]);

	const baseClass = `resource-archive`;
	const headerStyles = {
		backgroundImage: `url('${ResourcesHeaderImg}')`,
		backgroundSize: `cover`,
		backgroundPosition: `center center`,
		backgroundRepeat: `no-repeat`
	};
	return (
		<section className={baseClass}>
			<div className={`${baseClass}__header`} style={headerStyles}>
				<img className={`side-bars`} src={SideBars9} alt={"Side Bars"} />
				<div className={`${baseClass}__header__inner container`}>
					<h3 className={`${baseClass}__title`}>Resource Center</h3>
				</div>
			</div>
			<FilterBar
				searchText={searchText}
				searchTextChanged={searchTextChanged}
				onSearchSubmit={onSearchSubmit}
				selectedTopics={selectedTopics}
				onSelectedTopicsChanged={onSelectedTopicsChanged}
				resourceTypeDropdownItems={resourceTypeDropdownItems}
				selectedResourceTypes={selectedResourceTypes}
				onSelectedResourceTypesChanged={onSelectedResourceTypesChanged} />

			{/* Show the results area or the landing page */}
			{ viewToShow === VIEW_LANDING_PAGE ?
				<LandingPage
					onShowAllOfResourceType={onShowAllOfResourceType} />
				:
				(viewToShow === VIEW_RESULTS_PAGE) ?
					<FilterResultsPage
						selectedTopics={selectedTopics}
						selectedResourceTypes={selectedResourceTypes}
						submittedSearchText={submittedSearchText} />
					:
					<></>
			}

		</section>
	)
}

export default ResourceArchive;
