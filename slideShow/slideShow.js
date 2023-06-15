// import ActionEvent from "../actionEvent/viewController.js"
// import View from "./view.js"

export default class SlideShow{

    /*    
    README

        slide = {
            order: 0,
            slideNode: slideNode,
            dotNode: dotNode
        }


        toolNodes = {
            leftArrowNode: ,
            rightArrowNode: ,
            navigatorParent: 
        }
   
    STRUCTURE
       

    CUSTOMIZATION


    WARNING
       

    DEPENDENCY
    */

    
    constructor(slides, slideMainParentNode, toolNodes={}, options={}) {


        this.slides = slides
        this.slideMainParentNode = slideMainParentNode
        this.toolNodes = toolNodes

        
        //-- setting 
        this.loopSliding = true;
        this.movingEffect = 2;  //-- movingEffect:  1 = fade, 2 = slide

        this.holdingTimeBetweenSlides = 4000,
        this.stepTime_slide = 15,
        this.stepLength_slide = 40,
        this.stepTime_fade = 25,
        this.stepOpacity_fade = 0.05

        this.disableSliding = false
        

        
        //-- get option value
        for(var key in options){
            this[key] = options[key]
        }


        //-- view 
        

        //-- utility
        this.numberOfSlide = "none"
        this.currentSlideOrder = 0

        this.timer_slideImage;
        this.timer_touchTime;
        this.timer_autoSlide;

        this.attachEventToElements()

    }

    
   

    
    

    attachEventToElements(){

        this.slideMainParentNode.onmouseover = () => {
            this.stop_AutoSlide("slideMainParentNode.onmouseover");
        }
        this.slideMainParentNode.onmouseout = () => {
            this.start_AutoSlide();
        }
        this.slideMainParentNode.onmouseleave = () => {
            this.start_AutoSlide();
        }
        
        
        
        this.slideMainParentNode.ontouchstart = function(event){  
        }


        if("navigatorParent" in this.toolNodes){
            this.toolNodes.navigatorParent.onmouseover = () => {
                this.stop_AutoSlide();
            }
            this.toolNodes.navigatorParent.onmouseout = () => {
                this.start_AutoSlide();
            }
            this.toolNodes.navigatorParent.onmouseleave = () => {
                this.start_AutoSlide();
            }

        }
        

        if("leftArrowNode" in this.toolNodes){
            this.toolNodes.leftArrowNode.onmouseover = () => {
                this.stop_AutoSlide();
            }
            this.toolNodes.leftArrowNode.onclick = () => {
                // console.log("click left arrow")
                this.stop_AutoSlide();
                this.moveToSlide(this.currentSlideOrder-1);
            }
        }
        

        if("rightArrowNode" in this.toolNodes){
            this.toolNodes.rightArrowNode.onmouseover = () => {
                this.stop_AutoSlide();
            }
            this.toolNodes.rightArrowNode.onclick = () => {
                // console.log("click right arrow")
                this.stop_AutoSlide();
                this.moveToSlide(this.currentSlideOrder+1);
            }
        }






        var attachFunctionToEachDot = (slide) => {

            var dotNode = slide.dotNode

                if(dotNode!="none"){
                    
                dotNode.onmouseover = () => {
                    this.stop_AutoSlide();
                }
                dotNode.onclick = () => {
                    // console.log("click dot: currentSlideOrder="+this.currentSlideOrder)
                    // console.log("click dot: slide.order="+slide.order)
                    // console.log(slide)
                    if(this.currentSlideOrder==slide.order) return;
                    this.moveToSlide(slide.order);
                }
            }
        }


        var attachFunctionToEachSlide = (slide) => {

            slide.slideNode.ontouchstart = (event) => {

                if(event.touches.length > 1) {
                    // ... do what you like here
                    return
                }

                //--***  make event.preventDefault() after check moved length in x compared to moved length in y
                if(!this.disableSliding){
                    this.touchToMoveSlide(event);
                }
            }
        }


        var isfirst = true
        this.numberOfSlide = 0

        for(var order in this.slides){
            var slide = this.slides[order]
            attachFunctionToEachDot(slide)
            attachFunctionToEachSlide(slide)
            //--hide the second on 
            
            if(!isfirst){
                slide.slideNode.style.display = "none"
                // console.log("hide---"+order)
            }

            if(isfirst){
                isfirst = false
            }

            
            this.numberOfSlide++
        }


        this.changeDotColor()
        
        this.start_AutoSlide();
    }
    
    

    loopSlideOrder(order){

        var numberOfSlide = this.numberOfSlide
        if(order < 0){
            order = numberOfSlide-1
        }
        else if(order >= numberOfSlide){
            order = 0;
        }

        return order
    }

    findTheShortestPath(from, to){

        var  findStepLength = (from, to, direction) => {
            var stepLength = 0
            var order = from;
            while(order!=to){
                if(direction=="increase"){
                    order++
                }
                else {
                    order--
                }
                stepLength++
                order = this.loopSlideOrder(order)
            }

            return stepLength
        }

        var increaseStep = findStepLength(from, to, "increase")
        var decreaseStep = findStepLength(from, to, "decrease")
        
        // console.log(increaseStep +" and "+decreaseStep)

        if(increaseStep==decreaseStep) return "same"
        else if(increaseStep < decreaseStep) return "increase"
        else return "decrease"
    }
    
    moveToSlide(newSlideOrder){

    
        console.log("moveToSlide()")
        this.stop_AutoSlide("moveToSlide");
        
        var currentSlideOrder = this.currentSlideOrder;
        // var numberOfSlide = this.numberOfSlide

        var originalDirection = (newSlideOrder>currentSlideOrder)? "increase": "decrease"

        newSlideOrder = this.loopSlideOrder(newSlideOrder)

        if(newSlideOrder==currentSlideOrder) return;

        
        if(this.movingEffect==1){

            if(this.slideIsFading) return;

            this.slideIsFading = true;
            //-- hide current and show new
            this.showOrHideByFade(this.slides[newSlideOrder].slideNode, "show", ()=>{this.slideIsFading=false})
            this.showOrHideByFade(this.slides[currentSlideOrder].slideNode, "hide")

            //-- update current slide order
            this.currentSlideOrder = newSlideOrder
            this.changeDotColor()
            this.start_AutoSlide()
        
        }
        else if(this.movingEffect==2){

            if(this.slideIsMoving) return;

            var startOrder = currentSlideOrder;
            var endOrder = newSlideOrder;

            var shortestDirection = this.findTheShortestPath(currentSlideOrder, newSlideOrder)
            
            // console.log(" shortestDirection "+shortestDirection)
            
            var direction = (shortestDirection=="same")? originalDirection: shortestDirection

            // console.log(" final move direction "+direction)

            
            
            this.slideIsMoving = true;

            var moveMultiSlide = (this_currentOrder, direction, endOrder) => {

                var this_nextOrder = (direction == "increase")? this_currentOrder+1: this_currentOrder-1
                this_nextOrder = this.loopSlideOrder(this_nextOrder)
                
                this.currentSlideOrder = this_nextOrder
                this.changeDotColor()

                var moveWay = "previous";
                if(direction=="increase"){
                    moveWay = "next";   
                }
                
                this.showOrHideBySliding(this.slides[this_currentOrder].slideNode, this.slides[this_nextOrder].slideNode, moveWay, () => {
                    this_currentOrder = this_nextOrder;
                    if(this_currentOrder == endOrder){
                        this.slideIsMoving = false;
                        this.start_AutoSlide()
                        return
                    }
                    else{
                        moveMultiSlide(this_currentOrder, direction, endOrder)
                    }
                })

                return;
            } 

            var this_currentOrder = startOrder
            moveMultiSlide(this_currentOrder, direction, endOrder)
            return;
        
        }
    }


    showOrHideBySliding(ele_current, ele_new, moveTo, afterFunction= ()=>{}){

     
        var slideMainParentNode_w = this.slideMainParentNode.offsetWidth
        var stepLength_slide = this.stepLength_slide;

        var timer_slideDiv = setInterval(() => {

            var currentPosition_currentEle = ele_current.offsetLeft
            var newPosition_currentEle = (moveTo=="next")? currentPosition_currentEle - stepLength_slide: currentPosition_currentEle + stepLength_slide
            ele_current.style.left = newPosition_currentEle+"px"


            var newPosition_newEle = (slideMainParentNode_w - Math.abs(newPosition_currentEle))
            if(newPosition_currentEle>0) newPosition_newEle = (-1)*newPosition_newEle
            ele_new.style.left = newPosition_newEle+"px";
            ele_new.style.display = ""

            
            if(Math.abs(newPosition_newEle)<=stepLength_slide*2){
                
                clearInterval(timer_slideDiv);
                
                ele_current.style.display = "none"
                ele_current.style.left = "0px"
                ele_new.style.left = "0px"

                afterFunction();
            }
        }, this.stepTime_slide)
    }


    showOrHideByFade(ele, action, afterFunction= ()=>{}){


        if(action=="show"){
            ele.style.opacity = 0
            ele.style.display = ""
        }
        else if(action=="hide"){
            ele.style.opacity = 1
            ele.style.display = ""
        }

        var stepOpacity = this.stepOpacity_fade

        var Timer_changeOpacityDiv = setInterval(() => {

            
            var opacity = ele.style.opacity
            opacity = Number(opacity)
            opacity = (action=="show")? opacity+stepOpacity: opacity-stepOpacity
            ele.style.opacity = opacity
            
            var finish = false
            if(action=="show"){//-- show
                if(opacity>=1){
                    finish = true
                    ele.style.opacity = 1
                }
            }
            else{//--hide
                if(opacity<=0){
                    finish = true
                    ele.style.opacity = 0
                    ele.style.display = "none"
                    ele.style.opacity = 1
                }
            }

            if(finish){
                clearInterval(Timer_changeOpacityDiv);
                afterFunction();
            }
        }, this.stepTime_fade)
    }
    
    changeDotColor(){

        var currentSlideOrder = this.currentSlideOrder;

        for(var order in this.slides){
            var slide = this.slides[order]
            var dotNode = slide.dotNode
            if(dotNode=="none") continue;
            if(order==currentSlideOrder){
            dotNode.style.color = "dimgray"
            }
            else{
            dotNode.style.color = "lightgray"
            }
        }
    
    }
    
    start_AutoSlide(from=""){
    
        console.log("start_AutoSlide() from: "+from)
        
        clearInterval(this.timer_autoSlide);
        
        var currentSlideOrder = this.currentSlideOrder;
        
        if(this.disableSliding || currentSlideOrder==="none"){
            return;
        }
        
        
        this.timer_autoSlide = setInterval(() => {
            // console.log("auto slide working")
            var currentSlideOrder = this.currentSlideOrder;
            this.moveToSlide(currentSlideOrder+1);
        }, this.holdingTimeBetweenSlides);
    }
    

    stop_AutoSlide(from=""){
        // console.log("stop_AutoSlide() from: "+from)
        clearInterval(this.timer_autoSlide);
    }
    
    
    





    /* ----------- for touch event -------------- */
    touchToMoveSlide(event){
    
        // console.log("touch start");
        
        this.stop_AutoSlide("touchToMoveSlide");
        
        var touch_x = event.touches[0].clientX;
        var touch_y = event.touches[0].clientY;
        
        this.touch_x = touch_x;
        this.touch_y = touch_y;
        
        
        this.initial_touch_x = touch_x;
        this.initial_touch_y = touch_y;
        
        
        clearInterval(this.timer_touchTime);
        this.touchTime = 0;
        this.timer_touchTime = setInterval(function(){
            this.touchTime += 1000;
        })
        
        
        
        window.addEventListener("touchmove", this.FunctionFor_touchMove = (event) => {
            this.moveSlideWhenTouchMove(event);
        })
        window.addEventListener("touchend", this.FunctionFor_touchEnd = (event) => {
            this.manageTouchEnd(event);
        })
    
    }
    
    moveSlideWhenTouchMove(event){

        var touch_x = event.touches[0].clientX;
        var touch_y = event.touches[0].clientY;
        
        var moveLength_x = touch_x-this.touch_x;
        var moveLength_y = touch_y-this.touch_y;

        var length_x_fromOriginal = touch_x-this.initial_touch_x;
        var length_y_fromOriginal = touch_y-this.initial_touch_y;

        event.preventDefault();
    
        this.touch_x = touch_x;
        
        

        //-- *** move  slide as touch move *** -------
        if(this.movingEffect==2){

            var currentSlideOrder = this.currentSlideOrder;

            //-- get new order
            var newOrder = (length_x_fromOriginal<0)? currentSlideOrder+1: currentSlideOrder-1;

            newOrder = this.loopSlideOrder(newOrder)
            
            this.slides[newOrder].slideNode.style.display = "";

            var current_slideNode = this.slides[currentSlideOrder].slideNode
            
            var slideMainParentNode_w = this.slideMainParentNode.offsetWidth;
            var new_position = moveLength_x+current_slideNode.offsetLeft;
            current_slideNode.style.left = new_position+"px";

            
            var new_slideNode = this.slides[newOrder].slideNode
            var new_position_forNewSlide = (slideMainParentNode_w - Math.abs(new_position))
            if(new_position>0) new_position_forNewSlide = (-1)*new_position_forNewSlide
            new_slideNode.style.left = new_position_forNewSlide+"px";

        }
    }  



    
    manageTouchEnd(event){

        // console.log("touch end");
        
        var returnResultA =  this.checkTouchSwipeBySpeed(event);
        var isSwipe = returnResultA.isSwipe;
        var speed = returnResultA.speed;
        
        var currentSlideOrder = this.currentSlideOrder;

        // console.log("manageTouchEnd - isSwipe: "+isSwipe)
        if(isSwipe){//-- swipe finger
            
            var new_imageOrder = currentSlideOrder+1;
            // var direction = "increase"

            if(speed>0){
                new_imageOrder = currentSlideOrder-1
                // direction = "decrease"
            }
            
            this.moveToSlide(new_imageOrder);
        }
        else{ //-- touch and move 

            //-- *** move slide as touch move *** -------
            if(this.movingEffect==2){
                    
                var length_x_fromOriginal = this.touch_x-this.initial_touch_x;

                var currentSlideOrder = this.currentSlideOrder;

                //-- get new order
                // var newOrder = (length_x_fromOriginal<0)? currentSlideOrder+1: currentSlideOrder-1;

                var newOrder = currentSlideOrder+1;
                // var direction = "increase"

                if(length_x_fromOriginal>0){
                    newOrder = currentSlideOrder-1
                    // direction = "decrease"
                }
                
                
                newOrder = this.loopSlideOrder(newOrder)

                var slideNode = this.slides[currentSlideOrder].slideNode
                var slideNode_width = slideNode.offsetWidth
                
                //-- move more than half
                if(Math.abs(length_x_fromOriginal)>slideNode_width/2){ 
                    this.moveToSlide(newOrder);
                }
                else{//-- move less than half
                    //--set back to original position
                    this.slides[newOrder].slideNode.style.display = "none"
                    this.slides[currentSlideOrder].slideNode.style.left = "0px"
                    this.slides[newOrder].slideNode.style.left = "0px"
                }

            }

        }
        
        
        

        this.start_AutoSlide("ending Touch event");
        
        clearInterval(this.timer_touchTime);
        this.removeAllTouchEvent();
    
    }
    
    
    removeAllTouchEvent(){
        //console.log("remove event")
        window.removeEventListener("touchmove", this.FunctionFor_touchMove);
        window.removeEventListener("touchend", this.FunctionFor_touchEnd);
    }
    
    
    checkTouchSwipeBySpeed(){
        
        var thresholdSpeed = 1.5;
        
        var touch_x = this.touch_x;
        
        var initial_touch_x = this.initial_touch_x;
        
        var length_x_fromOriginal = this.touch_x-this.initial_touch_x;
        var touchTime = this.touchTime/1000;
        
        var touchSpeed = length_x_fromOriginal/touchTime;
        
        
        var isSwipe = (Math.abs(touchSpeed)>=thresholdSpeed)? true:false;
        
        return {
            isSwipe :isSwipe,
            speed : touchSpeed
        };
    
    }

}

