var ASK = "5301e64492f51ed71842a5d1";
var OSK = "530459b8aed74b22457bad37";
var GENERAL = "53181dcc7754938f0ecfd265";
var EDITOR = "53181dcc7754938f0ecfd266";
var ADMIN = "53181dcc7754938f0ecfd267";
var ENGLISH_LANGUAGE = "5304a09a476f9b995eb672f1";
var DARI_LANGUAGE = "5304a0ec476f9b995eb672f3";
var PASHTO_LANGUAGE = "5304a0cb476f9b995eb672f2";
var DEFAULT_CITY_ID = "008e3bc254ff22e1f134d7f58cd3abfc";
var ELECTION_OPINION = "5304a6c3476f9b995eb6732b";
var ELECTION_MONITOR = "5304a6b0476f9b995eb6732a";
var VOTES_FOR_PEACE = "5304a69d476f9b995eb67323";
var SECURITY_INCIDENTS = "5304a323476f9b995eb67308";
var VOILATION_FRAUD = "5304a2af476f9b995eb67307";

var pajhwokApp = angular.module('pajhwokapp', ['ngRoute', '$appstrap.services', 'ui.map', 'ui.event']);
pajhwokApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
            templateUrl:'../home',
            controller:'homeCtrl'
        }).when('/news/:newsid', {
                templateUrl:'../news',
                controller:'articleCtrl'
            }).when('/map/category/:catid/language/:languageid/search', {
                templateUrl:'../mapview',
                controller:'MapCtrl'
            }).when('/search/category/:catid/state/:stateid/language/:languageid', {
                templateUrl:'../search',
                controller:'searchCtrl'

            }).when('/home', {
                templateUrl:'../home',
                controller:'homeCtrl'
            }).when('/search', {
                templateUrl:'../searchcustom',
                controller:'customSearchCtrl'

            }).when('/mymedia', {
                templateUrl:'../mymedia',
                controller:'myMediaCtrl'

            }).when('/manageunpublishnews', {
                templateUrl:'../manageunpublishnews',
                controller:'manageUnpublishNewsCtrl'

            }).when('/tileview', {
                templateUrl:'../home',
                controller:'homeCtrl'

            }).when('/manageflaggednews', {
                templateUrl:'../manageflagednews',
                controller:'manageFlagedNewsCtrl'

            }).when('/myunpublishmedia', {
                templateUrl:'../myunpublishmedia',
                controller:'myunpublishMediaCtrl'

            }).when('/manageuser', {
                templateUrl:'../manageuser',
                controller:'userCtrl'

            });
        ;
    }]);
pajhwokApp.controller('MapCtrl', function ($scope, $compile, $http, $location, $appService, $rootScope, $routeParams) {

    var categoryid=$routeParams.catid;
    var languageid=$routeParams.languageid;
    $scope.mapSearchCategory="";
    $scope.mapSearchText=$routeParams.q;
	$scope.changeMenu(false);
    $scope.labelDetail.mapVisibleCategoryFilter=true;
    if(categoryid!="null")
    {for(var i=0;i<$scope.category.length;i++){
        if(categoryid==$scope.category[i]._id) {
        if(languageid==ENGLISH_LANGUAGE){
            $scope.mapSearchCategory=$scope.category[i]["en_title"];
            break;
        }
        else if(languageid==DARI_LANGUAGE){
            $scope.mapSearchCategory=$scope.category[i]["dr_title"];
            break;
        }
        else if(languageid==PASHTO_LANGUAGE){
            $scope.mapSearchCategory=$scope.category[i]["ps_title"];
            break;
        }
        }
    } }
    $scope.mapOptions = {
        center:new google.maps.LatLng(34.52846, 68.3424),
        zoom:6,
        options:{
            streetViewControl:false,
            disableDoubleClickZoom:false,
            draggable:true,
            panControl:false,
            maxZoom:12,
            minZoom:6
        }
//        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var citymap1 = {};
    citymap1['chicago'] = {
        center:new google.maps.LatLng(34.878113, 67.629798),
        population:2842518
    };

    var citymap2 = {};
    citymap2['chicago'] = {
        center:new google.maps.LatLng(32.878113, 65.629798),
        population:6844829
    };
    $scope.mycircle1 = [];
    $scope.mycircle2 = [];
    $scope.mycircle3 = [];
    $scope.mycircle4 = [];
    $scope.mylevel1 = [];
    $scope.mylevel2 = [];
    $scope.mylevel3 = [];
    $scope.mylevel4 = [];

    $scope.showinfo = function (centerval, labeltext1) {
        var labelText = labeltext1;
        $scope.mylabeloption = {
            content:labelText,
            map:$scope.myMap,
            boxStyle:{
                textAlign:"center",
                fontSize:"15pt",
                width:"20px"
            },
            disableAutoPan:true,
            pixelOffset:new google.maps.Size(-10, -10),
            position:centerval,
            closeBoxURL:"",
            isHidden:false,
            pane:"mapPane",
            enableEventPropagation:true
        };
        $scope.ibLabel = new InfoBox($scope.mylabeloption);
        $scope.ibLabel.open($scope.myMap);

    }

    $scope.onmapidl = function () {
        $scope.mapcornervalue = $scope.myMap.getBounds();
        for (var city in citymap1) {
            $scope.mycircle1.push(new google.maps.Circle({
                map:$scope.myMap,
                geodesic:true,
                fillColor:'white',
                strokeColor:'white',
                strokeOpacity:1.0,
                strokeWeight:0.2,
                title:5,
                center:citymap1[city].center,
                radius:citymap1[city].population / 10000000000000000000000000
            }));
        }
        if ($scope.myMap.getZoom() == 6) {
            $scope.managemarker();
        }
    };

    $scope.onmycal = function () {
        $scope.managemarker();
        for (var city in citymap1) {
            $scope.mycircle1.push(new google.maps.Circle({
                map:$scope.myMap,
                geodesic:true,
                fillColor:'#CC0000',
                strokeColor:'white',
                strokeOpacity:1.0,
                strokeWeight:2,
                title:5,
                center:citymap1[city].center,
                radius:citymap1[city].population / 1000000000000000
            }));
        }
    }

    $scope.setdeletemap = function (map, markerArr) {
        for (var i = 0; i < markerArr.length; i++) {
            markerArr[i].setMap(map);
        }
    }

    $scope.clearMarkers = function (markerArr) {
        $scope.setdeletemap(null, markerArr);
    }

    $scope.deleteMarkers = function (markerArr) {
        $scope.clearMarkers(markerArr);
    }
    $scope.mapuserfun = function (catmap, langvalue, searchmap) {
        $scope.languagemap = langvalue;
        $scope.categoryvaluemap = catmap;
        console.log($scope.categoryvaluemap);
        $scope.searchTxtmap = searchmap;
        $scope.setZoomMessage(6);
    }

    $scope.setZoomMessage = function (zoomvalue) {
        if ((zoomvalue == 6)) {
            $scope.managemarker();
            $scope.deleteMarkers($scope.mycircle3);
            $scope.deleteMarkers($scope.mylevel3);
            $scope.deleteMarkers($scope.mycircle1);
            $scope.deleteMarkers($scope.mylevel1);
            $scope.deleteMarkers($scope.mycircle4);
            $scope.deleteMarkers($scope.mylevel4);
        }

        if ((zoomvalue == 7)) {
            $scope.deleteMarkers($scope.mycircle2);
            $scope.deleteMarkers($scope.mylevel2);
            $scope.deleteMarkers($scope.mycircle1);
            $scope.deleteMarkers($scope.mylevel1);
            $scope.deleteMarkers($scope.mycircle4);
            $scope.deleteMarkers($scope.mylevel4);
            $scope.managemarker1();
        }
        if ((zoomvalue > 7)) {
            $scope.managemarker2();
            $scope.deleteMarkers($scope.mycircle2);
            $scope.deleteMarkers($scope.mylevel2);
            $scope.deleteMarkers($scope.mycircle1);
            $scope.deleteMarkers($scope.mylevel1);
            $scope.deleteMarkers($scope.mycircle3);
            $scope.deleteMarkers($scope.mylevel3);
        }
    };
    $scope.newbound = function (zoomvalue1) {
        if (zoomvalue1 > 7) {
            $scope.mapcornervalue = $scope.mapcornervalue;
            $scope.managemarker2();
        }
    }
    $scope.setvalue = function () {
        $scope.myMap.setZoom($scope.myMap.getZoom() + 1);
    }
    $scope.openMarkerInfo = function (marker, abkeys) {
        $scope.currentMarker = JSON.stringify(abkeys);
        $scope.currentMarkerLat = marker.getPosition().lat();
        $scope.currentMarkerLng = marker.getPosition().lng();
        $scope.currentLatLong = marker.getPosition().lat().toFixed(4) + ',' + marker.getPosition().lng().toFixed(4);
        $scope.myInfoWindow.open($scope.myMap, marker);
        $.each(abkeys, function (titlekey, titlevalue) {
            var datatitle_array = titlekey.split(',');
            var newlong = Number(datatitle_array[0]).toFixed(4);
            var newlat = Number(datatitle_array[1]).toFixed(4);
            if (newlong == marker.getPosition().lat().toFixed(4) && newlat == marker.getPosition().lng().toFixed(4)) {
                $scope.myInfoWindow.setContent('<div style="height:70px;width:120px"><div style="float:left;margin-top:5px;margin-right:1px;"><img src=' + titlevalue.imageurl + '></div><a href="/#/news/' + titlevalue._id + '">' + titlevalue.title + '</a></div>');
            }
        });
    };
    // for zoom level 6
    $scope.managemarker = function () {
        var query = {};
        query.table = "News__pajhwok";
        query.columns = [{"expression":"_id","aggregate":"count","alias":"count"}];
        query.filter = { "__createdon":"last-3-days"};
        if ($scope.categoryvaluemap != "null") {
            console.log($scope.categoryvaluemap);
            query.filter.category = {"_id":$scope.categoryvaluemap};
            $scope.deleteMarkers($scope.mylevel2);
        }
        if ($scope.searchTxtmap != "null") {
            query.filter.title = {"$regex":"(" + $scope.searchTxtmap + "\w*)", "$options":"-i"};
        }
        if ($scope.languagemap != "null") {
            query.filter.transid = {"_id":$scope.languagemap};
        }
        else {
            query.filter.transid = {"_id":ENGLISH_LANGUAGE};
        }
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceURL = "rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (markerreturn) {
            $scope.markerreturnvalue = markerreturn.response;
            if ($scope.myMap.getZoom() == 6 || !$scope.myMap) {
                for (var city in citymap2) {
                    $scope.mycircle2.push(new google.maps.Circle({
                        map:$scope.myMap,
                        geodesic:true,
                        fillColor:'#CC0000',
                        strokeColor:'white',
                        strokeOpacity:1.0,
                        strokeWeight:2,
                        title:'Afgan News',
                        center:citymap2[city].center,
                        radius:citymap2[city].population / 90
                    }));
                    /*change for count now count is in data*/
                    if($scope.markerreturnvalue.data.length){
                    $scope.showinfo(citymap2[city].center, $scope.markerreturnvalue.data[0].count);
                    }
                    else{
                        $scope.showinfo(citymap2[city].center,0);
                    }
                    $scope.mylevel2.push($scope.ibLabel);
                }
                $scope.myMarkers1 = $scope.mycircle2;
            }
        }, function (jqxhr, error) {
            alert("error");
        });
    }
    // for zoom level 7
    $scope.managemarker1 = function () {
        var query = {};
        query.table = "News__pajhwok";
        query.columns = [
            {"expression":"cityid", "aggregate":"count", "alias":"count"}
        ];
        query.childs = [
            {"alias":"cityid", "usein":true, "onetoone":true, "relatedcolumn":"_id", "query":{"table":"City__pajhwok", "columns":["location"]}}
        ]
        query.groups = ["cityid._id"];
        query.filter = { "__createdon":"last-3-days"};
        if ($scope.categoryvaluemap != "null") {
            query.filter.category = {"_id":$scope.categoryvaluemap};
        }
        if ($scope.searchTxtmap != "null") {
            query.filter.title = {"$regex":"(" + searchTxtmap + "\w*)", "$options":"-i"};
        }
        if ($scope.languagemap != "null") {
            query.filter.transid = {"_id":$scope.languagemap};
        }
        else {
            query.filter.transid = {"_id":ENGLISH_LANGUAGE};
        }

        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceURL = "rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (markerreturn) {
            $scope.markerreturnvalue1 = markerreturn.response.data;
            var citymap3 = {};

            for (var i = 0; i < $scope.markerreturnvalue1.length; i++) {
                var row = $scope.markerreturnvalue1[i];
                citymap3[i] = {
                    center:new google.maps.LatLng(row.cityid.location[0], row.cityid.location[1]),
                    population:3844829
                };
                if ($scope.myMap.getZoom() == 7) {
                    $scope.mycircle3.push(new google.maps.Circle({
                        map:$scope.myMap,
                        geodesic:true,
                        fillColor:'#CC0000',
                        strokeColor:'white',
                        strokeOpacity:1.0,
                        strokeWeight:2,
                        title:5,
                        center:citymap3[i].center,
                        radius:citymap3[i].population / 120
                    }));

                    $scope.showinfo(citymap3[i].center, row.count);
                    $scope.mylevel3.push($scope.ibLabel);
                }
            }
            $scope.myMarkers2 = $scope.mycircle3;
        }, function (jqxhr, error) {
            alert("error");
        });
    }

// for zoom level > 7
    $scope.managemarker2 = function () {
        var locationwisetitle = {};
        $scope.tit = [];
        $.each($scope.mapcornervalue, function (titlekey1, titlevalue1) {
            $.each(titlevalue1, function (titlekey2, titlevalue2) {
                if (Number(titlevalue2)) {
                    $scope.tit[$scope.tit.length] = titlevalue2;
                }
            });
        });
        var areaoftown = { a:{ x:$scope.tit[0], y:$scope.tit[1] }, b:{ x:$scope.tit[0], y:$scope.tit[3]}, c:{ x:$scope.tit[2], y:$scope.tit[1] }, d:{ x:$scope.tit[2], y:$scope.tit[3] }};

        var query = {};
        var citymap4 = {};
        query.table = "News__pajhwok";
        query.columns = ["_id", "image", "title", "location", "cityid", "cityid.location"];
        query.filter = { "__createdon":"last-3-days"};
        if ($scope.categoryvaluemap != "null") {
            query.filter.category = {"_id":$scope.categoryvaluemap};
        }
        if ($scope.searchTxtmap != "null") {
            query.filter.title = {"$regex":"(" + searchTxtmap + "\w*)", "$options":"-i"};
        }
        if ($scope.languagemap != "null") {
            query.filter.transid = {"_id":$scope.languagemap};
        } else {
            query.filter.transid = {"_id":ENGLISH_LANGUAGE};
        }

        query.filter = {"location":{ "$within":{ "$polygon":areaoftown } } };
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceURL = "rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (markerreturn) {
            $scope.markerreturnvalue2 = markerreturn.response.data;
            for (var i = 0; i < $scope.markerreturnvalue2.length; i++) {
                var anonymousFileKey = "530835834b43556925e9b1ee";
                if ($scope.markerreturnvalue2[i].image) {
                    $scope.markerreturnvalue2[i].imageurl = "http://d8.daffodilapps.com/rest/file/render?filekey=" + $scope.markerreturnvalue2[i].image[0].key + '&ask=5301e64492f51ed71842a5d1&osk=530459b8aed74b22457bad37&resize={"width":50}&convert={"type":"png"}';
                }
                else {
                    $scope.markerreturnvalue2[i].imageurl = "http://d8.daffodilapps.com/rest/file/render?filekey=" + anonymousFileKey + '&ask=5301e64492f51ed71842a5d1&osk=530459b8aed74b22457bad37&resize={"width":50}&convert={"type":"png"}';
                }
                var row = $scope.markerreturnvalue2[i];
                var title = row.title;
                row.shorttitle = (title.length > 20) ? (title.substring(0, 20)).split(" ").slice(0, -1).join(" ") + "..." : title;
                locationwisetitle[row.location] = {"title":row.shorttitle, "_id":row._id, "imageurl":row.imageurl};
                $scope.locationtitlemain = locationwisetitle;
                var titlekeys = Object.keys(locationwisetitle);
            }
            for (var i = 0; i < titlekeys.length; i++) {
                var datatitle_array = titlekeys[i].split(',');
                citymap4[$scope.markerreturnvalue2[i].title] = {
                    center:new google.maps.LatLng(datatitle_array[0], datatitle_array[1])

                };
            }
            if ($scope.myMap.getZoom() > 7) {
                for (var c in citymap4) {
                    $scope.mycircle4.push(new google.maps.Marker({
                        map:$scope.myMap,
                        visible:true,
                        position:citymap4[c].center
                    }));
                }
                $scope.myMarkers = $scope.mycircle4;
            }
        }, function (jqxhr, error) {
            alert("error");
        });
    }
    $scope.mapuserfun($routeParams.catid, $routeParams.languageid, $routeParams.q);

});
pajhwokApp.controller('customSearchCtrl', function ($scope, $compile, $http, $location, $appService, $rootScope, $routeParams) {
    $scope.getCustomSearchNews = function (transid, searchContent) {
        $scope.searchView = true;
        $scope.loadingMessage = true;
        $scope.searchResultMessage = false;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
        var query = {};
        query.table = "News__pajhwok";
        var columnArray = ["_id", "title", "media", "commentcount", "category", "image", "__createdby.firstname", "activitycount", "clickcount", {"expression":"__createdon", "format":"fromnow"}];
        query.columns = columnArray;
        query.filter = {"status":"approved"};
        if (transid != null && transid != undefined && transid != "null") {
            query.filter["transid"] = transid;
        }
        if (searchContent != null || searchContent != undefined || searchContent != "null") {
            query.filter["title"] = {"$regex":"\\b" + searchContent + "\\b", "$options":"-i"}
        }
        query.orders = {"__createdon":"desc"};
        var timeZone = new Date().getTimezoneOffset();
        timeZone = timeZone * 60000;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "state":JSON.stringify({"timezone":timeZone})};
        var serviceURL = "/rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (categoryData) {
            $scope.customSearchData = categoryData.response.data;
            $scope.loadingMessage = false;
            $scope.customSearchDataVisible = "";
            if ($scope.customSearchData.length) {
                $scope.searchResultMessage = false;
                $scope.customSearchDataVisible = "true";
            }
            else {
                $scope.searchResultMessage = true;
                $scope.customSearchDataVisible = "false";
            }
            for (var i = 0; i < $scope.customSearchData.length; i++) {
                if ($scope.customSearchData[i]["image"]) {
                    $scope.customSearchData[i]["imgurl"] = BAAS_SERVER + "/file/render?filekey=" + $scope.customSearchData[i]["image"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK + '&resize={"width":253,"height":180}&convert={"type":"png"}';
                } else {
                    /*for default image*/
                    $scope.customSearchData[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + ASK + "&osk=" + OSK + '&resize={"width":253,"height":180}&convert={"type":"png"}';
                }
            }
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
        })
    }
    $scope.getCustomSearchNews($scope.selectedTrans, $routeParams.q);
});
pajhwokApp.controller('searchCtrl', function ($scope, $compile, $http, $location, $appService, $rootScope, $routeParams) {
    $(".selected_category").removeClass("selected_category");
    $scope.getSearchNews = function (category, state, language, user, search, max_row, cursor) {
        $scope.searchView = true;
        $scope.loadingMessage = true;
        $scope.searchResultMessage = false;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
        var query = {};
        query.table = "News__pajhwok";
        var columnArray = ["_id", "title", "media", "commentcount", "category", "image", "__createdby.firstname", "activitycount", "clickcount", {"expression":"__createdon", "format":"fromnow"}];
        query.columns = columnArray;
        query.filter = {"status":"approved"};
        if (category != null && category != undefined && category != "null") {
            query.filter["category"] = category;
        }
        if (state != null && state != undefined && state != "null") {
            query.filter["stateid"] = city;
        }
        if (language != null && language != undefined && language != "null") {
            query.filter["transid"] = language;
        }

//        if (search != null || search != undefined || search != "null") {
//            query.filter["title"] = {"$regex":"\\b" + search + "\\b", "$options":"-i"}
//        }
        if (max_row) {
            query.max_rows = max_row;
        }
        if (cursor) {
            query.cursor = cursor;
        }
        query.orders = {"__createdon":"desc"};

        var timeZone = new Date().getTimezoneOffset();
        timeZone = timeZone * 60000;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "state":JSON.stringify({"timezone":timeZone})};
        var serviceURL = "/rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (categoryData) {
            $scope.searchedNews = categoryData.response.data;
            $scope.loadingMessage = false;
            $scope.searchedNewsVisible = "";
            if ($scope.searchedNews.length) {
                $scope.searchResultMessage = false;
                $scope.searchedNewsVisible = "true";
            }
            else {
                $scope.searchResultMessage = true;
                $scope.searchedNewsVisible = "false";
            }
            for (var i = 0; i < $scope.searchedNews.length; i++) {
                if ($scope.searchedNews[i]["image"]) {
                    $scope.searchedNews[i]["imgurl"] = BAAS_SERVER + "/file/render?filekey=" + $scope.searchedNews[i]["image"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK + '&resize={"width":253,"height":180}&convert={"type":"png"}';
                } else {
                    /*for default image*/
                    $scope.searchedNews[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + ASK + "&osk=" + OSK + '&resize={"width":253,"height":180}&convert={"type":"png"}';
                }
            }
            if (!$scope.$$phase) {
                $scope.$apply();
            }

        }, function (jqxhr, error) {
        })
    }
    $scope.getSearchNews($routeParams.catid, $routeParams.stateid, $routeParams.languageid);
});
pajhwokApp.controller('articleCtrl', function ($scope, $compile, $http, $location, $appService, $rootScope, $routeParams) {
    $scope.getArticleNews = function () {
        if (true) {
            var query = {"table":"News__pajhwok"};
            query.columns = ["_id", "title", "media", "category", "status", "likeby", "likecount", "flaggedby", "description", "commentcount", "clickcount", {"expression":"comment", "columns":["content", "__createdby.firstname", {"expression":"__createdon", "format":"fromnow"}]}, "image", "__createdby.firstname", "activitycount", "clickcount", {"expression":"__createdon", "format":"fromnow"}];
            query.filter = {"_id":$routeParams.newsid}
            var currentSession = $scope.getSession();
            if (!currentSession || currentSession["roleid"] == GENERAL) {
                query.filter["status"] = "approved";
            }

            var timeZone = new Date().getTimezoneOffset();
            timeZone = timeZone * 60000;
            var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "usk":null, "state":JSON.stringify({"timezone":timeZone})};
            var serviceURL = "/rest/data";
            $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (topStoriesData) {
                $scope.news = topStoriesData.response.data;
                $scope.newsVisible = "";
                if ($scope.news.length) {
                    $scope.newsVisible = "true";
                    if ($scope.news[0].flagstatus) {
                        $scope.boolflag = true;
                    } else {
                        $scope.boolflag = false;
                    }
                    for (var i = 0; i < $scope.news.length; i++) {
                        if ($scope.news[i]["image"]) {
                            $scope.news[i]["imgurl"] = BAAS_SERVER + "/file/render?filekey=" + $scope.news[i]["image"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK + '&resize={"width":635,"height":310}&convert={"type":"png"}';
                        } else {
                            /*for default image*/
                            $scope.news[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + ASK + "&osk=" + OSK + '&resize={"width":635,"height":310}&convert={"type":"png"}';
                        }
                    }
                    $scope.getSimilarCategory(5, $scope.news[0]['category']['_id'], $routeParams.newsid);
                    $scope.updateViewCount($scope.news[0]);

                    $scope.setTopNews($scope.news[0], true, 779, 500);

                }
                else {
                    $scope.newsVisible = "false";
                }

            }, function (jqxhr, error) {
            })
        }
    }
    $scope.getArticleNews();

});
pajhwokApp.controller('myMediaCtrl', function ($scope, $compile, $http, $location, $appService, $rootScope) {
    $scope.getMyMedia = function () {
        if (!$scope.$$phase) {
            $scope.$apply();
        }
        var query = {};
        query.table = "News__pajhwok";
        var columnArray = ["_id", "title", "media", "commentcount", "category", "image", "__createdby.firstname", "activitycount", "clickcount", {"expression":"__createdon", "format":"fromnow"}];
        query.columns = columnArray;
        query.$count = 1;
        query.filter = {"__createdby":"{_CurrentUserId}", "status":"approved"};
        query.max_rows = $scope.rows;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "usk":$scope.currentSession["usk"]};
        var serviceURL = "/rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (mediaData) {
            $scope.myAllMedia = mediaData.response.data;
            $scope.cursor = mediaData.response.cursor;
            $scope.maxRows = mediaData.response.$count;
            $scope.myAllMediaVisible = "";
            if ($scope.myAllMedia.length) {
                $scope.myAllMediaVisible = "true";
            }
            else {
                $scope.myAllMediaVisible = "false";
            }
            for (var i = 0; i < $scope.myAllMedia.length; i++) {
                if ($scope.myAllMedia[i]["image"]) {
                    $scope.myAllMedia[i]["imgurl"] = "/rest/file/render?filekey=" + $scope.myAllMedia[i]["image"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK + '&resize={"width":253,"height":180}&convert={"type":"png"}';
                } else {
                    /*for default image*/
                    $scope.myAllMedia[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + ASK + "&osk=" + OSK + '&resize={"width":253,"height":180}&convert={"type":"png"}';
                }
            }
            if (!$scope.$$phase) {
                $scope.$apply();
            }

        }, function (jqxhr, error) {
        })
    }
    $scope.getMoreMedia = function (cursor) {
        if ($scope.loadingMedia == true) {
            return;
        }
        $scope.loadingMedia = true;
        if ($scope.cursor + $scope.rows > $scope.maxRows) {
            var rows = $scope.cursor + $scope.rows - $scope.maxRows;
        }
        else {
            var rows = $scope.rows;
        }

        var query = {};
        query.table = "News__pajhwok";
        var columnArray = ["_id", "title", "media", "commentcount", "category", "image", "__createdby.firstname", "activitycount", "clickcount", {"expression":"__createdon", "format":"fromnow"}];
        query.filter = {"__createdby":"{_CurrentUserId}", "status":"approved"};
        query.max_rows = rows;
        query.cursor = cursor;
        query.columns = columnArray;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "usk":$scope.currentSession["usk"]};
        var serviceURL = "/rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (mediaData) {
            $scope.loadingMedia = false;
            for (var i = 0; i < mediaData.response.data.length; i++) {
                $scope.myAllMedia.push(mediaData.response.data[i]);
            }
            for (var i = $scope.cursor; i < mediaData.response.data.length + $scope.cursor; i++) {
                if ($scope.myAllMedia[i]["image"]) {
                    $scope.myAllMedia[i]["imgurl"] = "/rest/file/render?filekey=" + $scope.myAllMedia[i]["image"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK + '&resize={"width":253,"height":180}&convert={"type":"png"}';
                } else {
                    /*for default image*/
                    $scope.myAllMedia[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + ASK + "&osk=" + OSK + '&resize={"width":253,"height":180}&convert={"type":"png"}';
                }
            }
            $scope.cursor = mediaData.cursor;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
        })
    };
    $scope.currentSession = $scope.getSession();
    if ($scope.currentSession) {
        $scope.cursor = "";
        $scope.loadingMedia = false;
        $scope.maxRows = null;
        $scope.rows = 3;
        $scope.getMyMedia();

    } else {
        $scope.bShowAlertPopup = true;
        $scope.alertPopupMsg = "Please login first";
    }

})
pajhwokApp.controller('myunpublishMediaCtrl', function ($scope, $compile, $http, $location, $appService, $rootScope) {
    $scope.getMyMedia = function () {
        if (!$scope.$$phase) {
            $scope.$apply();
        }
        var query = {};
        query.table = "News__pajhwok";
        var columnArray = ["_id", "title", "media", "commentcount", "category", "image", "__createdby.firstname", "activitycount", "clickcount", {"expression":"__createdon", "format":"fromnow"}];
        query.columns = columnArray;
        query.$count = 1;
        query.filter = {"__createdby":"{_CurrentUserId}", "status":"new"};
        query.max_rows = $scope.rows;

        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "usk":$scope.currentSession["usk"]};
        var serviceURL = "/rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (mediaData) {
            $scope.myunpublishAllMedia = mediaData.response.data;
            $scope.cursor = mediaData.response.cursor;
            $scope.maxRows = mediaData.response.$count;
            $scope.myunpublishAllMediaVisible = "";
            if ($scope.myunpublishAllMedia.length) {
                $scope.myunpublishAllMediaVisible = "true";
            }
            else {
                $scope.myunpublishAllMediaVisible = "false";
            }
            for (var i = 0; i < $scope.myunpublishAllMedia.length; i++) {
                if ($scope.myunpublishAllMedia[i]["image"]) {
                    $scope.myunpublishAllMedia[i]["imgurl"] = "/rest/file/render?filekey=" + $scope.myunpublishAllMedia[i]["image"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK + '&resize={"width":253,"height":180}&convert={"type":"png"}';
                } else {
                    /*for default image*/
                    $scope.myunpublishAllMedia[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + ASK + "&osk=" + OSK + '&resize={"width":253,"height":180}&convert={"type":"png"}';
                }
            }
            if (!$scope.$$phase) {
                $scope.$apply();
            }

        }, function (jqxhr, error) {
        })
    }
    $scope.getMoreMedia = function (cursor) {
        if ($scope.loadingMedia == true) {
            return;
        }
        $scope.loadingMedia = true;
        if ($scope.cursor + $scope.rows > $scope.maxRows) {
            var rows = $scope.cursor + $scope.rows - $scope.maxRows;
        }
        else {
            var rows = $scope.rows;
        }

        var query = {};
        query.table = "News__pajhwok";
        var columnArray = ["_id", "title", "media", "commentcount", "category", "image", "__createdby.firstname", "activitycount", "clickcount", {"expression":"__createdon", "format":"fromnow"}];
        query.filter = {"__createdby":"{_CurrentUserId}", "status":"new"};
        query.max_rows = rows;
        query.cursor = cursor;
        query.columns = columnArray;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "usk":$scope.currentSession["usk"]};
        var serviceURL = "/rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (mediaData) {
            $scope.loadingMedia = false;
            for (var i = 0; i < mediaData.response.data.length; i++) {
                $scope.myunpublishAllMedia.push(mediaData.response.data[i]);
            }
            for (var i = $scope.cursor; i < mediaData.response.data.length + $scope.cursor; i++) {
                if ($scope.myunpublishAllMedia[i]["image"]) {
                    $scope.myunpublishAllMedia[i]["imgurl"] = "/rest/file/render?filekey=" + $scope.myunpublishAllMedia[i]["image"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK + '&resize={"width":253,"height":180}&convert={"type":"png"}';
                } else {
                    /*for default image*/
                    $scope.myunpublishAllMedia[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + ASK + "&osk=" + OSK + '&resize={"width":253,"height":180}&convert={"type":"png"}';
                }
            }
            $scope.cursor = mediaData.cursor;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
        })
    };
    $scope.currentSession = $scope.getSession();
    if ($scope.currentSession) {
        $scope.cursor = "";
        $scope.loadingMedia = false;
        $scope.maxRows = null;
        $scope.rows = 3;
        $scope.getMyMedia();
    } else {
        $scope.bShowAlertPopup = true;
        $scope.alertPopupMsg = "Please login first";
    }

})
pajhwokApp.controller('manageUnpublishNewsCtrl', function ($scope, $compile, $http, $location, $appService, $rootScope) {
    $scope.cursor = "";
    $scope.loadingMedia = false;
    $scope.maxRows = null;
    $scope.rows = 3;
    $scope.getUnpublishNews = function () {
        if ($scope.getSession()) {
            var query = {};
            query.table = "News__pajhwok";
            var columnArray = ["_id", "title", "media", "published", "category", "image", "__createdby.firstname", "activitycount", "clickcount", {"expression":"__createdon", "format":"fromnow"}];
            query.columns = columnArray;
            query.$count = 1;
            query.filter = {"status":"new"};
            query.max_rows = $scope.rows;
            var currentSession = $scope.getSession();

            if (!currentSession) {
                $scope.bShowAlertPopup = true;
                $scope.alertPopupMsg = "Please login first";
                window.location.href = "/";
                return;
            }
            if (currentSession["roleid"] == GENERAL) {
                $scope.flaggedNewsVisible = "false";
                $scope.bShowAlertPopup = true;
                $scope.alertPopupMsg = "You don't have permission to access this page";
                return;
            }
            var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "usk":currentSession["usk"]};
            var serviceURL = "/rest/data";
            $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (unpublishedData) {
                $scope.unpublishedNews = unpublishedData.response.data;
                $scope.unpublishedNewsVisible = "";
                if ($scope.unpublishedNews.length) {
                    $scope.unpublishedNewsVisible = "true";
                }
                else {
                    $scope.unpublishedNewsVisible = "false";
                }
                $scope.cursor = unpublishedData.cursor;
                $scope.maxRows = unpublishedData.$count;
                for (var i = 0; i < $scope.unpublishedNews.length; i++) {
                    if ($scope.unpublishedNews[i]["image"]) {
                        $scope.unpublishedNews[i]["imgurl"] = "/rest/file/render?filekey=" + $scope.unpublishedNews[i]["image"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK + '&resize={"width":253,"height":180}&convert={"type":"png"}';
                    } else {
                        /*for default image*/
                        $scope.unpublishedNews[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + ASK + "&osk=" + OSK + '&resize={"width":253,"height":180}&convert={"type":"png"}';
                    }
                }
                if (!$scope.$$phase) {
                    $scope.$apply();
                }

            }, function (jqxhr, error) {
            })


            $scope.getMoreMedia = function (cursor) {
                if ($scope.loadingMedia == true) {
                    return;
                }
                $scope.loadingMedia = true;
                if ($scope.cursor + $scope.rows > $scope.maxRows) {
                    var rows = $scope.cursor + $scope.rows - $scope.maxRows;
                }
                else {
                    var rows = $scope.rows;
                }

                var query = {};
                query.table = "News__pajhwok";
                var columnArray = ["_id", "title", "media", "commentcount", "category", "image", "__createdby.firstname", "activitycount", "clickcount", {"expression":"__createdon", "format":"fromnow"}];
                query.filter = {"status":"new"};
                query.max_rows = rows;
                query.cursor = cursor;
                query.columns = columnArray;
                var currentSession = $scope.getSession();
                var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "usk":currentSession["usk"]};
                var serviceURL = "/rest/data";
                $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (unpublishedData) {

                    $scope.loadingMedia = false;
                    for (var i = 0; i < unpublishedData.response.data.length; i++) {
                        $scope.unpublishedNews.push(unpublishedData.response.data[i]);
                    }
                    for (var i = $scope.cursor; i < unpublishedData.response.data.length + $scope.cursor; i++) {
                        if ($scope.unpublishedNews[i]["image"]) {
                            $scope.unpublishedNews[i]["imgurl"] = "/rest/file/render?filekey=" + $scope.unpublishedNews[i]["image"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK;
                        } else {
                            /*for default image*/
                            $scope.unpublishedNews[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + ASK + "&osk=" + OSK + '&resize={"width":253,"height":180}&convert={"type":"png"}';
                        }
                    }
                    $scope.cursor = unpublishedData.response.cursor;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                }, function (jqxhr, error) {
                })
            };
        }
        else {

            $scope.bShowAlertPopup = true;
            $scope.alertPopupMsg = "Please login first";
        }

    }


})
pajhwokApp.controller('manageFlagedNewsCtrl', function ($scope, $compile, $http, $location, $appService, $rootScope, $routeParams) {
    $scope.cursor = "";
    $scope.loadingMedia = false;
    $scope.maxRows = null;
    $scope.rows = 3;
    $scope.getFlaggedNews = function () {
        var query = {};
        query.table = "News__pajhwok";
        var columnArray = ["_id", "title", "media", "flaggedcount", "category", "image", "__createdby.firstname", "activitycount", "clickcount", {"expression":"__createdon", "format":"fromnow"}];
        query.columns = columnArray;
        query.$count = 1;
        query.filter = {"flaggedcount":{$gt:0}};
        query.max_rows = $scope.rows;
        var currentSession = $scope.getSession();
        if (!currentSession) {
            $scope.bShowAlertPopup = true;
            $scope.alertPopupMsg = "Please login first";
            window.location.href = "/";
            return;
        }
        if (currentSession["roleid"] == GENERAL) {
            $scope.flaggedNewsVisible = "false";
            $scope.bShowAlertPopup = true;
            $scope.alertPopupMsg = "You don't have permission to access this page";
            return;
        }
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "usk":currentSession["usk"]};
        var serviceURL = "/rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (flaggedData) {
            $scope.flaggedNews = flaggedData.response.data;
            $scope.cursor = flaggedData.response.cursor;
            $scope.maxRows = flaggedData.response.$count;
            $scope.flaggedNewsVisible = "";
            if ($scope.flaggedNews.length) {
                $scope.flaggedNewsVisible = "true";
            }
            else {
                $scope.flaggedNewsVisible = "false";
            }
            $scope.flaggedResult = $scope.flaggedNews.length ? false : true;
            for (var i = 0; i < $scope.flaggedNews.length; i++) {
                if ($scope.flaggedNews[i]["image"]) {
                    $scope.flaggedNews[i]["imgurl"] = "/rest/file/render?filekey=" + $scope.flaggedNews[i]["image"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK + '&resize={"width":253,"height":180}&convert={"type":"png"}';
                } else {
                    /*for default image*/
                    $scope.flaggedNews[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + ASK + "&osk=" + OSK + '&resize={"width":253,"height":180}&convert={"type":"png"}';
                }
            }
            if (!$scope.$$phase) {
                $scope.$apply();
            }

        }, function (jqxhr, error) {
        })
    };

    $scope.getMoreFlaggedMedia = function (cursor) {
        if ($scope.loadingMedia == true) {
            return;
        }
        $scope.loadingMedia = true;
        if ($scope.cursor + $scope.rows > $scope.maxRows) {
            var rows = $scope.cursor + $scope.rows - $scope.maxRows;
        }
        else {
            var rows = $scope.rows;
        }

        var query = {};
        query.table = "News__pajhwok";
        var columnArray = ["_id", "title", "media", "commentcount", "flaggedcount", "category", "image", "__createdby.firstname", "activitycount", "clickcount", {"expression":"__createdon", "format":"fromnow"}];
        query.filter = {"flaggedcount":{$gt:0}};
        query.max_rows = rows;
        query.cursor = cursor;
        query.columns = columnArray;
        var currentSession = $scope.getSession();
        if (!currentSession) {
            $scope.bShowAlertPopup = true;
            $scope.alertPopupMsg = "please login first";
            return;
        }
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "usk":currentSession["usk"]};
        var serviceURL = "/rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (flaggedData) {
            $scope.loadingMedia = false;
            for (var i = 0; i < flaggedData.response.data.length; i++) {
                $scope.flaggedNews.push(flaggedData.response.data[i]);
            }
            for (var i = $scope.cursor; i < flaggedData.response.data.length + $scope.cursor; i++) {
                if ($scope.flaggedNews[i]["image"]) {
                    $scope.flaggedNews[i]["imgurl"] = "/rest/file/render?filekey=" + $scope.flaggedNews[i]["image"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK + '&resize={"width":253,"height":180}&convert={"type":"png"}';
                } else {
                    /*for default image*/
                    $scope.flaggedNews[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + ASK + "&osk=" + OSK + '&resize={"width":253,"height":180}&convert={"type":"png"}';
                }
            }
            $scope.cursor = flaggedData.cursor;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
        })
    };


});
pajhwokApp.controller('homeCtrl', function ($scope, $compile, $http, $location, $appService, $rootScope) {
    $scope.selectedCategoryid = null;
    $scope.uploadNews = false;
    $(".selected_category").removeClass("selected_category");
    if (!$scope.$$phase) {
        $scope.$apply();
    }
    $scope.getAllNews();
});
pajhwokApp.controller('pajhwokCtrl', function ($scope, $compile, $http, $location, $appService, $rootScope) {

    $scope.oFile = {};
    $scope.oFReader = {};
    $scope.displayType = {};
    $scope.topNews = {};
    $scope.searchedNews = [];
    $scope.topStoriesDetail = [];
    $scope.loading = {"loadingNews":false};
    $scope.defaultSelected = {"selectedCity":{"_id":DEFAULT_CITY_ID}};
    $scope.searchResultMessage = false;
    $scope.selectedCategoryid = null;
    $scope.selectedLanguageid = null;
    $scope.selectedUserid = null;
    $scope.selectedTrans = ENGLISH_LANGUAGE;
    $scope.uploadSelectedTrans = ENGLISH_LANGUAGE;
    $scope.labelDetail = {};
    $scope.city = [];
    $scope.uploadCities = [];
    $scope.availableLanguages = [];
    $scope.userSelectedLanguage = {};
    $scope.selectedCityLanguage = "";
    $scope.defaultSelectedCategory = {};
    $scope.newPost = {};
    $scope.currentUser = {};
    $scope.uploadNews = false;
    $scope.bShowAlertPopup = false;
    $scope.alertPopupMsg = "";
    $scope.getSession = function () {
        var currentSession = {};
        if (!$appService.getCookie("usk")) {
            return null;
        }
        currentSession["usk"] = $appService.getCookie("usk");
        currentSession["roleid"] = $appService.getCookie("roleid");
        currentSession["firstname"] = $appService.getCookie("firstname");
        currentSession["cuserid"] = $appService.getCookie("cuserid");

        if (currentSession["roleid"] == ADMIN || currentSession["roleid"] == EDITOR) {
            $scope.manage["opt"] = true;
        }
        else {
            $scope.manage["opt"] = false;
        }
        if (currentSession["roleid"] == ADMIN) {
            $scope.manage["user"] = true;
        }
        else {
            $scope.manage["user"] = false;
        }
        if (currentSession["usk"]) {
            $scope.manage["mymedia"] = true;
        }
        else {
            $scope.manage["mymedia"] = false;
        }
        return currentSession;

    }
    $scope.clearContent = function () {
        $scope.title = "";
        $scope.newPost.description = "";
        $('#uploadfile').val('').clone(true);
        $scope.showimage = false;
        $scope.videoAudio = false;
        if (!$scope.$$phase) {
            $scope.$apply();
        }

    }
    /*for menu view base on role*/
    $scope.manage = {};
    $scope.currentUser = $scope.getSession();
    $scope.logOut = function () {
        $appService.delete_cookie("usk");
        $appService.delete_cookie("roleid");
        $appService.delete_cookie("firstname");
        $appService.delete_cookie("cuserid");
        $scope.currentUser = $scope.getSession();
        $scope.manage = {};
        window.location.href = '/';
    }
    $scope.getTrans = function () {
        var query = {"table":"Trans__pajhwok"};
        query.columns = ["en_name"];
        var params = {"query":JSON.stringify(query), "ask":ASK, "osk":OSK};
        $appService.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
            $scope.uploadSelectedLanguage = callBackData.response.data;
            $scope.fetchCommonLabel();
        }, function (err) {
        });

    }
    $scope.getTrans();
    $scope.fetchCommonLabel = function () {
        var query = {"table":"CommanLabel__pajhwok"};
        query.columns = ["identifier", "en_label", "ps_label", "dr_label"];
        var params = {"query":JSON.stringify(query), "ask":ASK, "osk":OSK};
        $appService.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
            $scope.availableLanguages = callBackData.response.data;
            $scope.userSelectedLanguage.data = {};
            $scope.setLanguage(ENGLISH_LANGUAGE);
        }, function (err) {
        });

    }
    $scope.setUploadLanguage = function (id) {
        $scope.uploadSelectedTrans = id;
    }
    $scope.setLanguage = function (id) {
        if (id == ENGLISH_LANGUAGE) {
            for (var i = 0; i < $scope.availableLanguages.length; i++) {
                $scope.userSelectedLanguage.data[$scope.availableLanguages[i]["identifier"]] = $scope.availableLanguages[i]["en_label"];
            }

            for (var i = 0; i < $scope.uploadSelectedLanguage.length; i++) {
                if ($scope.uploadSelectedLanguage[i]._id == ENGLISH_LANGUAGE) {
                    $scope.newPostTrans = $scope.uploadSelectedLanguage[i];
                    break;
                }
            }
        }
        else if (id == DARI_LANGUAGE) {
            for (var i = 0; i < $scope.availableLanguages.length; i++) {
                $scope.userSelectedLanguage.data[$scope.availableLanguages[i]["identifier"]] = $scope.availableLanguages[i]["dr_label"];
            }
            for (var i = 0; i < $scope.uploadSelectedLanguage.length; i++) {
                if ($scope.uploadSelectedLanguage[i]._id == DARI_LANGUAGE) {
                    $scope.newPostTrans = $scope.uploadSelectedLanguage[i];
                    break;
                }
            }
        }
        else if (id == PASHTO_LANGUAGE) {
            for (var i = 0; i < $scope.availableLanguages.length; i++) {
                $scope.userSelectedLanguage.data[$scope.availableLanguages[i]["identifier"]] = $scope.availableLanguages[i]["ps_label"];
            }
            for (var i = 0; i < $scope.uploadSelectedLanguage.length; i++) {
                if ($scope.uploadSelectedLanguage[i]._id == PASHTO_LANGUAGE) {
                    $scope.newPostTrans = $scope.uploadSelectedLanguage[i];
                    break;
                }
            }
        }
        $scope.selectedTrans = id;
        $scope.uploadSelectedTrans = $scope.selectedTrans;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }
    $scope.changePath = function () {
        var path = window.location.hash;
        var condition = path.indexOf('#/map') >= 0 ? true : false;
        if (condition) {
            window.location.href = '#/map/category/' + $scope.selectedCategoryid + '/language/' + $scope.selectedTrans + '/search?q=' + null;
        }
        else if (path != "#/home") {
            window.location.href = "#/home";
        }
        else {
            $scope.getAllNews();
        }
    }
    $scope.getCategories = function () {
        var query = {"table":"Category__pajhwok"};
        query.columns = ["en_title", "id", "dr_title", "ps_title"];
        query.filter = {"parentcategoryid":{"$exists":false}};
        var params = {"query":JSON.stringify(query), "ask":ASK, "osk":OSK};
        $appService.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
            $scope.category = callBackData.response.data;
            $scope.newPost['category'] = $scope.category[0];
        }, function (err) {
        });
    }
    $scope.getCities = function () {
        var query = {"table":"City__pajhwok"};
        query.columns = ["name", "en_fullname", "dr_fullname", "ps_fullname", "location"];
        query.orders = {"name":"asc"};
        var params = {"query":JSON.stringify(query), "ask":ASK, "osk":OSK};
        $appService.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
            $scope.uploadCities = callBackData.response.data;
            $scope.uploadCities.splice(0, 0, {"name":"SelectCity", "en_fullname":"SelectCity", "dr_fullname":"dr_SelectCity", "ps_fullname":"ps_SelectCity", "_id":null, "location":[]});
            $scope.newPostCity = $scope.uploadCities[0];
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (err) {
            alert(err.message);
        });
    }
    $scope.getStates = function () {
        var query = {"table":"State__pajhwok"};
        query.columns = ["name", "ps_name", "dr_name"];
        query.orders = {"name":"asc"};
        var params = {"query":JSON.stringify(query), "ask":ASK, "osk":OSK};
        $appService.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
            $scope.states = callBackData.response.data;
            $scope.states.splice(0, 0, {"name":"All", "ps_name":"ps_All", "dr_name":"dr_All", "_id":null});
            $scope.defaultSelected.selectedState = $scope.states[0];
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (err) {
            alert(err.message);
        });
    }
    $scope.getStates();
    $scope.getTopStories = function (max_rows) {
        var query = {};
        query.table = "News__pajhwok";
        var columnArray = ["_id", "title", "media", "description", "category", "commentcount", "image", "__createdby.firstname", "activitycount", "clickcount", {"expression":"__createdon", "format":"fromnow"}];
        query.columns = columnArray;
        if (typeof max_rows == "undefined") {
//            query.max_rows = $scope.topstories.length;
        }
        else {
            query.max_rows = max_rows;
        }
        query.cursor = 0;
        query.filter = {"status":"approved", "transid":$scope.selectedTrans, "topstory":true};
        if ($scope.defaultSelected.selectedState && $scope.defaultSelected.selectedState._id != null && $scope.defaultSelected.selectedState._id) {
            query.filter["stateid"] = $scope.defaultSelected.selectedState._id;
        }
        query.orders = {"__createdon":"desc"};

        var timeZone = new Date().getTimezoneOffset();
        timeZone = timeZone * 60000;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "state":JSON.stringify({"timezone":timeZone})};
        var serviceURL = "/rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (topStoriesData) {
            $scope.topStoriesDetail = topStoriesData.response.data;

            for (var i = 0; i < $scope.topStoriesDetail.length; i++) {
                if ($scope.topStoriesDetail[i]["image"]) {
                    $scope.topStoriesDetail[i]["imgurl"] = BAAS_SERVER + "/file/render?filekey=" + $scope.topStoriesDetail[i]["image"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK + '&resize={"width":253,"height":180}&convert={"type":"png"}';
                } else {
                    /*for default image*/
                    $scope.topStoriesDetail[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + ASK + "&osk=" + OSK + '&resize={"width":253,"height":180}&convert={"type":"png"}';
                }
            }
            $scope.setTopNews($scope.topStoriesDetail[0], false);
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
        })
    }
    $scope.getRecentStories = function (max_rows) {
        var query = {};
        query.table = "News__pajhwok";
        var columnArray = ["_id", "title", "media", "image", "commentcount", "__createdby.firstname", "activitycount", "clickcount", {"expression":"__createdon", "format":"fromnow"}];
        query.columns = columnArray;
        if (typeof max_rows == "undefined") {
//            query.max_rows = $scope.topstories.length;
        }
        else {
            query.max_rows = max_rows;
        }
        query.cursor = 0;
        query.orders = {"__createdon":"desc"};
        query.filter = {"status":"approved", "transid":$scope.selectedTrans};
        if ($scope.defaultSelected.selectedState && $scope.defaultSelected.selectedState._id && $scope.defaultSelected.selectedState._id != null) {
            query.filter["stateid"] = $scope.defaultSelected.selectedState._id;
        }
        var timeZone = new Date().getTimezoneOffset();
        timeZone = timeZone * 60000;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "state":JSON.stringify({"timezone":timeZone})};
        var serviceURL = "/rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (recentStoriesData) {
            $scope.loading.loadingNews = false;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
            $scope.recentStoriesDetail = recentStoriesData.response.data;

            $scope.recentStoryVisible = "";
            if ($scope.recentStoriesDetail.length) {
                $scope.recentStoryVisible = "true";
            }
            else {
                $scope.recentStoryVisible = "false";
            }

            for (var i = 0; i < $scope.recentStoriesDetail.length; i++) {
                if ($scope.recentStoriesDetail[i]["image"]) {
                    $scope.recentStoriesDetail[i]["imgurl"] = BAAS_SERVER + "/file/render?filekey=" + $scope.recentStoriesDetail[i]["image"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK + '&resize={"width":253,"height":180}&convert={"type":"png"}';
                }
                else {
                    /*for default image*/
                    $scope.recentStoriesDetail[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + ASK + "&osk=" + OSK + '&resize={"width":253,"height":180}&convert={"type":"png"}';
                }
            }

        }, function (jqxhr, error) {
        })
    }
    $scope.mostPopularStories = function (max_rows) {
        var query = {};
        query.table = "News__pajhwok";
        var columnArray = ["_id", "title", "media", "image", "__createdby.firstname", "commentcount", "activitycount", "clickcount", {"expression":"__createdon", "format":"fromnow"}];
        query.columns = columnArray;
        if (typeof max_rows == "undefined") {
            query.max_rows = $scope.topstories.length;
        }
        else {
            query.max_rows = max_rows;
        }
        query.cursor = 0;
        query.orders = {"activitycount":"desc", "__createdon":"desc"};
        query.filter = {"status":"approved", "transid":$scope.selectedTrans};
        if ($scope.defaultSelected.selectedState && $scope.defaultSelected.selectedState._id && $scope.defaultSelected.selectedState._id != null) {
            query.filter["stateid"] = $scope.defaultSelected.selectedState._id;
        }
        var timeZone = new Date().getTimezoneOffset();
        timeZone = timeZone * 60000;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "state":JSON.stringify({"timezone":timeZone})};
        var serviceURL = "/rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (mostPopularStoriesData) {
            $scope.mostPopularStoriesDetail = mostPopularStoriesData.response.data;
            $scope.mostPopularVisible = "";
            if ($scope.mostPopularStoriesDetail.length) {
                $scope.mostPopularVisible = "true";
            }
            else {
                $scope.mostPopularVisible = "false";
            }

            for (var i = 0; i < $scope.mostPopularStoriesDetail.length; i++) {
                if ($scope.mostPopularStoriesDetail[i]["image"]) {
                    $scope.mostPopularStoriesDetail[i]["imgurl"] = BAAS_SERVER + "/file/render?filekey=" + $scope.mostPopularStoriesDetail[i]["image"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK + '&resize={"width":253,"height":180}&convert={"type":"png"}';
                }
                else {
                    /*for default image*/
                    $scope.mostPopularStoriesDetail[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + ASK + "&osk=" + OSK + '&resize={"width":253,"height":180}&convert={"type":"png"}';
                }
            }
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
        })
    }
    $scope.getAllNews = function () {
        $scope.loading.loadingNews = true;
        $scope.getTopStories(5);
        $scope.mostPopularStories(6);
        $scope.getRecentStories(6);
    }
    $scope.getCities();
    /*get cities  and cites */
    $scope.getCategories();
    $scope.getFileExtension = function (filename) {
        var ext = /^.+\.([^.]+)$/.exec(filename);
        return ext == null ? "" : ext[1];
    }
    $scope.showFile = function (renderfile, thumbnail, auto_start, w, h) {
        $scope.displayType.image = false;
//        $scope.displayType.imageFileUrl='images/loading18.gif';
        if (!$scope.$$phase) {
            $scope.$apply();
        }

        var width, height;
        if (w && h) {
            width = w;
            height = h;
        }
        else {
            width = 629;
            height = 310;
        }
        if (renderfile && renderfile.length > 0) {
            if (thumbnail) {
                var file_ext = $scope.getFileExtension(renderfile[0].name);
                if ((/\.(gif|jpg|jpeg|tiff|png|bmp)$/gi).test(renderfile[0].name)) {
                    $scope.displayType.image = true;
                    $scope.displayType.videoAudio = false;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    $scope.displayType.imageFileUrl = "/rest/file/render?filekey=" + renderfile[0].key + '&ask=' + ASK + '&osk=' + OSK + '&resize={"width":635,"height":310}&convert={"type":"png"}';
                    jQuery("img.lazy").lazy();

                }
                else if ((/\.(flv|mov|mp4|m4v|f4v|aac|m4a|f4a|mp3|ogg|oga)$/gi).test(renderfile[0].name)) {
                    $scope.displayType.image = false;
                    $scope.displayType.videoAudio = true;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    var fileUrl = "/rest/file/render?filekey=" + renderfile[0].key + "&ask=" + ASK + "&osk=" + OSK;
                    var imgUrl = "/rest/file/render?filekey=" + thumbnail[0].key + "&ask=" + ASK + "&osk=" + OSK;
                    document.getElementById('ova-jwplayer-container').innerHTML = "";
                    jwplayer('ova-jwplayer-container').setup({
                        image:imgUrl,
                        file:fileUrl,
                        width:width,
                        height:height,
                        autostart:auto_start,
                        type:file_ext
                    });
                }
            } else {
                var file_ext = $scope.getFileExtension(renderfile[0].name);
                if ((/\.(gif|jpg|jpeg|tiff|png|bmp)$/gi).test(renderfile[0].name)) {
                    $scope.displayType.image = true;
                    $scope.displayType.videoAudio = false;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    $scope.displayType.imageFileUrl = "/rest/file/render?filekey=" + renderfile[0].key + '&ask=' + ASK + '&osk=' + OSK + '&resize={"width":635,"height":310}&convert={"type":"png"}';
                    jQuery("img.lazy").lazy();

                }
                else if ((/\.(flv|mov|mp4|m4v|f4v|aac|m4a|f4a|mp3|ogg|oga)$/gi).test(renderfile[0].name)) {
                    $scope.displayType.image = false;
                    $scope.displayType.videoAudio = true;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    var fileUrl = "/rest/file/render?filekey=" + renderfile[0].key + "&ask=" + ASK + "&osk=" + OSK;
                    var imgUrl = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + ASK + "&osk=" + OSK;
                    document.getElementById('ova-jwplayer-container').innerHTML = "";
                    jwplayer('ova-jwplayer-container').setup({
                        image:imgUrl,
                        file:fileUrl,
                        width:width,
                        height:height,
                        autostart:auto_start,
                        type:file_ext
                    });
                }
            }

        } else if (thumbnail) {
            if ((/\.(gif|jpg|jpeg|tiff|png|bmp)$/gi).test(thumbnail[0].name)) {
                $scope.displayType.image = true;
                $scope.displayType.videoAudio = false;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
                $scope.displayType.imageFileUrl = "/rest/file/render?filekey=" + thumbnail[0].key + '&ask=' + ASK + '&osk=' + OSK + '&resize={"width":635,"height":310}&convert={"type":"png"}';
            }

        }
    }
    $scope.removeSelectedClass = function () {
        $('.selected_category').removeClass('selected_category');
    }


    $scope.updateViewCount = function (record) {
        var query = {};
        query.table = "News__pajhwok";
        var columnArray = [
            {"_id":record._id, "$inc":{"clickcount":1, "activitycount":1}}
        ];
        query.operations = columnArray;
        $appService.save(query, ASK, OSK, null, function (dataUpdate) {
            if (dataUpdate.update && dataUpdate.update.length > 0) {
                if (record != undefined) {
                    record.clickcount = record.clickcount + 1;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                }
            }
            else if (dataUpdate.insert && dataUpdate.insert.length > 0) {
                console.log("Inserted");
            }
            else {
                console.log("Failed");
            }
        }, function (err) {
        });

    }

    $scope.setTopNews = function (newsData, auto_start, width, height) {
        $scope.topNews = newsData;
        $scope.boolred = false;
        $scope.boolgreen = false;
        $scope.boolblue = false;
        $scope.boolblack = false;
        $scope.boolyellow = false;

        if ($scope.topNews) {
            if ($scope.topNews['category']._id == SECURITY_INCIDENTS) {
                $scope.boolred = true;
                $scope.boolgreen = false;
                $scope.boolblue = false;
                $scope.boolblack = false;
                $scope.boolyellow = false;
            }
            if ($scope.topNews['category']._id == VOTES_FOR_PEACE) {
                $scope.boolred = false;
                $scope.boolgreen = false;
                $scope.boolblue = false;
                $scope.boolblack = false;
                $scope.boolyellow = false;
            }
            if ($scope.topNews['category']._id == ELECTION_OPINION) {
                $scope.boolred = false;
                $scope.boolgreen = false;
                $scope.boolblue = true;
                $scope.boolblack = false;
                $scope.boolyellow = false;
            }
            if ($scope.topNews['category']._id == VOILATION_FRAUD) {
                $scope.boolred = false;
                $scope.boolgreen = false;
                $scope.boolblue = false;
                $scope.boolblack = true;
                $scope.boolyellow = false;
            }
            if ($scope.topNews['category']._id == ELECTION_MONITOR) {
                $scope.boolred = false;
                $scope.boolgreen = false;
                $scope.boolblue = false;
                $scope.boolblack = false;
                $scope.boolyellow = true;
            }
        }

        $scope.topNewsVisible = "";
        if ($scope.topNews) {
            $scope.topNewsVisible = "true";
            $scope.showFile($scope.topNews['media'], $scope.topNews['image'], auto_start, width, height);
        } else {
            $scope.topNewsVisible = "false";
        }


    };
    $scope.setCategory = function (categoryData) {
        var path = window.location.hash;
        var condition = path.indexOf('#/map') >= 0 ? true : false;
        if (condition) {
            if (categoryData) {
                $scope.selectedCategoryid = categoryData._id;
                $scope.labelDetail.visibleCategoryFilter = true;
                if ($scope.selectedTrans == ENGLISH_LANGUAGE) {
                    $scope.labelDetail.categoryName = categoryData['en_title'];
                }
                else if ($scope.selectedTrans == DARI_LANGUAGE) {
                    $scope.labelDetail.categoryName = categoryData['dr_title'];
                }
                else if ($scope.selectedTrans == PASHTO_LANGUAGE) {
                    $scope.labelDetail.categoryName = categoryData['ps_title'];
                }
            }
            else {
                $scope.selectedCategoryid = null;
                $scope.labelDetail.categoryName = "";
                $scope.labelDetail.visibleCategoryFilter = false;

            }
            $scope.uploadNews = false;
            window.location.href = '#/map/category/' + $scope.selectedCategoryid + '/language/' + $scope.selectedTrans + '/search?q=' + null;

        } else {
            if (categoryData) {


                $scope.selectedCategoryid = categoryData._id;
                $scope.labelDetail.visibleCategoryFilter = true;
                if ($scope.selectedTrans == ENGLISH_LANGUAGE) {
                    $scope.labelDetail.categoryName = categoryData['en_title'];
                }
                else if ($scope.selectedTrans == DARI_LANGUAGE) {
                    $scope.labelDetail.categoryName = categoryData['dr_title'];
                }
                else if ($scope.selectedTrans == PASHTO_LANGUAGE) {
                    $scope.labelDetail.categoryName = categoryData['ps_title'];
                }
            }

            else {
                $scope.selectedCategoryid = null;
                $scope.labelDetail.categoryName = "";
                $scope.labelDetail.visibleCategoryFilter = false;

            }
            $scope.uploadNews = false;
            window.location.href = "#/search/category/" + $scope.selectedCategoryid + "/state/" + $scope.defaultSelected.selectedState._id + "/language/" + $scope.selectedTrans;
        }
    };
    $scope.setState = function () {
        $scope.changePath();

    }
    $scope.getSimilarCategory = function (max_rows, filterData, newsid) {
        var query = {};
        query.table = "News__pajhwok";
        var columnArray = ["_id", "title", "media", "description", "commentcount", "image", "__createdby.firstname", "activitycount", "clickcount", {"expression":"__createdon", "format":"fromnow"}];
        query.columns = columnArray;
        if (typeof max_rows == "undefined") {
//            query.max_rows = $scope.topstories.length;
        }
        else {
            query.max_rows = max_rows;
        }
        query.cursor = 0;
        query.filter = {"category":{"_id":filterData}, "_id":{"$ne":newsid}, "transid":$scope.selectedTrans, "status":"approved"};
        query.orders = {"__createdon":"desc"};

        var timeZone = new Date().getTimezoneOffset();
        timeZone = timeZone * 60000;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "state":JSON.stringify({"timezone":timeZone})};
        var serviceURL = "/rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (topStoriesData) {
            $scope.similarCategory = topStoriesData.response.data;
            $scope.similarCategoryVisible = "";
            if ($scope.similarCategory.length) {
                $scope.similarCategoryVisible = "true";
            }
            else {
                $scope.similarCategoryVisible = "false";
            }

            for (var i = 0; i < $scope.similarCategory.length; i++) {
                if ($scope.similarCategory[i]["image"]) {
                    $scope.similarCategory[i]["imgurl"] = BAAS_SERVER + "/file/render?filekey=" + $scope.similarCategory[i]["image"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK + '&resize={"width":253,"height":180}&convert={"type":"png"}';
                } else {
                    /*for default image*/
                    $scope.similarCategory[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + ASK + "&osk=" + OSK + '&resize={"width":253,"height":180}&convert={"type":"png"}';
                }
            }
        }, function (jqxhr, error) {
        })
    }
});
pajhwokApp.controller('userCtrl',function($scope, $compile, $http, $location, $appService, $rootScope, $routeParams){

    var currentSession=$scope.getSession();
    $scope.userData =  {};
    $scope.baddUser = false;
    $scope.roleOptions = [];
    $scope.selectedRole = {};
    $scope.selectedRole1={};
    $scope.cursor = "";
    $scope.loadingMedia = false;
    $scope.maxRows = null;
    $scope.rows = 3;
    $scope.visibleUserList="";
    $scope.manageUserDisplay = {"bChangeRole":false,"baddUser":false};
    $scope.fnAdduser = function () {
        $scope.addUser = {};
        $scope.manageUserDisplay.baddUser = true;
        $scope.selectedRole1 = $scope.roleOptions[0];
    }
    $scope.changeUserRole = function (user) {
        $scope.userData = user;
        for(var i=0;i<$scope.roleOptions.length;i++){
            if(user["roleid"]._id==$scope.roleOptions[i]._id){
                $scope.selectedRole=$scope.roleOptions[i];
                break;
            }
        }
        $scope.manageUserDisplay.bChangeRole = true;
        if (!$scope.$$phase) {
            $scope.$apply();
        }

    };


    $scope.changeStatus = function (index, id) {
        $scope.userList[index].userid.status = !($scope.userList[index].userid.status);
        var query = {};
        query.table = "users__baas";
        var columnArray = [
            {"_id": id, "status": $scope.userList[index].userid.status}
        ];

        query.operations = columnArray;
        $appService.save(query, ASK, OSK, null, function (dataUpdate) {
            if (dataUpdate.response.update && dataUpdate.response.update.length > 0) {
                $scope.bShowAlertPopup = true;
                $scope.alertPopupMsg = "Updated";
            }
            else if (dataUpdate.response.insert && dataUpdate.response.insert.length > 0) {
                $scope.bShowAlertPopup = true;
                $scope.alertPopupMsg = "inserted";
            }
            else {
                $scope.bShowAlertPopup = true;
                $scope.alertPopupMsg = "User save failed";
            }
        }, function (err) {
            alert("Some error occured");
        });
    };

    $scope.cancelChanges = function () {
        $scope.manageUserDisplay.bChangeRole = false;
        $scope.baddUser = false;
    }

    $scope.roleOption = function(){
        var query = {};
        query.table = "Role__pajhwok";
        var columnArray = ["_id","name"];
        query.columns = columnArray;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceURL = "/rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (roleOptData) {
            $scope.roleOptions = roleOptData.response.data;
            if
                (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {

        })
    };
    $scope.getMoreUsersList = function(cursor){
        if($scope.loadingMedia == true){
            return
        }
        $scope.loadingMedia = true;

        if($scope.cursor + 3 > $scope.maxRows){
            var rows = $scope.cursor + 3 - $scope.maxRows;
            $scope.cursor = "";
        }
        else{
            var rows = 3;
        }
        var query = {};
        query.table = "Profile__pajhwok";
        var columnArray = ["_id","userid.username","userid.firstname","userid.emailid","userid.status","roleid",{"expression":"__createdon", "format":"fromnow"}];
        query.max_rows = rows;
        query.cursor = cursor;
        query.columns = columnArray;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceURL = "/rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (manageUserData) {
            $scope.loadingMedia = false;
            for(var i=0;i<manageUserData.response.data.length;i++){
                $scope.userList.push(manageUserData.response.data[i]);
            }
            $scope.cursor = manageUserData.response.cursor;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
        })
    };
    $scope.getUsersList= function () {
        var query = {};
        query.table = "Profile__pajhwok";
        var columnArray = ["_id","userid.username","userid.firstname","userid.emailid","userid.status","roleid",{"expression":"__createdon", "format":"fromnow"}];
        query.max_rows = 3;
        query.$count = 1;
        query.columns = columnArray;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceURL = "/rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (manageUserData) {
            $scope.userList = manageUserData.response.data;
            if($scope.userList&&$scope.userList.length){
                $scope.visibleUserList="true";
                $scope.cursor = manageUserData.response.cursor;
                $scope.maxRows = manageUserData.response.$count;
            }else{
                $scope.visibleUserList="false";
            }


            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
        })
    };

    if(currentSession){
        if(currentSession["roleid"]==ADMIN){

            $scope.getUsersList();
            $scope.roleOption();

        }
        else{
            $scope.bShowAlertPopup = true;
            $scope.alertPopupMsg = "You don't have permission to access this page.";
        }
    }
    else{
        $scope.bShowAlertPopup = true;
        $scope.alertPopupMsg = "You need to login first";
    }

});





















