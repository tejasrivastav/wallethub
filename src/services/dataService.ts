/// <reference path="../typings/main.d.ts" />

module webapp.services {
    export class DataService{
        static $inject = [
            "$http"
        ];
        private currentDonation: any;
        constructor(
            private $http: ng.IHttpService
        ){
            this.currentDonation = {}
        }

        public getCurrentDonation(){
            return this.currentDonation;
        }

        public setCurrentDonation(_currentDonation:any){
            this.currentDonation = _currentDonation;
        }

        public fetchDonorsList(){
            return this.$http.get("/dummyData.json")
            .then(function(respone){
                return respone.data;
            });
        }
    }
}