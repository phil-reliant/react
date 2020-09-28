import React from "react";
import PropTypes from "prop-types";
import Button from '../Button';
import TextFlipper from '../TextFlipper';
import SideLogo from "../../assets/images/side-bars-11.png";
import Circuits from '../../assets/images/circuits.png';

const MastheadLayout = props => {
	const {
		title,
		titleSwappingWords,
		body,
		image,
		buttons,
		buttonAlignment,
		buttonType,
		imageOverlayOpacity
	} = props;

	let mastheadStyle = {};

	if (image.mediaItemUrl) {
		mastheadStyle.backgroundImage = `url('${image.mediaItemUrl}')`;
		mastheadStyle.backgroundSize = `cover`;
	}

	let overlayStyle = {};
	if (imageOverlayOpacity) {
		const opacityDecimal = imageOverlayOpacity / 100;
		overlayStyle = {background: `rgba(0, 0, 0, ${opacityDecimal})`}
	}

	return (
		<div className={`layout-masthead`} style={mastheadStyle}>
			<img
				className={`layout-masthead__overlay-img`}
				src={SideLogo}
				alt={`Side server graphic`}
			/>
			<img
				className={`layout-masthead__overlay-circuits`}
				src={Circuits}
				alt={`circuits graphic`}
			/>
			<div className={`layout-masthead__overlay`} style={overlayStyle} />
			<div className={`layout-masthead__inner container`}>
				<div className={`row`}>
					<div className={`col col-sm-12 col-md-8`}>
						<h1 className={`h2`}>
							{title}
							{
								titleSwappingWords ?
									<TextFlipper textItems={titleSwappingWords} />
									: null
							}
						</h1>
						<p className={`--small`}>{body}</p>
						<Button
							buttons={buttons}
							alignment={buttonAlignment}
							type={buttonType}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

MastheadLayout.propTypes = {
	title: PropTypes.string,
	titleSwappingWords: PropTypes.array,
	body: PropTypes.string,
	image: PropTypes.object,
	buttons: PropTypes.array,
	buttonAlignment: PropTypes.string,
	buttonType: PropTypes.string
};

export default MastheadLayout;
