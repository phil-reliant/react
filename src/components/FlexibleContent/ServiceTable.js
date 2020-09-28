import React from "react";
import ServiceTableDesktop from './ServiceTableDesktop';
import ServiceTableMobile from './ServiceTableMobile';
import TableCheckboxChecked from "../../assets/images/table-checkbox-checked.png";
import { InternalOrExternalLink } from '../../utils/UrlUtils';

const ServiceTable = props => {
	// console.log('ServiceTable props', props);

	// props.highlightingDirection
	// props.columnHeadings[]
	// .. columnHeading
	// props.rowData[]
	// .. rowHeading
	// .. columnData[]
	// .. .. type [checkbox, text]
	// .. .. checkbox
	// .. .. text
	// .. .. optionalLink

	const RenderCell = (colData) => {
		return (
			<>
				{ colData.type === 'checkbox' ?
					(colData.checkbox === true ?
						<img src={TableCheckboxChecked} alt='Checked' />
						:
						<></>
					)
					:
					<></>
				}
				{ colData.type === 'text' ?
					(colData.optionalLink ?
						<InternalOrExternalLink url={colData.optionalLink}>{colData.text}</InternalOrExternalLink>
						:
						<>{colData.text}</>
					)
					:
					<></>
				}
			</>
		)
	}

	// read `titleText` and `subtext` properties from props
	let titleText = null;
	let subtext = null;
	if (props.titleText) {
		titleText = props.titleText;
	}
	if (props.subtext) {
		subtext = props.subtext;
	}

	return (
		<>
			{
				titleText || subtext ?
					<div className="container service-table--headings">
						<div className="row">
							<div className="col-12">
								<h4 className={`${props.leftAlignContent ? 'left-aligned-cell' : 'center-aligned-cell'}`}>{titleText}</h4>
								<p className={`subtext ${props.leftAlignContent ? 'left-aligned-cell' : 'center-aligned-cell'}`}>{subtext}</p>
							</div>
						</div>
					</div>
					:
					<></>
			}

			<div className="--desktop-only">
				<ServiceTableDesktop {...props} RenderCell={RenderCell} />
			</div>
			<div className="--mobile-only">
				<ServiceTableMobile {...props} RenderCell={RenderCell} />
			</div>
		</>
	)
}
export default ServiceTable;
