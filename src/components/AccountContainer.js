import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
const TRANSACTURL = 'http://localhost:6001/transactions'

class AccountContainer extends Component {
  state = {
    transactions: [],
    displayedTransactions: [],
    searchVal: ''
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

  render() {
    return (
      <div>
        <Search handleChange={this.handleSearchChange} />
        <AddTransactionForm addTransaction={this.addTransaction} />
        <TransactionsList transactions={this.state.displayedTransactions}/>
      </div>
    );
  }
}

export default AccountContainer;
