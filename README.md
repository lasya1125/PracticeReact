# Description of Functionalities and Implementation

## Populating the Table
We concatenated responses from the google form to create the fields we needed for the skills tree table. We used Tabletop (npm) to easily access the Google Spreadsheet with a key and it returned the data, so we could populate the rendered table.

## Searching

## Highlighting

## Future Functionalities (can currently be dealt with manually)

### Allow entries to be changed or updated
Some students have submitted more than one google form. You might want to possibly change the google for to ask for PID. If a student submits multiple forms, only display the most recent.

### Data Normalization
The data is currently not case-sensitive. Some students may input the same technology or skill in different ways (i.e. "Visual Studio Code" or "VSC"). Not a huge problem, but we can always update code to take care of some common differences.

### Filter table based on graduation date
All students expected graduation date is noted in the google form. You will need to access this information and filter the results displayed to not include students who have graduated from UNC.

# Issues 

## [Fixing the Issue with Firebase Hosting Loading Screen](https://github.com/coreui/coreui-react/issues/55)

First, check your index.html inside "build" folder and index.html in your own project. They should be the same, if not, copy code index.html outside "build" folder and paste into index.html inside "build" folder.

Delete your .firebase folder. and init it again.
=> firebase init  
? What do you want to use as your public directory? build < == NOTE: "build" is my directory  
? Configure as a single-page app (rewrite all urls to /index.html)? No <== select NO  
? File build/404.html already exists. Overwrite? No <== select NO  
? File build/index.html already exists. Overwrite? No <== select NO  

After doing these things, you get that notification of "Welcome Firebase Setting Host Complete". Just wait for a while, then reload the website.

## Table Not Updating Dynamically While Searching

While using `npm start` to run the application we could dynamically search. However, once the app was deployed it was running into 404 errors trying to access scripts in the build folder that did not exist. 

The index.html in the public folder is created based off the App.js (index.js) but there was unnecessary code in it. When running `npm run build`, this created additional issues and files that should not have been in the build folder. The public index.html has been been changed accordingly, so this issue will most likely not occur again. 

# Links

[Read CSV file in React](https://www.cluemediator.com/read-csv-file-in-react)  
[Search Functionality](https://developer.okta.com/blog/2020/08/26/react-hooks)  
[Google Sheets API](https://developers.google.com/sheets/api/reference/rest)  
[Google Sheets API Key Functionality](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/get)  
[How To Fetch Data From Google Sheets with React and Tabletop.js](https://medium.com/vowel-magic/how-to-fetch-data-from-google-sheets-with-react-and-tabletop-js-ca0e9d2ab34b)  
[Tabletop - npm](https://www.npmjs.com/package/tabletop)  
[React Search Tutorial](https://www.emgoto.com/react-search-bar/)  
[Adding Bootstrap Stylesheet](https://react-bootstrap.github.io/getting-started/introduction/)  
[Table Styling](https://react-bootstrap.github.io/components/table/)   
[Firebase Hosting Tutorial](https://www.youtube.com/watch?v=IDHfvpsYShs)   
[Adding Firebase.cmd to PATH](https://stackoverflow.com/questions/29531235/firebase-hosting-set-up-issue?stw=2)  

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
