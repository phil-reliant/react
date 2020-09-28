import React from 'react';
import PropTypes from 'prop-types';
import GetMappedColor from '../../utils/IconColorMapper';
import Icon from '../Icon';
import { InternalOrExternalLink } from '../../utils/UrlUtils';

const SlideContainer = props => {
	const { optionalLink, children, className } = props;

	if (optionalLink) {
		const { url, target } = optionalLink;
		return (
			<InternalOrExternalLink url={url} className={className} target={target}>
				{children}
			</InternalOrExternalLink>
		);
	}

	return (
		<div className={className}>
			{children}
		</div>
	);
}

const IndustrySliderSlide = props => {
	const {
		industryName,
		icon,
		iconColor,
		optionalLink,
		activeSlide,
		slideIndex
	} = props;

	const activeClass = slideIndex === activeSlide ? `active` : ``;
	const firstClass = slideIndex === 0 ? 'first' : '';
	const haveHoverClass = optionalLink ? 'have-hover' : '';

	const mappedIconColor = GetMappedColor(iconColor);

	return (
		<SlideContainer
			optionalLink={optionalLink}
			className={`industry-slider__slide ${activeClass} ${firstClass} ${haveHoverClass}`}
		>
			<div className={`industry-slider__slide__inner`}>
				<h6 className={`h8`}>{industryName}</h6>
				<div className={`industry-slider__slide__icon`}>
					<Icon style={{color: mappedIconColor}} children={icon} fill={mappedIconColor} />
				</div>
			</div>
		</SlideContainer>
	)
}

IndustrySliderSlide.propTypes = {
	industryName: PropTypes.string.isRequired,
	optionalLink: PropTypes.object,
	activeSlide: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	]),
	slideIndex: PropTypes.number
}

export default IndustrySliderSlide;
