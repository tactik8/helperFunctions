
import { extractUrlsFromString } from './yourFileName'; // Assuming the function is in a file named 'yourFileName.js'

describe('extractUrlsFromString', () => {

  // Test case 1: Basic URLs with http, https, and www
  test('should extract basic http, https, and www URLs', () => {
    const input = "Visit our site at http://example.com or https://secure.net. Find info at www.info.org/page";
    const expected = ["http://example.com", "https://secure.net", "www.info.org/page"];
    expect(extractUrlsFromString(input)).toEqual(expected);
  });

  // Test case 2: String with no URLs
  test('should return an empty array for a string with no URLs', () => {
    const input = "This is a plain string without any links or URLs.";
    const expected = [];
    expect(extractUrlsFromString(input)).toEqual(expected);
  });

  // Test case 3: Empty string
  test('should return an empty array for an empty string', () => {
    const input = "";
    const expected = [];
    expect(extractUrlsFromString(input)).toEqual(expected);
  });

  // Test case 4: Input is not a string (number)
  test('should return an empty array for non-string input like a number', () => {
    const input = 12345;
    const expected = [];
    expect(extractUrlsFromString(input)).toEqual(expected);
  });

  // Test case 5: Input is not a string (null)
  test('should return an empty array for null input', () => {
    const input = null;
    const expected = [];
    expect(extractUrlsFromString(input)).toEqual(expected);
  });

  // Test case 6: Input is not a string (undefined)
  test('should return an empty array for undefined input', () => {
    const input = undefined;
    const expected = [];
    expect(extractUrlsFromString(input)).toEqual(expected);
  });

  // Test case 7: Input is not a string (object)
  test('should return an empty array for object input', () => {
    const input = { url: "http://example.com" };
    const expected = [];
    expect(extractUrlsFromString(input)).toEqual(expected);
  });

  // Test case 8: Input is not a string (array)
  test('should return an empty array for array input', () => {
    const input = ["http://example.com"];
    const expected = [];
    expect(extractUrlsFromString(input)).toEqual(expected);
  });


  // Test case 9: String with duplicate URLs
  test('should return unique URLs in order of first appearance', () => {
    const input = "Visit http://example.com, then www.site.net, and again http://example.com.";
    const expected = ["http://example.com", "www.site.net"];
    expect(extractUrlsFromString(input)).toEqual(expected);
  });

  // Test case 10: URLs with paths, queries, and fragments
  test('should handle URLs with paths, queries, and fragments', () => {
    const input = "Check this: https://example.com/path/subpath?query=param&another=val#section1. And ftp://fileserver.org/data.zip";
    const expected = ["https://example.com/path/subpath?query=param&another=val#section1", "ftp://fileserver.org/data.zip"];
    expect(extractUrlsFromString(input)).toEqual(expected);
  });

  // Test case 11: URLs at the beginning and end of the string
  test('should extract URLs at the start and end of the string', () => {
    const input = "https://start.com/page Find something in the middle. And www.end.net";
    const expected = ["https://start.com/page", "www.end.net"];
    expect(extractUrlsFromString(input)).toEqual(expected);
  });

   // Test case 12: Multiple URLs close together
   test('should handle multiple URLs close together', () => {
    const input = "Link1: https://link1.com Link2: http://link2.org/data";
    const expected = ["https://link1.com", "http://link2.org/data"];
    expect(extractUrlsFromString(input)).toEqual(expected);
  });

  // Test case 13: URLs with different TLDs
  test('should handle URLs with different TLDs', () => {
    const input = "Site: https://domain.co.uk, Another: www.test.info, Yet another: http://global.foundation";
    const expected = ["https://domain.co.uk", "www.test.info", "http://global.foundation"];
    expect(extractUrlsFromString(input)).toEqual(expected);
  });

   // Test case 14: URLs with hyphens and numbers in domain/path
   test('should handle URLs with hyphens and numbers', () => {
    const input = "Check this: https://my-website-123.com/page-456?item=abc-def. And www.data-789.net";
    const expected = ["https://my-website-123.com/page-456?item=abc-def", "www.data-789.net"];
    expect(extractUrlsFromString(input)).toEqual(expected);
  });

   // Test case 15: URL with unusual but valid characters in path/query
   // The regex seems to handle common ones, let's test some edge cases allowed by RFCs but might not be in the simplified regex.
   // Note: The provided regex for path/query `[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*` correctly matches `%`, ` ` (because it's allowed within `[]`), `&`, `~`.
   test('should handle URLs with specific allowed special characters in path/query', () => {
    const input = "Test: https://example.com/path%20with space/another_path?query=value%26more#anchor~tilda";
    const expected = ["https://example.com/path%20with space/another_path?query=value%26more#anchor~tilda"];
    expect(extractUrlsFromString(input)).toEqual(expected);
  });


  // Test case 16: String containing only a URL
  test('should extract URL if the string contains only a URL', () => {
    const input = "http://only-url.com";
    const expected = ["http://only-url.com"];
    expect(extractUrlsFromString(input)).toEqual(expected);
  });

});
