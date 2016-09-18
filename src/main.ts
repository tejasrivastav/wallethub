/// <reference path="./typings/main.d.ts" />

/// <reference path="./route.ts" />

/// <reference path="./directives/phoneNumber.ts" />
/// <reference path="./directives/currency.ts" />
/// <reference path="./directives/cardInfo.ts" />

/// <reference path="./services/dataService.ts" />
/// <reference path="./services/phoneUtil.ts" />
/// <reference path="./services/currencyUtil.ts" />
/// <reference path="./services/objUtil.ts" />

module webapp {
    export function bootstrap() {
        var app = angular.module("wallethub-assignment",[
            'ngMaterial',
            'ngAnimate',
            'ui.router',
            'anim-in-out'
        ]);

        loadConfig(app);     
        loadDirectives(app);
        loadServices(app);
    }

    function loadConfig(app) {
        app.config(webapp.route.Router);
    }

    function loadDirectives(app){
        app.directive("phoneNumber",webapp.directives.PhoneNumber);
        app.directive("currency", webapp.directives.Currency);
        app.directive("cardInfo", webapp.directives.CardInfo);
    }

    function loadServices(app){
        app.service("DataService",webapp.services.DataService);
        app.service("PhoneUtil",webapp.services.PhoneUtil);
        app.service("CurrencyUtil",webapp.services.CurrencyUtil);
        app.service("ObjUtil",webapp.services.ObjUtil);
    }
}

webapp.bootstrap();