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
    this.setState({
      ...this.state.allTransactions, newTransaction: { [e.target.name]: e.target.value } })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <Search />
        <AddTransactionForm />
        <TransactionsList recipes={this.state.allTransactions}/>
      </div>
    );
  }
}

export default AccountContainer;
