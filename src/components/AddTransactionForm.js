import React, { Component } from "react";

const intialState = { date: "", description: "", category: "", amount: ""}

class AddTransactionForm extends Component {

  state = intialState

  // handleSubmit = (event) => {
  //   event.preventDefault()
  //   fetch('http://localhost:3000/transactions', {
  //     method: "POST",
  //     headers: {
  //       "content-type" : "application/json",
  //       accept: 'application/json'
  //     }
  //     )
  // }


  render() {
    return (
      <div className="ui segment">
        <form className="ui form">
          <div className="inline fields">
            <input type="date" name="date" />
            <input type="text" name="description" placeholder="Description" />
            <input type="text" name="category" placeholder="Category" />
            <input
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
