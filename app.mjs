import inquirer from 'inquirer';

// const portfolioData = {
//   user: {},
//   projects: [] // initialize the projects array here.
// };

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub username. (Required)',
      validate: gitInput => {
        if (gitInput) {
          return true;
        } else {
          console.log('Please enter your GitHub username!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'about',
      message: 'Please provide some information about yourself:'
    }
  ]);
};

// update promptProject to accept portfolioData as a parameter
const promptProject = portfolioData => {
// if there's no 'projects' array property, create one
if (!portfolioData.projects) {
  portfolioData.projects = []; // initialize it as an empty array on the first call
}
  console.log(`

=================

Add a New Project

=================
`);

  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project? (Required)',
      validate: projectInput => {
        if (projectInput) {
          return true;
        } else {
          console.log('Please enter your project name!');
          return false;
        }
      } 
    },
    {
      type: 'input',
      name: 'description',
      message: 'Please provide a description of the project. (Required)',
      validate: projectDesc => {
        if (projectDesc) {
          return true;
        } else {
          console.log('Please enter a project description!');
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)',
      validate: projectLink => {
        if (projectLink) {
          return true;
        } else {
          console.log('Please enter the link to your project!');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ]);
};

// Start the prompt chain
promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  });
// const fs = require('fs');

// // this will allow to use the generatePage function from the src folder, not in this file. 
// const generatePage = require('./src/page-template.js');


// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
    
//     if (err) throw err;
  
//     console.log('Portfolio complete! Check out index.html to see the output!');
// });








