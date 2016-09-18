module webapp.controllers {
    export class DonorListController{
        static $inject = [
            "$scope",
            "DataService",
            "PhoneUtil",
            "CurrencyUtil",
            "ObjUtil"
        ];

        constructor(
            private $scope,
            private DataService,
            private PhoneUtil,
            private CurrencyUtil,
            private ObjUtil
        ){
            $scope.sortBy = null;
            DataService.fetchDonorsList()
            .then(function(data){
                $scope.donors = data;
                $scope.donors.forEach(function(donor){
                    donor.phoneNumber = PhoneUtil.format(donor.phoneNumber);
                    donor.donation = {
                        inString: CurrencyUtil.format(donor.donation),
                        inNumber: donor.donation
                    };
                });
                var userdonation = DataService.getCurrentDonation();
                if(!ObjUtil.isEmptyObj(userdonation)){
                    var currentDonation = {
                        name: userdonation.name,
                        phoneNumber: userdonation.phone,
                        donation: {
                            inString: userdonation.donation.total,
                            inNumber: CurrencyUtil.parse(userdonation.donation.total)
                        }
                    }
                    $scope.donors.push(currentDonation);
                }
            });
        }
    }
}