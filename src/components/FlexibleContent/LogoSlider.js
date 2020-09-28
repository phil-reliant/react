import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import ArrowNoStem from '../../assets/svgs/arrow-no-stem.js';

const LogoSlider = props => {
	const slider = useRef(null);
	const { logos } = props;
	const baseClass = `layout-logo-slider`;

	let swiping = false;

	let slidesToShow = 5;
	let slidesToShow768 = 2;
	let slidesToShow992 = 3;
	if (logos) {
		if (logos.length < slidesToShow) {
			slidesToShow = logos.length;
		}
		if (logos.length < slidesToShow768) {
			slidesToShow768 = logos.length;
		}
		if (logos.length < slidesToShow992) {
			slidesToShow992 = logos.length;
		}
	}

	const GetWindowSlideCount = () => {
		// console.log('width', window.innerWidth);
		let slideCount = slidesToShow;
		if (window.innerWidth < 768) {
			slideCount = slidesToShow768;
		} else if (window.innerWidth < 992) {
			slideCount = slidesToShow992;
		}
		// console.log('GetWindowSlideCount', slideCount);
		return slideCount;
	}

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: slidesToShow,
		slidesToScroll: 1,
		arrows: false,
		variableWidth: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: slidesToShow768
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: slidesToShow992
				}
			}
		]
	}

	const next = () => {
		slider.current.slickNext();
	}

	const prev = () => {
		slider.current.slickPrev();
	}

	// NOTE:: to avoid click happenign when the user lets up at the end of a swipe, we need to make sure they aren't in the process of a swipe
	// ref: https://github.com/akiran/react-slick/issues/604#issuecomment-526543085
	const handleMouseDown = event => {
		event.preventDefault();
	};
	const handleMouseUp = () => {
		swiping = slider.current.innerSlider.state.swiping;
	};
	const handleClick = (event, logoItem) => {
		if (swiping) {
			event.preventDefault();
		} else {
			// not all slides are clickable, so only launch the link if it is valid
			if (logoItem && logoItem.link) {
				window.open(logoItem.link, "_blank")
			}
		}
	};

	const renderSlides = () => {
		if (!logos.length) return ``;

		const slides = logos.map((logoItem, index) => {
			const { logo } = logoItem;

			return (
				<div key={`logo-slide-${index}`} className={`${baseClass}__slide`}>
					<div className={`${baseClass}__slide__inner`}>
						<img
							className={`${logoItem.link ? 'clickable' : ''}`}
							src={logo.mediaItemUrl}
							srcSet={logo.srcSet}
							alt={logo.altText || logo.title}
							onClickCapture={(e) => handleClick(e, logoItem)}
							onMouseUpCapture={handleMouseUp}
							onMouseDownCapture={handleMouseDown} />
					</div>
				</div>
			)
		});

		// console.log('render - getwindowslidecount', GetWindowSlideCount())
		return (
			<div className={`${baseClass}__slides`}>
				<Slider
					ref={slider}
					{...settings}
				>
					{slides}
				</Slider>
				<div className={`${baseClass}__arrows`}>
					{
						(slides && slides.length > GetWindowSlideCount()) ?
							<>
								<button
									onClick={prev}
									className={`arrow-left`}
								>
									<div className={`arrow-icon`}>
										<ArrowNoStem />
									</div>
								</button>
								<button
									onClick={next}
									className={`arrow-right`}
								>
									<div className={`arrow-icon`}>
										<ArrowNoStem />
									</div>
								</button>
							</>
							:
							<></>
					}
				</div>
			</div>
		)
	}

	let title = ``;
	if (props.title) {
		title = (
			<h3 className={`${baseClass}__title`}>{props.title}</h3>
		);
	}

	return (
		<div className={baseClass}>
			<div className={`container`}>
				<div className={`row`}>
					<div className={`col-12 full-bleed-right-mobile-col`}>
						<div className={`${baseClass}__inner`}>
							{title}
							{renderSlides()}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

LogoSlider.propTypes = {
	title: PropTypes.string,
	logos: PropTypes.array.isRequired
};

export default LogoSlider;
