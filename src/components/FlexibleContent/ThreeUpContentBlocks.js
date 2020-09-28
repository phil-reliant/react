import React from "react";
import ArrowNoStem from '../../assets/svgs/arrow-no-stem.js';
import Button from '../Button';
import { InternalOrExternalLink } from '../../utils/UrlUtils';
import GetMappedColor from '../../utils/IconColorMapper';
import Icon from '../Icon';

const ThreeUpContentBlocks = ({ title, items, buttons, buttonAlignment }) => {
	const baseClass = "three-up-content-blocks";
	return (
		<>
			{ title ?
				<div className="three-up-content-blocks__heading container">
					<div className="row">
						<div className="col-12">
							<h4>{title}</h4>
						</div>
					</div>
				</div>
			: null}
			<div className={`container ${baseClass}`}>
				<div className={`row ${baseClass}__row`}>
					{
						items.map((item, index) => {
							const mappedIconColor = GetMappedColor(item.iconColor);
							const hoverClass = ( item.link )? 'has-link':'';
							return (
								<div key={`ci-${index}`}
									className={`col-12 col-md-4 ${baseClass}__row__item ${hoverClass}`}>
										<div className={`${baseClass}__row__item__inner`}>
											<div className={`${baseClass}__row__item__inner__icon`}>
												<Icon style={{color: mappedIconColor}} children={item.icon} fill={mappedIconColor} />
											</div>
											<div className={`${baseClass}__row__item__inner__heading`}>
												<h6 className="h8">{item.heading}</h6>
											</div>
											<div className={`${baseClass}__row__item__inner__body`}>
												{item.body}
											</div>
											{ item.link ?
												<InternalOrExternalLink url={item.link}>
													<div className={`${baseClass}__row__item__inner__arrow-btn`}>
														<div className="buttons --align-center">
															<div className="button --no-text">
																<span></span>
																	<div className={`arrow-icon`}>
																	<ArrowNoStem />
																</div>
															</div>
														</div>
													</div>
												</InternalOrExternalLink>
												: null
											}
										</div>
								</div>
							)
						})
					}
				</div>
			</div>
			<div className={`three-up-content-blocks__buttons container`}>
				<div className={`row`}>
					<div className={`col-12`}>
						{
							buttons ?
								<Button
									buttons={buttons}
									alignment={buttonAlignment}
								/>
								:
								null
						}
					</div>
				</div>
			</div>
		</>
	)
}

export default ThreeUpContentBlocks;
