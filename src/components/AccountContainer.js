import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
const TRANSACTURL = 'http://localhost:6001/transactions'

class AccountContainer extends Component {
  state = {
    transactions: [],
    displayedTransactions: [],
    searchVal: '',
    alphabetical: false
  }

  componentDidMount() {
    fetch(TRANSACTURL)
    .then(resp => resp.json())
    .then(transactsJSON => {
      this.setState({
        transactions: transactsJSON,
        displayedTransactions: transactsJSON
      })
    })
  }

  addTransaction = newTransact => {
    let newTransactionList = [...this.state.transactions]
    newTransactionList.push(newTransact)
    this.setState({
      transactions: newTransactionList
    })
  }

  handleSearchChange = event => {
    let search = event.target.value
    let filtered = this.state.transactions.filter(transact => transact.description.toLowerCase().includes(search.toLowerCase()))
    this.setState({
      searchVal: search,
      displayedTransactions: filtered
    })
  }

  handleClickSort = event => {
    let button = event.target
    if (this.state.alphabetical) {
      let unsorted = this.state.transactions
      this.setState({
        displayedTransactions: unsorted,
        alphabetical: !this.state.alphabetical
      })
      button.innerText = "Sort By Description"
    } else {
      let sorted = [...this.state.transactions]
      sorted.sort((a,b) => a.description < b.description ? -1 : 1)
      this.setState({
        displayedTransactions: sorted,
        alphabetical: !this.state.alphabetical
      })
      button.innerText = "Sort By Date"
    }
  }

  acctTotal = () => {
    let n = 0
    this.state.transactions.forEach(t => n += t.amount)
    return n
  }

  render() {
    return (
      <div>
        <Search handleChange={this.handleSearchChange} />
        <button onClick={this.handleClickSort}>Sort By Description</button>
        <AddTransactionForm addTransaction={this.addTransaction} />
        <div>
          Account total: {
            Math.floor(this.acctTotal()*100)/100
          }
        </div>
        <TransactionsList transactions={this.state.displayedTransactions}/>
      </div>
    );
  }
}

export default AccountContainer;
