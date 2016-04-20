/**
 * Created by yonywithawhy on 4/19/16.
 */
(function(){

    function calculateSideLengthFromWidth(containerWidth,padding,angle) {
        return (containerWidth - 2 * padding) / (1 + 2 * Math.cos(angle));
    }

    function calculateHexagonPoints(sideLengthOrWidth,padding,useContainerWidth,xOffset,yOffset) {
        /*
         - Internal Angle of a regular closed polygon = (180deg * number of sides - 360) / number of sides
         For us, the internal angle = (180deg * 6 - 360deg) / 6 = 720deg / 6 = 60deg = PI/3 rad
         - We'll need (x,y) coordinates for each point starting at the top working our way down
         - This function assumes equal padding for the top, bottom, and left
         */

        var x1,x2,x6,x3,x5,x4,y1,y2,y6,y3,y5,y4;
        var returnArray = [];
        var theta = Math.PI / 3; // radians

        if (typeof useContainerWidth === "undefined") useContainerWidth = false;
        if (typeof xOffset === "undefined") xOffset = 0;
        if (typeof yOffset === "undefined") yOffset = 0;

        if (useContainerWidth) sideLengthOrWidth = calculateSideLengthFromWidth(sideLengthOrWidth,padding,theta);

        // Top
        x1 = padding + sideLengthOrWidth * Math.sin(theta) + xOffset; y1 = padding + yOffset;
        returnArray.push([x1,y1]);
        // Upper Left
        x2 = padding + xOffset; y2 = padding + sideLengthOrWidth * Math.cos(theta) + yOffset;
        returnArray.push([x2,y2]);

        // Lower Left
        x3 = x2; y3 = y2 + sideLengthOrWidth;
        returnArray.push([x3,y3]);

        // Bottom
        x4 = x1; y4 = y3 + sideLengthOrWidth * Math.cos(theta);
        returnArray.push([x4,y4]);

        // Lower Right
        x5 = padding + 2 * sideLengthOrWidth * Math.sin(theta) + xOffset; y5 = y3;
        returnArray.push([x5,y5]);

        // Upper Right
        x6 = x5; y6 = y2;
        returnArray.push([x6,y6]);

        return returnArray;
    }

    /* Kick off the action */

    // Variables set in px
    var size  = 150;
    var padding = 0;
    var offset  = 30;
    var calculateSizeBasedOnContainerWidth = true;

    var millis = 650;
    var pauseTime = 1000;

    // Draw the Hexagon
    var leftHexagonPointsArray  = calculateHexagonPoints(size, padding, calculateSizeBasedOnContainerWidth);
    var rightHexagonPointsArray = calculateHexagonPoints(size, padding, calculateSizeBasedOnContainerWidth, offset);
    var leftHexagonPoints  = leftHexagonPointsArray .map( function(point){ return point.join(",") }).join(" ");
    var rightHexagonPoints = rightHexagonPointsArray.map( function(point){ return point.join(",") }).join(" ");
    $("#left" ).attr("points",  leftHexagonPoints);
    $("#right").attr("points", rightHexagonPoints);

    // Draw the Slash
    $("#slash line").attr({
        x1: leftHexagonPointsArray [5][0], y1: leftHexagonPointsArray [5][1],
        x2: rightHexagonPointsArray[2][0], y2: rightHexagonPointsArray[2][1]
    });

    setTimeout(function(){
        var width = $("#icon").width();
        var distanceFactor = 0.25;
        var newLeftPosition  = (0.5 - distanceFactor) * width;
        var newRightPosition = (0.5 + distanceFactor) * width - $("#S").width();

        $('#J').animate({opacity:1,left: newLeftPosition  + "px"}, millis);
        $('#S').animate({opacity:1,left: newRightPosition + "px"}, millis);
    },pauseTime);

})();
