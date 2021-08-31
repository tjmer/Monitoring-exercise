
const form = document.querySelector('form')
const preview = document.querySelector('#peoplePlace')
const peopleReturn = ({data: group}) => previewPerson(group)

const addpeople = body => axios.post('/api/people', body).then(peopleReturn)
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

function personInfo(group){
    const displayPlate = document.createElement('div')
    displayPlate.innerHTML = `<h4>${group.name}</h4><p>${group.age}</p><p>${group.color}`
}

function previewPerson(arr){
    preview.innerHTML = ''
    for (let i = 0; i < arr.length; i++){
        personInfo(arr[i])
    }
}

form.addEventListener('submit', submitHandler)
