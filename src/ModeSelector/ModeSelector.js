import React from 'react' // Главные кнопки загрузки данных (большой или малый)
import './ModeSelector.css'

export default function ModeSelector({onSelect}) {
  return (
    <div className="modeSelector d-flex justify-content-center align-content-center flex-nowrap">
      <button className="btn btn-primary col-sm-4 btn-lg d-flex justify-content-center" 
        type="submit"
        onClick={()=>onSelect('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}')}>
        Малый объем данных</button>
      <button className="btn btn-primary col-sm-4 btn-lg d-flex justify-content-center" 
        type="submit"
        onClick={()=>onSelect('http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}')}>
        Большой объем данных</button>
    </div>
  )
}
