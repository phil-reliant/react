import React from "react";
import PropTypes from "prop-types";
import FlexibleContent from "../../components/FlexibleContent";
import SEO from "../../components/SEO";

const PageBody = props => {
	return (
		<div className={`page-body`}>
			<SEO {...props.seo} />
			<FlexibleContent {...props} postType={`ProductFamily`}  />
		</div>
	);
};

PageBody.propTypes = {
	title: PropTypes.string,
	pageContentFields: PropTypes.object,
	seo: PropTypes.object
};

export default PageBody;
