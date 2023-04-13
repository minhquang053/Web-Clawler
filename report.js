function printReport(pages, baseURL) {
    console.log(`Crawl result for ${baseURL}:`)
    pages = sortPages(pages)
    for (key in pages) {
        console.log(`Found ${pages[key]} internal links to ${key}`)
    }
}

function sortPages(pages) {
    sortedPages = {}
    reversePages = {}
    items = []
    for (key in pages) {
        items.push([key, pages[key]])
    }
    items.sort( (a, b) => {
        return b[1] - a[1]
    })
    for (item of items) {
        sortedPages[item[0]] = item[1]
    }
    return sortedPages
}

module.exports = {
    printReport,
    sortPages
}