module webapp.components {
    export class  BaseComponent {
        constructor() {
            return {
                templateUrl: "/dist/partials/baseComponent.html",
                controller: [
                    "$scope",
                    "$state",
                    function(
                        $scope,
                        $state
                    ){
                        //$state.transitionTo("base.profile.form")
                }]
            }
        }
    }
}