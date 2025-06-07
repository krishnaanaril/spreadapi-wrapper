import { SpreadClient } from "../src";

// Example user-defined type for their sheet data
interface Person {
  Name: string;
  Age: number;
  Email?: string; // Optional field
}

// Usage
const client = new SpreadClient({
  sheetUrl: 'https://script.google.com/macros/s/AKfycbyZSjAKBBt2kLpqpyCil9WTFUHUg8nnKRTnkw_v5f5RBBZp02QV2uVu_owPKg5AAUbG/exec',
  sheetName: 'Sheet1',  
  accessKey: 'Gakpo@14'
});

const newPeople: Person[] = [
  { Name: 'Suresh Raju', Age: 62 },
  { Name: 'Gadha Mohan', Age: 68 }
];

// client.getRow<Person>(35)
//   .then(response => console.log('Row 35:', response))
//   .catch(error => console.error('Error fetching row 35:', error));

// client.insertRows<Person>(newPeople)
//   .then(responses => {
//     responses.forEach((response, index) => {
//       if (response.success) {
//         console.log(`Row ${index} inserted successfully`);
//       } else {
//         console.error(`Row ${index} failed: ${response.error}`);
//       }
//     });
//   })
//   .catch(error => console.error('Batch insert failed:', error));

client.getRows<Person[]>({limit: 10})
  .then(response => response.forEach((row, index) => {
    console.log(row.status, row.data ? row.data : `Row ${index + 1} not found`, row.error ? `Error: ${row.error.code}` : '');
  }))
  .catch(error => console.error('Error fetching all rows:', error));

// fetch("https://script.google.com/macros/s/AKfycbyZSjAKBBt2kLpqpyCil9WTFUHUg8nnKRTnkw_v5f5RBBZp02QV2uVu_owPKg5AAUbG/exec", {
//   method: "POST",  
//   body: JSON.stringify({
//     method: "GET",
//     sheet: "Sheet1",
//     key: "Gakpo@15",
//     id: 2
//   })
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error("Error:", error));