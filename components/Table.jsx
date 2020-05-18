const Table = ({ data, dateInput, valueInput, setData }) => {
  const onAdd = () => {
    const newData = data.slice();
    const dateValues = dateInput.current.value.split('-');
    newData.push({
      date: new Date(
        parseInt(dateValues[0], 10),
        parseInt(dateValues[1], 10),
        parseInt(dateValues[2], 10),
      ),
      value: valueInput.current.value,
    })
    setData(newData);

    dateInput.current.value = '';
    valueInput.current.value = '';
  };

  const onRemove = (dateToBeRemoved) => {
    const newData = data.slice().filter(({ date }) => (date !== dateToBeRemoved));
    setData(newData);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Value</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
      {data.map(({date, value}, index) => (
        <tr key={index}>
          <td>{date.toISOString()}</td>
          <td>{value}</td>
          <td><button onClick={() => {onRemove(date)}}>Remove</button></td>
        </tr>
      ))}
      <tr>
        <td><label>Date: <input ref={dateInput} id="dateInput" placeholder="YYYY-MM-DD"/></label></td>
        <td><label>Value: <input ref={valueInput} id="valueInput" type="number"/></label></td>
        <td><button id="add" onClick={onAdd}>Add</button></td>
      </tr>
      </tbody>
    </table>
  );
};

export default Table;