const weatherform = document.querySelector('form')
const input = document.querySelector('input')
const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')
const p3 = document.querySelector('#p3')


weatherform.addEventListener('submit', (e)=>{
    e.preventDefault()
    p1.innerHTML = 'Loading...'
    p2.innerHTML = ''
    p3.innerHTML = ''

    var address = input.value
    fetch('/weather?address=' + address)
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