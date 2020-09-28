import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { UnescapeText } from '../../utils/TextHelpers';

const SEO = props => {
	const {
		title,
		description,
		metaDesc,
		metaKeywords,
		metaRobotsNoindex,
		metaRobotsNofollow,
		metaRobotsAdvanced,
		author,
		lang,
		opengraphTitle,
		opengraphDescription,
		opengraphImage,
		opengraphType = 'article',
		featuredImage,
		canonicalURL,
		twitterTitle,
		twitterDescription,
		twitterImage,
		twitterCardType = 'summary',
	} = props;

	var image = ( featuredImage && featuredImage.mediaItemUrl )? featuredImage.mediaItemUrl : '',
		opengraphTitleDisplay = ( opengraphTitle )? opengraphTitle : title,
		opengraphDescriptionDisplay = ( opengraphDescription )? opengraphDescription : metaDesc,
		opengraphImageDisplay = ( opengraphImage && opengraphImage.mediaItemUrl )? opengraphImage.mediaItemUrl : image,
		twitterTitleDisplay = ( twitterTitle )? twitterTitle : title,
		twitterDescriptionDisplay = ( twitterDescription )? twitterDescription : metaDesc,
		twitterImageDisplay = ( twitterImage && twitterImage.mediaItemUrl )? twitterImage.mediaItemUrl : image;

	let robotsContent = [];

	if( `1` === metaRobotsNoindex ){
		robotsContent.push(`noindex`);
	}else{
		robotsContent.push(`index`);
	}

	if( `1` === metaRobotsNofollow ){
		robotsContent.push(`nofollow`);
	}else{
		robotsContent.push(`follow`);
	}

	if( metaRobotsAdvanced ){
		robotsContent.push(metaRobotsAdvanced);
	}

	let links = [];

	if( canonicalURL ){
		links.push({
			rel: 'canonical',
			href: canonicalURL,
		});
	}

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={UnescapeText(title)}
      titleTemplate={`%s`}
      link={links}
      meta={[
        {
          name: `description`,
          content: metaDesc
        },
		{
          name: `robots`,
          content: robotsContent.join(',')
        },
        {
          property: `og:title`,
          content: UnescapeText(opengraphTitleDisplay)
        },
        {
          property: `og:description`,
          content: opengraphDescriptionDisplay
        },
		    {
          property: `og:image`,
          content: opengraphImageDisplay
        },
        {
          property: `og:type`,
          content: opengraphType
        },
        {
          name: `twitter:card`,
          content: twitterCardType
        },
        {
          name: `twitter:creator`,
          content: author
        },
        {
          name: `twitter:title`,
          content: UnescapeText(twitterTitleDisplay)
        },
        {
          name: `twitter:description`,
          content: twitterDescriptionDisplay
        },
        {
        name: `twitter:image`,
        content: twitterImageDisplay
        }
      ]}
    />
  );
};

SEO.defaultProps = {
    lang: `en`,
    description: ``,
    author: ``,
};

SEO.propTypes = {
    description: PropTypes.string,
    lang: PropTypes.string,
    author: PropTypes.string,
    title: PropTypes.string.isRequired
}

export default SEO;
