//Add the requried module 'angular-ui' as a dependency
var app=angular.module('maptesting',['ui.map','ui.event']);

app.controller('MapCtrl', ['$scope', function($scope,$compile) {
//    var ll = new google.maps.LatLng(29, 74);
//    var l2 = new google.maps.LatLng(20, 85);
//    var l3 = new google.maps.LatLng(22, 86);
//    var l4 = new google.maps.LatLng(29, 73);
//    var l5 = new google.maps.LatLng(30, 77);
//    var l6 = new google.maps.LatLng(28, 71);
//    var l7 = new google.maps.LatLng(29, 69);
//    var l8 = new google.maps.LatLng(28, 69);
//    var l9 = new google.maps.LatLng(30, 71);
//    var l10 = new google.maps.LatLng(24, 77);
//    var l11 = new google.maps.LatLng(25, 78);
//    var l12 = new google.maps.LatLng(23, 79);
//    var l13 = new google.maps.LatLng(22, 71);
//    var l14 = new google.maps.LatLng(21, 73);
//    var l15 = new google.maps.LatLng(20, 74);
//    var l16 = new google.maps.LatLng(21, 72);
//    var l17 = new google.maps.LatLng(24, 76);
//    var l18 = new google.maps.LatLng(25, 73);
//    var l19 = new google.maps.LatLng(26, 77);
//    var l20 = new google.maps.LatLng(27, 71);
//    var l21 = new google.maps.LatLng(28, 69);
//    var l22 = new google.maps.LatLng(29, 80);
//    var l23 = new google.maps.LatLng(30, 79);
    $scope.getDataFromJQuery = function (url, requestBody, callType, dataType, callback, errcallback) {

        $.support.cors = true;
        $.ajax({
            type:callType,
            url:url,
            data:requestBody,
            crossDomain:true,
            success:function (returnData, status, xhr) {
                callback(returnData.response ? returnData.response : returnData);
            },
            error:function (jqXHR, exception) {
                if (errcallback) {
                    errcallback(jqXHR, exception);
                } else {

                    callback(jqXHR);
                    console.log("exception in making [" + url + "] :[" + exception + "]");
                }

            },
            timeout:1200000,
            dataType:dataType,
            async:true
        });


    }


    $scope.mapOptions = {
        center: new google.maps.LatLng(29, 75.3424),
        zoom: 4,
        options: {
            streetViewControl: false,
            disableDoubleClickZoom:false,
            draggable:true,
            panControl: false,
            maxZoom:20,
            minZoom:4
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.image = 'hello';
    var citymap1 = {};
    citymap1['chicago'] = {
        center: new google.maps.LatLng(29.878113, 77.629798),
        population: 2842518
    };

    var citymap2 = {};
    citymap2['chicago'] = {
        center: new google.maps.LatLng(25.878113, 79.629798),
        population: 2842518
    };
    citymap2['newyork'] = {
        center: new google.maps.LatLng(23.714352, 74.005973),
        population: 8143197
    };
    citymap2['losangeles'] = {
        center: new google.maps.LatLng(32.052234, 78.243684),
        population: 3844829
    };

    var citymap3 = {};
    citymap3['chicago'] = {
        center: new google.maps.LatLng(20.878113, 67.629798),
        population: 2842518
    };
    citymap3['newyork'] = {
        center: new google.maps.LatLng(31.714352, 84.005973),
        population: 8143197
    };
    citymap3['losangeles'] = {
        center: new google.maps.LatLng(25.052234, 79.243684),
        population: 3844829
    };
    var citymap4 = {};
    for(var i=0;i<$scope.markerreturnvalue;i++)
    {

        citymap4[$scope.markerreturnvalue[i].title] = {
        center: new google.maps.LatLng($scope.markerreturnvalue[i].location[0],$scope.markerreturnvalue[i].location[1])
    };
    }

    $scope.mycircle1 = [];
    $scope.mycircle2 = [];
    $scope.mycircle3 = [];
    $scope.mycircle4 = [];
    $scope.mylevel1 = [];
    $scope.mylevel2 = [];
    $scope.mylevel3 = [];
    $scope.mylevel4 = [];
    $scope.reportvalue=[2,3,4,5,6];
    $scope.showinfo=function(centerval,labeltext1){
        var labelText =labeltext1;
        $scope.mylabeloption = {
            content: labelText,
            map: $scope.myMap,
            boxStyle: {
                textAlign: "center",
                fontSize: "15pt" ,
                width: "20px"
            },
            disableAutoPan: true,
            pixelOffset: new google.maps.Size(-10, -10),
            position: centerval,
            closeBoxURL: "",
            isHidden: false,
            pane: "mapPane",
            enableEventPropagation: true
        };
        $scope.ibLabel = new InfoBox($scope.mylabeloption);
        $scope.ibLabel.open($scope.myMap);

    }

    $scope.onmapidl = function() {
        for (var city in citymap1) {
            $scope.mycircle1.push(new google.maps.Circle({
            map: $scope.myMap,
            geodesic: true,
            fillColor:'white',
            strokeColor: 'white',
            strokeOpacity: 1.0,
            strokeWeight: 0.2,
            title:5,
            center: citymap1[city].center,
            radius: citymap1[city].population / 10000000000000000000000000

        }));
//            $scope.showinfo( citymap1[city].center,8);
//            $scope.mylevel1.push($scope.ibLabel);

        }
        if($scope.myMap.getZoom()==4)
        {
            $scope.myMarkers=$scope.mycircle2;
            $scope.showMarkers();
            $scope.myMarkers=$scope.mylevel2;
            $scope.showMarkers();

        }
    };

    $scope.onmycal = function() {

        for (var city in citymap1) {
            $scope.mycircle1.push(new google.maps.Circle({
                map: $scope.myMap,
                //  path: flightPlanCoordinates,
                geodesic: true,
                fillColor:'#CC0000',
                strokeColor: 'white',
                strokeOpacity: 1.0,
                strokeWeight: 2,
                title:5,
                center: citymap1[city].center,
                radius: citymap1[city].population / 1000000000000000
            }));
//            $scope.showinfo(citymap1[city].center,2);
//            $scope.mylevel1.push($scope.ibLabel);
        }
        for (var city in citymap2) {
            $scope.mycircle2.push(new google.maps.Circle({
                map: $scope.myMap,
                //  path: flightPlanCoordinates,
                geodesic: true,
                fillColor:'#CC0000',
                strokeColor: 'white',
                strokeOpacity: 1.0,
                strokeWeight: 2,
                title:5,
                center: citymap2[city].center,
                radius: citymap2[city].population / 40
            }));
            $scope.showinfo( citymap2[city].center,4);
            $scope.mylevel2.push($scope.ibLabel);
        }

        for (var city in citymap4) {
            $scope.mycircle4.push(new google.maps.Marker({
                map: $scope.myMap,
                visible:true,
                position: citymap4[city].center
                // radius: citymap3[city].population / 80
            }));
            $scope.showinfo( citymap4[city].center,1);
            $scope.mylevel4.push($scope.ibLabel);
        }

            for (var city in citymap3) {

                $scope.mycircle3.push(new google.maps.Circle({
                    map: $scope.myMap,
                    //  path: flightPlanCoordinates,
                    geodesic: true,
                    fillColor:'#CC0000',
                    strokeColor: 'white',
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                    title:5,
                    center: citymap3[city].center,
                    radius: citymap3[city].population / 60
                }));
                $scope.showinfo( citymap3[city].center,2);
                $scope.mylevel3.push($scope.ibLabel);
            }
    }
//    $scope.onMapIdle = function() {
//        var m11 = new google.maps.Marker({
//            map: $scope.myMap,
//            position: ll,
//            icon : $scope.image
//        });
//        var m2 = new google.maps.Marker({
//            map: $scope.myMap,
//            position: l2
//        });
//        var m3 = new google.maps.Marker({
//            map: $scope.myMap,
//            position: l3
//        });
//        var m4 = new google.maps.Marker({
//            map: $scope.myMap,
//            position: l4
//        });
//        var m5 = new google.maps.Marker({
//            map: $scope.myMap,
//            position: l5
//        });
////       $scope.myMarkers = [markertest];
////        //  console.log($scope.myMarkers);
//    };
//
//    $scope.onmycall = function() {
//        var m11 = new google.maps.Marker({
//            map: $scope.myMap,
//            position: ll,
//            icon : $scope.image
//        });
//        var m12 = new google.maps.Marker({
//            map: $scope.myMap,
//            position: l2
//        });
//        var m13 = new google.maps.Marker({
//            map: $scope.myMap,
//            position: l3
//        });
//        var m14 = new google.maps.Marker({
//            map: $scope.myMap,
//            position: l4
//        });
//        var m15 = new google.maps.Marker({
//            map: $scope.myMap,
//            position: l5
//        });

//        $scope.myMarkers1 =  [m11,m12,m13,m14,m15];
//
//        var m21 = new google.maps.Marker({
//            map: $scope.myMap,
//            position: l6
//        });
//        var m22 = new google.maps.Marker({
//            map: $scope.myMap,
//            position: l7
//        });
//        var m23 = new google.maps.Marker({
//            map: $scope.myMap,
//            position: l8
//        });
//        var m24 = new google.maps.Marker({
//            map: $scope.myMap,
//            position: l9
//        });
//        var m25 = new google.maps.Marker({
//            map: $scope.myMap,
//            position: l10
//        });
//        $scope.myMarkers2 = [m21,m22,m23,m24,m25];
//
//        var m31 = new google.maps.Marker({
//            map: $scope.myMap,
//            position: l11
//        });
//        var m32 = new google.maps.Marker({
//            map: $scope.myMap,
//            position: l12
//        });
//        var m33 = new google.maps.Marker({
//            map: $scope.myMap,
//            position: l13
//        });
//        var m34 = new google.maps.Marker({
//            map: $scope.myMap,
//            position: l14
//        });
//        var m35 = new google.maps.Marker({
//            map: $scope.myMap,
//            position: l15
//        });
//
//        $scope.myMarkers3 = [m31,m32,m33,m34,m35];
//    };
    $scope.addinsidemarker = function() {
        //   console.log($scope.myMarkers);

        $scope.myMarkers.push(new google.maps.Marker({
            map: $scope.myMap,
            position: l6
        }));

        console.log($scope.myMarkers);
        $scope.myMarkers.push(new google.maps.Marker({
            map: $scope.myMap,
            position: l7
        }));
        $scope.myMarkers.push(new google.maps.Marker({
            map: $scope.myMap,
            position: l8
        }));
        $scope.myMarkers.push(new google.maps.Marker({
            map: $scope.myMap,
            position: l9
        }));
        console.log($scope.myMarkers);
    };

    $scope.deletemarker = function() {
        console.log($scope.myMarkers);
        //alert(JSON.stringify($scope.myMarkers));
        $scope.myMarkers.pop();
        alert($scope.myMarkers.length );
    };

    $scope.setAllMap=function(map) {
    for (var i = 0; i < $scope.myMarkers.length; i++) {
            $scope.myMarkers[i].setMap(map);
        }
    }
  $scope.setdeletemap=function(map) {
        for (var i = 0; i < $scope.deletemarkerarray.length; i++) {
               $scope.deletemarkerarray[i].setMap(map);
        }
    }

    $scope.clearMarkers=function() {
        $scope.setdeletemap(null);
    }

    $scope.deleteMarkers = function() {
        $scope.clearMarkers();
        $scope.mycircle1 = [];
        console.log($scope.myMarkers);
    }

    $scope.showMarkers = function() {
        $scope.setAllMap($scope.myMap);
    }

    $scope.addMarker = function($event, $params) {
        $scope.myMarkers.push(new google.maps.Marker({
            map: $scope.myMap,
            position: $params[0].latLng
        }));
        $scope.newmarker= $scope.myMarkers  ;
        console.log($scope.myMarkers);
    };

    $scope.setZoomMessage = function(zoomvalue) {
        if((zoomvalue==3))
        {
            $scope.myMarkers=$scope.mycircle1;
            $scope.showMarkers();
            $scope.myMarkers=$scope.mylevel1;
            $scope.showMarkers();
            $scope.deletemarkerarray=$scope.mycircle2;
            $scope.deleteMarkers();
            $scope.deletemarkerarray=$scope.mylevel2;
            $scope.deleteMarkers();
            $scope.deletemarkerarray=$scope.mycircle3;
            $scope.deleteMarkers();
            $scope.deletemarkerarray=$scope.mylevel3;
            $scope.deleteMarkers();
            $scope.deletemarkerarray=$scope.mycircle4;
            $scope.deleteMarkers();
            $scope.deletemarkerarray=$scope.mylevel4;
            $scope.deleteMarkers();
        }

        if((zoomvalue==4))
        {
            $scope.myMarkers=$scope.mycircle2;
            $scope.showMarkers();
            $scope.myMarkers=$scope.mylevel2;
            $scope.showMarkers();
            $scope.deletemarkerarray=$scope.mycircle3;
            $scope.deleteMarkers();
            $scope.deletemarkerarray=$scope.mylevel3;
            $scope.deleteMarkers();
            $scope.deletemarkerarray=$scope.mycircle1;
            $scope.deleteMarkers();
            $scope.deletemarkerarray=$scope.mylevel1;
            $scope.deleteMarkers();
            $scope.deletemarkerarray=$scope.mycircle4;
            $scope.deleteMarkers();
            $scope.deletemarkerarray=$scope.mylevel4;
            $scope.deleteMarkers();
        }

        if((zoomvalue==5) )

        {
            $scope.myMarkers=$scope.mycircle3;
            console.log($scope.myMarkers);
            $scope.showMarkers();
            $scope.myMarkers=$scope.mylevel3;
            $scope.showMarkers();
            $scope.deletemarkerarray=$scope.mycircle2;
            $scope.deleteMarkers();
            $scope.deletemarkerarray=$scope.mylevel2;
            $scope.deleteMarkers();
            $scope.deletemarkerarray=$scope.mycircle1;
            $scope.deleteMarkers();
            $scope.deletemarkerarray=$scope.mylevel1;
            $scope.deleteMarkers();
            $scope.deletemarkerarray=$scope.mycircle4;
            $scope.deleteMarkers();
            $scope.deletemarkerarray=$scope.mylevel4;
            $scope.deleteMarkers();
        }
        if((zoomvalue==6) )

        {
            $scope.myMarkers=$scope.mycircle4;
            console.log($scope.myMarkers);
         //   $scope.managemarker();
            $scope.showMarkers();
            $scope.myMarkers=$scope.mylevel4;
            $scope.showMarkers();
            $scope.deletemarkerarray=$scope.mycircle2;
            $scope.deleteMarkers();
            $scope.deletemarkerarray=$scope.mylevel2;
            $scope.deleteMarkers();
            $scope.deletemarkerarray=$scope.mycircle1;
            $scope.deleteMarkers();
            $scope.deletemarkerarray=$scope.mylevel1;
            $scope.deleteMarkers();
            $scope.deletemarkerarray=$scope.mycircle3;
            $scope.deleteMarkers();
            $scope.deletemarkerarray=$scope.mylevel3;
            $scope.deleteMarkers();
        }

    };
    $scope.openMarkerInfo = function(marker) {
        $scope.myInfoWindow.open($scope.myMap, marker);
    };

    $scope.setMarkerPosition = function(marker, lat, lng) {
        marker.setPosition(new google.maps.LatLng(lat, lng));
    };

    $scope.managemarker = function(){
        var query = {};
        query.table = "News__pajhwok";
        query.columns =  ["location","title"];
        var queryParams = {query:JSON.stringify(query), "ask":"5301e64492f51ed71842a5d1","osk":"530459b8aed74b22457bad37"};
        var serviceURL = "rest/data";
        $scope.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (markerreturn) {
            $scope.markerreturnvalue=markerreturn.data;
            console.log($scope.markerreturnvalue);
            alert("hey");
        }, function (jqxhr, error) {
            alert("error");
        });
    }

}]);