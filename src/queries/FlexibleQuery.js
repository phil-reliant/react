import APPEARANCE_OPTIONS_QUERY from './AppearanceQuery';
import BUTTONS_PARTIAL_QUERY from "./ButtonsPartialQuery";
import SINGLE_RESOURCE_PARTIAL_QUERY from './SingleResourcePartialQuery';

const FLEX_CONTENT_QUERY = (postType) => `
	pageContentFields {
		pageContent {
			__typename
			... on ${postType}_Pagecontentfields_PageContent_Masthead {
				title
				image {
					mediaItemUrl
				}
				body
				${BUTTONS_PARTIAL_QUERY}
				titleSwappingWords {
					word
				}
				imageOverlayOpacity
			}
			... on ${postType}_Pagecontentfields_PageContent_LogoSlider {
				title
				logos {
					logo {
						srcSet
						title
						mediaItemUrl
						altText
					}
					link
				}
				${APPEARANCE_OPTIONS_QUERY}
			}
			... on ${postType}_Pagecontentfields_PageContent_LeftRight {
				bodyText
				contentOnRight
				heading
				image {
					mediaItemUrl
					srcSet
					altText
					title
				}
				backgroundColor
				staticLeftSidebarImage
				staticRightSidebarImage
				${BUTTONS_PARTIAL_QUERY}
				${APPEARANCE_OPTIONS_QUERY}
			}
			... on ${postType}_Pagecontentfields_PageContent_IconGrid {
				heading
				${BUTTONS_PARTIAL_QUERY}
				gridItems {
					${BUTTONS_PARTIAL_QUERY}
					bodyText
					title
					icon {
					altText
					sourceUrl
					}
				}
				backgroundColor
				${APPEARANCE_OPTIONS_QUERY}
			}
			... on ${postType}_Pagecontentfields_PageContent_CaseStudiesFeatured {
				backgroundColor
				sectionTitle
				caseStudies {
					... on CaseStudy {
						id
						case_study_fields {
							quote
						}
						link
						title
						${SINGLE_RESOURCE_PARTIAL_QUERY}
					}
				}
				${APPEARANCE_OPTIONS_QUERY}
			}
			... on ${postType}_Pagecontentfields_PageContent_FooterCta {
				backgroundColor
				sectionTitle
				${BUTTONS_PARTIAL_QUERY}
				items {
					bodyText
					title
					${BUTTONS_PARTIAL_QUERY}
				}
				${APPEARANCE_OPTIONS_QUERY}
			}
			... on ${postType}_Pagecontentfields_PageContent_IndustrySlider {
				backgroundColor
				sectionTitle
				industries {
					industryName
					optionalLink {
						url
						target
					}
					icon
					iconColor
				}
				${APPEARANCE_OPTIONS_QUERY}
			}
			... on ${postType}_Pagecontentfields_PageContent_StatBlock {
				backgroundColor
				sectionTitle
				stat1Description
				stat1Number
				stat1Unit
				stat2Description
				stat2Number
				stat2Unit
				stat3Description
				stat3Number
				stat3Unit
				${APPEARANCE_OPTIONS_QUERY}
			}
			... on ${postType}_Pagecontentfields_PageContent_TestimonialSlider {
				${APPEARANCE_OPTIONS_QUERY}
				testimonials {
					... on Testimonial {
						id
						featuredImage {
							altText
							title
							srcSet
							mediaItemUrl
						}
						singleTestimonialFields {
							quote
							title
						}
						title
					}
				}
			}
			... on ${postType}_Pagecontentfields_PageContent_VideoPlayer {
				sectionTitle
				youtubeUrl
				imageOverlay {
					mediaItemUrl
					altText
				}
				${APPEARANCE_OPTIONS_QUERY}
			}
			... on ${postType}_Pagecontentfields_PageContent_SecondaryPageHeader {
				staticSidebarImage
				title
				backgroundImage {
					uri
					mediaItemUrl
				}
				imageOverlayOpacity
				${APPEARANCE_OPTIONS_QUERY}
			}
			... on ${postType}_Pagecontentfields_PageContent_ContactForm {
				subtext
				titleText
				tabDefinitions {
				  formId
				  tabTitle
				  internalHeader
				}
				${APPEARANCE_OPTIONS_QUERY}
			}
			... on ${postType}_Pagecontentfields_PageContent_LeftRightBulleted {
				heading
				bodyText
				bullets {
					bullet
					subhead
				}
				image {
					altText
					mediaItemUrl
					srcSet
					title
				}
				${BUTTONS_PARTIAL_QUERY}
				${APPEARANCE_OPTIONS_QUERY}
			}
			... on ${postType}_Pagecontentfields_PageContent_ResourcesCta {
				heading
				resources {
					__typename
					... on Post {
						id
						title
						excerpt
						link
					}
					... on CaseStudy {
						id
						title
						excerpt
						link
					}
					... on WhitePaper {
						id
						title
						excerpt
						link
					}
					... on Podcast {
						id
						title
						excerpt
						link
					}
					... on Infographic {
						id
						title
						excerpt
						link
					}
					
				}
				${APPEARANCE_OPTIONS_QUERY}
			}
			... on ${postType}_Pagecontentfields_PageContent_FaqAccordion {
				sectionTitle
				backgroundColor
				faqEntries {
				  answer
				  question
				  ${BUTTONS_PARTIAL_QUERY}
				}
				${APPEARANCE_OPTIONS_QUERY}
			}
			... on ${postType}_Pagecontentfields_PageContent_EolTracker {
				title
				bodyText
				supportLink
				brandSections {
					seeAllLink
					eolEntries {
						eolDate
						eoslDate
						productName
					}
					brandImage {
						altText
						mediaItemUrl
					}
				}
				${APPEARANCE_OPTIONS_QUERY}
			}
			... on Page_Pagecontentfields_PageContent_EolList {
				fieldGroupName
				title
				bodyText
				eolcategory {
					... on EOLCategory {
						id
						name
						eolProducts( first: 1000, where: {orderby: {field: TITLE, order: ASC}}) {
							nodes {
								title
								eolProductInfo {
										eolDate
										eoslDate
								}
							}
						}
					}
				}
				image {
					altText
					mediaItemUrl
					srcSet
					title
				}
				supportLink
				${APPEARANCE_OPTIONS_QUERY}
			}
			... on ${postType}_Pagecontentfields_PageContent_ServiceTable {
				highlightingDirection
				subtext
				titleText
				leftAlignContent
				columnHeadings {
					columnHeading
				}
				rowData {
					rowHeading
					columnData {
						checkbox
						optionalLink
						text
						type
					}
				}
				${APPEARANCE_OPTIONS_QUERY}
			}
			... on ${postType}_Pagecontentfields_PageContent_ThreeUpContentBlocks {
				title
				items {
					body
					heading
					link
					icon
					iconColor
				}
				${APPEARANCE_OPTIONS_QUERY}
				${BUTTONS_PARTIAL_QUERY}
			}
			... on ${postType}_Pagecontentfields_PageContent_ContactUsCtas {
				title
				${APPEARANCE_OPTIONS_QUERY}
			}
			... on ${postType}_Pagecontentfields_PageContent_M180BasicText {
				body
				backgroundColor
				title
				${APPEARANCE_OPTIONS_QUERY}
			}
		}
	}
`;

export default FLEX_CONTENT_QUERY;
