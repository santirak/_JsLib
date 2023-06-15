

export default class ThaiIdNumber {
    

    /*    
    README

   
    STRUCTURE
       

    CUSTOMIZATION 


    WARNING
       

    DEPENDENCY

    */


    constructor() {
        this.hyphenPositions = [1,5,10,12]
    }
    

    checkId(thaiId){
        thaiId = this.removeSpaceAndHyphen(thaiId)
        if(thaiId.length!==13){
            return false
        }
        if(isNaN(Number(thaiId))){
            return false
        }
        return true
    }

    addHyphen(thaiId){

        thaiId = this.removeSpaceAndHyphen(thaiId)

        if(!isNaN(Number(thaiId))){
            thaiId = thaiId.toString()
        }
        // var isOk = this.checkId(thaiId)
        // if(isOk===false) return false
       
        var hyphenPositions = this.hyphenPositions
        var thaiId_withHyphen = ""
        var i;
        for(i=0; i<thaiId.length; i++){
            if(hyphenPositions.includes(i)){
                thaiId_withHyphen += "-";
            }
            thaiId_withHyphen += thaiId[i];
        }
        return thaiId_withHyphen;
    }

    convertNumberToText(thaiId){
        if(!isNaN(Number(thaiId))){
            thaiId = thaiId.toString()
        }
        return thaiId
    }

    removeSpace(thaiId){
        return  this.convertNumberToText(thaiId).replace(/\s/g,'');
    }

    removeHyphen(thaiId){
        return  this.convertNumberToText(thaiId).replace(/-/g, "");
    }

    removeSpaceAndHyphen(thaiId){
        thaiId = this.removeSpace(thaiId)
        thaiId = this.removeHyphen(thaiId)
        return thaiId
    }
}


