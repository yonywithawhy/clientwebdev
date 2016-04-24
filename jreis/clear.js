(function(){
    var Clear = angular.module("Clear",[]);
    Clear.controller("SearchCtrl",function($scope){
        /* Always true */
        $scope.parameters = ['handshape2','handshape1','location','movement1','movement2'];

        /* Data from Server */
        $scope.preview = {
            handshape1: "images/preview_handshapes.png",
            handshape2: "images/preview_handshapes.png"
        };
        $scope.handshapes = [
            {id:0, path:"images/HS_A_right.gif",parent_id:0, glyph:"images/grapheme_a_hand.jpg"},
            {id:1, path:"images/HS_M_right.gif",parent_id:0},
            {id:2, path:"images/HS_N_right.gif",parent_id:0},
            {id:3, path:"images/HS_T_right.gif",parent_id:0}
        ];
        $scope.movements = [
            {id:1, path:"images/1.png",parent_id:1},
            {id:2, path:"images/2.png",parent_id:1},
            {id:3, path:"images/3.png",parent_id:1}
        ];
        $scope.locations = [
            {id:1, path:"images/1.png"},
            {id:2, path:"images/2.png",parent_id:1},
            {id:3, path:"images/3.png",parent_id:1}
        ];

        /* State */
        $scope.iconSelected  = {
            handshape1: {},
            handshape2: {}
        };
        $scope.iconOnDisplay = {
            handshape1: $scope.iconSelected.handshape1,
            handshape2: $scope.iconSelected.handshape2
        };

        $scope.showingOverlay = {
            handshape1: false
        };
        $scope.isShowingOverlay = function(parameter) {
            if (typeof parameter !== "undefined"){
               return $scope.showingOverlay[parameter];
            }
        };

        /* Mutator Functions */
        $scope.setPreviewIcon = function(parameter, index, isClick) {
            if(typeof parameter !== "undefined") {
                var updateValue;
                var triggeredByClickRatherThanHover;

                // Handle undefined
                triggeredByClickRatherThanHover = !!isClick;

                // TODO: handle more than one parameter, not just handshape1

                if (index < 0 || typeof index === "undefined") {
                    updateValue = $scope.iconSelected[parameter];
                } else {
                    // Get the path for the given handshape
                    // TODO refactor this for other parameters
                    updateValue = $scope.handshapes[index];

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

        $scope.clearSelection = function(parameter) {
            if(typeof parameter !== "undefined") {
                $scope.iconSelected[parameter] = {};
                $scope.iconOnDisplay[parameter] = {};
                $scope.hideOverlay(parameter);
            }
        };
        $scope.clearAll = function() {
            var index;
            var parameter;

            for (index in $scope.parameters) {
                parameter = $scope.parameters[index];
                $scope.clearSelection(parameter);
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


        $scope.hideOverlay = function(parameter) {
            if ($scope.showingOverlay.hasOwnProperty(parameter) ){
                $scope.showingOverlay[parameter] = false;
            }
        };

        $scope.showOverlay = function(parameter) {
            if ($scope.iconOnDisplay.hasOwnProperty(parameter)){
                // If we haven't selected anything then never show the overlay
                $scope.showingOverlay[parameter] = isObjectEmpty($scope.iconOnDisplay[parameter]) ? false : true;
            }
        };

        /* Utility Functions */
        function isObjectEmpty(obj) {
            return JSON.stringify(obj) === JSON.stringify({});
        }
    });
})();