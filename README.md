```
                         
                         
                         
                  j/     
                 j≤g     
                ™◊◊◊©    
     ˙À        ™◊◊«∂Q˘   
     ]◊/      ™◊◊Q∂±±    
    ˙…≤À˙    ™◊◊«±◊QQ˘   
    j◊◊◊À˙   ]≤◊Q◊±◊◊f   
    )◊≤◊◊±÷ø˘]◊◊◊◊◊◊≤◊/  
     j◊≤◊±±±g:4◊◊◊◊◊◊◊◊, 
     )◊≤◊±±±±Q◊◊◊◊◊◊≤◊◊f 
      j≤◊◊«±±±Q◊««◊◊◊≤◊' 
     j◊◊◊◊«±±P)◊±±±««0˝  
     …◊≤±∂◊Q◊ y±QWMW±f   
    ˘≤◊◊◊QQ◊\÷◊Q∂f˘j±Q˘  
    ™◊≤◊◊◊œ˙j◊◊±P˘˙±±±   
    ]≤◊≤•'  j≤◊@-  ±◊◊   
    ˘◊◊œ    )◊@˘   )◊◊   
     ]˝      ˘˙     ]@˙  
     ˙              ˙˝   
                       
```


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

This simulation uses Euler physics integration. 
The `velocity` property of the fish is influenced by the method `addForce()`, which takes a p5.Vector object.

```javascript
// create a p5 Vector class. 
force = createVector(-1, 0)

// Moves the fish horizontally.
fish.addForce(force)
```

### Building the Docs



## 🚀 Deployment <a name = "deployment"></a>

start the live server.
```
npm run devStart
```


```
npm run buildDocs
```
to build the API documentation and include the README.

## ⛏️ Built Using <a name = "built_using"></a>

- [NodeJs](https://nodejs.org/en/) - Server Environment
- [P5.js]()

## ✍️ Authors <a name = "authors"></a>

- [@kylelobo](https://github.com/kylelobo) - Idea & Initial work

See also the list of [contributors](https://github.com/kylelobo/The-Documentation-Compendium/contributors) who participated in this project.

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Nature of Code 
