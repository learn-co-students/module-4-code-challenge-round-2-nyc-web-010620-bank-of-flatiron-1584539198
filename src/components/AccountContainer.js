import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {
  state = {
    transactions: [],
    search: ""
  };

  componentDidMount() {
    fetch("http://localhost:3000/transactions")
      .then(response => response.json())
      .then(transactions => this.setState({ transactions: transactions }));
  }

  addTransaction = newTransaction => {
    this.setState({
      transactions: [...this.state.transactions, newTransaction]
    });
  };

  onSearch = searchTerm => {
    console.log(searchTerm);
    this.setState({ search: searchTerm });
  };

  // deleteTransaction = (transaction) => {
  //   fetch(`http://localhost:3000/transactions/${transaction}` {
  //     method: 'DELETE'
  //   });
  //   let newTransactions = this.state.transactions.filter ( t => t.id !== transaction)
  //   this.setState({transactions: newTransactions})
  // }
//slight syntax error, not enough time to figure it out

  render() {
    const transactions = this.state.transactions.filter(transaction =>
      transaction.description
        .toUpperCase()
        .includes(this.state.search.toUpperCase())
    );
    return (
      <div>
        <Search onSearch={this.onSearch} />
        <AddTransactionForm addTransaction={this.addTransaction} />
        <TransactionsList transactions={transactions} deleteTransaction={this.deleteTransaction}/>
      </div>
    );
  }
}

export default AccountContainer;
