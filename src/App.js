import './App.css';
import React, { useState, useEffect, Fragment } from 'react';
import Table from 'react-bootstrap/Table'

import Tabletop from "tabletop";
import Table from 'react-bootstrap/Button';

function App() {

  const [data, setData] = useState([]);

  // tabletop uses the google sheets key to pull the data
  useEffect(() => {
    Tabletop.init({
      key: "1Si4u7vG-dbrfryb_HBKsWSYEzytpv7dcbWDWKbpU5Lk",
      simpleSheet: true
    })
      .then((data) => setData(data))
      .catch((err) => console.warn(err));
  }, []);

  // after getting data this displays each item 
  return (
    <>
      <h1>UNC App Lab Skills Tree</h1>
      {/* <Table striped bordered hover variant="dark"> */}
      <table>
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
        {data.map((item, i) => (
          <Fragment key={i}>
            <tr>
            <td>{item.Name}</td>
            <td>{item.Email}</td>
            <td>{item.Concat_Operating_System}</td>
            <td>{item.Concat_Coding_Language}</td>
            <td>{item.Concat_IDE}</td>
            <td>{item.Concat_Framework}</td>
            <td>{item.Concat_Application}</td>
            <td><a  href={item.Website}>{item.Website}</a></td>
            </tr>
          </Fragment>
        ))}
        </tbody>
      {/* </Table> */}
      </table>
    </>
  );

}

export default App;
