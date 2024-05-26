import ViewTemplate from "../_class/view.js"

export default class View extends ViewTemplate{

    /*    
    README

   
    STRUCTURE
       

    CUSTOMIZATION

    WARNING
       

    DEPENDENCY
    */


    constructor(viewController, options = {}) {

        super()

        //--setting 
       

        //-- view controller
        this.viewController = viewController


        //-- create defaul style
        this.elementStyle = {
            style_mainParent: {},
            style_inputParent: {
                position: "relative"
            },
            style_input: {
                width: "100%",
                // inputNode.style.float = "left" //-- ** No float to make input parent node wrap input node since input parent node has no float
                padding: "4px",
                borderColor: ''
            },
            style_inputWithInvalidValue: {borderColor: 'red'},
            
        }   

        

        // -- change style of Other View
        var elementStyle_forDropdown = {
            style_dropdownParent: {width: "0px", overflow: "visible", boxShadow: ""}
        }
        this.viewController.dropdown.view.updateStyleObject(elementStyle_forDropdown)
        console.log(this.viewController.dropdown.view.elementStyle)
        
        //-- get option value
        for(var key in options){
            this[key] = options[key]
        }


    }

    

    //-- view creator ---------
    createElements(elementStyle = null){

        this.updateStyleObject(elementStyle)

        var mainParentNode = this.createMainParentNode()

        var inputParentNode = this.createInputParentNode()
        var inputNode = this.createInputNode()
        inputParentNode.appendChild(inputNode)
        mainParentNode.appendChild(inputParentNode)


        //-- calendar
        var returnElements = this.viewController.calendar.createViews()

        //-- dropdown
        var elements = {
            parentNode: inputParentNode,
            buttonNode: inputNode
        }
        
        this.viewController.dropdown.createViews(null, elements)
        this.viewController.dropdown.setDrowdownConent(returnElements.mainParentNode)

        return {
            mainParentNode: mainParentNode,
            inputParentNode: inputParentNode,
            inputNode: inputNode
        }

        

    }


    createMainParentNode(){
        var mainParentNode = document.createElement("DIV")
        mainParentNode.style.width = "100%"
        mainParentNode.style.float = "left"
        
        
        this.mainParentNode = mainParentNode

        this.setElementStyle(mainParentNode, this.elementStyle.style_mainParent)

        return mainParentNode
    }




    createInputParentNode(){
        var inputParentNode = document.createElement("div");
        this.inputParentNode = inputParentNode
        this.setElementStyle(inputParentNode, this.elementStyle.style_inputParent)
        return inputParentNode
    }



    createInputNode(){

        var inputNode = document.createElement("input");
        // inputNode.style.float = "left" //-- ** No float to make input parent node wrap input node since input parent node has no float
        inputNode.placeholder = this.viewController.placeholder
        inputNode.style.caretColor = "transparent"
        inputNode.setAttribute("inputmode", "none") //--prevent showing keyboard on touch device
        // inputNode.addEventListener("keydown", (event)=>{event.preventDefault()}) //-- prevnet all keyboard
       
        /* readOnly is not used because it prevent focus the input */
        // inputNode.readOnly = !this.isSearchable
        // inputNode.disabled = !this.isSearchable
        
        this.setElementStyle(inputNode, this.elementStyle.style_input)

        this.inputNode = inputNode


        this.inputNode.onfocus = (event) => {
            console.log("focus")
            this.viewController.whenInputFocus()
        }
        // this.inputNode.onblur = (event) => {
        //     this.viewController.whenInputBlur()
        // }

        return inputNode

    }




    //-- view modifier ---------

    showSelectedDateInInput(dateObject){
        this.inputNode.value = dateObject.getDate() + "-" + (dateObject.getMonth() + 1)  + "-" + dateObject.getFullYear()
    }


    changeInputStyleAsValueValidation(isValid){
        var style = (isValid)? this.elementStyle.style_input: this.elementStyle.style_inputWithInvalidValue
        this.setElementStyle(this.inputNode, style)
    }
    
    

    



}























