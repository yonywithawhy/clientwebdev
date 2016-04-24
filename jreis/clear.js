(function(){
    var Clear = angular.module("Clear",[]);
    Clear.controller("SearchCtrl",function($scope){
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
            handshape1: $scope.preview.handshape1,
            handshape2: $scope.preview.handshape1
        };
        $scope.iconOnDisplay = {
            handshape1: $scope.iconSelected.handshape1,
            handshape2: $scope.iconSelected.handshape2
        };
        $scope.isSelected = {
            handshape1: false
        };
        $scope.isShowingOverlay = {
            handshape1: false
        }

        /* Mutator Functions */
        $scope.setPreviewIcon = function(parameter, index, isClick) {
            if(typeof parameter !== "undefined") {
                var updateValue;
                var triggeredByClickRatherThanHover;

                // Handle undefined
                triggeredByClickRatherThanHover = !!isClick;

                // TODO: handle more than one parameter, not just handshape1

                if (index < 0 || typeof index === "undefined") {
                    updateValue = $scope.iconSelected.handshape1;
                } else {
                    // Set the
                    updateValue = $scope.handshapes[index].path;

                    // If it was a click then we want the preview icon to revert to
                    // our clicked selection on mouseleave rather than the default
                    if (triggeredByClickRatherThanHover) {
                        $scope.iconSelected[parameter] = updateValue;

                        // Show handshape2 when handshape1 is a valid selection (i.e. not the preview)
                        $scope.isSelected[parameter] = (updateValue !== $scope.preview[parameter])
                    }
                }
                $scope.iconOnDisplay[parameter] = updateValue;
            }
        };

        $scope.clearSelection = function(parameter) {
            if(typeof parameter !== "undefined") {
                $scope.iconSelected[parameter] = $scope.preview[parameter];
                $scope.iconOnDisplay[parameter] = $scope.preview[parameter];
            }
        };

        $scope.showOrHideOverlay = function(parameter,state) {
            if (typeof parameter !== "undefined" && !!state ){
                $scope.isShowingOverlay[parameter] = state;
            }
        }
    });
})();