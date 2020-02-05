import React from 'react' // Подробное описание выбранного пользователя

export default function DetailRowView({person}) {
  
  return person.hasOwnProperty('address') ? 
      <div className="d-flex justify-content-center align-content-center flex-wrap">
        <div className="card text-center" style={{"width": "35rem"}}>
          <div className="card-body">
            <h5 className="card-title">Выбран пользователь <b>{person.firstName + ' ' + person.lastName}</b></h5>
            <p>
            Описание: <br />
            {person.description ? <textarea defaultValue={person.description} rows={5} cols={50}/> : null}
            
            </p>

            <p>Адрес проживания: <b>{person.address.streetAddress}</b></p>
            <p>Город: <b>{person.address.city}</b></p>
            <p>Провинция/штат: <b>{person.address.state}</b></p>
            <p>Индекс: <b>{person.address.zip}</b></p>
          </div>
        </div>
      </div>
      : null
    
} 