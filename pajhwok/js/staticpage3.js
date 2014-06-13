pajhwokApp.directive('aboutUs', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<div><about-us-en ng-show="\'5304a09a476f9b995eb672f1\'==selectedTrans"></about-us-en>' +
            '<about-us-ps ng-show="selectedTrans == \'5304a0cb476f9b995eb672f2\'"></about-us-ps>' +
            '<about-us-dr ng-show="selectedTrans == \'5304a0ec476f9b995eb672f3\'"></about-us-dr></div>'
    }
}]);

pajhwokApp.directive('contactUs', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<div><contact-us-en ng-show="\'5304a09a476f9b995eb672f1\'==selectedTrans"></contact-us-en>' +
            '<contact-us-ps ng-show="selectedTrans == \'5304a0cb476f9b995eb672f2\'"></contact-us-ps>' +
            '<contact-us-dr ng-show="selectedTrans == \'5304a0ec476f9b995eb672f3\'"></contact-us-dr></div>'
    }
}]);

pajhwokApp.directive('howToReport', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<div><report-en ng-show="\'5304a09a476f9b995eb672f1\'==selectedTrans"></report-en>' +
            '<report-dr ng-show="selectedTrans == \'5304a0cb476f9b995eb672f2\'"></report-dr>' +
            '<report-ps ng-show="selectedTrans == \'5304a0ec476f9b995eb672f3\'"></report-ps></div>'
    }
}]);
pajhwokApp.directive('guideLine', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<div><guide-line-en ng-show="\'5304a09a476f9b995eb672f1\'==selectedTrans"></guide-line-en>' +
            '<guide-line-dr ng-show="selectedTrans == \'5304a0cb476f9b995eb672f2\'"></guide-line-dr>' +
            '<guide-line-ps ng-show="selectedTrans == \'5304a0ec476f9b995eb672f3\'"></guide-line-ps></div>'
    }
}]);

pajhwokApp.directive('guideLineEn', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        templateUrl:'../guideen.html'
    }
}]);
pajhwokApp.directive('guideLinePs', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        templateUrl:'../guideps.html'
    }
}]);
pajhwokApp.directive('guideLineDr', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        templateUrl:'../guidedr.html'
    }
}]);



pajhwokApp.directive('reportEn', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        templateUrl:'../howtoreporten.html'
    }
}]);
pajhwokApp.directive('reportDr', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        templateUrl:'../howtoreportdr.html'
    }
}]);
pajhwokApp.directive('reportPs', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        templateUrl:'../howtoreportps.html'
    }
}]);

pajhwokApp.directive('whatIsFraud', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<div><fraud-en ng-show="\'5304a09a476f9b995eb672f1\'==selectedTrans" ></fraud-en>' +
            '<fraud-ps ng-show="selectedTrans == \'5304a0ec476f9b995eb672f3\'" ></fraud-ps>' +
            '<fraud-dr ng-show="selectedTrans == \'5304a0cb476f9b995eb672f2\'" ></fraud-dr>' +
            '</div>'
    }
}]);

//ng-show="\'5304a09a476f9b995eb672f1\'==selectedTrans"

pajhwokApp.directive('aboutUsEn', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        templateUrl:'../enaboutus.html'
    }
}]);
pajhwokApp.directive('aboutUsPs', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        templateUrl:'../psaboutus.html'
    }
}]);

pajhwokApp.directive('aboutUsDr', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        templateUrl:'../draboutus.html'
    }
}]);
pajhwokApp.directive('contactUsEn', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        templateUrl:'../encontactus.html'
    }
}]);
pajhwokApp.directive('contactUsPs', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        templateUrl:'../pscontactus.html'
    }
}]);
pajhwokApp.directive('contactUsDr', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        templateUrl:'../drcontactus.html'
    }
}]);
pajhwokApp.directive('fraudEn', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        templateUrl:'../enfraud.html'
    }
}]);
pajhwokApp.directive('fraudPs', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        templateUrl:'../psfraud.html'
    }
}]);
pajhwokApp.directive('fraudDr', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        templateUrl:'../drfraud.html'
    }
}]);
//pajhwokApp.directive('contactUsPs', [function ($scope) {
//    return{
//        restrict:"E",
//        replace:true,
//        templateUrl:'../pscontactus.html'
//    }
//}]);
//pajhwokApp.directive('contactUsDr', [function ($scope) {
//    return{
//        restrict:"E",
//        replace:true,
//        templateUrl:'../drcontactus.html'
//    }
//}]);



