const searchForm = document.querySelector('form')
const locationButton = document.querySelector('#location')
const input = document.querySelector('input')
const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')
const p3 = document.querySelector('#p3')


searchForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    p1.innerHTML = 'Loading...'
    p2.innerHTML = ''
    p3.innerHTML = ''

    var address = input.value
    fetch('/weather-search?address=' + address)
    .then((response) => response.json())
    .then((data) => {
        if(data.error){
            p1.innerHTML = data.error
            p2.innerHTML = 'Try Again'
            p3.innerHTML = ''
        }
        else{
            p1.innerHTML = data.location
            p2.innerHTML = data.description
            p3.innerHTML = data.forecast
        }
    })
})

locationButton.addEventListener('click', ()=>{
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser')
    }

    p1.innerHTML = 'Loading...'
    p2.innerHTML = ''
    p3.innerHTML = ''

    locationButton.setAttribute('disable', 'disable')

    navigator.geolocation.getCurrentPosition((position)=>{
        const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
        fetch(`/weather-location?latitude=${location.latitude}&longitude=${location.longitude}`)
        .then((response) => response.json())
        .then((data) => {
            if(data.error){
                p1.innerHTML = data.error
                p2.innerHTML = 'Try Again'
                p3.innerHTML = ''
            }
            else{
                p1.innerHTML = `<a href=${data.link} target="_blank">Your Current Location</a>`
                p2.innerHTML = data.description
                p3.innerHTML = data.forecast
            }
        })
    })    
})