
export default class View{

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

       

        

        


        //-- setting ----
        // this.isDisplaying = false
        this.createDropdownPointer = false;
        

        //-- get option value
        for(var key in options){
            this[key] =options[key]
        }
        
        

        //-- view
        this.viewController = viewController



        //-- style
        this.elementStyle = {
            style_dropdownParent: {},
            style_pointer: {}
        }

    }




    
    createElements(elementStyle = {}, elements){
        // this.elements = elements

        // console.log("createElements().elements: ")
        // console.log(elements)

        this.elementStyle = elementStyle

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
        dropdownParentNode.style.width = "100%";
        dropdownParentNode.style.position = "absolute";
        dropdownParentNode.style.top = "105%";
        dropdownParentNode.style.left = "0%";
        dropdownParentNode.style.cursor = "default";
        dropdownParentNode.style.zIndex = "5";
        dropdownParentNode.style.maxHeight = "300px"
        dropdownParentNode.style.backgroundColor = "white"
        dropdownParentNode.style.boxShadow =  "0px 0px 6px rgba(0, 0, 0, 0.3)";
        dropdownParentNode.style.overflow = "scroll"
        // dropdownParentNode.style.overflowX = "visible"

        
        // dropdownParentNode.style.fontSize = "inherit"
        // dropdownParentNode.style.fontFamily = "inherit"
        dropdownParentNode.innerHTML = "innerHTML";


        this.setElementStyle(dropdownParentNode, this.elementStyle.style_dropdownParent)

        //--dec 
        // dropdownParentNode.style.width = "200px";
        // dropdownParentNode.style.backgroundColor = "white";
        // dropdownParentNode.style.top = "60px";
        // dropdownParentNode.style.right = "0px";
        // dropdownParentNode.style.borderRadius = "12px";
        // dropdownParentNode.style.boxShadow = "0px 0px 6px rgba(0, 0, 0, 0.3)";

        this.dropdownParentNode = dropdownParentNode;
        
        return dropdownParentNode
    }




   
    createPointerNode(){

        var pointerNode = document.createElement("DIV");
        // pointerNode.style.display = "none";
        pointerNode.style.position = "absolute";
        pointerNode.style.height = "0px";
        pointerNode.style.borderWidth = "10px";
        pointerNode.style.borderStyle = "solid";
        pointerNode.style.top = "100%";
        pointerNode.style.left = "20px";
        pointerNode.style.borderRadius = "8px";
        pointerNode.style.borderColor = "transparent transparent red transparent";
        pointerNode.style.cursor = "default";
        pointerNode.innerHTML = " "

        this.setElementStyle(pointerNode, this.elementStyle.style_pointer)

        this.pointerNode = pointerNode;

        return pointerNode
    }


    setElementStyle(element, styles){
        for(var key in styles){
            element.style[key] = styles[key]
        }
    }




    //-- view modifications ----------------------------
    changeDropdownDisplaying(){
        var isShow = this.viewController.isDisplaying
        this.dropdownParentNode.style.display = (isShow)? "":"none"
        if(this.createDropdownPointer){
            this.pointerNode.style.display = (isShow)? "":"none"
        }
    }

    changeDropdownLocationRelateToParentLocation(){


        //-- TODO: 

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

