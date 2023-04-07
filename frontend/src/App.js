import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch('http://localhost:8000/get-all-task')
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch the data");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch(err => console.log(err));
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      {data.result.length > 0 && data.result.map((task) => {
        return (
          <div>
            <h1>{task.taskId}</h1>
            <h1>{task.taskName}</h1>
            <h1>{task.taskDescription}</h1>
            <h1>{task.taskPriority}</h1>
          </div>
        );
      })}
    </div>
  );
}

export default App;
