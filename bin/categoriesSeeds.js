const mongoose = require('mongoose')
const Category = require('../models/Category')

mongoose.connect(`mongodb://admin:ironadmin2018@ds121814.mlab.com:21814/iron-spotify`)

const categories = [
  {
    name : "peda",
    genres: ["happy","party","reggaeton","rock","electronic"]
  },
  {
    name : "workout",
    genres: ["work-out","power-pop","techno","edm","electronic"]
  },
  {
    name : "tranqui",
    genres: ["study","chill","rainy-day","sleep","sad"]
  },
];

Category.create(categories)
    .then(categories=>{
      console.log(`${categories.length} categories created`)
      mongoose.connection.close()
    })
    .catch(err=>console.log('Something went wrong', err))