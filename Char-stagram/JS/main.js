window.addEventListener('DOMContentLoaded', (e)=>{
    console.log('page loaded')

    //Load Element
    const savedIndex = new Set()
    const stories = document.querySelectorAll('.storyHolders')
    function findRandomIndex(set){
        const randomIndex = Math.floor(Math.random() * 731)

        if(!set.has(`${randomIndex}`)){
            set.add(`${randomIndex}`)
            console.log('random found!')
            return randomIndex
        }
        else return findRandomIndex(set)
    }
    stories.forEach(story=>{
        const randomIndex = findRandomIndex(savedIndex)

        fetch(`https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/4590cf6fea30735552d1ffe341a2cc8b/${randomIndex}`)
            .then(data => {
                if(!data.ok){
                    throw new Error(`Error: ${response.status} - ${response.statusText}`)
            } 
                return data.json()
            })
            .then(data => {
                // console.log(data)
                if(data.response === 'error'){
                    searchBar.setAttribute('placeholder', 'No char found')
            } else {
                    

                const charImage = data.image.url
                // const charName = `${Object.values(data.biography)}`.split(',')[0]

                console.log(`image and name work ${data.name}, ${data.name}`)

                const pfpElement = story.querySelector('img')
                const nameElement = story.querySelector('h5')

                pfpElement.src = `${charImage}`
                nameElement.innerText = `${data.name}`
                nameElement.id = `${randomIndex}`
            }
        })
        .catch(err =>{
            console.log('Error Occurred', err)
        })
    })

    //Redirect Button
    const mediumProfiles = document.getElementsByClassName('mediumProfiles')
    const smallProfiles = document.getElementsByClassName('smallProfiles')

    for(let profiles of mediumProfiles){
        profiles.addEventListener('click', ()=>{
            console.log('medium profile button clicked!')
            const name = profiles.parentElement.getElementsByTagName('h5')[0]
            window.location.href = `http://localhost:9999/user/${name.innerText}/${name.id}`
        })
    }
    for(let profiles of smallProfiles){
        profiles.addEventListener('click', ()=>{
            console.log('small profile button clicked!')
            const name = profiles.parentElement.parentElement.getElementsByClassName('profileInfo')[0].childNodes[1]
            window.location.href = `http://localhost:9999/user/${name.innerText}/${name.id}`
        })
    }
    


    const search = document.getElementById('search')
    const searchButton = document.getElementById('search-button')

    searchButton.addEventListener('click', (e)=>{
        const value = search.value.trim().toLowerCase()
        if(value){
            const searchBar = document.getElementById('search')
            const searchDiv = document.getElementById('searchDiv')
            searchBar.value = ''
            
            
            fetch(`https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/4590cf6fea30735552d1ffe341a2cc8b/search/${value}`)
            .then(data => {
                if(!data.ok){
                    throw new Error(`Error: ${response.status} - ${response.statusText}`)
                } 
                return data.json()
            })
            .then(data => {
                console.log(data)
                if(data.response === 'error'){
                    searchBar.setAttribute('placeholder', 'No char found')
                } else {
                    // console.log(data.results.length, "before loop")
                    for(let i=0; i< data.results.length; i++){
                        const newProfile = document.createElement('div')
                        newProfile.setAttribute('class', 'searchResults')
                        const currChar = data.results[i]
                        // console.log('current character', currChar)

                        const charImage = currChar.image.url
                        const charName = `${Object.values(currChar.biography)}`.split(',')[0]

                        // console.log(`image and name work ${charImage}, ${charName}`)

                        newProfile.innerHTML= `
                        <img src="${charImage}" alt="" class="searchPfp" id="">
                        <div id="${data.results[i].name}/${data.results[i].id}">
                            <h5 id="${i}">${charName}(${currChar.name})</h5>
                        </div>
                        `
                        searchDiv.appendChild(newProfile)

                        newProfile.addEventListener('click', ()=>{
                            console.log('clicked')
                            const url = newProfile.querySelector('div').id
                            // console.log(url)
                            window.location.href = `http://localhost:9999/user/${url}`
                        })

                    }
                }
            })
            .catch(err =>{
                console.log('Error Occurred', err)
            })
        }
        
       
    })
})