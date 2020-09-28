import React from "react";
import PropTypes from "prop-types";
import CaseStudyFeaturedTabber from "./CaseStudyFeaturedTabber";
import CaseStudyFeaturedSlider from "./CaseStudyFeaturedSlider";

const CaseStudyFeatured = props => {
	const {
		headingText,
		caseStudies,
		backgroundColor
	} = props;

	return (
		<div className={`case-study-featured`}>
			{ headingText ?
				<div className="container">
					<h5>{headingText}</h5>
				</div>
			: null}
			<div className="case-study-featured --desktop-only">
				<CaseStudyFeaturedTabber backgroundColor={backgroundColor} caseStudies={caseStudies} />
			</div>
			<div className="case-study-featured --mobile-only">
				<CaseStudyFeaturedSlider caseStudies={caseStudies} />
			</div>
		</div>
	);
};

CaseStudyFeatured.propTypes = {
	headingText: PropTypes.string,
	caseStudies: PropTypes.array,
	backgroundColor: PropTypes.string
};


export default CaseStudyFeatured;
