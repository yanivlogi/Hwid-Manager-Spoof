const axios = require('axios');
const readline = require('readline');

function calculatePrice(weight) {
    if (weight >= 0.01 && weight <= 0.14) {
        return 500;
    } else if (weight <= 0.60) {
        return 800;
    } else if (weight <= 1.00) {
        return 1000;
    } else if (weight <= 1.50) {
        return 1200;
    } else if (weight <= 2.00) {
        return 1400;
    } else if (weight <= 3.00) {
        return 1800;
    } else if (weight <= 3.50) {
        return 2200;
    } else if (weight <= 4.00) {
        return 2600;
    } else if (weight <= 5.00) {
        return 2800;
    } else {
        return "Weight out of range";
    }
}

async function fetchExchangeRates() {
    const apiKey = 'bf1f0438fcfdab5b276fcf31'; // Replace 'YOUR_API_KEY' with your actual API key
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
    
    try {
        const response = await axios.get(apiUrl);
        return response.data.conversion_rates.ILS;
    } catch (error) {
        console.error('Error fetching exchange rates:', error.message);
        return null;
    }
}

// Conversion function
async function convertUSDToILS(amountUSD) {
    const exchangeRate = await fetchExchangeRates();
    if (exchangeRate !== null) {
        return amountUSD * exchangeRate;
    } else {
        return null;
    }
}

// Example usage
async function convertUSDToILS(amountUSD) {
    const exchangeRate = await fetchExchangeRates();
    if (exchangeRate !== null) {
        return amountUSD * exchangeRate;
    } else {
        return null;
    }
}


function promptForWeight() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question('Enter the weight in carats: ', (weight) => {
            rl.close();
            resolve(parseFloat(weight));
        });
    });
}


// Main function to handle the conversion process
async function main() {
    
    const weight = await promptForWeight();
    const amountUSD = calculatePrice(weight);

    if (!isNaN(amountUSD)) {
        const amountILS = await convertUSDToILS(amountUSD);
        if (amountILS !== null) {
            console.log('Amount in ILS:', amountILS.toFixed(2));
        } else {
            console.log('Failed to fetch exchange rates.');
        }
    } else {
        console.log('Invalid input for weight.');
    }
}

// Run the main function
main();