import React from "react";
import { Link } from 'react-router-dom';
import FooterMenu from "./FooterMenu";
import FooterMenuSecondary from "./FooterMenuSecondary";
import LoadingSpinner from '../LoadingSpinner';
import SocialButtons from "../SocialButtons";
import ReliantLogo from "../../assets/svgs/reliant-logo";
import SubscribeForm from "./SubscribeForm";

const Footer = ({ loading, primaryMenu, secondaryMenu}) => {

	return (
		<footer className={`site-footer`}>
			<div className={`container-fluid site-footer__inner`}>
				<div className={`row first-row`}>
					<Link to="/" className={`logo`}>
						<ReliantLogo />
					</Link>
				</div>
				<div className={`row middle-row`}>
					<div className={`column subscribe`}>
						<SubscribeForm />
					</div>
					<div className={`column menu`}>
						<div className={`menu__column --one`}>
							{
								loading ?
									<LoadingSpinner small />
									:
								 	primaryMenu ?
										<FooterMenu menuDetails={primaryMenu} />
										:
										<p>Errors</p>
							}
						</div>
						<div className={`menu__column --two`}>
							{
								loading ?
									<LoadingSpinner small />
									:
								 	secondaryMenu ?
										<FooterMenuSecondary menuDetails={secondaryMenu} />
										:
										<p>Errors</p>
							}
						</div>
					</div>
				</div>
				<div className={`row last-row`}>
					<div className={`copyright-wrapper`}>
						<section className={`copyright`}>
							© Copyright {new Date().getFullYear()} Reliant Technology. All
							Rights Reserved.
						</section>
					</div>
					<div className={`social-buttons-wrapper`}>
						<SocialButtons />
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
