import './App.css';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx';
import axios from 'axios';

function App() {

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  //const [file, setFile] = useState();


  // const {google} = require('googleapis');
  // const sheets = google.sheets('v4');

  // async function main () {
  //   const authClient = await authorize();
  //   const request = {
  //     // The spreadsheet to request.
  //     spreadsheetId: '1Si4u7vG-dbrfryb_HBKsWSYEzytpv7dcbWDWKbpU5Lk',  // TODO: Update placeholder value.

  //     // The ranges to retrieve from the spreadsheet.
  //     ranges: [],  // TODO: Update placeholder value.

  //     // True if grid data should be returned.
  //     // This parameter is ignored if a field mask was set in the request.
  //     includeGridData: true,  // TODO: Update placeholder value.

  //     auth: authClient,
  //   };

  //   try {
  //     const response = (await sheets.spreadsheets.get(request)).data;
  //     // TODO: Change code below to process the `response` object:
  //     console.log(JSON.stringify(response, null, 2));
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
  // main();

  // async function authorize() {
  //   // TODO: Change placeholder below to generate authentication credentials. See
  //   // https://developers.google.com/sheets/quickstart/nodejs#step_3_set_up_the_sample
  //   //
  //   // Authorize using one of the following scopes:
  //   //   'https://www.googleapis.com/auth/drive'
  //   //   'https://www.googleapis.com/auth/drive.file'
  //   //   'https://www.googleapis.com/auth/drive.readonly'
  //   //   'https://www.googleapis.com/auth/spreadsheets'
  //   //   'https://www.googleapis.com/auth/spreadsheets.readonly'
  //   let authClient = null;

  //   if (authClient == null) {
  //     throw Error('authentication failed');
  //   }

  //   return authClient;
  // }

  // useEffect(() => {
  //   const fetchFile = async () => {
  //     const result = await axios(
  //       'https://docs.google.com/spreadsheets/d/e/2PACX-1vTttdmJhe9Cg6QIIgK9YMcwZyHvyP4_F4xn8tYSL6ZNmcYwcUaFfUOD-jbbrklb4At7Ej8wG5y1OwUR/pub?gid=498153196&single=true&output=csv',
  //     );
 
  //     setFile(result.data);
  //   };
 
  //   fetchFile();
  // }, []);

  const processData = dataString => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
 
    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      if (headers && row.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] === '"')
              d = d.substring(1, d.length - 1);
            if (d[d.length - 1] === '"')
              d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }
 
        // remove the blank rows
        if (Object.values(obj).filter(x => x).length > 0) {
          list.push(obj);
        }
      }
    }
 
    // prepare columns list from headers
    const allColumns = headers.map(c => ({
      name: c,
      selector: c,
    }));

    const essentialColumns = [];
    allColumns.forEach(element => {
      if (element.name === "Name" || element.name === "Email" || element.name === "Github/Linkedin" 
      || element.name === "Concat_Operating_System" || element.name === "Concat_Coding_Language" 
      || element.name === "Concat_IDE" || element.name === "Concat_Framework" || element.name === "Concat_Application"){
        essentialColumns.push(element);
      }
    });
 
    setData(list);
    setColumns(essentialColumns);
    console.log(list);
    console.log(columns);

  }
 
  // handle file upload
  const handleFileUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
    };
    reader.readAsBinaryString(file);
  }
 
  return (
    <div>
      <h1> UNC App Lab Skills Tree </h1>
      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileUpload}
      />
      <DataTable
        pagination
        highlightOnHover
        columns={columns}
        data={data}
      />
    </div>
  );
}
 
export default App;
