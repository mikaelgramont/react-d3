const Table = ({ data, dateInput, valueInput, onAdd }) => {
  return (
    <table>
      <thead>
      <td>Date</td>
      <td>Value</td>
      <td>Remove</td>
      </thead>
      <tbody>
      {data.map(({date, value}, index) => (
        <tr key={index}>
          <td>{date.toISOString()}</td>
          <td>{value}</td>
          <td><button>Remove</button></td>
        </tr>
      ))}
      <tr>
        <td><label>Date: <input ref={dateInput} id="dateInput" placeholder="YYYY/MM/DD"/></label></td>
        <td><label>Value: <input ref={valueInput} id="valueInput" type="number"/></label></td>
        <td><button id="add" onClick={onAdd}>Add</button></td>
      </tr>
      </tbody>
    </table>
  );
};

export default Table;