import React, { useEffect, useState } from 'react'
function App() {
  
  const [backendData, setBackendData] = useState<string>('');
  const URL = 'https://raw.githubusercontent.com/pittcsc/Summer2023-Internships/dev/README.md';

  useEffect(() => {
    fetch(URL).then(
      response => {return response.text()}
    ).then(
      data => {
        let splitData = data.substring(data.indexOf("Akuna")-1)
        splitData = splitData.substring(0, splitData.indexOf('<!--')-4)
        setBackendData(splitData);
      }
    )
  }, []);

  // [Name Of Company](link to company)? | Location | Description
  
  
  return (
    <div>
      {backendData ? (
        <p>{backendData}</p>
      ) : (
        "Loading..."
      )}
    </div>
  );
  
}

export default App;