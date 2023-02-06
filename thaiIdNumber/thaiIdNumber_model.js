
export default function ThaiIdNumber_model(){

    /*    
    README

   
    ARCHITECTURE
       

    CUSTOMIZATION 


    WARNING
       

    DEPENDENCY

    */

    
    this.magicNumber = new function(){
        this.hyphenPositions = [1,5,10,12]
    }

    this.checkId = function(thaiId){
        thaiId = this.removeSpaceAndHyphen(thaiId)
        if(thaiId.length!==13){
            return false
        }
        if(isNaN(Number(thaiId))){
            return false
        }
        return true
    }

    this.addHyphen = function(thaiId){

        thaiId = this.removeSpaceAndHyphen(thaiId)

        var isOk = this.checkId(thaiId)
        if(isOk===false) return false
       
        var hyphenPositions = this.magicNumber.hyphenPositions
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


    this.removeSpace = function(thaiId){
        return  thaiId.replace(/\s/g,'');
    }

    this.removeHyphen = function(thaiId){
        return  thaiId.replace(/-/g, "");
    }

    this.removeSpaceAndHyphen = function(thaiId){
        thaiId = this.removeSpace(thaiId)
        thaiId = this.removeHyphen(thaiId)
        return thaiId
    }
    

    this._init = (function(){
        
    }).bind(this)()

}

