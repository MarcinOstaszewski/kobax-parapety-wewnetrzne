
// async function getData() {
//   const url = 'https://api.jsonsilo.com/public/a36f2d4c-03c8-40f3-8ece-c291e218b488';
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }

//     const json = await response.json();
//     return json;
//   } catch (error) {
//     console.error(error.message);
//   }
// }

// export async function updatePrices() {
//   const data = await getData();
//   console.log('Data from JSON Silo: ', data);
// }

// export function getJSONData(cenyZa1m2: unknown) {
  // const url = 'https://api.jsonsilo.com/public/a36f2d4c-03c8-40f3-8ece-c291e218b488';
  // fetch(url)
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error(`Response status: ${response.status}`);
  //     }
  //     cenyZa1m2 = response.json();
  //   })
  //   .then(json => {
  //     console.log('Data from JSON Silo: ', json);
  //   })
  //   .catch(error => {
  //     console.error(error.message);
  //   });
// }