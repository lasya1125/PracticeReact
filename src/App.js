import './App.css';
import React, { useState, useEffect, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabletop from "tabletop";
import Table from 'react-bootstrap/Table';
import Search from './Search';
import { BrowserRouter as Router } from "react-router-dom";
import Announcer from './announcer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import parse from "html-react-parser";
import { stripHtml } from "string-strip-html";

function App() {

  const [data, setData] = useState([]);

  // tabletop uses the google sheets key to pull the data
  useEffect(() => {
    Tabletop.init({
      key: "1Si4u7vG-dbrfryb_HBKsWSYEzytpv7dcbWDWKbpU5Lk", //1Si4u7vG-dbrfryb_HBKsWSYEzytpv7dcbWDWKbpU5Lk
      simpleSheet: true
    })
      .then((data) => setData(data))
      .catch((err) => console.warn(err));
  }, []);

  //stores the url of the current website
  const { search } = window.location;

  //stores the search query
  const query = new URLSearchParams(search).get('s');

  const [searchQuery, setSearchQuery] = useState(query || '');
  console.log(searchQuery);
  //creates an array of only relevant rows
  let copy = [...data];
  const filteredPosts = filterPosts(copy, searchQuery);
  if(filteredPosts[0]){
  console.log(filteredPosts[0].Website);
  }
  // after getting data this displays each item 



  return (  
    <>
    <Router>
    <div>
      {/* Allows screenreaders to know that the table has changed */}
    <Announcer message={`Table has ${filteredPosts.length} rows`}/>
    <Container>
  <Row className="justify-content-md-center">
      <h1>UNC App Lab Skills Tree</h1>
    </Row>
  <Row className="justify-content-md-center">
      <Search 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
  </Row>
       
      </Container>
      <Table bordered>
        <thead> 
          <th> Name </th>
          <th> Email </th>
          <th> OS </th>
          <th> Coding Language </th>
          <th> IDEs </th>
          <th> Frameworks </th>
          <th> Application </th>
          <th> Additional Info </th>
        </thead>
        <tbody>
        {filteredPosts.map((item, i) => {
          return (
      
          <Fragment key={i}>
              <tr>
              <td>{item.Name}</td>
              <td>{item.Email}</td>
              {/* Parse function is necessary for the html span tag to show up*/}
              <td>{parse(item.Concat_Operating_System)}</td>
              <td>{parse(item.Concat_Coding_Language)}</td>
              <td>{parse(item.Concat_IDE)}</td>
              <td>{parse(item.Concat_Framework)}</td>
              <td>{parse(item.Concat_Application)}</td>
              <td>{parse(splitHrefTag(item.Website))}</td>
            </tr>
          </Fragment>
        )})}
        </tbody>
      </Table>
      </div>
      </Router>
    </>
  );

}

// Removes previous href tags on links to clean it up
const removeHrefTag = (url) => {
  
  let closingTag = "</a>";

  if(url.includes("<a href='")) {
    let fullOpeningIndex = url.indexOf(">") + 1;
    return url.slice(fullOpeningIndex, url.length - closingTag.length);
  }

  return url;
}

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

export default App;
