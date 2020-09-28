import React, { useRef, createRef, useEffect } from 'react';
import gsap from 'gsap';

const TextFlipper = props => {
	const { textItems } = props;
	const textRef = useRef([...Array(textItems.length)].map(() => createRef()));
	const tlRef = useRef(gsap.timeline({ repeat: -1 }));

	useEffect(() => {
		tlRef.current.progress(0);

		const animateOn = {
			duration: 0.25,
			y: 0,
			opacity: 1,
			ease: 'Power2.easeOut'
		};

		const animateOff = {
			duration: 0.25,
			y: '-50px',
			opacity: 0,
			ease: 'Power2.easeOut'
		};

		textItems.forEach((item, index) => {
			const word = textRef.current[index].current;

			const delay = '+=2';
			const nextDelay = !index ? '-=0' : '+=0.05';

			const itemTl = gsap.timeline();

			itemTl.to(word, animateOn, nextDelay)
				.to(word, animateOff, delay)
				.set(word, { clearProps: 'all' });

			tlRef.current.add(itemTl, nextDelay);
		});
	})
	
	if (!textItems || !textItems.length) return ``;
	
	const textEls = textItems.map((text, index) => {
		const { word } = text;

		return (
			<div
				key={`flipper-${index}`}
				className={`text-flipper`}
				data-index={index}
				ref={textRef.current[index]}
			>
				<span
					className={`text-flipper__word`}
				>
					{word}
				</span>
			</div>
		);
	});


	return (
		<div className={`text-flipper-container`}>
			{textEls}
		</div>
	);
}

export default TextFlipper;