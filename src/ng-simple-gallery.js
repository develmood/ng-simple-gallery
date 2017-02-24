angular
    .module('ngSimpleGallery', ['ngTouch'])
    .directive('ngGallery', ['$timeout', '$animate', '$interval', function ($timeout, $animate, $interval) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                source: '@'
            },
            link: function (scope, elem, attrs) {
                // json or not, this doesnt matter
                try {
                    scope.source = JSON.parse(scope.source);
                } catch(e) {}

                scope.images = scope.source.images;
                scope.config = scope.source.config;
                scope.currentIndex = 0;
                scope.nextIndex = 0;
                scope.img = elem.find('img');

                // config
                switch(scope.config.animation) {
                    case 'slide':
                        scope.animationClassNext = 'slide-left';
                        scope.animationClassPrev = 'slide-right';
                        break;
                    default: 
                        scope.animationClassNext = 'fade';
                        scope.animationClassPrev = 'fade';
                }

                /*** next item ***/
                scope.next = function () {
                    
                    // first set the next picture to the after next picture
                    scope.nextIndex = scope.nextIndex == scope.images.length-1 ? 0 : scope.nextIndex+1;
                    // wait for animation and just before the end switch image
                    $timeout(function() {
                        scope.currentIndex = scope.currentIndex == scope.images.length-1 ? 0 : scope.currentIndex+1;
                    }, 500);
                    // just add and remove an animated class
                    $animate.addClass(scope.img[0], scope.animationClassNext).then(function () {
                        $animate.removeClass(scope.img[0], scope.animationClassNext);
                    });                    
                };

                /*** previous item ***/
                scope.prev = function () {
            
                    // first set the next picture to the next picture
                    scope.nextIndex = scope.nextIndex == 0 ? scope.images.length-1 : scope.nextIndex-1;
                    // wait for animation and just before the end switch image
                    $timeout(function() {
                        scope.currentIndex = scope.currentIndex == 0 ? scope.images.length-1 : scope.currentIndex-1;
                    }, 500)
                    // just add and remove an animated class
                    $animate.addClass(scope.img[0], scope.animationClassPrev).then(function() {
                        $animate.removeClass(scope.img[0], scope.animationClassPrev);
                    });
                };

                // listen for index and switch images
                scope.$watch('currentIndex', function () {
                    scope.currentImage = scope.images[scope.currentIndex];
                });
                scope.$watch('nextIndex', function() {
                     scope.nextImage = scope.images[scope.nextIndex];
                })

                if(scope.config.interval) {
                    scope.interval = $interval(function() {
                        scope.next();            
                    }, scope.config.interval * 1000);

                    scope.stopInterval = function(stop) {
                        if(stop == true) {
                            $interval.cancel(scope.interval);
                        }
                    }
                }
                
               
            },
            template: '<div class="gallery-container" ng-swipe-left="next(); stopInterval(true);" ng-swipe-right="prev(); stopInterval(true);">' +
            '   <div class="gallery-item">' +
            '       <img ng-cloak class="current-img" ng-src="{{ currentImage.url }}">' +
            '       <img ng-cloak class="next-img" ng-src="{{ nextImage.url }}">' +
            '   </div>' +
            '   <div class="prev" ng-click="prev()"></div>' +
            '   <div class="next" ng-click="next()"></div>' +
            '   <ul class="thumb-list">' +
            '       <li ng-repeat="image in images" ng-class="image.url == currentImage.url ? \'active\' : \'\'">&#149;</li>' +
            '   </ul>' + 
            '</div>'
        }
    }]);