import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {

  state = {
    allTransactions: [],
    copyTrans: [],
    search: '',
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
      .then(allTransactions => this.setState({allTransactions: allTransactions, copyTrans: allTransactions}))
  }

  handleSubmit = (e) => {
    fetch('http://localhost:6001/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(this.state.newTransaction)
    })
  }

  handleChange = (e) => {
    this.setState({ newTransaction: {...this.state.newTransaction, [e.target.name]: e.target.value } })
  }

  searchChange = (e) => {
    let changer = this.state.copyTrans
    this.setState({ search: e.target.value },
      () => { this.setState({
        allTransactions: this.state.copyTrans.filter(trans => trans.description.includes(this.state.search))
      }) }
    )
  }

  render() {
    return (
      <div>
        <Search searchChange={this.searchChange} />
        <AddTransactionForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} newTransaction={this.state.newTransaction}/>
        <TransactionsList recipes={this.state.allTransactions}/>
      </div>
    );
  }
}

export default AccountContainer;
