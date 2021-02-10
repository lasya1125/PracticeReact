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
    <Col sm={2}>
      {/*  Add inline text css for size */}
  <Form.Label> Search </Form.Label>
  </Col>
  {/* <Col sm={10}> */}
  <Col sm={10}>
  <form action ="/" method ="get" autoComplete="off" onSubmit={onSubmit}>
    <Form.Control
      value={searchQuery}
      onInput = {e => setSearchQuery(e.target.value)}
      type="text"
      id="header-search"
      placeholder="What are you looking for?"
      name="s"
      />
    {/* </label> */}
  </form>
  </Col>
  {/* </Col> */}
  </Form.Group>
  </Form>

);
};
export default SearchBar;