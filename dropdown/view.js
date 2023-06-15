
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

    

    constructor(viewController, elements, options={}) {

        // console.log("constructor")

        this.parentNode = elements.parentNode
        this.buttonNode = elements.buttonNode

        this.parentNode.style.position = "relative"


        //-- setting ----
        // this.isDisplaying = false
        this.createDropdownPointer = false;
        
        
        //-- get option value
        for(var key in options){
            this[key] =options[key]
        }

        //-- view
        this.viewController = viewController



        //-- create defaul style
        this.style_dropdownParent = this.createStyleForDropdownParent()
        this.style_pointer = this.createStylePointer()

    }




    
    createElements(){
        
        var parentNode = this.parentNode

        var dropdownParentNode = this.createDropdownParentNode()
        parentNode.appendChild(dropdownParentNode)

        if(this.createDropdownPointer){
            var pointerNode = this.createPointerNode()
            parentNode.appendChild(pointerNode) 
        }
        

        var buttonNode = this.buttonNode
        buttonNode.onclick = () => {
            this.viewController.toggleDropdown()
        }

        this.changeDropdownDisplaying()

    }




    //-- view creators ----------------------------
    createStyleForDropdownParent(){
        return {
            width: "100%",
            backgroundColor: "white",
            // padding: "12px",
            top: "100%",
            left: "0%",
            borderRadius: "8px",
            boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.3)"
        }
    }


    createDropdownParentNode(){

        var dropdownParentNode = document.createElement("DIV");
        dropdownParentNode.style.position = "absolute";
        dropdownParentNode.style.cursor = "default";
        dropdownParentNode.innerHTML = "innerHTML";


        this.setElementStyle(dropdownParentNode, this.style_dropdownParent)

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




    createStylePointer(){
        return {
            top: "100%",
            left: "20px",
            // borderRadius: "8px",
            borderColor: "transparent transparent red transparent"
        }
    }


   
    createPointerNode(){


        var pointerNode = document.createElement("DIV");
        // pointerNode.style.display = "none";
        pointerNode.style.position = "absolute";
        pointerNode.style.height = "0px";
        pointerNode.style.borderWidth = "10px";
        pointerNode.style.borderStyle = "solid";
        pointerNode.style.cursor = "default";
        pointerNode.innerHTML = " "

        this.setElementStyle(pointerNode, this.style_pointer)

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
    












    // //-- view actions ----------------------------
    // showDropdown(){
    //     this.isDisplaying = true
    //     this.changeDropdownDisplaying()

    //     //--add event listener
    //     window.addEventListener("click", this.function_clickOtherAreaToHideDropDownContent = (event)=>{
    //         // console.log("Listenning")
    //         var clickInParent = ActionEvent.checkClickOnChildOfParents(event, [this.parentNode, this.buttonNode])
    //         if(!clickInParent){
    //             this.hideDropdown()
    //         }
    //     });

    //     //-- change location
    //     this.changeDropdownLocationRelateToParentLocation()


    // }

    // hideDropdown(){
    //     // console.log("Stop Listenning")
    //     this.isDisplaying = false
    //     this.changeDropdownDisplaying(false)
        
    //     //--remove event listener
    //     window.removeEventListener("click", this.function_clickOtherAreaToHideDropDownContent)


    // }

    // toggleDropdown(){

    //     if(this.isDisplaying){
    //         this.hideDropdown()
    //     }
    //     else{
    //         this.showDropdown()
    //     }
    // }


}

