import React, { Component } from "react";

class AddTransactionForm extends Component {
  render() {
    return (
      <div className="ui segment">
        <form className="ui form" onSubmit={this.props.handleSubmit}> 
          <div className="inline fields">
            <input onChange={this.props.handleChange} type="date" name="date" />
            <input onChange={this.props.handleChange} type="text" name="description" placeholder="Description" />
            <input onChange={this.props.handleChange} type="text" name="category" placeholder="Category" />
            <input onChange={this.props.handleChange} type="number" name="amount" placeholder="Amount" step="0.01" />
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
