import React from "react";

import PropTypes from "prop-types";

import './style.scss';

const Filter = ({ onChangeFilter }) => {
  return (
    <div className="filter">
      <label>Find Contacts by name</label>
      <input
        id="contact-search-field"
        type="text"
        name="search-field"
        className="filter__search-field"
        title="Filter Value"
        onChange={onChangeFilter}
      />
    </div>
  )
}

Filter.propTypes = {
  onChangeFilter: PropTypes.func.isRequired
}

export default Filter;
