import React, { useState } from "react";
import ArrowNoStem from '../../assets/svgs/arrow-no-stem';
import CircleCloseButton from '../../assets/svgs/circle-close-button';
import YouTube from 'react-youtube';

const VideoEmbed = ({ imageOverlay, ytVideoId }) => {

	const [showVideoModal, setShowVideoModal] = useState(false);
	const ytOptions = { }; // in case we ever need to provide youtube options for the embed

	// where we will store the YouTube player reference once it's ready
	let ytPlayerRef = null;

	const playerReady = (event) => {
		// when the player is ready we store off the reference to the player so we can play it when needed
		ytPlayerRef = event.target;
		ytPlayerRef.playVideo();
	}

	const playVideo = () => {
		setShowVideoModal(true);
	}

	const closeVideoModal = () => {
		setShowVideoModal(false);
	}

	return (
		<div className={`video-embed`}>
			{ (imageOverlay && imageOverlay.mediaItemUrl) ?
				<img id="videoImageOverlay"
					src={imageOverlay.mediaItemUrl}
					alt={imageOverlay.altText}
					onClick={() => playVideo()} />
				: null
			}
			<div className={`video-embed__arrows`}>
				<button
					onClick={() => playVideo()}
					className={`arrow-right`}>
					<ArrowNoStem />
				</button>
			</div>
			{ showVideoModal ?
				<div className={'video-overlay'} onClick={closeVideoModal}>
					<div className={'video-overlay__wrapper'}>
						<div className={'video-overlay__wrapper__close-button'}>
							<CircleCloseButton />
						</div>
						<div className={'video-overlay__wrapper__player'}>
							<YouTube
								id={ytVideoId}
								className='video-overlay__wrapper__player__ytembed'
								videoId={ytVideoId}
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
}

export default VideoEmbed;
