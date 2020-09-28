import React from "react";
const ProductTypeListing = ({
	productFamilyTypesData, checkedProductFamilyTypes, handleCheckedProductTypesChanged
}) => {

	return (
		<div className='product-catalog-product-type-listing'>
			<div className='section-heading'>Product Type</div>
			<div className='product-catalog-brand-listing__items'>
				{
					productFamilyTypesData ?
					productFamilyTypesData.map(item => (
						// NOTE: to avoid the error 'A component is changing an uncontrolled input of type checkbox to be controlled' for
						// our dynamic checkboxes, we must put `!!` in front of 'checked' value (ref: https://stackoverflow.com/a/55259364/18005)
						<label key={`pft-${item.productFamilyTypeId}`} className="checkbox-item">
							<input className="text"
								name={item.title}
								id={item.productFamilyTypeId}
								type="checkbox"
								checked={checkedProductFamilyTypes.includes(item.productFamilyTypeId.toString())}
								onChange={handleCheckedProductTypesChanged} />
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
export default ProductTypeListing;
