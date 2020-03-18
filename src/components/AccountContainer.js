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
    this.setState({ search: e.target.value },
      () => { this.setState({
        allTransactions: this.state.copyTrans.filter(trans => trans.description.includes(this.state.search))
      }) }
    )
  }

 sortTransactions = (e) => {
    if (e.target.innerText === "Date"){
      return this.state.allTransactions = this.setState({allTransactions: this.state.allTransactions.sort((a,b) => b.date - a.date)})
    } else if (e.target.innerText === "Description"){
      return this.state.allTransactions = this.setState({allTransactions: this.state.allTransactions.slice().sort((a,b) => a.description.localeCompare(b.description))})
    } else if (e.target.innerText === "Category"){
      return this.state.allTransactions = this.setState({allTransactions: this.state.allTransactions.slice().sort((a,b) => a.category.localeCompare(b.category))})
    } else if (e.target.innerText === "Amount"){
      return this.state.allTransactions = this.setState({allTransactions: this.state.allTransactions.sort((a,b) => b.amount - a.amount)})
    }
  }

  render() {
    return (
      <div>
        <Search searchChange={this.searchChange} />
        <AddTransactionForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} newTransaction={this.state.newTransaction}/>
        <TransactionsList recipes={this.state.allTransactions} copyTrans={this.state.copyTrans} sortThis={this.sortTransactions}/>
      </div>
    );
  }
}

export default AccountContainer;
