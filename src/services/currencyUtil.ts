module webapp.services {
    export class CurrencyUtil{

        public format(currency: number): string{
            if(isNaN(currency) || currency === 0) return "$0";
            return "$"+currency.toLocaleString();
        }

        public parse(currency: string): number{
            var value = parseInt(currency.replace("$","").replace(/,/g,"")); 
            return isNaN(value) ? 0 : value;
        }
    }
}