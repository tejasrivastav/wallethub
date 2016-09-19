var webapp;
(function (webapp) {
    var controllers;
    (function (controllers) {
        var DonorListController = (function () {
            function DonorListController($scope, DataService, PhoneUtil, CurrencyUtil, ObjUtil) {
                this.$scope = $scope;
                this.DataService = DataService;
                this.PhoneUtil = PhoneUtil;
                this.CurrencyUtil = CurrencyUtil;
                this.ObjUtil = ObjUtil;
                $scope.sortBy = null;
                DataService.fetchDonorsList()
                    .then(function (data) {
                    $scope.donors = data;
                    $scope.donors.forEach(function (donor) {
                        donor.phoneNumber = PhoneUtil.format(donor.phoneNumber);
                        donor.donation = {
                            inString: CurrencyUtil.format(donor.donation),
                            inNumber: donor.donation
                        };
                    });
                    var userdonation = DataService.getCurrentDonation();
                    if (!ObjUtil.isEmptyObj(userdonation)) {
                        var currentDonation = {
                            name: userdonation.name,
                            phoneNumber: userdonation.phone,
                            donation: {
                                inString: userdonation.donation.total,
                                inNumber: CurrencyUtil.parse(userdonation.donation.total)
                            }
                        };
                        $scope.donors.push(currentDonation);
                    }
                });
            }
            DonorListController.$inject = [
                "$scope",
                "DataService",
                "PhoneUtil",
                "CurrencyUtil",
                "ObjUtil"
            ];
            return DonorListController;
        })();
        controllers.DonorListController = DonorListController;
    })(controllers = webapp.controllers || (webapp.controllers = {}));
})(webapp || (webapp = {}));
/// <reference path="../typings/main.d.ts" />
var webapp;
(function (webapp) {
    var services;
    (function (services) {
        var DataService = (function () {
            function DataService($http) {
                this.$http = $http;
                this.currentDonation = {};
            }
            DataService.prototype.getCurrentDonation = function () {
                return this.currentDonation;
            };
            DataService.prototype.setCurrentDonation = function (_currentDonation) {
                this.currentDonation = _currentDonation;
            };
            DataService.prototype.fetchDonorsList = function () {
                return this.$http.get("/wallethub/dummyData.json")
                    .then(function (respone) {
                    return respone.data;
                });
            };
            DataService.$inject = [
                "$http"
            ];
            return DataService;
        })();
        services.DataService = DataService;
    })(services = webapp.services || (webapp.services = {}));
})(webapp || (webapp = {}));
/// <reference path="../services/dataService.ts" />
var webapp;
(function (webapp) {
    var controllers;
    (function (controllers) {
        var ProfileConfirmController = (function () {
            function ProfileConfirmController($scope, $state, $stateParams, DataService, PhoneUtil, CurrencyUtil, ObjUtil) {
                this.$scope = $scope;
                this.$state = $state;
                this.$stateParams = $stateParams;
                this.DataService = DataService;
                this.PhoneUtil = PhoneUtil;
                this.CurrencyUtil = CurrencyUtil;
                this.ObjUtil = ObjUtil;
                if ($stateParams.auth !== true) {
                    $state.go("home");
                }
                $scope.credit = "";
                $scope.user = angular.copy(DataService.getCurrentDonation());
                var init = function () {
                    console.log("user", $scope.user);
                    $scope.user.phone = PhoneUtil.format($scope.user.phone);
                    $scope.user.donation.needy = CurrencyUtil.format($scope.user.donation.needy);
                    $scope.user.donation.hospital = CurrencyUtil.format($scope.user.donation.hospital);
                    $scope.user.donation.edu = CurrencyUtil.format($scope.user.donation.edu);
                    $scope.user.donation.total = CurrencyUtil.format($scope.user.donation.total);
                };
                if (!ObjUtil.isEmptyObj($scope.user)) {
                    init();
                }
                $scope.donate = function () {
                    DataService.setCurrentDonation($scope.user);
                    $state.go("donorList");
                };
            }
            ProfileConfirmController.$inject = [
                "$scope",
                "$state",
                "$stateParams",
                "DataService",
                "PhoneUtil",
                "CurrencyUtil",
                "ObjUtil"
            ];
            return ProfileConfirmController;
        })();
        controllers.ProfileConfirmController = ProfileConfirmController;
    })(controllers = webapp.controllers || (webapp.controllers = {}));
})(webapp || (webapp = {}));
var webapp;
(function (webapp) {
    var controllers;
    (function (controllers) {
        var ProfileFormController = (function () {
            function ProfileFormController($scope, $state, DataService, ObjUtil) {
                this.$scope = $scope;
                this.$state = $state;
                this.DataService = DataService;
                this.ObjUtil = ObjUtil;
                var defaultUser = {
                    name: "",
                    donation: {
                        needy: 1,
                        hospital: 1,
                        edu: 1
                    }
                };
                var user = DataService.getCurrentDonation();
                var bool = ObjUtil.isEmptyObj(user);
                $scope.user = bool ? defaultUser : user;
                $scope.calculateTotalValue = function () {
                    var needy = $scope.user.donation.needy;
                    var hospital = $scope.user.donation.hospital;
                    var edu = $scope.user.donation.edu;
                    $scope.user.donation.total = needy + hospital + edu;
                };
                $scope.calculateTotalValue();
                $scope.totalValueChanged = function () {
                    var needy = $scope.user.donation.needy;
                    var hospital = $scope.user.donation.hospital;
                    var edu = $scope.user.donation.edu;
                    var actualTotal = $scope.user.donation.total;
                    var total = needy + hospital + edu;
                    if (total === 0) {
                        $scope.user.donation.needy =
                            $scope.user.donation.hospital =
                                $scope.user.donation.edu = actualTotal / 3;
                    }
                    else {
                        var ratio = actualTotal / total;
                        $scope.user.donation.needy = $scope.user.donation.needy * ratio;
                        $scope.user.donation.hospital = $scope.user.donation.hospital * ratio;
                        $scope.user.donation.edu = $scope.user.donation.edu * ratio;
                    }
                };
                $scope.proceed = function (user) {
                    DataService.setCurrentDonation(user);
                    $state.go("confirm", { auth: true });
                };
            }
            ProfileFormController.$inject = [
                "$scope",
                "$state",
                "DataService",
                "ObjUtil"
            ];
            return ProfileFormController;
        })();
        controllers.ProfileFormController = ProfileFormController;
    })(controllers = webapp.controllers || (webapp.controllers = {}));
})(webapp || (webapp = {}));
var webapp;
(function (webapp) {
    var directives;
    (function (directives) {
        var Value = (function () {
            function Value(value1, value2, value3) {
                this.value1 = value1;
                this.value2 = value2;
                this.value3 = value3;
            }
            return Value;
        })();
        var CardInfo = (function () {
            function CardInfo(ObjUtil) {
                return {
                    template: "<div layout='row'>\
                                <div class='credit-info-container'>\
                                    <input ng-model='value1' ng-change='valueChanged()' maxlength='5'/> \
                                    <input ng-model='value2' ng-change='valueChanged()' maxlength='5' ng-disabled='isDisabled'/> \
                                    <input ng-model='value3' ng-change='valueChanged()' maxlength='5'/> \
                                </div>\
                            </div>",
                    restrict: 'E',
                    scope: {},
                    require: 'ngModel',
                    link: function (scope, iElement, iAttrs, ngModelCtrl) {
                        function view(value) {
                            if (ObjUtil.isEmptyObj(value))
                                return new Value("", "", "");
                            var values = value.split("-");
                            return new Value(values[0].toUpperCase(), values[1].toUpperCase(), values[2].toUpperCase());
                        }
                        function value(viewValue) {
                            var str = [];
                            for (var i in viewValue) {
                                str.push(viewValue[i].toUpperCase());
                            }
                            return str.join("-");
                        }
                        ngModelCtrl.$formatters.push(function (modelValue) {
                            if (!modelValue)
                                modelValue = {};
                            var value = view(modelValue);
                            return value;
                        });
                        ngModelCtrl.$render = function () {
                            scope.value1 = ngModelCtrl.$viewValue.value1;
                            scope.value2 = ngModelCtrl.$viewValue.value2;
                            scope.value3 = ngModelCtrl.$viewValue.value3;
                        };
                        scope.valueChanged = function () {
                            ngModelCtrl.$setViewValue({
                                value1: scope.value1,
                                value2: scope.value2,
                                value3: scope.value3
                            });
                        };
                        ngModelCtrl.$parsers.push(function (viewValue) {
                            viewValue = value(viewValue);
                            return viewValue;
                        });
                        iElement.bind("keyup", function (e) {
                            if (e.keyCode === 8) {
                                DeleteHandler(e);
                            }
                            else {
                                FocusHandler(e);
                            }
                        });
                    }
                };
            }
            CardInfo.$inject = [
                "ObjUtil"
            ];
            return CardInfo;
        })();
        directives.CardInfo = CardInfo;
        function DeleteHandler(e) {
            var target = e.srcElement;
            var isCursorInFirstPosition = target.selectionStart === 0 && target.selectionEnd === 0 ? true : false;
            if (isCursorInFirstPosition) {
                var previous = target.previousElementSibling;
                if (previous !== null) {
                    if (previous.tagName.toLowerCase() == "input") {
                        previous.focus();
                    }
                }
            }
        }
        function FocusHandler(e) {
            var target = e.srcElement;
            var maxLength = parseInt(target.attributes["maxlength"].value, 10);
            var currentLength = target.value.length;
            if (currentLength >= maxLength) {
                var next = target.nextElementSibling;
                if (next !== null) {
                    if (next.tagName.toLowerCase() == "input") {
                        next.focus();
                    }
                }
            }
        }
    })(directives = webapp.directives || (webapp.directives = {}));
})(webapp || (webapp = {}));
var webapp;
(function (webapp) {
    var directives;
    (function (directives) {
        var Currency = (function () {
            function Currency(CurrencyUtil) {
                return {
                    template: "<md-input-container> \
                            <label>{{label}}</label> \
                            <md-icon><i class='material-icons'>{{icon}}</i></md-icon> \
                            <input ng-model='value' ng-change='valueChanged()'> \
                          </md-input-container>",
                    restrict: 'E',
                    scope: {
                        label: "=",
                        icon: "@"
                    },
                    require: 'ngModel',
                    link: function (scope, iElement, iAttrs, ngModelCtrl) {
                        if (!scope.label)
                            scope.label = "";
                        if (!scope.icon)
                            scope.icon = "attach_money";
                        function view(value) {
                            return CurrencyUtil.format(value);
                        }
                        function value(viewValue) {
                            return CurrencyUtil.parse(viewValue);
                        }
                        ngModelCtrl.$formatters.push(function (modelValue) {
                            if (!modelValue)
                                modelValue = "$0";
                            var value = view(modelValue);
                            return value;
                        });
                        ngModelCtrl.$render = function () {
                            scope.value = ngModelCtrl.$viewValue;
                        };
                        scope.valueChanged = function () {
                            ngModelCtrl.$setViewValue(scope.value);
                            scope.value = view(value(scope.value));
                        };
                        ngModelCtrl.$parsers.push(function (viewValue) {
                            viewValue = value(viewValue);
                            return viewValue;
                        });
                    }
                };
            }
            Currency.$inject = [
                "CurrencyUtil"
            ];
            return Currency;
        })();
        directives.Currency = Currency;
    })(directives = webapp.directives || (webapp.directives = {}));
})(webapp || (webapp = {}));
var webapp;
(function (webapp) {
    var directives;
    (function (directives) {
        var PhoneNumber = (function () {
            function PhoneNumber(PhoneUtil) {
                return {
                    template: "<md-input-container> \
                            <label>Phone Number</label> \
                            <md-icon><i class='material-icons'>phone</i></md-icon> \
                            <input ng-model='value' ng-change='valueChanged()' maxlength='14'> \
                          </md-input-container>",
                    restrict: 'E',
                    scope: {},
                    require: 'ngModel',
                    link: function (scope, iElement, iAttrs, ngModelCtrl) {
                        function view(value) {
                            return PhoneUtil.format(value);
                        }
                        function value(viewValue) {
                            return PhoneUtil.parse(viewValue);
                        }
                        ngModelCtrl.$formatters.push(function (modelValue) {
                            if (!modelValue)
                                modelValue = "";
                            var value = view(modelValue);
                            return value;
                        });
                        ngModelCtrl.$render = function () {
                            scope.value = ngModelCtrl.$viewValue;
                        };
                        scope.valueChanged = function () {
                            ngModelCtrl.$setViewValue(scope.value);
                            scope.value = view(value(scope.value));
                        };
                        ngModelCtrl.$parsers.push(function (viewValue) {
                            var modelValue = value(viewValue);
                            return modelValue;
                        });
                        ngModelCtrl.$validators.validPhoneNumber = function (modelValue, viewValue) {
                            if (!modelValue) {
                                return false;
                            }
                            else if (modelValue.toString().length <= 9) {
                                return false;
                            }
                            else {
                                return true;
                            }
                        };
                    }
                };
            }
            PhoneNumber.$inject = [
                "PhoneUtil"
            ];
            return PhoneNumber;
        })();
        directives.PhoneNumber = PhoneNumber;
    })(directives = webapp.directives || (webapp.directives = {}));
})(webapp || (webapp = {}));
/// <reference path="./controllers/profile.form.ctrl.ts" />
/// <reference path="./controllers/profile.confirm.ctrl.ts" />
/// <reference path="./controllers/donor.list.ctrl.ts" />
var webapp;
(function (webapp) {
    var route;
    (function (route) {
        var Router = (function () {
            function Router($stateProvider, $urlRouterProvider) {
                this.$stateProvider = $stateProvider;
                this.$urlRouterProvider = $urlRouterProvider;
                $urlRouterProvider.otherwise("/404");
                var baseState = {
                    name: "base",
                    url: "",
                    abstract: true,
                    templateUrl: "/dist/partials/baseComponent.html"
                };
                var HomeState = {
                    name: "home",
                    url: "/home",
                    parent: "base",
                    templateUrl: "/dist/partials/home.html"
                };
                var profileState = {
                    parent: "base",
                    name: 'profile',
                    url: "/profile",
                    abstract: true,
                    template: "<div ui-view class='profile anim-in-out anim-fade'></div>"
                };
                var profileFormState = {
                    parent: 'profile',
                    name: 'form',
                    url: '/form',
                    templateUrl: '/dist/partials/profile-form.html',
                    controller: webapp.controllers.ProfileFormController
                };
                var profileConfirmState = {
                    parent: 'profile',
                    name: 'confirm',
                    url: '/confirm',
                    templateUrl: '/dist/partials/profile-confirm.html',
                    controller: webapp.controllers.ProfileConfirmController,
                    params: { auth: null }
                };
                var DonorListState = {
                    parent: "base",
                    name: "donorList",
                    url: "/donor/list",
                    templateUrl: "/dist/partials/donor-list.html",
                    controller: webapp.controllers.DonorListController
                };
                var RouteNotFound = {
                    name: "routeNotFound",
                    url: "/404",
                    templateUrl: "/dist/partials/404.html"
                };
                $stateProvider
                    .state(baseState)
                    .state(HomeState)
                    .state(profileState)
                    .state(profileFormState)
                    .state(profileConfirmState)
                    .state(DonorListState)
                    .state(RouteNotFound);
            }
            Router.$inject = [
                '$stateProvider',
                '$urlRouterProvider'
            ];
            return Router;
        })();
        route.Router = Router;
    })(route = webapp.route || (webapp.route = {}));
})(webapp || (webapp = {}));
var webapp;
(function (webapp) {
    var services;
    (function (services) {
        var PhoneUtil = (function () {
            function PhoneUtil() {
            }
            PhoneUtil.prototype.format = function (phoneNumber) {
                if (isNaN(phoneNumber))
                    return "";
                var phoneNumberInStr = phoneNumber.toString();
                var arrayOfNumbers = [];
                for (var i = 0; i < phoneNumberInStr.length; i++) {
                    arrayOfNumbers.push(phoneNumberInStr.charAt(i));
                }
                var set1 = arrayOfNumbers.splice(0, 3);
                var set2 = arrayOfNumbers.splice(0, 3);
                var set3 = arrayOfNumbers;
                if (set3.length > 0) {
                    return "(" + set1.join("") + ") " + set2.join("") + "-" + set3.join("");
                }
                else if (set3.length === 0 && set2.length > 0) {
                    return "(" + set1.join("") + ") " + set2.join("");
                }
                else if (set2.length === 0 && set1.length > 0) {
                    if (set1.length === 0) {
                        return "";
                    }
                    else {
                        return set1.join("");
                    }
                }
            };
            PhoneUtil.prototype.parse = function (phoneNumber) {
                return parseInt(phoneNumber.replace("(", "").replace(")", "").replace(" ", "").replace("-", ""));
            };
            return PhoneUtil;
        })();
        services.PhoneUtil = PhoneUtil;
    })(services = webapp.services || (webapp.services = {}));
})(webapp || (webapp = {}));
var webapp;
(function (webapp) {
    var services;
    (function (services) {
        var CurrencyUtil = (function () {
            function CurrencyUtil() {
            }
            CurrencyUtil.prototype.format = function (currency) {
                if (isNaN(currency) || currency === 0)
                    return "$0";
                return "$" + currency.toLocaleString();
            };
            CurrencyUtil.prototype.parse = function (currency) {
                var value = parseInt(currency.replace("$", "").replace(/,/g, ""));
                return isNaN(value) ? 0 : value;
            };
            return CurrencyUtil;
        })();
        services.CurrencyUtil = CurrencyUtil;
    })(services = webapp.services || (webapp.services = {}));
})(webapp || (webapp = {}));
var webapp;
(function (webapp) {
    var services;
    (function (services) {
        var ObjUtil = (function () {
            function ObjUtil() {
            }
            ObjUtil.prototype.isEmptyObj = function (obj) {
                return Object.keys(obj).length === 0 && obj.constructor === Object;
            };
            return ObjUtil;
        })();
        services.ObjUtil = ObjUtil;
    })(services = webapp.services || (webapp.services = {}));
})(webapp || (webapp = {}));
/// <reference path="./typings/main.d.ts" />
/// <reference path="./route.ts" />
/// <reference path="./directives/phoneNumber.ts" />
/// <reference path="./directives/currency.ts" />
/// <reference path="./directives/cardInfo.ts" />
/// <reference path="./services/dataService.ts" />
/// <reference path="./services/phoneUtil.ts" />
/// <reference path="./services/currencyUtil.ts" />
/// <reference path="./services/objUtil.ts" />
var webapp;
(function (webapp) {
    function bootstrap() {
        var app = angular.module("wallethub-assignment", [
            'ngMaterial',
            'ngAnimate',
            'ui.router',
            'anim-in-out'
        ]);
        loadConfig(app);
        loadDirectives(app);
        loadServices(app);
    }
    webapp.bootstrap = bootstrap;
    function loadConfig(app) {
        app.config(webapp.route.Router);
    }
    function loadDirectives(app) {
        app.directive("phoneNumber", webapp.directives.PhoneNumber);
        app.directive("currency", webapp.directives.Currency);
        app.directive("cardInfo", webapp.directives.CardInfo);
    }
    function loadServices(app) {
        app.service("DataService", webapp.services.DataService);
        app.service("PhoneUtil", webapp.services.PhoneUtil);
        app.service("CurrencyUtil", webapp.services.CurrencyUtil);
        app.service("ObjUtil", webapp.services.ObjUtil);
    }
})(webapp || (webapp = {}));
webapp.bootstrap();
