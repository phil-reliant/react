import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";

const IconGridItem = props => {
	const {
		icon,
		title,
		bodyText,
		buttons,
		buttonAlignment,
		buttonType
	} = props;

	return (
		<div className="icon-grid-item">
			<img src={icon ? icon.sourceUrl : ''}
				alt={icon ? icon.altText : ''} />
			<h3 className="h3">{title}</h3>
			<p>{bodyText}</p>

			<Button
				buttons={buttons}
				alignment={buttonAlignment}
				type={buttonType}
				/>
		</div>
	);
};

IconGridItem.propTypes = {
	icon: PropTypes.object,
	title: PropTypes.string,
	bodyText: PropTypes.string,
	buttons: PropTypes.array,
	buttonAlignment: PropTypes.string,
	buttonType: PropTypes.string
};

export default IconGridItem;
