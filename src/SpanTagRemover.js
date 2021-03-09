
// Function made to remove all the span tags added to search items before filtered
// Has to be done before filtering

const removeSpanTag = (posts) => {
    let stringOpTag = "<span class='highlighted'>";
    let stringClsTag = "</span>";
    for(let i = 0 ; i < posts.length ; i++){
      for (let key in posts[i]) {
       if( posts[i][key].includes(stringOpTag)){
         posts[i][key] = posts[i][key].slice(stringOpTag.length,posts[i][key].length-stringClsTag.length);
       }
      }
    }
  
    return posts;
  }
  
  export default removeSpanTag;