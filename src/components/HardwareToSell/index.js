import React from "react";
import { InternalOrExternalLink } from '../../utils/UrlUtils';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ArrowNoStem from '../../assets/svgs/arrow-no-stem';
import FillImage from "../../assets/images/circuit-board-chipset.jpg";
import LoadingSpinner from '../LoadingSpinner';

const HardwareToSell = () => {
	let url = "#"; // TODO:: get default URL to use
	let headerText = "Have Hardware To Sell?";

	const GLOBAL_OPTIONS_QUERY = gql`
		query GLOBAL_OPTIONS_QUERY {
			options {
				globalOptions {
					hardwareToSellHeading
					hardwareToSellLink
				}
			}
		}
	`;

	const { loading, error, data } = useQuery(GLOBAL_OPTIONS_QUERY, {});

	if (loading) {
		return <LoadingSpinner small paddingTopSmall />
	}
	if (error || !data.options.globalOptions || !data.options.globalOptions.hardwareToSellLink) {
		console.error("HardwareToSell module failed to get global options for where to link to - using defaults!");
	} else {
		url = data.options.globalOptions.hardwareToSellLink;
		headerText = data.options.globalOptions.hardwareToSellHeading;
	}

	return (
		<div className="hardware-to-sell">
			<img className="hardware-to-sell__background-image"
				src={FillImage}
				alt="Hardware to Sell background" />
			<div className="content">
				<h4 className="hardware-to-sell__big-text">{headerText}</h4>
				<div className="buttons --align-center">
					<InternalOrExternalLink className="button --standard arrow-icon" url={url}>
						<span>Learn More</span>
						<div className={`arrow-icon`}>
							<ArrowNoStem />
						</div>
					</InternalOrExternalLink>
				</div>
			</div>
		</div>
	);
}

export default HardwareToSell;
