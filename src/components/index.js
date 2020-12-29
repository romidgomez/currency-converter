import Dropdown from 'react-dropdown';

export const CurrencyBlock = ({ amountValue, onChange, onSelectCurrency, dropdownType, dropdownOptions, dropdownValue }) => {
  return(
    <div className={`d-flex flex-column b-white currency-container ${ dropdownType === 'fromCurrency' ? 'b-white border-left' : 'b-grey border-right'}`}>
      <p className="bold pb-20">{ dropdownType === 'fromCurrency' ? 'You have' : 'You get' }</p>
      <div className="d-flex align-center justify-between">
        <input
          className="mr-10 w-100"
          name={ dropdownType }
          value={ amountValue }
          onChange={ onChange }
        />
        <Dropdown
          options={ dropdownOptions }
          onChange={ currency => onSelectCurrency(currency, dropdownType) }
          value={ dropdownValue }
        />
      </div>
    </div>
  )
}