/**
 * Created by yony on 4/24/16.
 */
(function(){
    // Define the ParametersAPI factory which simulates getting data from the server
    var ParametersAPI = function(){
        var img_dir = "images";
        var image_dir_handshape = img_dir + "/handshape/";

        var o = {};
        o.parameters = ['handshape2','handshape1','location','movement1','movement2'];
        o.preview = {
            handshape1: image_dir_handshape + "preview_handshapes.png",
            handshape2: image_dir_handshape + "preview_handshapes.png"
        };
        o.handshapes = [
            {id:0, path:image_dir_handshape + "HS_A_right.gif",parent_id:0, glyph:image_dir_handshape + "grapheme_a_hand.jpg"},
            {id:1, path:image_dir_handshape + "HS_M_right.gif",parent_id:0},
            {id:2, path:image_dir_handshape + "HS_N_right.gif",parent_id:0},
            {id:3, path:image_dir_handshape + "HS_T_right.gif",parent_id:0}
        ];
        o.movements = [
            {id:1, path:image_dir_handshape + "1.png",parent_id:1},
            {id:2, path:image_dir_handshape + "2.png",parent_id:1},
            {id:3, path:image_dir_handshape + "3.png",parent_id:1}
        ];
        o.locations = [
            {id:1, path:image_dir_handshape + "1.png"},
            {id:2, path:image_dir_handshape + "2.png",parent_id:1},
            {id:3, path:image_dir_handshape + "3.png",parent_id:1}
        ];

        return o;
    };

    angular.module("Clear").factory("ParametersAPI",ParametersAPI);
})();
(function(){
    var SelectionState = function() {
        var o = {};
        o.selection = {handshape2:{},handshape1:{},location:{},movement1:{},movement2:{}};
        o.getSelection = function() {
            return this.selection;
        };
        o.setSelection = function(which,newValue) {
            if (selection.hasOwnProperty(which)) {
                this.selection[which] = newValue;
            } else {
                throw new Error("Unable to set property for unknown ASL parameter " + which);
            }
        };
        return o;
    };

    angular.module("Clear").factory("SelectionState",SelectionState);
})();