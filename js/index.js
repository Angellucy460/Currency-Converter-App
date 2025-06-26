const amountInput = document.getElementById('amount');
const fromSelect = document.getElementById('from');
const toSelect = document.getElementById('to');
const resultElement = document.getElementById('result');
const form = document.querySelector('form');

// Map currency code to country code for flag-icons
const currencyToCountry = {
    USD: "us", EUR: "eu", GBP: "gb", JPY: "jp", AUD: "au", CAD: "ca", CHF: "ch", CNY: "cn", INR: "in", RUB: "ru",
    ZAR: "za", NZD: "nz", KRW: "kr", SGD: "sg", BRL: "br", MXN: "mx", HKD: "hk", TRY: "tr", AED: "ae", THB: "th",
    MYR: "my", PHP: "ph", IDR: "id", VND: "vn", PKR: "pk", SAR: "sa", NOK: "no", SEK: "se", DKK: "dk", PLN: "pl",
    CZK: "cz", HUF: "hu", ILS: "il", CLP: "cl", COP: "co", PEN: "pe", RON: "ro", BGN: "bg", HRK: "hr", SYP: "sy",
    DZD: "dz", EGP: "eg", MAD: "ma", TND: "tn", QAR: "qa", OMR: "om", KWD: "kw", BHD: "bh", JOD: "jo", LBP: "lb",
    YER: "ye", AFN: "af", BDT: "bd", LKR: "lk", MMK: "mm", KHR: "kh", MNT: "mn", LAK: "la", TWD: "tw", ARS: "ar",
    UYU: "uy", VEF: "ve", GHS: "gh", KES: "ke", TZS: "tz", UGX: "ug", ZMW: "zm", NGN: "ng", GEL: "ge", MDL: "md",
    AZN: "az", KZT: "kz", UZS: "uz", TMT: "tm", XOF: "sn", XAF: "cm", XPF: "pf", BWP: "bw", MUR: "mu", SCR: "sc",
    FJD: "fj", PGK: "pg", SLL: "sl", LRD: "lr", GMD: "gm", BIF: "bi", RWF: "rw", DJF: "dj", ERN: "er", SZL: "sz",
    MGA: "mg", ZWL: "zw", XCD: "ag", BSD: "bs", BBD: "bb", KYD: "ky", JMD: "jm", TTD: "tt", BMD: "bm", SRD: "sr",
    GYD: "gy", AWG: "aw", ANG: "an", KGS: "kg", TJS: "tj", XDR: "un", BAM: "ba", MKD: "mk", ALL: "al", KMF: "km"
};

// Function to update the flag icon next to a select
function updateFlag(selectId, flagId) {
    const select = document.getElementById(selectId);
    const flag = document.getElementById(flagId);
    const currency = select.value;
    const country = currencyToCountry[currency] || "un";
    flag.className = `flag-icon flag-icon-${country}`;
}

// Initial flag update on page load
updateFlag("from", "from-flag");
updateFlag("to", "to-flag");

// Update flag when selection changes
fromSelect.addEventListener("change", () => updateFlag("from", "from-flag"));
toSelect.addEventListener("change", () => updateFlag("to", "to-flag"));

// Currency conversion logic
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromSelect.value;
    const toCurrency = toSelect.value;

    if (isNaN(amount) || amount <= 0) {
        resultElement.textContent = 'Please enter a valid amount';
        return;
    }

    resultElement.textContent = 'Converting...';

    try {
        const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
        if (!response.ok) throw new Error('Failed to fetch rates');
        const data = await response.json();

        if (!data.rates || !data.rates[toCurrency]) {
            resultElement.textContent = "Conversion rate not available";
            return;
        }

        const rate = data.rates[toCurrency];
        const converted = (amount * rate).toFixed(3);

        resultElement.textContent = `${amount} ${fromCurrency} = ${converted} ${toCurrency}`;
    } catch (error) {
        resultElement.textContent = 'Error: ' + error.message;
    }
});