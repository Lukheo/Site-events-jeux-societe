const { Sequelize } = require('sequelize');
const handlebars = require('handlebars');

handlebars.registerHelper('formatContent', function(content) {
  // Remplacer les sauts de ligne par des balises <br>
  return new handlebars.SafeString(content.replace(/\r?\n/g, '<br>'));
});


// Option 3: Passing parameters separately (other dialects)
const jwtSecretKey = '45cde5634be77da412855e860ee90a3296dbc8e0ce7542dbbe37b6dbdb92967c'

const sequelize = new Sequelize('tableajeux', 'root', '', {

  host: 'localhost',
  dialect:'mysql',
});



sequelize.sync()

const sessionSecret = 'keyboard dog'



module.exports = {sequelize, sessionSecret, jwtSecretKey} 