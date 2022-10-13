import React, { useState, useEffect } from 'react';
import Converter from './components/Converter';
import constants from './constants';

import './App.css';

const App = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(null);
  const [rates, setRates] = useState(null);

  useEffect(() => {
    async function getData() {
      const actualData = await fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
      .then((response) => {
        return response.json()
      })
      .catch((err) => {
        console.warn(err)
        setError('No currency info');
      });

      setRates(actualData?.reduce((acc, item) => {
        acc[item.cc] = item.rate;
        return acc;
      }, { [constants.RATES.UAH]: 1 }));

      setDate(actualData?.[0]?.exchangedate);

      setIsLoading(false);
    }
    getData();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <div className="app">
      {error
        ? error
        : <>
          <header className="app-header">
            <h2>Official Currency Rates by National Bank of Ukraine</h2>
            <h3>Stated for {date}</h3>
            <div className="currency_rate_block">
              <div className="currency_rate_number">{rates[constants.RATES.USD]} UAH per 1 USD</div>
              <div className="divider"></div>
              <div className="currency_rate_number">{rates[constants.RATES.EUR]} UAH per 1 EUR</div>
            </div>
          </header>
          <Converter rates={rates} />
        </>
      }
    </div>
  );
};

export default App;
