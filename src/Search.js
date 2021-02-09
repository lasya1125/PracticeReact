import React from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//Creates the search bar at the top 
const SearchBar = ({searchQuery , setSearchQuery}) =>{
  const history = useHistory();
  //changes the url while suppressing the refresh
    const onSubmit = (e) => {
        history.push(`?s=${searchQuery}`);
        e.preventDefault();
    };


return (
  <Form>
  <Form.Group as={Row} controlId="formSearchBar">
  <Form.Label column="lg" sm={4}> Search </Form.Label>
  <Col sm={10}>
  <form action ="/" method ="get" autoComplete="off" onSubmit={onSubmit}>
    {/* <label htmlFor="header-search">
      {/* span class is to allow screen readers to know a search bar is there */
        /*<span className="visually-hidden">Search</span> */}
    <Form.Control
      value={searchQuery}
      onInput = {e => setSearchQuery(e.target.value)}
      type="text"
      id="header-search"
      placeholder="Search"
      name="s"
      />
    {/* </label> */}
  </form>
  </Col>
  </Form.Group>
  </Form>

);
};
export default SearchBar;