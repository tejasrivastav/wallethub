module webapp.directives {
    export class Currency {
        static $inject = [
            "CurrencyUtil"
        ]
        constructor(
            CurrencyUtil
        ){
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
                link: function  (scope, iElement, iAttrs, ngModelCtrl)  {
                    if(!scope.label) scope.label = "";
                    if(!scope.icon) scope.icon = "attach_money";
                    function view(value){
                        return CurrencyUtil.format(value);
                    }
                    
                    function value(viewValue){
                        return CurrencyUtil.parse(viewValue);
                    }
                    
                    ngModelCtrl.$formatters.push(function(modelValue) {
                        if(!modelValue) modelValue = "$0";
                        var value = view(modelValue)
                        return value ;
                    });

                    ngModelCtrl.$render = function() { 
                        scope.value = ngModelCtrl.$viewValue;
                    }

                    scope.valueChanged = function() {
                        ngModelCtrl.$setViewValue(scope.value);
                        scope.value = view(value(scope.value));
                    };

                    ngModelCtrl.$parsers.push(function(viewValue) {
                        viewValue = value(viewValue);
                        return viewValue;
                    });
                }
            }
        }
    }
}