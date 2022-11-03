async function fetchData() {
  
  const URL = 'https://raw.githubusercontent.com/pittcsc/Summer2023-Internships/dev/README.md';

  return fetch(URL).then((response) => {
    return response.text();
  }).then(function(data) {
    console.log(data);
  });
}

export default fetchData;
