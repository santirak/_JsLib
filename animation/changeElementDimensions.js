
export default class ChangeElementDimensions{

    /*    
    README
        effect Type:
            1 = uniform speed with fixed time: 
                - set constatValues.totalTime = ...

            2 = uniform speed by setting speed value
                - set constatValues.speed = ...

            3 = uniform acceleration by setting acceleration value   
                - set constatValues.acceleration = ... 

            4 = non-uniform speed 
                - vary speed (of effect type 2) by sin^2 angle where angle from 0 to 180 (from 0% length to 100% length)
                

    STRUCTURE
        

    CUSTOMIZATION 
        

    WARNING
    
       
    DEPENDENCY

    */

    constructor(options={}){

        //--setting -----
        this.stepTime = 20

        //-- for effect type = 1
        this.totalTime = 500

        //-- for effect type = 2 and 4
        this.speed = 0.5 //-- unit is pixel/millisecond

        //-- for effect type = 3
        this.acceleration = 0.01 //-- unit is pixel/millisecond



        //-- get option value
        for(var key in options){
            this[key] = options[key]
        }

        //-- data
        

        //-- utility
        this.isChanging = false


    }


    calculateStepLength(effectType, totalLength, processedLength, processedTime){
        var normalStepLength = totalLength * this.stepTime / this.totalTime
        var current_lengthPercent = 100 * processedLength / totalLength

        if(effectType==1){
            return normalStepLength
        }
        else if(effectType==2){
            return this.speed * this.stepTime
        }
        else if(effectType==3){
            /* 
                s = totalLength/2
                u = 0
                a = this.acceleration
            */
            var halfTime = Math.sqrt(totalLength/this.acceleration)
            var midWaySpeed = this.acceleration * halfTime

            var startedSpeed = (processedTime < halfTime)? 0: midWaySpeed
            var startedTime = (processedTime < halfTime)? 0: halfTime
            var accelerationForCalculation = (processedTime < halfTime)? this.acceleration: -(this.acceleration)

            var timeForCalculation = processedTime-startedTime

            //-- v = u + at 
            var initialSpeed = startedSpeed + (accelerationForCalculation * timeForCalculation)
            var finalSpeed = startedSpeed + (accelerationForCalculation * (timeForCalculation + this.stepTime))

            if(initialSpeed<0) initialSpeed = 1;
            if(finalSpeed<0) finalSpeed = 0;

            // console.log(" ---- ")
            // console.log(" halfTime: "+halfTime)
            // console.log(" midWaySpeed: "+midWaySpeed)
            // console.log(" processedTime: "+processedTime)
            // console.log(" startedSpeed: "+startedSpeed)
            // console.log(" startedTime: "+startedTime)
            // console.log(" timeForCalculation: "+timeForCalculation)
            // console.log(" accelerationForCalculation: "+accelerationForCalculation)
            // console.log(" initialSpeed: "+initialSpeed)
            // console.log(" finalSpeed: "+finalSpeed)
            // console.log((1 / 2) * (finalSpeed+initialSpeed) * this.stepTime)

            return (1 / 2) * (finalSpeed+initialSpeed) * this.stepTime

        }
        else if(effectType==4){

            var degree = current_lengthPercent*180/100
            var factor = Math.pow(2*Math.sin(degree * Math.PI / 180), 2); 
            var factor = (1 + factor)

            var calculatingSpeed = this.speed*factor

            // console.log("calculatingSpeed: "+calculatingSpeed)

            return calculatingSpeed*this.stepTime
        }
    }
        
    getgetChangedStyle(widthOrHeight){
        return (widthOrHeight=="width")? "width":"height"
    }

    getChangeDirection(startSize, endSize){
        if(startSize > endSize){
            return "decrease"
        }
        return "increase"
    }

    changeSize(element, widthOrHeight, startSize, endSize, effectType=4, callback=()=>{}){
        
        if(this.isChanging) return

        this.isChanging = true;

        var changedStyle = this.getgetChangedStyle(widthOrHeight)

        //--set start size
        element.style[changedStyle] = startSize+"px"
        
        var direction = this.getChangeDirection(startSize, endSize)
        
        var totalLength  = Math.abs(startSize - endSize)

        var processedLength = 0
        var processedTime = 0
        var currentSize = startSize

        //--change size -------------------------------------------
        var intervalTimer = setInterval( () => {

            var overChangeRange = false
            
            var stepLength = this.calculateStepLength(effectType, totalLength, processedLength, processedTime)

            processedLength += stepLength
            processedTime += this.stepTime
            
            if(direction=="increase"){
                var newSize = currentSize + stepLength
                if(newSize >= endSize) overChangeRange = true
            }
            else{
                var newSize = currentSize - stepLength
                if(newSize <= endSize) overChangeRange = true
            }

            if(overChangeRange){
                element.style[changedStyle] = endSize+"px"
                clearInterval(intervalTimer)
                this.isChanging = false
                callback()
                return
            }

            element.style[changedStyle] = newSize+"px"
            currentSize = newSize

        }, this.stepTime)

    }
}


