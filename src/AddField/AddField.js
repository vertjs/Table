import React, {useState} from 'react' // Добавление нового пользователя в таблицу

export default function AddField({updateData}) {
  const [addPerson, setAddPerson] = useState([])
  const [inputData, setInputData] = useState({
    'id': '',
    'firstName': '',
    'lastName': '',
    'email': '',
    'phone': ''
  })

  const handleAddInputPerson = () => setAddPerson(['id', 'firstName', 'lastName', 'email', 'phone'])
    
  const handleSubmite = (event) => {
    event.preventDefault()
    updateData(inputData)
    setAddPerson([])
  }

  const handleAddValueInput = ({target}) => {
    const {name, value} = target
    setInputData(prev => ({...prev, [name]: value}))
  }

  const checkKeyDisabled = (inputData) => {
    let arr = []
    let key
    for (key in inputData) {
      if(inputData[key].length > 0) {
        arr.push(inputData[key])
      }
    }
    if(arr.length === 5) {
      return true;
    }
  }

  return (
    <div>
      <button 
        onClick={handleAddInputPerson}
        className="btn btn-outline-secondary my-3 ml-0">Add person
      </button>
      {addPerson ? 
        <form onSubmit={handleSubmite}>
          {addPerson.map((el, i) => 
            <div className="col-auto d-flex justify-content-center" key={i}>
              <label className="sr-only" htmlFor="inlineFormInputGroup">{el}</label>
              <div className="input-group mb-2 w-50">
                <div className="input-group-prepend">
                  <div className="input-group-text">{el}</div>
                </div>
              <input type="text" className="form-control" id="inlineFormInputGroup" 
                name={el} placeholder={el} required onChange={handleAddValueInput} 
              />
              </div>
            </div>
          )}
          <button type="submit" className="btn btn-primary"
            disabled={!checkKeyDisabled(inputData)}>Добавить в таблицу
          </button>
        </form> 
        : null
      }
    </div>
  )
}