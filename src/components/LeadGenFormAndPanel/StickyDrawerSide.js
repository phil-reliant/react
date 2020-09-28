import React, { useState, useEffect } from "react";
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import ArrowInCircle from '../../assets/svgs/arrow-in-circle';
import ChatButton from '../../assets/images/chat-button.svg';
import DetailForm from './DetailForm';
import CircleCloseButton from '../../assets/svgs/circle-close-button';
import PhoneSlideOutButton from './PhoneSlideOutButton';
import StickyFormInterestSelection from './InterestSelectionForm';
import Variables from '../../assets/scss/config/_variables.scss';

const StickyDrawerSide = ({
	showFormArea,
	interestDefinitions, checkedInterests, handleCheckedInterestsChanged,
	fieldDefinitions, fieldValues, invalidFields,
	submitInProgress, successfullySubmitted,
	handleFieldValueChanged,
	handleSubmit }) =>
{

	// panelShown constants
	const PANEL_COLLAPSED = 0;
	const PANEL_FIRST = 1; // interest selection, or confirmation (if already completed)
	const PANEL_SECOND = 2; // form to fill

	const [panelShown, setPanelShown] = useState(PANEL_COLLAPSED);
	const [hideFromScroll, setHideFromScroll] = useState(false);
	const [closeButtonMustBeHidden, setCloseButtonMustBeHidden] = useState(false); // used for slide-out area to ensure the form can't be closed there

	const hasInterestsSelected = (checkedInterestsCollection) => {
		for (var item in checkedInterestsCollection) {
			if (checkedInterestsCollection[item] === true) {
				return true;
			}
		}
		return false;
	}

	// expand (or collapse) the first panel, and swap the content that is shown
	const expandCollapseFirstPanel = (expand) => {
		if (expand) {
			document.querySelector('.sticky-drawer-side__right-rail__middle-container__inner__first-panel').classList.remove('collapsed');
			document.querySelector('.sticky-drawer-side__right-rail__middle-container__inner__first-panel').classList.add('expanded');
			document.querySelector('.sticky-drawer-side__right-rail__middle-container__inner__first-panel-collapsed').classList.add('hide');
			document.querySelector('.sticky-drawer-side__right-rail__middle-container__inner__first-panel-expanded').classList.remove('hide');
			document.querySelector('.sticky-drawer-side__right-rail__middle-container__inner__first-panel').classList.add('active-panel');
		} else {
			document.querySelector('.sticky-drawer-side__right-rail__middle-container__inner__first-panel').classList.add('collapsed');
			document.querySelector('.sticky-drawer-side__right-rail__middle-container__inner__first-panel').classList.remove('expanded');
			document.querySelector('.sticky-drawer-side__right-rail__middle-container__inner__first-panel-collapsed').classList.remove('hide');
			document.querySelector('.sticky-drawer-side__right-rail__middle-container__inner__first-panel-expanded').classList.add('hide');
			document.querySelector('.sticky-drawer-side__right-rail__middle-container__inner__second-panel').classList.remove('active-panel');
		}
	}

	const showHideSecondPanel = (show) => {
		if (show) {
			document.querySelector('.sticky-drawer-side__right-rail__middle-container__inner__second-panel').classList.remove('collapsed');
			document.querySelector('.sticky-drawer-side__right-rail__middle-container__inner__second-panel').classList.add('expanded');
			document.querySelector('.sticky-drawer-side__right-rail__middle-container__inner__first-panel').classList.remove('active-panel');
			document.querySelector('.sticky-drawer-side__right-rail__middle-container__inner__second-panel').classList.add('active-panel');
		} else {
			document.querySelector('.sticky-drawer-side__right-rail__middle-container__inner__second-panel').classList.add('collapsed');
			document.querySelector('.sticky-drawer-side__right-rail__middle-container__inner__second-panel').classList.remove('expanded');
			document.querySelector('.sticky-drawer-side__right-rail__middle-container__inner__first-panel').classList.add('active-panel');
			document.querySelector('.sticky-drawer-side__right-rail__middle-container__inner__second-panel').classList.remove('active-panel');
		}
	}

	const showHidePageBlocker = (show) => {
		if (show) {
			document.querySelector('.sticky-drawer-side__page-blocker').classList.add('visible');
		} else {
			document.querySelector('.sticky-drawer-side__page-blocker').classList.remove('visible');
		}
	}

	const openButtonClicked = () => {
		// show the first panel
		expandCollapseFirstPanel(true);
		setPanelShown(PANEL_FIRST);

		// if they already have interests selected, then jump straight to panel 2
		if (hasInterestsSelected(checkedInterests)) {
			showHideSecondPanel(true);
			setPanelShown(PANEL_SECOND);
		}

		showHidePageBlocker(true);
	}

	const closeDrawerRequested = () => {
		// console.log('closeDrawerRequested');
		// if showing first panel expanded, then collapse it
		if (panelShown > 1) {
			showHideSecondPanel(false);
		}

		expandCollapseFirstPanel(false);
		setPanelShown(PANEL_COLLAPSED);
		showHidePageBlocker(false);
	}

	const chatButtonClicked = () => {
		// TODO:: handle chat button being clicked
		alert("Not yet implemented.");
	}

	// initial setup
	useEffect(() => {
		if (showFormArea) {
			expandCollapseFirstPanel(true);
			setPanelShown(PANEL_FIRST);
		}
	}, [showFormArea]);

	useEffect(() => {
		if (successfullySubmitted) {
			if (panelShown === PANEL_SECOND) {
				showHideSecondPanel(false);
				setPanelShown(PANEL_FIRST);
			}
		}
		else { // form not yet submitted
			// if showing first panel expanded, then show second panel if interests are selected
			if (panelShown === 1 && hasInterestsSelected(checkedInterests)) {
				showHideSecondPanel(true);
				setPanelShown(PANEL_SECOND);
			}
		}

	}, [checkedInterests, panelShown, successfullySubmitted]);

	// fired if 'hideFromScroll' changes
	useEffect(() => {
		if (hideFromScroll) {
			expandCollapseFirstPanel(false);
			showHideSecondPanel(false);
			showHidePageBlocker(false);
			setHideFromScroll(false);
			setPanelShown(PANEL_COLLAPSED);
		}
	}, [hideFromScroll]);

	var panelIsStuck = false;

	// Drawer should close anytime the user scrolls (so long as it's not already closed)
	useScrollPosition(({ prevPos, currPos}) => {
		// if not showing form do nothing
		if (!showFormArea) {
			return;
		}

		var slideOutAreaRect = document.querySelector('#lead-gen-lead-gen-slide-out-area').getBoundingClientRect();

		// NOTES:: when #lead-gen-lead-gen-slide-out-area's bounding top reaches 0, it's top is at the top of the window
		// We want to look for a bit further down (the height of the phone icon and it's padding) before we
		// start to stick
		var topIconAndPaddingOffset = 64;
		var topIconPaddingTop = 20;

		// console.log('#lead-gen-lead-gen-slide-out-area rect', slideOutAreaRect);
		if (slideOutAreaRect.top > topIconAndPaddingOffset) {
			panelIsStuck = false;
			setCloseButtonMustBeHidden(false);
		}
		else {
			panelIsStuck = true;
			setCloseButtonMustBeHidden(true);
		}
		// console.log('panelIsStuck', panelIsStuck);

		// we want to adjust the bottom of the sticky panel to keep it in the slide out area
		var rightRailElement = document.querySelector('.sticky-drawer-side__right-rail');
		if (panelIsStuck === false) {
			rightRailElement.style['top'] = Variables.leadGenTopSpacing;
		} else {
			var topVal = slideOutAreaRect.top + topIconPaddingTop;
			rightRailElement.style['top'] = `${topVal}px`;
		}

		// we need to show panel 2 if the rail is in the stuck area
		if (panelIsStuck === true) {
			expandCollapseFirstPanel(true);
			showHideSecondPanel(true);
			setPanelShown(PANEL_SECOND);
			showHidePageBlocker(false);
		} else {
			// if the user is scrolling, and the panel isn't stuck, then we need to close it
			setHideFromScroll(true);
		}
	})

	return (
		<div className="sticky-drawer-side">
			<div className="sticky-drawer-side__page-blocker" onClick={closeDrawerRequested} />
			<div className={`sticky-drawer-side__right-rail ${showFormArea === false ? 'docked-bottom' : 'docked-top' }`}>
				<PhoneSlideOutButton />

				{ showFormArea ?
				<div className="sticky-drawer-side__right-rail__middle-container">
					<div className="sticky-drawer-side__right-rail__middle-container__inner">
						<div className={`sticky-drawer-side__right-rail__middle-container__inner__close-button-wrapper
							${(panelShown !== 0 && !closeButtonMustBeHidden) ? '' : 'hidden'}`}
							onClick={closeDrawerRequested}>
							<CircleCloseButton />
						</div>
						<div className="sticky-drawer-side__right-rail__middle-container__inner__first-panel collapsed active-panel">
							<div className="sticky-drawer-side__right-rail__middle-container__inner__first-panel-collapsed"
								onClick={openButtonClicked}>
								<h6 className="sticky-drawer-side__right-rail__middle-container__inner__first-panel-collapsed__heading">
									{ successfullySubmitted ? 'Thanks for contacting us.' : 'Get Started' }
								</h6>
								<button className="sticky-drawer-side__right-rail__middle-container__inner__first-panel-collapsed__btn link-button">
									<ArrowInCircle />
								</button>
							</div>
							<div className="sticky-drawer-side__right-rail__middle-container__inner__first-panel-expanded hide">
								{ successfullySubmitted ?
									<>
										<h6>Thank you for contacting us.</h6>
										<p className="subtext">A team member will be in touch shortly.</p>
									</>
									:
									<>
										<h6>Connect with an expert to get started.</h6>
										<StickyFormInterestSelection
											interestDefinitions={interestDefinitions}
											checkedInterests={checkedInterests}
											handleCheckedInterestsChanged={handleCheckedInterestsChanged} />
									</>
								}
							</div>
						</div>
						<div className="sticky-drawer-side__right-rail__middle-container__inner__second-panel collapsed">
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
				: null
				}

			</div>
		</div>
	);
}

export default StickyDrawerSide;
