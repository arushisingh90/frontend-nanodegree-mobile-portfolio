## Website Performance Optimization portfolio project

### Installation

1. Clone the repo
2. [Install node](https://nodejs.org/en/download/)
3. [Install gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
4. Run `npm install` in project app directory
5. Run `gulp serve:dist`

### Optimizations Performed

#### Part 1: Optimize PageSpeed Insights score for index.html

* analytics.js and perfmatters.js were set to async
* Print media was added to print JS
* Font CSS was moved to bottom of page 
* Images were downloaded and stored in project
* Image sizes were reduced
* Inlined CSS in HTML using gulp
* Minified JS, CSS, Images and HTML using gulp

#### Part 2: Optimize Frames per Second in pizza.html

* Moved dx and newwidth in changePizzaSizes outside loop
* Moved document.getElementById("randomPizzas") outside loop
* Moved phase calculation outside loop in updatePositions
* Added requestAnimationFrame for updatePositions
* Decreased pizza image count based on window size in anonymous method

