import React, { useEffect } from "react";
import PropTypes from "prop-types";
import gsap from 'gsap';
import { useInView } from 'react-intersection-observer';

const StatBlock = props => {
	const {
		sectionTitle,
		stat1Number,
		stat1Unit,
		stat1Description,
		stat2Number,
		stat2Unit,
		stat2Description,
		stat3Number,
		stat3Unit,
		stat3Description,
	} = props;
	const CountUpAnimDuration = 0.75; // how long (in seconds) the count up animation takes (once on screen)

	// using react-intersection-observer to tell when a field is on screen (is tagged with ref={scrollRef})
	const [scrollRef, inView] = useInView({
		threshold: 0,
		triggerOnce: true
	})

	useEffect(() => {
		const stats = document.querySelectorAll('.stat-block__stat-column__data__number');

		stats.forEach((stat, index) => {
			const maxVal = stat.getAttribute('data-count');
			const isDecimal = (maxVal % 1) !== 0;

			// console.log(`decimalNumber: ${isDecimal}, maxVal: ${maxVal}`);
			const anim = gsap.to((stat), {
				duration: CountUpAnimDuration, // how long the animation takes to run
				onUpdate: () => {
					const animProgress = anim.progress();
					const rawValueCalc = animProgress * maxVal;
					const roundedToTenth = Math.round(rawValueCalc * 10) / 10;
					const roundedToWhole = Math.round(animProgress * maxVal);
					// console.log(`animProgress: ${animProgress}, maxVal: ${maxVal}, raw: ${rawValueCalc}, roundedToTenth: ${roundedToTenth}, roundedToWhole: ${roundedToWhole}`);
					stat.textContent = isDecimal ? roundedToTenth : roundedToWhole;
				}
			});
		});
	}, [inView]);

	return (
		<div className={`stat-block`}>
			{sectionTitle ?
				<div className="container">
					<div className="row">
						<div className="col-12">
							<h4>{sectionTitle}</h4>
						</div>
					</div>
				</div> : null}

			<div className="container">
				<div className="row" ref={scrollRef}>
					<div className="stat-block__stat-column col-lg-4 col-md-12">
						<p className="stat-block__stat-column__data">
							<span className="stat-block__stat-column__data__number"
								data-count={stat1Number}></span>
							<span className="stat-block__stat-column__data__unit">{stat1Unit}</span>
						</p>
						<p className="stat-block__stat-column__description">{stat1Description}</p>
					</div>
					<div className="stat-block__stat-column col-lg-4 col-md-12">
						<p className="stat-block__stat-column__data">
							<span className="stat-block__stat-column__data__number"
								data-count={stat2Number}></span>
							<span className="stat-block__stat-column__data__unit">{stat2Unit}</span>
						</p>
						<p className="stat-block__stat-column__description">{stat2Description}</p>
					</div>
					<div className="stat-block__stat-column col-lg-4 col-md-12">
						<p className="stat-block__stat-column__data">
							<span className="stat-block__stat-column__data__number"
								data-count={stat3Number}></span>
							<span className="stat-block__stat-column__data__unit">{stat3Unit}</span>
						</p>
						<p className="stat-block__stat-column__description">{stat3Description}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

StatBlock.propTypes = {
	backgroundColor: PropTypes.string,
	sectionTitle: PropTypes.string,
	stat1Number: PropTypes.number,
	stat1Unit: PropTypes.string,
	stat1Description: PropTypes.string,
	stat2Number: PropTypes.number,
	stat2Unit: PropTypes.string,
	stat2Description: PropTypes.string,
	stat3Number: PropTypes.number,
	stat3Unit: PropTypes.string,
	stat3Description: PropTypes.string
};

export default StatBlock;
