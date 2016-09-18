module webapp.directives {
    class Value {
        constructor(
            private value1,
            private value2,
            private value3
        ){}
    }
    
    export class CardInfo {
        static $inject = [
            "ObjUtil"
        ]
        constructor(
            ObjUtil
        ){
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
                link: function  (scope, iElement, iAttrs, ngModelCtrl)  {
                    
                    function view(value){
                        if(ObjUtil.isEmptyObj(value)) return new Value("","","");
                        var values = value.split("-");
                        return new Value(values[0].toUpperCase(),values[1].toUpperCase(),values[2].toUpperCase()); 
                    }
                    
                    function value(viewValue){
                        var str = [];
                        for(var i in viewValue){
                            str.push(viewValue[i].toUpperCase());
                        }
                        return str.join("-");
                    }
                    
                    ngModelCtrl.$formatters.push(function(modelValue) {
                        if(!modelValue) modelValue = {};
                        var value = view(modelValue)
                        return value ;
                    });

                    ngModelCtrl.$render = function() { 
                        scope.value1 = ngModelCtrl.$viewValue.value1;
                        scope.value2 = ngModelCtrl.$viewValue.value2;
                        scope.value3 = ngModelCtrl.$viewValue.value3;
                    }

                    scope.valueChanged = function() {
                        ngModelCtrl.$setViewValue({
                            value1:scope.value1,
                            value2:scope.value2,
                            value3:scope.value3
                        });
                    };

                    ngModelCtrl.$parsers.push(function(viewValue) {
                        viewValue = value(viewValue);
                        return viewValue;
                    });

                    iElement.bind("keyup" , function(e) {
                        if(e.keyCode === 8){
                            DeleteHandler(e);
                        } else {
                            FocusHandler(e);
                        }
                    });
                }
            }
        }
    }

    function DeleteHandler(e) {
        var target = e.srcElement;
        var isCursorInFirstPosition = target.selectionStart === 0 && target.selectionEnd === 0 ? true : false;
        if(isCursorInFirstPosition) {
            var previous = target.previousElementSibling;
            if (previous !== null){
                if (previous.tagName.toLowerCase() == "input") {
                    previous.focus();
                }
            }
        }
    }

    function FocusHandler(e){
        var target = e.srcElement;
        var maxLength = parseInt(target.attributes["maxlength"].value, 10);
        var currentLength = target.value.length;
        if (currentLength >= maxLength) {
            var next = target.nextElementSibling;
            if (next !== null){
                if (next.tagName.toLowerCase() == "input") {
                    next.focus();
                }
            }
        }
    }
}