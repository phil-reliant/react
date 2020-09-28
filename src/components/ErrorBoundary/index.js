import React, { Component } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
  constructor (props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError (error) {
		console.error(error);
    return {
      hasError: true
    };
	}

  render () {
    if (this.state.hasError) {
      return (
        <div className={`error-boundary`}>
          <span role={`img`} aria-label={`Caution`}>
            ⚠️ Error {this.props.message || ``}
          </span>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundary;
