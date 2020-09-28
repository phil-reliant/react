import React from "react";
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import LoadingSpinner from '../../components/LoadingSpinner';
import ResourceItem from './ResourceItem';
import * as ResourceConstants from './ResourceConstants';
import * as ResourceQueries from './ResourceQueries';
import { BuildGenericResourcesFromNodes } from './ResourceUtilities';

const FilterResultsPage = ({ selectedTopics, selectedResourceTypes, submittedSearchText }) => {

	// console.log('FilterResultsPage.selectedTopic', selectedTopics);
	// console.log('FilterResultsPage.selectedResourceType', selectedResourceTypes);

	const buildDynamicQuery = () => {

		// if they picked topic(s) then we need a where clause to use in our queries
		// ex: (where: {search: "", categoryIn: [1632]}, first: 50)
		let dynamicWhereClause = "";
		let categoryIds = [];
		if (selectedTopics && selectedTopics.length > 0) {
			for (let t = 0; t < selectedTopics.length; t++) {
				categoryIds.push(selectedTopics[t].value);
			}
		}

		dynamicWhereClause = `(where: {${submittedSearchText !== "" ? `search: "${submittedSearchText}", ` : ``} ${categoryIds.length > 0 ? `categoryIn: [${categoryIds.join(',')}]` : ``}}, first: 50)`
		// console.log('dynamicWhereClause', dynamicWhereClause);

		// default to querying for all resource types
		let dynamicQuery = gql`
			query DYNAMIC_RESOURCE_QUERY {
				posts${dynamicWhereClause} {
					${ResourceQueries.ARTICLES_PARTIAL_QUERY}
				}
				caseStudies${dynamicWhereClause} {
					${ResourceQueries.GENERIC_RESOURCE_PARTIAL_QUERY}
				}
				whitePapers${dynamicWhereClause} {
					${ResourceQueries.GENERIC_RESOURCE_PARTIAL_QUERY}
				}
				guides${dynamicWhereClause} {
					${ResourceQueries.GUIDES_PARTIAL_QUERY}
				}
				infographics${dynamicWhereClause} {
					${ResourceQueries.GENERIC_RESOURCE_PARTIAL_QUERY}
				}
				podcasts${dynamicWhereClause} {
					${ResourceQueries.PODCASTS_PARTIAL_QUERY}
				}
				videos${dynamicWhereClause} {
					${ResourceQueries.VIDEOS_PARTIAL_QUERY}
				}
			}
		`;

	// 	console.log('dynamicQuery', `
	// 	query DYNAMIC_RESOURCE_QUERY {
	// 		posts${dynamicWhereClause} {
	// 			${ResourceQueries.ARTICLES_PARTIAL_QUERY}
	// 		}
	// 		caseStudies${dynamicWhereClause} {
	// 			${ResourceQueries.GENERIC_RESOURCE_PARTIAL_QUERY}
	// 		}
	// 		whitePapers${dynamicWhereClause} {
	// 			${ResourceQueries.GENERIC_RESOURCE_PARTIAL_QUERY}
	// 		}
	// 		guides${dynamicWhereClause} {
	// 			${ResourceQueries.GUIDES_PARTIAL_QUERY}
	// 		}
	// 		infographics${dynamicWhereClause} {
	// 			${ResourceQueries.GENERIC_RESOURCE_PARTIAL_QUERY}
	// 		}
	// 		podcasts${dynamicWhereClause} {
	// 			${ResourceQueries.PODCASTS_PARTIAL_QUERY}
	// 		}
	// 		videos${dynamicWhereClause} {
	// 			${ResourceQueries.VIDEOS_PARTIAL_QUERY}
	// 		}
	// 	}
	// `);

		// if a specific resource type was selected, then instead use a post type specific query
		if (selectedResourceTypes && selectedResourceTypes.length > 0) {
			// console.log('using specific', selectedResourceTypes[0].value);

			let dynamicQueryPortion = ``;

			for (let i = 0; i < selectedResourceTypes.length; i++) {
				let resType = selectedResourceTypes[i];

				if (resType.value === ResourceConstants.Articles.PostType) {
					dynamicQueryPortion = dynamicQueryPortion + `
						${resType.value}${dynamicWhereClause} {
							${ResourceQueries.ARTICLES_PARTIAL_QUERY}
						}
					`;
				} else if (resType.value === ResourceConstants.Podcasts.PostType) {
					dynamicQueryPortion = dynamicQueryPortion + `
						${resType.value}${dynamicWhereClause} {
							${ResourceQueries.PODCASTS_PARTIAL_QUERY}
						}
					`;
				}  else if (resType.value === ResourceConstants.Videos.PostType) {
					dynamicQueryPortion = dynamicQueryPortion + `
						${resType.value}${dynamicWhereClause} {
							${ResourceQueries.VIDEOS_PARTIAL_QUERY}
						}
					`;
				}else if (resType.value === ResourceConstants.Guides.PostType) {
					dynamicQueryPortion = dynamicQueryPortion + `
						${resType.value}${dynamicWhereClause} {
							${ResourceQueries.GUIDES_PARTIAL_QUERY}
						}
					`;
				} else {
					dynamicQueryPortion = dynamicQueryPortion + `
						${resType.value}${dynamicWhereClause} {
							${ResourceQueries.GENERIC_RESOURCE_PARTIAL_QUERY}
						}
					`;
				}
			}

			// console.log('dynamicQueryPortion', dynamicQueryPortion);

			dynamicQuery = gql`
				query DYNAMIC_RESOURCE_QUERY {
					${dynamicQueryPortion}
				}`;
		}

		return dynamicQuery;
	}

	const dynamicQuery = buildDynamicQuery();
	// console.log('selectedResourceType', selectedResourceTypes);
	// RTR-132: if filtering by type then show the category, if filtering by topic then show the type, if filtering by both show the category
	// NOTE:: said another way, always show the category unless filtering by topic - then show the resource type
	let useResourceTypeAsTags = false;
	if ((selectedTopics && selectedTopics.length > 0) && (!selectedResourceTypes || selectedResourceTypes.length === 0)) {
		useResourceTypeAsTags = true;
	}

	const baseClass = `filter-results-page`;
	return (
		<div className={`${baseClass} container`}>
			<div className={`row`}>
				<div className={`col-12`}>
					<h5 className={`${baseClass}__header`}>Results</h5>
				</div>
			</div>

			<div className={`row ${baseClass}__results-wrapper`}>
				<Query query={dynamicQuery}>
					{({ loading, error, data }) => {
						if (loading) {
							return (
								<div className="col-12">
									<LoadingSpinner small paddingTopSmall />
								</div>
							);
						}
						if (error) {
							console.error('FilterResultsPage unable to query resources!');
							return <p>Error</p>;
						}

						// console.log('FilterResultsPage data', data);
						let genericResources = [];
						if (data.posts && data.posts.nodes) {
							const articleResources = BuildGenericResourcesFromNodes(data.posts.nodes, ResourceConstants.Articles, useResourceTypeAsTags);
							articleResources.forEach((res) => { genericResources.push(res); });
						}
						if (data.caseStudies && data.caseStudies.nodes) {
							const caseStudyResources = BuildGenericResourcesFromNodes(data.caseStudies.nodes, ResourceConstants.CaseStudy, useResourceTypeAsTags);
							caseStudyResources.forEach((res) => { genericResources.push(res); });
						}
						if (data.infographics && data.infographics.nodes) {
							const infographicResources = BuildGenericResourcesFromNodes(data.infographics.nodes, ResourceConstants.Infographics, useResourceTypeAsTags);
							infographicResources.forEach((res) => { genericResources.push(res); });
						}
						if (data.podcasts && data.podcasts.nodes) {
							const podcastResources = BuildGenericResourcesFromNodes(data.podcasts.nodes, ResourceConstants.Podcasts, useResourceTypeAsTags);
							podcastResources.forEach((res) => { genericResources.push(res); });
						}
						if (data.videos && data.videos.nodes) {
							const videoResources = BuildGenericResourcesFromNodes(data.videos.nodes, ResourceConstants.Videos, useResourceTypeAsTags);
							videoResources.forEach((res) => { genericResources.push(res); });
						}
						if (data.whitePapers && data.whitePapers.nodes) {
							const whitePaperResources = BuildGenericResourcesFromNodes(data.whitePapers.nodes, ResourceConstants.WhitePapers, useResourceTypeAsTags);
							whitePaperResources.forEach((res) => { genericResources.push(res); });
						}
						if (data.guides && data.guides.nodes) {
							const guideResources = BuildGenericResourcesFromNodes(data.guides.nodes, ResourceConstants.Guides, useResourceTypeAsTags);
							guideResources.forEach((res) => { genericResources.push(res); });
						}

						// sort with newest first (will intersperse results so they aren't grouped by type)
						const sortedGenericResources = genericResources.slice().sort((a, b) => (new Date(b.date) - new Date(a.date)));

						return (
							sortedGenericResources.map((resourceEntry, index) => {
								return (
									<ResourceItem
										key={`ri-${index}`}
										title={resourceEntry.title}
										date={resourceEntry.date}
										excerpt={resourceEntry.excerpt}
										featuredImage={resourceEntry.featuredImage}
										tagListing={resourceEntry.tagListing}
										resourceDownloadUrl={resourceEntry.resourceDownloadUrl}
										resourceType={resourceEntry.resourceType} />
								)
							})
						)
					}}
				</Query>
			</div>
		</div>
	)
}
export default FilterResultsPage;
