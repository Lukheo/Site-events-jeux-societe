const { Sequelize } = require('sequelize');
const handlebars = require('handlebars');

handlebars.registerHelper('formatContent', function(content) {
  // Remplacer les sauts de ligne par des balises <br>
  return new handlebars.SafeString(content.replace(/\r?\n/g, '<br>'));
});


// Option 3: Passing parameters separately (other dialects)

const sequelize = new Sequelize('osevc', 'root', '', {

  host: 'localhost',
  dialect:'mysql',
});




sequelize.sync()

const sessionSecret = 'keyboard dog'



module.exports = {sequelize, sessionSecret} 