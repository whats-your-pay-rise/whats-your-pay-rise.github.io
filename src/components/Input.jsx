import { v4 as uuid } from 'uuid';

function Input(props) {
  const id = uuid();

  return (
    <div className="input-group">
      <span className="input-group-text">
        £
      </span>
      <div className="form-floating">
        <input
          type="number"
          step="0.01"
          className="form-control"
          id={id}
          placeholder='placeholder'
          onChange={e => {
            props.setValue(e.target.valueAsNumber);
            props.isPristine(false);
          }} />
        <label htmlFor={id}>{props.label}</label>
      </div>
    </div>
  );
}

export default Input;
