
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    document.querySelector("#place").textContent = "Loading ..."
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            document.querySelector('#place').textContent = data.error
        }
        else{
            document.querySelector('#place').innerHTML = data.location
            document.querySelector('#forecast').innerHTML = data.forecast
        }
    })
})
})

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })
