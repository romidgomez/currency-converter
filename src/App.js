import React, { Component, Fragment } from 'react'
import './css/App.css'
import ajaxCall from './helpers/ajax-call'
import 'react-dropdown/style.css'
import { CurrencyBlock } from './components'

const baseURL = 'https://api.exchangeratesapi.io/latest'
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
    ajaxCall(baseURL, this.setData)
  }

  componentWillUpdate( prevProps, prevState){
    const { fromCurrency, toCurrency } = prevState
    if( fromCurrency !== this.state.fromCurrency || toCurrency !== this.state.toCurrency ){
      ajaxCall(`${ baseURL }?base=${ fromCurrency }&symbols=${ toCurrency }`, this.changeCurrency)
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
      name === 'fromCurrency' ? isFromCurrency = true : isFromCurrency = false
      this.setState({ amount, isFromCurrency, displayErrorMessage: false })
    }
  }

  render(){
    const { currencyValues, fromCurrency, toCurrency, exchangeRate, amount, isFromCurrency, displayErrorMessage } = this.state
    let fromAmount, toAmount
    if( isFromCurrency ){
      fromAmount = amount
      toAmount = Number((amount * exchangeRate).toFixed(2))
    } else {
      fromAmount = Number((amount / exchangeRate).toFixed(2))
      toAmount = amount
    }
    return (
      <Fragment>
        { displayErrorMessage 
          ? <p className="error-label">Please input a number :)</p>
          : null
        } 
        <div className="container">
          <div className="d-flex align-center justify-center pr-20 pl-20">
            <CurrencyBlock
              dropdownType="fromCurrency"
              amountValue={ fromAmount }
              dropdownValue={ fromCurrency }
              onChange={ this.onChangeAmount }
              dropdownOptions={ currencyValues }
              onSelectCurrency={ this.onSelectCurrency }
            />
            <CurrencyBlock
              dropdownType="toCurrency"
              amountValue={ toAmount }
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