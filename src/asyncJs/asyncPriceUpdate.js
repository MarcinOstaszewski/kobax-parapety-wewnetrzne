function asyncPriceUpdate() {
  console.log(window.cenyZa1m2);
  const url = 'https://api.jsonsilo.com/public/a36f2d4c-03c8-40f3-8ece-c291e218b488';
  fetch(url)
    .then(response => {
      if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
      }
      return response.json();
    })
    .then(json => {
      // console.log('Data from JSON Silo: ', json);
      window.cenyZa1m2 = json;
    })
    .catch(error => {
      console.error(error.message);
    });
}