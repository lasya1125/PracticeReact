import React from 'react';
import { useHistory } from 'react-router-dom';

//Creates the search bar at the top 
const SearchBar = ({searchQuery , setSearchQuery}) =>{
  const history = useHistory();
  //changes the url while suppressing the refresh
    const onSubmit = (e) => {
        history.push(`?s=${searchQuery}`);
        e.preventDefault();
    };


return (
  <form action ="/" method ="get" autoComplete="off" onSubmit={onSubmit}>
    <label htmlFor="header-search">
      {/* span class is to allow screen readers to know a search bar is there */}
        <span className="visually-hidden">Search</span>
    <input 
      value={searchQuery}
      onInput = {e => setSearchQuery(e.target.value)}
      type="text"
      id="header-search"
      placeholder="Search"
      name="s"
      />
    </label>

  </form>

);
};
export default SearchBar;