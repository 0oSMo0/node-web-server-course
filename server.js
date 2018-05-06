const express = require("express")
const hbs = require("hbs")
const fs = require("fs")

//server app
const port = process.env.PORT || 3000
var app = express()
//middleware 
hbs.registerPartials(__dirname + "/views/partials")
app.use(express.static(__dirname + "/public"))
app.set("view engine", hbs)
app.use((req, res, next) => {
    const now = new Date().toString()
    const log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile("server.log", log + "\n", (err) => {
        if(err){
            console.log("Unable to append the file")
        }
    })
    next()
})
// app.use((req, res, next) => {
//     next()
//     res.render("maintainance.hbs")
    
// })

//handlebars middleware

hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear()
})
hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase()
})


//route
app.get("/", (req, res) => {
    res.render("index.hbs", {
        title: "Home Page",

    })
})

app.get("/about", (req, res) => {
    res.render("about.hbs", {
        title: "About Page"
    })
})

app.get("/history", (req, res) => {
    res.render("history.hbs", {
        title: "History",
    })
})



//server listen
app.listen(port, () => {
    console.log("The app server is up on port 3000...")
})