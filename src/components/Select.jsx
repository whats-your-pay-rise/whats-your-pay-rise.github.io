import { v4 as uuid } from 'uuid';
import { useState } from 'react';

function Select(props) {
  const [id] = useState(uuid());

  return (
    <div className="input-group">
      <label
        className="input-group-text"
        htmlFor={id}>
        {props.label}
      </label>
      <select
        className="form-select form-select-lg"
        id={id}
        value={props.value}
        onChange={e => props.setValue(parseInt(e.target.value, 10))}
      >
        {props.options.map(option =>
          <option
            key={option}>
            {option}
          </option>)}
      </select>
    </div>
  );
}

export default Select;
