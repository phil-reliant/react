import React, { useState, useEffect } from "react";
import PhoneDialButton from './PhoneDialButton';
import ArrowInCircle from '../../assets/svgs/arrow-in-circle';
import DetailForm from './DetailForm';
import InterestSelectionForm from "./InterestSelectionForm";

const StickyDrawerBottom = ({
	showFormArea,
	interestDefinitions, checkedInterests, handleCheckedInterestsChanged,
	fieldDefinitions, fieldValues, invalidFields,
	submitInProgress, successfullySubmitted,
	handleFieldValueChanged,
	handleSubmit }) =>
{
	const ARROW_UP = 0;
	const ARROW_DOWN = 1;

	const [isExpanded, setIsExpanded] = useState(false);
	const [arrowDirection, setArrowDirection] = useState(ARROW_UP);
	const [scrollPosAtOpen, setScrollPosAtOpen] = useState(0);

	const openClicked = () => {
		// if we aren't currently open, then keep track of the scroll position when it was opened, so we can
		// return to this when closed
		if (!isExpanded) {
			setScrollPosAtOpen(document.documentElement.scrollTop);
		}

		setIsExpanded(!isExpanded);
	}

	// fired when the drawer expands or collapses
	useEffect(() => {
		if (!showFormArea) {
			return;
		}

		if (isExpanded) {
			setArrowDirection(ARROW_DOWN);

			if (successfullySubmitted) {
				document.querySelector('.sticky-drawer-bottom__drawer-contents__success-panel').classList.remove('hide');
				document.querySelector('.sticky-drawer-bottom__drawer-contents__first-panel').classList.add('hide');
				document.querySelector('.sticky-drawer-bottom__drawer-contents__second-panel').classList.add('hide');
				document.querySelector('.sticky-drawer-bottom').classList.remove('open');
				document.querySelector('.sticky-drawer-bottom').classList.add('open-short');
			} else {
				document.querySelector('.sticky-drawer-bottom__drawer-contents__success-panel').classList.add('hide');
				document.querySelector('.sticky-drawer-bottom__drawer-contents__first-panel').classList.remove('hide');
				document.querySelector('.sticky-drawer-bottom__drawer-contents__second-panel').classList.remove('hide');
				document.querySelector('.sticky-drawer-bottom').classList.remove('open-short');
				document.querySelector('.sticky-drawer-bottom').classList.add('open');
				document.querySelector('.sticky-drawer-bottom__drawer-heading').scrollIntoView();
			}

			document.querySelector('.sticky-drawer-bottom__drawer-contents').classList.remove('collapsed');
			document.querySelector('.sticky-drawer-bottom__drawer-contents').classList.add('expanded');
		}
		else {
			setArrowDirection(ARROW_UP);
			document.querySelector('.sticky-drawer-bottom').classList.remove('open');
			document.querySelector('.sticky-drawer-bottom').classList.remove('open-short');
			document.querySelector('.sticky-drawer-bottom__drawer-contents').classList.remove('expanded');
			document.querySelector('.sticky-drawer-bottom__drawer-contents').classList.add('collapsed');
			document.querySelector('.sticky-drawer-bottom__drawer-contents__success-panel').classList.add('hide');
			document.querySelector('.sticky-drawer-bottom__drawer-contents__first-panel').classList.add('hide');
			document.querySelector('.sticky-drawer-bottom__drawer-contents__second-panel').classList.add('hide');
		}
	}, [showFormArea, isExpanded, scrollPosAtOpen, successfullySubmitted]);

	return (
		showFormArea ?
			// Show the full drawer and chat icon
			<div className="sticky-drawer-bottom">
				<div className="sticky-drawer-bottom__drawer-heading" onClick={openClicked}>
					<button className={`link-button sticky-drawer-bottom__drawer-heading__expand-button`}>
						<div className={`${arrowDirection === ARROW_UP ? 'arrow-up' : 'arrow-down'}`}>
							<ArrowInCircle />
						</div>
					</button>
					<h6 className="sticky-drawer-bottom__drawer-heading__h4"
						onClick={openClicked}>
							{ successfullySubmitted ? 'Thanks for contacting us.' : 'Connect with an expert to get started.' }
					</h6>

					{/* NOTE:: there is a duplicate phone button below (for when no drawer is shown) */}
					<PhoneDialButton extraCSSClasses={`sticky-drawer-bottom__drawer-heading__phone-button`} />
				</div>
				<div className="sticky-drawer-bottom__drawer-contents collapsed">
					<div className="sticky-drawer-bottom__drawer-contents__success-panel">
						<p className="subtext">A team member will be in touch shortly.</p>
					</div>
					<div className="sticky-drawer-bottom__drawer-contents__first-panel">
						<InterestSelectionForm
							interestDefinitions={interestDefinitions}
							checkedInterests={checkedInterests}
							handleCheckedInterestsChanged={handleCheckedInterestsChanged} />
					</div>
					<div className="sticky-drawer-bottom__drawer-contents__second-panel">
						<DetailForm
							fieldDefinitions={fieldDefinitions}
							fieldValues={fieldValues}
							invalidFields={invalidFields}
							handleFieldValueChanged={handleFieldValueChanged}
							submitInProgress={submitInProgress}
							handleSubmit={handleSubmit} />
					</div>
				</div>
			</div>
		:
		// Just show the floating phone icon
		<div className="floating-icon-area">
			{/* NOTE:: there is a duplicate phone button above (for when drawer is shown) */}
			<PhoneDialButton extraCSSClasses={`floating-icon-area__phone-button`} />
		</div>
	);
}

export default StickyDrawerBottom;
