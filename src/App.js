import './App.css';
import React, { useState, useEffect, Fragment } from 'react';

import Tabletop from "tabletop";

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
      <ul>
        {data.map((item, i) => (
          <Fragment key={i}>
            <li>Name - {item.Name}</li>
            <li>Email - {item.Email}</li>
            <li>Operating Systems - {item.Concat_Operating_System}</li>
            <li>Coding Languages - {item.Concat_Coding_Language}</li>
            <li>IDEs - {item.Concat_IDE}</li>
            <li>Frameworks - {item.Concat_Framework}</li>
            <li>Application - {item.Concat_Application}</li>
            <li>Additional Info - {item.Website}</li>
            <br />
          </Fragment>
        ))}
      </ul>
    </>
  );

}

export default App;
