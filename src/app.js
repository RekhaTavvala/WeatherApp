const path = require("path");

const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.port || 3000;

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlerbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render("index", {
        title : "Weather App",
        name : "Rekha Tavvala"
    });
});

app.get('/about', (req, res) => {
    res.render("about", {
        title : "About Page",
        name : "Rekha Tavvala"
    });
});

app.get('/help', (req, res) => {
    res.render("help", {
        title : "Help Page",
        name : "Rekha Tavvala"
    })
});

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if(!address){
        return res.send({
            error: "Please provide an address"
        });
    }
    
    geocode(address, (error, {latitude, longitude, place} = {}) => {
        if(error){
            return res.send({
                error
            });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                });
            }
            res.send({
                forecast : forecastData,
                location : place,
                address 
            }) 
        });
    });
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            "error" : "Please provide search text"
        });
    }
    res.send({
        products : []
    });
})

app.get('/help/*', (req, res) => {
    res.render('404Page', {
        title : "Error Page",
        errorMessage : "Help article not found",
        name : "Rekha Tavvala"
    })
})

app.get('*', (req, res) => {
    res.render('404Page', {
        title : "Error Page",
        errorMessage : "My page not found",
        name : "Rekha Tavvala"
    })
});

app.listen(port, () =>{
    console.log("Server has started on port:" + port);
});