const { JSDOM } = require('jsdom')

function normalizeURL(url) {
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

async function crawlPage(baseURL, currentURL, pages) {
    if (!currentURL.includes(baseURL)) {
        return pages
    }
    normalizedURL = normalizeURL(currentURL)
    if (normalizedURL in pages) {
        pages[normalizedURL]++
        return pages
    }
    pages[normalizedURL] = 1
    console.log(`crawling ${normalizedURL}`)
    try {
        const response = await fetch(currentURL)
        if (response.status > 399) {
            console.log(`HTTP Error: Status code ${response.status}`)
            return pages
        }
        const contentType = response.headers.get("Content-Type")
        if (!contentType.includes('text/html')) {
            console.log(contentType)
            console.log(`Got non-html response: ${contentType}`)
            return pages
        }
        htmlBody = await response.text()
        internalLinks = getURLsFromHTML(htmlBody, baseURL)
        for (link of internalLinks) {
            pages = await crawlPage(baseURL, link, pages)
        }
    } catch (err) {
        // console.log(err.message)
    }
    return pages
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}