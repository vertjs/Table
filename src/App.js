import React, { Component, Fragment }  from 'react' // Главный компонент (загрузка, сортировка, отрисовка, поиск)
import Loader  from './Loader/Loader'
import Table  from './Table/Table'
import DetailRowView  from './DetailRowView/DetailRowView'
import ModeSelector  from './ModeSelector/ModeSelector'
import _ from 'lodash'
import ReactPaginate from 'react-paginate'
import TableSearch from './TableSearch/TableSearch'
import AddField from './AddField/AddField'

class App extends Component {
  state = {
    isModeSelected: false,
    isLoading: false,
    data: [],
    search: '',
    sort: 'asc',  
    symb: '▲',
    sortField: 'id', 
    row: null,
    currentPage: 0,
  }

  async fetchData(url) { // загрузка
    const response = await fetch(url)
    const data = await response.json()
    this.setState({
      isLoading: false,
      data: _.orderBy(data, this.state.sortField, this.state.sort)
    })
  }

  onSort = sortField => { // сортировка
    const cloneData = this.state.data.concat()
    const sort = this.state.sort === 'asc' ? 'desc' : 'asc'
    const symb = this.state.symb === '▲' ? '▼' : '▲'
    const data = _.orderBy(cloneData, sortField, sort)
    
    this.setState({ data, sort, symb, sortField })
  }

  onRowSelect = rowSelect => { // выделенная строка для вывода описания
    this.setState({ row:rowSelect })
  }

  modeSelectHandler = url => { // состояние для компонента с выбором загрузки данных
    this.setState({
      isLoading: true,
      isModeSelected: true
    })
    this.fetchData(url)
  }

  pageChangeHandler = ({selected}) => { // пагинация
    this.setState({
      currentPage: selected
    })
  }

  onSearch = (text) => { //поиск на странице
    this.setState({
      search: text,
      currentPage: 0
    })
  }

  getFilteredData = () => { // фильтрация данных с учетом поискового запроса
    if (this.state.search) {
      return this.state.data.filter(item => {
        return item['firstName'].toLowerCase().includes(this.state.search.toLowerCase())
          || item['lastName'].toLowerCase().includes(this.state.search.toLowerCase())
          || item['email'].toLowerCase().includes(this.state.search.toLowerCase())
      })
    }
  }

  updateData = value => this.setState({data: this.state.data.concat(value)}) // обновление таблицы с учетом добавленного пользователя
  
  render() {
    const pageSize = 50
    let displayData = this.state.data
 
    if(!this.state.isModeSelected) 
    return <ModeSelector onSelect={this.modeSelectHandler}/>
    
    if(this.state.data.length > pageSize) {
      displayData = _.chunk(this.state.data, pageSize)[this.state.currentPage]
    }

    const filteredData = this.getFilteredData()
    let pageCount = 20

    if(filteredData) {
      pageCount = Math.ceil(filteredData.length / pageSize)
      displayData = filteredData
    }

    return (
      <div className="container">
      {
        this.state.isLoading 
        ? <Loader />
        : <Fragment>
            <TableSearch onSearch={this.onSearch} />
            <AddField data={displayData} updateData={this.updateData}/>
            <Table 
              data={displayData} 
              onSort={this.onSort}
              symb={this.state.symb}
              sortField={this.state.sortField}
              onRowSelect={this.onRowSelect}
            /> 
            { this.state.data.length > pageSize 
            ? <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.pageChangeHandler}
                containerClassName={'pagination justify-content-center'}
                activeClassName={'active'}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                nextClassName="page-item"
                previousLinkClassName="page-link"
                nextLinkClassName="page-link"
                forcePage={this.state.currentPage}
              />
            : null
            }
          </Fragment>
      }
      { this.state.row ? <DetailRowView person={this.state.row} /> : null }
      </div>
    )
  }
}

export default App;