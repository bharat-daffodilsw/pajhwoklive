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
                        '<a class="" a="" href="#">'+
                            '<p class="popular-small-heading">{{media.title}}</p>'+
                        '</a>'+
                    '</h3>'+
                    '<div class="approve-video-meta">'+
                        '<p class="small-meta-info">'+
                            '<span class="deemphasized-text-name">{{userSelectedLanguage["data"]["by"]}}&nbsp;' +
                                '<a class="user-name ng-binding" href="#">{{media["__createdby"]["firstname"]}}</a></span>'+
                            '<span class="deemphasized-text ng-binding">{{media["__createdon"]}}</span>'+
                        '</p>'+
                        '<p class="approve-btn">'+
                            '<span>'+
                                '<button class="video-approve-btn" href="#" ng-click="updateStatus(media._id,\'publish\')">Approve</button><button class="video-approve-btn" href="#" ng-click = "updateStatus(media._id,\'rejected\')">Reject</button></span>'+

                        '</p>'+
                    '</div>'+

                '</div>' +
            '</div>' +
            '<div id="scrollDiv"></div>'+
            '</div>',


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
                    $scope.updateStatus = function(mediaid,result){
                        var query = {};
                        query.table = "News__pajhwok";
                        if(result == "publish"){
                            var columnArray = [{"_id":mediaid,"published":true}];
                        }
                        if(result == "rejected"){
                            var columnArray = [{"_id":mediaid,"rejected":true}];
                        }
                        query.operations = columnArray;

                        /*change for appstrap*/
                        $scope.save(query, ASK, OSK,null,function(dataUpdate){
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
    $scope.getUnpublishNews = function () {

        var query = {};
        query.table = "News__pajhwok";
        var columnArray = ["_id", "title", "media", "published", "category", "image", "__createdby.firstname", "activitycount", {"expression":"__createdon", "format":"fromnow"}];
        query.columns = columnArray;
        query.$count = 1;
        query.filter = {"published":{$ne:true},"rejected":{$ne:true}};
        query.max_rows = $scope.rows;
        var currentSession=$scope.getSession();
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK,"usk":currentSession["usk"]};
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
        var columnArray =  ["_id", "title", "media", "commentcount", "category", "image", "__createdby.firstname", "activitycount", {"expression":"__createdon", "format":"fromnow"}];
        query.filter = {"published":false};
        query.max_rows = rows;
        query.cursor = cursor;
        query.columns = columnArray;
        var currentSession=$scope.getSession();
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK,"usk":currentSession["usk"]};
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




})