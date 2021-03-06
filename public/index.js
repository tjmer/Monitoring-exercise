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
        alert('Missing name, age and color')
        console.log("Missing name, age and color.")
        Rollbar.critical("No info input");
    }else{
        alert('Missing info')
        console.log('missing info')
        Rollbar.warning("One or more fields not filled")
    }
    }
    
    function personInfo(group){
    const displayPlate = document.createElement('div')
    displayPlate.innerHTML = `<section class = "box"><h3>${group.name}</h3><p>Age: ${group.age}</p><p>Favorite Color: ${group.color}</p></section>`
    
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