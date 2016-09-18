module webapp.directives {
    export class PhoneNumber {
        static $inject = [
            "PhoneUtil"
        ]
        constructor(
            PhoneUtil
        ){
            return {
                template: "<md-input-container> \
                            <label>Phone Number</label> \
                            <md-icon><i class='material-icons'>phone</i></md-icon> \
                            <input ng-model='value' ng-change='valueChanged()' maxlength='14'> \
                          </md-input-container>",
                restrict: 'E',
                scope: {},
                require: 'ngModel',
                link: function  (scope, iElement, iAttrs, ngModelCtrl)  {
                    function view(value){
                        return PhoneUtil.format(value);
                    }
                    
                    function value(viewValue){
                        return PhoneUtil.parse(viewValue);
                    }
                    
                    ngModelCtrl.$formatters.push(function(modelValue) {
                        if(!modelValue) modelValue = "";
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
                        var modelValue = value(viewValue);
                        return modelValue;
                    });

                    ngModelCtrl.$validators.validPhoneNumber = function(modelValue,viewValue){
                        if(!modelValue ){
                            return false;
                        } else if( modelValue.toString().length <= 9){
                            return false;
                        } else {
                            return true;
                        }
                    }
                }
            }
        }
    }
}