import './Converter.css';
import React from 'react'

export default function Converter({ value1, value2, rates }) {
    
    const [input1, setInput1] = React.useState(1)
    const [input2, setInput2] = React.useState(input1 * value1)
    const [fromCurrency, setFromCurrency] = React.useState("USD")
    const [toCurrency, setToCurrency] = React.useState("UAH")

    React.useEffect(() => {
        setInput2((input1 * value1).toFixed(2))
    }, [value1])

    const onChangeFromValue = React.useCallback((e) => {
        setInput1(e.target.value)
        setInput2((e.target.value * rates[fromCurrency] / rates[toCurrency]).toFixed(2))
    },[rates, fromCurrency, toCurrency]) 
    
    const onChangeToValue = React.useCallback((e) => {
        setInput2(e.target.value)
        setInput1((e.target.value / rates[fromCurrency] * rates[toCurrency]).toFixed(2))
    },[rates, fromCurrency, toCurrency]) 

    const onChangeFromCurrency = React.useCallback((e) => {
        setFromCurrency(e.target.value)
        setInput2((input1 * rates[e.target.value] / rates[toCurrency]).toFixed(2))
    },[input1, rates, toCurrency]) 

    const onChangeToCurrency = React.useCallback((e) => {
        setToCurrency(e.target.value)
        setInput1((input2 / rates[fromCurrency] * rates[e.target.value]).toFixed(2))
    },[input2, rates, fromCurrency]) 

    return (
    <div className='converter_main_block'>
        <h1>Currency Converter</h1>
        <div className='converter_main_item'>
            <input type="number" value={input1} onChange={onChangeFromValue}></input>
            <select onChange={onChangeFromCurrency}>
                <option>USD</option>
                <option>EUR</option>
                <option>UAH</option>
            </select>
        </div>
        <div className='converter_main_item'>
            <input type="number" value={input2} onChange={onChangeToValue}></input>
            <select onChange={onChangeToCurrency}>
                <option>UAH</option>
                <option>USD</option>
                <option>EUR</option>
            </select>
        </div> 
    </div>
    )
}
