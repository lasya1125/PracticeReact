import removeHrefTag from "./removeHrefTag";

// Adds href tag to each individual link
const splitHrefTag = (urls) => {
  let hrefArray = urls.split(",");
  let newString = "";

  for (let i = 0 ; i < hrefArray.length ; i++){

    hrefArray[i] = hrefArray[i].trim();
    
    //removes any previous href tags to keep things clean
    hrefArray[i] = removeHrefTag(hrefArray[i]).trim();

    hrefArray[i] = '<a href="' + hrefArray[i] +'"> ' + hrefArray[i] + " </a>";

    if (i == 0) {
      newString = hrefArray[i];
    } else {
      newString = newString + ", " + hrefArray[i];
    }

  }
  return newString
}

export default splitHrefTag;