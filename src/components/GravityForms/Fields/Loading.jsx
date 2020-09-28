import React from "react";
import PropTypes from "prop-types";
import LoadingSpinner from '../../../components/LoadingSpinner';

const Loading = props => {
	const {
		isLoading
	} = props;

	return (
		isLoading ?
			<LoadingSpinner small />
			:
			null
	);
};

Loading.propTypes = {
	isLoading: PropTypes.bool,
};

export default Loading;
