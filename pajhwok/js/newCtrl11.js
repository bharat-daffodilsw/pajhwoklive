//usk = 531e9d3528ef89dd38ddb896
var userapp=angular.module("userapp", function ($routeProvider, $locationProvider) {});



userapp.directive("myMediaPicsData", [function ($scope) {
    return {
        restrict:"E",
        replace:true,
        template:
                    "<a href='#/news/{{media._id}}'>" +
                        "<div class='only-video'>" +
                            "<span class='popular-video-thumb'><img ng-src='{{media.imgurl}}'></span>" +
                        "</div>" +
                        "<div class='popular-lockup-content'>" +
                             "<h3 class='popular-lockup-title'>" +
                               "<p class='popular-small-heading'>{{media.title}}</p>" +
                             "</h3>" +
                        "</div>" +
                    "</a>",

        compile:function($scope){
            return{
                pre:function($scope){

                },
                post:function($scope){

                }
            }
        }
    }
}]);

userapp.directive("myMedia", [function ($scope) {
    return {
        restrict:"E",
        replace:true,
        template:"<div class='most-popular'>" +
            "<div class='heading'></div>" +
                "<div class='popular-videos'>" +
                    "<div ng-repeat='media in myAllMedia ' class='popular-video-1'>" +
                     "<my-media-pics-data></my-media-pics-data>"+
                    "<div class='popular-video-meta'>" +
                        "<p class='small-meta-info'>" +
                            "<span class='deemphasized-text-name1'>{{userSelectedLanguage['data']['by']}}&nbsp;" +
                                "<span class='user-name cursor-pointer' >{{media['__createdby']['firstname']}}</span>" +
                            "</span>" +
                            "<span class='deemphasized-text'>{{media['__createdon']}}</span>" +
                        "</p>" +
                        "<p class='small-comment'>" +
                            "<span>" +
                                "<a class='video-comments'>{{media['commentcount']}} {{userSelectedLanguage['data']['comments']}}</a>" +
                            "</span>" +
                            "<span class='video-views'>{{media['activitycount']}} {{userSelectedLanguage['data']['views']}}</span>" +
                        "</p>" +
                    "</div>" +
                "</div>" +
            "</div><div id='scrollDiv'></div>" +
            "</div>",
        compile:function () {
            return{
                pre:function ($scope) {
                    $scope.getMyMedia();
                },
                post : function($scope){
                    $(window).scroll(function() {
                        if($(window).scrollTop()+$(window).height() > $("#scrollDiv").offset().top){
                            if($scope.cursor != "" && $scope.cursor != undefined){
                                $scope.getMoreMedia($scope.cursor);
                            }
                        }
                    });
                }
            }
        }
    }
}]);

userapp.controller('myMediaCtrl',function($scope){

    $scope.cursor = "";
    $scope.loadingMedia = false;
    $scope.maxRows = null;
    $scope.rows = 3;
    $scope.getDataFromJQuery = function (url, requestBody, callType, dataType, callback, errcallback) {
//        var usk;
//        usk = $scope.getCookie("usk");
//        if(usk!=null)
//        {
//            requestBody.usk = usk;
//        }


        jQuery.support.cors = true;
        $.ajax({
            type:callType,
            url:url,
            data:requestBody,
            crossDomain:true,
            success:function (returnData, status, xhr) {
                callback(returnData.response ? returnData.response : returnData);
            },
            error:function (jqXHR, exception) {
//                alert(JSON.stringify(jqXHR));
                if (errcallback) {
                    errcallback(jqXHR, exception);
                } else {
                    alert("exception in making [" + url + "] :[" + exception + "]");
                }
            },
            timeout:1200000,
            dataType:dataType,
            async:true
        });
    }

    $scope.getMyMedia = function () {

        $scope.searchResultMessage = false;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
        var query = {};
        query.table = "News__pajhwok";
        var columnArray = ["_id", "title", "media", "commentcount", "category", "image", "__createdby.firstname", "activitycount", {"expression":"__createdon", "format":"fromnow"}];
        query.columns = columnArray;
        query.$count = 1;
        query.filter = {"__createdby":"{_CurrentUserId}"};
        query.max_rows = $scope.rows;
        var queryParams = {query:JSON.stringify(query), "ask":"5301e64492f51ed71842a5d1", "osk":"530459b8aed74b22457bad37","usk":"531e9d3528ef89dd38ddb896"};
        var serviceURL = "/rest/data";
        $scope.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (mediaData) {
            $scope.myAllMedia = mediaData.data;
            $scope.cursor = mediaData.cursor;
            $scope.maxRows = mediaData.$count;
            for (var i = 0; i < $scope.myAllMedia.length; i++) {
                if ($scope.myAllMedia[i]["image"]) {
                    $scope.myAllMedia[i]["imgurl"] = "/rest/file/render?filekey=" + $scope.myAllMedia[i]["image"][0]["key"] + '&ask=' + "5301e64492f51ed71842a5d1" + '&osk=' + "530459b8aed74b22457bad37";
                } else {
                    /*for default image*/
                    $scope.myAllMedia[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + "5301e64492f51ed71842a5d1" + "&osk=" + "530459b8aed74b22457bad37";
                }
            }
            if (!$scope.$$phase) {
                $scope.$apply();
            }

        }, function (jqxhr, error) {
        })
    }

    $scope.getMoreMedia = function(cursor){
        if($scope.loadingMedia == true){
            return;
        }
        $scope.loadingMedia = true;
        if($scope.cursor + $scope.rows > $scope.maxRows){
            var rows = $scope.cursor + $scope.rows - $scope.maxRows;
        }
        else{
            var rows = $scope.rows;
        }

        var query = {};
        query.table = "News__pajhwok";
        var columnArray =  ["_id", "title", "media", "commentcount", "category", "image", "__createdby.firstname", "activitycount", {"expression":"__createdon", "format":"fromnow"}];
        query.filter = {"__createdby":"{_CurrentUserId}"};
        query.max_rows = rows;
        query.cursor = cursor;
        query.columns = columnArray;
        var queryParams = {query:JSON.stringify(query), "ask":"5301e64492f51ed71842a5d1", "osk":"530459b8aed74b22457bad37","usk":"531e9d3528ef89dd38ddb896"};
        var serviceURL = "/rest/data";
        $scope.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (mediaData) {
            console.log(mediaData);
            $scope.loadingMedia = false;
            for(var i=0;i<mediaData.data.length;i++){
                $scope.myAllMedia.push(mediaData.data[i]);
            }
            for (var i = $scope.cursor; i < mediaData.data.length + $scope.cursor; i++) {
                if ($scope.myAllMedia[i]["image"]) {
                    $scope.myAllMedia[i]["imgurl"] = "/rest/file/render?filekey=" + $scope.myAllMedia[i]["image"][0]["key"] + '&ask=' + "5301e64492f51ed71842a5d1" + '&osk=' + "530459b8aed74b22457bad37";
                } else {
                    /*for default image*/
                    $scope.myAllMedia[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + "5301e64492f51ed71842a5d1" + "&osk=" + "530459b8aed74b22457bad37";
                }
            }
            $scope.cursor = mediaData.cursor;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
        })
    };

})



//userapp.directive("unpublishedPicsData", [function ($scope) {
//    return {
//        restrict:"E",
//        replace:true,
//        template:
//
//                "<div class='only-video'>" +
//                "<span class='popular-video-thumb'>" +
//                "</div>" +
//               ,
//
//        compile:function($scope){
//            return{
//                pre:function($scope){
//
//                },
//                post:function($scope){
//
//                }
//            }
//        }
//    }
//}]);

userapp.directive("manageUnpublisNews", [function ($scope) {
    return {
        restrict:"E",
        replace:true,
        template:  '<div><div  ng-repeat="media in unpublishedNews" class="approve-video-1">'+
            "<a href='#/news/{{media._id}}'>" +
            '<div class="only-video">'+
                '<span class="recent-video-thumb">'+
                    '<img ng-src="{{media.imgurl}}"></span>'+
                 '</span>'+
            '</div>'+
            "</a>"+


                '<div class="recent-lockup-content">'+
                    '<h3 class="recent-lockup-title">'+
                        '<a>'+
                            '<p class="popular-small-heading">{{media.title}}</p>'+
                        '</a>'+
                    '</h3>'+
                    '<div class="approve-video-meta">'+
                        '<p class="small-meta-info">'+
                            '<span class="deemphasized-text-name">{{userSelectedLanguage["data"]["by"]}}&nbsp;' +
                                '<a class="user-name ng-binding" >{{media["__createdby"]["firstname"]}}</a></span>'+
                            '<span class="deemphasized-text ng-binding">{{media["__createdon"]}}</span>'+
                        '</p>'+

                            '<p class="approve-btn">'+
                                '<span>'+
                                    '<button class="video-approve-btn" ng-click="updateStatus(media,\'publish\')" ng-hide="media.published || media.rejected">Approve</button>'+
                                    '<label class="video-reject-hide-btn" ng-show="media.published || media.rejected">{{media.message}}</label>	 ' +
                                    '<button class="video-reject-btn" ng-click="updateStatus(media,\'reject\')" ng-hide="media.published || media.rejected">Reject</button>'+

                                '</span>'+
                            '</p>'+

                '</div>' +
            '</div>' +
            '<div id="scrollDiv"></div>'+
            '</div>',





//            "<div class='most-popular'>" +
//            "<div class='heading'></div>" +
//            "<div class='popular-videos'>" +
//            "<div ng-repeat='media in unpublishedNews ' class='popular-video-1'>" +
//            "<my-media-pics-data></my-media-pics-data>"+
//
////            "<p class='small-meta-info'>" +
////            "<span class='deemphasized-text-name1'>{{userSelectedLanguage['data']['by']}}&nbsp;" +
////            "<span class='user-name cursor-pointer' >{{media['__createdby']['firstname']}}</span>" +
////            "</span>" +
////            "<span class='deemphasized-text'>{{media['__createdon']}}</span>" +
////            "</p>" +
//                '<div class="recent-lockup-content">'+
//                '<h3 class="recent-lockup-title">'+
//                '<a class="" a="" href="#">'+
//                '<p class="popular-small-heading">{{media.title}}</p>'+
//                '</a>'+
//                '</h3>'+
//                '<div class="approve-video-meta">'+
//                '<p class="small-meta-info">'+
//                '<span class="deemphasized-text-name">{{userSelectedLanguage["data"]["by"]}}&nbsp;'+
//                    '<a class="user-name ng-binding" href="#">{{media["__createdby"]["firstname"]}}</a>' +
//                '</span>'+
//                '<span class="deemphasized-text ng-binding">{{media["__createdon"]}}</span>'+
//                '</p>'+
//                '<p class="approve-btn">'+
//                '<span>'+
//                '<button class="video-approve-btn" href="#">Approve</button><button class="video-approve-btn" href="#">Reject</button></span>'+
//
//                '</p>'+
//                '</div>'+
//
//                '</div>'+
//
//            "</div>" +
//            "</div><div id='scrollDiv'></div>" +
//            "</div>",
        compile:function () {
            return{
                pre:function ($scope) {
                    $scope.getUnpublishNews();

                },
                post : function($scope){
                    $(window).scroll(function() {
                        if($(window).scrollTop()+$(window).height() > $("#scrollDiv").offset().top){
                            if($scope.cursor != "" && $scope.cursor != undefined){
                                $scope.getMoreMedia($scope.cursor);
                            }
                        }
                    });

                    $scope.updateStatus = function(media,result){
                        var query = {};
                        query.table = "News__pajhwok";
                        if(result == "publish"){
                            var columnArray = [{"_id":media._id,"published":true}];
                            media.published = true;
                            media["message"] = "Approved";
                        }
                        if(result == "reject"){
                            var columnArray = [{"_id":media._id,"rejected":true}];
                            media.rejected = true;
                            media["message"] = "Rejected";
                        }

                        query.operations = columnArray;
                        $scope.save(query, "5301e64492f51ed71842a5d1", "530459b8aed74b22457bad37",function(dataUpdate){
                            if (dataUpdate.update && dataUpdate.update.length > 0) {
                                //console.log(JSON.stringify($scope.user_data));
//                                $scope.user_data.userid.picture = [];
//                                $scope.user_data.userid.picture[0] = data[0];
//                                $scope.fnSaveDetails();
                                alert("updated");
                            }
                            else if (dataUpdate.insert && dataUpdate.insert.length > 0) {
//                                $scope.user_data.userid.picture = [];
//                                $scope.user_data.userid.picture[0] = data[0];
//                                $scope.fnSaveDetails();
                                alert("inserted");
                            }
                            else
                                alert('User save failed');
                        });

                    }

                    $scope.reject = function(){

                    }
                }
            }
        }
    }
}]);


userapp.controller('manageUnpublishNewsCtrl',function($scope){

    $scope.cursor = "";
    $scope.loadingMedia = false;
    $scope.maxRows = null;
    $scope.rows = 3;
    $scope.getDataFromJQuery = function (url, requestBody, callType, dataType, callback, errcallback) {
        jQuery.support.cors = true;
        $.ajax({
            type:callType,
            url:url,
            data:requestBody,
            crossDomain:true,
            success:function (returnData, status, xhr) {
                callback(returnData.response ? returnData.response : returnData);
            },
            error:function (jqXHR, exception) {
//                alert(JSON.stringify(jqXHR));
                if (errcallback) {
                    errcallback(jqXHR, exception);
                } else {
                    alert("exception in making [" + url + "] :[" + exception + "]");
                }
            },
            timeout:1200000,
            dataType:dataType,
            async:true
        });
    }

    $scope.getUnpublishNews = function () {

        var query = {};
        query.table = "News__pajhwok";
        var columnArray = ["_id", "title", "media", "published", "category", "image", "__createdby.firstname", "activitycount", {"expression":"__createdon", "format":"fromnow"}];
        query.columns = columnArray;
        query.$count = 1;
        query.filter = {"published":{$ne:true},"rejected":{$ne:true}};
        query.max_rows = $scope.rows;
        var queryParams = {query:JSON.stringify(query), "ask":"5301e64492f51ed71842a5d1", "osk":"530459b8aed74b22457bad37","usk":"531e9d3528ef89dd38ddb896"};
        var serviceURL = "/rest/data";
        $scope.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (unpublishedData) {
            $scope.unpublishedNews = unpublishedData.data;
            $scope.cursor = unpublishedData.cursor;
            $scope.maxRows = unpublishedData.$count;
            for (var i = 0; i < $scope.unpublishedNews.length; i++) {
                if ($scope.unpublishedNews[i]["image"]) {
                    $scope.unpublishedNews[i]["imgurl"] = "/rest/file/render?filekey=" + $scope.unpublishedNews[i]["image"][0]["key"] + '&ask=' + "5301e64492f51ed71842a5d1" + '&osk=' + "530459b8aed74b22457bad37";
                } else {
                    /*for default image*/
                    $scope.unpublishedNews[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + "5301e64492f51ed71842a5d1" + "&osk=" + "530459b8aed74b22457bad37";
                }
            }
            if (!$scope.$$phase) {
                $scope.$apply();
            }

        }, function (jqxhr, error) {
        })
    }

    $scope.getMoreMedia = function(cursor){
        if($scope.loadingMedia == true){
            return;
        }
        $scope.loadingMedia = true;
        if($scope.cursor + $scope.rows > $scope.maxRows){
            var rows = $scope.cursor + $scope.rows - $scope.maxRows;
        }
        else{
            var rows = $scope.rows;
        }

        var query = {};
        query.table = "News__pajhwok";
        var columnArray =  ["_id", "title", "media", "published" , "commentcount", "category", "image", "__createdby.firstname", "activitycount", {"expression":"__createdon", "format":"fromnow"}];
        query.filter = {"published":{$ne:true},"rejected":{$ne:true}};
        query.max_rows = rows;
        query.cursor = cursor;
        query.columns = columnArray;
        var queryParams = {query:JSON.stringify(query), "ask":"5301e64492f51ed71842a5d1", "osk":"530459b8aed74b22457bad37","usk":"531e9d3528ef89dd38ddb896"};
        var serviceURL = "/rest/data";
        $scope.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (unpublishedData) {
            console.log(unpublishedData);
            $scope.loadingMedia = false;
            for(var i=0;i<unpublishedData.data.length;i++){
                $scope.unpublishedNews.push(unpublishedData.data[i]);
            }
            for (var i = $scope.cursor; i < unpublishedData.data.length + $scope.cursor; i++) {
                if ($scope.unpublishedNews[i]["image"]) {
                    $scope.unpublishedNews[i]["imgurl"] = "/rest/file/render?filekey=" + $scope.unpublishedNews[i]["image"][0]["key"] + '&ask=' + "5301e64492f51ed71842a5d1" + '&osk=' + "530459b8aed74b22457bad37";
                } else {
                    /*for default image*/
                    $scope.unpublishedNews[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + "5301e64492f51ed71842a5d1" + "&osk=" + "530459b8aed74b22457bad37";
                }
            }
            $scope.cursor = unpublishedData.cursor;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
        })
    };

    $scope.save = function (data, ask, osk, callBack) {


        var params = {"updates":JSON.stringify(data), "ask":ask,"osk":osk};

        var that = this;

        var url = "/rest/data";
        console.log(url);
        $scope.getDataFromJQuery(url, params, "GET", "JSON", function (callBackData) {


//            if (!$scope.$$phase) {
//                $scope.$apply();
//            }
            callBack(callBackData);
        });

    } ;



})



userapp.directive("manageFlagedNews", [function ($scope) {
    return {
        restrict:"E",
        replace:true,
        template:  '<div><div  ng-repeat="media in flaggedNews" class="approve-video-1">'+
            "<a href='#/news/{{media._id}}'>" +
            '<div class="only-video">'+
            '<span class="recent-video-thumb">'+
            '<img ng-src="{{media.imgurl}}"></span>'+
            '</span>'+
            '</div>'+
            "</a>"+


            '<div class="recent-lockup-content">'+
            '<h3 class="recent-lockup-title">'+
            '<a class="" a="">'+
            '<p class="popular-small-heading">{{media.title}}</p>'+
            '</a>'+
            '</h3>'+
            '<div class="approve-video-meta">'+
            '<p class="small-meta-info">'+
            '<span class="deemphasized-text-name">{{userSelectedLanguage["data"]["by"]}}&nbsp;' +
            '<a class="user-name ng-binding" >{{media["__createdby"]["firstname"]}}</a></span>'+
            '<span class="deemphasized-text ng-binding">{{media["__createdon"]}}</span>'+
            '</p>'+
            '<p class="approve-btn">'+
            '<span>'+
            '<button class="video-approve-btn" ng-click="deleteFlaged(media._id,$index)">Delete</button>' +
            '<span class="deemphasized-text ng-binding">{{media["flaggedcount"]}}</span>'+

            '</p>'+
            '</div>'+

            '</div>' +
            '</div>' +
            '</div>'+
            '<div id="scrollDiv"></div>' +
            '</div>',





//            "<div class='most-popular'>" +
//            "<div class='heading'></div>" +
//            "<div class='popular-videos'>" +
//            "<div ng-repeat='media in unpublishedNews ' class='popular-video-1'>" +
//            "<my-media-pics-data></my-media-pics-data>"+
//
////            "<p class='small-meta-info'>" +
////            "<span class='deemphasized-text-name1'>{{userSelectedLanguage['data']['by']}}&nbsp;" +
////            "<span class='user-name cursor-pointer' >{{media['__createdby']['firstname']}}</span>" +
////            "</span>" +
////            "<span class='deemphasized-text'>{{media['__createdon']}}</span>" +
////            "</p>" +
//                '<div class="recent-lockup-content">'+
//                '<h3 class="recent-lockup-title">'+
//                '<a class="" a="" href="#">'+
//                '<p class="popular-small-heading">{{media.title}}</p>'+
//                '</a>'+
//                '</h3>'+
//                '<div class="approve-video-meta">'+
//                '<p class="small-meta-info">'+
//                '<span class="deemphasized-text-name">{{userSelectedLanguage["data"]["by"]}}&nbsp;'+
//                    '<a class="user-name ng-binding" href="#">{{media["__createdby"]["firstname"]}}</a>' +
//                '</span>'+
//                '<span class="deemphasized-text ng-binding">{{media["__createdon"]}}</span>'+
//                '</p>'+
//                '<p class="approve-btn">'+
//                '<span>'+
//                '<button class="video-approve-btn" href="#">Approve</button><button class="video-approve-btn" href="#">Reject</button></span>'+
//
//                '</p>'+
//                '</div>'+
//
//                '</div>'+
//
//            "</div>" +
//            "</div><div id='scrollDiv'></div>" +
//            "</div>",
        compile:function () {
            return{
                pre:function ($scope) {
                    $scope.getFlaggedNews();

                },
                post : function($scope){
                    $(window).scroll(function() {
                        if($(window).scrollTop()+$(window).height() > $("#scrollDiv").offset().top){
                            if($scope.cursor != "" && $scope.cursor != undefined){
                                $scope.getMoreFlaggedMedia($scope.cursor);
                            }
                        }
                    });

                    $scope.deleteFlaged = function(mediaid,index){
                        $scope.flaggedNews.splice([index],1);
                        var query = {};
                        query.table = "News__pajhwok";
                        var columnArray = [{"_id": mediaid, "__type__": "delete"}];
                        query.operations = columnArray;
                        $scope.save(query, "5301e64492f51ed71842a5d1", "530459b8aed74b22457bad37",function(dataUpdate){
                            if (dataUpdate.delete) {
                                //console.log(JSON.stringify($scope.user_data));
//                                $scope.user_data.userid.picture = [];
//                                $scope.user_data.userid.picture[0] = data[0];
//                                $scope.fnSaveDetails();
                                alert("deleted");
                            }
                            else if (dataUpdate.insert && dataUpdate.insert.length > 0) {
//                                $scope.user_data.userid.picture = [];
//                                $scope.user_data.userid.picture[0] = data[0];
//                                $scope.fnSaveDetails();
                                alert("inserted");
                            }
                            else
                                alert('User save failed');
                        });

                    }

                    $scope.reject = function(){

                    }
                }
            }
        }
    }
}]);


userapp.controller('manageFlagedNewsCtrl',function($scope){

    $scope.cursor = "";
    $scope.loadingMedia = false;
    $scope.maxRows = null;
    $scope.rows = 3;
    $scope.getDataFromJQuery = function (url, requestBody, callType, dataType, callback, errcallback) {
        jQuery.support.cors = true;
        $.ajax({
            type:callType,
            url:url,
            data:requestBody,
            crossDomain:true,
            success:function (returnData, status, xhr) {
                callback(returnData.response ? returnData.response : returnData);
            },
            error:function (jqXHR, exception) {
//                alert(JSON.stringify(jqXHR));
                if (errcallback) {
                    errcallback(jqXHR, exception);
                } else {
                    alert("exception in making [" + url + "] :[" + exception + "]");
                }
            },
            timeout:1200000,
            dataType:dataType,
            async:true
        });
    }

    $scope.getFlaggedNews = function () {

        var query = {};
        query.table = "News__pajhwok";
        var columnArray = ["_id", "title", "media", "flaggedcount", "category", "image", "__createdby.firstname", "activitycount", {"expression":"__createdon", "format":"fromnow"}];
        query.columns = columnArray;
        query.$count = 1;
        query.filter = {"flaggedcount":{$gt:0}};
        query.max_rows = $scope.rows;
        var queryParams = {query:JSON.stringify(query), "ask":"5301e64492f51ed71842a5d1", "osk":"530459b8aed74b22457bad37","usk":"531e9d3528ef89dd38ddb896"};
        var serviceURL = "/rest/data";
        $scope.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (flaggedData) {
            $scope.flaggedNews = flaggedData.data;
            $scope.cursor = flaggedData.cursor;
            $scope.maxRows = flaggedData.$count;
            for (var i = 0; i < $scope.flaggedNews.length; i++) {
                if ($scope.flaggedNews[i]["image"]) {
                    $scope.flaggedNews[i]["imgurl"] = "/rest/file/render?filekey=" + $scope.flaggedNews[i]["image"][0]["key"] + '&ask=' + "5301e64492f51ed71842a5d1" + '&osk=' + "530459b8aed74b22457bad37";
                } else {
                    /*for default image*/
                    $scope.flaggedNews[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + "5301e64492f51ed71842a5d1" + "&osk=" + "530459b8aed74b22457bad37";
                }
            }
            if (!$scope.$$phase) {
                $scope.$apply();
            }

        }, function (jqxhr, error) {
        })
    };

    $scope.getMoreFlaggedMedia = function(cursor){
        if($scope.loadingMedia == true){
            return;
        }
        $scope.loadingMedia = true;
        if($scope.cursor + $scope.rows > $scope.maxRows){
            var rows = $scope.cursor + $scope.rows - $scope.maxRows;
        }
        else{
            var rows = $scope.rows;
        }

        var query = {};
        query.table = "News__pajhwok";
        var columnArray =  ["_id", "title", "media", "commentcount", "flaggedcount","category", "image", "__createdby.firstname", "activitycount", {"expression":"__createdon", "format":"fromnow"}];
        query.filter = {"flaggedcount":{$gt:0}};
        query.max_rows = rows;
        query.cursor = cursor;
        query.columns = columnArray;
        var queryParams = {query:JSON.stringify(query), "ask":"5301e64492f51ed71842a5d1", "osk":"530459b8aed74b22457bad37","usk":"531e9d3528ef89dd38ddb896"};
        var serviceURL = "/rest/data";
        $scope.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (flaggedData) {
            console.log(flaggedData);
            $scope.loadingMedia = false;
            for(var i=0;i<flaggedData.data.length;i++){
                $scope.flaggedNews.push(flaggedData.data[i]);
            }
            for (var i = $scope.cursor; i < flaggedData.data.length + $scope.cursor; i++) {
                if ($scope.flaggedNews[i]["image"]) {
                    $scope.flaggedNews[i]["imgurl"] = "/rest/file/render?filekey=" + $scope.flaggedNews[i]["image"][0]["key"] + '&ask=' + "5301e64492f51ed71842a5d1" + '&osk=' + "530459b8aed74b22457bad37";
                } else {
                    /*for default image*/
                    $scope.flaggedNews[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + "5301e64492f51ed71842a5d1" + "&osk=" + "530459b8aed74b22457bad37";
                }
            }
            $scope.cursor = flaggedData.cursor;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
        })
    };

    $scope.save = function (data, ask, osk, callBack) {


        var params = {"updates":JSON.stringify(data), "ask":ask,"osk":osk};

        var that = this;

        var url = "/rest/data";
        console.log(url);
        $scope.getDataFromJQuery(url, params, "GET", "JSON", function (callBackData) {


//            if (!$scope.$$phase) {
//                $scope.$apply();
//            }
            callBack(callBackData);
        });

    } ;



});

//userapp.directive("manageUser", [function ($scope) {
//    return {
//        restrict:"E",
//        replace:true,
//        template:'<div>' +
//            '<div style=" height: 27px;width: 89%;">' +
//            '<input type="text" id="searchText"><button ng-click="searchUsers()">Search</button>' +
//            '<select ng-options="o.name for o in roleOptions" style="float: right;" data-ng-model="selectedRole"></select>' +
//            '<button style="float: right" ng-click="saveManageUsers()">Apply</button></div>' +
//            '<div><table class="skillTable" border="1"><thead><tr><td>UserName' +
//            '</td><td>Email Id</td><td>Status</td><td>Type</td></tr></thead>' +
//
////            '<input type="checkbox" name="selectedFruits[]" value="{{fruitName}}" ng-checked="selection.indexOf(fruitName)>'+
//            '<tr ng-repeat="user in userList">' +
//            '<td><label><input class="checked" type="checkbox" name="checkbox"></label></td>'+
//            '<td>{{user.userid.username}}</td>' +
//            '<td>{{user.userid.emailid}}</td>' +
//            '<td><span style="cursor: pointer;color: #002a80" ng-show="user.userid.status" ng-click="changeStatus($index,user.userid._id)">Block</span><span style="cursor: pointer;color: #002a80" ng-hide="user.userid.status" ng-click="changeStatus($index,user.userid._id)">Unblock</span></td>' +
//            '<td>{{user.roleid.name}}</td></tr>' +
//            '</table></div><div style="height: 100px;width: 10px" id="scrollDiv">' +
//            '</div></div>',
//        compile:function () {
//            return{
//                pre:function ($scope) {
//                    $scope.getUserList();
//                    $scope.roleOption();
//                },
//                post:function($scope){
//                    $(window).scroll(function() {
//                        if($(window).scrollTop()+$(window).height() > $("#scrollDiv").offset().top){
//                            if($scope.cursor != "" && $scope.cursor != undefined){
//                                $scope.getMoreUsers($scope.max_rows,$scope.cursor);
//                            }
//                        }
//                    });
//
//                    $scope.changeStatus = function(index,id){
//                        //$scope.userList[index].userid.status = !$scope.userList[index].userid.status;
////                        user.userid.status = !(user.userid.status);
//                        $scope.userList[index].userid.status = !($scope.userList[index].userid.status);
//                        var query = {};
//                        query.table = "users__baas";
//                        var columnArray = [{"_id":id,"status":$scope.userList[index].userid.status}]; //$scope.userList;
//                        query.operations = columnArray;
//                        $scope.save(query, "5301e64492f51ed71842a5d1", "530459b8aed74b22457bad37",function(dataUpdate){
//                            if (dataUpdate.update && dataUpdate.update.length > 0) {
//                                //console.log(JSON.stringify($scope.user_data));
////                                $scope.user_data.userid.picture = [];
////                                $scope.user_data.userid.picture[0] = data[0];
////                                $scope.fnSaveDetails();
//                                alert("updated");
//                            }
//                            else if (dataUpdate.insert && dataUpdate.insert.length > 0) {
////                                $scope.user_data.userid.picture = [];
////                                $scope.user_data.userid.picture[0] = data[0];
////                                $scope.fnSaveDetails();
//                                alert("inserted");
//                            }
//                            else
//                                alert('User save failed');
//                        });
//
//                    };
//
//                    $scope.saveManageUsers = function(){
//                        var updatedRole = [];
//                        var checkedElement = document.getElementsByClassName('checked');
//                        for(var i=0;i<checkedElement.length;i++){
//                            if(checkedElement[i].checked){
//                                $scope.userList[i].roleid = $scope.selectedRole
//                                updatedRole.push($scope.userList[i]);
//                                checkedElement[i].checked = false;
//                            }
//                        }
//                        var query = {};
//                        query.table = "Profile__pajhwok";
//                        var columnArray = updatedRole;
//                        query.operations = columnArray;
//                        $scope.save(query, "5301e64492f51ed71842a5d1", "530459b8aed74b22457bad37",function(dataUpdate){
//                            if (dataUpdate.update && dataUpdate.update.length > 0) {
//                                //console.log(JSON.stringify($scope.user_data));
////                                $scope.user_data.userid.picture = [];
////                                $scope.user_data.userid.picture[0] = data[0];
////                                $scope.fnSaveDetails();
//                                alert("updated");
//                            }
//                            else if (dataUpdate.insert && dataUpdate.insert.length > 0) {
////                                $scope.user_data.userid.picture = [];
////                                $scope.user_data.userid.picture[0] = data[0];
////                                $scope.fnSaveDetails();
//                                alert("inserted");
//                            }
//                            else
//                                alert('User save failed');
//                        });
//
//                    }
//
//                    $scope.searchUsers = function(){
//                        var text = $("#searchText").val();
//                        $scope.getUserList(text);
//                    }
//                }
//            }
//        }
//    }
//}]);
//
//userapp.controller('userCtrl',function($scope,$rootScope){
//
//    $scope.userList = [];
//    $scope.roleOptions = [];
//    $scope.cursor = "";
//    $scope.roleOpt = [{"name":""}];
//    $scope.selectedRole = {};
//    $scope.userLoading == false;
//
//    $scope.roleOption = function(){
//        var query = {};
//        query.table = "Role__pajhwok";
//        var columnArray = ["_id","name"];
//        query.columns = columnArray;
//        var queryParams = {query:JSON.stringify(query), "ask":"5301e64492f51ed71842a5d1", "osk":"530459b8aed74b22457bad37"};
//        var serviceURL = "/rest/data";
//        $scope.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (roleOptData) {
//            console.log(roleOptData);
//            $scope.roleOptions = roleOptData.data;
//
//            if (!$scope.$$phase) {
//                $scope.$apply();
//            }
//        }, function (jqxhr, error) {
//        })
//    };
//
//
//
//    $scope.getUserList = function(seachUserModel){
//
//        var query = {};
//        query.table = "Profile__pajhwok";
//        var columnArray = ["_id","userid.username","userid.emailid","userid.status","roleid"];
//        if(seachUserModel)
//            query.filter={"$or":[{"userid.username":{"$regex":"("+seachUserModel+"\w*)", "$options":"-i"}},
//                {"userid.emailid":{"$regex":"("+seachUserModel+"\w*)", "$options":"-i"}}
//            ]} ;
//        query.max_rows = 3;
//        query.$count = 1;
//        query.columns = columnArray;
//        var queryParams = {query:JSON.stringify(query), "ask":"5301e64492f51ed71842a5d1", "osk":"530459b8aed74b22457bad37"};
//        var serviceURL = "/rest/data";
//        $scope.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (manageUserData) {
//            console.log(manageUserData);
//            $scope.userList = manageUserData.data;
//            $scope.cursor = manageUserData.cursor;
//            $scope.maxRows = manageUserData.$count;
//            if (!$scope.$$phase) {
//                $scope.$apply();
//            }
//        }, function (jqxhr, error) {
//        })
//    };
//
//    $scope.getDataFromJQuery = function (url, requestBody, callType, dataType, callback, errcallback) {
////        var usk;
////        usk = $scope.getCookie("usk");
////        if(usk!=null)
////        {
////            requestBody.usk = usk;
////        }
//
//
//        jQuery.support.cors = true;
//        $.ajax({
//            type:callType,
//            url:url,
//            data:requestBody,
//            crossDomain:true,
//            success:function (returnData, status, xhr) {
//                callback(returnData.response ? returnData.response : returnData);
//            },
//            error:function (jqXHR, exception) {
////                alert(JSON.stringify(jqXHR));
//                if (errcallback) {
//                    errcallback(jqXHR, exception);
//                } else {
//                    alert("exception in making [" + url + "] :[" + exception + "]");
//                }
//            },
//            timeout:1200000,
//            dataType:dataType,
//            async:true
//        });
//    }
//
//    $scope.getMoreUsers = function(max_rows,cursor){
//        if($scope.userLoading == true){
//            return
//        }
//        $scope.userLoading = true;
//
//        if($scope.cursor + 3 > $scope.maxRows){
//            var rows = $scope.cursor + 3 - $scope.maxRows;
//            $scope.cursor = "";
//        }
//        else{
//            var rows = 3;
//        }
//        var query = {};
//        query.table = "Profile__pajhwok";
//        var columnArray = ["_id","userid.username","userid.emailid","userid.status","roleid"];
//        query.max_rows = rows;
//        query.cursor = cursor;
//        query.columns = columnArray;
//        var queryParams = {query:JSON.stringify(query), "ask":"5301e64492f51ed71842a5d1", "osk":"530459b8aed74b22457bad37"};
//        var serviceURL = "/rest/data";
//        $scope.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (manageUserData) {
//            console.log(manageUserData);
//            $scope.userLoading = false;
//            for(var i=0;i<manageUserData.data.length;i++){
//                $scope.userList.push(manageUserData.data[i]);
//            }
//            $scope.cursor = manageUserData.cursor;
//            if (!$scope.$$phase) {
//                $scope.$apply();
//            }
//        }, function (jqxhr, error) {
//        })
//    };
//
//
//    $scope.save = function (data, ask, osk, callBack) {
//
//
//        var params = {"updates":JSON.stringify(data), "ask":ask,"osk":osk};
//
//        var that = this;
//
//        var url = "/rest/data";
//        console.log(url);
//        $scope.getDataFromJQuery(url, params, "GET", "JSON", function (callBackData) {
//
//
////            if (!$scope.$$phase) {
////                $scope.$apply();
////            }
//            callBack(callBackData);
//        });
//
//    } ;
//})


userapp.directive("addUser", [function ($scope) {
    return {
        restrict:"E",
        replace:true,
        template:'<div class="popup">'+
            '<h2>Add New User</h2>'+
            '<form method="">'+
                '<p>'+
                    '<input type="text" id="email" placeholder="enter users email" ng-model="addUser.userid.emailid">'+
                    '</p>'+
                    '<p>'+
                        '<input type="text" id="firstname" placeholder="enter full name" ng-model="adduser.userid.firstname">'+
                        '</p>'+
                        '<p>'+
                            '<input type="password" id="pass" placeholder="set password" ng-model="adduser.userid.password">'+
                            '</p>'+
                            '<p>'+
                                '<input type="password" id="pass" placeholder="confirm password" ng-model="adduser.userid.confirmpassword">'+
                                '</p>'+
                                '<p class="user-role">'+
                                    '<span><label>Select Role</label></span>'+
                                    '<span>'+
                                        '<select class="select-role" ng-options="o.name for o in roleOptions" ng-model="selectedRole" style="float: right;"></select>' +
                                    '</span>'+
                                '</p>'+
                                '<p>'+
                                    '<span><input type="button" value="Add User" class="register" ng-click="saveUser"></span>'+
                                        '<span class="login-link">	<a href="#login_form" id="login_pop" class="log-in">Cancel</a></span>'+
                                    '</p>'+
                                '</form>'+
                                '<a class="close" href="#close"></a>'+
                            '</div>'
                        ,
        compile:function () {
            return{
                pre:function ($scope) {


                },
                post : function($scope){


                }
            }
        }
    }
}]);


userapp.directive("changeUserStatus", [function ($scope) {
    return {
        restrict:"E",
        replace:true,
        template:'<div class="popup-manage">'+

                    '<h2 class="h2-popup">Change Role</h2>'+
                    '<form method="">'+
                        '<p>'+
                            '<span class="describe-name">'+
                                '<select class="change-role" ng-options="o.name for o in roleOptions" ng-model="selectedRole" style="float: right;"></select>' +
                            '</span>'+
                        '</p>'+
                    '<p class="role-change">'+
                    '<input type="button" value="Change" class="change-role-p" ng-click="saveManageUsers()">'+
                    '</form>'+
                    '<a class="close" ng-click="cancelChanges()">x</a>'+
                 '</div>',
        compile:function () {
            return{
                pre:function ($scope) {


                },
                post : function($scope){


                }
            }
        }
    }
}]);


userapp.directive("manageUser", [function ($scope) {
    return {
        restrict:"E",
        replace:true,
        template:'<div class="right-container">'+
            '<add-user ng-show="baddUser"></add-user>'+
            '<change-user-status ng-show="bChangeRole"></change-user-status>'+
                '<div class="manage-users-wrapper">'+
                    '<div class="info-data-wrapper">'+
                        '<div class="action-list">'+
                            '<div class="add-delete-user">'+
                                '<span class="change-role"><button class="user-btn" ng-click="fnAdduser()">Add New User</button></span>'+
                            '</div>'+


                        '</div><div class="user-title-bar">'+
                        '<ul class="table-headings">'+
                            '<li class="heading-element">'+
                                '<span><label>Name</label></span>'+
                                '<span><a class="upper-arrow" href="#">'+
                                    '<img src="images/w_arw_up.png"></a>'+
                                    '<a class="lower-arrow" href="#">'+
                                        '<img src="images/w_arw_dwn.png"></a>'+
                                    '</a>'+
                                '</span>'+
                                '</li>'+
                                '<li class="mail-element">'+
                                    '<span>'+
                                        '<label>Email</label></span>'+
                                    '<span>'+
                                        '<a class="upper-arrow" href="#">'+
                                            '<img src="images/w_arw_up.png"></a>'+
                                            '<a class="lower-arrow" href="#">'+
                                                '<img src="images/w_arw_dwn.png"></a>'+
                                            '</a>'+
                                        '</span>'+
                                    '</li>'+
                                    '<li class="heading-element">'+
                                        '<span><label>Role</label></span>'+
                                        '<span><a class="upper-arrow" href="#">'+
                                            '<img src="images/w_arw_up.png"></a>'+
                                            '<a class="lower-arrow" href="#">'+
                                                '<img src="images/w_arw_dwn.png"></a>'+
                                            '</a>'+
                                        '</span>'+
                                        '</li>'+
                                        '<li class="heading-element">'+
                                            '<span><label>Creted On</label></span>'+
                                            '<span><a class="upper-arrow" href="#">'+
                                                '<img src="images/w_arw_up.png"></a>'+
                                                '<a class="lower-arrow" href="#">'+
                                                    '<img src="images/w_arw_dwn.png"></a>'+
                                                '</a>'+
                                            '</span>'+
                                            '</li>'+
                                            '<li class="heading-element">'+
                                                '<span><label>Status</label></span>'+
                                                '<span><a class="upper-arrow" href="#">'+
                                                    '<img src="images/w_arw_up.png"></a>'+
                                                    '<a class="lower-arrow" href="#">'+
                                                        '<img src="images/w_arw_dwn.png"></a>'+
                                                    '</a>'+
                                                '</span>'+
                                                '</li></ul>'+
                                        '</div>'+
                                        '<div class="user-info-div">'+
                                            '<ul class="data-headings" ng-repeat="user in userList">' +
                                                '<li class="data-element"><label>{{user.userid.firstname}}</label></li>' +
                                                '<li class="email-element"><label>{{user.userid.emailid}}</label></li>' +
                                                '<li class="data-element"><label>{{user.roleid.name}}</label>'+
                                                '<button class="change-role-btn" ng-click="changeUserRole(user)">Change</button>'+
                                                '</li>' +
                                                '<li class="data-element"><label class="date-created">Oct 16, 2010</label></li>' +
                                                '<li class="data-element"><button class=" block-buttons" id="block-btn" ng-hide="user.userid.status" ng-click="changeStatus($index,user.userid._id)">Activate</button>'+
                                                '<button class="block-buttons" id="unblock-btn"  ng-show="user.userid.status" ng-click="changeStatus($index,user.userid._id)">Deactivate</button>' +
                                                '</li>' +
                                            '</ul>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
            "<div id='scrollDiv'></div>" +
                            '</div>',
        compile:function () {
            return{
                pre:function ($scope) {
                    $scope.getUsersList();
                    $scope.roleOption();

                },
                post : function($scope){
                    $(window).scroll(function() {
                        if($(window).scrollTop()+$(window).height() > $("#scrollDiv").offset().top){
                            if($scope.cursor != "" && $scope.cursor != undefined){
                                $scope.getMoreUsersList($scope.cursor);
                            }
                        }
                    });


                    $scope.fnAdduser = function(){
                        $scope.addUser = {"userid":{"firstname":"","username":"","emailid":""}, "roleid":{"name":""}};
                        $scope.baddUser = true;
                        $scope.selectedRole = $scope.roleOptions[0];
                    }

                    $scope.changeUserRole = function(user){
                        $scope.userData =  angular.copy(user);
                        $scope.selectedRole = $scope.userData.roleid
                        $scope.bChangeRole = true;
                    };

                    $scope.saveUser = function () {
                        if ($scope.addUser.emailid == "" || $scope.addUser.emailid == undefined) {
                            alert("please enter a valid email");
                            return false;
                        }
                        if ($scope.addUser.firstname == "" || $scope.addUser.firstname == null || $scope.addUser.firstname == undefined) {
                            alert("please enter fullname");
                            return false;
                        }
                        if (!$scope.addUser.password || $scope.addUser.password != $scope.addUser.confirmpassword) {
                            alert("password and confirm password not matched");
                            return false;
                        }
                        $scope.addUser.username = $scope.addUser.emailid;
                        var query = {};
                        query.table = "Profile__pajhwok";
                        query.operations = [
                            {"userid.firstname":$scope.addUser.firstname, "roleid":$scope.selectedRole, "userid.emailid":$scope.addUser.emailid,"userid.username":$scope.addUser.username,"userid.password":$scope.addUser.password}
                        ];
                        $scope.save(query, ASK, OSK, null, function (callBackData) {

                            if (!callBackData["insert"]) {
                                alert("user name already exists");

                            }
                            else {
                                $scope.userRegister = false;
                                $scope.addUser = {};
                                $scope.baddUser = false;
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                                alert("Please check your emailid and verify ");
                            }

                        });
                    }

                    $scope.changeStatus = function(index,id){
                        //$scope.userList[index].userid.status = !$scope.userList[index].userid.status;
//                        user.userid.status = !(user.userid.status);
                        $scope.userList[index].userid.status = !($scope.userList[index].userid.status);
                        var query = {};
                        query.table = "users__baas";
                        var columnArray = [{"_id":id,"status":$scope.userList[index].userid.status}]; //$scope.userList;
                        query.operations = columnArray;
                        $scope.save(query, "5301e64492f51ed71842a5d1", "530459b8aed74b22457bad37",function(dataUpdate){
                            if (dataUpdate.update && dataUpdate.update.length > 0) {
                                //console.log(JSON.stringify($scope.user_data));
//                                $scope.user_data.userid.picture = [];
//                                $scope.user_data.userid.picture[0] = data[0];
//                                $scope.fnSaveDetails();
                                alert("updated");
                            }
                            else if (dataUpdate.insert && dataUpdate.insert.length > 0) {
//                                $scope.user_data.userid.picture = [];
//                                $scope.user_data.userid.picture[0] = data[0];
//                                $scope.fnSaveDetails();
                                alert("inserted");
                            }
                            else
                                alert('User save failed');
                        });

                    };

                    $scope.cancelChanges = function(){
                        $scope.bChangeRole = false;
                        $scope.baddUser = false;
                    }

                    $scope.saveManageUsers = function(){
                        $scope.userData.roleid = $scope.selectedRole;
                        for(i=0;i<$scope.userList.length;i++ ){
                            if($scope.userList[i].userid.username == $scope.userData.userid.username){
                                $scope.userList[i].roleid = angular.copy($scope.userData.roleid);
                            }
                        }
                        var query = {};
                        query.table = "Profile__pajhwok";
                        var columnArray = $scope.userData;
                        query.operations = columnArray;
                        $scope.save(query, "5301e64492f51ed71842a5d1", "530459b8aed74b22457bad37",function(dataUpdate){
                            if (dataUpdate.update && dataUpdate.update.length > 0) {
                                //console.log(JSON.stringify($scope.user_data));
//                                $scope.user_data.userid.picture = [];
//                                $scope.user_data.userid.picture[0] = data[0];
//                                $scope.fnSaveDetails();
                                $scope.bChangeRole = false;
                                alert("updated");

                            }
                            else if (dataUpdate.insert && dataUpdate.insert.length > 0) {
//                                $scope.user_data.userid.picture = [];
//                                $scope.user_data.userid.picture[0] = data[0];
//                                $scope.fnSaveDetails();
                                $scope.bChangeRole = false;
                                alert("inserted");
                            }
                            else
                                alert('User save failed');
                        });

                    }

                    $scope.searchUsers = function(){
                        var text = $("#searchText").val();
                        $scope.getUsersList(text);
                    }

                }
            }
        }
    }
}]);


userapp.controller('userCtrl',function($scope){
    $scope.userData =  {};
    $scope.baddUser = false;
    $scope.roleOptions = [];
    $scope.selectedRole = {};
    $scope.cursor = "";
    $scope.loadingMedia = false;
    $scope.maxRows = null;
    $scope.rows = 3;
    $scope.getDataFromJQuery = function (url, requestBody, callType, dataType, callback, errcallback) {
        jQuery.support.cors = true;
        $.ajax({
            type:callType,
            url:url,
            data:requestBody,
            crossDomain:true,
            success:function (returnData, status, xhr) {
                callback(returnData.response ? returnData.response : returnData);
            },
            error:function (jqXHR, exception) {
//                alert(JSON.stringify(jqXHR));
                if (errcallback) {
                    errcallback(jqXHR, exception);
                } else {
                    alert("exception in making [" + url + "] :[" + exception + "]");
                }
            },
            timeout:1200000,
            dataType:dataType,
            async:true
        });
    }



    $scope.roleOption = function(){
        var query = {};
        query.table = "Role__pajhwok";
        var columnArray = ["_id","name"];
        query.columns = columnArray;
        var queryParams = {query:JSON.stringify(query), "ask":"5301e64492f51ed71842a5d1", "osk":"530459b8aed74b22457bad37"};
        var serviceURL = "/rest/data";
        $scope.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (roleOptData) {
            console.log(roleOptData);
            $scope.roleOptions = roleOptData.data;


            if (!$scope.$$phase) {
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
        var columnArray = ["_id","userid.username","userid.firstname","userid.emailid","userid.status","roleid"];
        query.max_rows = rows;
        query.cursor = cursor;
        query.columns = columnArray;
        var queryParams = {query:JSON.stringify(query), "ask":"5301e64492f51ed71842a5d1", "osk":"530459b8aed74b22457bad37"};
        var serviceURL = "/rest/data";
        $scope.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (manageUserData) {
            console.log(manageUserData);
            $scope.loadingMedia = false;
            for(var i=0;i<manageUserData.data.length;i++){
                $scope.userList.push(manageUserData.data[i]);
            }
            $scope.cursor = manageUserData.cursor;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
        })
    };
    $scope.getUsersList= function () {
        var query = {};
        query.table = "Profile__pajhwok";
        var columnArray = ["_id","userid.username","userid.firstname","userid.emailid","userid.status","roleid"];
//        if(seachUserModel)
//            query.filter={"$or":[{"userid.username":{"$regex":"("+seachUserModel+"\w*)", "$options":"-i"}},
//                {"userid.emailid":{"$regex":"("+seachUserModel+"\w*)", "$options":"-i"}}
//            ]} ;
        query.max_rows = 3;
        query.$count = 1;
        query.columns = columnArray;
        var queryParams = {query:JSON.stringify(query), "ask":"5301e64492f51ed71842a5d1", "osk":"530459b8aed74b22457bad37"};
        var serviceURL = "/rest/data";
        $scope.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (manageUserData) {
            console.log(manageUserData);
            $scope.userList = manageUserData.data;
            $scope.cursor = manageUserData.cursor;
            $scope.maxRows = manageUserData.$count;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
        })
    };

    $scope.save = function (data, ask, osk, callBack) {


        var params = {"updates":JSON.stringify(data), "ask":ask,"osk":osk};

        var that = this;

        var url = "/rest/data";
        console.log(url);
        $scope.getDataFromJQuery(url, params, "GET", "JSON", function (callBackData) {


//            if (!$scope.$$phase) {
//                $scope.$apply();
//            }
            callBack(callBackData);
        });

    } ;



});







































