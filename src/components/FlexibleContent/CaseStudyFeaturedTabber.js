import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ArrowNoStem from '../../assets/svgs/arrow-no-stem';
import PlusSignBlack from '../../assets/images/plus-sign-black.svg';
import PlusSignWhite from '../../assets/images/plus-sign-white.svg';
import {TruncateText, UnescapeText } from '../../utils/TextHelpers';
import CircuitsLeftImage from '../../assets/images/circuits-left.png';
import Variables from '../../assets/scss/config/_variables.scss';

const CaseStudyFeaturedTabber = ({ backgroundColor, caseStudies }) => {

	const [selectedCaseStudyIndex, setSelectedCaseStudyIndex] = useState(0);
	const [selectedCaseStudyQuote, setSelectedCaseStudyQuote] = useState("");
	const [selectedCaseStudyLink, setSelectedCaseStudyLink] = useState("");

	const baseClass = `case-study-featured-tabber`;

	useEffect(() => {
		if (caseStudies && caseStudies.length > 0) {
			selectCaseStudy(caseStudies[0], 0);
		}
	}, [caseStudies])

	// This method fades out the detail area, updates the data shown there, and
	// fades it back in. The index is all that the left rail (listing) keys off
	// of, so it is all that is instantly updated so as to immediately show
	// a selection change, while the #fadeArea is faded out and back in
	const selectCaseStudy = (caseStudy, index) => {
		setSelectedCaseStudyIndex(index);

		document.querySelector('#fadeArea').classList.remove('fade-in');
		document.querySelector('#fadeArea').classList.add('fade-out');

		setTimeout(function () {
			setSelectedCaseStudyQuote(caseStudy.case_study_fields.quote);

			if (caseStudy.single_resource && caseStudy.single_resource.resourceDownload && caseStudy.single_resource.resourceDownload.mediaItemUrl) {
				setSelectedCaseStudyLink(caseStudy.single_resource.resourceDownload.mediaItemUrl);
			} else {
				console.error("CaseStudyFeaturedTabber was unable to get the PDF download URL!");
				setSelectedCaseStudyLink("");
			}

			document.querySelector('#fadeArea').classList.remove('fade-out');
			document.querySelector('#fadeArea').classList.add('fade-in');
		}, Variables.defaultDuration);
	}

	const renderListing = caseStudies.map((caseStudy, index) => {
		var itemClasses = `${baseClass}__listing-column__item`;
		var plusIcon = PlusSignWhite;
		if (selectedCaseStudyIndex === index) {
			itemClasses = `${baseClass}__listing-column__item selected`;
			plusIcon = PlusSignBlack;
		}

		return (
			<div key={index}
				className={itemClasses}
				onClick={() => selectCaseStudy(caseStudy, index)}>
				<div className={`${baseClass}__listing-column__item-text`}>
					{UnescapeText(caseStudy.title)}
				</div>
				<img className={`${baseClass}__listing-column__item-plus-sign`}
					src={plusIcon}
					alt="View Details" />
			</div>
		);
	});

	return (
		<div className={`case-study-featured-tabber container`}>
			<img className={`bg-img`}
				src={CircuitsLeftImage}
				alt="Circuit board"/>
			<div className={`case-study-featured-tabber__row row  bg-${backgroundColor}`}>
				<div className={`bg-${backgroundColor}`}></div>

				<div className={`${baseClass}__listing-column col-6`}>
					{renderListing}
				</div>
				<div className={`${baseClass}__detail-column col-6`}>
					<div id="fadeArea" className={`${baseClass}__detail-column__fade-area`}>
						<div className={`${baseClass}__detail-column__fade-area__title`}>Case Study</div>
						<p className={`${baseClass}__detail-column__fade-area__quote`}>"{TruncateText(selectedCaseStudyQuote, 150)}"</p>

						<div className="buttons --align-center">
							<a className="button --standard arrow-icon"
								href={`${selectedCaseStudyLink}`}
								target="_blank" rel="noopener noreferrer">
								<span>Read the Case Study</span>
								<div className={`arrow-icon`}>
									<ArrowNoStem />
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
};

CaseStudyFeaturedTabber.propTypes = {
	backgroundColor: PropTypes.string,
	caseStudies: PropTypes.array
};

export default CaseStudyFeaturedTabber;
