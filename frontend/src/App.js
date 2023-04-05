import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState();

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
  },[]);

  return (
    <div className="App">
      {data && data.map((item) => {
        return (
          <div>
            <h1>{item.taskName}</h1>
            <h2>{item.taskDescription}</h2>
            <h3>{item.taskPriority}</h3>
          </div>
        )
      })}
    </div>
  );
}

export default App;
