import React from "react";
import CallIcon from '../../assets/svgs/call-cta.js';
import EmailIcon from '../../assets/svgs/email-icon.js';
import OfficeIcon from '../../assets/svgs/office-icon.js';




const ContactUsCtas = ({ title }) => {
	const baseClass = "contact-us-cta";
	return (
		<>
			{ title ?
				<div className="contact-us-cta__heading container">
					<div className="row">
						<div className="col-12">
							<h4>{title}</h4>
						</div>
					</div>
				</div>
			: null}
			<div className={`container ${baseClass}`}>
				<div className={`row ${baseClass}__row`}>

								<div className={`col-12 col-md-4 ${baseClass}__row__item`}>
										<div className={`${baseClass}__row__item__inner`}>
											<div className={`${baseClass}__row__item__inner__icon`}>
												<CallIcon />
											</div>
											<div className={`${baseClass}__row__item__inner__heading`}>
												<h6 className="h8">Call Us</h6>
											</div>
											<div className={`${baseClass}__row__item__inner__body`}>
											Call us toll free at <a href="tel:18772270828">1-877-227-0828 </a> or locally at <a href="tel:4045514534">404-551-4534</a>
											</div>
											{/* <div className={`${baseClass}__row__item__inner__arrow-btn`}>
												<div className="buttons --align-center">
													<div className="button --no-text">
														<span></span>
															<div className={`arrow-icon`}>
															<ArrowNoStem />
														</div>
														
													</div>
												</div>
											</div> */}
										</div>
								</div>
								<div className={`col-12 col-md-4 ${baseClass}__row__item`}>	
										<div className={`${baseClass}__row__item__inner`}>
											<div className={`${baseClass}__row__item__inner__icon`}>
											<EmailIcon />
											</div>
											<div className={`${baseClass}__row__item__inner__heading`}>
												<h6 className="h8">Email Us</h6>
											</div>
											<div className={`${baseClass}__row__item__inner__body`}>
											<a href="mailto: sales@reliant-technology.com">	Sales@Reliant-Technology.com</a> <br />
											<a href="mailto: support@reliant-technology.com">Support@Reliant-Technology.com</a>
											</div>
											{/* <div className={`${baseClass}__row__item__inner__arrow-btn`}>
												<div className="buttons --align-center">
													<div className="button --no-text">
														<span></span>
															<div className={`arrow-icon`}>
															<ArrowNoStem />
														</div>
														
													</div>
												</div>
											</div> */}
										</div>
								</div>
								<div className={`col-12 col-md-4 ${baseClass}__row__item`}>
									<a href="http://maps.google.com/?q=1371 Southland Circle NW Atlanta, GA 30318" target="_blank" rel="noopener noreferrer">
										<div className={`${baseClass}__row__item__inner`}>
											<div className={`${baseClass}__row__item__inner__icon`}>
											<OfficeIcon />
											</div>
											<div className={`${baseClass}__row__item__inner__heading`}>
												<h6 className="h8">Our Office</h6>
											</div>
											<div className={`${baseClass}__row__item__inner__body`}>
											1371 Southland Circle NW
											<br />
											Atlanta, GA 30318
											</div>
											{/* <div className={`${baseClass}__row__item__inner__arrow-btn`}>
												<div className="buttons --align-center">
													<div className="button --no-text">
														<span></span>
															<div className={`arrow-icon`}>
															<ArrowNoStem />
														</div>
														
													</div>
												</div>
											</div> */}
										</div>
									</a>
								</div>
				</div>
			</div>
		</>
	)
}

export default ContactUsCtas;
