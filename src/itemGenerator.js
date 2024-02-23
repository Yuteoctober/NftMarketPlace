import fs from 'fs';

const startDate = new Date('2023-11-20');
const endDate = new Date('2024-03-22'); // End date adjusted for 5 months

let data = [];
let sold = 0; // Initial sold count

for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    // Generate a random fluctuation factor
    const fluctuation = Math.random() * 0.2 - 0.1; // Fluctuate between -0.1 and 0.1

    // Increase sold count gradually with fluctuations
    sold += Math.floor(2 + sold * 0.05) * (1 + fluctuation);

    // Ensure sold count does not go below 0
    if (sold < 0) {
        sold = 0;
    }

    // Ensure sold count does not exceed 100
    if (sold > 100) {
        sold = 100;
    }

    data.push({ day: formattedDate, sold: Math.round(sold) });
}

const jsonData = JSON.stringify(data, null, 2);

fs.writeFileSync('sales_data.json', jsonData, 'utf-8');

console.log('JSON file generated successfully.');
