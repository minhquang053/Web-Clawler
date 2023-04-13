const { test, expect } = require('@jest/globals')
const { sortPages } = require('./report.js')

test('sort pages', () => {
    const pages = {
        'wagslane.dev': 63,
        'wagslane.dev/tags': 62,
        'wagslane.dev/about': 62,
        'wagslane.dev/index.xml': 62,
        'wagslane.dev/tags/business': 1,
        'wagslane.dev/posts/dark-patterns': 2,
        'wagslane.dev/posts/things-i-dont-want-to-do-to-grow-business': 2
    }
    actual = sortPages(pages)
    const expected = {
        'wagslane.dev': 63,
        'wagslane.dev/tags': 62,
        'wagslane.dev/about': 62,
        'wagslane.dev/index.xml': 62,
        'wagslane.dev/posts/dark-patterns': 2,
        'wagslane.dev/posts/things-i-dont-want-to-do-to-grow-business': 2,
        'wagslane.dev/tags/business': 1,
    }
    expect(actual).toEqual(expected)
  })