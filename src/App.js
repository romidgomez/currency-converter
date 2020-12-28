import React, { Component, Fragment } from 'react'
import './css/App.css'
import fire from './helpers/fire'
import 'react-dropdown/style.css'
import { CurrencyBlock } from './components'
class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      currencyValues: [],
      fromCurrency: null,
      toCurrency: null,
      exchangeRate: null,
      amount: 1,
      isFromCurrency: true,
      displayErrorMessage: false
    }
  }

  componentWillMount(){
    fire('CURRENCIES_GET', this.setData)
  }

  componentWillUpdate( prevProps, prevState){
    const { fromCurrency, toCurrency } = prevState
    if( fromCurrency !== this.state.fromCurrency || toCurrency !== this.state.toCurrency ){
      const payload = { fromCurrency, toCurrency }
      fire('CHANGE_CURRENCIES_GET', this.changeCurrency, payload)
    }
  }

  setData = data => {
    const { rates, base } = data
    const defaultCurrency = Object.keys(rates)[1]
    const currencyValues = [ base, ...Object.keys(rates) ]
    const exchangeRate = rates[defaultCurrency]
    this.setState({ currencyValues, fromCurrency: base, toCurrency: defaultCurrency, exchangeRate })
  }

  changeCurrency = data => {
    const exchangeRate = data.rates[Object.keys(data.rates)[0]]
    this.setState({ exchangeRate })
  }

  onSelectCurrency = ( currency, type ) => {
    type === 'fromCurrency' ? this.setState({ fromCurrency: currency.value }) : this.setState({ toCurrency: currency.value })
  }

  onChangeAmount = e => {
    const { value, name } = e.target
    const amount = value
    if(isNaN(amount)){
      this.setState({ displayErrorMessage: true })
    } else {
      let isFromCurrency
      name === 'fromCurrencyAmount' ? isFromCurrency = true : isFromCurrency = false
      this.setState({ amount, isFromCurrency, displayErrorMessage: false })
    }
  }

  render(){
    const { currencyValues, fromCurrency, toCurrency, exchangeRate, amount, isFromCurrency, displayErrorMessage } = this.state
    let fromCurrencyAmount, toCurrencyAmount
    if( isFromCurrency ){
      fromCurrencyAmount = amount
      toCurrencyAmount = Number((amount * exchangeRate).toFixed(2))
    } else {
      fromCurrencyAmount = Number((amount / exchangeRate).toFixed(2))
      toCurrencyAmount = amount
    }
    return (
      <Fragment>
        { displayErrorMessage 
          ? <p className="error-label">This converter only accepts numbers!</p>
          : null
        } 
        <div className="d-flex align-center container">
          <div className="d-flex flex-column b-white currency-container border-left">
            <p className="bold pb-20">You have</p>
            <CurrencyBlock
              amountType="fromCurrencyAmount"
              amountValue={ fromCurrencyAmount }
              dropdownType="fromCurrency"
              dropdownValue={ fromCurrency }
              onChange={ this.onChangeAmount }
              dropdownOptions={ currencyValues }
              onSelectCurrency={ this.onSelectCurrency }
            />
          </div>
          <div className="d-flex flex-column b-grey currency-container border-right">
            <p className="bold pb-20">You get</p>
              <CurrencyBlock
                amountType="toCurrencyAmount"
                amountValue={ toCurrencyAmount }
                dropdownType="toCurrency"
                dropdownValue={ toCurrency }
                onChange={ this.onChangeAmount }
                dropdownOptions={ currencyValues }
                onSelectCurrency={ this.onSelectCurrency }
              />
          </div>
        </div>
      </Fragment>
    )
  }
}
export default App