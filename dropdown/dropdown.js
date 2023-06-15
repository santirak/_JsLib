import EventHandler from "../eventHandler/eventHandler.js"
import View from "./view.js"

export default class Dropdown{

    /*    
    README
        
   
    STRUCTURE

        elements = {
            parentNode: ,
            buttonNode
        }

    CUSTOMIZATION


    WARNING
       

    DEPENDENCY

    */

    
    constructor(elements, options={}) {

        this.elements = elements

        //--settting
        this.isDisplaying = false
        this.isDisabled = false;
        this.clickOutsideToHide = true
        
        //-- get option value
        for(var key in options){
            this[key] = options[key]
        }

        //-- view 
        this.view = new View(this, elements, options)
        

        //-- utility
        this.eventFunction_clickOtherAreaToHideDropdownContent

    }


    createViews(){
        this.view.createElements()
    }

    addListenerForHideWhenClickOther(){

        if(!this.clickOutsideToHide) return

        var elements = []
        for(var key in this.elements){
            elements.push(this.elements[key])
        }
        
        this.removeListenerForHideWhenClickOther()
        window.addEventListener("click", this.eventFunction_clickOtherAreaToHideDropdownContent = (event)=>{
            var clickInParent = EventHandler.checkClickOnChildOfParents(event, elements)
            if(!clickInParent){
                this.hideDropdown()
            }
        });
    }
 

    removeListenerForHideWhenClickOther(){
        window.removeEventListener("click", this.eventFunction_clickOtherAreaToHideDropdownContent)
    }


    showDropdown(){
        
        // console.log("this.isDisabled: "+this.isDisabled)
        if(this.isDisabled) return

        this.isDisplaying = true
        this.view.changeDropdownDisplaying()

        //--add event listener
        this.addListenerForHideWhenClickOther()

        //-- change location
        // this.view.changeDropdownLocationRelateToParentLocation()

    }

    hideDropdown(){

        if(this.isDisabled) return

        this.isDisplaying = false
        this.view.changeDropdownDisplaying()
        
        //--remove event listener
        this.removeListenerForHideWhenClickOther()

    }

    toggleDropdown(){
        if(this.isDisplaying){
            this.hideDropdown()
        }
        else{
            this.showDropdown()
        }
    }


}

