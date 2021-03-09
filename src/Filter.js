import { stripHtml } from "string-strip-html";
import removeSpanTag from "./SpanTagRemover";

const filterPosts = (posts, query) => {
    posts = removeSpanTag(posts);
  
    if (!query) {
      return posts
    };
  
    return posts.filter((post) => {
  
      // seperate array of terms is created to restrict searches in those columns
       
      const searchQuery = query.toLowerCase().trim();
      let concatArray = new Array();
  
      
      const codingLanguage = post.Concat_Coding_Language.toLowerCase();
      const application = post.Concat_Application.toLowerCase();
      const framework = post.Concat_Framework.toLowerCase();
      const ide = post.Concat_IDE.toLowerCase();
      const operatingsystem = post.Concat_Operating_System.toLowerCase();
  
      concatArray.push(stripHtml(codingLanguage).result);
      concatArray.push(stripHtml(application).result);
      concatArray.push(stripHtml(framework).result);
      concatArray.push(stripHtml(ide).result);
      concatArray.push(stripHtml(operatingsystem).result);
  
      //check if search term is present
        for(let i = 0 ; i < concatArray.length ; i++){
          if (concatArray[i].includes(searchQuery)) {
            return true;
          }
        }
      
        return false;
    }).map((item)=> {
  
      //This is the section of code that allows for highlighting
      //React doesn't normally allow for scripts to be read through strings
      //Might be necessary for additional sanitazation. 
      let stringOpTag = "<span class='highlighted'>";
      let stringClsTag = "</span>";
       
      const searchQuery = query.toLowerCase().trim();
      let concatArray = new Array();
  
      const codingLanguage = item.Concat_Coding_Language.toLowerCase();
      const application = item.Concat_Application.toLowerCase();
      const framework = item.Concat_Framework.toLowerCase();
      const ide = item.Concat_IDE.toLowerCase();
      const operatingsystem = item.Concat_Operating_System.toLowerCase();
  
      concatArray.push(codingLanguage);
      concatArray.push(application);
      concatArray.push(framework);
      concatArray.push(ide);
      concatArray.push(operatingsystem);
  
      //Checks to see if the term is present in the row usin concat array
      //Adds highlighting to entire cell of original content to preserve casing
      for (let i = 0 ; i < concatArray.length ; i++){
       
        
        if (concatArray[i].includes(searchQuery)) {
          switch(i) {
            case 0:
              item.Concat_Coding_Language = stringOpTag + item.Concat_Coding_Language + stringClsTag;
              break;
            case 1:
              item.Concat_Application = stringOpTag + item.Concat_Application + stringClsTag;
              break;
            case 2: 
              item.Concat_Framework = stringOpTag + item.Concat_Framework + stringClsTag;
              break;
            case 3:
              item.Concat_IDE = stringOpTag + item.Concat_IDE + stringClsTag;
              break;
            case 4:
              item.Concat_Operating_System = stringOpTag + item.Concat_Operating_System + stringClsTag;
              break;
            default:
              break;
          }
        }
      }
        
        return item;
      }
  
      );
      
  };
  
  export default filterPosts;