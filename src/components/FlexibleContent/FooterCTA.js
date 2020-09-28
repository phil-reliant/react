import React from "react";
import PropTypes from "prop-types";
import Button from '../Button';
import RightCircuits from '../../assets/images/circuit-lines-right.png';

const FooterCTA = props => {
	const {
		items,
		sectionTitle
	} = props;
	// console.log(props);
	const headers = items.map((item, index) => {
		return (
			<h6 key={`cell-h-${index}`}
				className={`header-cell hd-${index}`}>{item.title}</h6>
		);
	})

	const bodies = items.map((item, index) => {
		return (
			<div key={`body-cell-${index}`}
				className={`body-cell bd-${index}`}>
			<p key={`cell-p-${index}`}
				>{item.bodyText}</p>
				{item.buttons ?
					<Button
					buttons={item.buttons}
					alignment={item.buttonAlignment}
					type={item.buttonType}
					/>
				:
				null
				}

			</div>
		);
	})

	const variation = items.length;

	return (
		<div className={`footer-cta bg-img-container`}>
			<img className={`bg-img`}
				src={RightCircuits}
				alt="Circuit board"/>
			{
				sectionTitle ?
					<div className="container title-row">
						<div className="row">
							<div className="col-12">
								<h4>{sectionTitle}</h4>
							</div>
						</div>
					</div>
					:
					null
			}
			<div className="container footer-cta__three-up-section">
				<div className="row">
					<div className={`col-12 footer-cta__three-up-section__container --variation-${variation}`}>
						{headers}
						{bodies}
					</div>
				</div>
				{
					props.buttons && props.buttons.length > 0 ?
						<div className="row footer-cta__three-up-section__module-ctas">
							<div className="col-12">
								<Button
									buttons={props.buttons}
									alignment={props.buttonAlignment}
								/>
							</div>
						</div>
						:
						null
				}
			</div>
		</div>
	);
};

FooterCTA.propTypes = {
	items: PropTypes.array.isRequired,
	sectionTitle: PropTypes.string,

};


export default FooterCTA;
