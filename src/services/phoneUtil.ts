module webapp.services {
    export class PhoneUtil{
        
        public format(phoneNumber: number): string{
            if(isNaN(phoneNumber)) return "";
            var phoneNumberInStr = phoneNumber.toString();
            var arrayOfNumbers = [];
            for (var i=0; i < phoneNumberInStr.length; i++){
                arrayOfNumbers.push(phoneNumberInStr.charAt(i))
            }
            var set1 = arrayOfNumbers.splice(0,3);
            var set2 = arrayOfNumbers.splice(0,3);
            var set3 = arrayOfNumbers;

            if(set3.length > 0){
                return "("+set1.join("")+") "+set2.join("")+"-"+set3.join("");
            } else if(set3.length === 0 && set2.length > 0 ) {
                return "("+set1.join("")+") "+set2.join("");
            } else if(set2.length ===0 && set1.length > 0){
                if(set1.length === 0 ) {
                    return "";
                } else {
                    return set1.join("")
                }
            }
        }

        public parse(phoneNumber: string): number{
            return parseInt(phoneNumber.replace("(","").replace(")","").replace(" ","").replace("-",""));
        }
    }
}