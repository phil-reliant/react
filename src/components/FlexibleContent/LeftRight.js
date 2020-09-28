import React from "react";
import PropTypes from "prop-types";
import SideBars from "../../assets/images/side-bars-11.png";
import Circuits from '../../assets/images/circuits.png';
import Button from "../Button";

const LeftRight = props => {
	const {
		heading,
		bodyText,
		image,
		backgroundColor,
		backgroundImage,
		contentOnRight,
		buttons,
		buttonAlignment,
		buttonType,
		staticLeftSidebarImage,
		staticRightSidebarImage
	} = props;

	const baseClass = `left-right`;
	const rowClass = contentOnRight ? `flex-row-reverse` : "";
	const columnClass = contentOnRight ? `reverse` : "";
	const leftSideImage = staticLeftSidebarImage ? <img className={`side-bars`} src={SideBars} alt={"Side Bars decoration"} /> : null;
	const rightSideImage = staticRightSidebarImage ? <img className={`side-bars-right`} src={Circuits} alt={"Circuits decoration"} /> : null;
	const bgImage = backgroundImage ?
		<img className={`right-side-image`} src={backgroundImage.mediaItemUrl} alt={backgroundImage.altText} />
	 	:
		null;

	return (
		<div className={`${baseClass} bg-${backgroundColor}`}>
			{leftSideImage}
			{rightSideImage}
			{bgImage}
			<div className={`${baseClass}__inner container`}>
				<div className={`row ${rowClass}`}>
					<div className={`${baseClass}__inner-col col-12 col-md-7 ${columnClass}`}>
						<h4>{heading}</h4>
						<div className={`${baseClass}__inner-col__body`}
							dangerouslySetInnerHTML={{ __html: bodyText }} />
						<Button
							buttons={buttons}
							alignment={buttonAlignment}
							type={buttonType}
						/>
					</div>
					<div className={`col-12 col-md-5`}>
						<div className={`image-container`}>
							{image && image.mediaItemUrl ?
								<img
									className={`img-responsive`}
									src={image.mediaItemUrl}
									srcSet={image.srcSet}
									alt={image.altText || image.title}
								/>
								:
								<></>
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

LeftRight.propTypes = {
	heading: PropTypes.string,
	bodyText: PropTypes.string,
	image: PropTypes.object,
	backgroundColor: PropTypes.string,
	backgroundImage: PropTypes.object,
	contentOnRight: PropTypes.bool,
	buttons: PropTypes.array,
	buttonAlignment: PropTypes.string,
	buttonType: PropTypes.string,
	staticLeftSidebarImage: PropTypes.bool,
	staticRightSidebarImage: PropTypes.bool
};

export default LeftRight;
