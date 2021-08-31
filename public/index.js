
const form = document.querySelector('form')
const addpeople = body => axios.post('/api/people', body).then((res)=>{
    console.log(res)
})
function submitHandler(e){
    e.preventDefault()

    const personName = document.querySelector('#name')
    const personAge = document.querySelector('#age')
    const favColor = document.querySelector('#favcolor')
    
    let bodyObj = {
        name: personName.value,
        age: personAge.value,
        color: favColor.value
    }

    addpeople(bodyObj)

     personName.value = ''
     personAge.value = ''
     favColor.value = ''
}


form.addEventListener('submit', submitHandler)
