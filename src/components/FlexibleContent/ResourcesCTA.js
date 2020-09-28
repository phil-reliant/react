import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import GlobalConstants from '../../GlobalConstants';
import { TruncateText, UnescapeText } from '../../utils/TextHelpers';
import RightArrow from '../../assets/svgs/right-arrow';
import { MakeRelativePath } from '../../utils/UrlUtils';

const ResourcesCTA = props => {
	const baseClass = `layout-resources-cta`;
	const { heading, resources } = props;
	console.log(props)

	const cols = resources.map((resource, index) => {
		const {
			title,
			excerpt,
			__typename,
			link
		} = resource;

		let typename = '';

		if(resource.__typename === 'Post') {
				typename = 'Blog';
		}
		else if (resource.__typename === 'CaseStudy'){
				typename = 'Case Study';
		}
		else if (resource.__typename === 'WhitePaper'){
			typename = 'White Paper';
		}
		else {
			typename = resource.__typename;

		}

		let shortExcerpt = TruncateText(excerpt, GlobalConstants.resources.shortExcerptMaxCharLength); // force a max length to the excerpt

		return (
			<Link
				key={`resource-cta-${index}`}
				className={`col-md-6 col-lg-5 ${baseClass}__resource`}
				to={MakeRelativePath(link)}
				target="_blank"
			>
				<div className={`${baseClass}__resource__inner`}>
					<span className={`${baseClass}__resource__type`}>{typename}</span>
					<h6 className={`h7 ${baseClass}__resource__title`}>{UnescapeText(title)}</h6>
					<div className={`${baseClass}__resource__excerpt`} dangerouslySetInnerHTML={{__html: shortExcerpt}} />
					<RightArrow />
				</div>
			</Link>
		);
	})

	return (
		<div className={baseClass}>
			<div className={`${baseClass}__inner container`}>
				<div className={`row`}>
					<div className={`col-12`}>
						<h6 className={`${baseClass}__heading --sub-head`}>{heading}</h6>
					</div>
					{cols}
				</div>
			</div>
		</div>
	);
}

ResourcesCTA.propTypes = {
	heading: PropTypes.string,
	resources: PropTypes.array.isRequired
}

export default ResourcesCTA;
