import React from "react";
import { useQuery } from '@apollo/react-hooks';
import PropTypes from "prop-types";
import SlideOutArea from '../LeadGenFormAndPanel/SlideOutArea';
import StickyDrawerWrapper from './StickyDrawerWrapper';
import gql from 'graphql-tag';

/*
Structure:

Components:
- index.js - main control (contains sticky bar as well as slide-out area)
-- StickyDrawerWrapper.js (wraps side and bottom sticky bars)
--- StickyDrawerBottom.js - version of control shown on mobile (stuck to bottom)
--- StickyDrawerSide.js - version of control shown on desktop (stuck to side)

Child-components (used by both bottom and side sticky bars)
- InterestSelectionForm - selection fields shown on panel 1 (ex: Consultation, Hardware, etc.)
- DetailForm.js - detail fields shown on panel 2 (ex: First name, Last name, etc.)

Constants:
- InterestDefinitions.js - where selectable interests are defined (first panel)
- FieldDefinitions.js - where input fields are defined (second panel)
*/

const LEAD_GEN_QUERY = (postType) => (
	gql`
		query LEAD_GEN_${postType.toUpperCase()}_QUERY($postSlug: String!) {
			${postType}By (uri:$postSlug) {
				lead_gen_settings {
					showForm
					slideOutAreaText
					backgroundImage {
						mediaItemUrl
					}
				}
			}
		}
	`
);


const LeadGenFormAndPanel = (props) => {
	const { postType } = props;
	const { match } = props;
	const { slug } = match ? match.params : ``;

	let route = slug;

	if (!slug) {
		route = `home`;
	}

	const { loading, error, data } = useQuery(LEAD_GEN_QUERY(postType), {
		variables: { postSlug: route }
	});

	if (loading) {
		return <p></p>
	}
	if (error) {
		console.log('LeadGenFormAndPanel error', error);
		return <p>Error loading LeadGenFormAndPanel</p>;
	}
	if (!data[`${postType}By`]) {
		console.warn('LeadGenFormAndPanel unable to find data (ex: could happen on a 404 page).');
		return null;
	}

	var showLeadGenForm = false;
	var leadGenFormSlideOutAreaText = "";
	var backgroundImageOverride = null;
	if (data[`${postType}By`] && data[`${postType}By`].lead_gen_settings) {
		const leadGenSettings = data[`${postType}By`].lead_gen_settings;
		showLeadGenForm = leadGenSettings.showForm;
		leadGenFormSlideOutAreaText = leadGenSettings.slideOutAreaText;
		backgroundImageOverride = leadGenSettings.backgroundImage;
	}

	if (showLeadGenForm == null) {
		showLeadGenForm = false;
	}

	return (
		<>
			{showLeadGenForm ?
				<div className="--desktop-only">
					<SlideOutArea slideOutAreaText={leadGenFormSlideOutAreaText}
						backgroundImage={backgroundImageOverride} />
				</div>
				: null
			}

			<StickyDrawerWrapper showFormArea={showLeadGenForm} />
		</>
	);
}

LeadGenFormAndPanel.propTypes = {
	slug: PropTypes.string,
	postType: PropTypes.string
};

export default LeadGenFormAndPanel;
