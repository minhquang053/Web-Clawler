const { JSDOM } = require('jsdom')

function normalizeURL(url) {
    // url = url.toLowerCase()
    
    // if (url.includes("://")) {
    //     url = url.slice(url.indexOf("://") + 3)
    // }
    // return url
    const urlObject = new URL(url, 'https://example.org')
    normalizedURL = `${urlObject.hostname}${urlObject.pathname}`
    if (normalizedURL.length > 0 && normalizedURL.slice(-1) === '/') {
        normalizedURL = normalizedURL.slice(0, -1)
    }
    return normalizedURL
}

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody)
    const aElements = dom.window.document.querySelectorAll('a')
    const urls = []
    let url
    aElements.forEach((aElelment) => {
        if (aElelment.href[0] === '/') {
            try {
                url = new URL(aElelment.href, baseURL).href
            } catch (err) {
                console.log(err.message)
            }
        } else {
            try {
                url = new URL(aElelment.href).href
            } catch (err) {
                console.log(err.message)
            }
        }
        urls.push(url)
    })
    return urls
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
}