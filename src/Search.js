import React from 'react';

//Creates the search bar at the top 
//the span class is used to allow screen readers to detect a search bar
const SearchBar = () => (
  <form action ="/" method ="get">
    <label htmlFor="header-search">
        <span className="visually-hidden">Search</span>
    <input 
      type="text"
      id="header-search"
      placeholder="Search"
      name="s"
      />
    </label>

  </form>

);

export default SearchBar;