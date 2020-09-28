import React from "react";
import PropTypes from "prop-types";
// import FillImage from "../../assets/images/circuit-board-1024x539.png";

const SlideOutArea = props => {
	const {
		slideOutAreaText,
		backgroundImage
	} = props;

	return (
		<div id="lead-gen-lead-gen-slide-out-area" className="lead-gen-slide-out-area">
			<img className="lead-gen-slide-out-area__background-image"
				src={(backgroundImage !== null && backgroundImage.mediaItemUrl !== undefined) ?
					backgroundImage.mediaItemUrl : "https://cms.reliant-technology.com/wp-content/uploads/2020/05/circuit-board-1024x539.6c7ec4c7.png"}
				alt="Slide out background" />
			<div className="lead-gen-slide-out-area__container">
				<div className="lead-gen-slide-out-area__container__big-text h2">{slideOutAreaText}</div>
			</div>
		</div>
	)
}

SlideOutArea.propTypes = {
	slideOutAreaText: PropTypes.string.isRequired,
	backgroundImage: PropTypes.object
};

export default SlideOutArea;
