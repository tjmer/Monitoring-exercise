

const form = document.querySelector('form')
const preview = document.querySelector('#peoplePlace')
const peopleReturn = ({data: group}) => previewPerson(group)
const getPeople = ()=> axios.get('/api/people').then(peopleReturn)

const addpeople = body => axios.post('/api/people', body).then(peopleReturn)
function submitHandler(e){
    e.preventDefault()
    const personName = document.querySelector('#name')
    const personAge = document.querySelector('#age')
    const favColor = document.querySelector('#favcolor')
    if (personName.value != '' && personAge.value != '' && favColor.value != ''){ 
        let bodyObj = {
            name: personName.value,
            age: personAge.value,
            color: favColor.value
        }
        
        addpeople(bodyObj)
        
        personName.value = ''
        personAge.value = ''
        favColor.value = ''
    }else if (personName.value === '' && personAge.value === '' && favColor.value === ''){
        console.log("Missing name, age and color.")
    }else{
        console.log('missing info')
    }
    }
    
    function personInfo(group){
    const displayPlate = document.createElement('div')
    displayPlate.innerHTML = `<h4>${group.name}</h4><p>${group.age}</p><p>${group.color}`
    
    preview.appendChild(displayPlate)
}

function previewPerson(arr){
    preview.innerHTML = ''
    for (let i = 0; i < arr.length; i++){
        personInfo(arr[i])
    }
}

form.addEventListener('submit', submitHandler)
getPeople()