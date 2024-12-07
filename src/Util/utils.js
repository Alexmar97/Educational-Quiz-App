export const decodeHtmlEntities = (text) => {
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(text, "text/html")
    .documentElement.textContent;
  return decodedString;
};
