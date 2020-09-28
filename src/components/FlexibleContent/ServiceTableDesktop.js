import React from "react";

const ServiceTableDesktop = (props) => {

	const { RenderCell } = props;
	// console.log('ServiceTable props', props);

	// props.highlightingDirection
	// props.leftAlignContent
	// props.columnHeadings[]
	// .. columnHeading
	// props.rowData[]
	// .. rowHeading
	// .. columnData[]
	// .. .. type [checkbox, text]
	// .. .. checkbox
	// .. .. text
	// .. .. optionalLink

	return (
		<div className="container">
			<div className="row">
				<div className='col-12 service-table__table-wrapper'>
					<table className='service-table__table-wrapper__table'>
						<thead>
							<tr>
								<th className={`service-table__table-wrapper__table__heading
									${props.leftAlignContent ? 'left-aligned-cell' : 'center-aligned-cell'}
									${props.highlightingDirection === 'columns' ? 'col-striped' : ''}`}>
								</th>
								{
									// render column headings
									props.columnHeadings.map((colEntry, index) => (
										<th key={`colhead-${index}`}
											className={`service-table__table-wrapper__table__heading
											${props.leftAlignContent ? 'left-aligned-cell' : 'center-aligned-cell'}
											${props.highlightingDirection === 'columns' ? 'col-striped' : ''}`}>
											{colEntry.columnHeading ?
												<>{colEntry.columnHeading}</>
												:
												<></>
											}
										</th>
									))
								}
							</tr>
						</thead>
						<tbody>
							{
								props.rowData ?
									props.rowData.map((rowEntry, rowIndex) => (
										<tr key={`rowItem-${rowIndex}`}
											className={`service-table__table-wrapper__table__row
											${props.highlightingDirection === 'rows' ? 'row-alt-striped-even' : ''}`}>
											{
												// render row headings
												rowEntry.rowHeading ?
													<td className={`service-table__table-wrapper__table__row__col row-heading
														${props.leftAlignContent ? 'left-aligned-cell' : 'center-aligned-cell'}`}>
														{rowEntry.rowHeading}
													</td>
													:
													<></>
											}
											{
												// render rows
												rowEntry.columnData.map((colData, colIndex) => (
													<td key={`st-row-${colIndex}`}
														className={`service-table__table-wrapper__table__row__col
															${props.leftAlignContent ? 'left-aligned-cell' : 'center-aligned-cell'}
															${props.highlightingDirection === 'columns' ? 'col-striped' : ''}`}>
															{
																RenderCell(colData)
															}
													</td>
												))
											}
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
	)
}
export default ServiceTableDesktop;
