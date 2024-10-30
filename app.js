// import inquirer from 'inquirer';
const inquirer = require("inquirer");
const { writeFile, copyFile } = require('./utils/generate-site.js');
const generatePage = require('./src/page-template');

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
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself in an "About" section?',
      default: true
    },
    {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        when: ({ confirmAbout }) => confirmAbout
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
  ])
  .then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
    }
  });
};

// Start the prompt chain
promptUser()
  .then(promptProject)
  .then(portfolioData => {
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });























// old code below!!!

// promptUser()
//   .then(promptProject)
//   .then(portfolioData => {
//     // will be uncommented in lesson 4
//     const pageHTML = generatePage(portfolioData);
//     fs.writeFile('./dist/index.html', pageHTML, err => {
//       if (err) {
//         console.log(err);
//         return;
//       };
      
//       console.log('Page created! Check out index.html in this directory to see it!');
      
//       fs.copyFile('./src/style.css', './dist/style.css', err => {
//         if (err) {
//           console.log(err);
//           return;
//         }
//         console.log('Stylesheet copied successfully!');
//       });
//   });
// });

// OLD CODE BELOW

// const fs = require('fs');

// // this will allow to use the generatePage function from the src folder, not in this file. 
// const generatePage = require('./src/page-template.js');


// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
    
//     if (err) throw err;
  
//     console.log('Portfolio complete! Check out index.html to see the output!');
// });


