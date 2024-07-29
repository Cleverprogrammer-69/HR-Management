export const extractErrorMessage = (errorHtml: string): string => {
  // Load the HTML string into Cheerio
const match = errorHtml?.match(/Error: .*?\./);
if (match) {
  return match[0].trim();
}
return "An unknown error occurred.";
};
