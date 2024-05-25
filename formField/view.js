export default class View{

    /*    
    README

   
    STRUCTURE
       

    CUSTOMIZATION

    WARNING
       

    DEPENDENCY
    */


    constructor(viewController=null, options = {}) {


        //--setting 
        
        
        
        //-- view controller
        this.viewController = viewController


        //-- create defaul style
        this.elementStyle = {
            style_mainParent: {},
            style_nameParent: {},
            style_nameNode: {},
            style_requiredSymbol: {},
            style_inputParent: {}
        }
        
       
       

        //-- get option value
        for(var key in options){
            this[key] = options[key]
        }


    }

    



    //-- view creator ---------
    createElements(elementStyle, name, isRequired=false){

        this.elementStyle = elementStyle

        var mainParentNode = this.createMainParentNode()
        
        var nameParentNode = this.createNameParent()
        var nameNode = this.createNameNode(name)
        nameParentNode.appendChild(nameNode)

        if(isRequired){
            var requiredSymbolNode = this.createRequiredSymbolNode(name)
            nameParentNode.appendChild(requiredSymbolNode)
        }   
        

        mainParentNode.appendChild(nameParentNode)

        var inputParentNode = this.createInputParentNode()
        mainParentNode.appendChild(inputParentNode)


        return {
            mainParentNode: mainParentNode,
            inputParentNode: inputParentNode
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

    



    createNameParent(){
        var nameParentNode = document.createElement("DIV")
        nameParentNode.style.width = "100%"
        nameParentNode.style.float = "left"
        
        this.nameParentNode = nameParentNode

        this.setElementStyle(nameParentNode, this.elementStyle.style_nameParent)

        return nameParentNode
    }




    createNameNode(name){
        var nameNode = document.createElement("DIV")
        nameNode.style.display = "inline-block"
        nameNode.style.float = "left"
        nameNode.innerHTML = name


        this.setElementStyle(nameNode, this.elementStyle.style_nameNode)

        return nameNode
    }


    createRequiredSymbolNode(){
        var symbolNode = document.createElement("SUP")
        symbolNode.style.display = "inline-block"
        symbolNode.style.float = "left"
        symbolNode.style.color = "red"
        symbolNode.innerHTML = "*"

        this.setElementStyle(symbolNode, this.elementStyle.style_requiredSymbol)

        return symbolNode
    }




    createInputParentNode(){
        var inputParentNode = document.createElement("div");
        inputParentNode.style.width = "100%"
        inputParentNode.style.float = "left"
        // inputParentNode.innerHTML = "&nbsp;"
        // inputParentNode.style.overflow = "hidden"

        this.inputParentNode = inputParentNode

        this.setElementStyle(inputParentNode, this.elementStyle.style_inputParent)
        return inputParentNode
    }





    setElementStyle(element, styles){
        for(var key in styles){
            element.style[key] = styles[key]
        }
    }


    //-- view modifier ---------
    
   


}























