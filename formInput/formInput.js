import ThaiPhoneNumber from "../thaiPhoneNumber/thaiPhoneNumber.js"
import ThaiIdNumber from "../thaiIdNumber/thaiIdNumber.js"
import View from "./view.js"

export default class FormInput{

    /*    
    README

    STRUCTURE

    CUSTOMIZATION

    WARNING
       
    DEPENDENCY
    */



    

    constructor(options={}){

        //--setting ------------
        this.allowEmpty = false
        this.valueType = "text" 
        this.placeholder = ""
        /* 
            text
            numeric (no dot)
            decimal
            email
            url
            thaiIdNumber
            thaiPhoneNumber

        */

            
        this.validStyle = {
            true: {borderColor: ""},
            false: {borderColor: "red"}
        }
        
        
        
        this.thaiIdNumber = new ThaiIdNumber()
        this.thaiPhoneNumber = new ThaiPhoneNumber()
        


        //-- for thaiPhoneNumber
        this.separator = " "
        this.forMobilePhone = true
        this.forHomePhone = true


        
        this.functionFor_blurInput = this.checkAndUpdateInputValue
        /*  
            #check + change border color
            this.functionFor_blurInput = this.checkInputValue 

            #check + change color border + update correct format to input value
            this.functionFor_blurInput = this.checkAndUpdateInputValue 

            #do notthing when blur
            this.functionFor_blurInput = () => {}
        */


        
        //-- for getting value from input
        this.trimValue = true;
        this.removeSpace = false





        //-- get option value ------------
        for(var key in options){
            this[key] = options[key]
        }


        //-- view ------------
        this.view = new View(this)


        //-- data ------------
        


        //-- utility ------------



        //-- function ------------
        this.extraFunction_checkInputValue = function(isValid, value){return isValid}
        
        
    }

    createViews(elementStyle={}){


        this.thaiPhoneNumber.separator = this.separator
        this.thaiPhoneNumber.forMobilePhone = this.forMobilePhone
        this.thaiPhoneNumber.forHomePhone = this.forHomePhone
        

        console.log("createViews")
        console.log(elementStyle)
        var returnElements = this.view.createElements(elementStyle)

        return returnElements
    }




    

    checkAndUpdateInputValue(){
        var isValid = this.checkInputValue()
        if(isValid) this.setInputValue(this.getInputValue())
        return isValid
    }
    

    checkAndGetInputValue(){
        var isValid = this.checkInputValue()
        var value = this.getInputValue()

        return {
            isValid: isValid,
            value: value
        }
    }

    
    //-- check value and change color
    checkInputValue(){

        var value = this.view.getInputValue()
        var isValid = this.checkValue(value)

        this.changeInputStyleAsValueValidation(isValid)

        return isValid
    }


    //-- only check the value
    checkValue(value){
        var isValid = true
        
        //--empty
        if(!this.allowEmpty){
            if(value.replace(/\s/g,'')==="") isValid = false
        }

       
        if(this.valueType == "numeric" || this.valueType == "decimal"){
            value = value.replace(/\s/g,'')
            if(isNaN(Number(value))){
                isValid = false
            } 
        }
        else if(this.valueType == "email"){
            isValid = this.checkEmailFormat(value)
        }
        else if(this.valueType == "url"){
            isValid = this.checkUrlFormat(value)
        }
        else if(this.valueType == "thaiIdNumber"){
            isValid = this.thaiIdNumber.checkId(value)
        }
        else if(this.valueType == "thaiPhoneNumber"){
            // console.log(this.thaiPhoneNumber)
            isValid = this.thaiPhoneNumber.checkNumber(value)
        }

        isValid = this.extraFunction_checkInputValue(isValid, value)

        console.log("checkValue() -> "+ isValid)
        
        return isValid
    }


    checkEmailFormat = function(email){  

		email = email.replace(/\s/g, "").trim().toLowerCase();

		var isValid = false
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){  
			isValid = true
		}  

		return isValid
    }
    
    //-- SOURCE: https://stackoverflow.com/questions/74497502/how-to-check-for-a-valid-url-in-javascript
    checkUrlFormat = (urlString) => {

        urlString = urlString.replace(/\s/g, "").trim()

        var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
        return !!urlPattern.test(urlString);
    }
    

    changeInputStyleAsValueValidation(isValid){
        this.view.changeInputStyleAsValueValidation(isValid)
    }

    

    getInputValue(){
        var value = this.view.getInputValue()
        if(this.trimValue) value = value.trim()
        if(this.removeSpace) value = value.replace(/\s/g,'')

        if(this.valueType == "email"){
            value = value.toLowerCase()
        }

        if(this.valueType == "thaiIdNumber"){
            value = this.thaiIdNumber.removeSpaceAndHyphen(value)
        }

        if(this.valueType == "thaiPhoneNumber"){
            value = this.thaiPhoneNumber.removeSpaceAndHyphen(value)
        }

        return value
    }

    setInputValue(value){

        if(this.valueType == "thaiIdNumber"){
            value = this.thaiIdNumber.addHyphen(value)
        }
        if(this.valueType == "thaiPhoneNumber"){
            value = this.thaiPhoneNumber.addSeparator(value)
        }

        this.view.setInputValue(value)
    }





}



