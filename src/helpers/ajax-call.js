const ajaxCall = (URL, action) => {
   var xhr = new XMLHttpRequest()
   xhr.onload = function() {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      const response = JSON.parse(xhr.response)
      action(response)
    } else {
      console.error(JSON.parse(xhr.responseText))
    }
  }
  xhr.onerror = function() {
    console.error(JSON.parse(xhr.responseText))
  }
  xhr.open('GET', URL)
  xhr.send()
}

export default ajaxCall