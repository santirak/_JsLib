import ViewTemplate from "../_class/view.js"

export default class View extends ViewTemplate{

    /*    
    README

        elements = {
            parentNode: parentNode, //-- parent for append dropdown element
            buttonNode: buttonNode //-- button for showing/hidding dropdown when clicks
        }


   
    STRUCTURE
       

    CUSTOMIZATION

    WARNING
       

    DEPENDENCY
    */

    

    constructor(viewController, options={}) {

        super()

        //-- setting ----
        this.createDropdownPointer = false;
        

        //-- get option value
        for(var key in options){
            this[key] =options[key]
        }
        
        

        //-- view
        this.viewController = viewController



        //-- style
        this.elementStyle = {
            style_dropdownParent: {
                width: "100%",
                position: "absolute",
                top: "105%",
                left: "0%",
                cursor: "default",
                zIndex: "5",
                maxHeight: "300px",
                backgroundColor: "white",
                boxShadow:  "0px 0px 6px rgba(0, 0, 0, 0.3)",
                overflow: "scroll"
            },
            style_pointer: {
                position: "absolute",
                height: "0px",
                borderWidth: "10px",
                borderStyle: "solid",
                top: "100%",
                left: "20px",
                borderRadius: "8px",
                borderColor: "transparent transparent red transparent",
                cursor: "default"
            }
        }

    }




    
    createElements(elementStyle = null, elements){

        this.updateStyleObject(elementStyle)

        this.elementsForPreventHideDropdown = []
        for(var key in elements){
            this.elementsForPreventHideDropdown.push(elements[key])
        }

        this.parentNode = elements.parentNode
        this.buttonNode = elements.buttonNode
        this.parentNode.style.position = "relative"

        
        // var parentNode = this.parentNode
        

        var dropdownParentNode = this.createDropdownParentNode()
        this.parentNode.appendChild(dropdownParentNode)

        if(this.createDropdownPointer){
            var pointerNode = this.createPointerNode()
            this.parentNode.appendChild(pointerNode) 
        }
        

        // var buttonNode = this.buttonNode
        this.buttonNode.onclick = () => {
            console.log("click button to show dropdown")
            if(this.viewController.clickButtonTo == "show"){
                this.viewController.showDropdown()
            }   
            else {
                this.viewController.toggleDropdown()
            }

            
        }

        this.changeDropdownDisplaying()

        return {
            dropdownParentNode: dropdownParentNode
        }

    }




    


    createDropdownParentNode(){

        var dropdownParentNode = document.createElement("DIV");        

        dropdownParentNode.innerHTML = "Dropdown Parent Node";
        
        this.setElementStyle(dropdownParentNode, this.elementStyle.style_dropdownParent)

        this.dropdownParentNode = dropdownParentNode;
        
        return dropdownParentNode
    }




   
    createPointerNode(){

        var pointerNode = document.createElement("DIV");
       
        pointerNode.innerHTML = " "

        this.setElementStyle(pointerNode, this.elementStyle.style_pointer)

        this.pointerNode = pointerNode;

        return pointerNode
    }



    //-- view modifications ----------------------------
    changeDropdownDisplaying(){
        var isShow = this.viewController.isDisplaying
        this.dropdownParentNode.style.display = (isShow)? "":"none"
        if(this.createDropdownPointer){
            this.pointerNode.style.display = (isShow)? "":"none"
        }
    }


    //-- TODO: 
    changeDropdownLocationRelateToParentLocation(){


        

        // console.log(".top: " + this.dropdownParentNode.style.top)
        // console.log(".bottom:" + this.dropdownParentNode.style.bottom)

        // var w = window.innerWidth;
        // var h = window.innerHeight;

        // var x = event.clientX;     
        // var y = event.clientY;

        // if(thisObject.CheckTouchDevice.iisTouchDevices){
        //     x = event.touches[0].clientX;
        //     y = event.touches[0].clientY;
        // }

        // if(thisObject.showContentRelativeToClickPoint_forHorizontal){
        //     if(x > 0.6*w){
        //         thisObject.contentNode.style.left = ""
        //         thisObject.contentNode.style.right = "0px"
        //     }
        //     else{
        //         thisObject.contentNode.style.right = ""
        //         thisObject.contentNode.style.left = "0px"
        //     }
        // }

        // if(thisObject.showContentRelativeToClickPoint_forVertical){
        //     if(y > 0.6*h){
        //         thisObject.contentNode.style.top = ""
        //         thisObject.contentNode.style.bottom = "0px"
        //     }
        //     else{

        //         thisObject.contentNode.style.bottom = ""
        //         thisObject.contentNode.style.top = "0px"
        //     }
        // }
    }
    


    removeDefaultEvent_mouseDown_dropdownParent(){
        this.dropdownParentNode.onmousedown = function(event){
            event.preventDefault();
        }
    }

    removeClickEventToShowDropDown(){
        this.buttonNode.onclick = function(){}
    }


    setDrowdownConent(element){
        this.dropdownParentNode.innerHTML = ""
        this.dropdownParentNode.appendChild(element)
    }
    








    
}

