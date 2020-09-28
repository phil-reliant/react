import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import SEO from '../components/SEO';
import ArrowNoStem from '../assets/svgs/arrow-no-stem';
import LoadingPage from '../components/LoadingPage';
import SideBars from "../assets/images/side-bars-11.png";

const Page404 = (props) => {

	const OPTIONS_QUERY = gql`
		query OPTIONS_QUERY {
			options {
				globalOptions {
					page404Title
					page404Body
				}
			}
		}
	`;

	const { loading, error, data } = useQuery(OPTIONS_QUERY, {});

	let headingText = '404';
	let bodyText = 'This page does not exist.';

	if (loading) {
		return  <LoadingPage />;
	}
	if (error || !data.options.globalOptions) {
		console.error('Error loading 404 global text options');
	} else {
		headingText = data.options.globalOptions.page404Title;
		bodyText = data.options.globalOptions.page404Body;
	}

	return (
		<div className={`page-404`}>
			<div className={`page-404__menu-spacer`} />
			<SEO title={`404 Not Found`} />
			<img
				className={`page-404__left-img`}
				src={SideBars}
				alt={`Side graphic`}
			/>

			<div className={`container page-404__inner`}>
				<div className={`row page-404__inner__row`}>
					<div className={`col-12 col-md-6 page-404__inner__row__left-side`}>
						<h4>{headingText}</h4>
						<p>{bodyText}</p>
						<div className="buttons --align-left">
							<Link className="button --standard arrow-icon" to={`/`}>
								<span>Go Back</span>
								<div className={`arrow-icon`}>
									<ArrowNoStem />
								</div>
							</Link>
						</div>
					</div>
					<div className={`col-12 col-md-6 page-404__inner__row__right-side`}>
						<h2 className={`page-404__inner__row__right-side__404-text`}>404</h2>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Page404;
