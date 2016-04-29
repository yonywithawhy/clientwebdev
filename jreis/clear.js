(function(){
    // Define the main app
    angular.module("Clear",[]);
})();
(function(){
    var SearchControl = ["$scope", "ParametersAPI", "SelectionState", function($scope, ParametersAPI, SelectionState){
        /* Always true */
        $scope.parameters = ParametersAPI.parameters;

        /* Data from Server */
        $scope.preview    = ParametersAPI.preview;
        $scope.handshapeGlyphs = ParametersAPI.handshapeGlyphs;
        $scope.handshapes = ParametersAPI.handshapes;
        $scope.movements  = ParametersAPI.movements;
        $scope.locations  = ParametersAPI.locations;

        $scope.handshapesForGlyphId = function(id) {
            var idAsNumber = 1 * id; // convert Any to Number
            var shapes = [];
            if (!isNaN(idAsNumber) && idAsNumber >= 0 && idAsNumber < $scope.handshapeGlyphs.length) {
                for (var i in $scope.handshapes){
                    var hand = $scope.handshapes[i];
                    if (hand.hasOwnProperty("glyph") && hand.glyph === idAsNumber) {
                        shapes.push(hand);
                    }
                }
            }
            return shapes;
        };

        /* State */
        $scope.iconSelected  = SelectionState.selection; // TODO make this work 2 ways

        /* Presentation */
        $scope.iconOnDisplay = {
            handshape1: $scope.iconSelected.handshape1,
            handshape2: $scope.iconSelected.handshape2,
            location:   $scope.iconSelected.location,
            movement1:  $scope.iconSelected.movement1,
            movement2:  $scope.iconSelected.movement2
        };
        $scope.showingOverlay = {};
        $scope.isShowingOverlay = function(parameter) {
            if (typeof parameter !== "undefined"){
                return $scope.showingOverlay[parameter];
            }
        };
        $scope.imageToDisplay = function(parameter) {
            var imagePath = "";
            if(typeof parameter !== "undefined") {
                if ( !isObjectEmpty($scope.iconOnDisplay[parameter]) && $scope.iconOnDisplay[parameter] ){
                    imagePath = $scope.iconSelected[parameter].path; //iconOnDisplay
                } else {
                    imagePath = $scope.preview[parameter]; // and what if that doesn't exist?
                }
                return imagePath;
            }
        };

        /* Mutator Functions */
        $scope.setPreviewIcon = function(parameter, index, isClick) {
            if(typeof parameter !== "undefined") {
                var updateValue;
                var triggeredByClickRatherThanHover;
                var parameter = parameter.toLowerCase();

                // Handle undefined
                triggeredByClickRatherThanHover = !!isClick;

                if (index < 0 || typeof index === "undefined") {
                    updateValue = $scope.iconSelected[parameter];
                } else {
                    // Get the object containing the image path for the given parameter
                    switch (parameter) {
                        case "handshape1":
                        case "handshape2":
                            updateValue = $scope.handshapes[index];
                            break;
                        case "location":
                            updateValue = $scope.locations[index];
                            break;
                        case "movement1":
                        case "movement2":
                            updateValue = $scope.movements[index];
                            break;
                        default:
                            console.log("Warning, parameter " + parameter + " not found.");
                    }

                    // If it was a click then we want the preview icon to revert to
                    // our clicked selection on mouseleave rather than the default
                    if (triggeredByClickRatherThanHover) {
                        $scope.iconSelected[parameter] = updateValue;

                        // TODO Show handshape2 when handshape1 is a valid selection (i.e. not the preview)
                    }
                }

                $scope.iconOnDisplay[parameter] = updateValue;
            }
        };

        // Remove selection for a given parameter
        $scope.clearSelection = function(parameter) {
            if(typeof parameter !== "undefined") {
                $scope.iconSelected[parameter] = {};
                $scope.iconOnDisplay[parameter] = {};
                $scope.hideOverlay(parameter);
            }
        };
        // Remove all selections made
        $scope.clearAll = function() {
            var index;
            var parameter;

            for (index in $scope.parameters) {
                parameter = $scope.parameters[index];
                $scope.clearSelection(parameter);
            }
        };

        // Show / Hide methods for the little 'x' button to cancel a selection made
        $scope.hideOverlay = function(parameter) {
            if ($scope.showingOverlay.hasOwnProperty(parameter) ){
                $scope.showingOverlay[parameter] = false;
            }
        };

        $scope.showOverlay = function(parameter) {
            // If we haven't selected anything then never show the overlay
            $scope.showingOverlay[parameter] = isObjectEmpty($scope.iconOnDisplay[parameter]) ? false : true;
        };

        /* Utility Functions */
        function isObjectEmpty(obj) {
            if(typeof isObjectEmpty === "undefined") {
                return true;
            } else {
                return JSON.stringify(obj) === JSON.stringify({});
            }
        }
    }];

    angular.module("Clear").controller("SearchCtrl",SearchControl);
})();