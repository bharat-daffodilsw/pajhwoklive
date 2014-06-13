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
        }).when('/news', {
                templateUrl:'../news',
                controller:'articleCtrl'
            }).when('/map/category/:catid/subcategory/:subcatid/language/:languageid/search', {
                templateUrl:'../mapview',
                controller:'MapCtrl'
            }).when('/search/category/:parentCatId/subcategory/:childCatId/state/:stateid/language/:languageid/searchcontent', {
                templateUrl:'../search',
                controller:'searchCtrl'

            }).when('/search', {
                templateUrl:'../searchcustom',
                controller:'customSearchCtrl'

            }).when('/manageunpublishnews', {
                templateUrl:'../manageunpublishnews',
                controller:'manageUnpublishNewsCtrl'

            }).when('/manageallnews', {
                templateUrl:'../manageallnews',
                controller:'manageUnpublishNewsCtrl'

            }).when('/mymedia', {
                templateUrl:'../mymedia',
                controller:'manageUnpublishNewsCtrl'

            }).when('/myunpublishmedia', {
                templateUrl:'../myunpublishmedia',
                controller:'manageUnpublishNewsCtrl'

            }).when('/manageflaggednews', {
                templateUrl:'../manageflagednews',
                controller:'manageUnpublishNewsCtrl'

            }).when('/manageuser', {
                templateUrl:'../manageuser',
                controller:'userCtrl'
            }).when('/aboutus', {
                templateUrl:'../aboutus',
                controller:'staticPageCtrl'
            }).when('/howtoreport', {
                templateUrl:'../howtoreport',
                controller:'staticPageCtrl'
            }).when('/guidelines', {
                templateUrl:'../guidelines',
                controller:'staticPageCtrl'
            }).when('/contactus', {
                templateUrl:'../contactus',
                controller:'staticPageCtrl'
            }).when('/whatisfraud', {
                templateUrl:'../whatisfraud',
                controller:'staticPageCtrl'
            });
        ;
    }]);
pajhwokApp.controller('MapCtrl', function ($scope, $compile, $http, $location, $appService, $rootScope, $routeParams, $window) {

    var categoryid = $routeParams.catid;
    var subcat = $routeParams.subcatid;
    var languageid = $routeParams.languageid;
    var search = $routeParams.q;
    $scope.$on('$viewContentLoaded', function (event) {
        $window._gaq.push(['_trackPageview', $location.path()]);
    });

    $scope.changeMenu(false);

    $scope.mapuserfun = function (catmap, subcat, langvalue, searchmap) {


        if (langvalue != null && langvalue != undefined && langvalue != "undefined" && langvalue != "" && langvalue != "all") {
            $scope.languagemap = langvalue;
        }
        if (catmap != null && catmap != undefined && catmap != "undefined" && catmap != "" && catmap != "all") {
            $scope.categoryvaluemap = catmap;
        }
        if (subcat != null && subcat != undefined && subcat != "undefined" && subcat != "" && subcat != "all") {
            $scope.subcategoryvaluemap = subcat;
        }
        if (searchmap != null && searchmap != undefined && searchmap != "undefined" && searchmap != "" && searchmap != "all") {
            $scope.searchTxtmap = searchmap;
        }

    }
    $scope.mapuserfun(categoryid, subcat, languageid, search);
    $scope.mapSearchCategory = "";
    $scope.mapSearchText = $routeParams.q;
    $scope.mapData.state = true;
    $scope.labelDetail.mapVisibleCategoryFilter = true;
    if (categoryid != "null") {
        for (var i = 0; i < $scope.category.length; i++) {
            if (categoryid == $scope.category[i]._id) {
                if (languageid == ENGLISH_LANGUAGE) {
                    $scope.mapSearchCategory = $scope.category[i]["en_title"];
                    break;
                }
                else if (languageid == DARI_LANGUAGE) {
                    $scope.mapSearchCategory = $scope.category[i]["dr_title"];
                    break;
                }
                else if (languageid == PASHTO_LANGUAGE) {
                    $scope.mapSearchCategory = $scope.category[i]["ps_title"];
                    break;
                }
            }
        }
    }
    $scope.mapOptions = {
        center:new google.maps.LatLng(34.5333, 69.1667),
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
    citymap1['Kabul'] = {
        center:new google.maps.LatLng(34.5333, 69.1667),
        population:2842518
    };

    var citymap2 = {};
    citymap2['kabul'] = {
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
    };

    $scope.onmycal = function () {
        //$scope.mapcornervalue = $scope.myMap.getBounds();
        $scope.managemarker2($routeParams.catid, $routeParams.subcatid, $routeParams.languageid, $routeParams.q);
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
                console.log(JSON.stringify(titlevalue));
                var res = titlevalue.__createdon.substring(0, 10);
                if (titlevalue.imageurl) {
                    $scope.myInfoWindow.setContent('<div class="map-popup"> <div><div class="left-col"><p class="report-when-where"><span class="r_date"><img class="img-time" src="images/time-pic">' + res + '</span> 			<span class="r_location" style="float: right;"><img class="img-time" src="images/place-pic"></span></p><div class="report-description-text"><span class="map-des">' + titlevalue.title + '</span><br> </div><div class="report-category-list"><p>' + titlevalue.category + '</p></div>  </div>	</div></div>')

                }
                else {
                    $scope.myInfoWindow.setContent('<div class="map-popup"> <div> <div class="left-col"><p class="report-when-where"> 			<span class="r_date"><img class="img-time" src="images/time-pic">' + res + '</span> 			<span class="r_location" style="float: right;"><img class="img-time" src="images/place-pic">	' + titlevalue._cityname + '	</span> 		</p> 			<!-- start report media --><div class="report-description-text"><span class="map-des">' + titlevalue.title + '</span><br> </div>		<!-- start report description --> <div class="report-category-list"><p style="color:blue">' + titlevalue.category + '</div> </div>	</div></div>');
                }
            }
        });
    };
    // for zoom level > 6
    $scope.managemarker2 = function (cat, subcat, lang, search) {
        var locationwisetitle = {};
        var query = {};
        var citymap4 = {};
        query.table = "News__pajhwok";
        query.columns = ["_id", "media", "title", "category" , "subcategory", "location", "cityid", "cityid.en_fullname", "cityid.ps_fullname", "cityid.dr_fullname", "cityid.location", "__createdon"];
        query.filter = { "__createdon":"last-90-days", "status":"approved", "category.id":{"$in":["preev", "edv", "postev"]}};
        if (cat && cat != "null" && cat != "all") {
            console.log(JSON.stringify(cat));
            query.filter["category"] = {"_id":cat};
            $scope.deleteMarkers($scope.mylevel2);
        }
        if (subcat && subcat != "null" && subcat != "all") {
            query.filter["subcategory"] = {"_id":subcat};
            $scope.deleteMarkers($scope.mylevel2);
        }
        if (search && search != "null" && search != "undefined") {
            query.filter["title"] = {"$regex":"(" + search + ")", "$options":"-i"}
        }
        if (lang && lang != "null" && lang != "all") {
            query.filter.transid = {"_id":lang};
        }
        else {
            query.filter.transid = {"_id":ENGLISH_LANGUAGE};
        }
        query.$count = 1;
        //    query.filter.location={ "$within":{ "$polygon":areaoftown } } ;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceURL = "rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (markerreturn) {
            $scope.markerreturnvalue2 = markerreturn.response.data;
            $scope.mapRecentStories = markerreturn.response.data;
            for (var i = 0; i < $scope.markerreturnvalue2.length; i++) {
                var imageFound = false;
                if ($scope.selectedTrans == ENGLISH_LANGUAGE) {
                    $scope.mapRecentStories[i]["displayLocationName"] = $scope.mapRecentStories[i]["cityid"]["en_fullname"];
                    if ($scope.mapRecentStories[i]["subcategory"]) {

                        $scope.mapRecentStories[i]["displayCategoryName"] = $scope.mapRecentStories[i]["subcategory"]["en_title"];
                        $scope.markerreturnvalue2[i]["displayCategoryName"] = $scope.markerreturnvalue2[i]["subcategory"]["en_title"];
                    } else {
                        $scope.mapRecentStories[i]["displayCategoryName"] = $scope.mapRecentStories[i]["category"]["en_title"];
                        $scope.markerreturnvalue2[i]["displayCategoryName"] = $scope.markerreturnvalue2[i]["category"]["en_title"];
                    }
                    $scope.markerreturnvalue2[i]["displayLocationName"] = $scope.markerreturnvalue2[i]["cityid"]["en_fullname"];
                }
                else if ($scope.selectedTrans == PASHTO_LANGUAGE) {
                    $scope.mapRecentStories[i]["displayLocationName"] = $scope.mapRecentStories[i]["cityid"]["ps_fullname"];
                    if ($scope.mapRecentStories[i]["subcategory"]) {

                        $scope.mapRecentStories[i]["displayCategoryName"] = $scope.mapRecentStories[i]["subcategory"]["ps_title"];
                        $scope.markerreturnvalue2[i]["displayCategoryName"] = $scope.markerreturnvalue2[i]["subcategory"]["ps_title"];
                    } else {
                        $scope.mapRecentStories[i]["displayCategoryName"] = $scope.mapRecentStories[i]["category"]["ps_title"];
                        $scope.markerreturnvalue2[i]["displayCategoryName"] = $scope.markerreturnvalue2[i]["category"]["ps_title"];
                    }
                    $scope.markerreturnvalue2[i]["displayLocationName"] = $scope.markerreturnvalue2[i]["cityid"]["ps_fullname"];

                }
                else if ($scope.selectedTrans == DARI_LANGUAGE) {
                    $scope.mapRecentStories[i]["displayLocationName"] = $scope.mapRecentStories[i]["cityid"]["dr_fullname"];
                    if ($scope.mapRecentStories[i]["subcategory"]) {

                        $scope.mapRecentStories[i]["displayCategoryName"] = $scope.mapRecentStories[i]["subcategory"]["dr_title"];
                        $scope.markerreturnvalue2[i]["displayCategoryName"] = $scope.markerreturnvalue2[i]["subcategory"]["dr_title"];
                    } else {
                        $scope.mapRecentStories[i]["displayCategoryName"] = $scope.mapRecentStories[i]["category"]["dr_title"];
                        $scope.markerreturnvalue2[i]["displayCategoryName"] = $scope.markerreturnvalue2[i]["category"]["dr_title"];
                    }
                    $scope.markerreturnvalue2[i]["displayLocationName"] = $scope.markerreturnvalue2[i]["cityid"]["dr_fullname"];


                }
                if ($scope.markerreturnvalue2[i]["media"]) {
                    try {

                        if ($scope.markerreturnvalue2[i]["media"][0].capturedimagekey) {
//                            console.log($scope.markerreturnvalue2[i].title + "--2--" + JSON.stringify($scope.markerreturnvalue2[i]["media"]));
                            $scope.markerreturnvalue2[i].imageurl = "http://afghansvote.af/rest/file/render?filekey=" + $scope.markerreturnvalue2[i].media[0].capturedimagekey + '&ask=5301e64492f51ed71842a5d1&osk=530459b8aed74b22457bad37&resize={"width":60,"height":45}&convert={"type":"png"}';
                            imageFound = true;
                        } else if ((/\.(gif|jpg|jpeg|tiff|png|bmp)$/gi).test($scope.markerreturnvalue2[i]["media"][0].name)) {
//                            console.log($scope.markerreturnvalue2[i].title + "--3--" + JSON.stringify($scope.markerreturnvalue2[i]["media"]));
                            $scope.markerreturnvalue2[i].imageurl = "http://afghansvote.af/rest/file/render?filekey=" + $scope.markerreturnvalue2[i].media[0].key + '&ask=5301e64492f51ed71842a5d1&osk=530459b8aed74b22457bad37&resize={"width":60,"height":45}&convert={"type":"png"}';
                            imageFound = true;
                        }
                    }
                    catch (e) {
//                        console.log($scope.markerreturnvalue2[i].title + "--4--" + JSON.stringify($scope.markerreturnvalue2[i]["media"]));
                        imageFound = false;
                    }
                }
                /*	if(!imageFound){
                 console.log($scope.markerreturnvalue2[i].title + "--5--" +  JSON.stringify($scope.markerreturnvalue2[i]["media"]));
                 $scope.markerreturnvalue2[i].imageurl = "http://afghansvote.af/rest/file/render?filekey=" + anonymousFileKey + '&ask=5301e64492f51ed71842a5d1&osk=530459b8aed74b22457bad37&resize={"width":60,"height":45}&convert={"type":"png"}';
                 }
                 */
                var row = $scope.markerreturnvalue2[i];
//                console.log(JSON.stringify(row));
                var title = row.title;
                locationwisetitle[row.location] = {"title":row.title, "_id":row._id, "imageurl":row.imageurl, "__createdon":row.__createdon, "_cityname":row.displayLocationName, "category":row.displayCategoryName};
                $scope.locationtitlemain = locationwisetitle;
                var titlekeys = Object.keys(locationwisetitle);
            }
            for (var i = 0; i < titlekeys.length; i++) {
                var datatitle_array = titlekeys[i].split(',');
                var center = new google.maps.LatLng(datatitle_array[0], datatitle_array[1]);
                $scope.mycircle4.push(new google.maps.Marker({
                    map:$scope.myMap,
                    visible:true,
                    position:center
                }));
                $scope.myMarkers = $scope.mycircle4;
            }
        }, function (jqxhr, error) {
            alert("error");
        });
    }


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
        query.filter = {"status":"approved", "category.tilemenu":true};
        if (transid != null && transid != undefined && transid != "null") {
            query.filter["transid"] = transid;
        }
        if (searchContent != null && searchContent != "undefined" && searchContent != undefined && searchContent != "null") {
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

    $scope.recent.bLoading = false;
    $scope.recent.cursor = 0;
    $scope.loadingSearch = false;
    $scope.searchedNews = [];
    $scope.getSearchNews = function (cursor, category, subcategory, state, language, search) {
//        console.log("m called");
        if ($scope.loadingSearch) {
//           console.log("return");
            return;
        }
        $scope.loadingSearch = true;
        $scope.searchView = true;
        $scope.loadingMessage = true;
        $scope.recent.bLoading = true;
        $scope.searchResultMessage = false;

        var query = {};
        query.table = "News__pajhwok";
        var columnArray = ["_id", "title", "guest.name", "description", "category", "media", "likeby", "likecount", "flaggedby", "commentcount", "__createdby.firstname", "activitycount", "clickcount", {"expression":"__createdon", "format":"fromnow"}];
        query.columns = columnArray;
        query.filter = {"status":"approved", "category.tilemenu":true};
        query.$count = 1;
        if (category != null && category != undefined && category != "all") {
            query.filter["category"] = category;
        }
        if (subcategory != null && subcategory != undefined && subcategory != "all") {
            query.filter["subcategory"] = subcategory;
        }
        if (state != null && state != undefined && state != "all") {
            query.filter["stateid"] = state;
        }
        if (language != null && language != undefined && language != "null") {
            query.filter["transid"] = language;
        }
        if (search != null && search != "undefined" && search != undefined && search != "null") {
            query.filter["title"] = {"$regex":"(" + search + ")", "$options":"-i"};
        }
        query.max_rows = 10;
        query.orders = {"__createdon":"desc"};
        query.cursor = cursor;
        var currentSession = $scope.getSession();
        var timeZone = new Date().getTimezoneOffset();
        timeZone = timeZone * 60000;
        var queryParams = {};
        if (currentSession && currentSession["usk"]) {
            queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "usk":currentSession["usk"], "state":JSON.stringify({"timezone":timeZone})};
        }
        else {
            queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "state":JSON.stringify({"timezone":timeZone})};
        }
//        console.log("query"+JSON.stringify(query));
        var serviceURL = "/rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (recentStoriesData) {
//           console.log(recentStoriesData.response.$count);
            $scope.searchedNewsVisible = "";
            var recentSearch = recentStoriesData.response.data;
            for (var i = 0; i < recentSearch.length; i++) {
                if ($scope.selectedTrans == ENGLISH_LANGUAGE) {
                    recentSearch[i].description = ( recentSearch[i].description) ? unescape(recentSearch[i].description) : "";
                }
                else {
                    recentSearch[i].description = ( recentSearch[i].description) ? recentSearch[i].description : "";
                }
                if ($scope.searchedNews.length) {
                    $scope.searchedNews.push(recentSearch[i]);
                }
            }
            if (!$scope.searchedNews.length) {
                $scope.searchedNews = recentSearch;
            }
            $scope.searchedNews = $scope.setUrls($scope.searchedNews, 580, 300);
            if ($scope.searchedNews.length) {
                $scope.searchResultMessage = false;
                $scope.searchedNewsVisible = "true";
            }
            else {
                $scope.searchResultMessage = true;
                $scope.searchedNewsVisible = "false";
            }
            $scope.loadingSearch = false;
            $scope.loadingSearch = false;
            $scope.cursor = recentStoriesData.response.cursor;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
            $(window).scroll(function () {
                if ($("#loadMoreSearch").offset()) {
                    if ($(window).scrollTop() + $(window).height() > $("#loadMoreSearch").offset().top) {
                        if ($scope.cursor != "" && $scope.cursor != undefined) {
                            console.log("cursor" + $scope.cursor);
                            $scope.getSearchNews($scope.cursor, $routeParams.parentCatId, $routeParams.childCatId, $routeParams.stateid, $routeParams.languageid, $routeParams.q);
                        }
                    }
                }
            });

        }, function (jqxhr, error) {
        })
    }

    $scope.getMoreSearchCall = function () {
        console.log("first time called");
        $scope.getSearchNews(0, $routeParams.parentCatId, $routeParams.childCatId, $routeParams.stateid, $routeParams.languageid, $routeParams.q);
    }

});
pajhwokApp.controller('articleCtrl', function ($scope, $compile, $http, $location, $appService, $rootScope, $routeParams, $window) {
    $scope.$on('$viewContentLoaded', function (event) {
        $window._gaq.push(['_trackPageview', $location.path()]);
    });

//    $timeout = twttr.widgets.load();
    $scope.getArticleNews = function () {

        if (true) {
            var query = {"table":"News__pajhwok"};
            query.columns = ["_id", "title", "media", "guest.name", "category", "status", "likeby", "likecount", "flaggedby", "description", "commentcount", "clickcount", {"expression":"comment", "columns":["content", "__createdby.firstname", {"expression":"__createdon", "format":"fromnow"}]}, "__createdby.firstname", "activitycount", "clickcount", {"expression":"__createdon", "format":"fromnow"}];
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
                $scope.news = $scope.setUrls(topStoriesData.response.data, 580, 300);
                $scope.newsVisible = "";

//
                if ($scope.news.length) {
                    $scope.newsVisible = "true";
                    if ($scope.news[0].flagstatus) {
                        $scope.boolflag = true;
                    } else {
                        $scope.boolflag = false;
                    }

                    $scope.news[0].description = ($scope.news[0].description) ? unescape($scope.news[0].description) : "";
                    $scope.getSimilarCategory(2, $scope.news[0]['category']['_id'], $routeParams.newsid);
                    $scope.updateViewCount($scope.news[0]);

//                    $scope.setTopNews($scope.news[0], true, 779, 500);
                    window.setTimeout(function () {
                        addthis.init();
                        addthis.toolbox($(".addthis_toolbox").get());
                        $('.addthis_toolbox a').on('click', function (event) {

                            event.preventDefault();
                        });

                    }, 3000);

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
            $scope.cursor = mediaData.response.cursor;
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
        $scope.alert.bShowAlertPopup = true;
        $scope.alert.alertPopupMsg = "Please login first";
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
        $scope.alert.bShowAlertPopup = true;
        $scope.alert.alertPopupMsg = "Please login first";
    }

})
pajhwokApp.controller('manageUnpublishNewsCtrl', function ($scope, $compile, $http, $location, $appService, $routeParams, $rootScope) {
    $scope.loadingMedia = false;
    $scope.maxRows = null;
    $scope.rows = 3;
    $scope.cursor = 0;
    $scope.unpublishedNews = [];
//    var hashpath = window.location.hash;
    $scope.currSession = $scope.getSession();
    $scope.getUnpublishNews = function (cursor, searchText) {
        if ($scope.loadingMedia) {
            return;
        }
        var hashpath = window.location.hash;
        $scope.loadingMedia = true;
        if ($scope.currSession) {
            if ($scope.currSession["roleid"] != ADMIN && (hashpath.indexOf("#/manageallnews") >= 0 ? true : false)) {
                $scope.flaggedNewsVisible = "false";
                $scope.alert.bShowAlertPopup = true;
                $scope.alert.alertPopupMsg = "You don't have permission to access this page";
                return;
            }
            if (($scope.currSession["roleid"] != ADMIN && $scope.currSession["roleid"] != EDITOR) && ((hashpath.indexOf("#/manageunpublishnews") >= 0 ? true : false) || (hashpath.indexOf("#/manageflaggednews") >= 0) ? true : false)) {
                $scope.flaggedNewsVisible = "false";
                $scope.alert.bShowAlertPopup = true;
                $scope.alert.alertPopupMsg = "You don't have permission to access this page";
                return;
            }
            if (($scope.currSession["roleid"] == ADMIN || $scope.currSession["roleid"] == EDITOR)) {
                $scope.editrole = true;
            } else {
                $scope.editrole = false;
            }
            var query = {};
            query.table = "News__pajhwok";
            var columnArray = ["_id", "title", "transid", "guest.name", "guest.phone", "description", "cityid", "category", "media", "status", "subcategory", "__createdby.firstname", "flaggedcount", {"expression":"__createdon", "alias":"strdate"}, {"expression":"__createdon", "format":"fromnow"}];
            query.columns = columnArray;
            if (hashpath.indexOf("#/manageunpublishnews") >= 0 ? true : false)
                query.filter = {"status":"new"};
            if (hashpath.indexOf("#/mymedia") >= 0 ? true : false)
                query.filter = {"status":"approved", "__createdby":"{_CurrentUserId}"};
            if (hashpath.indexOf("#/myunpublishmedia") >= 0 ? true : false)
                query.filter = {"status":"new", "__createdby":"{_CurrentUserId}"};
            if (hashpath.indexOf("#/manageflaggednews") >= 0 ? true : false)
                query.filter = {"flaggedcount":{"$gt":0}};
            if (searchText && searchText != "null" && searchText != "all" && searchText != "undefined" && searchText != undefined) {
                if (query.filter) {
                    query["filter"]["title"] = {"$regex":"(" + searchText + ")", "$options":"-i"};
                }
                else {
                    query.filter = {"title":{"$regex":"(" + searchText + ")", "$options":"-i"}};
                }
            }
            query.max_rows = 10;
            query.cursor = cursor;
            query.$count = 1;
            if ($scope.currSession["roleid"] == GENERAL && hashpath.indexOf("#/manageunpublishnews") >= 0) {
                $scope.flaggedNewsVisible = "false";
                $scope.alert.bShowAlertPopup = true;
                $scope.alert.alertPopupMsg = "You don't have permission to access this page";
                return;
            }

            var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "usk":$scope.currSession["usk"]};
            var serviceURL = "/rest/data";
            $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (unpublishedData) {
                var unpublishedDataArr = unpublishedData.response.data;
//                console.log("count"+unpublishedData.response.$count);
//                console.log("cursor"+unpublishedData.response.cursor);
                for (var i = 0; i < unpublishedDataArr.length; i++) {
                    if (unpublishedDataArr[i].transid["_id"] == ENGLISH_LANGUAGE) {
                        unpublishedDataArr[i].description = (unpublishedDataArr[i].description) ? unescape(unpublishedDataArr[i].description) : ""
                    }
                    unpublishedDataArr[i].unpublished = (unpublishedDataArr[i].status == "new") ? true : false;
                    unpublishedDataArr[i].published = (unpublishedDataArr[i].status == "approved") ? true : false;
                    unpublishedDataArr[i].rejected = (unpublishedDataArr[i].status == "decline") ? true : false;
                    unpublishedDataArr[i].flagged = (unpublishedDataArr[i].flaggedcount > 0) ? true : false;
                    if ($scope.unpublishedNews.length) {
                        $scope.unpublishedNews.push(unpublishedDataArr[i]);
                    }
                }
                if (!$scope.unpublishedNews.length) {
                    $scope.unpublishedNews = unpublishedDataArr;
                }
                $scope.unpublishedNews = $scope.setUrls($scope.unpublishedNews);
                $scope.unpublishedNewsVisible = "";
                if ($scope.unpublishedNews.length) {
                    $scope.unpublishedNewsVisible = "true";
                }
                else {
                    $scope.unpublishedNewsVisible = "false";
                }
                $scope.loadingMedia = false;
                $scope.loadingMedia = false;
                $scope.cursor = unpublishedData.response.cursor;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
                $(window).scroll(function () {
                    if ($("#scrollDiv").offset()) {
                        if ($(window).scrollTop() + $(window).height() > $("#scrollDiv").offset().top) {
                            if ($scope.cursor != "" && $scope.cursor != undefined) {
                                $scope.getUnpublishNews($scope.cursor, $routeParams.q);
                            }
                        }
                    }
                });


            }, function (jqxhr, error) {
            })
        }
        else {
            $scope.alert.bShowAlertPopup = true;
            $scope.alert.alertPopupMsg = "Please login first";
        }
    }
    $scope.getUnpublishCall = function (cursor, search) {
        if (search) {
            $scope.getUnpublishNews(cursor, search);
        }
        else {
            $scope.getUnpublishNews(cursor, $routeParams.q);
        }
    }

});
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
            $scope.alert.bShowAlertPopup = true;
            $scope.alert.alertPopupMsg = "Please login first";
            window.location.href = "/";
            return;
        }
        if (currentSession["roleid"] == GENERAL) {
            $scope.flaggedNewsVisible = "false";
            $scope.alert.bShowAlertPopup = true;
            $scope.alert.alertPopupMsg = "You don't have permission to access this page";
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
            $scope.alert.bShowAlertPopup = true;
            $scope.alert.alertPopupMsg = "please login first";
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

    $scope.removeFlag = function (recordId) {
        var query = {};
        query.table = "News__pajhwok";
        var columnArray = [
            {"_id":recordId, "flaggedby":null}
        ];
        query.operations = columnArray;
        $appService.save(query, ASK, OSK, null, function (dataUpdate) {
            if (dataUpdate.response.update && dataUpdate.response.update.length > 0) {
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }
            else {
            }
        }, function (err) {
        });
    }


});
pajhwokApp.controller('homeCtrl', function ($scope, $compile, $http, $location, $appService, $rootScope, $window, $timeout) {
    $scope.changeMenu(true);
    $scope.selectedCategoryid = null;
    $scope.$on('$viewContentLoaded', function (event) {
        $window._gaq.push(['_trackPageview', $location.path()]);
    });
    /*for twitter plugin */
    if ($scope.twitterTile) {

        $scope.twitterTile = false;
        $timeout = twttr.widgets.load();
    }
    $scope.uploadNews = false;
    $(".selected_category").removeClass("selected_category");
    $scope.getMore = function () {

        if ($scope.recent.bLoading) {
            return
        }
        ;
        $scope.recent.bLoading = true;
        var query = {};
        query.table = "News__pajhwok";
        var columnArray = ["_id", "title", "description", "guest.name", "media", "category", "likeby", "likecount", "flaggedby", "commentcount", "__createdby.firstname", "activitycount", "clickcount", {"expression":"__createdon", "format":"fromnow"}];
        query.columns = columnArray;
        query.$count = 1;
        query.max_rows = $scope.recent["maxrow"];
        query.cursor = $scope.recent["cursor"];
        query.orders = {"__createdon":"desc"};
        query.filter = {"status":"approved", "transid":$scope.selectedTrans, "category.tilemenu":true};
        if ($scope.defaultSelected.selectedState && $scope.defaultSelected.selectedState._id && $scope.defaultSelected.selectedState._id != "all") {
            query.filter["stateid"] = $scope.defaultSelected.selectedState._id;
        }
        var currentSession = $scope.getSession();
        var timeZone = new Date().getTimezoneOffset();
        timeZone = timeZone * 60000;
        var queryParams = {};
        if (currentSession && currentSession["usk"]) {
            queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "usk":currentSession["usk"], "state":JSON.stringify({"timezone":timeZone})};
        }
        else {
            queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "state":JSON.stringify({"timezone":timeZone})};
        }

        var serviceURL = "/rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (recentStoriesData) {
            $scope.loading.loadingNews = false;
            $scope.recent.bLoading = false;
            if (!$scope.$$phase) {
                $scope.$apply();
            }

            if (recentStoriesData.response.cursor) {
                $scope.recent.cursor = recentStoriesData.response.cursor;
            }
            else {
                $scope.recent.cursor = recentStoriesData.response.$count;
            }

            $scope.recentStoryVisible = "";
            if ($scope.recentStoriesDetail.length) {
                $scope.recentStoryVisible = "true";
            }
            else {
                $scope.recentStoryVisible = "false";
            }

            recentStoriesData.response.data = $scope.setUrls(recentStoriesData.response.data, 580, 300);
            var recentstorydata = recentStoriesData.response.data;
            for (var i = 0; i < recentstorydata.length; i++) {
                if ($scope.selectedTrans == ENGLISH_LANGUAGE) {

                    recentstorydata[i].description = (recentstorydata[i].description) ? unescape(recentstorydata[i].description) : "";
                }
                else {
                    recentstorydata[i].description = (recentstorydata[i].description) ? recentstorydata[i].description : "";
                }

                $scope.recentStoriesDetail.push(recentStoriesData.response.data[i]);
            }

        }, function (jqxhr, error) {
        })
    }
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
    $scope.alert = {"bShowAlertPopup":false, "alertPopupMsg":""};
    $scope.recent = {"maxrow":6, "cursor":0, "bLoading":false, "totalCount":0};
    $scope.defaultMediaVal = {};
    $scope.loginDetail = {"login":false, "register":false};
    $scope.selectedCategoryid = {"parent":"all", "child":"all"};
    $scope.mapData = {"state":false};
    $scope.showloginout = true;
    $scope.changeMenu = function (showtilemenuVal) {
        $scope.showtilemenu = showtilemenuVal;
    }
    $scope.changeMenu(true);
//    $scope.$on('$routeChangeStart',function(next,curent){
//        console.log("change start");
//        console.log(next);
//        console.log(curent);
//    })
//    $scope.$on('$locationChangeSuccess',function(angularEvent,next,curent){
//        console.log("locationChangeSuccess");
//        console.log(angularEvent);
//        console.log(next);
//        console.log(curent);
//    })
    $scope.getDefaultMedia = function () {
        var query = {"table":"default__pajhwok"};
        query.columns = ["identifier", "image"];
        var params = {"query":JSON.stringify(query), "ask":ASK, "osk":OSK};
        $appService.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
            for (var i = 0; i < callBackData.response.data.length; i++) {
                $scope.defaultMediaVal[callBackData.response.data[i]["identifier"]] = callBackData.response.data[i]["image"][0].key;
            }

        }, function (err) {
        });

    }

    $scope.getDefaultMedia();
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
        $scope.name = "";
        $scope.email = "";
        $scope.phone = "";
        $scope.newPost.descriptiontemp = "";
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
    $scope.setUrls = function (data, size, height) {
        for (var i = 0; i < data.length; i++) {
            if (data[i]["media"] && data[i]["media"].length) {
                if ((/\.(gif|jpg|jpeg|tiff|png|bmp)$/gi).test(data[i]["media"][0].name)) {
                    data[i].displayType = {"image":true, "audioVideo":false};
                    if (size) {

                        if (height) {
                            data[i]["imgurl"] = BAAS_SERVER + "/file/render?filekey=" + data[i]["media"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK + '&resize={"width":' + size + ',"height":' + height + '}&convert={"type":"png"}';
                        }
                        else {

                            data[i]["imgurl"] = BAAS_SERVER + "/file/render?filekey=" + data[i]["media"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK + '&resize={"width":' + size + '}&convert={"type":"png"}';
                        }
                    }
                    else {
                        if (height) {
                            data[i]["imgurl"] = BAAS_SERVER + "/file/render?filekey=" + data[i]["media"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK + '&resize={"width":580,"height":' + height + '}&convert={"type":"png"}';
                        }

                        else {
                            data[i]["imgurl"] = BAAS_SERVER + "/file/render?filekey=" + data[i]["media"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK + '&resize={"width":580}&convert={"type":"png"}';
                        }
                    }
                }
                else if ((/\.(flv|mov|mp4|m4v|f4v|aac|m4a|f4a|mp3|ogg|oga)$/gi).test(data[i]["media"][0].name)) {
                    data[i].displayType = {"image":false, "audioVideo":true};
                    data[i]["fileUrl"] = BAAS_SERVER + "/file/render?filekey=" + data[i]["media"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK;
                    if (data[i]["media"][0]["capturedimagekey"]) {
                        if (size) {
                            if (height) {

//                                data[i]["thumbnail"] = BAAS_SERVER + "/file/render?filekey=" + data[i]["media"][0]["capturedimagekey"] + '&ask=' + ASK + '&osk=' + OSK + '&resize={"width":' + size + ',"height":' + height + '}&convert={"type":"png"}';
                                data[i]["thumbnail"] = BAAS_SERVER + "/file/render?filekey=" + data[i]["media"][0]["capturedimagekey"] + '&ask=' + ASK + '&osk=' + OSK;
                                console.log("in set url" + data[i]["thumbnail"]);
                            }
                            else {
//                                data[i]["thumbnail"] = BAAS_SERVER + "/file/render?filekey=" + data[i]["media"][0]["capturedimagekey"] + '&ask=' + ASK + '&osk=' + OSK + '&resize={"width":' + size + '}&convert={"type":"png"}';
                                data[i]["thumbnail"] = BAAS_SERVER + "/file/render?filekey=" + data[i]["media"][0]["capturedimagekey"] + '&ask=' + ASK + '&osk=' + OSK;
                            }
                        }
                        else {
                            if (height) {
//                                data[i]["thumbnail"] = BAAS_SERVER + "/file/render?filekey=" + data[i]["media"][0]["capturedimagekey"] + '&ask=' + ASK + '&osk=' + OSK + '&resize={"width":580,"height":' + height + '}&convert={"type":"png"}';
                                data[i]["thumbnail"] = BAAS_SERVER + "/file/render?filekey=" + data[i]["media"][0]["capturedimagekey"] + '&ask=' + ASK + '&osk=' + OSK;
                            } else {

//                                data[i]["thumbnail"] = BAAS_SERVER + "/file/render?filekey=" + data[i]["media"][0]["capturedimagekey"] + '&ask=' + ASK + '&osk=' + OSK + '&resize={"width":580}&convert={"type":"png"}';
                                data[i]["thumbnail"] = BAAS_SERVER + "/file/render?filekey=" + data[i]["media"][0]["capturedimagekey"] + '&ask=' + ASK + '&osk=' + OSK;
                            }
                        }
                    }
                    else {
                        data[i]["thumbnail"] = BAAS_SERVER + "/file/render?filekey=" + $scope.defaultMediaVal["audiologo"] + '&ask=' + ASK + '&osk=' + OSK;
                    }
                }
            }
            else {
                data[i].displayType = {"image":false, "audioVideo":false};

            }
        }
        return(angular.copy(data));
    }
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
        query.columns = ["en_name", "direction"];
        query.orders = {"en_name":"asc"};
        var params = {"query":JSON.stringify(query), "ask":ASK, "osk":OSK};
        $appService.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
            $scope.uploadSelectedLanguage = callBackData.response.data;
            $scope.fetchCommonLabel();
        }, function (err) {
        });

    }
    $scope.setLangVariables = function (id, addToCookie) {

        if (id) {
            $scope.selectedTrans = id;
            $scope.uploadSelectedTrans = id;
        }
        else {

            $scope.selectedTrans = ENGLISH_LANGUAGE;
            $scope.uploadSelectedTrans = ENGLISH_LANGUAGE;
        }
        if (addToCookie) {
            var c_name = "pajhwoklang";
            document.cookie = c_name + "=" + escape(id);
        }
        $scope.getTrans();
    }
    var n_lang_id = $appService.getCookie("pajhwoklang");
    console.log(n_lang_id);
    if (n_lang_id) {
        $scope.setLangVariables(n_lang_id, false);
    } else {
        $scope.setLangVariables(ENGLISH_LANGUAGE, true);
    }
    $scope.refreshPath = function (id, setcookie) {
        var path = window.location.hash;
        console.log(path);
        var condition = (path.indexOf('#/search') >= 0 || path.indexOf('#/news') >= 0 || path.indexOf('#/') >= 0 && !(path.indexOf('#/howtoreport') >= 0) && !(path.indexOf('#/aboutus') >= 0) && !(path.indexOf('#/contactus') >= 0) && !(path.indexOf('#/whatisfraud') >= 0) && !(path.indexOf('#/guidelines') >= 0) && !(path.indexOf('#/mymedia') >= 0) && !(path.indexOf('#/manageunpublishnews') >= 0) && !(path.indexOf('#/manageflaggednews') >= 0) && !(path.indexOf('#/myunpublishmedia') >= 0) && !(path.indexOf('#/manageuser') >= 0)) ? true : false;
        console.log(condition);
        if (condition) {
            window.location.href = "/";
            $scope.setLangVariables(id, setcookie);
        } else {
            $scope.setLangVariables(id, setcookie);
        }
    }

    $scope.fetchCommonLabel = function () {
        var query = {"table":"CommanLabel__pajhwok"};
        query.columns = ["identifier", "en_label", "ps_label", "dr_label"];
        var params = {"query":JSON.stringify(query), "ask":ASK, "osk":OSK};
        $appService.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
            $scope.availableLanguages = callBackData.response.data;
            $scope.userSelectedLanguage.data = {};
            $scope.setLanguage();
        }, function (err) {
        });

    }
    $scope.setUploadLanguage = function (id) {
        $scope.uploadSelectedTrans = id;
    }
    $scope.setLanguage = function () {
        var path = window.location.hash;
        if ($scope.selectedTrans == ENGLISH_LANGUAGE) {
            $(".wrapper").removeClass("rtl");
            for (var i = 0; i < $scope.availableLanguages.length; i++) {
                $scope.userSelectedLanguage.data[$scope.availableLanguages[i]["identifier"]] = $scope.availableLanguages[i]["en_label"];
            }

            for (var i = 0; i < $scope.uploadSelectedLanguage.length; i++) {
                if ($scope.uploadSelectedLanguage[i]._id == ENGLISH_LANGUAGE) {
                    $scope.newPostTrans = $scope.uploadSelectedLanguage[i];
                    break;
                }
            }
            /* change made*/
            // window.location.href='#/en';
        }
        else if ($scope.selectedTrans == DARI_LANGUAGE) {
            $(".wrapper").addClass("rtl");
            for (var i = 0; i < $scope.availableLanguages.length; i++) {
                $scope.userSelectedLanguage.data[$scope.availableLanguages[i]["identifier"]] = $scope.availableLanguages[i]["dr_label"];
            }
            for (var i = 0; i < $scope.uploadSelectedLanguage.length; i++) {
                if ($scope.uploadSelectedLanguage[i]._id == DARI_LANGUAGE) {
                    $scope.newPostTrans = $scope.uploadSelectedLanguage[i];
                    break;
                }
            }
            /* change made*/
            // window.location.href='#/dr';
        }
        else if ($scope.selectedTrans == PASHTO_LANGUAGE) {
            $(".wrapper").addClass("rtl");
            for (var i = 0; i < $scope.availableLanguages.length; i++) {
                $scope.userSelectedLanguage.data[$scope.availableLanguages[i]["identifier"]] = $scope.availableLanguages[i]["ps_label"];
            }
            for (var i = 0; i < $scope.uploadSelectedLanguage.length; i++) {
                if ($scope.uploadSelectedLanguage[i]._id == PASHTO_LANGUAGE) {
                    $scope.newPostTrans = $scope.uploadSelectedLanguage[i];
                    break;
                }
            }
            /* change made*/
            //   window.location.href='#/ps';
        }
        if (!$scope.$$phase) {
            $scope.$apply();
        }

    }
    $scope.changePath = function () {
        var path = window.location.hash;
        var condition = path.indexOf('#/map') >= 0 ? true : false;
        if (path == "#/aboutus" || path == "#/contactus" || path == "#/whatisfraud") {
            return false;
        }
//        window.location.href="/#/";
//        if (condition) {
//            window.location.href = '#/map/category/' + $scope.selectedCategoryid + '/language/' + $scope.selectedTrans + '/search?q=' + null;
//        }
//        else if (path != "#/home") {
//            window.location.href = "#/home";
//        }
//        else {
//            $scope.getAllNews();
//        }
    }
    $scope.getMenuCategories = function () {
        var query = {"table":"Category__pajhwok"};
        query.columns = ["en_title", "_id", "dr_title", "ps_title", "tilemenu", "image"];
        query.childs = [
            {"alias":"childs", "usein":true, "relatedcolumn":"parentcategoryid", "query":{"table":"Category__pajhwok", "columns":["id", "en_title", "ps_title", "dr_title", "tilemenu", "image"], "filter":{"showinmenu":true}}}
        ];
        query.filter = {"showinmenu":true, "parentcategoryid":{"$exists":false}};
        query.orders = {"seq":"asc"};
        var params = {"query":JSON.stringify(query), "ask":ASK, "osk":OSK};
        $appService.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
            $scope.category = callBackData.response.data;
            for (var i = 0; i < $scope.category.length; i++) {
                if ($scope.category[i] && $scope.category[i]["image"]) {
                    var url = BAAS_SERVER + "/file/render?filekey=" + $scope.category[i]["image"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK + '&convert={"type":"png"}';
                    $scope.category[i]["display"] = {"image":true, "imgurl":url};

                }
                if ($scope.category[i] && $scope.category[i]["childs"]) {
                    for (var j = 0; j < $scope.category[i]["childs"].length; j++) {
                        if ($scope.category[i]["childs"] && $scope.category[i]["childs"][j]["image"]) {
                            var url = BAAS_SERVER + "/file/render?filekey=" + $scope.category[i]["childs"][j]["image"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK + '&convert={"type":"png"}';
                            $scope.category[i]["childs"][j]["display"] = {"image":true, "imgurl":url};

                        }

                    }


                }
                $scope.category[i]["viewRolesList"] = false;


            }
        }, function (err) {
        });
    }

    $scope.getCategories = function () {
        var query = {"table":"Category__pajhwok"};
        query.columns = ["en_title", "_id", "dr_title", "ps_title"];
        query.filter = {"parentcategoryid":{"$exists":false}};
        query.orders = {"seq":"asc"};
        var params = {"query":JSON.stringify(query), "ask":ASK, "osk":OSK};
        $appService.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
            $scope.categorylist = callBackData.response.data;
            for (var i = 0; i < $scope.categorylist.length; i++) {
                $scope.categorylist[i]["viewRolesList"] = false;
            }
        }, function (err) {
        });
    }

    $scope.getSubCategories = function () {
        var query = {"table":"Category__pajhwok"};
        query.columns = ["en_title", "_id", "dr_title", "ps_title", "parentcategoryid"];
        query.filter = {"parentcategoryid":{"$exists":true}};
        query.orders = {"seq":"asc"};
        var params = {"query":JSON.stringify(query), "ask":ASK, "osk":OSK};
        $appService.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
            $scope.subCategoryArr = callBackData.response.data;
        }, function (err) {
        });
    }
    $scope.showSubCategory = function (categoryid) {
        var filteredSubCat = $scope.subCategoryArr.filter(function (el) {
            return el.parentcategoryid._id == categoryid;
        });
        $scope.subCategory = filteredSubCat;
    }


    $scope.getCities = function () {
        var query = {"table":"City__pajhwok"};
        query.columns = ["name", "en_fullname", "dr_fullname", "ps_fullname", "location"];
        query.orders = {"name":"asc"};
        var params = {"query":JSON.stringify(query), "ask":ASK, "osk":OSK};
        $appService.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
            $scope.uploadCities = callBackData.response.data;
            $scope.uploadCities.splice(0, 0, {"name":"Select City", "en_fullname":"Select City", "dr_fullname":"انتخاب شهر", "ps_fullname":"دښار ټاکنه", "_id":null, "location":[]});
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
            $scope.states.splice(0, 0, {"name":"All", "ps_name":"ټول", "dr_name":"همه", "_id":"all"});
            $scope.defaultSelected.selectedState = $scope.states[0];
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (err) {
            alert(err.message);
        });
    }
    $scope.getStates();

    $scope.getRecentStories = function (max_rows) {
        var query = {};
        query.table = "News__pajhwok";
        var columnArray = ["_id", "title", "guest.name", "description", "category", "media", "likeby", "likecount", "flaggedby", "commentcount", "__createdby.firstname", "activitycount", "clickcount", {"expression":"__createdon", "format":"fromnow"}];
        query.columns = columnArray;

        query.max_rows = $scope.recent["maxrow"];

//        query.cursor = $scope.recent["cursor"];
        query.$count = 1;
        query.orders = {"__createdon":"desc"};
        query.filter = {"status":"approved", "transid":$scope.selectedTrans, "category.tilemenu":true};
        if ($scope.defaultSelected.selectedState && $scope.defaultSelected.selectedState._id && $scope.defaultSelected.selectedState._id != "all") {
            query.filter["stateid"] = $scope.defaultSelected.selectedState._id;
        }
        var currentSession = $scope.getSession();
        var timeZone = new Date().getTimezoneOffset();
        timeZone = timeZone * 60000;
        var queryParams = {};
        if (currentSession && currentSession["usk"]) {
            queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "usk":currentSession["usk"], "state":JSON.stringify({"timezone":timeZone})};
        }
        else {
            queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "state":JSON.stringify({"timezone":timeZone})};
        }

        var serviceURL = "/rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (recentStoriesData) {
            $scope.loading.loadingNews = false;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
            var recentstorydata = recentStoriesData.response.data;
            for (var i = 0; i < recentstorydata.length; i++) {

                if ($scope.selectedTrans == ENGLISH_LANGUAGE) {

                    recentstorydata[i].description = (recentstorydata[i].description) ? unescape(recentstorydata[i].description) : "";
                }
                else {
                    recentstorydata[i].description = (recentstorydata[i].description) ? recentstorydata[i].description : "";
                }

            }
            $scope.recent.cursor = recentStoriesData.response.cursor;
            $scope.recent.totalCount = recentStoriesData.response.$count;
            $scope.recentStoriesDetail = $scope.setUrls(recentStoriesData.response.data, 580, 300);

        }, function (jqxhr, error) {
        })
    }


    $scope.getAllNews = function () {
        $scope.loading.loadingNews = true;
        $scope.getRecentStories(5);
    }
    $scope.getCities();
    /*get cities  and cites */
    $scope.getMenuCategories();
    $scope.getCategories();
    $scope.getSubCategories();
    $scope.getFileExtension = function (filename) {
        var ext = /^.+\.([^.]+)$/.exec(filename);
        return ext == null ? "" : ext[1];
    }
//    $scope.showFile = function (renderfile, thumbnail, auto_start, w, h) {
//        $scope.displayType.image = false;
////        $scope.displayType.imageFileUrl='images/loading18.gif';
//        if (!$scope.$$phase) {
//            $scope.$apply();
//        }
//
//        var width, height;
//        if (w && h) {
//            width = w;
//            height = h;
//        }
//        else {
//            width = 629;
//            height = 310;
//        }
//        if (renderfile && renderfile.length > 0) {
//            if (thumbnail) {
//                var file_ext = $scope.getFileExtension(renderfile[0].name);
//                if ((/\.(gif|jpg|jpeg|tiff|png|bmp)$/gi).test(renderfile[0].name)) {
//                    $scope.displayType.image = true;
//                    $scope.displayType.videoAudio = false;
//                    if (!$scope.$$phase) {
//                        $scope.$apply();
//                    }
//                    $scope.displayType.imageFileUrl = "/rest/file/render?filekey=" + renderfile[0].key + '&ask=' + ASK + '&osk=' + OSK + '&resize={"width":635,"height":310}&convert={"type":"png"}';
//                    jQuery("img.lazy").lazy();
//
//                }
//                else if ((/\.(flv|mov|mp4|m4v|f4v|aac|m4a|f4a|mp3|ogg|oga)$/gi).test(renderfile[0].name)) {
//                    $scope.displayType.image = false;
//                    $scope.displayType.videoAudio = true;
//                    if (!$scope.$$phase) {
//                        $scope.$apply();
//                    }
//                    var fileUrl = "/rest/file/render?filekey=" + renderfile[0].key + "&ask=" + ASK + "&osk=" + OSK;
//                    var imgUrl = "/rest/file/render?filekey=" + thumbnail[0].key + "&ask=" + ASK + "&osk=" + OSK;
//                    document.getElementById('ova-jwplayer-container').innerHTML = "";
//                    jwplayer('ova-jwplayer-container').setup({
//                        image:imgUrl,
//                        file:fileUrl,
//                        width:width,
//                        height:height,
//                        autostart:auto_start,
//                        type:file_ext
//                    });
//                }
//            } else {
//                var file_ext = $scope.getFileExtension(renderfile[0].name);
//                if ((/\.(gif|jpg|jpeg|tiff|png|bmp)$/gi).test(renderfile[0].name)) {
//                    $scope.displayType.image = true;
//                    $scope.displayType.videoAudio = false;
//                    if (!$scope.$$phase) {
//                        $scope.$apply();
//                    }
//                    $scope.displayType.imageFileUrl = "/rest/file/render?filekey=" + renderfile[0].key + '&ask=' + ASK + '&osk=' + OSK + '&resize={"width":635,"height":310}&convert={"type":"png"}';
//                    jQuery("img.lazy").lazy();
//
//                }
//                else if ((/\.(flv|mov|mp4|m4v|f4v|aac|m4a|f4a|mp3|ogg|oga)$/gi).test(renderfile[0].name)) {
//                    $scope.displayType.image = false;
//                    $scope.displayType.videoAudio = true;
//                    if (!$scope.$$phase) {
//                        $scope.$apply();
//                    }
//                    var fileUrl = "/rest/file/render?filekey=" + renderfile[0].key + "&ask=" + ASK + "&osk=" + OSK;
//                    var imgUrl = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + ASK + "&osk=" + OSK;
//                    document.getElementById('ova-jwplayer-container').innerHTML = "";
//                    jwplayer('ova-jwplayer-container').setup({
//                        image:imgUrl,
//                        file:fileUrl,
//                        width:width,
//                        height:height,
//                        autostart:auto_start,
//                        type:file_ext
//                    });
//                }
//            }
//
//        } else if (thumbnail) {
//            if ((/\.(gif|jpg|jpeg|tiff|png|bmp)$/gi).test(thumbnail[0].name)) {
//                $scope.displayType.image = true;
//                $scope.displayType.videoAudio = false;
//                if (!$scope.$$phase) {
//                    $scope.$apply();
//                }
//                $scope.displayType.imageFileUrl = "/rest/file/render?filekey=" + thumbnail[0].key + '&ask=' + ASK + '&osk=' + OSK + '&resize={"width":635,"height":310}&convert={"type":"png"}';
//            }
//
//        }
//    }
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
            if (dataUpdate.response.update && dataUpdate.response.update.length > 0) {
                if (record != undefined) {
                    record.clickcount = record.clickcount + 1;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                }
            }
            else if (dataUpdate.response.insert && dataUpdate.response.insert.length > 0) {
                console.log("Inserted");
            }
            else {
                console.log("Failed");
            }
        }, function (err) {
        });

    }

//    $scope.setTopNews = function (newsData, auto_start, width, height) {
//        $scope.topNews = newsData;
//        $scope.boolred = false;
//        $scope.boolgreen = false;
//        $scope.boolblue = false;
//        $scope.boolblack = false;
//        $scope.boolyellow = false;
//
//        if ($scope.topNews) {
//            if ($scope.topNews['category']._id == SECURITY_INCIDENTS) {
//                $scope.boolred = true;
//                $scope.boolgreen = false;
//                $scope.boolblue = false;
//                $scope.boolblack = false;
//                $scope.boolyellow = false;
//            }
//            if ($scope.topNews['category']._id == VOTES_FOR_PEACE) {
//                $scope.boolred = false;
//                $scope.boolgreen = false;
//                $scope.boolblue = false;
//                $scope.boolblack = false;
//                $scope.boolyellow = false;
//            }
//            if ($scope.topNews['category']._id == ELECTION_OPINION) {
//                $scope.boolred = false;
//                $scope.boolgreen = false;
//                $scope.boolblue = true;
//                $scope.boolblack = false;
//                $scope.boolyellow = false;
//            }
//            if ($scope.topNews['category']._id == VOILATION_FRAUD) {
//                $scope.boolred = false;
//                $scope.boolgreen = false;
//                $scope.boolblue = false;
//                $scope.boolblack = true;
//                $scope.boolyellow = false;
//            }
//            if ($scope.topNews['category']._id == ELECTION_MONITOR) {
//                $scope.boolred = false;
//                $scope.boolgreen = false;
//                $scope.boolblue = false;
//                $scope.boolblack = false;
//                $scope.boolyellow = true;
//            }
//        }
//
//        $scope.topNewsVisible = "";
//        if ($scope.topNews) {
//            $scope.topNewsVisible = "true";
//            $scope.showFile($scope.topNews['media'], $scope.topNews['image'], auto_start, width, height);
//        } else {
//            $scope.topNewsVisible = "false";
//        }
//
//
//    };
    $scope.setCategory = function (categoryData) {
        var path = window.location.hash;
        var condition = path.indexOf('#/map') >= 0 ? true : false;
        if (condition) {
            if (categoryData) {
                var selectedCategory = $scope.selectedCategoryid;
                if (!selectedCategory) {
                    selectedCategory = {};
                    $scope.selectedCategoryid = selectedCategory;
                } else {
                    delete selectedCategory["child"];
                }
                selectedCategory["parent"] = categoryData._id;

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
                $scope.labelDetail.subCategoryName = "";
                $scope.labelDetail.visibleSubCategoryFilter = false;

            }
            $scope.uploadNews = false;
            window.location.href = '#/map/category/' + ($scope.selectedCategoryid && $scope.selectedCategoryid.parent ? $scope.selectedCategoryid["parent"] : "all") + '/subcategory/all/language/' + $scope.selectedTrans + '/search?q=' + $scope.searchContent;
//            window.location.href = '#/map/language/' + $scope.selectedTrans + '/search?q=' + null;

        } else {
            if (categoryData) {
                var selectedCategory = $scope.selectedCategoryid;
                if (!selectedCategory) {
                    selectedCategory = {};
                    $scope.selectedCategoryid = selectedCategory;
                } else {
                    delete selectedCategory["child"];
                }
                selectedCategory["parent"] = categoryData._id;

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
                $scope.labelDetail.subCategoryName = "";
                $scope.labelDetail.visibleSubCategoryFilter = false;
            }
            $scope.uploadNews = false;
            window.location.href = "#/search/category/" + ($scope.selectedCategoryid && $scope.selectedCategoryid.parent ? $scope.selectedCategoryid["parent"] : "all") + "/subcategory/all/state/" + $scope.defaultSelected.selectedState._id + "/language/" + $scope.selectedTrans + "/searchcontent?q=" + $scope.searchContent;
        }
    };

    $scope.setSubCategory = function (subCategoryData) {
        var path = window.location.hash;
        var condition = path.indexOf('#/map') >= 0 ? true : false;
        if (condition) {
            var selectedCategory = $scope.selectedCategoryid;
            selectedCategory["child"] = subCategoryData._id;
            $scope.labelDetail.visibleSubCategoryFilter = true;
            if ($scope.selectedTrans == ENGLISH_LANGUAGE) {
                $scope.labelDetail.subCategoryName = subCategoryData['en_title'];
            }
            else if ($scope.selectedTrans == DARI_LANGUAGE) {
                $scope.labelDetail.subCategoryName = subCategoryData['dr_title'];
            }
            else if ($scope.selectedTrans == PASHTO_LANGUAGE) {
                $scope.labelDetail.subCategoryName = subCategoryData['ps_title'];
            }

            $scope.uploadNews = false;
            window.location.href = '#/map/category/' + $scope.selectedCategoryid["parent"] + "/subcategory/" + ( $scope.selectedCategoryid["child"] ? $scope.selectedCategoryid["child"] : "all" ) + '/language/' + $scope.selectedTrans + '/search?q=' + null;
//            window.location.href = '#/map/language/' + $scope.selectedTrans + '/search?q=' + null;

        } else {
            var selectedCategory = $scope.selectedCategoryid;
            selectedCategory["child"] = subCategoryData._id;
            $scope.labelDetail.visibleSubCategoryFilter = true;
            if ($scope.selectedTrans == ENGLISH_LANGUAGE) {
                $scope.labelDetail.subCategoryName = subCategoryData['en_title'];
            }
            else if ($scope.selectedTrans == DARI_LANGUAGE) {
                $scope.labelDetail.subCategoryName = subCategoryData['dr_title'];
            }
            else if ($scope.selectedTrans == PASHTO_LANGUAGE) {
                $scope.labelDetail.subCategoryName = subCategoryData['ps_title'];
            }

            $scope.uploadNews = false;
            window.location.href = "#/search/category/" + ($scope.selectedCategoryid && $scope.selectedCategoryid.parent ? $scope.selectedCategoryid["parent"] : "all") + "/subcategory/" + ($scope.selectedCategoryid["child"] ? $scope.selectedCategoryid["child"] : "all") + "/state/" + $scope.defaultSelected.selectedState._id + "/language/" + $scope.selectedTrans + "/searchcontent?q=" + $scope.searchContent;
        }
    };
    $scope.setState = function () {

        window.location.href = "#/search/category/" + ($scope.selectedCategoryid && $scope.selectedCategoryid.parent ? $scope.selectedCategoryid["parent"] : "all") + "/subcategory/" + ($scope.selectedCategoryid["child"] ? $scope.selectedCategoryid["child"] : "all") + "/state/" + $scope.defaultSelected.selectedState._id + "/language/" + $scope.selectedTrans + "/searchcontent?q=" + $scope.searchContent;

    }
    $scope.getSimilarCategory = function (max_rows, filterData, newsid) {
        var query = {};
        query.table = "News__pajhwok";
        var columnArray = ["_id", "title", "guest.name", "media", "description", "commentcount", "__createdby.firstname", "activitycount", "clickcount", {"expression":"__createdon", "format":"fromnow"}];
        query.columns = columnArray;
        if (typeof max_rows) {
            query.max_rows = max_rows;
        }
        else {
            query.max_rows = 3;
        }
        query.cursor = 0;
        query.filter = {"category":{"_id":filterData}, "_id":{"$ne":newsid}, "transid":$scope.selectedTrans, "status":"approved"};
        query.orders = {"__createdon":"desc"};

        var timeZone = new Date().getTimezoneOffset();
        timeZone = timeZone * 60000;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "state":JSON.stringify({"timezone":timeZone})};
        var serviceURL = "/rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (topStoriesData) {
            $scope.similarCategory = $scope.setUrls(topStoriesData.response.data, 266);
            $scope.similarCategoryVisible = "";
            if ($scope.similarCategory.length) {
                $scope.similarCategoryVisible = "true";
            }
            else {
                $scope.similarCategoryVisible = "false";
            }

        }, function (jqxhr, error) {
        })
    }
});
pajhwokApp.controller('userCtrl', function ($scope, $compile, $http, $location, $appService, $rootScope, $routeParams) {

    var currentSession = $scope.getSession();
    $scope.userData = {};
    $scope.baddUser = false;
    $scope.roleOptions = [];
    $scope.selectedRole = {};
    $scope.selectedRole1 = {};
    $scope.cursor = "";
    $scope.loadingMedia = false;
    $scope.maxRows = null;
    $scope.rows = 3;
    $scope.visibleUserList = "";
    $scope.manageUserDisplay = {"bChangeRole":false, "baddUser":false};
    $scope.fnAdduser = function () {
        $scope.addUser = {};
        $scope.manageUserDisplay.baddUser = true;
        $scope.selectedRole1 = $scope.roleOptions[0];
    }
    $scope.changeUserRole = function (user) {
        $scope.userData = user;
        for (var i = 0; i < $scope.roleOptions.length; i++) {
            if (user["roleid"]._id == $scope.roleOptions[i]._id) {
                $scope.selectedRole = $scope.roleOptions[i];
                break;
            }
        }
        $scope.manageUserDisplay.bChangeRole = true;
        if (!$scope.$$phase) {
            $scope.$apply();
        }

    };


    $scope.changeStatus = function (index, id) {
        var chStatus = !($scope.userList[index].userid.status);
        //$scope.userList[index].userid.status = !($scope.userList[index].userid.status);
        if
            (!$scope.$$phase) {
            $scope.$apply();
        }
        var query = {};
        query.table = "users__baas";
        var columnArray = [
            {"_id":id, "status":chStatus}
        ];

        query.operations = columnArray;
        $appService.save(query, ASK, OSK, null, function (dataUpdate) {
            if (dataUpdate.response.update && dataUpdate.response.update.length > 0) {
                $scope.userList[index].userid.status = !($scope.userList[index].userid.status);
                $scope.alert.bShowAlertPopup = true;
                $scope.alert.alertPopupMsg = "Updated";
            }
            else if (dataUpdate.response.insert && dataUpdate.response.insert.length > 0) {
                $scope.alert.bShowAlertPopup = true;
                $scope.alert.alertPopupMsg = "inserted";
            }
            else {
                $scope.alert.bShowAlertPopup = true;
                $scope.alert.alertPopupMsg = "User save failed";
            }
        }, function (err) {
            alert("Some error occured");
        });
    };

    $scope.cancelChanges = function () {
        $scope.manageUserDisplay.bChangeRole = false;
        $scope.baddUser = false;
    }

    $scope.roleOption = function () {
        var query = {};
        query.table = "Role__pajhwok";
        var columnArray = ["_id", "name"];
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
    $scope.getMoreUsersList = function (cursor) {
        if ($scope.loadingMedia == true) {
            return
        }
        $scope.loadingMedia = true;

        if ($scope.cursor + 3 > $scope.maxRows) {
            var rows = $scope.cursor + 3 - $scope.maxRows;
            $scope.cursor = "";
        }
        else {
            var rows = 3;
        }
        var query = {};
        query.table = "Profile__pajhwok";
        var columnArray = ["_id", "userid.username", "userid.firstname", "userid.emailid", "userid.status", "roleid", {"expression":"__createdon", "format":"fromnow"}];
        query.max_rows = rows;
        query.cursor = cursor;
        query.columns = columnArray;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceURL = "/rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (manageUserData) {
            $scope.loadingMedia = false;
            for (var i = 0; i < manageUserData.response.data.length; i++) {
                $scope.userList.push(manageUserData.response.data[i]);
            }
            $scope.cursor = manageUserData.response.cursor;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
        })
    };
    $scope.getUsersList = function () {
        var query = {};
        query.table = "Profile__pajhwok";
        var columnArray = ["_id", "userid.username", "userid.firstname", "userid.emailid", "userid.status", "roleid", {"expression":"__createdon", "format":"fromnow"}];
        query.max_rows = 3;
        query.$count = 1;
        query.columns = columnArray;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK};
        var serviceURL = "/rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (manageUserData) {
            $scope.userList = manageUserData.response.data;
            if ($scope.userList && $scope.userList.length) {
                $scope.visibleUserList = "true";
                $scope.cursor = manageUserData.response.cursor;
                $scope.maxRows = manageUserData.response.$count;
            } else {
                $scope.visibleUserList = "false";
            }


            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
        })
    };

    if (currentSession) {
        if (currentSession["roleid"] == ADMIN) {

            $scope.getUsersList();
            $scope.roleOption();

        }
        else {
            $scope.alert.bShowAlertPopup = true;
            $scope.alert.alertPopupMsg = "You don't have permission to access this page.";
        }
    }
    else {
        $scope.alert.bShowAlertPopup = true;
        $scope.alert.alertPopupMsg = "You need to login first";
    }

});
pajhwokApp.controller('staticPageCtrl', function ($scope, $compile, $http, $location, $appService, $rootScope, $window, $timeout) {
    $scope.changeMenu(true);
    $scope.$on('$viewContentLoaded', function (event) {
        $window._gaq.push(['_trackPageview', $location.path()]);
    });
    if ($scope.twitterTile) {

        $scope.twitterTile = false;
        $timeout = twttr.widgets.load();
    }

});






















