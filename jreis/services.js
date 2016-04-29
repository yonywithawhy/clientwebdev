/**
 * Created by yony on 4/24/16.
 */
(function(){
    // Define the ParametersAPI factory which simulates getting data from the server
    var ParametersAPI = function(){
        var img_dir = "images";
        var image_dir_handshape = img_dir + "/handshape/";
        var image_dir_location = img_dir + "/location/";
        var image_dir_movement = img_dir + "/movement/";

        var o = {};
        o.parameters = ['handshape2','handshape1','location','movement1','movement2'];
        o.preview = {
            handshape1: image_dir_handshape + "preview_handshapes.png",
            handshape2: image_dir_handshape + "preview_handshapes.png",
            location:   image_dir_location  + "preview_location.png"  ,
            movement1:  image_dir_movement  + "preview_movements.png" ,
            movement2:  image_dir_movement  + "preview_movements.png"
        };
        o.handshapes = [
            {id:0, path:image_dir_handshape + "HS_A_right.gif",parent_id:0, glyph:0},
            {id:1, path:image_dir_handshape + "HS_M_right.gif",parent_id:0, glyph:0},
            {id:2, path:image_dir_handshape + "HS_N_right.gif",parent_id:0, glyph:0},
            {id:3, path:image_dir_handshape + "HS_T_right.gif",parent_id:0, glyph:0}
        ];
        o.handshapeGlyphs = [
            {id: 0, path:image_dir_handshape + "grapheme_a_hand.jpg"}
        ];
        o.movements = [
            {id:1, path:image_dir_movement + "inandout.png"},
            {id:2, path:image_dir_movement + "updownleftright.png"},
            {id:3, path:image_dir_movement + "circular.png"},
            {id:4, path:image_dir_movement + "twistandwiggle.png"},
            {id:5, path:image_dir_movement + "repeated.png"}
        ];
        o.locations = [
            {id:1, path:image_dir_location + "forehead.png"},
            {id:2, path:image_dir_location + "chin.png"},
            {id:3, path:image_dir_location + "chest.png"},
            {id:4, path:image_dir_location + "arms.png"},
            {id:5, path:image_dir_location + "space.png"}
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