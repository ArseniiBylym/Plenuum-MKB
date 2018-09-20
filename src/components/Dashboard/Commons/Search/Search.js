import React from 'react';
import './Search.css';

const Search = (props) => {

  return (
    <div className={props.layout} onChange={props.searchFor}>
      {props.image ? <img className="search-img" src={props.image} alt=""/> : ''}
      <input
        type="text"
        name="search"
        placeholder="Search..."
        defaultValue={props.defaultValue} autoFocus/>
    </div>
  );
};

export default Search;
