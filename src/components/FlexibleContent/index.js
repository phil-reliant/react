import React, { useRef, useEffect, createRef } from "react";
import { Waypoint } from 'react-waypoint';
import gsap from 'gsap';
import BasicTextModule from "./BasicTextModule";
import CaseStudyFeatured from "./CaseStudyFeatured";
import ContactForm from "./ContactForm";
import ContactUsCtas from './ContactUsCTA';
import EOLTracker from './EOLTracker';
import EOLList from './EOLList';
import FAQAccordion from "./FAQAccordion";
import FooterCTA from "./FooterCTA";
import IconGrid from "./IconGrid";
import IndustrySlider from './IndustrySlider';
import LeftRight from "./LeftRight";
import LeftRightBulleted from './LeftRightBulleted';
import LogoSlider from "./LogoSlider";
import MastheadLayout from "./Masthead";
import ResourcesCTA from './ResourcesCTA';
import SecondaryPageHeader from './SecondaryPageHeader';
import ServiceTable from './ServiceTable';
import StatBlock from './StatBlock';
import TestimonialSlider from './TestimonialSlider';
import ThreeUpContentBlocks from './ThreeUpContentBlocks';
import VideoPlayer from './VideoPlayer';

const renderLayout = (type, postType, data) => {
	switch (type) {
		case `${postType}_Pagecontentfields_PageContent_M180BasicText`:
			return <BasicTextModule {...data} />;
		case `${postType}_Pagecontentfields_PageContent_Masthead`:
			return <MastheadLayout {...data} />;
		case `${postType}_Pagecontentfields_PageContent_LogoSlider`:
			return <LogoSlider {...data} />;
		case `${postType}_Pagecontentfields_PageContent_IconGrid`:
			return <IconGrid {...data} />;
		case `${postType}_Pagecontentfields_PageContent_CaseStudiesFeatured`:
			return <CaseStudyFeatured {...data} />;
		case `${postType}_Pagecontentfields_PageContent_ContactForm`:
			return <ContactForm {...data} />;
		case `${postType}_Pagecontentfields_PageContent_ContactUsCtas`:
			return <ContactUsCtas {...data} />;
		case `${postType}_Pagecontentfields_PageContent_FooterCta`:
			return <FooterCTA {...data} />;
		case `${postType}_Pagecontentfields_PageContent_FaqAccordion`:
			return <FAQAccordion {...data} />;
		case `${postType}_Pagecontentfields_PageContent_LeftRight`:
			return <LeftRight {...data} />;
		case `${postType}_Pagecontentfields_PageContent_IndustrySlider`:
			return <IndustrySlider {...data} />;
		case `${postType}_Pagecontentfields_PageContent_SecondaryPageHeader`:
			return <SecondaryPageHeader {...data} />;
		case `${postType}_Pagecontentfields_PageContent_StatBlock`:
			return <StatBlock {...data} />;
		case `${postType}_Pagecontentfields_PageContent_TestimonialSlider`:
			return <TestimonialSlider {...data} />;
		case `${postType}_Pagecontentfields_PageContent_VideoPlayer`:
			return <VideoPlayer {...data} />;
		case `${postType}_Pagecontentfields_PageContent_LeftRightBulleted`:
			return <LeftRightBulleted {...data} />;
		case `${postType}_Pagecontentfields_PageContent_ResourcesCta`:
			return <ResourcesCTA {...data} />;
		case `${postType}_Pagecontentfields_PageContent_EolTracker`:
			return <EOLTracker {...data} />;
		case `${postType}_Pagecontentfields_PageContent_EolList`:
				return <EOLList {...data} />;
		case `${postType}_Pagecontentfields_PageContent_ServiceTable`:
			return <ServiceTable {...data} />;
		case `${postType}_Pagecontentfields_PageContent_ThreeUpContentBlocks`:
			return <ThreeUpContentBlocks {...data} />;
		default:
			return ``;
	}
};

const FlexibleContent = props => {
	const { pageContent } = props.pageContentFields;
	// const sectionRefs = useRef([...Array(pageContent.length)].map(() => createRef()));
	// const innerRefs = useRef([...Array(pageContent.length)].map(() => createRef()));

	const sectionRefs = useRef(
		[...Array(20)].map(() => createRef())
	);
	const innerRefs = useRef(
		[...Array(20)].map(() => createRef())
	);

	useEffect(() => {
		// gsap.to(document.body, { backgroundColor: '#ffffff', duration: 0.0 });
		
		if (sectionRefs.current) {
			sectionRefs.current.forEach((ref) => {
				gsap.to(ref.current, {
					duration: 0.0,
					opacity: 1,
					y: 0
				});
			});
		}
	});

	const fadeIn = (elIndex) => {
		// NOTE:: rare crashes have been seen in this method during the `gsap.to` call ("TypeError: Cannot read property
		// 'current' of undefined"), so adding sanity check to ensure both references to '.current' are not null.
		if (innerRefs && (typeof innerRefs.current !== 'undefined')) {
			if (innerRefs.current[elIndex] && (typeof innerRefs.current[elIndex].current !== 'undefined')) {
				gsap.to(innerRefs.current[elIndex].current, {
					duration: 0.4,
					opacity: 1,
					y: 0
				});
			}
		}
	}

	const layouts = pageContent.map((layout, index) => {
		const { __typename } = layout;
		const postType = __typename.split("_")[0];
		const moduleType = __typename.split("_")[3].toLowerCase();
		const markup = renderLayout(__typename, postType, layout);

		let bgClass = layout.backgroundColor ? `bg-${layout.backgroundColor}` : ``;

		if (moduleType === `casestudiesfeatured`) {
			bgClass = ``;
		}

		let appearanceClasses = ``;
		let appearanceStyles = {};
		let paddingOptions = layout.paddingOptions;
		let backgroundImage = layout.appearanceBackgroundImage;


	if (paddingOptions) {
		appearanceClasses += ` padding-top-${paddingOptions.paddingTop} padding-bottom-${paddingOptions.paddingBottom}`;
	}

		if (backgroundImage) {
			appearanceStyles = {
				backgroundImage: `url('${backgroundImage.mediaItemUrl}')`,
				backgroundSize: `cover`,
				backgroundPosition: `center center`,
				backgroundRepeat: `no-repeat`
			}
		}


		return (
			<Waypoint
				onEnter={() => fadeIn(index)}
				bottomOffset={`40%`}
				key={`flex-layout-${index}`}
			>
				<section
					className={
						`layout
						layout-type-${moduleType}
						${bgClass}
						${appearanceClasses}`
						}
						style={appearanceStyles}
						ref={sectionRefs.current[index]}
					>


					<div
						className={`layout-inner`}
						ref={innerRefs.current[index]}
					>
						{markup}
					</div>
				</section>
			 </Waypoint>

		);
	});

	return <div className={`flex-content`}>{layouts}</div>;
};

export default FlexibleContent;
