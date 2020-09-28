import React, { useRef } from 'react';
import PropTypes from "prop-types";
import ArrowNoStem from '../../assets/svgs/arrow-no-stem';
import Slider from 'react-slick';
import { UnescapeText } from '../../utils/TextHelpers';

const CaseStudyFeaturedSlider = ({ caseStudies }) => {
	const slider = useRef(null);
	const baseClass = `case-study-featured-slider`;

	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		variableWidth: true,
		arrows: false
	}

	const renderSlides = () => {

		if (!caseStudies || !caseStudies.length) return ``;

		const slides = caseStudies.map((caseStudy, index) => {
			var classes = `${baseClass}__slide`;
			if (index === 0) {
				classes = `${baseClass}__slide first`;
			}
			return (
				<div key={`case-study-slide-${index}`} className={classes}>
					<div className={`${baseClass}__slide__inner`}>
						<div className={`${baseClass}__slide__inner-content-wrap`}>
							<div className={`${baseClass}__slide__inner-content-wrap-heading`}>Case Study</div>
							<p className={`${baseClass}__slide__inner-content-wrap-title`}>{UnescapeText(caseStudy.title)}</p>
							{
								(caseStudy.single_resource && caseStudy.single_resource.resourceDownload && caseStudy.single_resource.resourceDownload.mediaItemUrl) ?
									<div className="buttons --align-center">
										<a className="button --standard arrow-icon"
											href={`${caseStudy.single_resource.resourceDownload.mediaItemUrl}`}
											target="_blank" rel="noopener noreferrer">
											<span>Read the Case Study</span>
											<div className={`arrow-icon`}>
												<ArrowNoStem />
											</div>
										</a>
									</div>
									:
									<></>
							}
						</div>
					</div>
				</div>
			)
		});

		return (
			<div className={`${baseClass}__slides`}>
				<Slider
					ref={slider}
					{...settings}
				>
					{slides}
				</Slider>
			</div>
		)
	}

	return (
		<div className={baseClass}>
			<div className={`${baseClass}__slick-wrapper container`}>
				<div className={`row`}>
					<div className={`col-12`}>
						{renderSlides()}
					</div>
				</div>
			</div>
		</div>

	)
};

CaseStudyFeaturedSlider.propTypes = {
	caseStudies: PropTypes.array
};


export default CaseStudyFeaturedSlider;
