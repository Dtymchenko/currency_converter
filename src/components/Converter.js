import './Converter.css';
import React from 'react'

export default function Converter({ value1, value2, rates }) {
    
    const [input1, setInput1] = React.useState(1)
    const [input2, setInput2] = React.useState(input1 * value1)
    const [fromCurrency, setFromCurrency] = React.useState("USD")
    const [toCurrency, setToCurrency] = React.useState("UAH")

    const onChangeFromValue = (e) => {
        setInput1(e.target.value)
        setInput2(input1 * rates[fromCurrency] / rates[toCurrency])
    }
    
    const onChangeToValue = (e) => {
        setInput2(e.target.value)
        setInput1(input2 / rates[fromCurrency] * rates[toCurrency])
    }

    const onChangeFromCurrency = (e) => {
        setFromCurrency(e.target.value)
        setInput2(input1 * rates[fromCurrency] / rates[toCurrency])
    }

    const onChangeToCurrency = (e) => {
        setToCurrency(e.target.value)
        setInput1(input2 / rates[fromCurrency] * rates[toCurrency])
    }

    React.useEffect(() => {
        setInput2(input1 * rates[fromCurrency] / rates[toCurrency])
    }, [input1, fromCurrency])

    React.useEffect(() => {
        setInput1(input2 / rates[fromCurrency] * rates[toCurrency])
    }, [input2, toCurrency])

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
