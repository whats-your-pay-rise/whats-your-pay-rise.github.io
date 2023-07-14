import { v4 as uuid } from 'uuid';

function Select(props) {
  const id = uuid();

  return (
    <div className="input-group mb-3 px-3">
      <label
        className="input-group-text rounded-0 bg-body"
        htmlFor={id}>
        {props.label}
      </label>
      <select
        className="form-select form-select-lg rounded-0"
        id={id}
        value={props.value}
        onChange={e => {
          props.setValue(parseInt(e.target.value, 10));
          props.isPristine(false);
        }}>
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
