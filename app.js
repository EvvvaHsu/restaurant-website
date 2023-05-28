// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json').results

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))




// routes setting
app.get('/', (req, res) => {

    res.render('index', { restaurants: restaurantList })
})



app.get('/restaurants/:restaurant_id', (req, res) => {

    //console.log(req.params.restaurant_id)

    const restaurant = restaurantList.find(
        restaurant => restaurant.id.toString() === req.params.restaurant_id
    )
    res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
    //console.log(req)
    if (!req.query.keyword) {
        return res.redirect("/")
    }
    const keyword = req.query.keyword.trim().toLowerCase()

    const filterRestaurants = restaurantList.filter(data => {
        return data.name.toLowerCase().includes(keyword) || data.category.includes(keyword)
    })
    
    res.render('index', { restaurants: filterRestaurants, keyword: keyword })
})


// start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is listening on http://localhost:${port}`)
})