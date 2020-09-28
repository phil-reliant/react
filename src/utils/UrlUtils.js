import React from 'react';
import { Link } from 'react-router-dom';

// ex: https://xenodochial-heyrovsky-68cf5e.netlify.com/case-studies/large-us-healthcare-provider-moves-to-reliant-technology-maintenance-plan/
// becomes: /case-studies/large-us-healthcare-provider-moves-to-reliant-technology-maintenance-plan/
export function MakeRelativePath(absolutePath) {
	try {
		if (absolutePath === "#") {
			return absolutePath;
		}

		// if it starts with a `/` then we will assume it is already a relative path
		if (absolutePath && absolutePath.startsWith("/")) {
			return absolutePath;
		}

		const parsedUrl = new URL(absolutePath);
		// console.log('parsedUrl', parsedUrl);
		return parsedUrl.pathname;
	} catch (ex) {
		console.error(`MakeRelativePath failed to create a valid URL. Returning absolutePath. absolutePath:${absolutePath}`, ex);
		return absolutePath;
	}
}

export function IsUrlExternal(absolutePath) {
	try {
		if (absolutePath === "#") {
			return false;
		}

		// if it starts with a `/` then we will assume it is an internal path
		if (absolutePath && absolutePath.startsWith("/")) {
			return false;
		}

		const parsedUrl = new URL(absolutePath);
		if (parsedUrl.origin === window.location.origin) {
			return false;
		}

		// if using localhost and dev environment, links will have this URL, so treat them as internal links
		if (parsedUrl.origin === "https://xenodochial-heyrovsky-68cf5e.netlify.com" ||
			parsedUrl.origin === "http://xenodochial-heyrovsky-68cf5e.netlify.com") {
				return false;
		}
		return (parsedUrl.origin !== window.location.origin)
	} catch (ex) {
		console.error(`IsUrlExternal failed to create a valid URL. Returning false. absolutePath:${absolutePath}`, ex);
		return false;
	}
}

export function MakeInternalOrExternalLink(absolutePath, children, className, onClick, target) {
	if (IsUrlExternal(absolutePath)) {
		return (
			<a href={absolutePath} target={target} className={className} onClick={onClick}>
				{children}
			</a>
		)
	} else {
		let relativePath = MakeRelativePath(absolutePath);
		return (
			<Link to={relativePath} target={target} className={className} onClick={onClick}>
				{children}
			</Link>
		)
	}
}

export const InternalOrExternalLink = props => {
	const { children, className, url, target, onClick } = props;
	return MakeInternalOrExternalLink(url, children, className, onClick, target);
}
