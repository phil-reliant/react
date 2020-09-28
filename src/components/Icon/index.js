import React from 'react';

const Icon = (props) => {
	let newProps = {
		className: `${props.className}`,
		onClick: props.onClick,
		width: props.width ? props.width : '20',
		height: props.height ? props.height : '20',
		viewBox: props.viewBox ? props.viewBox : "0 0 1024 1024",
		version: "1.1",
		xmlns: "http://www.w3.org/2000/svg",
		dangerouslySetInnerHTML:{__html: props.children},
		fill: props.fill ? props.fill : 'white',
		style: props.style ? props.style : {},
	}
	return React.createElement('svg', newProps )
}
export default Icon;
