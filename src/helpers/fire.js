const fire = (type, handleData, payload) => {
  let URL
  switch(type){
    case 'CURRENCIES_GET':
      URL = 'https://api.exchangeratesapi.io/latest'
      break
    case 'CHANGE_CURRENCIES_GET':
      URL = `https://api.exchangeratesapi.io/latest?base=${ payload.fromCurrency }&symbols=${ payload.toCurrency }` 
      break
    default:
      URL = null 
  }
   var xhr = new XMLHttpRequest()
   xhr.onload = function () {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      const response = JSON.parse(xhr.response)
      handleData(response)
    }
  }
   xhr.open('GET', URL)
   xhr.send()
}

export default fire