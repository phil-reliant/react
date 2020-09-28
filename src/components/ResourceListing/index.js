// The 2-up resource listing of PDFs and Video links as found on product pages
import React, { useState } from "react";
import CircleCloseButton from '../../assets/svgs/circle-close-button';
import PDFIcon from '../../assets/svgs/resource-pdf-icon';
import VideoIcon from '../../assets/svgs/resource-video-icon';
import YouTube from 'react-youtube';
import { GetYoutubeID } from "../../utils/YouTubeHelpers";

const ResourceListing = (props) => {

	var resourceListingWrapper = props.resource_listing;
	var resourceItems = resourceListingWrapper.resourceListing;

	const [showVideoModal, setShowVideoModal] = useState(false);
	const [youtubeVideoId, setYoutubeVideoId] = useState('');

	const ytOptions = { }; // in case we ever need to provide youtube options for the embed

	// where we will store the YouTube player reference once it's ready
	let ytPlayerRef = null;

	const playerReady = (event) => {
		// when the player is ready we store off the reference to the player so we can play it when needed
		ytPlayerRef = event.target;
		ytPlayerRef.playVideo();
	}

	const playVideo = (item) => {
		setYoutubeVideoId(GetYoutubeID(item.youtubeVideo));
		setShowVideoModal(true);
	}

	const closeVideoModal = () => {
		setShowVideoModal(false);
	}

	const renderVideoAsset = (item) => {
		return (
			<div className={`resource-listing__item-container__item__inner`} onClick={() => playVideo(item)}>
				<VideoIcon />
				<p>{item.resourceLabel}</p>
			</div>
		)
	}

	const renderPDFAsset = (item) => {
		return (
			(item.pdfFile && item.pdfFile.mediaItemUrl) ?
			<div className={`resource-listing__item-container__item__inner`}>
				<a href={item.pdfFile.mediaItemUrl}
					className={`resource-listing__item-container__item__inner`}
					target="_blank" rel="noopener noreferrer">
					<PDFIcon />
					<p>{item.resourceLabel}</p>
				</a>
			</div>
			:
			<></>
		)
	}

	return (
		<div className={`resource-listing`}>
			{ (resourceItems && resourceItems.length > 0) ?
				<>
					<h6 className="h7">Resources</h6>
					<div className={`resource-listing__item-container`}>
						{
							resourceItems.map((item, index) => {
								return (
									<div key={`resource_${index}`} className={`resource-listing__item-container__item`}>
										{ (item.type === "video") ?
											renderVideoAsset(item)
											:
											renderPDFAsset(item)
										}
									</div>
								)
							})
						}
					</div>
				</>
				:
				<></>
			}
			{ showVideoModal ?
				<div className={'video-overlay'} onClick={closeVideoModal}>
					<div className={'video-overlay__wrapper'}>
						<div className={'video-overlay__wrapper__close-button'}>
							<CircleCloseButton />
						</div>
						<div className={'video-overlay__wrapper__player'}>
							<YouTube
								id={youtubeVideoId}
								className='video-overlay__wrapper__player__ytembed'
								videoId={youtubeVideoId}
								opts={ytOptions}
								onReady={playerReady}
								/>
						</div>
					</div>
				</div>
				:
				<>
				</>
			}
		</div>
	);
};

export default ResourceListing;
