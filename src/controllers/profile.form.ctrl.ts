module webapp.controllers {
    export class ProfileFormController{
        static $inject = [
            "$scope",
            "$state",
            "DataService",
            "ObjUtil"
        ];

        constructor(
            private $scope,
            private $state,
            private DataService,
            private ObjUtil
        ){
            var defaultUser = {
                    name: "",
                    donation: {
                        needy: 1,
                        hospital: 1,
                        edu: 1
                    }
                }
            
            var user = DataService.getCurrentDonation();
            var bool = ObjUtil.isEmptyObj(user);
            $scope.user = bool ? defaultUser : user; 
            
            $scope.calculateTotalValue = function(){
                var needy  = $scope.user.donation.needy;
                var hospital = $scope.user.donation.hospital;
                var edu    = $scope.user.donation.edu;
                $scope.user.donation.total = needy + hospital + edu;
            };
            $scope.calculateTotalValue();

            $scope.totalValueChanged = function(){
                var needy  = $scope.user.donation.needy;
                var hospital = $scope.user.donation.hospital;
                var edu    = $scope.user.donation.edu;
                var actualTotal = $scope.user.donation.total;
                var total = needy + hospital + edu;
                if(total === 0){
                    $scope.user.donation.needy = 
                    $scope.user.donation.hospital = 
                    $scope.user.donation.edu = actualTotal/3;
                } else {
                    var ratio = actualTotal/total;
                    $scope.user.donation.needy = $scope.user.donation.needy * ratio;
                    $scope.user.donation.hospital = $scope.user.donation.hospital * ratio;
                    $scope.user.donation.edu = $scope.user.donation.edu * ratio;
                }
            }

            $scope.proceed = function(user){
                DataService.setCurrentDonation(user);
                $state.go("confirm", {auth: true});
            }
        }
    }
}