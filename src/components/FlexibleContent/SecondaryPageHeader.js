import React from "react";
import PropTypes from "prop-types";
import SideBars9 from "../../assets/images/side-bars-9.png";

const SecondaryPageHeader = props => {
	const {
		title,
		backgroundImage,
		staticSidebarImage,
		imageOverlayOpacity
	} = props;

	let bgStyle = {};
	let overlayStyle = {};
	if (backgroundImage && backgroundImage.mediaItemUrl) {
		bgStyle.backgroundImage = `url('${backgroundImage.mediaItemUrl}')`;
		bgStyle.backgroundSize = `cover`;

		if (imageOverlayOpacity) {
			const opacityDecimal = imageOverlayOpacity / 100;
			overlayStyle = {background: `rgba(0, 0, 0, ${opacityDecimal})`}
		}
	}

	const sideImg = staticSidebarImage ? <img className={`side-bars`} src={SideBars9} alt={"Side Bars"} /> : "";

	return (
		<div className={`secondary-page-header`} style={bgStyle}>
			<div className={`secondary-page-header__overlay`} style={overlayStyle}></div>
			{sideImg}
			<div className={`secondary-page-header__inner container`}>
				<div className={`row`}>
					<div className={`col col-sm-12 col-md-8`}>
						<h1 className={`h3`}>
							{title}
						</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

SecondaryPageHeader.propTypes = {
	title: PropTypes.string,
	backgroundImage: PropTypes.object,
	staticSidebarImage: PropTypes.bool
};

export default SecondaryPageHeader;
