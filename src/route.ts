/// <reference path="./controllers/profile.form.ctrl.ts" />
/// <reference path="./controllers/profile.confirm.ctrl.ts" />
/// <reference path="./controllers/donor.list.ctrl.ts" />

module webapp.route {

    export class Router {
        static $inject = [
            '$stateProvider',
            '$urlRouterProvider'
        ];
        constructor(
            private $stateProvider,
            private $urlRouterProvider
        ){

            $urlRouterProvider.otherwise("/404");

            var baseState = {
                name: "base",
                url: "",
                abstract: true,
                templateUrl: "/dist/partials/baseComponent.html"
            }

            var HomeState = {
                name: "home",
                url: "/home",
                parent: "base",
                templateUrl: "/dist/partials/home.html"
            }

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
            }

            var profileConfirmState = {
                parent: 'profile',
                name: 'confirm',
                url: '/confirm',
                templateUrl: '/dist/partials/profile-confirm.html',
                controller: webapp.controllers.ProfileConfirmController,
                params: {auth: null}
            }

            var DonorListState = {
                parent: "base",
                name: "donorList",
                url: "/donor/list",
                templateUrl: "/dist/partials/donor-list.html",
                controller: webapp.controllers.DonorListController
            }

            var RouteNotFound = {
                name: "routeNotFound",
                url: "/404",
                template: "<div class='anim-slide-below transition-speed'>No Route Found <span ui-sref='home'>CLick to go home</span></div> "
            }

            $stateProvider
            .state(baseState)
            .state(HomeState)
            .state(profileState)
            .state(profileFormState)
            .state(profileConfirmState)
            .state(DonorListState)
            .state(RouteNotFound);
        }
 
   }
}