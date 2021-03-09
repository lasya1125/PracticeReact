// Removes previous href tags on links to clean it up
const removeHrefTag = (url) => {
  
    let closingTag = "</a>";
  
    if(url.includes("<a href='")) {
      let fullOpeningIndex = url.indexOf(">") + 1;
      return url.slice(fullOpeningIndex, url.length - closingTag.length);
    }
  
    return url;
  }

  export default removeHrefTag;