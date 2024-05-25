export default class View{

    /*    
    README

   
    STRUCTURE
       

    CUSTOMIZATION

    WARNING
       

    DEPENDENCY
    */


    constructor(viewController, options = {}) {


        //--setting 
        
        
        
        //-- view controller
        this.viewController = viewController


        //-- style
        this.elementStyle = {
            style_input: {}
        }


        


        //-- get option value
        for(var key in options){
            this[key] = options[key]
        }


    }

    



    //-- view creator ---------
    createElements(elementStyle={}){

        this.elementStyle = elementStyle

        console.log("createElements")
        console.log(elementStyle)

        var mainParentNode = this.createMainParentNode()
        
        var inputNode = this.createInputNode()
        mainParentNode.appendChild(inputNode)

        return {
            mainParentNode: mainParentNode
        }

    }


    // defaultStyle_mainParent(){
    //     return {}
    // }


    createMainParentNode(){
        var mainParentNode = document.createElement("DIV")
        mainParentNode.style.width = "100%"
        mainParentNode.style.float = "left"
        
        this.mainParentNode = mainParentNode

        return mainParentNode
    }


    createInputNode(){
        var autocomplete = ""
        var inputMode = "text"
        if(this.viewController.valueType == "numeric" || this.viewController.valueType == "thaiIdNumber" ){
            inputMode = "numeric"
        }
        else if(this.viewController.valueType == "thaiPhoneNumber"){
            inputMode = "numeric"
            autocomplete = "tel"
        }
        else if(this.viewController.valueType == "decimal"){
            inputMode = "decimal"
        }
        else if(this.viewController.valueType == "email"){
            inputMode = "email"
            autocomplete = "email"
        }
        else if(this.viewController.valueType == "url"){
            inputMode = "url"
        }
        // else if(this.viewController.valueType == "tel" ){
        //     inputMode = "tel"
        // }

        

        var inputNode = document.createElement("input");
		inputNode.style.width = "100%"
        inputNode.style.float = "left" 
        inputNode.style.padding = "4px" 
        inputNode.placeholder = this.viewController.placeholder
        // inputNode.className = "lp_input"
        inputNode.setAttribute("inputmode", inputMode)
        inputNode.setAttribute("autocomplete", autocomplete)


        this.setElementStyle(inputNode, this.elementStyle.style_input)

        this.inputNode = inputNode


        
        inputNode.onblur = ()=>{
            this.viewController.functionFor_blurInput()
        }
        
        return inputNode

    }




    setElementStyle(element, styles){
        for(var key in styles){
            element.style[key] = styles[key]
        }
    }



    getInputValue(){
        return this.inputNode.value
    }

    




    //-- view modifier ---------
    changeInputStyleAsValueValidation(isValid,){
        this.setElementStyle(this.inputNode, this.viewController.validStyle[isValid])
    }

    setInputValue(value){
        this.inputNode.value = value
    }


    



}























