import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {
  
  state={
    transactions: [],
    searchTerm: ""
  }
  
  componentDidMount(){
    fetch("http://localhost:6001/transactions")
      .then(resp => resp.json())
      .then(transactions => this.setState( {transactions} ))
  }

  handleOnSubmit=(transaction)=>{

    let formattedTransaction = {...transaction, amount: parseInt(transaction.amount)}

    fetch("http://localhost:6001/transactions", {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(formattedTransaction)
    })
  }

  handleSearch=(e)=>{
    this.setState( {searchTerm: e.target.value})
  }
  
  render() {

    let filteredTransactions = this.state.transactions.filter(transaction => transaction.description.toUpperCase().includes(this.state.searchTerm.toUpperCase()))

    return (
      <div>
        <Search searchTerm={this.state.searchTerm} handleSearch={this.handleSearch}/>
        <AddTransactionForm handleOnSubmit={this.handleOnSubmit}/>
        <TransactionsList transactions={filteredTransactions}/>
      </div>
    );
  }
}

export default AccountContainer;
