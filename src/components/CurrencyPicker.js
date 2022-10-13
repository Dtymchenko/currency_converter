import React from 'react';
import PropTypes from 'prop-types';

const CurrencyPicker = ({ onInputChange, inputValue, onSelectChange, selectValue, rates }) => (
    <>
        <input type="number" min={0} value={inputValue} onChange={onInputChange} />
        <select onChange={onSelectChange} value={selectValue}>
            {Object.keys(rates).map(key => (
                <option key={key}>{key}</option>
            ))}
        </select>
    </>

);

CurrencyPicker.propTypes = {
    onInputChange: PropTypes.func.isRequired,
    onSelectChange: PropTypes.func.isRequired,
    selectValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    rates: PropTypes.shape()
};

export default CurrencyPicker;
