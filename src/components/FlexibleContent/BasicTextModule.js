import React, { useEffect } from "react";
import PropTypes from "prop-types";

const BasicTextModule = props => {
	const {
		title,
		body
	} = props;
	useEffect(() => {

		if (window.location.href.includes('owlytica') && !document.getElementById('owlytica')) {
			let script = document.createElement('script');
			script.type = 'text/javascript';
			script.append("var ssaUrl = 'https://pixel.sitescout.com/iap/b0a1e3dc43f0d711';new Image().src = ssaUrl; (function(d) { var syncUrl = 'https://pixel.sitescout.com/dmp/asyncPixelSync'; var iframe = d.createElement('iframe'); (iframe.frameElement || iframe).style.cssText = 'width: 0; height: 0; border: 0;display:none'; iframe.src = 'javascript:false'; d.body.appendChild(iframe); var doc = iframe.contentWindow.document; doc.open().write('<body onload=window.location.href='+syncUrl); doc.close(); })(document);")
			script.id = "owlytica";
			document.body.appendChild(script);
		}
		return () => {
			if (document.getElementById('owlytica')) {
				document.getElementById('owlytica').remove()
			}
		}
	})
	return (
		<div className={`basic-text-module`}>
			<div className={`container`}>
				<div className={`row`}>
					<div className={`col-12`}>
						<h4>{title}</h4>
						<div className={`basic-text-module__body`}
							dangerouslySetInnerHTML={{ __html: body }} />
					</div>
				</div>
			</div>
		</div>
	);
};

BasicTextModule.propTypes = {
	title: PropTypes.string,
	body: PropTypes.string
};


export default BasicTextModule;
