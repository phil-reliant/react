import React from 'react';
import ArrowNoStem from '../../assets/svgs/arrow-no-stem';
import ErrorBoundary from '../ErrorBoundary';
import { InternalOrExternalLink } from '../../utils/UrlUtils';

const EOLTracker = props => {

	return (
		<ErrorBoundary message={`Unable to load EOLTracker`}>
			<div className="eol-tracker">
				<div className="container eol-tracker__heading">
					<div className="row">
						<div className="eol-tracker__heading__title col-12">
							<h4>{props.title}</h4>
						</div>
					</div>
					<div className="row eol-tracker__copy-row">
						<div className="eol-tracker__copy-row__copy-column col-12 col-md-7">
							<p>{props.bodyText}</p>
						</div>
						<div className="eol-tracker__copy-row__support-col col-12 col-md-5 col-lg-3">
							{
								props.supportLink ?
									<div className="buttons --align-right">
										<InternalOrExternalLink className="button --standard arrow-icon"
											url={props.supportLink}>
											<span>Get Support</span>
											<div className={`arrow-icon`}>
												<ArrowNoStem />
											</div>
										</InternalOrExternalLink>
									</div>
									:
									null
							}
						</div>
					</div>
				</div>
				{
					props.brandSections.map((brandSection, brandIndex) => (
						<div key={`brand-section-${brandIndex}`}
							className="container eol-tracker__brand-entry">
							<div className="row">
								<div className="col-12 col-md-3">
									{ brandSection.brandImage ?
										<img className='eol-tracker__brand-entry__image'
											src={brandSection.brandImage.mediaItemUrl}
											alt={brandSection.brandImage.altText} />
										:
										<></>
									}
								</div>
								<div className='col-12 col-md-7 eol-tracker__brand-entry__table-wrapper'>
									<table className='eol-tracker__brand-entry__table-wrapper__table'>
										<thead>
											<tr>
												<th className='center-aligned-cell'></th>
												<th className='center-aligned-cell'>EOL Date (Est*)</th>
												<th className='center-aligned-cell'>EOSL Date</th>
											</tr>
										</thead>
										<tbody>
											{
												brandSection.eolEntries.map((eolEntry, eolEntryIndex) => (
													<tr key={`eol-entry-${eolEntryIndex}`} className='row-alt-striped-odd'>
														<td className='left-aligned-cell row-heading' dangerouslySetInnerHTML={{__html: eolEntry.productName}} />
														<td className='center-aligned-cell'>{eolEntry.eolDate}</td>
														<td className='center-aligned-cell'>{eolEntry.eoslDate}</td>
													</tr>
												))
											}
										</tbody>
									</table>

									{ brandSection.seeAllLink ?
										<div className='eol-tracker__brand-entry__table-wrapper__see-all'>
											<InternalOrExternalLink url={brandSection.seeAllLink}>See All</InternalOrExternalLink>
										</div>
										:
										<></>
									}
								</div>
							</div>
						</div>
					))
				}
			</div>
		</ErrorBoundary>
	)
}
export default EOLTracker;
