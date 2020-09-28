import React, { useState } from "react";
import PropTypes from "prop-types";
import ArrowNoStem from '../../assets/svgs/arrow-no-stem';
import YouTube from 'react-youtube';
import { GetYoutubeID } from '../../utils/YouTubeHelpers';

const VideoPlayer = props => {
	const {
		sectionTitle,
		youtubeUrl,
		imageOverlay
	} = props;

	const [ showPlayer, setShowPlayer ] = useState(false);
	const ytOptions = { }; // in case we ever need to provide youtube options for the embed

	// where we will store the YouTube player reference once it's ready
	let ytPlayerRef = null;

	const showAndPlayVideo = (youtubeID) => {
		if (ytPlayerRef) {
			setShowPlayer(true);
			ytPlayerRef.playVideo();
		}
	}

	const playerReady = (event) => {
		// when the player is ready we store off the reference to the player so we can play it when needed
		ytPlayerRef = event.target;
	}

	// If we can't parse the YouTube Video ID then we won't show the image, we will show an overt error
	const ytVideoID = GetYoutubeID(youtubeUrl);
	if (!ytVideoID) {
		return (
			<div className={`video-player`}>
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="error">Invalid YouTube URL: {youtubeUrl}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={`video-player`}>
			{ sectionTitle ?
				<div className="container">
					<div className="row">
						<div className="col-12">
							<h4>{sectionTitle}</h4>
						</div>
					</div>
				</div>
			: null}

			<div className="container">
				<div className="centered row">
					<div className="col-12">
						<div className={`video-player__embed-area`}>
							{ (imageOverlay && imageOverlay.mediaItemUrl) ?
								<img id="videoImageOverlay"
									className={showPlayer ? `hide` : ``}
									src={imageOverlay.mediaItemUrl}
									alt={imageOverlay.altText}
									onClick={showAndPlayVideo} />
								: null
							}
							<div className={`video-player__embed-area__arrows`}>
								<button
									onClick={showAndPlayVideo}
									className={`arrow-right ${showPlayer ? `hide` : ``}`}>
									<ArrowNoStem />
								</button>
							</div>
							<div className={`video-player__embed-area__video ${showPlayer ? `` : `hide`}`}>
								{ (ytVideoID) ?
									<YouTube
										id={ytVideoID}
										className='video-player__embed-area__video__ytembed'
										videoId={ytVideoID}
										opts={ytOptions}
										onReady={playerReady}
										/>
									:
									<div>Invalid YouTube URL</div>
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

VideoPlayer.propTypes = {
	sectionTitle: PropTypes.string,
	youtubeUrl: PropTypes.string.isRequired,
	imageOverlay: PropTypes.object.isRequired
};

export default VideoPlayer;
