import React, { useEffect, useState } from 'react'
import fetchData from './components/fetchData';
function App() {
  /*
  const [backendData, setBackendData] = useState(Object);

  useEffect(() => {
    fetch("/api").then(
      response => {return response.json()}
    ).then(
      data => {
        setBackendData(data);
      }
    )
  }, []);
  */

  /*
  return (
    <div>
      {backendData.users ? (
        backendData["users"].map((user: number, i: number) => {
          return <p key={i}>{user}</p>
        })
      ) : (
        "Loading..."
      )}
    </div>
  );
  */
 fetchData();
 return (
  <div>Hello</div>
 )
}

export default App;