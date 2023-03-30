import "./App.css";
import React from "react";
import Converter from "./components/Converter";

function App() {
  const [date, setDate] = React.useState();
  const [value1, setValue1] = React.useState(0);
  const [value2, setValue2] = React.useState(0);

  React.useEffect(() => {
    async function getData() {
      const actualData = await fetch(
        "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
      )
        .then((response) => {
          return response.json();
        })
        .catch((err) => {
          console.warn(err);
          alert("Not received info");
        });
      const findUSD = actualData.find(
        (obj) => obj["cc"].toLowerCase() === "usd"
      );
      const findEUR = actualData.find(
        (obj) => obj["cc"].toLowerCase() === "eur"
      );
      setValue1(findUSD.rate);
      setValue2(findEUR.rate);
      setDate(findUSD.exchangedate);
    }
    getData();
  }, []);

  const rates = {
    UAH: 1,
    USD: value1,
    EUR: value2,
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Official Currency Rates by National Bank of Ukraine</h2>
        <h3>Stated for {date}</h3>
        <div className="currency_rate_block">
          <div className="currency_rate_number">{value1} UAH per 1 USD</div>
          <div className="divider"></div>
          <div className="currency_rate_number">{value2} UAH per 1 EUR</div>
        </div>
      </header>
      <Converter value1={value1} value2={value2} rates={rates} />
    </div>
  );
}

export default App;
