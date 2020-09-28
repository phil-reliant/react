import React from 'react';
import {
	FacebookShareButton,
	FacebookIcon,
	LinkedinShareButton,
	LinkedinIcon,
	TwitterShareButton,
	TwitterIcon
} from 'react-share';

const PostShareButtons = props => {

	return (
		<>
			<span className={`share-title subhead`}>Share this page:</span>
			<ul className={`share-list`}>
				<li className={`share-button`}>
					<FacebookShareButton className={`post-share--facebook`} url={window.location}>
						<FacebookIcon round={true} size={20} />
					</FacebookShareButton>
				</li>
				<li className={`share-button`}>
					<LinkedinShareButton className={`post-share--linkedin`} url={window.location}>
						<LinkedinIcon size={37} />
					</LinkedinShareButton>
				</li>
				<li className={`share-button`}>
					<TwitterShareButton className={`post-share--twitter`} url={window.location}>
						<TwitterIcon size={30} />
					</TwitterShareButton>
				</li>
			</ul>
		</>
	)
}

export default PostShareButtons;