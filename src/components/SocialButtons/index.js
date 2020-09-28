import React from 'react';
import GlobalConstants from '../../GlobalConstants';
import TwitterIcon from '../../assets/svgs/twitter-icon';
import LinkedinIcon from '../../assets/svgs/linkedin-icon';
import YoutubeIcon from '../../assets/svgs/youtube-icon';
import FacebookIcon from '../../assets/svgs/facebook-icon';

const SocialButtons = () => {
	return (
		<section className={`social-buttons`}>
			<a className={`social-link`}
				href={GlobalConstants.socialUrls.twitter}
				target="_blank" rel="noopener noreferrer">
				<TwitterIcon />
			</a>
			<a className={`social-link`}
				href={GlobalConstants.socialUrls.linkedin}
				target="_blank" rel="noopener noreferrer">
				<LinkedinIcon />
			</a>
			<a className={`social-link`}
				href={GlobalConstants.socialUrls.youtube}
				target="_blank" rel="noopener noreferrer">
				<YoutubeIcon />
			</a>
			<a className={`social-link`}
				href={GlobalConstants.socialUrls.facebook}
				target="_blank" rel="noopener noreferrer">
				<FacebookIcon />
			</a>
		</section>
	);
}

export default SocialButtons;
