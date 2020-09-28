import React from "react";
const BrandListing = ({
	brandsData, checkedBrands, handleCheckedBrandsChanged
}) => {

	// console.log('bd', brandsData);
	return (

		<div className={`product-catalog-brand-listing`}>
			<div className='section-heading'>Brand</div>
			<div className='product-catalog-brand-listing__items'>
				{
					brandsData ?
						brandsData.map(item => (
							// NOTE: to avoid the error 'A component is changing an uncontrolled input of type checkbox to be controlled' for
							// our dynamic checkboxes, we must put `!!` in front of 'checked' value (ref: https://stackoverflow.com/a/55259364/18005)
							<label key={`brand-${item.productBrandId}`}
								className="checkbox-item">
								<input className="text"
									name={item.title}
									id={item.productBrandId}
									type="checkbox"
									checked={checkedBrands.includes(item.productBrandId.toString())}
									onChange={handleCheckedBrandsChanged} />
								<span className="check">{item.title}</span>
							</label>
						))
						:
						<></>
				}
			</div>
		</div>
	)
}
export default BrandListing;
