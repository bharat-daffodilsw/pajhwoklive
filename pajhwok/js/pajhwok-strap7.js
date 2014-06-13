var BAAS_SERVER;
BAAS_SERVER = "/rest";
var appStrapDirectives = angular.module('$appstrap.directives', []);
var appStrapServices = angular.module('$appstrap.services', []);
var ASK = "5301e64492f51ed71842a5d1";
var OSK = "530459b8aed74b22457bad37";
'use strict';
appStrapDirectives.directive('appCountrySelect', ['$compile', function ($compile) {
    return {
        restrict:"E",
        replace:true,
        scope:true,
        template:'<select id="countryselect" name="country" ng-model="row.country" ng-change="getStates(row.country)">' +
            '<option ng-repeat="country in country_options" value="{{country._id}}" >{{country.name}}</option>' +
            '</select>',
        compile:function () {
            return {
                pre:function ($scope) {
                }
            }
        }
    }
}]);

appStrapDirectives.directive('appStateSelect', ['$compile', function ($compile) {
    return {
        restrict:"E",
        replace:true,
        scope:true,
        template:'<table>' +
            '<tr><td>{{transbutton.country}}</td><td><app-country-select></app-country-select></td></tr>' +
            '<tr><td>{{transbutton.state}}</td><td>' +
            '<select name="state" ng-model="row.state" ng-change="getCities(row.state)">' +
            '<option ng-repeat="state in state_options" value="{{state._id}}">{{state.name}}</option></select></td></tr>' +
            '<tr><td>{{transbutton.city}}</td><td><select name="city" ng-model="row.city">' +
            '<option ng-repeat="city in city_options" value="{{city._id}}">{{city.name}}</option></select></td>' +
            '</tr>' +
            '</table>',
        compile:function () {
            return {
                pre:function ($scope) {

                }
            }
        }
    }
}]);

/**
 * App Services
 */
appStrapServices.factory('$appService', [
    '$rootScope',
    '$http',
    '$timeout',
    function ($rootScope, $http, $timeout) {
        var $appService = {

        };
        $appService.login = function (username, password, callback) {
            var params = {};
            params.username = username;
            params.password = password;
            params.usergroup = 'baas';

            this.getDataFromJQuery(BAAS_SERVER + "/login", params, "GET", "JSON", "Loading...", function (callBackData) {
                callback(callBackData);
            }, function (jqxhr, error) {
                alert("Error:" + JSON.stringify(jqxhr));
            });
        };

        $appService.logOut = function (callBack) {
            this.getDataFromService("/backend/task_manager/logout", {}, "Logout...", callBack);
        }

        $appService.getUser = function (state, userprofileid, sortField, sortOrder, pageNumber, rowCount, callBack) {
            var that = this;
            var childCountthis = this;
            var usk;
            if (typeof(Storage) !== "undefined") {
                //usk = localStorage.usk;
                usk = $appService.checkCookie();
            }

            var hostedMode = false;
            var serviceURL = "/data";
            var CU_query = {"table":"users__baas", "filter":{"_id":"{_CurrentUserId}"}, "columns":["_id", "username", "picture", "emailid", "firstname", "lastname", "status", "isadmin", {"expression":"socialinfo", "columns":["userid"]}]};
            var serviceCallBack;
            if (hostedMode) {
                if (userprofileid == 'currentuser') {
                    var user = {"response":{"_id":"521c9b34bfbe4e7854000005", "username":"PP", "firstname":"Stan", "lastname":"Gursky", "designation":"CEO", "organization":"Marketech Inc.", "picture":[
                        {"key":"522050840b75e9eb3800000d", "name":"user_profile.png"}
                    ], "row":{"_id":"521c9b34bfbe4e7854000005", "username":"Stangursky", "firstname":"Stan", "lastname":"Gursky", "picture":[
                        {"key":"522050840b75e9eb3800000d", "name":"user_profile.png"}
                    ], "emailid":"abc@gmail.com", "phoneno":123456789, "organization":"UserOrg1", "designation":"Senior Associate IT", "membershipdate":"31/07/2012", "renewaldate":"1/08/2013"}, "login":true}, "status":"ok", "code":200};
                    callBack(user.response);
                    return;
                }
            } else {
                if (userprofileid == 'newuser' || userprofileid == 'loggedinuser') {

                    serviceCallBack = function (userInfo) {
                        if (userInfo.forgotpasswordcode)
                            delete userInfo.forgotpasswordcode;
                        userInfo.row = {};
                        // *done The “Member since” field should populate automatically when you create an account. But you need to still be able to manually override it too.
                        var today = new Date();
                        var dd = today.getDate();
                        var mm = today.getMonth() + 1; //January is 0!
                        var yyyy = today.getFullYear();
                        if (dd < 10) {
                            dd = '0' + dd
                        }
                        if (mm < 10) {
                            mm = '0' + mm
                        }
                        today = mm + '/' + dd + '/' + yyyy;
                        userInfo.row.membershipdate = today;
                        userInfo.row.watchlistprivacy = true;
                        callBack(userInfo);

                    }
                }
                else if (userprofileid == 'currentuser') {

                    serviceCallBack = function (userInfo) {
                        if (userInfo.forgotpasswordcode)
                            delete userInfo.forgotpasswordcode;
                        userInfo.row = angular.copy(userInfo);
                        callBack(userInfo);

                    }
                }
                else if (userprofileid == 'adminuser') {
                    serviceCallBack = function (userInfo) {
                        if (userInfo.forgotpasswordcode)
                            delete userInfo.forgotpasswordcode;
                        var userDataServiceURL = "/data";
                        var query = {"table":"users__baas", "columns":["_id", "username", "picture", "firstname", "lastname", "emailid", "status", "isadmin"], "$count":1};
                        if (sortField) {
                            var sortexpression = {};
                            sortexpression[sortField] = (sortOrder == '') ? 'asc' : sortOrder;
                            query = {"table":"users__baas", "orders":[sortexpression], "columns":["_id", "username", "picture", "emailid", "firstname", "lastname", "status", "isadmin"], "$count":1};
                        }
                        var limitexpression = {}
                        if (pageNumber) {
                            var rowIndex = (pageNumber - 1) * rowCount;
                            query["max_rows"] = rowCount;
                            query["cursor"] = rowIndex;
                        }
                        if ($("#searchbox_input").val()) {
                            var searchbox_input = $("#searchbox_input").val().trim()
                            if (searchbox_input.length > 0) {
                                query["filter"] = {"$or":[
                                    {"emailid":{"$regex":"(" + searchbox_input + ")", "$options":"-i"}},
                                    {"firstname":{"$regex":"(" + searchbox_input + ")", "$options":"-i"}},
                                    {"lastname":{"$regex":"(" + searchbox_input + ")", "$options":"-i"}}
                                ]};
                            }
                        }
                        var queryParams = {query:JSON.stringify(query), "ask":ASK, "usk":usk, "osk":OSK};
                        that.getDataFromJQuery(BAAS_SERVER + userDataServiceURL, queryParams, "GET", "JSON", "Loading...", function (petSocialUserData) {
                            var petSocialUserDataData = petSocialUserData.data;
                            userInfo.childCount = petSocialUserData.$count;
                            var count = petSocialUserDataData ? petSocialUserDataData.length : 0;

                            for (var i = 0; i < count; i++) {
                                var r = petSocialUserDataData[i];
                                if (r['renewaldate'] && typeof(r['renewaldate']) !== 'undefined') {
                                    r['renewaldate'] = r['renewaldate'];
                                }
                            }

                            var metadata = {"type":"table", "table":"domains__frontend", "columns":[
                                {"_id":"52032a47a23b2cf815000002", "type":"string", "expression":"firstname", "funName":"userSort", "sortable":true, "replicate":true, "primary":true, "columns":[], "label":"First Name", "width":112, "visibility":"Both", cellTemplate:"<a href=\"/edituser?userid={{row._id}}\" style='margin-right: 10%;text-decoration:none;'>{{row.firstname}}</a>", "$$hashKey":"07F"},
                                {"_id":"52032a47a23b2cf815000002", "type":"string", "expression":"lastname", "funName":"userSort", "sortable":true, "replicate":true, "primary":true, "columns":[], "label":"Last Name", "width":112, "visibility":"Both", cellTemplate:"<a href=\"/edituser?userid={{row._id}}\" style='margin-right: 10%;text-decoration:none;'>{{row.lastname}}</a>", "$$hashKey":"07F"},
                                {"_id":"520b689c4577828418000001", "type":"string", "expression":"emailid", "funName":"userSort", "sortable":true, "label":"Email", "width":196, "visibility":"Both"},
                                {"_id":"520b689c4577828418000001", "type":"string", "expression":"phoneno", "funName":"userSort", "sortable":true, "label":"Phone", "width":115, "visibility":"Both"},
                                {"_id":"520e0b9b72058ac80b000001", "type":"date", "expression":"renewaldate", "funName":"userSort", "sortable":true, "label":"Renewal for date", "width":138, "visibility":"Both"},
                                {"_id":"520b689c4577828418000001", "expression":"actions", "label":"Actions", "width":260, "visibility":"Both", cellTemplate:"<span class='anchor-span' ng-show=row.status ng-click=\"userBlock(row,'status',false)\" style='width: 95px;display: block;float: left;'>Block user</span><span class='anchor-span' ng-hide=row.status ng-click=\"userBlock(row,'status',true)\" style='width: 95px;display: block;float: left;'>Unblock user</span><a href=\"/edituser?userid={{row._id}}\" style='margin-right: 10%;'>Edit user</a>  <span class='anchor-span' ng-click=\"userBlock(row,'userdelete',true)\" style='margin-right: 10%;' ng-hide=row.userdelete>Delete user</span><span class='anchor-span' ng-show=row.userdelete ng-click=\"userBlock(row,'userdelete',false)\" style='margin-right: 10%;'>Undelete</span>"}
                            ]}

                            var view = {data:mtmUserData, metadata:metadata};
                            userInfo.view = view;
                            callBack(userInfo);

                        }, function (jqxhr, error) {
                            callBack(error);
                        });
                    }

                }
                else {

                    serviceCallBack = function (userInfo) {
                        if (userInfo.forgotpasswordcode)
                            delete userInfo.forgotpasswordcode;
                        var pUserId = userprofileid;
                        var userDataServiceURL = "/data";
                        var query = {"table":"users__baas", "filter":{_id:pUserId}, "columns":["_id", "username", "emailid", "picture", "firstname", "lastname", "status", "isadmin"]};
                        var queryParams = {query:JSON.stringify(query), "ask":ASK, "usk":usk, "osk":OSK};
                        that.getDataFromJQuery(BAAS_SERVER + userDataServiceURL, queryParams, "GET", "JSON", "Loading...", function (mtmUserData) {

                            userInfo.row = mtmUserData.data[0];
                            callBack(userInfo);

                        }, function (jqxhr, error) {
                            callBack(error);
                        });
                    }
                }

            }
            var parameterArr = {query:JSON.stringify(CU_query), "ask":ASK, "usk":usk, "osk":OSK};
            this.getDataFromJQuery(BAAS_SERVER + serviceURL, parameterArr, "GET", "JSON", "Loading...", function (callBackData) {
                serviceCallBack(callBackData.data[0]);
            }, function (jqxhr, error) {
                callBack(error);
            });
        }

        $appService.save = function (data, ask, osk, usk, callBack) {
            if (!ask) {
                throw "No ask found for saving";
            }
            // return;
            var params;
            if(usk){

                params = {"updates":JSON.stringify(data), "ask":ask, "osk":osk, "usk":usk};
            }
            else
            {
                 params = {"updates":JSON.stringify(data), "ask":ask, "osk":osk};

            }
            var that = this;

            var url = BAAS_SERVER + "/data";
            this.getDataFromJQuery(url, params, "POST", "JSON", function (callBackData) {
                callBack(callBackData);
            });
        }

        $appService.getDataFromService = function (pUrl, pData, pBusyMessage, pCallBack) {
            var payLoad;
            if (pData == null) {
                pData = {};
            }
            pData.osk = this.osk;
            pData.ask = this.ask;
            var payLoad = $.param(pData);
            var config = {
                headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}
            }
            if (pBusyMessage) {
                $rootScope.busymessage = pBusyMessage;
                $rootScope.showbusymessage = true;
                if (!$rootScope.$$phase) {
                    $rootScope.$apply();
                }
            }
            $http.post(pUrl, payLoad, config).success(
                function (data) {
                    $rootScope.showbusymessage = false;
                    pCallBack(data);

                }).error(function (data) {
                    //alert("Error in Fetching service:[" + pUrl + "], Data[" + data + "]");
                    $rootScope.showbusymessage = false
                    if (!$rootScope.$$phase) {
                        $rootScope.$apply();
                    }
                    pCallBack(data);
                });
        }


        $appService.delete_cookie = function (name) {
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        };

        $appService.checkCookie = function () {
            return $appService.getCookie("usk");

        }
        $appService.getCookie = function (usk) {
            var c_value = document.cookie;
            var c_start = c_value.indexOf(" " + usk + "=");
            // alert('c_start='+c_start+" c_value="+c_value+" usk="+usk);
            if (c_start == -1) {
                c_start = c_value.indexOf(usk + "=");
            }
            if (c_start == -1) {
                c_value = null;
            }
            else {
                c_start = c_value.indexOf("=", c_start) + 1;
                var c_end = c_value.indexOf(";", c_start);
                if (c_end == -1) {
                    c_end = c_value.length;
                }
                c_value = unescape(c_value.substring(c_start, c_end));
            }
            return c_value;
        }
        $appService.getDataFromJQuery = function (url, requestBody, callType, dataType, callback, errcallback) {
            $.support.cors = true;

            $.ajax({
                type:callType,
                url:url,
                data:requestBody,
                crossDomain:true,
                success:function (returnData, status, xhr) {
                    callback(returnData);
                    $rootScope.showbusymessage = false;
                    if (!$rootScope.$$phase) {
                        $rootScope.$apply();
                    }
                },
                error:function (jqXHR, exception) {
                    if (jqXHR.status == 417 && jqXHR.responseText) {
                        var error_resp = JSON.parse(jqXHR.responseText);
                        if (error_resp.code && error_resp.code == 34) {
                            $appService.delete_cookie('usk');
                            window.location.href = "/login";
                        }
                    }
                    $rootScope.showbusymessage = false;
                    if (!$rootScope.$$phase) {
                        $rootScope.$apply();
                    }
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
        return $appService;
    }
]);
getURLParam = function (strParamName) {
    var strReturn = "";
    var strHref = window.location.href;
    if (strHref.indexOf("?") > -1) {
        var strQueryString = strHref.substr(strHref.indexOf("?"));
        var aQueryString = strQueryString.split("&");
        for (var iParam = 0; iParam < aQueryString.length; iParam++) {
            if (
                aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > -1) {
                var aParam = aQueryString[iParam].split("=");
                strReturn = aParam[1];
                break;
            }
        }
    }
    return unescape(strReturn);
}
