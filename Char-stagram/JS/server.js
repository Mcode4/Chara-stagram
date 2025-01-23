const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res)=>{
    console.log(req.method, req.url)
    let file = req.url.split("/").slice(3).join('/')
    console.log(file, "3")

    if(req.method === "GET" && req.url === "/"){
        const body = fs.readFileSync('../MainPage.html')
        res.setHeader('Content-type', 'text/html')
        res.statusCode = 200
        return res.end(body)
    }
    if(req.method === "GET" && req.url === ('/CSS/main.css')){
        const css = fs.readFileSync(`../${req.url}`)
        res.setHeader('Content-type', 'text/css')
        res.statusCode = 200
        return res.end(css)
    }
    if(req.method === "GET" && req.url.startsWith('/Icon') || req.url.startsWith('/Pictures')){
        const img = fs.readFileSync(`../${req.url}`)
        res.setHeader('Content-type', 'image/jpeg')
        res.statusCode = 200
        return res.end(img)
    }
    if(req.method === "GET" && req.url === "/JS/main.js"){
        const js = fs.readFileSync(`../${req.url}`)
        res.setHeader('Content-type', 'application/javascript/')
        res.statusCode = 200
        return res.end(js)
    }
    if(req.method === "GET" && req.url.startsWith("/user") && req.url.split('/').length === 4){
        const body = fs.readFileSync(path.join(__dirname, "../Profile.html"))
        res.setHeader('Content-type', 'text/html')
        res.statusCode = 200
        return res.end(body)
    }
    if(req.method === "GET" && req.url.startsWith("/user") && req.url.includes("CSS")){
        const css = fs.readFileSync(path.join(__dirname, "../CSS/profile.css"))
        res.setHeader('Content-type', 'text/css')
        res.statusCode = 200
        return res.end(css)
    }
    if(req.method === "GET" && req.url.startsWith("/user") && req.url.includes("Icons") || req.url.includes("Pictures")){
        const file = req.url.split("/").slice(3).join('/')
        console.log(file)
        const img = fs.readFileSync(path.join(__dirname, `../${file}`))
        res.setHeader('Content-type', 'image/jpeg')
        res.statusCode = 200
        return res.end(img)
    }
    if(req.method === "GET" && req.url.startsWith("/user") && req.url.includes("JS")){
        const file = req.url.split("/").slice(3).join('/')
        const js = fs.readFileSync(`../${file}`)
        res.setHeader('Content-type', 'application/javascript/')
        res.statusCode = 200
        return res.end(js)
    }

    
    
    
    res.statusCode = 404
    res.setHeader('Content-type', 'text/plain')
    return res.end('Not Found')
})

server.listen(9999, ()=> console.log('Running on port 9999'))

