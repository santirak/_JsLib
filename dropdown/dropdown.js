import EventHandler from "../eventHandler/eventHandler.js"
import Responsive from "../responsive/responsive.js"

import View from "./view.js"

export default class Dropdown{

    /*    
    README
        
   
    STRUCTURE



    CUSTOMIZATION


    WARNING
       

    DEPENDENCY

    */

    
    constructor(options={}) {

        

        //--settting
        this.clickButtonTo = "toggle" //-- show, toggle
        this.clickOutsideToHide = true
        
        //-- get option value
        for(var key in options){
            this[key] = options[key]
        }

        //-- view 
        this.view = new View(this, options)
        

        //-- utility
        this.isDisplaying = false
        this.isDisabled = false;
        this.eventFunction_clickOtherAreaToHideDropdownContent
        this.eventFunction_touchStart_OtherAreaToHideDropdownContent


        //-- function
        this.afterFunction_hideDropdown = () => {}
        this.functionForClickOutSide = () => {
            this.hideDropdown()
        }

    }


    createViews(elementStyle={}, elements){
        return this.view.createElements(elementStyle, elements)
    }

    addListenerForHideWhenClickOther(){

        console.log("add Listener ForHideWhenClick Other()")

        if(!this.clickOutsideToHide) return

        
        if(Responsive.isTouchDevice()){
            
            this.remove_touchStart_listener()

            console.log("attach touch start")
            window.addEventListener("touchstart", this.eventFunction_touchStart_OtherAreaToHideDropdownContent = (event)=>{
                console.log("touch start")

                //-- prevent multi touch
                if(event.touches.length > 1){
                    console.log("multiTouch")
                    this.remove_touchEnd_listener()
                    this.remove_touchMove_listener()
                }

                console.log("attach touch touchend")
                window.addEventListener("touchend", this.eventFunction_touchEnd_OtherAreaToHideDropdownContent = (event)=>{
                    console.log("touch end")
                    this.checkClickOnChildOfParents(event)
                    this.remove_touchEnd_listener()
                    this.remove_touchMove_listener()
                });

                console.log("attach touch touchmove")
                window.addEventListener("touchmove", this.eventFunction_touchMove_OtherAreaToHideDropdownContent = (event)=>{
                    console.log("touch move")
                    this.remove_touchEnd_listener()
                    this.remove_touchMove_listener()
                });
                
            });
            
        }
        else{
            
            this.remove_mouseDown_listener()
            /* use "mousedown" rather than "click" to prevent hide when mouse is dragged from inside to outside and release*/
            window.addEventListener("mousedown", this.eventFunction_clickOtherAreaToHideDropdownContent = (event)=>{
                this.checkClickOnChildOfParents(event)
            });
        }
        
    }


    checkClickOnChildOfParents(event){

        console.log("check out side")
        var clickInParent = EventHandler.checkClickOnChildOfParents(event, this.view.elementsForPreventHideDropdown)
        if(!clickInParent){
            console.log("outside")
            this.functionForClickOutSide()
        }
    }
 

    remove_mouseDown_listener(){
        console.log("remove mousedown")
        window.removeEventListener("mousedown", this.eventFunction_clickOtherAreaToHideDropdownContent)
    }

    remove_touchStart_listener(){
        console.log("remove touchStart")
        window.removeEventListener("touchstart", this.eventFunction_touchStart_OtherAreaToHideDropdownContent)
    }

    remove_touchEnd_listener(){
        console.log("remove touchend")
        window.removeEventListener("touchend", this.eventFunction_touchEnd_OtherAreaToHideDropdownContent)
        
    }

    remove_touchMove_listener(){
        console.log("remove touchmove")
        window.removeEventListener("touchmove", this.eventFunction_touchMove_OtherAreaToHideDropdownContent)
        
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
        this.remove_mouseDown_listener()
        this.remove_touchStart_listener()

        
        this.afterFunction_hideDropdown()

    }

    toggleDropdown(){
        if(this.isDisplaying){
            this.hideDropdown()
        }
        else{
            this.showDropdown()
        }
    }


    setDrowdownConent(element){
        this.view.setDrowdownConent(element)
    }


}

