import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import SEO from '../../components/SEO';
import ArrowNoStem from '../../assets/svgs/arrow-no-stem';
import ContactForm from '../../components/FlexibleContent/ContactForm';
import ProductListing from '../../components/ProductListing';
import ProductTabs from '../../components/ProductTabs';
import ResourceListing from '../../components/ResourceListing';
import ResourcesCTA from '../../components/FlexibleContent/ResourcesCTA';
import Variables from '../../assets/scss/config/_variables.scss'

const ProductBody = props => {
	const topAreaHeight = 150; // top area height used for knowing when to sticky scroll
	const stickyScrollExtraBottomPadding = 20;

	const mainContainer = 'product-body__main-container';

	const CONTACT_FORM_QUERY = gql`
		query CONTACT_FORM_QUERY {
			options {
				globalOptions {
					tab1Title
					tab1InnerHeading
					tab1FormId
					tab2Title
					tab2InnerHeading
					tab2FormId
				}
			}
		}
	`;

	// making the contact form sticky is done by adding a top-padding to contactFormScrollableArea
	useScrollPosition(({ prevPos, currPos}) => {


		// we dont want to have sticky scrolling if on mobile
		if (window.innerWidth <= Variables.breakpointLarge) {
			resetScrollAreaTopPadding();
			return;
		}

		const productContentArea = document.querySelector('#productContentArea');
		const contactFormScrollableArea = document.querySelector('#contactFormScrollableArea');
		var contactFormScrollableAreaInner = document.querySelector('#contactFormScrollableAreaInner');

		if (!contactFormScrollableArea || !productContentArea || !contactFormScrollableAreaInner) {
			console.warn('Could not find divs needed to make contact form sticky!');
			return;
		}

		const productContentAreaRect = productContentArea.getBoundingClientRect();
		// const contactFormScrollableAreaRect = contactFormScrollableArea.getBoundingClientRect();
		const contactFormScrollableAreaInnerRect = contactFormScrollableAreaInner.getBoundingClientRect();

		// if the contact form is taller than the product area then don't scroll
		if (contactFormScrollableAreaInnerRect.height >= productContentAreaRect.height) {
			resetScrollAreaTopPadding();
			return;
		}

		// we don't want to have sticky scroll if form is taller than visible area
		// console.log(`window.innerHeight: ${window.innerHeight}, contactFormScrollableAreaInnerRect + topAreaHeight: ${(contactFormScrollableAreaInnerRect.height + topAreaHeight)}`);
		if (window.innerHeight <= contactFormScrollableAreaInnerRect.height + topAreaHeight) {
			resetScrollAreaTopPadding();
			return;
		}

		// console.log('currPos', currPos);
		const yScrollPos = currPos.y * -1; // NOTE: currPos is x and y, and y is negative as the user scrolls down

		// calculate the max we can scroll (how much taller the product area is than the contact area - 20px for extra bottom padding)
		const maxScrollHeight = productContentAreaRect.height - contactFormScrollableAreaInnerRect.height - stickyScrollExtraBottomPadding;
		// console.log('maxScrollHeight', maxScrollHeight);

		let updatedScrollAreaTopPadding = yScrollPos - topAreaHeight;
		if (updatedScrollAreaTopPadding > maxScrollHeight) {
			updatedScrollAreaTopPadding = maxScrollHeight;
		}
		contactFormScrollableArea.style['padding-top'] = `${updatedScrollAreaTopPadding}px`;

		// console.log('Setting contactformscrollablearea padding to', updatedScrollAreaTopPadding);
	});

	const resetScrollAreaTopPadding = () => {
		var contactFormScrollableArea = document.querySelector('#contactFormScrollableArea');
		if (contactFormScrollableArea) {
			contactFormScrollableArea.style['padding-top'] = `0px`;
		}
	}

	const { loading, error, data } = useQuery(CONTACT_FORM_QUERY, {});
	if (loading) {
		return <p></p>; // NOTE:: could show loading indicator here
	}
	if (error) return <p>Error loading contact details</p>;
	if (!data.options.globalOptions) return <p>Error loading contact data</p>;

	// console.log('product_details', props.product_details);

	const tabDefinitions = [
		{
			formId: data.options.globalOptions.tab1FormId,
			tabTitle: data.options.globalOptions.tab1Title,
			internalHeader: data.options.globalOptions.tab1InnerHeading
		},
		{
			formId: data.options.globalOptions.tab2FormId,
			tabTitle: data.options.globalOptions.tab2Title,
			internalHeader: data.options.globalOptions.tab2InnerHeading
		}
	];

	const backClicked = () => {
		props.GoBack();
	}

	return (
		<div className={`product-body`}>
			<SEO {...props.seo} />

			{ props.showGoBackToProductsLink ?
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className={'product-body__back-button'}>
								<button className={`link-button no-decoration arrow-link --back`}
									onClick={backClicked}>
										<ArrowNoStem />
										<span>Back to Search</span>
								</button>
							</div>
						</div>
					</div>
				</div>
				:
				<></>
			}

			<div className="container product-body__main-container">
				<div className="row">
					<div id="productContentArea" className="col col-12 col-lg-6">
						<h3>{props.name}</h3>
						{ props.price && props.price !== "$0.00" ?
							<h6 className={`${mainContainer}__price`}>Starting at {props.price}</h6>
							:
							<></>
						}
						{ props.image ?
							<img className={`${mainContainer}__product-image`}
								src={props.image.mediaItemUrl}
								alt={props.image.altText} />
							:
							<></>
						}
						<div className={`${mainContainer}__description`}
							dangerouslySetInnerHTML={{__html: props.description}} />
						{ props.product_details &&
							(props.product_details.specs != null ||
							props.product_details.insights != null ||
							props.product_details.compatibility != null) ?
							<div className={`${mainContainer}__product-tabs`}>
								<ProductTabs productDetails={props.product_details} />
							</div>
							:
							<></>
						}
						{ ( props.resource_listing && props.resource_listing.resourceListing && props.resource_listing.resourceListing.length > 0 ) ?
							<div className={`${mainContainer}__resources`}>
							<ResourceListing {...props} />
							</div>
							:
							<></>
						}
						{ ( props.crossSell && props.crossSell.edges.count > 0 ) ?
							<div className={`${mainContainer}__similar-products`}>
								<ProductListing {...props} />
							</div>
							:
							<></>
						}
					</div>
					<div className="col col-12 col-lg-1">
					</div>
					<div className="col col-12 col-lg-5">
						<div id="contactFormScrollableArea" className="contact-form-scrollable-area">
							<div id="contactFormScrollableAreaInner" className="contact-form-scrollable-area__inner">
								<ContactForm tabDefinitions={tabDefinitions}
									forceSingleColumn={true}
									forceSplitTabWidth={true} />
							</div>
						</div>
					</div>
				</div>
			</div>
			{ (props.resourcesCta && props.resourcesCta.resources) ?
				<ResourcesCTA heading={props.resourcesCta.heading}
					resources={props.resourcesCta.resources} />
				:
				<></>
			}
		</div>
	);
}

ProductBody.propTypes = {
	title: PropTypes.string,
	showGoBackToProductsLink: PropTypes.bool,
	GoBack: PropTypes.func
}

export default ProductBody;
