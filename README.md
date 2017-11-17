## Website Performance Optimization portfolio project

### Installation

### Optimizations Performed

#### Part 1: Optimize PageSpeed Insights score for index.html

1. analytics.js and perfmatters.js were set to async
1. Print media was added to print JS
1. Font CSS was moved to bottom of page 
1. Images were downloaded and stored in project
1. Image sizes were reduced
1. Inlined CSS in HTML using gulp
1. Minified JS, CSS, Images and HTML using gulp

#### Part 2: Optimize Frames per Second in pizza.html

1. Moved dx and newwidth in changePizzaSizes outside loop
1. Moved document.getElementById("randomPizzas") outside loop
1. Moved phase calculation outside loop in updatePositions
1. Added requestAnimationFrame for updatePositions
1. Decreased pizza image count based on window size in anonymous method

