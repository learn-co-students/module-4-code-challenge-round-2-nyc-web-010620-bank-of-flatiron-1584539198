import React, { Component } from "react";

const initialState = { date: "", description: "", category: "", amount: ""}

class AddTransactionForm extends Component {

  state = initialState


  handleInput = (event) => {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  handleSubmit = (event) =>{
  event.preventDefault()

    fetch("http://localhost:3000/transactions", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
    },
    body: JSON.stringify(addTransaction)
    })
    .then(response => response.json())
    .then(transaction => {
      this.props.addTransaction(transaction)
    this.setState(initialState)
    })
    }



  
  render() {
    return (
      <div className="ui segment">
        <form className="ui form" onsubmit={this.handleSubmit}>
          <div className="inline fields">
            <input type="date" name="date" value={this.state.date}/>
            <input type="text" name="description" value={this.state.description} placeholder="Description" />
            <input type="text" name="category" value={this.state.category} placeholder="Category" />
            <input
            value={this.state.amount}
              type="number"
              name="amount"
              placeholder="Amount"
              step="0.01"
            />
          </div>
          <button className="ui button" type="submit">
            Add Transaction
          </button>
        </form>
      </div>
    );
  }
}

export default AddTransactionForm;
