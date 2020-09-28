import React from "react";
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { MakeRelativePath } from '../../utils/UrlUtils';
import { useQuery } from '@apollo/react-hooks';
import ArrowNoStem from '../../assets/svgs/arrow-no-stem';
import LoadingSpinner from '../../components/LoadingSpinner';

const ResultsLandingPanel = props => {

	const GLOBAL_OPTIONS_QUERY = gql`
		query GLOBAL_OPTIONS_QUERY {
			options {
				globalOptions {
					hardwareCatalogPromos {
						bodyCopy
						link
						primaryHeader
						secondaryHeader
						promoImage {
							altText
							mediaItemUrl
						}
					}
				}
			}
		}
	`;

	const { loading, error, data } = useQuery(GLOBAL_OPTIONS_QUERY, {});

	if (loading) {
		return <LoadingSpinner paddingTopLarge />
	}
	if (error || !data.options.globalOptions) {
		console.error("ResultsLandingPanel module failed to get global options!");
		return (
			<div className={`results-landing-panel`}>
				<p>Error loading details.</p>
			</div>
		)
	}

	const hardwareCatalogPromos = data.options.globalOptions.hardwareCatalogPromos;

	if (!hardwareCatalogPromos || hardwareCatalogPromos.length === 0) {
		console.error('ResultsLandingPage - no hardware catalog promos have been defined in global options!');
	}

	const baseClass = `results-landing-panel__promo-item`;
	return (
		<div className={`results-landing-panel`}>
			{
				(hardwareCatalogPromos && hardwareCatalogPromos.length > 0) ?
					hardwareCatalogPromos.map((promoEntry, index) => (
						<div key={`promo-${index}`} className={baseClass}>
							<h5 className={`${baseClass}__heading`}>{promoEntry.primaryHeader}</h5>

							<div className={`${baseClass}__inner`}>
								{ promoEntry.promoImage ?
									<div className={`${baseClass}__inner__img-wrapper`}>
										<img src={promoEntry.promoImage.mediaItemUrl}
											alt={promoEntry.promoImage.altText} />
									</div>
									:
									<></>
								}
								<div className={`${baseClass}__inner__content-wrapper`}>
									<h6 className={`h8 ${baseClass}__inner__content-wrapper__sub-head`}>{promoEntry.secondaryHeader}</h6>
									<p className={`--small ${baseClass}__inner__content-wrapper__copy`}>{promoEntry.bodyCopy}</p>
									<div className="buttons --align-left">
										<Link className="button --standard arrow-icon"
											to={MakeRelativePath(promoEntry.link)}>
											<span>Learn More</span>
											<div className={`arrow-icon`}>
												<ArrowNoStem />
											</div>
										</Link>
									</div>
								</div>
							</div>
						</div>
					))
					:
					<>No Hardware promos</>
			}
		</div>
	)
}

export default ResultsLandingPanel;
