import React from 'react' // таблица с данными

export default function Table({data, onSort, symb, sortField, onRowSelect}) {

  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={onSort.bind(null, 'id')}>
            ID {sortField === 'id' ? <small>{symb}</small> : null}
          </th>
          <th onClick={onSort.bind(null, 'firstName')}>
            First Name {sortField === 'firstName' ? <small>{symb}</small> : null}
          </th>
          <th onClick={onSort.bind(null, 'lastName')}>
            Last Name {sortField === 'lastName' ? <small>{symb}</small> : null}
          </th>
          <th onClick={onSort.bind(null, 'email')}>
            E-mail {sortField === 'email' ? <small>{symb}</small> : null}
          </th>
          <th onClick={onSort.bind(null, 'phone')}>
            Phone {sortField === 'phone' ? <small>{symb}</small> : null}
          </th>
        </tr>
      </thead>
      <tbody>
        { data.map(item => (
          <tr key={item.id + item.phone} onClick={onRowSelect.bind(null, item)}>
            <td>{item.id}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
          </tr>
        )) }
      </tbody>
    </table>
  )
}
