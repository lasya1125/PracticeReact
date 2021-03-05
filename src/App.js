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

// TO DO: 
/*
  *Change size of Search Label / Correctly align label and searchbar
  *Do something about the bg
*/

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
  console.log(query);

  const [searchQuery, setSearchQuery] = useState(query || '');
  console.log(searchQuery);
  //creates an array of only relevant rows
  const filteredPosts = filterPosts(data, searchQuery);
  // after getting data this displays each item 
  return (
    <>
      <Router>
        <div>
          {/* Allows screenreaders to know that the table has changed */}
          <Announcer message={`Table has ${filteredPosts.length} rows`} />
          <Container>
            <Row className="justify-content-md-center">
              <h1>UNC App Lab Skills Tree</h1>
            </Row>

            <Row className="justify-content-md-center">
              <p>The Skills Tree is a resource to contact peers regarding questions or interests around a specific technology or area. If you would like to be included in this list and are open to being contacted about the skills you list, please fill out this form <a href="https://forms.gle/Tujwhgu6GEsY52zC6">here</a>.</p>
            </Row>

            <Row className="justify-content-md-center">
              <Search
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </Row>

          </Container>
          <Table striped bordered>
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
              {filteredPosts.map((item, i) => (
                <Fragment key={i}>
                  <tr>
                    <td>{item.Name}</td>
                    <td>{item.Email}</td>
                    <td>{item.Concat_Operating_System}</td>
                    <td>{item.Concat_Coding_Language}</td>
                    <td>{item.Concat_IDE}</td>
                    <td>{item.Concat_Framework}</td>
                    <td>{item.Concat_Application}</td>
                    <td>{item.Website}</td> 
                    {/* Max has two websites entered so how do we get href to put links separately */}
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </Table>
        </div>
      </Router>
    </>
  );

}

const filterPosts = (posts, query) => {
  if (!query) {
    return posts;
  }

  return posts.filter((post) => {
      const searchQuery = query.toLowerCase().trim();
      let concatArray = new Array();

      const codingLanguage = post.Concat_Coding_Language.toLowerCase();
      const application = post.Concat_Application.toLowerCase();
      const framework = post.Concat_Framework.toLowerCase();
      const ide = post.Concat_IDE.toLowerCase();
      const operatingsystem = post.Concat_Operating_System.toLowerCase();

      concatArray.push(codingLanguage);
      concatArray.push(application);
      concatArray.push(framework);
      concatArray.push(ide);
      concatArray.push(operatingsystem);

      //Checks to see if the term is present in the row
      for (let i = 0 ; i < concatArray.length ; i++){
        if (concatArray[i].includes(searchQuery)) {
          return true;
        }
      }
      return false;
  });
};

export default App;
