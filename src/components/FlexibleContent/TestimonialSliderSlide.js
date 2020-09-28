import React from 'react';
import PropTypes from 'prop-types';
import { UnescapeText } from '../../utils/TextHelpers';

const TestimonialSliderSlide = props => {
	const { title: name, singleTestimonialFields, featuredImage } = props;
	const { title, quote } = singleTestimonialFields;

	const imgClass = !featuredImage ? `no-img` : ``;

	return (
		<div className={`testimonial-slide`}>
			<div className={`testimonial-slide__inner ${imgClass}`}>
				{
					featuredImage ? (
						<div className={`testimonial-slide__photo`}>
							<img
								srcSet={featuredImage.srcSet}
								src={featuredImage.mediaItemUrl}
								alt={featuredImage.altText || featuredImage.title }
								className={`img-responsive`}
							/>
						</div>
					) : null
				}
				<div className={`testimonial-slide__content`}>
					<blockquote>
						<span className={`qt-mark left`}>&ldquo;</span>
						{quote}
						<span className={`qt-mark right`}>&rdquo;</span>
					</blockquote>
					<div className={`attribution`}>
						<span className={`attr__name`}>
							{UnescapeText(name)},
						</span>
						<span className={`attr__title`}>
							{title}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

TestimonialSliderSlide.propTypes = {
	title: PropTypes.string,
	singleTestimonialFields: PropTypes.objectOf(PropTypes.string).isRequired,
	featuredImage: PropTypes.objectOf(PropTypes.string)
}

export default TestimonialSliderSlide;
