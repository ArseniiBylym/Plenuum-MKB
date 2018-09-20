Plenuum Webapp by hipteam

- [Environment variables](#environment-variables)
- [Deployment](#deployment)
- [Rules of development](#rules-of-development)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
  - [npm run eject](#npm-run-eject)
- [Links to help](#links-to-help)

### `Environment variables:`
All environment variables in this project should be started with `REACT_APP_` as it is a requirement on the current version of react in use, for more information, check the [Links to help](#links-to-help). For development purpouses, those variables should be setted locally in each developer machine.

##### `REACT_APP_SERVER_ADDRESS` 
This variable contains the server address that should be used according to the target.
For development: `http://localhost:5000`.
For staging and prod it should be used the proper values pointing to each server.

##### `REACT_APP_GAID`
This variable is referent to the Google Analytics ID. Get the proper value accoring to the target [PROD/STAGIN] if necessary with your manager.

##### `REACT_APP_API_VERSION`
This variable is for the API version, current in use `API_V2. For development, use mock.

### `Deployment:`
The deployment of the aplication is done in digital ocean droplet with `IP: 37.139.2.135` . It uses Dokku and nginx to serve the application.
To deploy, is necessary:
- `git remote add staging dokku@37.139.2.135:plenuum-webapp` where `staging` is the name of the remote to make it easier and plenuum-webapp is the name of the dokku app set up on the server.
- `git push staging master`  where this will push to the master branch on the dokku remote and perform the deployment according to the `Dockerfile` and the `nginx.conf.sigil` file

### `Rules of development:`

- No commits without tests!
- Do not push directly to master!
- Please use "feature", "task" or "bugfix" branches. For example: "feature/my_awesome_new_feature".
- If you're done, create a pull request (PR) and assign it to an other developer.
- Just merge if the tests pass on the CI.


### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


### Links to help

[Working with ReactJS in WebStorm: Coding Assistance](https://blog.jetbrains.com/webstorm/2015/10/working-with-reactjs-in-webstorm-coding-assistance/)
[Working with ReactJS in WebStorm: Linting, refactoring and compiling](https://blog.jetbrains.com/webstorm/2015/12/working-with-reactjs-in-webstorm-linting-refactoring-and-compiling/)
[Debugging React apps created with Create React App in WebStorm](https://blog.jetbrains.com/webstorm/2017/01/debugging-react-apps/)
[Adding Custom Environment Variables](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables)