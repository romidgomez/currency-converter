import Dropdown from 'react-dropdown';

export const CurrencyBlock = ({ amountType, amountValue, onChange, dropdownOptions, onSelectCurrency, dropdownType, dropdownValue }) => {
  return(
    <div className="d-flex align-center justify-content-between">
      <input
        name={ amountType }
        type="text"
        value={ amountValue }
        onChange={ onChange }
      />
      <Dropdown
        options={ dropdownOptions }
        onChange={ currency => onSelectCurrency(currency, dropdownType) }
        value={ dropdownValue }
      />
    </div>
  )
}