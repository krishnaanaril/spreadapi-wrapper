import { SpreadClient } from "../src";

// Example user-defined type for their sheet data
interface Person {
  Name: string;
  Age: number;
  Email?: string; // Optional field
}

// Usage
const client = new SpreadClient({
  sheetUrl: 'https://script.google.com/macros/s/AKfycbyZSjAKBBt2kLpqpyCil9WTFUHUg8nnKRTnkw_v5f5RBBZp02QV2uVu_owPKg5AAUbG/exe',
  sheetName: 'Sheet1',  
  accessKey: 'Gakpo@15'
});

const newPeople: Person[] = [
  { Name: 'Arjun', Age: 38 },
  { Name: 'Aswath', Age: 40 }
];

client.insertRows<Person>(newPeople)
  .then(responses => {
    responses.forEach((response, index) => {
      if (response.success) {
        console.log(`Row ${index} inserted successfully`);
      } else {
        console.error(`Row ${index} failed: ${response.error}`);
      }
    });
  })
  .catch(error => console.error('Batch insert failed:', error));