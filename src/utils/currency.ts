const API_KEY = "YOUR_API_KEY"; // I couldn't handle the API key from the website you have provided.

export const fetchExchangeRates = async (baseCurrency: string) => {
   try {
      const response = await fetch(
         `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`
      );
      const data = await response.json();
      return data.conversion_rates;
   } catch (error) {
      console.error("Error fetching exchange rates:", error);
      return null;
   }
};
