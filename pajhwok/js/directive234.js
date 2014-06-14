pajhwokApp.directive('category', ["$compile", function ($compile, $scope) {
    return {
        restrict:"E",
        replace:true,
        template:"<div class='categories'>" +
            "<ul ng-show='\"5304a09a476f9b995eb672f1\"==selectedTrans' id='categories'>" +
            "<li ng-repeat= 'cat in category' id='accordion' ng-show='(showtilemenu && cat.tilemenu) || (!showtilemenu && !cat.tilemenu)'>" +
            "<h4>" +
            "<span ng-show='cat.display.image' class='cat-image'>" +
            "<img class='catimg' ng-src='{{cat.display.imgurl}}'></span>" +
            "<span class='category-text cursor-pointer' ng-class='{selected_category: cat._id == selectedCategoryid.parent}' ng-click='setCategory(cat);fnviewEmployerView($index,cat);loadingMessage=true'>{{cat.en_title}}</h4>" +
            '<ul class="sub-ul"  ng-show="cat.viewRolesList">' +
            '<li ng-repeat="child in cat.childs"> ' +
            '<span ng-show="child.display.image" class="subcat-image"><img class="catimg" ng-src="{{child.display.imgurl}}"></span>' +
            '<span ng-class="{selected_category: cat._id == selectedCategoryid.child}"  class="sub-category-text small-subcat" ng-click="setSubCategory(child)">{{child.en_title}} </span>' +
            '</li>' +
            '</ul>' +
            "</span>" +
            "</li>" +
            "</ul>" +
            "<ul ng-show='selectedTrans == \"5304a0ec476f9b995eb672f3\"' id='categories'>" +
            "<li ng-repeat= 'cat in category' ng-show='(showtilemenu && cat.tilemenu) || (!showtilemenu && !cat.tilemenu)'>" +
            "<h4><span ng-show='cat.display.image' class='cat-image'><img class='catimg' ng-src='{{cat.display.imgurl}}'></span><span class='category-text cursor-pointer'ng-class='{selected_category: cat._id == selectedCategoryid.parent}'  ng-click='setCategory(cat);fnviewEmployerView($index,cat);loadingMessage=true'>{{cat.dr_title}}" +
            "</span></h4>" +
            '<ul class="sub-ul"  ng-show="cat.viewRolesList">' +
            '<li ng-repeat="child in cat.childs"> ' +
            '<span ng-show="child.display.image" class="subcat-image"><img class="catimg" ng-src="{{child.display.imgurl}}"></span>' +
            '<span ng-class="{selected_category: cat._id == selectedCategoryid.child}" class="sub-category-text small-subcat" ng-click="setSubCategory(child)">{{child.dr_title}} </span>' +
            '</li>' +
            '</ul>' +
            "</li>" +
            "</ul>" +
            "<ul ng-show='selectedTrans == \"5304a0cb476f9b995eb672f2\"' id='categories'>" +
            "<li ng-repeat= 'cat in category' ng-show='(showtilemenu && cat.tilemenu) || (!showtilemenu && !cat.tilemenu)'>" +
            "<h4><span ng-show='cat.display.image' class='cat-image'><img class='catimg' ng-src='{{cat.display.imgurl}}'></span><span class='category-text cursor-pointer' ng-class='{selected_category: cat._id == selectedCategoryid.parent}' ng-click='setCategory(cat);fnviewEmployerView($index,cat);loadingMessage=true'>{{cat.ps_title}}</span></h4>" +
            '<ul class="sub-ul"  ng-show="cat.viewRolesList">' +
            '<li ng-repeat="child in cat.childs"> ' +
            '<span ng-show="child.display.image" class="subcat-image"><img class="catimg" ng-src="{{child.display.imgurl}}"></span>' +
            '<span ng-class="{selected_category: cat._id == selectedCategoryid.child}" class="sub-category-text small-subcat" ng-click="setSubCategory(child)">{{child.ps_title}} </span>' +
            '</li>' +
            '</ul>' +
            "</li>" +
            "</ul>" +
            "</div>",
        compile:function () {
            return{
                pre:function ($scope) {

                },
                post:function ($scope) {
                    $scope.fnviewEmployerView = function (index, user) {
                        if ($scope.temp == index) {
                            user.viewRolesList = !user.viewRolesList;
                            return;
                        }

                        for (var i = 0; i < $scope.category.length; i++) {
                            $scope.category[i].viewRolesList = false;
                        }

                        $scope.temp = index;

                        user.viewRolesList = (user.viewRolesList) ? !(user.viewRolesList) : true;
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    };
                }
            }
        }
    }
}]);
pajhwokApp.directive("manageFlagedNews", ['$appService', '$compile', function ($appService, $compile, $scope) {
    return {
        restrict:"E",
        replace:true,
        template:'<div ng-switch="flaggedNewsVisible"><alert-popup ng-show="alert.bShowAlertPopup"></alert-popup><p ng-switch-when="false" class="no-record">No Record Found</p><div ng-switch-when="true" ><div   ng-repeat="media in flaggedNews" class="approve-video-1">' +
            "<a href='#/news?newsid={{media._id}}'>" +
            '<div class="only-video">' +
            '<span class="recent-video-thumb">' +
            '<img ng-src="{{media.imgurl}}"></span>' +
            '</span>' +
            '</div>' +
            "</a>" +
            '<div class="recent-lockup-content">' +
            '<h3 class="recent-lockup-title">' +
            '<a class="" a="">' +
            '<p class="popular-small-heading">{{media.title}}</p>' +
            '</a>' +
            '</h3>' +
            '<div class="approve-video-meta">' +
            '<p class="small-meta-info">' +
            '<span class="deemphasized-text-name">{{userSelectedLanguage["data"]["by"]}}&nbsp;' +
            '<a class="user-name ng-binding" >{{media["__createdby"]["firstname"]}}</a></span>' +
            '<span class="deemphasized-text ng-binding">{{media["__createdon"]}}</span>' +
            '</p>' +
            '<p class="approve-btn">' +
            '<span>' +
            '<button class="video-approve-btn" ng-click="deleteFlaged(media._id,$index)">Delete</button>' +
            '<span class="deemphasized-text ng-binding">{{media["flaggedcount"]}}</span>' +

            '</p>' +
            '</div>' +

            '</div>' +
            '</div>' +
            '<div id="scrollDiv"></div>' +
            '</div></div>',
        compile:function () {
            return{
                pre:function ($scope) {
                    $scope.getFlaggedNews();

                },
                post:function ($scope) {
                    $(window).scroll(function () {
                        if ($("#scrollDiv").offset()) {
                            if ($(window).scrollTop() + $(window).height() > $("#scrollDiv").offset().top) {
                                if ($scope.cursor != "" && $scope.cursor != undefined) {
                                    $scope.getMoreFlaggedMedia($scope.cursor);
                                }
                            }
                        }
                    });

                    $scope.deleteFlaged = function (mediaid, index) {
                        $scope.flaggedNews.splice([index], 1);
                        var query = {};
                        query.table = "News__pajhwok";
                        var columnArray = [
                            {"_id":mediaid, "status":"decline"}
                        ];
                        query.operations = columnArray;
                        $appService.save(query, ASK, OSK, null, function (dataUpdate) {

                            if (dataUpdate.update && dataUpdate.update.length > 0) {
                                $scope.alert.alertPopupMsg = "Story delted.";
                                $scope.alert.bShowAlertPopup = true;
                            }
                            else if (dataUpdate.insert && dataUpdate.insert.length > 0) {
                                $scope.alert.alertPopupMsg = "Inserted.";
                                $scope.alert.bShowAlertPopup = true;
                            }
                            else
                                $scope.alert.alertPopupMsg = "User save fail.";
                            $scope.alert.bShowAlertPopup = true;
                        });

                    }

                    $scope.reject = function () {

                    }
                }
            }
        }
    }
}]);
pajhwokApp.directive('topHeader', [function ($compile, $scope) {
    return {
        restrict:"E",
        replace:true,
        template:'<div class="top-header"><alert-popup ng-show="alert.bShowAlertPopup"></alert-popup><span class="language-selector">' +
            '<button id="change{{$index}}"  ng-repeat="button in uploadSelectedLanguage"   ng-class="{active_language: button._id == selectedTrans}" class="language" ng-click="refreshPath(button._id,true)" type="button" role="button">' +
            '{{button.en_name}}</button></span><span class="search-news"><form class="search-box" ng-submit="searchData()" >' +
            '<span class="search-span"><input id="searchtextbox" ng-model="searchContent" class="placeholder" placeholder="{{userSelectedLanguage.data.searchfornews}}" type="text"></span>' +
            '<span class="search-btn-span"><button type="submit" class="search-btn-cover"><img  class="search-btn" src="images/search.png"></button></span>' +
            '</form></span><span ng-show="currentUser" class="welcome"><span class="welcome-p"><span class="name-label"><a style="color: #ffffff;">{{userSelectedLanguage.data.welcome}} &nbsp;&nbsp;{{currentUser["firstname"]}}</a> </span>' +
            '<span class="name-down-menu"><a><img src="images/w_arw_dwn.png"><manage-options></manage-options></a></span></span>' +
            '<button ng-click="logOut()"  class="signout">{{userSelectedLanguage["data"]["signout"]}}</button></span></div>',
        compile:function () {
            return{
                pre:function ($scope) {
                    $scope.searchData = function () {

                        var path = window.location.hash;
                        var condition = path.indexOf('#/map') >= 0 ? true : false;
                        var condition2 = path.indexOf('#/manageallnews') >= 0 ? true : false;
                        if (condition) {
                            window.location.href = '#/map/category/' + $scope.selectedCategoryid["parent"] + "/subcategory/" + ( $scope.selectedCategoryid["child"] ? $scope.selectedCategoryid["child"] : "all" ) + '/language/' + $scope.selectedTrans + '/search?q=' + $scope.searchContent;
                        }
                        else if (condition2) {
                            window.location.href = '#/manageallnews?q=' + $scope.searchContent;
                        }
                        else {
                            window.location.href = "#/search/category/" + ($scope.selectedCategoryid && $scope.selectedCategoryid.parent ? $scope.selectedCategoryid["parent"] : "all") + "/subcategory/" + ($scope.selectedCategoryid["child"] ? $scope.selectedCategoryid["child"] : "all") + "/state/" + $scope.defaultSelected.selectedState._id + "/language/" + $scope.selectedTrans + "/searchcontent?q=" + $scope.searchContent;
                        }


                    }
                    $scope.showRegister = function () {
                        $scope.userRegister = true;
                        $scope.userLogin = false;
                    }
                    $scope.showLoginPopup = function () {
                        $scope.userLogin = true;
                        $scope.userRegister = false;
                        $scope.username = "";
                        $scope.password = "";
                    }
                }
            }
        }


    }
}]);
pajhwokApp.directive('banner', [function ($compile, $scope) {
    return {
        restrict:"E",
        replace:true,
        template:"<div class='banner'><img ng-show='\"5304a09a476f9b995eb672f1\"==selectedTrans' src='images/eng1.png'>" +
            "<img ng-show='selectedTrans == \"5304a0cb476f9b995eb672f2\"'  src='images/pashto1.png'>" +
            "<img ng-show='selectedTrans == \"5304a0ec476f9b995eb672f3\"'  src='images/dari1.png'></div>"

    }
}]);
pajhwokApp.directive('state', [function ($scope) {
    return {
        restrict:"E",
        replace:true,
        template:"<span><select ng-class={mapview:mapData.state} class='select-city' ng-options='o.name for o in states' ng-show='\"5304a09a476f9b995eb672f1\"==selectedTrans' ng-change='setState()' ng-model='defaultSelected.selectedState'></select>" +
            "<select ng-class={mapview:mapData.state} class='select-city' ng-options='o.dr_name for o in states' ng-show='selectedTrans == \"5304a0ec476f9b995eb672f3\"' ng-change='setState()' ng-model='defaultSelected.selectedState'></select>" +
            "<select  ng-class={mapview:mapData.state} class='select-city' ng-options='o.ps_name for o in states' ng-show='selectedTrans == \"5304a0cb476f9b995eb672f2\"' ng-change='setState()' ng-model='defaultSelected.selectedState'></select></span>"
    }
}]);
pajhwokApp.directive('cityUpload', [function ($scope) {
    return {
        restrict:"E",
        replace:true,
        template:"<span><select class='select upload-city' ng-options='o.en_fullname for o in uploadCities' ng-show='\"5304a09a476f9b995eb672f1\"==uploadSelectedTrans'ng-model='newPostCity'></select>" +
            "<select class='select upload-city' ng-options='o.dr_fullname for o in uploadCities' ng-show='uploadSelectedTrans == \"5304a0ec476f9b995eb672f3\"' ng-model='newPostCity'></select>" +
            "<select class='select upload-city' ng-options='o.ps_fullname for o in uploadCities' ng-show='uploadSelectedTrans == \"5304a0cb476f9b995eb672f2\"' ng-model='newPostCity'></select></span>"
    }
}]);
pajhwokApp.directive('cityEditUpload', [function ($scope) {
    return {
        restrict:"E",
        replace:true,
        template:"<span><select class='select upload-city' ng-show='\"5304a09a476f9b995eb672f1\"==uploadSelectedTrans' data-ng-model='newsData.editCity'><option ng-repeat='uploadcity in uploadCities' value='{{uploadcity._id}}' ng-selected='newsData.editCity == uploadcity._id'>{{uploadcity.en_fullname}}</option></select>" +
            "<select class='select upload-city' ng-show='uploadSelectedTrans == \"5304a0ec476f9b995eb672f3\"' data-ng-model='newsData.editCity'><option ng-repeat='uploadcity in uploadCities' value='{{uploadcity._id}}' ng-selected='newsData.editCity == uploadcity._id'>{{uploadcity.dr_fullname}}</option></select>" +
            "<select class='select upload-city' ng-show='uploadSelectedTrans == \"5304a0cb476f9b995eb672f2\"' data-ng-model='newsData.editCity'><option ng-repeat='uploadcity in uploadCities' value='{{uploadcity._id}}' ng-selected='newsData.editCity == uploadcity._id'>{{uploadcity.ps_fullname}}</option></select></span>"
    }
}]);
pajhwokApp.directive('categoryList', [function ($scope) {
    return {
        restrict:"E",
        replace:true,
        template:"<span><select class='select' ng-show='uploadSelectedTrans == \"5304a09a476f9b995eb672f1\"' ng-model='selectcategory' ng-change='showSubCategory(selectcategory)'><option value=''>Select Category</option><option ng-repeat='cat in categorylist' value='{{cat._id}}'>{{cat.en_title}}</option></select>" +
            "<select class='select' ng-show='uploadSelectedTrans == \"5304a0ec476f9b995eb672f3\"'  ng-model='selectcategory'  ng-change='showSubCategory(selectcategory)'><option value=''>Dr Select Category</option><option ng-repeat='cat in categorylist' value='{{cat._id}}'>{{cat.dr_title}}</option></select>" +
            "<select class='select' ng-show='uploadSelectedTrans == \"5304a0cb476f9b995eb672f2\"'  ng-model='selectcategory'  ng-change='showSubCategory(selectcategory)'><option value=''>Ps Select Category</option><option ng-repeat='cat in categorylist' value='{{cat._id}}'>{{cat.ps_title}}</option></select></span>"

    }
}]);
pajhwokApp.directive('subCategoryList', [function ($scope) {
    return {
        restrict:"E",
        replace:true,
        template:"<span><select class='select' ng-show='uploadSelectedTrans == \"5304a09a476f9b995eb672f1\"' ng-model='newPost.subcategory'  ng-options='o.en_title for o in subCategory'><option value=''>Select Sub Category</option></select>" +
            "<select class='select' ng-options='o.dr_title for o in subCategory' ng-show='uploadSelectedTrans == \"5304a0ec476f9b995eb672f3\"'  ng-model='newPost.subcategory'><option value=''>Dr Select Sub Category</option></select>" +
            "<select class='select' ng-options='o.ps_title for o in subCategory' ng-show='uploadSelectedTrans == \"5304a0cb476f9b995eb672f2\"'  ng-model='newPost.subcategory'><option value=''>Ps Select Sub Category</option></select></span>"

    }
}]);
pajhwokApp.directive('subCategoryEditList', [function ($scope) {
    return {
        restrict:"E",
        replace:true,
        template:"<span><select class='select' ng-show='uploadSelectedTrans == \"5304a09a476f9b995eb672f1\"' ng-model='newsData.editsubcategory' ><option ng-repeat='subcat in subCategory' value='{{subcat._id}}' ng-selected='newsData.editsubcategory == subcat._id'>{{subcat.en_title}}</option></select>" +
            "<select class='select' ng-show='uploadSelectedTrans == \"5304a0ec476f9b995eb672f3\"'  ng-model='newsData.editsubcategory'><option ng-repeat='subcat in subCategory' value='{{subcat._id}}' ng-selected='newsData.editsubcategory == subcat._id'>{{subcat.dr_title}}</option></select>" +
            "<select class='select' ng-show='uploadSelectedTrans == \"5304a0cb476f9b995eb672f2\"'  ng-model='newsData.editsubcategory'><option ng-repeat='subcat in subCategory' value='{{subcat._id}}' ng-selected='newsData.editsubcategory == subcat._id'>{{subcat.ps_title}}</option></select></span>"

    }
}]);
pajhwokApp.directive('languageList', [function ($scope) {
    return {
        restrict:"E",
        replace:true,
        template:"<span><select class='select' ng-change='setUploadLanguage(newPostTrans._id)' ng-options='o.en_name for o in uploadSelectedLanguage' ng-model='newPostTrans' ></select>" +
            "</span>"
    }
}]);

pajhwokApp.directive('manageOptions', ["$compile", function ($compile, $scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<ul class="down-menu-list"><li class="down-menu-item"  ng-show="manage.opt"><a>{{userSelectedLanguage["data"]["manage"]}}</a></li>' +
            '<li ng-click="setManageOpt(\'manageuser\')" ng-show="manage.user" class="down-menu-items"><a>{{userSelectedLanguage["data"]["manageusers"]}}</a></li>' +
            '<li ng-click="setManageOpt(\'manageflaggednews\')" class="down-menu-items" ng-show="manage.opt"><a >{{userSelectedLanguage["data"]["manageflag"]}}</a></li>' +
            '<li  ng-click="setManageOpt(\'manageunpublishnews\')" class="down-menu-items" ng-show="manage.opt"><a >{{userSelectedLanguage["data"]["publishstories"]}}</a></li>' +
            '<li  ng-click="setManageOpt(\'manageallnews\')" class="down-menu-items" ng-show="manage.user"><a >{{userSelectedLanguage["data"]["allstories"]}}</a></li>' +
            '<li  ng-show="manage.mymedia"  class="down-menu-item"><a>{{userSelectedLanguage["data"]["myuploads"]}}</a></li>' +
            '<li ng-click="setManageOpt(\'mymedia\')" ng-show="manage.mymedia" class="down-menu-items"><a>{{userSelectedLanguage["data"]["published"]}}</a></li>' +
            '<li ng-click="setManageOpt(\'myunpublishmedia\')" ng-show="manage.mymedia" class="down-menu-items"><a >{{userSelectedLanguage["data"]["unpublished"]}}</a></li></ul>',
        compile:function () {
            return{
                pre:function ($scope) {
                    $scope.setManageOpt = function (path) {
                        window.location.href = "#/" + path;
                    }
                }
            }
        }

    }
}]);
pajhwokApp.directive('navBar', ["$compile", function ($compile, $scope) {
    return {
        restrict:"E",
        replace:true,
        template:"<div class='nav'><span class='cities'><state></state></span>" +
            "<span class='left-nav'><ul class='menu'>" +
            "<li class='selected-nav nav-menu' ng-click='menuClick()'><a class='menu-item selected-nav-anchor' >{{userSelectedLanguage['data']['home']}}</a></li>" +
            "<li id='menu1' class='nav-menu'  ng-click='menuClick(\"aboutus\")'><a  class='menu-item ' >{{userSelectedLanguage['data']['aboutus']}}</a></li>" +
            "<li id='menu2' class='nav-menu' ng-click='menuClick(\"contactus\")'><a class='menu-item ' >{{userSelectedLanguage['data']['contactus']}}</a></li>" +
            "<li id='menu3' class='nav-menu' ng-click='menuClick(\"whatisfraud\")'><a class='menu-item' >{{userSelectedLanguage['data']['whatisfraud']}}</a></li>" +
            "<li id='menu4' class='nav-menu' ng-click='menuClick(\"howtoreport\")'><a class='menu-item' >{{userSelectedLanguage['data']['howtoreport']}}</a></li>" +
            "<li id='menu5' class='nav-menu' ng-click='menuClick(\"guidelines\")'><a class='menu-item' >{{userSelectedLanguage['data']['guidelineforcitizen']}}</a></li>" +
            "</ul></span>" +
            "<span class='upload-content'><button class='upload' ng-click='clearContent();uploadNews = !uploadNews'>{{userSelectedLanguage['data']['uploadnews']}}</button></span>" +
            "<span class='right-nav'><ul class='view-bar'><li class='map-view view'><a ng-click='setTileView()'><img title='News Wall' src='images/1.png '></a></li>" +
            "<li ng-click='setMapPath()' class='map-view view'><a><img  title='News Map' src='images/3.png '></a></li></ul></span></div>",
        compile:function () {
            return{
                pre:function ($scope) {
                    $scope.menuClick = function (path) {
                        $scope.uploadNews = false;
                        if (!path) {
                            window.location.href = '/';
                        } else {
                            window.location.href = '#/' + path;
                        }
                        $scope.twitterTile = true;

                    }
                    $scope.setTileView = function () {

                        $scope.twitterTile = true;
                        $scope.mapData.state = false;
                        window.location.href = '#/';

                    }
                    $scope.setMapPath = function () {
//                        window.location.href = '#/map/category/' + $scope.selectedCategoryid + '/language/' + $scope.selectedTrans + '/search?q=' + null;
//                        window.location.href = '#/map/language/' + $scope.selectedTrans + '/search?q=' + $scope.searchContent;
                        window.location.href = '#/map/category/' + $scope.selectedCategoryid["parent"] + "/subcategory/" + ( $scope.selectedCategoryid["child"] ? $scope.selectedCategoryid["child"] : "all" ) + '/language/' + $scope.selectedTrans + '/search?q=' + $scope.searchContent;
                    }
                    $scope.getrole = function () {
                        var c_user = $scope.getSession();
                        if (c_user && c_user["roleid"] != GENERAL) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    $scope.getrolemanage = function () {
                        var c_user = $scope.getSession();
                        console.log(c_user)
                        if (c_user) {
                            return true;
                        }
                        else {
                            return false;
                        }

                    }
                }
            }
        }

    }
}]);
pajhwokApp.directive('newsUpload', ['$appService', '$compile', function ($appService, $compile, $scope) {
    return {
        restrict:"E",
        replace:true,
        template:'<div class="upload-section"><alert-popup ng-show="alert.bShowAlertPopup"></alert-popup><div class="upload-inner"><form>' +
            '<p class="upload-div"><language-list></language-list><city-upload></city-upload>' +
            '<category-list ng-show="c_category"></category-list><sub-category-list ng-show="c_category"></sub-category-list></p>' +
            '<p class="upload-div">' +
            '<input class="upload-text" type="text" ng-model="title" placeholder="{{userSelectedLanguage[\'data\'][\'entertitlehere\']}}"><app-file-upload></app-file-upload>' +
            '<textarea ng-model="newPost.descriptiontemp" class="upload-text" placeholder="{{userSelectedLanguage[\'data\'][\'writedeschere\']}}"></textarea>' +
            '<input class="upload-text" type="text" ng-model="name" placeholder="{{userSelectedLanguage[\'data\'][\'enteryournamehere\']}}" ng-show="loggedout">' +
            '<input class="upload-text" type="text" ng-model="email" placeholder="{{userSelectedLanguage[\'data\'][\'enteryouremailhere\']}}" ng-show="loggedout">' +
            '<input class="upload-text" type="text" ng-model="phone" placeholder="{{userSelectedLanguage[\'data\'][\'enteryourphonehere\']}}" ng-show="loggedout">' +
            '<span ng-show="uploading">Uploading...<img src="images/loading.gif"></span></p>' +
            '<p class="cancel-upload"><button value="" class="upload-btn" ng-click="saveFile()">{{userSelectedLanguage.data.upload}}</button>' +
            '<button value="" class="upload-btn" ng-click="clearContent();uploadNews=false">{{userSelectedLanguage.data.cancel}}</button>' +
            '</p></form></div></div>',
        compile:function () {
            return{
                pre:function ($scope) {
                    $scope.title = "";
                    $scope.CSession = $scope.getSession();
                    $scope.loggedout = ($scope.CSession) ? false : true;
                    $scope.c_category = ($scope.CSession && ($scope.CSession["roleid"] == ADMIN || $scope.CSession["roleid"] == EDITOR)) ? true : false;
                    $scope.saveFile = function () {
                        $scope.CSession = $scope.getSession();
                        var query = {};
                        if (!$scope.CSession) {
                            if (!$scope.name) {
                                $scope.alert.bShowAlertPopup = true;
                                $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.msg_upload_1;
                                return false;
                            }
                            var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                            if (regEmail.test($scope.email) == false) {
                                $scope.alert.bShowAlertPopup = true;
                                $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.msg_register_1;
                                return  false;
                            }
                            else {

                                $scope.newPost["guest"] = {"name":$scope.name, "email":$scope.email, "phone":$scope.phone};
                            }
                        }
                        if ($scope.title.length < 5) {
                            $scope.alert.bShowAlertPopup = true;
                            $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.msg_upload_2;
                            return false;
                        }
                        if ($scope.newPostCity._id == null) {
                            $scope.alert.bShowAlertPopup = true;
                            $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.msg_upload_3;
                            return false;
                        }
                        if ($scope.c_category && !$scope.selectcategory) {
                            $scope.alert.bShowAlertPopup = true;
                            $scope.alertPopupMsg = "Please select category.";
                            return false;
                        } else if ($scope.c_category && $scope.selectcategory) {
                            $scope.newPost["category"] = {"_id":$scope.selectcategory};
                        }
                        if ($scope.subcategorytemp) {
                            $scope.newPost["subcategory"] = {"_id":$scope.subcategorytemp};
                        }
                        if (!$scope.newPostTrans) {
                            $scope.alert.bShowAlertPopup = true;
                            $scope.alert.alertPopupMsg = "Please select language .";
                            return false;
                        }
                        $scope.uploading = true;
                        var current_file = {};
                        current_file.name = $scope.oFile.name;
                        current_file.type = $scope.oFile.type;
                        current_file.contents = $scope.oFile.data;
                        current_file.ask = ASK;
                        current_file.osk = OSK;
                        $scope.oFile = {};
                        $scope.loadingStatus = true;
                        query.table = "News__pajhwok";

                        if ($scope.CSession && $scope.CSession["roleid"] != GENERAL) {
                            $scope.newPost["status"] = "approved";
                        } else {
                            $scope.newPost["status"] = "new";
                        }
                        if ($scope.newPostTrans._id == ENGLISH_LANGUAGE) {
                            $scope.newPost["description"] = ($scope.newPost["descriptiontemp"]) ? encodeURIComponent($scope.newPost["descriptiontemp"]) : "";
                        } else {
                            $scope.newPost["description"] = ($scope.newPost["descriptiontemp"]) ? $scope.newPost["descriptiontemp"] : "";
                        }
                        $scope.newPost["title"] = $scope.title;
                        $scope.newPost["cityid"] = {"name":$scope.newPostCity.name, "_id":$scope.newPostCity._id};
// $scope.newPost["location"] = $scope.newPostCity.location;
                        $scope.newPost["transid"] = {"_id":$scope.newPostTrans._id};
                        if (document.getElementById('uploadfile').files.length === 0) {
// $scope.newPost["media"] = [{"key":$scope.defaultMediaVal.defaultmedia, "name":"no_image.jpg"}];
                            delete $scope.newPost["media"];
                            query.operations = [$scope.newPost];
                            $scope.saveFunction(query);
                        } else {
                            $appService.getDataFromJQuery(BAAS_SERVER + '/file/upload', current_file, "POST", "JSON", function (data) {
                                $scope.uploading = false;
                                if (data.response && data.response.length) {
                                    var file_ext = $scope.getFileExtension(data.response[0].name);
                                    if ((/\.(gif|jpg|jpeg|tiff|png|bmp|flv|mov|mp4|m4v|f4v|aac|f4a|oga)$/gi).test(data.response[0].name)) {
                                        $scope.newPost["media"] = data.response;
                                    } else if ((/\.(mp3|m4a|ogg)$/gi).test(data.response[0].name)) {
                                        $scope.newPost["media"] = data.response;
//$scope.newPost["media"].capturedimagekey = $scope.defaultMediaVal.audiologo;
                                    } else {

                                        $scope.uploading = false;
                                        $scope.alert.bShowAlertPopup = true;
                                        $scope.alert.alertPopupMsg = "Please upload only media file";
                                        return false;
                                    }
                                    query.operations = [$scope.newPost];
                                    $scope.saveFunction(query);
                                }
                                else {
                                    $scope.uploading = false;
                                    $scope.alert.bShowAlertPopup = true;
                                    $scope.alert.alertPopupMsg = "Some error has been occurred.";

                                }
                            }, function (callbackerror) {
                                $scope.uploading = false;
                                $scope.alert.bShowAlertPopup = true;
                                $scope.alert.alertPopupMsg = "Some error has been occurred.";

                            });
                        }
                    };
                    $scope.saveFunction = function (query) {
                        $scope.uploading = true;
                        if (!$scope.CSession) {
                            $scope.CSession = {};
                            $scope.CSession["usk"] = null;
                        }
                        $appService.save(query, ASK, OSK, $scope.CSession["usk"], function (callBackData) {
                            $scope.uploading = false;
                            $scope.alert.bShowAlertPopup = true;
                            if (callBackData.response.insert) {
                                if ($scope.currentUser && $scope.currentUser["roleid"] == GENERAL) {
                                    $scope.alert.alertPopupMsg = "Please wait while your news is approved for publishing. You can check the same in My Uploads.";
                                }
                                else if (callBackData.response.insert[0].status == "new") {
                                    $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.msg_upload_4;
                                } else {
                                    $scope.alert.alertPopupMsg = "Successfully uploaded.";
                                }
                                $scope.clearContent();

                            }
                            else {
                                $scope.uploading = false;
                                $scope.alert.bShowAlertPopup = true;
                                $scope.alert.alertPopupMsg = "Some error has been occurred.";


                            }
                        }, function (err) {
                            $scope.uploading = false;
                            console.log(err.stack);
                            $scope.alert.bShowAlertPopup = true;
                            $scope.alert.alertPopupMsg = "Some error has been occurred.";


                        });
                    }
                },
                post:function ($scope) {
                }
            }
        }


    }
}]);
pajhwokApp.directive('appFileUpload', ['$appService', '$compile', function ($appService, $compile) {
    return {
        restrict:"E",
        replace:true,
//        scope:true,
        template:"<div class='choose-file'><p>Add <img src='/images/add_img.png'> / <img src='/images/add_video.png'></p><p>" +
            "<input type='file' id='uploadfile' style=' float: left;width: 206px;'>" +
            "<img id='img_thumbnail' ng-show='showimage' ng-src='{{imageData}}' class='thumbnail' style='float: left;height: 190px;width: 270px'>" +
            "<div ng-show='videoAudio' style='float: left;height: 190px;width: 270px'>" +
            "<div id='ova-jwplayer-container-upload'></div></div>" +
            "</p></div>",
        compile:function () {
            return {
                post:function ($scope, iElement) {
                    $scope.loadFile = function (evt) {
                        file = {};
                        file.name = $scope.oFile.name;
                        file.result = evt.target.result;
                        $scope.oFile['data'] = evt.target.result;
                        $scope.showUploadedFile(file);
                    };
                    $scope.showUploadedFile = function (file) {

                        var file_ext = $scope.getFileExtension(file.name);
                        if ((/\.(gif|jpg|jpeg|tiff|png|bmp)$/gi).test(file.name)) {
//                            $scope.showimage = true;
//                            $scope.videoAudio = false;
//                            $scope.imageData = file.result;
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }

                        }
                        else if ((/\.(flv|mov|mp4|m4v|f4v|aac|m4a|f4a|mp3|ogg|oga)$/gi).test(file.name)) {
//                            $scope.showimage = false;
//                            $scope.videoAudio = true;
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                            document.getElementById('ova-jwplayer-container-upload').innerHTML = "";
//                            jwplayer('ova-jwplayer-container-upload').setup({
//                                file:file.result,
//                                width:270,
//                                height:190,
//                                type:file_ext
//                            });
                        }
                    }
                    iElement.bind('change', function () {
                        $scope.$apply(function () {
                            $scope.oFReader = new FileReader();
                            if (document.getElementById('uploadfile').files.length === 0) {
                                return;
                            }
                            $scope.oFile = document.getElementById('uploadfile').files[0];
                            $scope.oFReader.onload = $scope.loadFile;
                            $scope.oFReader.readAsDataURL($scope.oFile);
                        });
                    });
                }
            }
        }
    }
}]);

pajhwokApp.directive('appliedFilter', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        template:"<div style='display: inline'><span>Applied Filter:</span>" +
            "<span ng-show='labelDetail.visibleCategoryFilter'>{{labelDetail.categoryName}}<span class='cursor-pointer' ng-click='setCategory(null);removeSelectedClass()'>&nbsp;&nbsp;X</span></span>" +
            "</div>"

    }
}]);
pajhwokApp.directive('footer', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<div class="Footer"><div class="social-networks"><ul>' +
            '<li><a id="facebook" title=""></a></li>' +
            '<li><a id="linkedin" title=""></a></li>' +
            '<li><a id="twitter" title=""></a></li></ul></div><div class="copyright"><span>	Content Copyrights 2014 pajhwok.com </span>' +
            '</div></div>'
    }
}]);
pajhwokApp.directive('login', ['$appService', '$compile', function ($appService, $compile, $scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<div  ng-show="loginDetail.login"><alert-popup ng-show="alert.bShowAlertPopup"></alert-popup><a class="overlay" id="login_form"></a><div class="popup">' +
            '<h2>{{userSelectedLanguage.data.welcomeguest}}!</h2> <form ng-submit="login()"><p><input ng-model="username"  type="email" id="login" placeholder="{{userSelectedLanguage.data.enteryouremail}}"></p>' +
            '<p><input type="password" id="password" ng-model="password" placeholder="{{userSelectedLanguage.data.enteryourpassword}}"></p><p>' +
            '<input  type="submit" value="{{userSelectedLanguage.data.log_in}}" class="log-in-only"></form><a ng-show="false" ng-click="showForgot=false"class="forgot-pass">{{userSelectedLanguage.data.forgotpassword}}</a>' +
            '</p><p ng-show="false"><input type="text" ng-model="forgetUserName" placeholder="{userSelectedLanguage.data.enteryouremail}}">' +
            '<input ng-click="submit()" type="button" value="{{userSelectedLanguage.data.submit}}" class="log-in-only"></p><a ng-click="closePopup()" class="close">X</a></div></div>',
        compile:function () {
            return{
                pre:function ($scope) {
                    $scope.username = "";
                    $scope.password = "";
                    $scope.forgetUserName = "";
                    $scope.closePopup = function () {
                        $scope.loginDetail.login = false;
                        $scope.loginDetail.register = false;
                        $scope.username = "";
                        $scope.password = "";
                    }

                }, post:function ($scope) {
                    $scope.login = function () {
                        var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                        var email = $('#login').val();
                        var pass = $('#password').val();
                        if (regEmail.test(email) == false) {
                            $scope.alert.bShowAlertPopup = true;
                            $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.enteryouremail;
                            return false;

                        }
                        else {
                            $scope.username = email;
                        }
                        if (!pass) {
                            $scope.alert.bShowAlertPopup = true;
                            $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.msg_login_4;
                            return false;
                        }
                        else {
                            $scope.password = pass;
                        }
                        var params = {};
                        params.username = $scope.username;
                        params.password = $scope.password;
                        params.ask = ASK;
                        params.osk = OSK;
                        $appService.getDataFromJQuery(BAAS_SERVER + "/login", params, "GET", "JSON", function (callBackData) {
                            $scope.loginUserData = callBackData.response;
                            if (callBackData.code == 35 && callBackData.status == "error") {
                                $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.msg_login_2;
                                $scope.alert.bShowAlertPopup = true;
                                return false;
                            }

                            else if (callBackData.code == 3 && callBackData.status == "error") {
                                $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.msg_login_1;
                                $scope.alert.bShowAlertPopup = true;
                                return false;
                            }
                            if (callBackData.response && callBackData.response.status == false) {
                                $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.msg_login_3;
                                $scope.alert.bShowAlertPopup = true;
                                return false;

                            }

                            else {
                                $scope.showloginout = false;
                                var usk = $scope.loginUserData.usk;
                                if (usk) {
                                    var query = {"table":"Profile__pajhwok"};
                                    query.columns = ["roleid", "userid"];
                                    query.filter = {"userid":"{_CurrentUserId}"};
                                    var params = {"query":JSON.stringify(query), "ask":ASK, "osk":OSK, "usk":usk};
                                    $appService.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
                                        $scope.c_category = true;
                                        $scope.loggedout = false;
                                        var roleid = callBackData.response.data[0].roleid._id;
                                        var cUserid = callBackData.response.data[0].userid._id;
                                        var firstname = $scope.loginUserData.firstname;
                                        var c_name = "usk";
                                        document.cookie = c_name + "=" + escape(usk);
                                        var c_name = "roleid";
                                        document.cookie = c_name + "=" + escape(roleid);
                                        var c_name = "firstname";
                                        document.cookie = c_name + "=" + escape(firstname);
                                        var c_name = "cuserid";
                                        document.cookie = c_name + "=" + escape(cUserid);
                                        $scope.currentUser = $scope.getSession();
                                        $scope.loginDetail.login = false;
                                        $scope.loginDetail.register = false;
                                        $scope.username = "";
                                        $scope.password = "";
                                        if (!$scope.$$phase) {
                                            $scope.$apply();
                                        }
                                    }, function (err) {

                                    });
                                }
                            }
                            $scope.getSession();
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        }, function (jqxhr, error) {
                            if (jqxhr.status == 417) {
                                $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.msg_login_1;
                                $scope.alert.bShowAlertPopup = true;
                            }
                            else
                                alert(jqxhr.responseText);
                        });
                    }
                    $scope.submit = function () {
                        if ($scope.forgetUserName == "" || $scope.forgetUserName == undefined) {
                            alert("please enter user name first");
                            return false;
                        }
                        var params = {};
                        params.username = $scope.forgetUserName;
                        params.ask = ASK;
                        params.osk = OSK;
                        $appService.getDataFromJQuery(BAAS_SERVER + "/forgotpassword", params, "GET", "JSON", function (callBackData) {
                            $scope.alert.bShowAlertPopup = true;

                        }, function (jqxhr, error) {
                            $scope.bShowAlertPopup = true;
                        });
                    }

                }

            }
        }
    }
}]);
//pajhwokApp.directive('sideBar', [function ($scope) {
//    return{
//        restrict:"E",
//        replace:true,
//        template:"<div class='small-videos'><ul id='small-videos'><li class='top-small-1' ng-repeat='record in topStoriesDetail' ng-click='setTopNews(record);updateViewCount(record)' >" +
//            "<div class='small-video-only'><span class='video-thumb'><img id='small-img' alt='Thumbnail' ng-src='{{record.imgurl}}'></span></div>" +
//            "<div class='small-lockup-content'><h3 class='small-lockup-title'><p class='small-heading' >{{record.title}}</p></h3>" +
//            "<div class='small-video-meta'><p class='small-meta-info'><span  class='deemphasized-text-name1'>{{userSelectedLanguage['data']['by']}}<a class='user-name'>&nbsp;{{record['__createdby']['firstname']}}</a></span>" +
//            "<span class='deemphasized-text'>{{record['__createdon']}}</span><p class='small-comment'>" +
//            "<span class='small-comments-1' ><a class='video-comments' >{{record['commentcount']}}&nbsp;{{userSelectedLanguage['data']['comments']}}</a></span>" +
//            "<span class='video-views'>{{record['clickcount']}}&nbsp;{{userSelectedLanguage['data']['views']}}</span></p></p></div></div></li></ul></div>",
//        compile:function () {
//            return{
//                pre:function () {
//
//                },
//                post:function ($scope) {
//
//                }
//            }
//        }
//    }
//}]);
//pajhwokApp.directive('searchResult', [function ($scope) {
//    return{
//        restrict:"E",
//        replace:true,
//        template:"<div ng-show='searchView' class='most-popular' ng-switch='searchedNewsVisible'><div  class='heading'><p ng-show='loadingMessage'>{{userSelectedLanguage.data.loading}}</p>" +
//            "<applied-filter></applied-filter></div><p ng-switch-when='false' class='no-record'>{{userSelectedLanguage.data.norecordfound}}</p><div ng-switch-when='true' class='popular-videos'>" +
//            "<div ng-repeat='search in searchedNews ' class='popular-video-1'><a ng-click='setCountAndPath(search)'><div class='only-video'><span class='popular-video-thumb'><img ng-src='{{search.imgurl}}'></span></div>" +
//            "<div class='popular-lockup-content'><h3 class='popular-lockup-title'><p class='popular-small-heading'>{{search.title}}</p></h3></a>" +
//            "<div class='popular-video-meta'><p class='small-meta-info'><span class='deemphasized-text-name1'>{{userSelectedLanguage['data']['by']}}&nbsp;<span class='user-name cursor-pointer' >{{search['__createdby']['firstname']}}</span></span>" +
//            "<span class='deemphasized-text'>{{search['__createdon']}}</span></p><p class='small-comment'><span><a class='video-comments'>{{search['commentcount']}} {{userSelectedLanguage['data']['comments']}}</a></span>" +
//            "<span class='video-views'>{{search['clickcount']}} {{userSelectedLanguage['data']['views']}}</span></p></div></div></div></div></div>",
//        compile:function () {
//            return{
//                pre:function ($scope) {
//                    $scope.setCountAndPath = function (data) {
//
//                        window.location.href = '#/news?newsid=' + data._id;
//                    }
//                }
//            }
//        }
//    }
//}]);
//pajhwokApp.directive('customSearch', [function ($scope) {
//    return{
//        restrict:"E",
//        replace:true,
//        template:"<div class='most-popular' ng-switch='customSearchDataVisible'><p ng-switch-when='false' class='no-record'>{{userSelectedLanguage.data.norecordfound}}</p>" +
//            "<div ng-switch-when='true' class='popular-videos'>" +
//            "<div ng-repeat='search in customSearchData' class='popular-video-1'><a ng-click='setCountAndPath(search)'><div class='only-video'><span class='popular-video-thumb'><img ng-src='{{search.imgurl}}'></span></div>" +
//            "<div class='popular-lockup-content'><h3 class='popular-lockup-title'><p class='popular-small-heading'>{{search.title}}</p></a></h3>" +
//            "<div class='popular-video-meta'><p class='small-meta-info'><span class='deemphasized-text-name1'>{{userSelectedLanguage['data']['by']}}&nbsp;<span class='user-name cursor-pointer' >{{search['__createdby']['firstname']}}</span></span>" +
//            "<span class='deemphasized-text'>{{search['__createdon']}}</span></p><p class='small-comment'><span><a class='video-comments'>{{search['commentcount']}} {{userSelectedLanguage['data']['comments']}}</a></span>" +
//            "<span class='video-views'>{{search['clickcount']}} {{userSelectedLanguage['data']['views']}}</span></p></div></div></div></div></div></div>",
//        compile:function () {
//            return{
//                pre:function ($scope) {
//                    $scope.setCountAndPath = function (data) {
//
//                        window.location.href = '#/news?newsid=' + data._id;
//                    }
//                }
//            }
//        }
//
//    }
//
//}]);
//pajhwokApp.directive('mostPopular', [function ($scope) {
//    return{
//        restrict:"E",
//        replace:true,
//        template:"<div class='most-popular' ng-switch='mostPopularVisible'><div class='heading'>{{userSelectedLanguage['data']['mostpopular']}}</div>" +
//            "<p ng-switch-when='false' class='no-record' >{{userSelectedLanguage.data.norecordfound}}</p><div  ng-switch-when='true' class='popular-videos'>" +
//            "<div ng-repeat='mostpopular in mostPopularStoriesDetail ' class='popular-video-1'><a ng-click='setCountAndPath(mostpopular)'><div class='only-video'><span class='popular-video-thumb'><img ng-src='{{mostpopular.imgurl}}'></span></div>" +
//            "<div class='popular-lockup-content'><h3 class='popular-lockup-title'><p  class='popular-small-heading cursor-pointer''>{{mostpopular.title}}</p></h3></a>" +
//            "<div class='popular-video-meta'><p class='small-meta-info'><span class='deemphasized-text-name1'>{{userSelectedLanguage['data']['by']}}&nbsp;<a class='user-name'href='#' >{{mostpopular['__createdby']['firstname']}}</a></span>" +
//            "<span class='deemphasized-text'>{{mostpopular['__createdon']}}</span></p><p class='small-comment'><span><a class='video-comments'>{{mostpopular['commentcount']}} {{userSelectedLanguage['data']['comments']}}</a></span>" +
//            "<span class='video-views'>{{mostpopular['clickcount']}} {{userSelectedLanguage['data']['views']}}</span></p></div></div></div></div>",
//        compile:function () {
//            return{
//                pre:function ($scope) {
//                    $scope.setCountAndPath = function (data) {
//
//                        window.location.href = '#/news?newsid=' + data._id;
//                    }
//                }
//            }
//        }
//
//
//    }
//
//}]);
//pajhwokApp.directive('recentStory', [function ($scope) {
//    return{
//        restrict: "E",
//        replace: true,
//        template: "<div class='recently-uploaded' ng-switch='recentStoryVisible'><div  class='heading'>{{userSelectedLanguage['data']['recentlyuploaded']}}</div><p ng-switch-when='false' class='no-record'> No Record Found</p><div ng-switch-when='true' class='recent-videos'>" +
//            "<div ng-repeat='recentstory in recentStoriesDetail' class='recent-video-1'><a ng-click='setCountAndPath(recentstory)'><div class='only-video'><span class='recent-video-thumb'><img ng-src='{{recentstory.imgurl}}'></span></div>" +
//            "<div class='recent-lockup-content'><h3 class='recent-lockup-title'><p class='popular-small-heading'>{{recentstory.title}}</p></h3></a>" +
//            "<div class='recent-video-meta'><p class='small-meta-info'><span class='deemphasized-text-name1'>{{userSelectedLanguage['data']['by']}}&nbsp;<a class='user-name'href='#' >{{recentstory['__createdby']['firstname']}}</a></span>" +
//            "<span class='deemphasized-text'>{{recentstory['__createdon']}}</span></p><p class='small-comment'><span><a class='video-comments'>{{recentstory['commentcount']}} {{userSelectedLanguage['data']['comments']}}</a></span>" +
//            "<span class='video-views'>{{recentstory['clickcount']}} {{userSelectedLanguage['data']['views']}}</span></p></div></div></div></div>",
//        compile: function () {
//            return{
//                pre: function ($scope) {
//                    $scope.setCountAndPath = function (data) {
//
//                        window.location.href = '#/news/' + data._id;
//                    }
//                }
//            }
//        }
//
//    }
//
//}]);

//work by dhirender
pajhwokApp.directive('alertPopup', ['$appService', '$compile', function ($appService, $compile, $scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<div class="popup-manage">' +
            '<h2 class="h2-popup">Attention</h2>' +
            '<form method="">' +
            '<p class="alert-p">' +
            '{{alert.alertPopupMsg}}' +
            '</p>' +
            '<p class="role-change">' +
            '<input type="button" value="OK" class="alert-ok" ng-click="cancelAlertPopup()">' +
            '</p>' +
            '</form>' +
            '<a class="close" ng-click="cancelAlertPopup()">X</a>' +
            '</div>',
        compile:function () {
            return{
                pre:function ($scope) {

                },
                post:function ($scope) {
                    $scope.cancelAlertPopup = function () {
                        $scope.alert.bShowAlertPopup = false;
                        $scope.alert.alertPopupMsg = "";
                    }
                }
            }
        }
    }
}]);

pajhwokApp.directive('userArticle', ['$appService', '$compile', '$timeout', function ($appService, $compile, $timeout, $scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<div ng-switch="newsVisible"><alert-popup ng-show="bShowAlertPopup"></alert-popup><p ng-switch-when="false" class="no-record">{{userSelectedLanguage.data.norecordfound}}</p><div ng-switch-when="true" class="single-video-wrapper">' +
            '<div class="single-video"><span articlemedia class="single-video-thumb">' +
            '</span></div>' +
            '<div class="single-video-content">' +
            '<div class="single-lockup-content">' +
            '<h3 class="lockup-title">' +

            '<p class="single-heading">{{news[0].title}}</p>' +

            '<p ng-show="news[0].status==\'new\'">' +
            '<span style="cursor: pointer" ng-click="updateStatus(news[0]._id,\'publish\')">{{userSelectedLanguage.data.accept}}</span>' +
            ' <span  style="cursor: pointer" ng-click="updateStatus(news[0]._id,\'rejected\')">{{userSelectedLanguage.data.reject}}</span> </p>' +
            '</h3>' +
            '<p class="single-meta"><span class="meta-info">' +
            '<span class="deemphasized-text-name-1">{{userSelectedLanguage["data"]["by"]}}&nbsp;<a  class="user-name" ng-hide="!news[0].__createdby">' +
            '{{news[0]["__createdby"]["firstname"]}}</a><a  class="user-name" ng-hide="!news[0].guest">{{news[0].guest.name}}</a></span>' +
            '<span class="video-likes-dislikes"><img src="images/Icon_Like.png" alt="Like" width="20px" height="20px">' +
            '<span class="likes-count" ng-show="news[0].likecount">{{news[0].likecount}}</span>&nbsp;&nbsp;&nbsp;' +
            '</span>' +
            '</span></p>' +
            '<div addthis:url="http://afghansvote.af/#/news?newsid={{news[0]._id}}" addthis:title="{{news[0].title}}" class="addthis_toolbox  addthis_default_style ">' +
            '  <a class="addthis_button_preferred_1"></a><a class="addthis_button_preferred_2"></a>' +

            '        </div></div>' +
            '<div class="sentiment-actions">' +
            '<div class="watch-action-btn">' +
            '<span class="like-dislike">' +
            '<button  ng-show="news[0].likestatus" class="like-btn" title="{{userSelectedLanguage.data.title_like}}"  ng-click="updateLikeCount(news[0],false)">' +
            '<span class=""><img src="images/like-blue.png"></span></button>' +
            '<button ng-hide="news[0].likestatus" class="like-btn" title="{{userSelectedLanguage.data.title_unlike}}"  ng-click="updateLikeCount(news[0],true)">' +
            '<span class=""><img src="images/Icon_Like.png"></span></button></span>' +
            '</div>' +
            '<div class="flag"><button  ng-show="boolflag" class="flag-btn" title="{{userSelectedLanguage.data.unflag}}" ng-click="updateFlagCount(news[0],true)"><img src="images/flag-blue.png" width="30px" height="30px"></button>' +
            '<button  ng-hide="boolflag"  class="flag-btn" title="{{userSelectedLanguage.data.flag}}" ng-click="updateFlagCount(news[0],false)"><img src="images/flag.jpg" width="30px" height="30px"></button></div>' +
            '</div><div class="more-description"><h5>{{userSelectedLanguage.data.published}} {{news[0]["__createdon"]}}</h5><div id="description" class="brief-content">' +
            '<p class="video-description" >{{news[0].description}}</p></div></div>' +
            '<div class="show-more-less"><div class="show-more-btn">' +
            '</div></div>' +
            '<div class="comment-container"><p class="comment-label"><label>{{userSelectedLanguage.data.postyourcomment}}</label></p><div class="comment-box"><textarea id="commentBox" ng-model="commentBox" class="comment-textarea"></textarea></div>' +
            '<div class="comment-user-name"><button class="post-comment" ng-click="postComment()">{{userSelectedLanguage.data.postcomment}}</button></div><h4>{{userSelectedLanguage.data.allcomments}}<span ng-hide="!news[0].commentcount">({{news[0].commentcount}})</span></h4></div>' +
            '<div class="commenter-info" ng-repeat="cmnt in news[0].comment " ><span class="commenter-name">{{cmnt.__createdby.firstname}}</span><span class="comment-time">{{cmnt.__createdon}}</span>' +
            '<div class="comment-data">{{cmnt.content}}</div></div><div class="show-more-btn"><button  class="show-more"><span >{{userSelectedLanguage.data.showmore}}</span></button></div>' +
            '</div></div></div>',
        compile:function () {
            return{
                pre:function ($scope) {
                    $scope.commentContent = "";
                    $scope.getshowmorepost = function () {
                        {
                            $scope.newsdescription = !$scope.newsdescription;
                        }
                    }

                    $scope.showHide = function () {
                        $('#description').slideToggle();
                    }
                    $scope.updateStatus = function (mediaid, result) {
                        var query = {};
                        query.table = "News__pajhwok";
                        if (result == "publish") {
                            var columnArray = [
                                {"_id":mediaid, "status":"approved"}
                            ];
                        }
                        if (result == "rejected") {
                            var columnArray = [
                                {"_id":mediaid, "status":"decline"}
                            ];
                        }
                        query.operations = columnArray;
                        $appService.save(query, ASK, OSK, null, function (dataUpdate) {
                            $scope.news[0].published = true;
                            if (dataUpdate.response.update && dataUpdate.response.update.length > 0) {
                                $scope.alert.bShowAlertPopup = true;
                                $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.successfullyupdated;
                            }
                            else if (dataUpdate.response.insert && dataUpdate.response.insert.length > 0) {
                                $scope.alert.bShowAlertPopup = true;
                                $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.successfullyinserteduser;
                            }
                            else {
                                $scope.alert.bShowAlertPopup = true;
                                $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.msg_login_2;
                            }
                        }, function (err) {
                        });

                    }
                    $scope.updateFlagCount = function (record, flag) {
                        var currentSession = $scope.getSession();
                        if (!currentSession) {
                            $scope.alert.bShowAlertPopup = true;
                            $scope.alert.alertPopupMsg = $scope.SelectedLanguage.data.loginrequired;
                            return false;
                        }
                        var query = {};
                        query.table = "News__pajhwok";
                        var columnArray
                        if (flag) {
                            columnArray = [
                                {"_id":record._id, "$inc":{"activitycount":-5}, "$inc":{"flaggedcount":-1}, "flaggedby":[
                                    {"_id":currentSession["cuserid"], "__type__":"delete"}
                                ]}
                            ];
                            $scope.boolflag = false;
//                            $('#likeflag').css({"display":"none"});
//                            $('#unlikeflag').css({"display":"inline-block"});
                        }
                        else {
                            columnArray = [
                                {"_id":record._id, "$inc":{"activitycount":5}, "$inc":{"flaggedcount":1}, "flaggedby":[
                                    {"_id":currentSession["cuserid"]}
                                ]}
                            ];
                            $scope.boolflag = true;
//                            $('#likeflag').css({"display":"inline-block"});
//                            $('#unlikeflag').css({"display":"none"});
                        }
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                        query.operations = columnArray;
                        $appService.save(query, ASK, OSK, null, function (dataUpdate) {
                            if (dataUpdate.response.update && dataUpdate.response.update.length > 0) {
                                if (record != undefined) {
                                    if (!$scope.$$phase) {
                                        $scope.$apply();
                                    }
                                }
                            }
                            else if (dataUpdate.response.insert && dataUpdate.response.insert.length > 0) {

                            }
                            else {

                            }
                        }, function (err) {
                        });
                    }
                },
                post:function ($scope) {
//
//                            $('#sharethis a').on('click', function(event) {
//                               console.log("bharat");
//                                event.preventDefault();
//                            });


                    $scope.updateLikeCount = function (post, like) {
                        var currentSession = $scope.getSession();
                        if (!currentSession) {
                            $scope.alert.bShowAlertPopup = true;
                            $scope.alert.alertPopupMsg = $scope.SelectedLanguage.data.loginrequired;
                        }
                        else {
                            var query = {};
                            if (like) {
                                query.operations = [
                                    {"_id":post._id, "$inc":{"likecount":1, "activitycount":1.5}, "likeby":[
                                        {"_id":currentSession["cuserid"]}
                                    ]}
                                ];

                                $scope.news[0].likestatus = true;
                                post.likecount = (post.likecount) ? post.likecount + 1 : 1;
                            }
                            else {
                                query.operations = [
                                    {"_id":post._id, "$inc":{"likecount":-1, "activitycount":-1.5}, "likeby":[
                                        {"_id":currentSession["cuserid"], "__type__":"delete"}
                                    ]}
                                ];
                                $scope.news[0].likestatus = false;
                                post.likecount = (post.likecount) ? post.likecount - 1 : 0;
                            }
                            query.table = "News__pajhwok";
                            $appService.save(query, ASK, OSK, currentSession['usk'], function (data) {
                                /*for like*/
                            });
                        }
                    }
                    $scope.postComment = function () {
                        $scope.commentBox = $("#commentBox").val();
                        if ($scope.commentBox) {
                            var cuurentSession = $scope.getSession();
                            if (!cuurentSession) {
                                $scope.alert.bShowAlertPopup = true;
                                $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.msg_comment_1;
                                return false;
                            }
                            var query = {};
                            query.table = "News__pajhwok";
                            $scope.uploading = true;
                            $scope.newComment = {"_id":$scope.news[0]._id, "$inc":{"commentcount":1, "activitycount":1}};
                            $scope.newComment['comment'] = [
                                {"content":$scope.commentBox}
                            ];
                            query.operations = [$scope.newComment];
                            $appService.save(query, ASK, OSK, cuurentSession["usk"], function (callBackData) {
                                if (callBackData.response.update) {
                                    if (!$scope.news[0]['comment']) {
                                        $scope.news[0]['comment'] = [];
                                    }
                                    $scope.news[0]['comment'].push({"__createdby":{"firstname":cuurentSession["firstname"]}, "__createdon":" just now", "content":$scope.commentBox});
                                    $scope.news[0].commentcount = ($scope.news[0].commentcount) ? $scope.news[0].commentcount + 1 : 1;
                                    $("#commentBox").val("");
                                    if (!$scope.$$phase) {
                                        $scope.$apply();
                                    }
                                }
                            });
                        }
                        else {
                            $scope.alert.bShowAlertPopup = true;
                            $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.msg_comment_2;
                        }
                    }


                }
            }
        }
    }
}]);

pajhwokApp.directive("myMediaPicsData", [function ($scope) {
    return {
        restrict:"E",
        replace:true,
        template:"<a href='#/news?newsid={{media._id}}'>" +
            "<div class='only-video'>" +
            "<span class='popular-video-thumb'><img ng-src='{{media.imgurl}}'></span>" +
            "</div>" +
            "<div class='popular-lockup-content'>" +
            "<h3 class='popular-lockup-title'>" +
            "<p class='popular-small-heading'>{{media.title}}</p>" +
            "</h3>" +
            "</div>" +
            "</a>",

        compile:function ($scope) {
            return{
                pre:function ($scope) {

                },
                post:function ($scope) {

                }
            }
        }
    }
}]);
pajhwokApp.directive("manageUnpublishNews", ['$appService', '$compile', function ($appService, $compile, $scope) {
    return {
        restrict:"E",
        replace:true,
        template:'<div ng-switch="unpublishedNewsVisible">' +
            '<alert-popup ng-show="alert.bShowAlertPopup"></alert-popup><p ng-switch-when="false" class="no-record"> {{userSelectedLanguage["data"]["norecordfound"]}}</p>' +
            '<div ng-switch-when="true" >' +
            '<div class="left-news-wrapper">' +
            '<ul class="news-wrapper">' +
            '<li class="news-block"  ng-repeat="newsData in unpublishedNews">' +
            '<ul class="news-ul">' +
            '<li class="meta-block">' +
            '<h2 class="headline-block module line-clamp">' +
            '<a class="clampjs" href="#/news?newsid={{newsData._id}}">{{newsData.title}}</a>                ' +
            '</h2>' +
            '<p class="cat-block" ng-show="\'5304a09a476f9b995eb672f1\'==selectedTrans">' +
            '<a class="ng-binding">{{newsData.category.en_title}}</a>' +
            '</p>' +
            '<p class="cat-block ng-hide" ng-show="selectedTrans == \'5304a0ec476f9b995eb672f3\'">' +
            '<a class="ng-binding">{{newsData.category.dr_title}}</a>' +
            '</p>' +
            '<p class="cat-block ng-hide" ng-show="selectedTrans == \'5304a0cb476f9b995eb672f2\'">' +
            '<a class="ng-binding">{{newsData.category.ps_title}}</a>' +
            '</p>' +
            '</li>' +
            '            <li>' +
            '                <p class="info-block">' +
            '                    <span class="deemphasized-text-name1" ng-hide="!newsData.__createdby">by {{newsData.__createdby.firstname}}' +
            '                    </span>' +
            '                    <span class="deemphasized-text-name1" ng-hide="!newsData.guest">by {{newsData.guest.name}}' +
            '                    </span>' +
            '                </p>' +
            '<span class="time-date-block">' +
            '<span>{{newsData.__createdon}}</span>' +
            '</span>' +
            '           </li>' +
            '<li class="short-desc-block">' +
            '               <p class="desc-block">{{newsData.description}}</p>' +
            '</li>' +
            '            <li> ' +
            '<span class="more-block"><a href="#/news?newsid={{newsData._id}}"> {{userSelectedLanguage["data"]["readmore"]}}</a></span>' +
            '</li>' +
            '<li class="media-block">' +
            '            <p class="img-block" test></p>' +
            '</li>' +
            '    <li class="social-block" ng-show="editrole">' +
            '                <ul class="social-ul">' +
            '                    <li class="sp-block">' +
            '                        <p class="edit-btn">' +
            '                            <button class="edit-video-btn" ng-click="editUnpublishedNews($index,newsData)">{{userSelectedLanguage["data"]["edit"]}}</button>' +
            '                        </p>' +
            '                    </li>' +
            '                    <li class="sp-block">' +
            '                        <p class="edit-btn">' +
            '  <button class="edit-video-btn" ng-click="updateStatus(newsData,\'publish\')" ng-show="newsData.unpublished || newsData.rejected">{{userSelectedLanguage["data"]["approve"]}}</button>' +
            '                        </p>' +
            '                    </li>' +
            '                    <li class="sp-block">' +
            '                        <p class="edit-btn">' +
            '                            <button class="edit-video-btn" ng-click="updateStatus(newsData,\'reject\')" ng-show = "newsData.unpublished">{{userSelectedLanguage["data"]["reject"]}}</button>' +
            '                        </p>' +
            '                    </li>' +
            '                    <li class="sp-block" >' +
            '                        <p class="edit-btn">' +
            '                            <button class="edit-video-btn" ng-click="updateStatus(newsData,\'unpublish\')" ng-show = "newsData.published">{{userSelectedLanguage["data"]["unpublish"]}}</button>' +
            '                        </p>' +
            '                    </li>' +
            '                    <li class="sp-block" >' +
            '                        <p class="edit-btn">' +
            '                            <button class="edit-video-btn" ng-click="updateStatus(newsData,\'unflag\')" ng-show = "newsData.flagged">{{userSelectedLanguage["data"]["unflag"]}}</button>' +
            '                        </p>' +
            '                    </li>' +
            '                    <li class="sp-block">' +
            '                         <p>' +
            '<label class="video-reject-hide-btn" ng-show="newsData.published || newsData.rejected || newsData.unpublished || !newsData.flagged">{{newsData.message}}</label> ' +
            '</p>' +
            '                    </li>' +
            '                </ul>' +
            '    </li>' +
            '           <li class="video-edit-block" ng-show="bEdtiMedia == $index">' +
            '                <form>' +
            '                    <p class="edit-desc-block">' +
            '                          <input type="" class="edit-title" placeholder="edit title here" ng-model="newsData.title">' +
            '                                  <textarea class="edit-desc" placeholder="edit description here" ng-model="newsData.description"></textarea>' +
            '                    </p>' +
            '<div class="edit-cat">' +
            "<span><select class='select' ng-show='\"5304a09a476f9b995eb672f1\"==uploadSelectedTrans' ng-model='newPost.category' ng-change='showSubCategory(newPost.category)'>" +
            "<option ng-repeat='cat in categorylist' value='{{cat._id}}' ng-selected='newPost.category == cat._id'>{{cat.en_title}}</option></select>" +
            "<select class='select' ng-show='uploadSelectedTrans == \"5304a0ec476f9b995eb672f3\"'  data-ng-model='newPost.category' ng-change='showSubCategory(newPost.category)'><option ng-repeat='cat in categorylist' value='{{cat._id}}' ng-selected='newPost.category == cat._id'>{{cat.dr_title}}</option></select>" +
            "<select class='select' ng-show='uploadSelectedTrans == \"5304a0cb476f9b995eb672f2\"'  data-ng-model='newPost.category' ng-change='showSubCategory(newPost.category)'><option ng-repeat='cat in categorylist' value='{{cat._id}}' ng-selected='newPost.category == cat._id'>{{cat.ps_title}}</option></select></span>" +

            '<sub-category-edit-list></sub-category-edit-list><city-edit-upload ></city-edit-upload>' +
            '<language-list ></language-list>' +
            '<input type="" class="edit-phone" placeholder="edit name here" ng-show="newsData.guest" ng-model="newsData.guest.name"><input class="edit-phone" type="" placeholder="edit phone here" ng-show="newsData.guest" ng-model="newsData.guest.phone">' +
            '<div class="app-grid-datepicker-parent" style="width:200px;height:30px;padding: 5px;">' +
            '<input type="text" ng-model="newsData.strdate" data-date-format="dd/mm/yyyy" app-datepicker class="edit-phone app-grid-date-picker-input tbox" id="date" style="float:left;"><input type="text" data-toggle="datepicker" class="app-grid-date-picker-calender-image" tabindex="-1"/></div>' +
            '</div>' +
            '<p class="edit-cancel">' +
            '<button value="" class="upload-btn" ng-click="saveUnpublishedNews(newsData)">{{userSelectedLanguage["data"]["save"]}}</button>' +
            '<button value="" class="upload-btn" ng-click="cancelUnpublishedNews(newsData)">{{userSelectedLanguage["data"]["cancel"]}}</button>' +
            '</p>' +
            '</form>' +
            '</li>' +
            '</ul>' +
            '</li><div id="scrollDiv" style="padding: 2px;clear: both; "></div>' +
            '</ul>   ' +
            '</div></div></div>',
        compile:function () {
            return{
                pre:function ($scope) {

                    $scope.getUnpublishCall(0, $scope.searchContent);
                },

                post:function ($scope) {
                    $scope.editUnpublishedNews = function (index, newsData) {
                        $scope.bEdtiMedia = index;
                        $scope.tempUnpublishedNews = angular.copy($scope.unpublishedNews);
                        if ($scope.selectedTrans == "5304a09a476f9b995eb672f1") {
                            $scope.newPost.category = newsData.category;
                        }
                        else if ($scope.selectedTrans == "5304a0ec476f9b995eb672f3") {
                            $scope.newPost.category = newsData.category._id
                        }
                        else {
                            $scope.newPost.category = newsData.category;
                        }
                        if (newsData.category && newsData.category._id && !$scope.editcategory) {
                            $scope.newPost.category = newsData.category._id;
                        } else if ($scope.editcategory) {
                            $scope.newPost.category = $scope.editcategory;
                        }
                        $scope.showSubCategory($scope.newPost.category);
                        if (newsData.cityid && newsData.cityid._id && !$scope.editcityid) {
                            newsData.editCity = newsData.cityid._id;
                        } else if ($scope.editcityid) {
                            newsData.editCity = $scope.editcityid;
                        }
                        if (newsData.subcategory && newsData.subcategory._id && !$scope.subcategoryid) {
                            newsData.editsubcategory = newsData.subcategory._id;
                        } else if ($scope.subcategoryid) {
                            newsData.editsubcategory = $scope.subcategoryid;
                        }
                        if (!$scope.editdate && newsData.strdate.split("T").length > 1) {
                            var strdate = newsData.strdate;
                            strdate = strdate.split("T");
                            strdate = strdate[0].split("-");
                            strdate = strdate[2] + "/" + strdate[1] + "/" + strdate[0];
                            newsData.strdate = strdate;
                        }
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    }
                    $scope.cancelUnpublishedNews = function (newsData) {
                        $scope.bEdtiMedia = -1;
                        $scope.unpublishedNews = angular.copy($scope.tempUnpublishedNews);
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    }

                    $scope.saveUnpublishedNews = function (newsData) {
                        var tempObject = {};
                        tempObject._id = newsData._id;
                        var cuurentSession = $scope.getSession();
                        if (newsData.guest && newsData.guest.name) {
                            tempObject["guest"] = {};
                            tempObject["guest"]["name"] = newsData.guest.name;
                            tempObject["guest"]["phone"] = newsData.guest.phone;
                        }
                        if ($scope.newPost.category) {
                            tempObject["category"] = {"_id":$scope.newPost.category};
                            $scope.editcategory = $scope.newPost.category;
                        }
                        if (newsData.editCity) {
                            tempObject["cityid"] = {"_id":newsData.editCity};
                            $scope.editcityid = newsData.editCity;
                        }
                        if (newsData.editsubcategory) {
                            tempObject["subcategory"] = {"_id":newsData.editsubcategory};
                            $scope.subcategoryid = newsData.editsubcategory;
                        }
                        tempObject["title"] = newsData.title;
                        if ($scope.newPostTrans == 0) {
                            tempObject["description"] = (newsData.description) ? encodeURIComponent(newsData.description) : "";
                        } else {
                            tempObject["description"] = newsData.description;
                        }
                        var strdate = newsData.strdate;
                        strdate = strdate.split("/");
                        strdate = strdate[2] + "-" + strdate[1] + "-" + strdate[0];
                        tempObject["__createdon"] = strdate;
                        $scope.editdate = true;
                        //  tempObject["guest"]["city"]=newsData.guest.name;
//                        tempObject["city"]
                        var query = {};
                        query.table = "News__pajhwok";
                        query.operations = [tempObject];
                        $appService.save(query, ASK, OSK, cuurentSession["usk"], function (dataUpdate) {
                            if (dataUpdate.response.update && dataUpdate.response.update.length > 0) {
                                $scope.alert.bShowAlertPopup = true;
                                $scope.alert.alertPopupMsg = "Successfully updated.";
                                $scope.bEdtiMedia = -1;
                                $scope.tempUnpublishedNews = {};
                            }
                            else if (dataUpdate.response.insert && dataUpdate.response.insert.length > 0) {
                                $scope.alert.bShowAlertPopup = true;
                                $scope.alert.alertPopupMsg = "Successfully inserted.";
                            }
                            else {
                                $scope.alert.bShowAlertPopup = true;
                                $scope.alert.alertPopupMsg = "User save failed.";
                            }
                        });


                    }

                    $scope.updateStatus = function (media, result) {
                        var query = {};
                        query.table = "News__pajhwok";
                        if (result == "publish") {
                            var columnArray = [
                                {"_id":media._id, "status":"approved"}

                            ];
                            media.published = true;
                            media.unpublished = false;
                            media.rejected = false;
                            media["message"] = "Approved";
                        }
                        if (result == "reject") {
                            var columnArray = [
                                {"_id":media._id, "status":"decline"}
                            ];
                            media.rejected = true;
                            media.unpublished = false;
                            media.published = false;
                            media["message"] = "Rejected";
                        }
                        if (result == "unpublish") {
                            var columnArray = [
                                {"_id":media._id, "status":"new"}
                            ];
                            media.unpublished = true;
                            media.rejected = false;
                            media.published = false;
                            media["message"] = "Unpublished";
                        }
                        if (result == "unflag") {
                            var columnArray = [
                                {"_id":media._id, "flaggedcount":0, "flaggedby":null}
                            ];
                            media.flagged = false;
                            media["message"] = "Unflagged";
                        }
                        query.operations = columnArray;

                        /*change for appstrap*/
                        $appService.save(query, ASK, OSK, null, function (dataUpdate) {
                            if (dataUpdate.response.update && dataUpdate.response.update.length > 0) {
                                $scope.alert.bShowAlertPopup = true;
                                $scope.alert.alertPopupMsg = "Successfully updated.";
                            }
                            else if (dataUpdate.response.insert && dataUpdate.response.insert.length > 0) {
                                $scope.alert.bShowAlertPopup = true;
                                $scope.alert.alertPopupMsg = "Successfully inserted.";
                            }
                            else {
                                $scope.alert.bShowAlertPopup = true;
                                $scope.alert.alertPopupMsg = "User save failed.";
                            }
                        });

                    }
                }
            }
        }
    }

}
]);
pajhwokApp.directive("myMedia", [function ($scope) {
    return {
        restrict:"E",
        replace:true,
        template:"<div ng-switch='myAllMediaVisible'><alert-popup ng-show='bShowAlertPopup'></alert-popup><p ng-switch-when='false' class='no-record' class='no-record'>{{userSelectedLanguage.data.norecordfound}}</p><div ng-switch-when='true' class='most-popular'>" +
            "<div class='heading'>{{userSelectedLanguage.data.myuploads}}</div>" +
            "<div class='popular-videos'>" +
            "<div ng-repeat='media in myAllMedia ' class='popular-video-1'>" +
            "<my-media-pics-data></my-media-pics-data>" +
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
            "<span class='video-views'>{{media['clickcount']}} {{userSelectedLanguage['data']['views']}}</span>" +
            "</p>" +
            "</div>" +
            "</div>" +
            "</div><div id='scrollDiv'></div>" +
            "</div></div>",
        compile:function () {
            return{
                pre:function ($scope) {

                },
                post:function ($scope) {
                    $(window).scroll(function () {
                        if ($("#scrollDiv").offset()) {
                            if ($(window).scrollTop() + $(window).height() > $("#scrollDiv").offset().top) {
                                if ($scope.cursor != "" && $scope.cursor != undefined) {
                                    $scope.getMoreMedia($scope.cursor);
                                }
                            }
                        }
                    });
                }
            }
        }
    }
}]);
pajhwokApp.directive("myUnpublishMedia", [function ($scope) {
    return {
        restrict:"E",
        replace:true,
        template:"<div ng-switch='myunpublishAllMediaVisible'><alert-popup ng-show='bShowAlertPopup'></alert-popup><p ng-switch-when='false' class='no-record' class='no-record'>{{userSelectedLanguage.data.norecordfound}}</p><div ng-switch-when='true' class='most-popular'>" +
            "<div class='heading'>{{userSelectedLanguage.data.myuploads}}</div>" +
            "<div class='popular-videos'>" +
            "<div ng-repeat='media in myunpublishAllMedia ' class='popular-video-1'>" +
            "<my-media-pics-data></my-media-pics-data>" +
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
            "<span class='video-views'>{{media['clickcount']}} {{userSelectedLanguage['data']['views']}}</span>" +
            "</p>" +
            "</div>" +
            "</div>" +
            "</div><div id='scrollDiv'></div>" +
            "</div></div>",
        compile:function () {
            return{
                pre:function ($scope) {

                },
                post:function ($scope) {
                    $(window).scroll(function () {
                        if ($("#scrollDiv").offset()) {
                            if ($(window).scrollTop() + $(window).height() > $("#scrollDiv").offset().top) {
                                if ($scope.cursor != "" && $scope.cursor != undefined) {
                                    $scope.getMoreMedia($scope.cursor);
                                }
                            }
                        }
                    });
                }
            }
        }
    }
}]);
pajhwokApp.directive('register', ['$appService', '$compile', function ($appService, $compile, $scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<div ng-show=loginDetail.register><alert-popup ng-show="alert.bShowAlertPopup"></alert-popup><a  class="overlay" id="join_form"></a>' +
            '<div class="popup"><h2>{{userSelectedLanguage.data.register}}</h2><form><p><input ng-model="newUser.emailid" type="email" id="email" placeholder="{{userSelectedLanguage.data.enteryouremail}}" required></p>' +
            '<p><input ng-model="newUser.firstname" type="text" id="firstname" placeholder="{{userSelectedLanguage.data.msg_register_2}}" required></p><p>' +
            '<input type="password" ng-model="newUser.password" id="pass" placeholder="{{userSelectedLanguage.data.enteryourpassword}}" required></p><p>' +
            '<input type="password" ng-model="confirmPassword" id="confirmPass" placeholder="{{userSelectedLanguage.data.confirmpassword}}" required></p>' +
            '<p class="terms"><input ng-model="terms" type="checkbox"><span class="term">&nbsp;&nbsp;{{userSelectedLanguage.data.iagreetothe}} <a >{{userSelectedLanguage.data.termsofservice}}</a> {userSelectedLanguage.data.and}} <a >{{userSelectedLanguage.data.privacypolicy}}</a>' +
            '</span></p><p><span><input ng-click="saveUser()" type="button" value="{{userSelectedLanguage.data.register}}" class="register"></span><span class="login-link" ng-click="userLogin=true;userRegister=false"><a  id="login_pop" class="log-in">{{userSelectedLanguage.data.log_in}}</a></span>' +
            '</p></form><a ng-click="closePopup()" class="close">X</a></div></div>',
        compile:function () {
            return{
                pre:function ($scope) {
                    $scope.newUser = {};
                    $scope.confirmPassword = "";
                    $scope.terms = true;
                    $scope.closePopup = function () {
                        $scope.loginDetail.login = false;
                        $scope.loginDetail.register = false;
                        $scope.newUser.firstname = "";
                        $scope.newUser.password = "";
                        $scope.confirmPassword = "";
                    }

                },
                post:function ($scope) {
                    $scope.saveUser = function () {
                        var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                        var email = $('#email').val();

                        if (regEmail.test(email) == false) {
                            $scope.alert.bShowAlertPopup = true;
                            $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.msg_register_1;
                            return false;
                        }
                        else {

                            $scope.newUser.emailid = email;
                        }
                        $scope.newUser.firstname = $('#firstname').val();
                        if ($scope.newUser.firstname == null || $scope.newUser.firstname == undefined || $scope.newUser.firstname == "") {
                            $scope.alert.bShowAlertPopup = true;
                            $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.msg_register_2;
                            return false;
                        }
                        $scope.newUser.password = $('#pass').val();
                        $scope.confirmPassword = $('#confirmPass').val();
                        if (!$scope.newUser.password || $scope.newUser.password != $scope.confirmPassword) {
                            $scope.alert.bShowAlertPopup = true;
                            $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.msg_register_3;
                            return false;
                        }
                        if (!$scope.terms) {
                            $scope.alert.bShowAlertPopup = true;
                            $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.msg_register_4;
                            return false;
                        }
                        $scope.newUser.username = $scope.newUser.emailid;
                        var query = {};
                        query.table = "Profile__pajhwok";
                        query.operations = [
                            {"userid":$scope.newUser, "roleid":{"_id":GENERAL}, "emailid":$scope.newUser.emailid}
                        ];
                        $appService.save(query, ASK, OSK, null, function (callBackData) {
                            if (callBackData.code && callBackData.code == 200 && callBackData.status && callBackData.status == "ok") {
                                $scope.userRegister = false;
                                $scope.alert.bShowAlertPopup = true;
                                $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.msg_login_6;
                                $scope.newUser = {};
                                $scope.confirmPassword = "";

                            }
                            else if (callBackData.responseText && JSON.parse(callBackData.responseText).response.indexOf("Record already exists") >= 0) {
                                $scope.alert.bShowAlertPopup = true;
                                $scope.alert.alertPopupMsg = "User already exists.";
                            }
                            else {

                                $scope.alert.bShowAlertPopup = true;
                                $scope.alert.alertPopupMsg = "some error occure while saving new user";
                            }
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        });
                    }

                }
            }

        }

    }
}]);
pajhwokApp.directive("addUser", ['$appService', '$compile', function ($appService, $compile, $scope) {
    return {
        restrict:"E",
        replace:true,
        template:'<div class="popup">' +
            '<h2>{{userSelectedLanguage.data.adduser}}</h2>' +
            '<form method="">' +
            '<p>' +
            '<input type="text" id="adduseremail" placeholder="{{userSelectedLanguage.data.msg_login_5}}" ng-model="addUser.emailid">' +
            '</p>' +
            '<p>' +
            '<input type="text" id="adduserfirstname" placeholder="{{userSelectedLanguage.data.enterfullname}}" ng-model="adduser.firstname">' +
            '</p>' +
            '<p>' +
            '<input type="password" id="adduserpass" placeholder="{{userSelectedLanguage.data.msg_login_4}}" ng-model="adduser.password">' +
            '</p>' +
            '<p>' +
            '<input type="password" id="adduserconfirmpass" placeholder="{{userSelectedLanguage.data.confirmpassword}}">' +
            '</p>' +
            '<p class="user-role">' +
            '<span><label>{{userSelectedLanguage.data.select_role}}</label></span>' +
            '<span>' +
            '<select class="select-role" ng-options="o.name for o in roleOptions" ng-model="selectedRole1" style="float: right;"></select>' +
            '</span>' +
            '</p>' +
            '<p>' +
            '<span><input type="button" value="{{userSelectedLanguage.data.adduser}}" class="register" ng-click="saveUser()"></span>' +
            '<span class="login-link" ng-click="closeAddUserPopup()">	<a id="login_pop" class="log-in">Cancel</a></span>' +
            '</p>' +
            '</form>' +
            '<a class="close" ng-click="closeAddUserPopup()">X</a>' +
            '</div>',
        compile:function () {
            return{
                pre:function ($scope) {
                    $scope.closeAddUserPopup = function () {
                        $scope.manageUserDisplay.baddUser = false;
                    }
                    $scope.saveUser = function () {
                        var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                        var email = $('#adduseremail').val();
                        if (regEmail.test(email) == false) {
                            $scope.alert.bShowAlertPopup = true;
                            $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.msg_register_1;
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                            return false;

                        }
                        else {
                            $scope.addUser.emailid = email;
                        }
                        $scope.addUser.firstname = $('#adduserfirstname').val();
                        if ($scope.addUser.firstname == "" || $scope.addUser.firstname == null || $scope.addUser.firstname == undefined) {
                            $scope.alert.bShowAlertPopup = true;
                            $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.enterfullname;
                            ;
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                            return false;
                        }
                        $scope.addUser.password = $('#adduserpass').val();
                        if ($scope.addUser.password == "" || $scope.addUser.password == null || $scope.addUser.password == undefined) {
                            $scope.alert.bShowAlertPopup = true;
                            $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.msg_login_4;
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                            return false;
                        }
                        var confirmPassword = $('#adduserconfirmpass').val();
                        if (!$scope.addUser.password || $scope.addUser.password != confirmPassword) {
                            $scope.alert.bShowAlertPopup = true;
                            $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.msg_register_3;
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                            return false;
                        }
                        if (!($scope.selectedRole1._id && $scope.selectedRole1.name)) {
                            $scope.alert.bShowAlertPopup = true;
                            $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.please_select_role;
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                            return false;
                        }
                        $scope.addUser.username = $scope.addUser.emailid;
                        var query = {};
                        query.table = "Profile__pajhwok";
                        delete $scope.addUser["userid"];
                        delete $scope.addUser["roleid"];
                        $scope.addUser["status"] = true;
                        query.operations = [
                            {"userid":$scope.addUser, "roleid":$scope.selectedRole1, "emailid":$scope.addUser.emailid}
                        ];
                        $appService.save(query, ASK, OSK, null, function (callBackData) {
                            if (callBackData.status == 0 && callBackData.statusText == "error") {
                                $scope.alert.bShowAlertPopup = true;
                                $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.msg_login_7;

                            }
                            else {
                                $scope.userRegister = false;
                                $scope.addUser = {};
                                $scope.baddUser = false;
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                                $scope.alert.bShowAlertPopup = true;
                                $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.msg_register_5;
                            }

                        });
                    }
                }
            }
        }
    }
}]);
pajhwokApp.directive("changeUserStatus", ['$appService', '$compile', function ($appService, $compile, $scope) {
    return {
        restrict:"E",
        replace:true,
        template:'<div class="popup-manage">' +
            '<h2 class="h2-popup">{{userSelectedLanguage.data.change_role}}</h2>' +
            '<form method="">' +
            '<p>' +
            '<span class="describe-name">' +
            '<select class="change-role" ng-options="o.name for o in roleOptions" ng-model="selectedRole" style="float: right;"></select>' +
            '</span>' +
            '</p>' +
            '<p class="role-change">' +
            '<input type="button" value="{{userSelectedLanguage.data.ok}}" class="change-role-p" ng-click="saveManageUsers()">' +
            '</form>' +
            '<a class="close" ng-click="cancelChanges()">x</a>' +
            '</div>',
        compile:function () {
            return{
                pre:function ($scope) {
                    $scope.saveManageUsers = function () {
                        $scope.userData.roleid = $scope.selectedRole;
                        for (i = 0; i < $scope.userList.length; i++) {
                            if ($scope.userList[i].userid.username == $scope.userData.userid.username) {
                                $scope.userList[i].roleid = angular.copy($scope.userData.roleid);
                            }
                        }
                        var query = {};
                        query.table = "Profile__pajhwok";
                        var columnArray = $scope.userData;
                        query.operations = columnArray;
                        $appService.save(query, ASK, OSK, null, function (dataUpdate) {
                            if (dataUpdate.update && dataUpdate.update.length > 0) {
                                $scope.manageUserDisplay.bChangeRole = false;
                                $scope.alert.bShowAlertPopup = true;
                                $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.successfullyupdated;
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }


                            }
                            else if (dataUpdate.insert && dataUpdate.insert.length > 0) {
//
                                $scope.manageUserDisplay.bChangeRole = false;
                                $scope.alert.bShowAlertPopup = true;
                                $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.successfullyinserted;
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                            }
                            else {
                                $scope.alert.bShowAlertPopup = true;
                                $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.savingfail
                            }
                        }, function (err) {
                            alert("An error has accurd");
                        });

                    }

                },
                post:function ($scope) {


                }
            }
        }
    }
}]);
pajhwokApp.directive("manageUser", ['$appService', '$compile', function ($appService, $compile, $scope) {
    return {
        restrict:"E",
        replace:true,
        template:'<div><div ng-switch="visibleUserList"><p ng-switch-when="false" class="no-record" class="no-record">{{userSelectedLanguage.data.norecordfound}}</p>' +
            '<div ng-switch-when="true"><add-user ng-show="manageUserDisplay.baddUser"></add-user>' +
            '<alert-popup ng-show="alert.bShowAlertPopup"></alert-popup>' +
            '<div class="manage-users-wrapper">' +
            '<div class="info-data-wrapper">' +
            '<div class="action-list">' +
            '<div class="add-delete-user">' +
            '<span class="change-role"><button class="user-btn" ng-click="fnAdduser()">Add New User</button></span>' +
            '</div>' +

            '</div>' +
            '<div class="user-title-bar">' +
            '<ul class="table-headings">' +
            '<li class="heading-element">' +
            '<span><label>{{userSelectedLanguage.data.name}}</label></span>' +
            '<span>' +
            '<a class="upper-arrow">' +
            '<img src="images/w_arw_up.png"></a>' +
            '<a class="lower-arrow" >' +
            '<img src="images/w_arw_dwn.png"></a>' +

            '</span>' +
            '</li>' +
            '<li class="mail-element">' +
            '<span>' +
            '<label>{{userSelectedLanguage.data.email}}</label>' +
            '</span>' +
            '<span>' +
            '<a class="upper-arrow" >' +
            '<img src="images/w_arw_up.png"></a>' +
            '<a class="lower-arrow">' +
            '<img src="images/w_arw_dwn.png"></a>' +

            '</span>' +
            '</li>' +
            '<li class="mail-element">' +
            '<span><label>{{userSelectedLanguage.data.role}}</label></span>' +
            '<span><a class="upper-arrow">' +
            '<img src="images/w_arw_up.png"></a>' +
            '<a class="lower-arrow" >' +
            '<img src="images/w_arw_dwn.png"></a>' +
            '</span>' +
            '</li>' +
            '<li class="heading-element">' +
            '<span><label>{{userSelectedLanguage.data.createdon}}</label></span>' +
            '<span><a class="upper-arrow" >' +
            '<img src="images/w_arw_up.png"></a>' +
            '<a class="lower-arrow" >' +
            '<img src="images/w_arw_dwn.png"></a>' +

            '</span>' +
            '</li>' +
            '<li class="heading-element">' +
            '<span><label>{{userSelectedLanguage.data.status}}</label></span>' +
            '<span><a class="upper-arrow">' +
            '<img src="images/w_arw_up.png"></a>' +
            '<a class="lower-arrow"">' +
            '<img src="images/w_arw_dwn.png"></a>' +
            '</span>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '<div class="user-info-div">' +


            '<ul class="data-headings" ng-repeat="user in userList">' +
            '<li class="data-element">' +
            '<input type="text" class="editable" contenteditable="true" ng-model = "user.userid.firstname" ng-show="index == $index">' +
            '<span ng-hide="index == $index">{{user.userid.firstname}}</span>' +
            '</li>' +
            '<li class="email-element">' +
            '<label>{{user.userid.emailid}}</label>' +
            '</li>' +
            '<li class="button-element">' +
            '<span ng-hide="index == $index">{{user.roleid.name}}</span>' +
            '<select ng-show = "index == $index" class="select-edit-role" ng-options="o.name for o in roleOptions" ng-model="user.selectedRole" ></select>' +
            '</li>' +
            '<li class="button-element">' +
            '<label class="date-created">{{user.__createdon}}</label>' +
            '</li>' +
            '<li class="button-element">' +
            '<button class="activate-button"  ng-hide="user.userid.status" ng-click="changeStatus($index,user.userid._id)">Activate</button>' +
            '<button class="deactivate-button"   ng-show="user.userid.status" ng-click="changeStatus($index,user.userid._id)">Deactivate</button>' +
            '</li>' +
            '<li class="button-element">' +
            '<button class="activate-button" ng-show="index==$index" ng-click = "fnSaveManageUsers(user)">{{userSelectedLanguage.data.save}}</button>' +
            '<button class="deactivate-button" ng-hide="index == $index" ng-click="fnEditMangeUsers($index,user)">Edit</button>' +
            '</li>' +
            '</ul>' +

            '</div>' +

            '</div>' +
            '</div>' +
            "<div id='scrollDiv'></div>" +
            '</div></div></div>',
        compile:function () {
            return{
                pre:function ($scope) {
                },
                post:function ($scope) {
                    var currentSession = $scope.getSession();
                    if (!currentSession) {
                        $scope.alert.bShowAlertPopup = true;
                        $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.loginrequired;
                        return;
                    }
                    $scope.fnSaveManageUsers = function (user) {
                        var users = angular.copy(user);
                        users.roleid = angular.copy(user.selectedRole);

                        delete users.__createdon;
                        delete users.selectedRole;
                        users.userid["__type__"] = "update";

//                        for (var i = 0; i < $scope.userList.length; i++) {
//                            if ($scope.userList[i].userid.username == $scope.userData.userid.username) {
//                                $scope.userList[i].roleid = angular.copy($scope.userData.roleid);
//                            }
//                        }
                        var query = {};
                        query.table = "Profile__pajhwok";
                        var columnArray = users;
                        query.operations = columnArray;
                        $appService.save(query, ASK, OSK, currentSession["usk"], function (dataUpdate) {
                            if (dataUpdate.response.update && dataUpdate.response.update.length > 0) {
                                user.roleid = user.selectedRole;
                                $scope.manageUserDisplay.bChangeRole = false;
                                $scope.alert.bShowAlertPopup = true;
                                $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.successfullyupdated;
                                $scope.index = -1;
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }


                            }
                            else if (dataUpdate.response.insert && dataUpdate.insert.response.length > 0) {
//
                                $scope.manageUserDisplay.bChangeRole = false;
                                $scope.alert.bShowAlertPopup = true;
                                $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.successfullyinserted;
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                            }
                            else {
                                $scope.alert.bShowAlertPopup = true;
                                $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.savingfail
                            }
                        }, function (err) {
                            alert("An error has accurd");
                        });

                    }


                    $scope.fnEditMangeUsers = function (index, user) {
                        $scope.index = index;
                        for (var i = 0; i < $scope.roleOptions.length; i++) {
                            if ($scope.roleOptions[i].name == user.roleid.name) {
                                user.selectedRole = $scope.roleOptions[i];
                            }
                        }

                        console.log(JSON.stringify($scope.selectedRole));
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    }
                    $(window).scroll(function () {
                        if ($("#scrollDiv").offset()) {
                            if ($(window).scrollTop() + $(window).height() > $("#scrollDiv").offset().top) {
                                if ($scope.cursor != "" && $scope.cursor != undefined) {
                                    $scope.getMoreUsersList($scope.cursor);
                                }
                            }
                        }

                    });
                    $scope.searchUsers = function () {
                        var text = $("#searchText").val();
                        $scope.getUsersList(text);
                    }

                }
            }
        }
    }
}]);
//pajhwokApp.directive('mapAppliedFilter', [function ($scope) {
//    return{
//        restrict:"E",
//        replace:true,
//        template:"<div style='display: inline'><span>Applied Filter:</span>" +
////            "<span ng-show='labelDetail.mapVisibleCategoryFilter'>Category:&nbsp;&nbsp;{{mapSearchCategory}}<span class='cursor-pointer' ng-click='setCategory(null);removeSelectedClass()'>&nbsp;&nbsp;X</span>" +
//            "<span>&nbsp;&nbsp;Search Text&nbsp;&nbsp;{{mapSearchText}}<span style='cursor: pointer' ng-click='removeSearchText()' >&nbsp;&nbsp;X</span></span></span>" +
//            "</div>",
//        compile:function () {
//            return{
//                pre:function ($scope) {
//                    $scope.removeSearchText = function () {
//                        $('#searchtextbox').val("");
//                        window.location.href = '#/map/language/' + $scope.selectedTrans + '/search?q=' + null;
//                    }
//                }
//            }
//        }
//
//    }
//}]);


pajhwokApp.directive('test', function () {
    function link($scope, element, attrs) {
        if ($scope.newsData.displayType.image) {
            var imgHtml = "<img src=" + $scope.newsData.imgurl + ">";

            element.append(imgHtml);
        } else if ($scope.newsData.displayType.audioVideo) {
            var html = "<div id='player" + $scope.$index + "'></div>"
            var fileUrl = $scope.newsData.fileUrl;
            var thumbnailUrl = $scope.newsData.thumbnail;

            var domainName = "http://afghansvote.af";
            thumbnailUrl = domainName + thumbnailUrl;
            fileUrl = domainName + fileUrl;
            console.log("capture" + thumbnailUrl);
            var file_ext = $scope.getFileExtension($scope.newsData.media[0].name);
            element.append(html);
            jwplayer('player' + $scope.$index).setup({
                image:thumbnailUrl,
                file:fileUrl,
                width:580,
                height:300,
                autostart:false,
                type:file_ext
            });
        }
        window.setTimeout(function () {
            addthis.init();
            addthis.toolbox($(".addthis_toolbox").get());
            $('.addthis_toolbox a').on('click', function (event) {
                event.preventDefault();
            });

        }, 1000);
    }

    return {
        restrict:"A",
        link:link
    };
});
pajhwokApp.directive('articlemedia', function () {
    function link($scope, element, attrs) {
        if ($scope.news[0].displayType.image) {
            var imgHtml = "<img src=" + $scope.news[0].imgurl + ">";

            element.append(imgHtml);
        } else if ($scope.news[0].displayType.audioVideo) {
            var html = "<div id='singleplayer" + $scope.$index + "'></div>"
            var fileUrl = $scope.news[0].fileUrl;
            var thumbnailUrl = $scope.news[0].thumbnail;
            var domainName = "http://afghansvote.af";
            thumbnailUrl = domainName + thumbnailUrl;
            fileUrl = domainName + fileUrl;
            var file_ext = $scope.getFileExtension($scope.news[0].media[0].name);
            element.append(html);
            jwplayer('singleplayer' + $scope.$index).setup({
                image:thumbnailUrl,
                file:fileUrl,
                width:779,
                height:500,
                autostart:false,
                type:file_ext,
                autostart:true
            });
        }
        window.setTimeout(function () {
            addthis.init();
            addthis.toolbox($(".addthis_toolbox").get());
            $('.addthis_toolbox a').on('click', function (event) {
                event.preventDefault();
            });

        }, 1000);
    }

    return {
        restrict:"A",
        link:link
    };
});
pajhwokApp.directive('similarmedia', function () {
    function link($scope, element, attrs) {
        if ($scope.newsData.displayType.image) {
            var imgHtml = "<img src=" + $scope.newsData.imgurl + ">";

            element.append(imgHtml);
        } else if ($scope.newsData.displayType.audioVideo) {
            var html = "<a href='#/news?newsid=" + $scope.newsData._id + "'><div id='similarplayer" + $scope.$index + "'></div></a>"
            var fileUrl = $scope.newsData.fileUrl;
            var thumbnailUrl = $scope.newsData.thumbnail;
            var domainName = "http://afghansvote.af";
            thumbnailUrl = domainName + thumbnailUrl;
            fileUrl = domainName + fileUrl;
            var file_ext = $scope.getFileExtension($scope.newsData.media[0].name);
            element.append(html);
            jwplayer('similarplayer' + $scope.$index).setup({
                image:thumbnailUrl,
                file:fileUrl,
                width:266,
                height:180,

                type:file_ext
            });
        }

    }

    return {
        restrict:"A",
        link:link
    };
});


pajhwokApp.directive('mobileApp', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<div class="mobile-app"><div class=""><h3 class="left-heading">{{userSelectedLanguage.data.pajhwokmobappmsg}}</h3></div>' +
            '<div class="logo"><div class="apple-app"><a href="https://itunes.apple.com/us/app/afghansvote/id881507580?ls=1&mt=8" target="_blank"><img id="mobile-img" src="images/PANMAIN.png"></a></div>' +
            '<div class="google-app"><a href="https://play.google.com/store/apps/details?id=com.pajhwok.afghansvote" target="_blank"><img id="mobile-img" src="images/google-play.png"></a></div></div></div>'


    }
}]);
pajhwokApp.directive('specialMines', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<div class="special-mines"><div class=""><h3 class="left-heading">{{userSelectedLanguage.data.splminespages}}</h3></div>' +
            '<div class="logo"><a href="http://mines.pajhwok.com/" target="_blank" ><img id="logo-white" src="images/logo-white.png"></a></div><div class="view-all"><a href="http://mines.pajhwok.com/"><div id="view-all">{{userSelectedLanguage.data.viewall}}</div></a>' +
            '<div class="right-arrow"><a href="http://mines.pajhwok.com/"><img src="images/arrow.png" class="view-all-arrow"></a></div></div></div>'


    }
}]);

pajhwokApp.directive('election', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<div class="election"><div class=""><h3 class="left-heading">{{userSelectedLanguage.data.pajhwokelection2014}}</h3></div>' +
            '<div class="logo"><a href="http://www.elections.pajhwok.com/" target="_blank" ><img id="logo-white" src="images/logo-white.png"></a></div><div class="view-all"><a href="http://www.elections.pajhwok.com/"><div id="view-all">{{userSelectedLanguage.data.viewall}}</div></a>' +
            '<div class="right-arrow"><a href="http://www.elections.pajhwok.com/"><img src="images/arrow.png" class="view-all-arrow"></a></div></div></div>'


    }
}]);

pajhwokApp.directive('yourVote', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<div class="election"><div class=""><h3 class="left-heading">{{userSelectedLanguage.data.votehere}}</h3></div>' +
            '<div class="logo"><a href="http://votehere.af" target="_blank"><img id="logoVote" src="images/votehere1.JPG"></a></div><div class="view-all"><a href="http://votehere.af"><div id="view-all">{{userSelectedLanguage.data.viewall}}</div></a>' +
            '<div class="right-arrow"><a href="http://votehere.af"><img src="images/arrow.png" class="view-all-arrow"></a></div></div></div>'


    }
}]);


pajhwokApp.directive('socialConnect', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<div class="social-connect"><div class="social-networks"><ul><li><a  id="facebook" title=""></a></li>' +
            '<li><a  id="linkedin" title=""></a></li><li><a  id="twitter" title=""></a></li></ul></div></div>'


    }
}]);
pajhwokApp.directive('mapBlock', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<div class="map-block"><div class="small-map-block">' +
            '<a ng-show="\'5304a09a476f9b995eb672f1\'==selectedTrans" ng-click=setMapView()><img src="images/small-map-eng.png"></a>' +
            '<a ng-show="selectedTrans == \'5304a0cb476f9b995eb672f2\'" ng-click=setMapView()><img src="images/small-map-ps.png"></a>' +
            '<a ng-show="selectedTrans == \'5304a0ec476f9b995eb672f3\'" ng-click=setMapView()><img src="images/small-map-dr.png"></a></div>' +
            '<div class="map-heading"><a ng-click=setMapView() class="map-heading-a">{{userSelectedLanguage.data.viewonmap}}</a></div></div>',
        compile:function () {
            return{
                pre:function ($scope) {
                    $scope.setMapView = function () {
                        window.location.href = '#/map/category/' + ($scope.selectedCategoryid && $scope.selectedCategoryid.parent ? $scope.selectedCategoryid["parent"] : "all") + "/subcategory/" + ( $scope.selectedCategoryid && $scope.selectedCategoryid["child"] ? $scope.selectedCategoryid["child"] : "all" ) + '/language/' + $scope.selectedTrans + '/search?q=' + $scope.searchContent;
                    }
                }
            }

        }


    }
}]);
pajhwokApp.directive('twitter', ['$compile', function ($compile) {
    return{
        restrict:"E",
        replace:true,
        template:'<div class="twitter-wrapper"><div class="twitter-block"><twitter-test></twitter-test></div></div>'


    }
}]);
pajhwokApp.directive("twitterTest", function () {
    return {
        restrict:'E',
        template:'<a width="263" height="700" class="twitter-timeline" href="https://twitter.com/afghansvote" data-widget-id="423920531142754304">Tweets by @afghansvote</a>',
        link:function (scope, element, attrs) {
            function run() {
                (!function (d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https';
                    if (!d.getElementById(id)) {
                        js = d.createElement(s);
                        js.id = id;
                        js.src = p + "://platform.twitter.com/widgets.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    }
                }(document, "script", "twitter-wjs"));

            }

            ;

            run();


        }
    };
});
pajhwokApp.directive('loginBlock', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<div class="login-block" ng-show="showloginout"><span class="login"><div class="panel"><a ng-click="loginDetail.login=true"  id="login_pop">{{userSelectedLanguage["data"]["login"]}}</a>' +
            '<a ng-click="loginDetail.register=true" id="join_pop">{{userSelectedLanguage["data"]["register"]}}</a></div></span></div>'


    }
}]);
pajhwokApp.directive('similarCategory', ['$appService', '$compile', function ($appService, $compile, $scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<div ng-switch="similarCategoryVisible"><div ng-switch-when="true" class="multiple-videos" ><div class="multiple-video-1" ng-repeat="newsData in similarCategory"><div class="only-video">' +
            '<a ng-click="setCountAndPath(newsData)"><span class="multiple-video-thumb" similarmedia ></span></a></div><div class="popular-lockup-content"><h3 class="popular-lockup-title"><a href="#/news?newsid={{newsData._id}}" ><p class="popular-small-heading">' +
            '{{newsData.title}}</p></a></h3><div class="popular-video-meta"><p class="small-meta-info"><span class="deemphasized-text-name1">{{userSelectedLanguage["data"]["by"]}}' +
            '<a class="user-name ng-binding" ng-hide="!newsData.__createdby">{{newsData["__createdby"]["firstname"]}}</a><a  class="user-name" ng-hide="!newsData.guest">{{newsData.guest.name}}</a></span><span class="deemphasized-text ng-binding">{{newsData["__createdon"]}}</span></p>' +
            '<p class="small-comment"><span><a class="video-comments" >{{newsData["commentcount"]}}{{userSelectedLanguage["data"]["comments"]}}</a></span><span class="video-views">{{newsData["clickcount"]}}' +
            '{{userSelectedLanguage["data"]["views"]}}</span></p></div></div></div></div>',
        compile:function () {
            return{
                pre:function ($scope) {
                    $scope.setCountAndPath = function (data) {

                        window.location.href = '#/news?newsid=' + data._id;
                    }
                }
            }
        }
    }
}]);
pajhwokApp.directive('afganNews', ['$appService', '$compile', function ($appService, $compile, $scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<div class="left-news-wrapper"><ul class="news-wrapper"><li class="news-block" ng-repeat="newsData in recentStoriesDetail"><af-news></af-news></li></ul>' +
            '<div id="loadMore">&nbsp;</div></div>',
        compile:function () {
            return{
                pre:function ($scope) {
                    $scope.setCountAndPath = function (data) {

                        window.location.href = '#/news?newsid=' + data._id;
                    }
                }, post:function ($scope) {
                    $(window).scroll(function () {
                        if ($("#loadMore").offset()) {
                            if ($(window).scrollTop() + $(window).height() > $("#loadMore").offset().top) {
                                if ($scope.recent.totalCount > $scope.recent.cursor) {
                                    $scope.getMore();
                                }
                            }
                        }
                    });

                }
            }
        }
    }
}]);
pajhwokApp.directive('afganNewsSearch', ['$appService', '$compile', function ($appService, $compile, $scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<div class="left-news-wrapper"><ul class="news-wrapper"><li class="news-block" ng-repeat="newsData in searchedNews"><af-news></af-news></li></ul>' +
            '<div id="loadMoreSearch">&nbsp;</div></div>',
        compile:function () {
            return{
                pre:function ($scope) {
                    $scope.getMoreSearchCall();
                    $scope.setCountAndPath = function (data) {

                        window.location.href = '#/news?newsid=' + data._id;
                    }
                }, post:function ($scope) {
//                    $(window).scroll(function () {
//                        if ($("#loadMoreSearch").offset()) {
//                            if ($(window).scrollTop() + $(window).height() > $("#loadMoreSearch").offset().top) {
//                                if ($scope.recent.totalCount > $scope.recent.cursor && $scope.searchedNews.length>1) {
//                                    $scope.getMoreSearchCall();
//                                }
//                            }
//                        }
//                    });

                }
            }
        }
    }
}]);
pajhwokApp.directive('afNews', ['$appService', function ($appService, $scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<ul class="news-ul"><li class="meta-block"><h2 class="headline-block module line-clamp  js textoverflowclamp"><a   href="#/news?newsid={{newsData._id}}">' +
            '<p class="clampjs"><span ng-show="\'5304a09a476f9b995eb672f1\'==selectedTrans">{{newsData.title|limitTo:70}}<span ng-show="newsData.title.length>=70">...</span></span><span ng-hide="\'5304a09a476f9b995eb672f1\'==selectedTrans">{{newsData.title|limitTo:100}}<span ng-show="newsData.title.length>=100">...</span></span></p></a></h2><p ng-show="\'5304a09a476f9b995eb672f1\'==selectedTrans" class="cat-block"><a>{{newsData["category"]["en_title"]}}</a></p>' +
            '<p ng-show="selectedTrans == \'5304a0ec476f9b995eb672f3\'" class="cat-block"><a>{{newsData["category"]["dr_title"]}}</a></p>' +
            '<p ng-show="selectedTrans == \'5304a0cb476f9b995eb672f2\'" class="cat-block"><a>{{newsData["category"]["ps_title"]}}</a></p></li>' +
            '<li><p class="info-block"><span ng-hide="!newsData.__createdby" class="deemphasized-text-name1">{{userSelectedLanguage["data"]["by"]}}&nbsp;{{newsData["__createdby"]["firstname"]}}</span><span ng-hide="!newsData.guest" class="deemphasized-text-name1">{{userSelectedLanguage["data"]["by"]}}&nbsp;{{newsData.guest.name}}</span>' +
            '</p><span class="time-date-block"><span >{{newsData["__createdon"]}}</span></span></li><li class="short-desc-block"><p ng-show="newsData.description" ng-click="setCountAndPath(newsData)"class="desc-block" ng-bind="newsData.description"></p>' +
            '<span ng-show="newsData.description" ng-click="setCountAndPath(newsData)" class="more-block"><a>{{userSelectedLanguage["data"]["readmore"]}}</a></span></li><li class="media-block" test></li><li class="social-block"><ul class="social-ul"><li class="sp-block"><div class="text-sp"><span>{{newsData["clickcount"]}}&nbsp;{{userSelectedLanguage["data"]["views"]}}</span></div></li>' +
            '<li class="sp-block"><div class="text-sp"><span class="cursor-pointer" ng-click="setCountAndPath(newsData)">{{newsData["commentcount"]}}&nbsp;{{userSelectedLanguage["data"]["comments"]}}</span></div></li><li class="sp-block-img"><div addthis:url="http://afghansvote.af/#/news?newsid={{newsData._id}}" addthis:title="{{newsData.title}}" class="addthis_toolbox addthis_default_style addthis_32x32_style">' +
            '<a class="addthis_button_preferred_1"></a></div></li><li class="sp-block-img"><div addthis:url="http://afghansvote.af/#/news?newsid={{newsData._id}}" addthis:title="{{newsData.title}}" class="addthis_toolbox addthis_default_style addthis_32x32_style">' +
            '<a class="addthis_button_preferred_2"></a></div></li>' +
            '<li ng-click="updateLikeCount(newsData,false)" ng-show="newsData.likestatus" class="sp-block-img cursor-pointer"><span><img src="images/like-blue.png">&nbsp;{{newsData["likecount"]}}</span></li>' +
            '<li ng-hide="newsData.likestatus" ng-click="updateLikeCount(newsData,true)"class="sp-block-img cursor-pointer"><span><img  src="images/Icon_Like.png">&nbsp;{{newsData["likecount"]}}</span></li>' +
            '<li ng-click="updateFlagCount(newsData,false)" ng-show="newsData.flagstatus" class="sp-block-img cursor-pointer"><span><img src="images/flag-blue.png" width="30px" height="30px"></span></li>' +
            '<li ng-hide="newsData.flagstatus" ng-click="updateFlagCount(newsData,true)" class="sp-block-img cursor-pointer"><span><img src="images/flag.png" width="30px" height="30px"></span></li>' +
            '</ul></li></ul>',
        compile:function () {
            return{
                pre:function ($scope) {
				
                    $scope.setCountAndPath = function (data) {

                        window.location.href = '#/news?newsid=' + data._id;
                    }
                    $scope.updateLikeCount = function (post, like) {
                        var currentSession = $scope.getSession();
                        if (!currentSession) {
                            $scope.alert.bShowAlertPopup = true;
                            $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.loginrequired;
                        }
                        else {
                            var query = {};
                            $scope.boolinc = false;
                            if (like) {
                                query.operations = [
                                    {"_id":post._id, "$inc":{"likecount":1, "activitycount":1.5}, "likeby":[
                                        {"_id":currentSession["cuserid"]}
                                    ]}
                                ];

                                $scope.boolinc = true;

                            }
                            else {
                                query.operations = [
                                    {"_id":post._id, "$inc":{"likecount":-1, "activitycount":-1.5}, "likeby":[
                                        {"_id":currentSession["cuserid"], "__type__":"delete"}
                                    ]}
                                ];

                                $scope.boolinc = false;
                            }
                            query.table = "News__pajhwok";
                            $appService.save(query, ASK, OSK, currentSession['usk'], function (data) {
                                if (data.response.update && data.response.update.length) {
                                    if ($scope.boolinc) {
                                        $scope.newsData["likecount"] = $scope.newsData["likecount"] + 1;
                                        $scope.newsData["likestatus"] = true;
                                    }
                                    else {
                                        if ($scope.newsData["likecount"])
                                            $scope.newsData["likecount"] = $scope.newsData["likecount"] - 1;
                                        $scope.newsData["likestatus"] = false;
                                    }
                                }
                            });
                        }
                    }
                    $scope.updateFlagCount = function (record, flag) {
                        var currentSession = $scope.getSession();
                        if (!currentSession) {
                            $scope.alert.bShowAlertPopup = true;
                            $scope.alert.alertPopupMsg = $scope.userSelectedLanguage.data.loginrequired;
                            return false;
                        }
                        var query = {};
                        query.table = "News__pajhwok";
                        var columnArray;
                        $scope.boolflg = false;
                        if (!flag) {
                            columnArray = [
                                {"_id":record._id, "$inc":{"activitycount":-5, "flaggedcount":-1}, "flaggedby":[
                                    {"_id":currentSession["cuserid"], "__type__":"delete"}
                                ]}
                            ];
                            $scope.boolflg = false;

                        }
                        else {
                            columnArray = [
                                {"_id":record._id, "$inc":{"activitycount":5, "flaggedcount":1}, "flaggedby":[
                                    {"_id":currentSession["cuserid"]}
                                ]}
                            ];
                            $scope.boolflg = true;
                        }
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                        query.operations = columnArray;
                        $appService.save(query, ASK, OSK, null, function (dataUpdate) {
                            if (dataUpdate.response.update && dataUpdate.response.update.length > 0) {
                                if ($scope.boolflg) {
                                    $scope.newsData["flagstatus"] = true;
                                }
                                else {
                                    $scope.newsData["flagstatus"] = false;
                                }
                            }

                        }, function (err) {
                        });
                    }

                }
            }
        }

    }

}]);


pajhwokApp.directive('smsApp', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<div class="sms-app"><h3 class="sms-heading">{{userSelectedLanguage.data.sendnewsonsms}}</h3><div class="sms-logo">' +
            ' <span ng-show="\'5304a09a476f9b995eb672f1\'==selectedTrans" ><img src="images/smsen.png" class="sms-img"></span>' +
            '<span ng-show="selectedTrans == \'5304a0ec476f9b995eb672f3\'"><img src="images/smsdr.png" class="sms-img"></span>' +
            '<span ng-show="selectedTrans == \'5304a0cb476f9b995eb672f2\'"><img src="images/smsps.png" class="sms-img"></span></div></div>'


    }
}]);

pajhwokApp.directive('mapNewsList', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<div class="map-news-detail"><div class="news-wrapper"><h5 class="news-h5">{{userSelectedLanguage.data.report}}<span>{{userSelectedLanguage.data.mapreportheading}}</span></h5><popup-dir></popup-dir>' +
            '<table class="table-list">' +
            '<thead><tr><th scope="col" class="title">{{userSelectedLanguage.data.title}}</th><th scope="col" class="location">{{userSelectedLanguage.data.location}}</th>' +
            '<th scope="col" class="location">{{userSelectedLanguage.data.category}}</th><th scope="col" class="date">{{userSelectedLanguage.data.date}}</th></tr></thead>' +
            '<tbody><tr ng-repeat="newsData in mapRecentStories">' +
            '<td><span ng-hide="\'5304a09a476f9b995eb672f1\'==selectedTrans">...</span><a ng-click="showLatestinPopup(newsData)">{{newsData.title| limitTo:80}}</a><span ng-show="\'5304a09a476f9b995eb672f1\'==selectedTrans">...</span></td><td >{{newsData.displayLocationName}}</td><td ng-show="newsData.subcategory">{{newsData.displayCategoryName}}</td><td>{{newsData.__createdon| limitTo:10}}</td>' +
            '</tr>	</tbody></table></div></div>',
        compile:function () {
            return{
                pre:function ($scope) {
                    $scope.showLatestinPopup = function (newsData) {
                        $scope.cPopupContent = newsData;
                        $scope.showlatestPopup = true;
                    }
                    $scope.hideLatestinPopup = function () {
                        $scope.cPopupContent = {};
                        $scope.showlatestPopup = false;
                    }
                }
            }
        }
    }
}]);

pajhwokApp.directive('popupDir', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<div ng-show="showlatestPopup" class="popup-manage1">' +
            ' <p class="report-when-where"> <span class="r_date"><img class="img-time" src="images/time-pic">{{cPopupContent.__createdon.substring(0,10)}}</span><span class="r_location" style="float: right;"><img class="img-time" src="images/place-pic">{{cPopupContent.displayLocationName}}	<span class="cursor-pointer" ng-click="hideLatestinPopup()">X</span></span> 		</p> 			<!-- start report media --><div class="report-description-text">{{cPopupContent.title}}<br> </div>		 <div class="report-category-list"><p style="color:blue" >{{cPopupContent.displayCategoryName}}</p></div>' +
            '</div>'
    }
}]);

pajhwokApp.directive('smallNewsList', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<div class="recent-wrapper"><div class="lockup-content"><h3 class="lockup-title"><a href="#/news?newsid={{newsData._id}}" class="" >' +
            '<p class="news-headline">{{newsData.title}}</p></a> </h3><p class="video-meta"><span class="meta-info">' +
            '<span ng-hide="!newsData.__createdby" class="deemphasized-text-name">{{userSelectedLanguage["data"]["by"]}}<span class="user-name">{{newsData["__createdby"]["firstname"]}}</span></span>' +
            '<span ng-hide="!newsData.guest" class="deemphasized-text-name">{{userSelectedLanguage["data"]["by"]}} <span class="user-name">{{newsData.guest.name}}</span></span>' +
            '</span>' +
            '<span class="deemphasized-text">{{newsData["__createdon"]}}</span></span></p><p id="truncate" class="recent-description">{{newsData.description}}</p><a href="#/news?newsid={{newsData._id}}" class="readmore">{{userSelectedLanguage["data"]["readmore"]}}</a></div></div>'

    }
}]);














