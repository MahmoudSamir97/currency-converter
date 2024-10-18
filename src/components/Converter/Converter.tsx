import React, { useEffect, useState } from "react";
import Select from "../Select/Select";

const currencyOptions = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "CAD", label: "CAD" },
  { value: "INR", label: "INR" },
];

const Converter = () => {
  const [currencyValue, setCurrencyValue] = useState(1);
  const [convertFrom, setConvertFrom] = useState("USD");
  const [convertTo, setConvertTo] = useState("EUR");
  const [result, setResult] = useState(0);
  const [error, setError] = useState("");

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrencyValue(Number(e.target.value));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, dataset } = e.target;
    if (dataset.type === "from") {
      setConvertFrom(value);
    } else {
      setConvertTo(value);
    }
  };
  useEffect(() => {
    const controller = new AbortController();

    const signal = controller.signal;

    const fetchData = async () => {
      try {
        setError("");

        const URL = `https://api.frankfurter.app/latest?amount=${currencyValue}&from=${convertFrom}&to=${convertTo}`;

        const res = await fetch(URL, { signal });

        if (!res.ok) throw new Error("Error in fetching data");

        const data = await res.json();

        setResult(data.rates[convertTo]);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Unknown error occured");
        }
      }
    };
    if (currencyValue > 0) {
      fetchData();
    }
    return () => {
      controller.abort();
    };
  }, [currencyValue, convertFrom, convertTo]);

  return (
    <div className="converter">
      <input
        type="number"
        value={currencyValue ? currencyValue : ""}
        onChange={handleCurrencyChange}
      />
      <Select
        options={currencyOptions}
        type="from"
        value={convertFrom}
        onChangeFun={handleSelectChange}
      />
      <Select
        options={currencyOptions}
        type="to"
        value={convertTo}
        onChangeFun={handleSelectChange}
      />
      <h3>
        {result ? `Output: ${result ? result : ""}` : error && `${error}`}
      </h3>
    </div>
  );
};

export default Converter;
