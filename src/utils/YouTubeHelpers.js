// take a URL entered in the CMS and turn it into a YouTube ID
// ex: 'https://www.youtube.com/watch?v=uGsf_ovOxJY' returns 'uGsf_ovOxJY'
// ref: https://stackoverflow.com/a/3452617/18005
export const GetYoutubeID = (youtubeUrl) => {
	var video_id = youtubeUrl.split('v=')[1];
	if (!video_id) {
		return null;
	}
	var ampersandPosition = video_id.indexOf('&');
	if (ampersandPosition !== -1) {
		video_id = video_id.substring(0, ampersandPosition);
	}
	return video_id;
}
