document.addEventListener("DOMContentLoaded", () => {
    const apiKey = '652d2784e6msh8adc1b7bcf4953ap1053e4jsnc10086b8288b';
    const apiUrl = 'https://currency-exchange.p.rapidapi.com/exchange';
    const currenciesContainer = document.querySelector('.currency-converter__currencies');
    const currencies = ['USD', 'EUR', 'CAD', 'CNY', 'CHF', 'SGD'];

    const fetchCurrencyRate = async (fromCurrency, toCurrency = 'RUB', amount = '1.0') => {
        try {
            const response = await axios.get(apiUrl, {
                params: { to: toCurrency, from: fromCurrency, q: amount },
                headers: {
                    'x-rapidapi-key': apiKey,
                    'x-rapidapi-host': 'currency-exchange.p.rapidapi.com'
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении курса ${fromCurrency}:`, error);
            return null;
        }
    };

    const createInitialCurrencyElements = () => {
        currencies.forEach(currency => {
            const currencyElement = document.createElement('li');
            currencyElement.className = 'currency-converter__currency';
            currencyElement.innerHTML = `
                <h3 class="currency-converter__currency-title">${currency}:</h3>
                <p class="currency-converter__currency-rate rate">-</p>
            `;
            currenciesContainer.appendChild(currencyElement);
        });
    };

    const updateCurrencyElement = async (currencyElement, currency) => {
        const rate = await fetchCurrencyRate(currency);
        if (rate !== null) {
            currencyElement.querySelector('.rate').textContent = `${rate.toFixed(2)}`;
        } else {
            currencyElement.querySelector('.rate').textContent = 'Ошибка';
        }
    };

    const updateCurrencies = () => {
        const currencyElements = document.querySelectorAll('.currency-converter__currency');
        currencyElements.forEach((currencyElement, index) => {
            const currency = currencies[index];
            updateCurrencyElement(currencyElement, currency);
        });
    };

    createInitialCurrencyElements();
    updateCurrencies();
    setInterval(updateCurrencies, 15 * 60 * 1000);
});
