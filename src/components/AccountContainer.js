import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {

  state = {
    transactions: [],
    filteredTransactions: [],
    search: "",
    date: "",
    description: "",
    category: "",
    amount: ""
  }

  componentDidMount() {
    fetch("http://localhost:6001/transactions")
    .then(response => response.json())
    .then(response => {
      this.setState({
        transactions: response,
        filteredTransactions: response
      })
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch("http://localhost:6001/transactions", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        date: this.state.date,
        description: this.state.description,
        category: this.state.category,
        amount: this.state.amount
      })
    }).then(response => response.json())
    .then(response => {
      this.setState({
        filteredTransactions: [...this.state.filteredTransactions,response]
      })

    })
  }

  handleSearch = (event) => {
    this.setState({
      search: event.target.value
    }, () => {
      this.setState({
       filteredTransactions: this.state.transactions.filter(trans => trans.description.includes(this.state.search))
      })
    })
  }

  handleDelete = (e) => {
    let foundTransIndex = this.state.filteredTransactions.findIndex(trans => trans.id === e.target.id)
    let copyArr = [...this.state.filteredTransactions]
    copyArr.splice(foundTransIndex,1)
    this.setState({
      filteredTransactions: copyArr
    })
    fetch(`http://localhost:6001/transactions/${e.target.id}`, {
      method: "DELETE"
    })
  }
  


  render() {
    return (
      <div>
        <Search handleSearch={this.handleSearch} search={this.state.search}/>
        <AddTransactionForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} newTransaction={this.state}/>
        <TransactionsList transactions={this.state.filteredTransactions} handleDelete={this.handleDelete}/>
      </div>
    );
  }
}

export default AccountContainer;
