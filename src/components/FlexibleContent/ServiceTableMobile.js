import React from "react";

const ServiceTableMobile = props => {
	const { RenderCell } = props;

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

	const GetColumnHeadingForColumnIndex = (index) => {
		if (!props.columnHeadings) {
			return "";
		}

		if (index >= props.columnHeadings.length) {
			return "";
		}

		return props.columnHeadings[index].columnHeading;
	}

	// we need to build a filtered list of `rowData` that has `rowHeading` and relative `columnData` defined to avoid
	// conditionally returning <></> as we must define a `key` when mapping `rowData` to render
	let filteredRowData = [];
	if (props.rowData) {
		for (let i in props.rowData) {
			var rowEntry = props.rowData[i];
			if (rowEntry.rowHeading && rowEntry.columnData) {
				filteredRowData.push(rowEntry);
			}
		}
	}

	return (
		<div className="container">
			<div className="row">
				<div className='col-12 service-table__table-wrapper'>
					{
						filteredRowData.map((rowEntry, rowIndex) => (
							<table key={`row-${rowIndex}`}
								className='service-table__table-wrapper__table'>
								<thead>
									<tr className='row-striped'>
										<th colSpan='2'>{rowEntry.rowHeading}</th>
									</tr>
								</thead>
								<tbody>
									{
										rowEntry.columnData.map((colData, colIndex) => (
											<tr key={`st-row-${colIndex}`}>
												<td className='half-width-td'>{ GetColumnHeadingForColumnIndex(colIndex) }</td>
												<td className={`half-width-td service-table__table-wrapper__table__row__col
													${props.leftAlignContent ? 'left-aligned-cell' : 'center-aligned-cell'}
													${props.highlightingDirection === 'columns' ? 'col-striped' : ''}`}>
														{
															RenderCell(colData)
														}
												</td>
											</tr>
										))
									}
								</tbody>
							</table>
						))
					}
				</div>
			</div>
		</div>
	)
}
export default ServiceTableMobile;
