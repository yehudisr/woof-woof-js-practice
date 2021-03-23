
const body = document.querySelector('body')
const dogBar = body.querySelector('div#dog-bar')
const url = 'http://localhost:3000/pups'
const dogInfo = body.querySelector('div#dog-info')

const renderDogName = (dogObject) => {
    const span = document.createElement('span')
    span.dataset.id = dogObject.id
    span.innerText = dogObject.name
    span.style.cursor = 'pointer'
    dogBar.append(span)
}

const renderAllDogs = () => {
    fetch(url)
     .then(response => response.json())
     .then(dogsObject => {
         dogsObject.forEach(dogObject => renderDogName(dogObject))
     })
}


// const toggleGoodDog = (dogObject, event) => {
//  dogStatus = dogObject.isGoodDog
//     if (dogObject.isGoodDog === true){
//         event.target.innerText = "Bad Dog!"
//         dogObject.isGoodDog = false
//     } else {
//         event.target.innerText = "Good Dog!"
//         dogObject.isGoodDog = true
//     }
// }


const renderDog = (dogObject) =>{
    
    let goodDog = dogObject.isGoodDog
    if (dogObject.isGoodDog === true){
        goodDog = 'Good Dog!'
    } else {
        goodDog = 'Bad Dog!'
    }

    dogInfo.innerHTML = `
        <img src=${dogObject.image}>
        <h2>${dogObject.name}</h2>
        <button data-id=${dogObject.id}>${goodDog}</button>
    `
}


const fetchDog = (event) => {
        const id = event.dataset.id
       fetch(`${url}/${id}`)
        .then(response => response.json())
        .then(dogObject => renderDog(dogObject)) 
}

const patchDog = (event) => {
    const id = event.dataset.id
    let dogStatus = event.isGoodDog
   if (dogStatus === true){
       dogStatus = false
   } else {
       dogStatus = true
   }
  debugger

    fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            accept: 'application/json'
        },
        body: JSON.stringify({isGoodDog: dogStatus})
    })
//      .then(response => response.json())
//      .then(data => renderDog(data))
}

body.addEventListener('click', event => {
   
   if (event.target.matches('div#dog-bar span')){
        fetchDog(event.target)
   } else if (event.target.matches('div#dog-info button')){
  
        //   toggleGoodDog()
          patchDog(event.target)
   }

})
renderAllDogs()