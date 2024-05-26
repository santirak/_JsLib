export default class ThaiPhoneNumber {
    

    /*    
    README

   
    STRUCTURE
       

    CUSTOMIZATION 


    WARNING
       

    DEPENDENCY

    */


    constructor() {

        // -- setting
        this.separator = " "
        this.forMobilePhone = true
        this.forHomePhone = true


        this.numberPatterns = {
            "02": {
                digit: 9,
                type: "home",
                description: "Bankok and near by"
            },
            "03": {
                digit: 9,
                type: "home",
                description: "Middle"
            },
            "04": {
                digit: 9,
                type: "home",
                description: "Northen east"
            },
            "05": {
                digit: 9,
                type: "home",
                description: "North"
            },
            "07": {
                digit: 9,
                type: "home",
                description: "South"
            },
            "06": {
                digit: 10,
                type: "mobile",
                description: "mobile"
            },
            "08": {
                digit: 10,
                type: "mobile",
                description: "mobile"
            },
            "09": {
                digit: 10,
                type: "mobile",
                description: "mobile"
            }
        }
    }
    

    checkNumber(phoneNumber){
        phoneNumber = this.removeSpaceAndHyphen(phoneNumber)

        console.log("checking Number: "+phoneNumber)

        if(isNaN(Number(phoneNumber))) return false

        var firstTwoDigit = phoneNumber[0] + phoneNumber[1]

        if(firstTwoDigit in this.numberPatterns){
            var type = this.numberPatterns[firstTwoDigit].type
            var digit = this.numberPatterns[firstTwoDigit].digit

            
            //-- check type
            if(!this.forMobilePhone && type == "mobile")return false; 
            if(!this.forHomePhone && type == "home")return false; 

            //-- check digit
            if(phoneNumber.length !== digit) return false
        }
        else{
            return false
        }
        return true
    }

    addSeparator(phoneNumber){

        phoneNumber = this.removeSpaceAndHyphen(phoneNumber)

        var phoneNumberWithSeparator = ""
        var order = 0
        for(var i=phoneNumber.length-1; i>=0; i--){
            if(order !==0 && order%4 === 0) phoneNumberWithSeparator = this.separator + phoneNumberWithSeparator
            phoneNumberWithSeparator = phoneNumber[i] + phoneNumberWithSeparator
            order++
        }

        return phoneNumberWithSeparator;
    }


    convertNumberToText(phoneNumber){
        if(!isNaN(Number(phoneNumber))){
            phoneNumber = phoneNumber.toString()
        }
        return phoneNumber
    }

    removeSpace(phoneNumber){
        return  this.convertNumberToText(phoneNumber).replace(/\s/g,'');
    }

    removeHyphen(phoneNumber){
        return  this.convertNumberToText(phoneNumber).replace(/-/g, "");
    }

    removeSpaceAndHyphen(phoneNumber){
        phoneNumber = this.removeSpace(phoneNumber)
        phoneNumber = this.removeHyphen(phoneNumber)
        return phoneNumber
    }
}


