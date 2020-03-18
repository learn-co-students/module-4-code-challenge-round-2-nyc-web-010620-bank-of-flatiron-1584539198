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
    e.preventDefault();
    fetch('http://localhost:6001/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(this.state.newTransaction)
    }).then(resp => resp.json()).then(recipe => {
      let recipeIndex = this.state.allTransactions.findIndex(trans => trans.id === recipe.id)
      let copyTrans = [...this.state.allTransactions]
      copyTrans[recipeIndex] = recipe
      this.setState({
        allTransactions: copyTrans
      })
    })
  }

  handleChange = (e) => {
    this.setState({ newTransaction: {...this.state.newTransaction, [e.target.name]: e.target.value } })
  }

  render() {
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
