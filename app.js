const fs = require('fs');

// this will allow to use the generatePage function from the src folder, not in this file. 
const generatePage = require('./src/page-template.js');

const profileDataArgs = process.argv.slice(2);


const [name, github] = profileDataArgs;

const pageHTML = generatePage(name, github);

fs.writeFile('./index.html', pageHTML, err => {
    
    if (err) throw err;
  
    console.log('Portfolio complete! Check out index.html to see the output!');
});








