import React from "react";
import ArrowNoStem from '../../assets/svgs/arrow-no-stem';
import { InternalOrExternalLink } from '../../utils/UrlUtils';
import { UnescapeText } from '../../utils/TextHelpers';

const Button = props => {
	const { buttons, alignment } = props;

	if (!buttons || !buttons.length) return ``;

	const buttonEls = buttons.map((btn, index) => {
		const { displayType, link, buttonType } = btn;
		const { title, target, url } = link;

		let displayClass = ``;
		if (displayType === 'mobile') {
			displayClass = `mobile-only`;
		} else if (displayType === 'desktop') {
			displayClass = `desktop-only`;
		}

		return (
			<InternalOrExternalLink url={url}
				target={target}
				className={`button ${displayClass} --${buttonType}`}
				key={`button-${index}`}
			>
				<span>{UnescapeText(title)}</span>
				<div className={`arrow-icon`}>
					<ArrowNoStem />
				</div>
			</InternalOrExternalLink>
		);
	});

	return (
		<div className={`buttons --align-${alignment}`}>
			{buttonEls}
		</div>
	)
};

export default Button;
