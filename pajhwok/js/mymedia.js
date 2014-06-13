userapp.controller('myMediaCtrl',function($scope){

    $scope.cursor = "";
    $scope.loadingMedia = false;
    $scope.maxRows = null;
    $scope.rows = 3;
    $scope.getMyMedia = function () {
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
        var currentSession=$scope.getSession();
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK,"usk":currentSession["usk"]};
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
        var currentSession=$scope.getSession();
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK,"usk":currentSession["usk"]};
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