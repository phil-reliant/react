import React from 'react';
import Button from '../Button';

const LeftRightBulleted = props => {
	const baseClass = `layout-left-right-bulleted`;

	const {
		heading,
		bodyText,
		bullets,
		buttons,
		buttonAlignment,
		buttonType,
		image
	} = props;

	const bulletList = bullets.map((bullet, index) => (
		<div key={`bullet-${index}`}
			className="bulleted-entry">
			<span>{bullet.subhead}</span>
			<ul>
				<li
					key={`bullet-${index}`}
					className={`${baseClass}__bullet`}
				>
					{bullet.bullet}
				</li>
			</ul>
		</div>
	));

	return (
		<div className={baseClass}>
			<div className={`${baseClass}__inner container`}>
				<div className={`row`}>
					<div className={`col-lg-7 ${baseClass}__content-container`}>
						<div className={`${baseClass}__content`}>
							<h4>{heading}</h4>
							<p className={`--bold --small`}>{bodyText}</p>
							<div className={`${baseClass}__list`}>
								{bulletList}
							</div>
							<Button
								buttons={buttons}
								alignment={buttonAlignment}
								type={buttonType}
							/>
						</div>
					</div>
					<div
						className={
							`${baseClass}__image-container
							col-lg-5`
						}
					>
						<div className="image-container">
							<img
							srcSet={image.srcSet}
							src={image.mediaItemUrl}
							alt={image.altText || image.title}
							className={`${baseClass}__image`}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LeftRightBulleted;
