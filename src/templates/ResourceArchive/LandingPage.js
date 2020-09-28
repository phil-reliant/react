import React from "react";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import LoadingPage from '../../components/LoadingPage';
import ResourceSection from './ResourceSection';
import * as ResourceConstants from './ResourceConstants';
import * as ResourceQueries from './ResourceQueries';

const LandingPage = ({ onShowAllOfResourceType }) => {

	let RESOURCE_QUERY = gql`
		${ResourceQueries.FEATURED_RESOURCE_QUERY}
		`;

	const { loading, error, data } = useQuery(RESOURCE_QUERY);
	if (loading) {
		return <LoadingPage />;
	}
	if (error) return <p>Error loading resources</p>;

	return (
		<div className="filter-results-page">
			{ data.posts.nodes && data.posts.nodes.length > 0 ?
				<div class="alt-colored-section-wrapper">
					<ResourceSection
						resourceType={ResourceConstants.Articles}
						resourceData={data.posts.nodes}
						onShowAllOfResourceType={onShowAllOfResourceType} />
				</div>
				:
				null
			}
			{ data.caseStudies.nodes && data.caseStudies.nodes.length > 0 ?
				<div class="alt-colored-section-wrapper">
					<ResourceSection
						resourceType={ResourceConstants.CaseStudy}
						resourceData={data.caseStudies.nodes}
						onShowAllOfResourceType={onShowAllOfResourceType} />
				</div>
				:
				null
			}
			{ data.infographics.nodes && data.infographics.nodes.length > 0 ?
				<div class="alt-colored-section-wrapper">
					<ResourceSection
						resourceType={ResourceConstants.Infographics}
						resourceData={data.infographics.nodes}
						onShowAllOfResourceType={onShowAllOfResourceType} />
				</div>
				:
				null
			}
			{ data.podcasts.nodes && data.podcasts.nodes.length > 0 ?
				<div class="alt-colored-section-wrapper">
					<ResourceSection
						resourceType={ResourceConstants.Podcasts}
						resourceData={data.podcasts.nodes}
						onShowAllOfResourceType={onShowAllOfResourceType} />
				</div>
				:
				null
			}
			{ data.videos.nodes && data.videos.nodes.length > 0 ?
				<div class="alt-colored-section-wrapper">
					<ResourceSection
						resourceType={ResourceConstants.Videos}
						resourceData={data.videos.nodes}
						onShowAllOfResourceType={onShowAllOfResourceType} />
				</div>
				:
				null
			}
			{ data.whitePapers.nodes && data.whitePapers.nodes.length > 0 ?
				<div class="alt-colored-section-wrapper">
					<ResourceSection
						resourceType={ResourceConstants.WhitePapers}
						resourceData={data.whitePapers.nodes}
						onShowAllOfResourceType={onShowAllOfResourceType} />
				</div>
				:
				null
			}
			{ data.guides && data.guides.nodes && data.guides.nodes.length > 0 ?
				<div class="alt-colored-section-wrapper">
					<ResourceSection
						resourceType={ResourceConstants.Guides}
						resourceData={data.guides.nodes}
						onShowAllOfResourceType={onShowAllOfResourceType} />
				</div>
				:
				null
			}
		</div>
	)
}
export default LandingPage;
