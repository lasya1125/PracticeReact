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
import filterPosts from "./Filter";
import splitHrefTag from "./addHrefTag";


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


export default App;
