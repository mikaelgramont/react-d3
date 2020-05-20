const WeekTable = ({ data, dateInput, valueInput, setData }) => {
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

  const onRemove = (weekToBeRemoved) => {
    const newData = data.slice().filter(({ week }) => (week !== weekToBeRemoved));
    setData(newData);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Week</th>
          <th>Count</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
      {data.map(({week, posts}, index) => (
        <tr key={index}>
          <td>{week}</td>
          <td>{posts}</td>
          <td><button onClick={() => {onRemove(week)}}>Remove</button></td>
        </tr>
      ))}
      {dateInput && valueInput && (
        <tr>
        <td><label>Date: <input ref={dateInput} id="dateInput" placeholder="YYYY-MM-DD"/></label></td>
        <td><label>Value: <input ref={valueInput} id="valueInput" type="number"/></label></td>
        <td><button id="add" onClick={onAdd}>Add</button></td>
        </tr>
      )}
      </tbody>
    </table>
  );
};

export default WeekTable;