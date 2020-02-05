import React, {useState} from 'react' // поисковая строка

export default function TableSearch({onSearch}) {
    const [value, setValue] = useState('')

    const valueChangeHandler = event => {
      setValue(event.target.value)
    }

    return (
      <div className="input-group my-3">
        <div className="input-group-prepend">
          <button 
            className="btn m-0 btn-outline-secondary"
            onClick={() => onSearch(value)}>Search
          </button>
        </div>
        <input 
          type="text" 
          className="form-control"
          onChange={valueChangeHandler} 
          value={value}
        />
      </div>
    )
}