import React from 'react';
import PropTypes from 'prop-types';

import './Filter.module.css';

 const Filter = ({ filter, onChange }) => (
    <div>
      Find contacts by name
    <label>
      <input type="text" placeholder="Contacts name" value={filter} onChange={onChange} />
    </label>
    </div>
  );

  Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };


  export default Filter;
