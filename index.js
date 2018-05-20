"use strict";


/**
 * [youtubeOriginal get original url in youtube]
 * @param url  {[string]} 
 * @return {[object]}   [returned 3 quality videos]
 */

const youtubeOriginal = (url) => new Promise((Resolve, Reject) => {
    
    let sanitize = (str) => decodeURIComponent(str.substring(0, str.indexOf('\\\\')));

	url  = "https://cors-proxy.htmldriven.com/?url=" + url;
	let xhr  = new XMLHttpRequest();

	xhr.open('GET', url, true);

	xhr.onload = function () {

		var page = JSON.parse(xhr.responseText);

		if (xhr.readyState == 4 && xhr.status == "200") {

			var r = xhr.responseText;

            r = r.substring(r.indexOf('url_encoded_fmt_stream_map'), r.length);
            r = r.substring(r.indexOf('url=http') + 4, r.length);
            r = r.split('url=');

			Resolve({
				"high": sanitize(r[0]),
				"medium": sanitize(r[1]),
				"lower": sanitize(r[2]).replace(
					new RegExp('quality=medium', 'gi'), 'quality=lower'
				)
			});

		} else {

			Reject("Error load videos");

		}

	}

	xhr.send(null);

});
