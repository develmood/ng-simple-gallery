# ngSimpleGallery
A simple full responsive image gallery with some options. Images are loading on click.


## Install Instruction ##
### Bower ###
```
bower install ng-simple-gallery --save 
```
## Setup ##
Include the following files into your project
```
bower_components/angular/angular.min.js
bower_components/angular-animate/angular-animate.min.js
bower_components/angular-touch/angular-touch.js
bower_components/ng-simple-gallery/dist/ng-simple-gallery.min.js
```

## Example ##
### js ###
```
angular
    .module('AngularApp', ['ngAnimate', 'ngTouch', 'ngSimpleGallery'])
    .controller('MainController', function($scope){

        this.gallery = {
            config: {
                animation: 'fade',  // default is fade
                interval: 3         // in seconds
            },
            images: [
                {title: 'Title 1', url: 'img/img1.jpg'},
                {title: 'Title 2', url: 'img/img2.jpg'},
                {title: 'Title 3', url: 'img/img3.jpg'},
            ]
        }
    });
```
### html ###
```
<ng-gallery source="ctrl.gallery"></ng-gallery> OR 
<div ng-gallery source="ctrl.gallery"></div>
```

### Options ###
* animation: slide | fade