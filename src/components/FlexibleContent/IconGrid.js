import React from "react";
import PropTypes from "prop-types";
import IconGridItem from "./IconGridItem";
import Button from "../Button";

const IconGrid = props => {
	const {
		backgroundColor,
		gridItems,
		heading,
		buttons,
		buttonAlignment
	} = props;

	const renderedItems = gridItems.map((item, index) => {
		return (
			<div key={index} className="col-lg-4 col-md-6">
				<IconGridItem {...item} />
			</div>
		)
	});

	return (
		<div className={`icon-grid bg-${backgroundColor}`}>
			{ heading ?
				<div className="container">
					<div className="row">
						<div className="col-12">
							<h5>{heading}</h5>
						</div>
					</div>
				</div>
			: null}
			<div className="container icon-grid-container">
				<div className="row">
					{renderedItems}
				</div>
			</div>
			{
				buttons && buttons.length > 0 ?
					<div className="container icon-grid__cta-buttons">
						<div className="row">
							<div className="col-12">
								<Button
									buttons={buttons}
									alignment={buttonAlignment}
								/>
							</div>
						</div>
					</div>
					:
					null
			}
		</div>
	);
};

IconGrid.propTypes = {
	backgroundColor: PropTypes.string,
	gridItems: PropTypes.array.isRequired,
	heading: PropTypes.string,
	buttons: PropTypes.array
};

export default IconGrid;
