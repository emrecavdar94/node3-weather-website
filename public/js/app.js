// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('#search')
const locationText = document.querySelector('#message-1')
const forecastText = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault() //sayfa yenilenmesin diye
    const location = search.value
    locationText.textContent = 'Loading...'
    forecastText.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                locationText.textContent = data.location
                forecastText.textContent = data.forecast
            }
        })
    })
})