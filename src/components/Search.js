import React from "react";

class Search extends React.Component {
  state = { value: "" };

  onChange = event => {
    this.setState({ value: event.target.value });
    this.props.onSearch(event.target.value);
  };

  render() {
    return (
      <div className="ui large fluid icon input">
        <input
          type="text"
          value={this.state.value}
          placeholder={"Search your Recent Transactions"}
          onChange={this.onChange}
        />
        <i className="circular search link icon"></i>
      </div>
    );
  }
}

export default Search;
