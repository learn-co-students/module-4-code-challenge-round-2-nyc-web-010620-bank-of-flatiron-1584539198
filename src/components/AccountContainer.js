import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {

  state = {
    allTransactions: [],
    newTransaction: {
      date: '',
      description: '',
      category: '',
      amount: ''
    }
  }

  componentDidMount(){
    fetch('http://localhost:6001/transactions')
      .then(resp => resp.json())
      .then(allTransactions => this.setState({allTransactions}))
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  handleChange = (e) => {
    this.setState({ newTransaction: {...this.state.newTransaction, [e.target.name]: e.target.value } })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <Search />
        <AddTransactionForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} newTransaction={this.state.newTransaction}/>
        <TransactionsList recipes={this.state.allTransactions}/>
      </div>
    );
  }
}

export default AccountContainer;
