import React from 'react';

const Table = (props) => {
  <table>
    <thead>
      <tr>
        <th>{props.head}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{props.row}</td>
      </tr>
    </tbody>
    {props.children}
  </table>;
};

export default Table;
