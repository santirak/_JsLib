import Responsive from "../responsive/responsive.js"
// import View from "./view.js"

export default class EventHandler{

    /*    
    README

        //---- to prevent default righr click 

            div.button = function(event){
                event.preventDefault();
                console.log("oncontextmenu");
            }
   
    STRUCTURE
       

    CUSTOMIZATION


    WARNING
       

    DEPENDENCY
    */

    
    constructor(options={}) {

        
        //-- setting 
        this.holdTime = 0;
        this.timer_hold;

        this.time_threshold = 300;

        // this.parentNode_forScrollWhenTouchMove = "none";

        this.preventDefaultWhenTouchStart = false;
        this.preventDefaultWhenRightClick = true;
    
    

        
        //-- get option value
        for(var key in options){
            this[key] = options[key]
        }


        //-- view 
        

        //-- utility
        this.eventFunction_click = function(event){};
        this.eventFunction_hold = function(event){};
        this.eventFunction_rightClick = function(event){console.log("right click default function")};

        // this.scroll_x = false;
        // this.scroll_y = false;

        // this.previousTouchPostion_x = "none"
        // this.previousTouchPostion_y = "none"

        this.eventFunction_touchEnd = "none";
        this.eventFunction_touchMove = "none";
        
        this.eventFunction_mouseUp = "none";
        this.eventFunction_mouseMove = "none";
        // this.eventFunction_dragStart = "none";


    }

    
    
	attachEventFunction(element){
        
        if(Responsive.isTouchDevice()){
            
            element.ontouchstart = (event) => {

                if(this.preventDefaultWhenTouchStart){
                    event.preventDefault();
                    console.log("prevent Touch default");
                }

                console.log("touch start"); 

                this.event = event;

                
                if(this.eventFunction_touchEnd !=="none"){//-- another touch - remove old one and do new one
                    console.log("there is another touch"); 
                    this.remove_touch_HoldTimerAndEvent();
                    
                }
                if(this.eventFunction_touchMove !=="none"){//-- another touch - remove old one and do new one
                    console.log("there is another touch"); 
                    this.remove_touch_HoldTimerAndEvent();
                    
                }
                

                if(event.touches.length>1){//--prevent two touch
                    console.log("multi touch"); 
                    this.remove_touch_HoldTimerAndEvent();
                    return;
                }



                var touch_x = event.touches[0].clientX;
                var touch_y = event.touches[0].clientY;


                this.previousTouchPostion_x = touch_x;
                this.previousTouchPostion_y = touch_y;


                this.timer_hold = setInterval(() => {this.increaseHoldTimeAndTigerFunction("mouse")}, 100);

                window.addEventListener("touchend", this.eventFunction_touchEnd = () => {this.onTouchEnd()});
                window.addEventListener("touchmove", this.eventFunction_touchMove = () => {this.onTouchMove()});

            }
        }
        else{
            
            element.onmousedown = (event) => {

                if(event.button==2){//--right click
                    
                    if(this.preventDefaultWhenRightClick){
                        event.preventDefault();
                    } 
                    
                    this.eventFunction_rightClick(event)
                    return;
                }
    
                this.event = event

                console.log("mouse start");

                this.timer_hold = setInterval(() => {this.increaseHoldTimeAndTigerFunction("mouse")}, 100);
                
                window.addEventListener("mouseup", this.eventFunction_mouseUp = () => {this.onMouseUp()});
                window.addEventListener("mousemove", this.eventFunction_mouseMove = () => {this.onMouseMove()});
                // window.addEventListener("dragstart", this.eventFunction_dragStart = () => {this.onDragStart()});

            }
        }
	}
    
    
    //-- for scroll
    // scrollParent(event){
        
    //     var touch_x = event.touches[0].clientX;
    //     var touch_y = event.touches[0].clientY;
    //     console.log(touch_y);
        
    //     var move_x = 0;
    //     var move_y = 0;
        
    //     if(this.scroll_x){
    //         move_x = touch_x - this.previousTouchPostion_x;
    //     }
        
    //     if(this.scroll_y){
    //         move_y = touch_y - this.previousTouchPostion_y;
    //     }
        
    //      console.log("move "+move_x+" "+move_y);
        
    //     var parentNode_forScrollWhenTouchMove = this.parentNode_forScrollWhenTouchMove;
        
    //     if(parentNode_forScrollWhenTouchMove!=="none"){
    //         var new_scroll_x = parentNode_forScrollWhenTouchMove.scrollLeft - move_x;
    //         var new_scroll_y = parentNode_forScrollWhenTouchMove.scrollTop - move_y;
            
    //         console.log("new "+new_scroll_x+" "+new_scroll_y);
            
    //         parentNode_forScrollWhenTouchMove.scrollLeft = new_scroll_x;
    //         parentNode_forScrollWhenTouchMove.scrollTop = new_scroll_y;
            
    //     }
        
        
        
    //     this.previousTouchPostion_x = touch_x;
    //     this.previousTouchPostion_y = touch_y;
        
    // }
    
    // removeScrollParent(){
    //     window.removeEventListener("touchmove", this.scrollParent);
    //     window.removeEventListener("touchend", this.removeScrollParent);
    // }
	
    



    //-- touch ----------
    onTouchEnd(){
        
        console.log("touch end")
        this.remove_touch_HoldTimerAndEvent();
        this.triggerClickFunction();
        
        
    }

    onTouchMove(){
        console.log("touch move")
        this.remove_touch_HoldTimerAndEvent();
    }
    
    
    remove_touch_HoldTimerAndEvent(){
        
        // console.log("remove touch event")
        
        clearInterval(this.timer_hold);
        
        this.holdTime = 0;
        
        if(this.eventFunction_touchEnd!=="none"){
            window.removeEventListener("touchend", this.eventFunction_touchEnd);
            this.eventFunction_touchEnd = "none";
        }
       
        if(this.eventFunction_touchMove!=="none"){
            window.removeEventListener("touchmove", this.eventFunction_touchMove);
            this.eventFunction_touchMove = "none";
        }
        
        this.eventFunction_touchEnd = "none";
        this.eventFunction_touchMove = "none";
        
    }


    
    




    //-- mouse ----------
    
    onMouseUp(){
        
        console.log("mouse up");
        this.remove_mouse_HoldTimerAndEvent();
        
        this.triggerClickFunction();
    }
    
    onDragStart(){//-- mouse move
        
        console.log("drag start");
        this.remove_mouse_HoldTimerAndEvent();

        //this.triggerClickFunction();
    }

    onMouseMove(){//-- mouse move
        
        console.log("mouse move");
        this.remove_mouse_HoldTimerAndEvent();

        //this.triggerClickFunction();
    }
    


    remove_mouse_HoldTimerAndEvent(){
        
        // console.log("remove mouse event")
        
        clearInterval(this.timer_hold);
		this.holdTime = 0;
        
        if(this.eventFunction_mouseUp!=="none"){
            window.removeEventListener("mouseup", this.eventFunction_mouseUp);
        }
        if(this.eventFunction_mouseMove!=="none"){
            window.removeEventListener("mousemove", this.eventFunction_mouseMove);
        }
		// if(this.eventFunction_dragStart!=="none"){
        //     window.removeEventListener("dragstart", this.eventFunction_dragStart);
        // }

		
		
		
    }

    










	increaseHoldTimeAndTigerFunction(eventType){
        console.log("increae time")
		this.holdTime += 100;
		if(this.holdTime > this.time_threshold){
			this.triggerHoldFunction(eventType);
		}
	}
	
    
	triggerClickFunction(){
		console.log("Active - click");
		this.eventFunction_click(this.event);
	}
	
	triggerHoldFunction(fromEvent){
        
        this.event.preventDefault();
        this.remove_touch_HoldTimerAndEvent();
        this.remove_mouse_HoldTimerAndEvent();
        
		console.log("Active - hold "+fromEvent);
		this.eventFunction_hold(this.event);
		
	}







    static checkClickOnChildOfParents(event, parentNodeA){
        
        var checkingElement = event.target;
        var checkingElementName = checkingElement.tagName;
       
        //--check click ele first
        if(parentNodeA.indexOf(checkingElement)!=-1){
            return true
        }

        while(checkingElementName != "BODY"){

            if(!checkingElement){//--preven click element is removed after click
                return false;
            }

            var thisParent = checkingElement.parentElement;

            if(!thisParent){//--preven click element is removed after click
                return false;
            }

            if(parentNodeA.indexOf(thisParent)!=-1){
                return true
            }

            checkingElement = thisParent
            checkingElementName = checkingElement.tagName

        }
        
        return false;
    }
}

