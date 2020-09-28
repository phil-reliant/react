import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import TestimonialSliderSlide from './TestimonialSliderSlide';
import ArrowNoStem from '../../assets/svgs/arrow-no-stem';

const TestimonialSlider = props => {
	const sliderRef = useRef(null);

	const baseClass = `layout-testimonial-slider`;
	const { testimonials } = props;
	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		adaptiveHeight: true
	};

	const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
	const [nextBtnEnabled, setNextBtnEnabled] = useState(true);

	const prev = () => {
		sliderRef.current.slickPrev();
	}

	const next = () => {
		sliderRef.current.slickNext();
	}

	const slides = testimonials.map((testimonial, index) => (
		<TestimonialSliderSlide
			key={`testimonial-slide-${index}`}
			{...testimonial}
		/>
	));

	// enable/disable the prev/next arrows based on where we are in the slides
	const beforeSlideChanged = (currentSlide, nextSlide) => {
		setPrevBtnEnabled(nextSlide > 0);
		setNextBtnEnabled(nextSlide < (testimonials.length - 1));
	}

	return (
		<div className={baseClass}>
			<div className={`container ${baseClass}__inner`}>
				<Slider
					{...settings}
					ref={sliderRef}
					beforeChange={beforeSlideChanged}>
					{slides}
				</Slider>
				{ (testimonials && testimonials.length > 1) ?
					<div className={`arrows`}>
						<span
							onClick={prev}
							className={`arrow arrow-prev ${prevBtnEnabled ? '' : 'disabled'}`}>
							<ArrowNoStem />
						</span>
						<span
							onClick={next}
							className={`arrow arrow-next ${nextBtnEnabled ? '' : 'disabled'}`}>
							<ArrowNoStem />
						</span>
					</div>
					:
					<></>
				}
			</div>
		</div>
	)
}

TestimonialSlider.propTypes = {
	testimonials: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default TestimonialSlider;
