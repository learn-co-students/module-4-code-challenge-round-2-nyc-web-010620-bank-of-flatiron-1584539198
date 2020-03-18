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
    body: JSON.stringify(this.state)
    })
    .then(response => response.json())
    .then(transaction => {
      this.props.addTransaction(transaction)
    this.setState(initialState)
    })
    }



  
  render() {
    const {date, description, category} = this.state
    return (
      <div className="ui segment">
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="inline fields">
            <input type="date" name="date" value={date} onChange={this.handleInput}/>
            <input type="text" name="description" value={description} placeholder="Description" onChange={this.handleInput}/>
            <input type="text" name="category" value={category} placeholder="Category"onChange={this.handleInput} />
            <input
            value={this.state.amount}
            onChange={this.handleInput}
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
