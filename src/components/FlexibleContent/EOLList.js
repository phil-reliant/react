import React from 'react';
import ArrowNoStem from '../../assets/svgs/arrow-no-stem';
import ErrorBoundary from '../ErrorBoundary';
import { InternalOrExternalLink } from '../../utils/UrlUtils';

const EOLList = props => {
	return (
		<ErrorBoundary message={`Unable to load EOLList`}>
			<div className="eol-list">
				<div className="container eol-list__heading">
					{props.image && props.image.mediaItemUrl ?
						<div className="row">
							<div className="col-12">
								<div className={`eol-list__heading__image-container`}>
									<img
										className={`img-responsive`}
										src={props.image.mediaItemUrl}
										srcSet={props.image.srcSet}
										alt={props.image.altText || props.image.title}
									/>
								</div>
							</div>
						</div>
						:
						<></>
					}
					<div className="row">
						<div className="eol-list__heading__title col-12">
							<h4>{props.title}</h4>
						</div>
					</div>
					<div className="row eol-list__copy-row">
						<div className="eol-list__copy-row__copy-column col-12 col-md-8">
							<p>{props.bodyText}</p>
						</div>
						<div className="eol-list__copy-row__support-col col-12 col-md-4">
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
				<div className="container eol-list__brand-entry">
					<div className="row">
						<div className="col">
							<table className='eol-list__brand-entry__table-wrapper__table'>
								<thead>
									<tr>
										<th className='center-aligned-cell'></th>
										<th className='center-aligned-cell'>EOL Date (Est*)</th>
										<th className='center-aligned-cell'>EOSL Date</th>
									</tr>
								</thead>
								<tbody>
								{ props.eolcategory && props.eolcategory[0] && props.eolcategory[0].eolProducts && props.eolcategory[0].eolProducts.nodes ?
									props.eolcategory[0].eolProducts.nodes.map( ( eolProduct, eolProductIndex) => (
										<tr key={`eol-entry-${eolProductIndex}`} className='row-alt-striped-odd'>
											<td className='left-aligned-cell row-heading' dangerouslySetInnerHTML={{__html: eolProduct.title}} />
											<td className='center-aligned-cell'>{eolProduct.eolProductInfo.eolDate}</td>
											<td className='center-aligned-cell'>{eolProduct.eolProductInfo.eoslDate}</td>
										</tr>
									))
									:
									<></>
								}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</ErrorBoundary>
	)
}
export default EOLList;
