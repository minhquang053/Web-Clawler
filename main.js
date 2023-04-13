const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')

async function main() {
    const args = process.argv.slice(2)

    if (args.length < 1) {
        console.log("No website provided")
        return
    }
    if (args.length > 1) {
        console.log("Too many arguments provided")
        return 
    }

    const baseURL = args[0]

    pages = await crawlPage(baseURL, baseURL, {})
    printReport(pages, baseURL)
}

main()
