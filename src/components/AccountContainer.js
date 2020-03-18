import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
const TRANSACTURL = 'http://localhost:6001/transactions'

class AccountContainer extends Component {
  state = {
    transactions: []
  }

  componentDidMount() {
    fetch(TRANSACTURL)
    .then(resp => resp.json())
    .then(transactJSON => {
      this.setState({
        transactions: transactJSON
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

  render() {
    return (
      <div>
        <Search />
        <AddTransactionForm addTransaction={this.addTransaction} />
        <TransactionsList transactions={this.state.transactions}/>
      </div>
    );
  }
}

export default AccountContainer;
