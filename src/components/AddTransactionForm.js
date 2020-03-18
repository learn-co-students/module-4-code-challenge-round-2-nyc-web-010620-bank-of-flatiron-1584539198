import React, { Component } from "react";

class AddTransactionForm extends Component {
  
  state={
    date: "",
    description: "",
    category: "",
    amount: 0
  }

  handleOnChange=(e)=>{
    this.setState( {[e.target.name]: e.target.value})
    // this.setState( {amount: parseInt(e.target.value)} )
  }
  
  render() {
    return (
      <div className="ui segment" >
        <form className="ui form" onSubmit={() => this.props.handleOnSubmit(this.state)}>
          <div className="inline fields">
            <input type="date" name="date" value={this.state.date} onChange={this.handleOnChange}/>
            <input type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.handleOnChange}/>
            <input type="text" name="category" placeholder="Category" value={this.state.category} onChange={this.handleOnChange}/>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              step="0.01"
              value={this.state.amount}
              onChange={this.handleOnChange}
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
