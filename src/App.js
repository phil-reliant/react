import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import BrandDetail from "./templates/BrandDetail";
import FamilyDetail from "./templates/FamilyDetail";
import Layout from "./components/Layout";
import Page404 from './pages/404';
import PostArchive from "./templates/PostArchive";
import ProductCatalog from "./templates/ProductCatalog";
import ProductDetail from "./templates/ProductDetail";
import ResourceArchive from "./templates/ResourceArchive";
import SinglePage from "./templates/SinglePage";
import SinglePost from "./templates/SinglePost";
import StaticComponentTestPage from './templates/StaticComponentTestPage';
let script;
const App = () => {
	// useEffect(()=>{
	// 	console.log("Used EFFECT WORK")
	// 	if (window.location.href.includes('owlytica') && !document.getElementById('owlytica')) {
	// 		script = document.createElement('script');
	// 		script.append(`alert("Hello"); `)
	// 		script.id = "owlytica";
	// 		document.body.appendChild(script);
	// 	} else if (document.getElementById('owlytica') && !window.location.includes('owlytica')) {
	// 		console.log(document.getElementById('owlytica') , " owlytica script is available ?")
	// 		document.getElementById('owlytica').remove()
	// 		console.log(document.getElementById('owlytica') , " owlytica script is not available ?")
	// 	}
	// },[window.location.href])
	
	return (

		<div className="app">
			<Switch>
				<Route
					exact
					path="/resources"
					render={props => (
						<Layout
							{...props}
							seoProps={{
								title: `Resource Center`,
								opengraphType: `object`,
							}}
							allowLeadGen={false}
						>
							<ResourceArchive {...props} />
						</Layout>
					)}
				/>

				<Route
					exact
					path="/products"
					render={props => (
						<Layout
							{...props}
							seoProps={{
								title: `Hardware Catalog`,
								opengraphType: `object`,
							}}
							allowLeadGen={false}
						>
							<ProductCatalog {...props} />
						</Layout>
					)}
				/>
				<Route
					exact
					path="/blog/:slug"
					render={props => (
						<Layout {...props} postType={`post`} allowLeadGen={false}>
							<SinglePost {...props} postType={`post`} />
						</Layout>
					)}
				/>
				<Route
					exact
					path="/blog-search"
					render={props => (
						<Layout
							postType={`archive`}
							seoProps={{
								title: `Blog Archive Search Results`,
								opengraphType: `object`,
							}}
							allowLeadGen={false}
						>
							<PostArchive searchTerm={props.location.search.split('=')[1]} />
						</Layout>
					)}
				/>
				<Route
					exact
					path="/blog"
					render={props => (
						<Layout
							{...props}
							postType={`archive`}
							seoProps={{
								title: `Reliant Blog`,
								opengraphType: `object`,
							}}
							allowLeadGen={false}
						>
							<PostArchive {...props} />
						</Layout>
					)}
				/>
				<Route
					exact
					path="/blog/category/:slug"
					render={props => (
						<Layout {...props} postType={`archive`} allowLeadGen={false}>
							<PostArchive {...props} category={props.match.params.slug} />
						</Layout>
					)}
				/>
				<Route
					exact
					path="/product/:slug"
					render={props => (
						<Layout {...props} postType={`product`} allowLeadGen={false}>
							<ProductDetail {...props} postType={`product`} />
						</Layout>
					)}
				/>
				<Route
					exact
					path="/brand/:slug"
					render={props => (
						<Layout {...props} postType={`reliant_brand`} allowLeadGen={false}>
							<BrandDetail {...props} postType={`reliant_brand`} />
						</Layout>
					)}
				/>
				<Route
					exact
					path="/family/:slug"
					render={props => (
						<Layout {...props} postType={`reliant_brand_family`} allowLeadGen={false}>
							<FamilyDetail {...props} postType={`reliant_brand_family`} />
						</Layout>
					)}
				/>
				<Route
					exact
					path="/static-component-test-page"
					render={props => (
						<Layout {...props} allowLeadGen={false}>
							<StaticComponentTestPage {...props} />
						</Layout>
					)}
				/>
				<Route
					exact
					path="/:slug"
					render={props => (
						<Layout {...props} postType={`page`}>
							<SinglePage {...props} />
						</Layout>
					)}
				/>
				<Route
					exact
					path="/"
					render={props => (
						<Layout {...props} postType={`page`}>
							<SinglePage {...props} />
						</Layout>
					)}
				/>
				<Route exact path="/404">
					<Layout allowLeadGen={false}>
						<Page404 />
					</Layout>
				</Route>
				<Route path="/">
					<Layout allowLeadGen={false}>
						<Page404 />
					</Layout>
				</Route>
			</Switch>
			<div id="scripts" className="link-button ">
				{/* <img src="https://cms.reliant-technology.com/wp-content/uploads/2020/05/Chat-Bot-Icon.png" alt="" /> */}
			</div>
		</div>
	);
}

export default App;
