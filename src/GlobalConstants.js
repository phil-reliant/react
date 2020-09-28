const GlobalConstants = {
	contactInfo: {
		phoneNumber: "(877) 227-0828",
		phoneNumberAsDialed: "18772270828" // allows for pauses, etc. in how the number is actually dialed VS how it is displayed
	},
	socialUrls: {
		twitter: "https://twitter.com/GoReliant",
		facebook: "https://www.facebook.com/ReliantTechnology",
		youtube: "https://www.youtube.com/user/relianttechnology",
		linkedin: "https://www.linkedin.com/company/reliant-technology"
	},
	pageTitlesAndCopy: {
		// NOTE:: Page404.title and Page404.body are not hardcoded as these pages should rarely be visited, and do not affect
		// every page, they could however be moved here if the 404 page needed to be further optimized for number of queries
		blogArchive: {
			title: "Reliant Blog"
		}
	},
	resources: {
		excerptMaxCharLength: 117, // for resources page excerpts
		shortExcerptMaxCharLength: 180, // for resources CTA module (ref: RTR-100 for length)
		blogExcerptMaxCharLength: 275
	}
}

export default GlobalConstants;
