window.addEventListener('DOMContentLoaded', (e)=>{
    console.log('page loaded')
    //LoadPage
    const url =  window.location.href
    let name = url.split('/')[4]
    console.log(name)

    if(name.includes('%20')){
        name = name.split('%20').join(' ')
    }
    
    const userName = document.getElementById('username')
    userName.innerText = `@${name}`

    name = url.trim().toLowerCase()
    console.log(name)



    let urlInfo = url.split('/user/')[1]
    let idInfo = url.split(`/`)[5]
    // console.log(urlInfo, idInfo)

    

    fetch(`https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/4590cf6fea30735552d1ffe341a2cc8b/${url.split('/')[5]}`)
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
            const imageElement = document.getElementById('pfp')
            const nameElement = document.getElementById('name')
            // console.log(data.id, data.name)

            imageElement.src = data.image.url
            nameElement.innerText = `${Object.values(data.biography)}`.split(',')[0]

            let connections = 0
            const groups = Object.values(data.connections)
            groups.forEach(friends =>
                connections += friends.length
            )
            connectionsElement = document.getElementById('connectionCount')
            connectionsElement.innerText = `${connections} connections`
            
            const val1 = Object.values(data.appearance)
            const val2 = Object.values(data.biography)
            const val3 = Object.values(data.powerstats)
            
            // console.log(data.powerstats)
            // console.log(`${Object.values(data.powerstats)}`)
            // console.log(`${val3[4]}`)
            
            const statements = createBio(`${val2[2]}`, `${val2[6]}`, `${val2[5]}`, `${val2[3]}`, `${val1[0]}`, `${val1[2]}`, `${val1[3]}`, `${val3[1]}`, `${val3[2]}`, `${val3[0]}`, `${val3[4]}`, `${val3[3]}`, `${val3[5]}`)

            const bio = document.getElementById('bio')
            bio.innerText = `${statements[0]}... ${statements[1]}... ${statements[2]}`
            // bio.innerHTML = `<h5>Description</h5>${statements[0]} <h5>Physical</h5>${statements[1]} <h5>Stats</h5>${statements[2]}`
        }
        
    })
    .catch(err =>{
        console.log('Error Occurred', err)
    })

    function createBio(alias, alignment, publisher, pob, gender, height, weight, strength, speed, intelligence, power, durability, combat){
        // if(alias === 'null' || alias === '-'){
        //     alias = false
        // }
        // else if(alias.split(',').length > 2){
        //     alias = alias.split(',').slice(0, 2).join(' ')
        // }
        // else alias = alias.split(',').join(' ')

        const variables = [alias, alignment, publisher, pob, gender, height, weight, strength, speed, intelligence, power, durability, combat]

        variables.forEach(vari=>{
            if(vari === 'null' || vari === '-' || vari === false){
                vari = false
            }
        })

        if(alias.split(',').length > 2){
            alias = alias.split(',').slice(0, 2).join(' ')
        }

        let comment1 = `
            Called the ${alias}.From ${publisher}—${pob}.Personal ${alignment}
        `
        // alias, publisher, pob, alignment,

        let comment2 = `
            ${gender}.Height ${height}. Weighs ${weight}
        `
        // gender, height, weight, 

        let comment3 = `
            Strength: ${strength}.Speed: ${speed}.Intelligence: ${intelligence}.Power: ${power}.Durability: ${durability}.Combat: ${combat}
        `
        const results = []
        const comments = [comment1, comment2, comment3]

        while(comments.length){
            const comm = comments.shift().split('.')
            // console.log(comm, "before loop")

            for(let i=0; i<comm.length; i++){
                // console.log(comm[i], i)
                if(comm[i] === false) comm.splice(i, 1)
                
                else continue
            }
            results.push(comm.join(', '))
        }
        console.log(results)
        // strength, speed, intelligence, power, durability, combat
        return results

    }

    const savedIndex = new Set()
    const stories = document.querySelectorAll('.connections')
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

                // console.log(`image and name work ${data.name}, ${data.name}`)

                const pfpElement = story.querySelector('img')
                const nameElement = story.querySelector('h4')

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
    const logo = document.getElementById('appTitle')


    logo.addEventListener('click',()=>{
        console.log('redirecting')
        window.location.href = "http://localhost:9999"
    })

    const otherProfiles = document.querySelectorAll('.connectionProfiles')
    // console.log(otherProfiles)

    otherProfiles.forEach(profile =>{
        profile.addEventListener('click', ()=>{
            const name = profile.parentElement.querySelector('h4')
            window.location.href = `http://localhost:9999/user/${name.innerText}/${name.id}`
        })
    })

    const searchBar = document.getElementById('searchbar')
    let inputValue = ''

    const foundUsers = document.getElementsByClassName('foundUsers')
    
    
    
    searchBar.addEventListener('input', (e)=>{
        if(!inputValue){
            inputValue = searchBar.value
        } else {
            const removeUsers = Array.from(foundUsers)
            const noUsers = document.getElementsByClassName('noUsers')
            
            if(noUsers){
                const remove2 = Array.from(noUsers)
                remove2.forEach(user => user.remove())
            }

            removeUsers.forEach(user => user.remove())
        }
        fetch(`https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/4590cf6fea30735552d1ffe341a2cc8b/search/${searchBar.value}`)
            .then(data => data.json())
            .then(data =>{
                // console.log(data)
                // console.log("2.", data.response)
                // console.log(searchBar.value)
                const searchContent = document.getElementById('searchContent')
                if(data.response === 'error' && searchBar.value){
                    // console.log("success")
                    const noUser = document.createElement('div')
                    noUser.innerHTML = 'No User Found'
                    noUser.setAttribute('class', 'noUsers')

                        searchContent.appendChild(noUser)
                }
                else{
                    data.results.forEach(char =>{
                        const foundUser = document.createElement('div')

                        const charImg = char.image.url
                        const charName = `${char.name} (${Object.values(char.biography)[0]})`
                        
                        foundUser.innerHTML = `
                        <img src="${charImg}" alt="" class="usersImages">
                        <div id="${char.name}/${char.id}" class="usersNames">${charName}</div>
                        `
                        foundUser.setAttribute('class', 'foundUsers')
                        
                        searchContent.appendChild(foundUser)
                        
                    })
                }
                for(let user of foundUsers){
                    user.addEventListener('click', ()=>{
                        const url= user.querySelector('div').id
                        console.log(url)
                        window.location.href = `http://localhost:9999/user/${url}`
                    })
                }

            })
            
    })
    

    const favorites = document.getElementById('favorites')

    favorites.addEventListener('click', ()=>{
        if(favorites.getAttribute("class") === "0") favorites.setAttribute("class", 1)
        else if(favorites.getAttribute("class") === "1") favorites.setAttribute("class", 0)


        if(favorites.getAttribute("class") === "0"){
            favorites.style.backgroundColor = 'gray'
            favorites.style.color = 'black'
            favorites.innerText = '- favorite' 
            
            window.localStorage.removeItem(idInfo)
            console.log('Removed')
        }
        else if(favorites.getAttribute("class") === "1"){
            console.log('Saved')
            favorites.style.backgroundColor = 'yellow'
            favorites.style.color = 'white'
            favorites.innerText = 'favorited' 
            window.localStorage.setItem(idInfo, urlInfo)
        }

        
    })

    const saves = Object.keys(window.localStorage)

    if(window.localStorage.getItem(idInfo)){
        favorites.style.backgroundColor = 'yellow'
        favorites.style.color = 'white'
        favorites.innerText = 'favorite' 
        favorites.setAttribute("class", 1)
    }
    
})