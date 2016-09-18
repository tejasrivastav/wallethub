/// <reference path="../services/dataService.ts" />

module webapp.controllers {
    export class ProfileConfirmController{
        static $inject = [
            "$scope",
            "$state",
            "$stateParams",
            "DataService",
            "PhoneUtil",
            "CurrencyUtil",
            "ObjUtil"
        ];

        constructor(
            private $scope,
            private $state,
            private $stateParams,
            private DataService,
            private PhoneUtil,
            private CurrencyUtil,
            private ObjUtil
        ){
            if($stateParams.auth !== true){
                $state.go("home");
            }
            $scope.credit = "";
            
            $scope.user = angular.copy(DataService.getCurrentDonation());
            var init = function(){
                console.log("user",$scope.user);
                $scope.user.phone = PhoneUtil.format($scope.user.phone);    
                $scope.user.donation.needy    = CurrencyUtil.format($scope.user.donation.needy);
                $scope.user.donation.hospital = CurrencyUtil.format($scope.user.donation.hospital);
                $scope.user.donation.edu      = CurrencyUtil.format($scope.user.donation.edu);
                $scope.user.donation.total    = CurrencyUtil.format($scope.user.donation.total);
            }

            if(!ObjUtil.isEmptyObj($scope.user)){
                init();
            }

            $scope.donate = function(){
                DataService.setCurrentDonation($scope.user);
                $state.go("donorList");
            }
        }
    }
}