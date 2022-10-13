import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import CurrencyPicker from './CurrencyPicker';
import constants from '../constants';

import './Converter.css';

const Converter = ({ rates }) => {
    const [fromValue, setFromValue] = useState(1);
    const [toValue, setToValue] = useState(0);
    const [fromCurrency, setFromCurrency] = useState(constants.RATES.USD);
    const [toCurrency, setToCurrency] = useState(constants.RATES.UAH);

    useEffect(() => {
        setToValue((fromValue * rates[constants.RATES.USD]).toFixed(2));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rates]);

    const onChangeFromValue = useCallback((e) => {
        setFromValue(e.target.value);
        setToValue((e.target.value * rates[fromCurrency] / rates[toCurrency]).toFixed(2));
    },[rates, fromCurrency, toCurrency]);

    const onChangeToValue = useCallback((e) => {
        setToValue(e.target.value);
        setFromValue((e.target.value / rates[fromCurrency] * rates[toCurrency]).toFixed(2));
    },[rates, fromCurrency, toCurrency]);

    const onChangeFromCurrency = useCallback((e) => {
        setFromCurrency(e.target.value);
        setToValue((fromValue * rates[e.target.value] / rates[toCurrency]).toFixed(2));
    },[fromValue, rates, toCurrency]);

    const onChangeToCurrency = useCallback((e) => {
        setToCurrency(e.target.value);
        setFromValue((toValue / rates[fromCurrency] * rates[e.target.value]).toFixed(2));
    },[toValue, rates, fromCurrency]);

    return (
        <div className="converter_main_block">
            <h1>Currency Converter</h1>
            <div className="converter_main_item">
                <CurrencyPicker
                    selectValue={fromCurrency}
                    onSelectChange={onChangeFromCurrency}
                    onInputChange={onChangeFromValue}
                    inputValue={fromValue}
                    rates={rates}
                />
            </div>
            <div className="converter_main_item">
                <CurrencyPicker
                    selectValue={toCurrency}
                    onSelectChange={onChangeToCurrency}
                    onInputChange={onChangeToValue}
                    inputValue={toValue}
                    rates={rates}
                />
            </div>
        </div>
    );
};

Converter.propTypes = {
    rates: PropTypes.shape()
}

export default Converter;
