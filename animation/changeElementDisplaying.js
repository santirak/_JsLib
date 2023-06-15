import ChangeElementDimensions from "./changeElementDimensions.js"

export default class ChangeElementDisplaying{

    /*    
    README
       

    STRUCTURE
        

    CUSTOMIZATION 
        
        change element width, set direction = horizontal
        change element height, set direction = vertical

    WARNING
    
       
    DEPENDENCY

    */

    constructor(options={}){

        //--setting -----
        this.effectType = 4

        //-- get option value
        for(var key in options){
            this[key] = options[key]
        }

        //-- data
        

        //-- utility
        this.isChanging = false

        this.changeElementDimensions = new ChangeElementDimensions()

    }

    

    

    changeDisplaying(element, isDisplayed, direction, option={}){

        var changeElementDimensions = this.changeElementDimensions
        if(changeElementDimensions.isChanging) return
        if(this.isChanging) return


        this.isChanging = true

        var displayValue_forShow = ("displayValue_forShow" in option)? option.displayValue_forShow : ""
        var displayValue_forHide = ("displayValue_forHide" in option)? option.displayValue_forHide : "none"

        var widthOrHeight = (direction=="vertical")? "height": "width"

        var actualSize = this.getCurrentSize(element, widthOrHeight, displayValue_forShow)
        var starSize = (isDisplayed)? 0: actualSize
        var endSize = (isDisplayed)? actualSize: 0
        
        //--set show element before change size
        element.style.display = displayValue_forShow

        changeElementDimensions.changeSize(element, widthOrHeight, starSize, endSize, this.effectType, () => {
            //--hide element and set back to original size
            element.style[widthOrHeight] = actualSize+"px"
            this.isChanging = false
            if(!isDisplayed){
                element.style.display = displayValue_forHide
            }
            
        });
    }

    getCurrentSize(element, widthOrHeight, displayValue_forShow){

        var currentDisplayStatus = element.style.display
        element.style.display = displayValue_forShow
        
        if(widthOrHeight=="width"){
            var actualSize = element.offsetWidth
        }
        else{
            var actualSize = element.offsetHeight
        }

        element.style.display = currentDisplayStatus

        return actualSize
    }
}



