import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import IndustrySliderSlide from './IndustrySliderSlide';
import ArrowNoStem from '../../assets/svgs/arrow-no-stem.js';
import PropTypes from 'prop-types';

const IndustrySlider = props => {
	const {
		industries,
		sectionTitle
	} = props;

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		variableWidth: true,
		arrows: false
	};

	const [activeSlide, setActiveSlide] = useState(0);

	const sliderRef = useRef(null);

	const prev = () => {
		sliderRef.current.slickPrev();
	}

	const next = () => {
		sliderRef.current.slickNext();
	}

	const slides = industries.map((industry, index) => {
		return (
			<IndustrySliderSlide
				key={`slide-${index}`}
				activeSlide={activeSlide}
				slideIndex={index}
				{...industry}
			/>
		);
	});

	const beforeSlideChanged = (currentSlide, nextSlide) => {
		setActiveSlide(nextSlide);
	}

	const baseClass = `layout-industry-slider`;
	return (
		<div className={`${baseClass}`}>
			<div className={`${baseClass}__inner container`}>
				<div className={`row`}>
					<div className={`col-12 ${baseClass}__title-container`}>
						{ sectionTitle ? (
							<h5>{sectionTitle}</h5>
						) : null }
					</div>
				</div>
			</div>
			<div className={`${baseClass}__slick-wrapper `}>
				<div className={`row`}>
					<div className={`col-12`}>
						<Slider
							{...settings}
							ref={sliderRef}
							beforeChange={beforeSlideChanged}>
							{slides}
						</Slider>
					</div>
				</div>
			</div>
			<div className={`container --desktop-only`}>
				<div className={`row`}>
					<div className={`col-12 ${baseClass}__arrows`}>
						<div className={`arrows`}>
							<span
								className={`arrow arrow-prev`}
								onClick={prev}>
								<ArrowNoStem />
							</span>
							<span
								className={`arrow arrow-next` }
								onClick={next} >
								<ArrowNoStem />
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

IndustrySlider.propTypes = {
	industries: PropTypes.array.isRequired,
	sectionTitle: PropTypes.string
}

export default IndustrySlider;
