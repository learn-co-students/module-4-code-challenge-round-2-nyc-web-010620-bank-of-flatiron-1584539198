import React from "react";

const Transaction = (props) => {
  return (
    <tr>
      <td>{props.recipe.date}</td>
      <td>{props.recipe.description}</td>
      <td>{props.recipe.category}</td>
      <td>{props.recipe.amount}</td>
    </tr>
  );
};

export default Transaction;
