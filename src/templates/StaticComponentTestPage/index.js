import React from "react";
import LoadingSpinner from '../../components/LoadingSpinner';
import SecondaryPageHeader from '../../components/FlexibleContent/SecondaryPageHeader';

const StaticComponentTestPage = props => {

	let sectionStyles = {
		backgroundColor: 'white',
		paddingTop: '40px',
		paddingBottom: '40px'
	}

	return (
		<>
			<SecondaryPageHeader title={'Static Component Test Page'} />
			<section style={sectionStyles}>
				<div className={`container`}>
					<div className={`row`}>
						<div className='col-12'>
							<h3>Loading Indicators</h3>
						</div>
						<div className='col-12'>
							Loading Spinner (normal):
							<LoadingSpinner />
							Loading Spinner (small):
							<LoadingSpinner small />
							Loading Spinner (large):
							<LoadingSpinner large />
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default StaticComponentTestPage;
