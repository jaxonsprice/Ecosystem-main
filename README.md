


<h3 align="center">Ecosystem Project</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> A ecosystem simulation as part of my second year project.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](../TODO.md)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

This program is meant to simulate a fish acquarium ecosystem using p5.js. Everything is hand coded (no vibe-coding). 

You can download the documentation in the `./out` directory

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

to run the live server, run
(right now there are performance issues)
```sh
npm run start
```
to build the app
```sh
npm run build
```
then

```sh
npm run appStart
```
to run the app.

### Prerequisites

Node.js:

```bash
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"
# Download and install Node.js:
nvm install 24
# Verify the Node.js version:
node -v # Should print "v24.11.1".
# Verify npm version:
npm -v # Should print "11.6.2".
```

### Installing



## 🔧 Running the tests <a name = "tests"></a>

```javascript
//  test function 
tests('error label goes here', ()=> {
  return test != condition
})
```

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## 🎈 Usage <a name="usage"></a>

This project uses electron and p5.js. the application window and menu options are managed in the `app.js` and `preload.js` files. The files in the `public` directory are served to the electron application. This directory contains all the scripts for running the simulation, as well as all of the assets.

The project is currently written in typescript, and p5.js is run using instanced mode. All object files need to import the p5.js library and each p5.js function must contain a reference to the p5 object.


### Building the Docs


```
npm run buildDocs
```



## 🚀 Deployment <a name = "deployment"></a>

start the live server.
```
npm run start
```



## ⛏️ Built Using <a name = "built_using"></a>

- [NodeJs](https://nodejs.org/en/) - Server Environment
- [P5.js]()

## ✍️ Authors <a name = "authors"></a>

- [@kylelobo](https://github.com/kylelobo) - Idea & Initial work

See also the list of [contributors](https://github.com/kylelobo/The-Documentation-Compendium/contributors) who participated in this project.

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Nature of Code 
