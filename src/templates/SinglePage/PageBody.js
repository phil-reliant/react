import React from "react";
import PropTypes from "prop-types";
import FlexibleContent from "../../components/FlexibleContent";
import SEO from "../../components/SEO";

const PageBody = props => {

	let opengraphType = ( `home` === props.route ) ? `website` : `article`;

  return (
    <div className={`page-body`}>
      <SEO {...props.seo} opengraphType={opengraphType} />
      <FlexibleContent {...props} />
    </div>
  );
};

PageBody.propTypes = {
  title: PropTypes.string,
  pageTemplate: PropTypes.string,
  pageContentFields: PropTypes.object,
  seo: PropTypes.object
};

export default PageBody;
