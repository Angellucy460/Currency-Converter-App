const amountInput = document.getElementById('amount');
const fromSelect = document.getElementById('from');
const toSelect = document.getElementById('to');
const convertButton = document.getElementById('convert');
const resultElement = document.getElementById('result');


const API_URL = 'https://open.er-api.com/v6/latest/USD';

convertButton.addEventListener("click", async() => {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromSelect.value;
    const toCurrency = toSelect.value;


    if(isNaN(amount) || amount <= 0) {
        resultElement.textContext = 'Please enter a valid amount';
        return;
    }

    try {
        resultElement.textContent = 'Converting.....';
        const response = await fetch(API_URL + fromCurrency);
        if(!response.ok)throw new error('Failed to fetch rates');
        const data = await response.json();

        if(!data.conversion_rates || !data.conversion_rates[toCurrency]) {
            resultElement.textContent = "Conversion rate not available";
            return;
        };

     const rate = data.conversion_rates[toCurrency];
     const converted = (amount * rate).toFixed(3);

     resultElement.textContent = `${amount} ${fromCurrency} = ${converted} ${toCurrency}`;
    }catch(error) {
        resultElement.textContent = 'Error:' + error.message;
    };
});