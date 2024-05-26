import ViewTemplate from "../_class/view.js"

export default class View extends ViewTemplate{

    /*    
    README

   
    STRUCTURE
       

    CUSTOMIZATION

    WARNING
       NOTE: this style is used for valid value too so all style value for invalid value need to be in normal style too.

    DEPENDENCY
    */


    constructor(viewController) {

        super()

        //--setting 
        

        
        //-- view controller
        this.viewController = viewController


        //-- set style of each element
        // --  *** NOTE: this style is used for valid value too so all style value for invalid value need to be in normal style too.
        this.elementStyle = {
            style_input: {borderColor: ''}, 
            style_inputWithInvalidValue: {borderColor: 'red'}
        }




    }

    



    //-- view creator ---------
    createElements(elementStyle=null){

        this.updateStyleObject(elementStyle)
        
        // console.log("createElements")

        var mainParentNode = this.createMainParentNode()
        
        var inputNode = this.createInputNode()
        mainParentNode.appendChild(inputNode)

        return {
            mainParentNode: mainParentNode
        }

    }



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


    getInputValue(){
        return this.inputNode.value
    }

   

    //-- view modifier ---------
    changeInputStyleAsValueValidation(isValid,){
        var style = (isValid)? this.elementStyle.style_input: this.elementStyle.style_inputWithInvalidValue
        this.setElementStyle(this.inputNode, style)
    }

    setInputValue(value){
        this.inputNode.value = value
    }


    



}























