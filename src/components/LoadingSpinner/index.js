import React from 'react';
import RetinaImage from 'react-retina-image';

const LoadingSpinner = ( { small, large, paddingTopSmall, paddingTopLarge }) => {
	return (
		<div className={`loading-spinner`}>
			<RetinaImage
				className={`
					${ (small) ? '--small' : '' }
					${ (large) ? '--large' : '' }
					${ (paddingTopSmall) ? 'spinner-top-20' : '' }
					${ (paddingTopLarge) ? 'spinner-top-100' : '' }
				`}
				src={'/images/reliant-loading_80x80.gif'}
				alt={`loading..`} />
		</div>
	);
}

export default LoadingSpinner;
