import React from 'react';
import RightArrow from '../../assets/svgs/right-arrow';
import VideoEmbed from './VideoEmbed';
import GlobalConstants from '../../GlobalConstants';
import * as ResourceConstants from './ResourceConstants';
import { GetYoutubeID } from '../../utils/YouTubeHelpers';
import { TruncateText, UnescapeText } from '../../utils/TextHelpers';
import DefaultImage from '../../assets/images/resource-card-placeholder.jpg';

const ResourceItem = ({
	title,
	date,
	excerpt,
	featuredImage,
	tagListing,
	resourceDownloadUrl,
	resourceType }) => {

	title = UnescapeText(title);
	tagListing = UnescapeText(tagListing);
	excerpt = TruncateText(excerpt, GlobalConstants.resources.excerptMaxCharLength); // force a max length to the excerpt

	const baseClass = `resource-section`;

	const renderPodcast = () => {
		const appearanceStyles = {
			width: '100%',
			height: '260px',
			display: 'block',
			transition: 'height 0.5s ease 0s'
		}

		return (
			<div className={`${baseClass}__results-wrapper__item col-md-6 col-lg-4`}>
				{(featuredImage) ?
					<img src={featuredImage.mediaItemUrl}
						alt={featuredImage.altText} />
					:
					<img src={DefaultImage} alt={``} />
				}
				<p><span className="subhead">{tagListing}</span></p>
				<h6 className="h8">{title}</h6>
				{excerpt ?
					<p className="excerpt" dangerouslySetInnerHTML={{ __html: excerpt }} />
					:
					<></>
				}
				<iframe
					title={`podcast-${title}`}
					allow="fullscreen" allowFullScreen="" width="100%" scrolling="no" frameBorder="no"
					src={`${resourceDownloadUrl}`}
					style={appearanceStyles}>
				</iframe>
			</div>
		)
	}

	const renderVideo = () => {
		const ytVideoId = GetYoutubeID(resourceDownloadUrl);

		return (
			<div className={`${baseClass}__results-wrapper__item col-md-6 col-lg-4`}>
				{ytVideoId ?
					<VideoEmbed
						imageOverlay={featuredImage}
						ytVideoId={ytVideoId} />
					:
					<div className="error">Invalid YouTube URL: {resourceDownloadUrl}</div>
				}
				<p><span className="subhead">{tagListing}</span></p>
				<h6 className="h8">{title}</h6>
				{excerpt ?
					<p className="excerpt" dangerouslySetInnerHTML={{ __html: excerpt }} />
					:
					<></>
				}
			</div>
		)
	}

	// default resource type (used for types that link to an asset like a PDF)
	const renderGeneric = (showFeaturedImage) => {
		return (
			<div className={`${baseClass}__results-wrapper__item col-md-6 col-lg-4`}
				onClick={() => window.open(resourceDownloadUrl, "_blank")}>
				<div className='imgWrapper'>
					{(showFeaturedImage && featuredImage) ?
						<img src={featuredImage.mediaItemUrl}
							alt={featuredImage.altText} />
						:
						<img src={DefaultImage} alt={``} />
					}
				</div>
				<p><span className="subhead">{tagListing}</span></p>
				<h6 className="h8">{UnescapeText(title)}</h6>
				{excerpt ?
					<p className="excerpt" dangerouslySetInnerHTML={{ __html: excerpt }} />
					:
					<></>
				}

				{/* wire up to open PDF (or blog URL for articles) in a new tab */}
				<div className={`${baseClass}__results-wrapper__item__arrow-button`}>
					<RightArrow />
				</div>
			</div>
		)
	}

	// console.log(resourceType);

	if (resourceType.PostType === ResourceConstants.Podcasts.PostType) {
		return (
			renderPodcast()
		);
	} else if (resourceType.PostType === ResourceConstants.Videos.PostType) {
		return (
			renderVideo()
		)
	} else if (
		// we don't show featured images for some types
		(resourceType.PostType === ResourceConstants.Infographics.PostType) ||
		(resourceType.PostType === ResourceConstants.WhitePapers.PostType)) {
		return (
			renderGeneric(true)
		)
	} else if(resourceType.PostType === ResourceConstants.Guides.PostType) {
		return (
			renderGeneric(true)
		)
	} else {
		return (
			renderGeneric(true)
		)
	}
}

export default ResourceItem;
