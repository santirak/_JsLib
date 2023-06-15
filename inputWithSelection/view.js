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
        this.showMoveArrows = true
        this.showDropdownSymbol = true
        this.arrowStrokeColor = "dimgray"
        
        //-- get option value
        for(var key in options){
            this[key] = options[key]
        }


        //-- view controller
        this.viewController = viewController


        //-- create defaul style
        this.style_arrowParent = this.createStyle_arrowParent()
        this.style_inputParent = this.createStyle_inputParent()
        this.style_input = this.createStyle_input()
        this.style_listParent = this.createStyle_listParent()
        this.style_item = this.createStyle_item()

        this.itemViewsById = []

    }

    

    //-- view creator ---------
    createElements(items){

        var mainParentNode = this.createMainParentNode()
        
        var arrowParentNode = this.createArrowNode()
        mainParentNode.appendChild(arrowParentNode)
        
        var inputParent = this.createInputParentNode()
        var inputNode = this.createInputNode()
        inputParent.appendChild(inputNode)
        mainParentNode.appendChild(inputParent)

        this.createListParent(items)//-- list parent has to be appended to dropdownParent
        
        this.createItemList(items)

        //--select first item
        this.viewController.changeSelectedItem(items[0], items)

        document.body.appendChild(mainParentNode)

    }


    createMainParentNode(){
        var mainParentNode = document.createElement("DIV")
        mainParentNode.style.width = "100%"
        mainParentNode.style.float = "left"
        
        this.mainParentNode = mainParentNode

        return mainParentNode
    }


    createStyle_inputParent(){
        return {
            marginRight: (this.showMoveArrows)? "16px": "0px"
        }
    }

    createInputParentNode(){
        var inputParentNode = document.createElement("div");
        inputParentNode.style.position = "relative"
        inputParentNode.style.overflow = "hidden"


        if(this.showDropdownSymbol){
            var dropdownSymbolNode = document.createElement("div")
            dropdownSymbolNode.style.position = "absolute"
            dropdownSymbolNode.style.right = "0px"
            dropdownSymbolNode.style.padding = "4px"
            dropdownSymbolNode.style.top = "50%"
            dropdownSymbolNode.style.transform = "translate(0%,-50%)"
            dropdownSymbolNode.style.cursor = "pointer"
            dropdownSymbolNode.innerHTML = "&#9662;"
            dropdownSymbolNode.onclick = () => {this.inputNode.focus()}
            inputParentNode.appendChild(dropdownSymbolNode)
        }
        
        
        this.setElementStyle(inputParentNode, this.style_inputParent)
        return inputParentNode
    }


    createStyle_input(){
        return {
            padding: "4px",
            paddingRight: (this.showDropdownSymbol)? "12px":"",
            borderRadius: "8px",
            border: "1px solid gray"
        }
    }

    createInputNode(){

        var inputNode = document.createElement("input");
		inputNode.style.width = "100%"
        inputNode.style.float = "left"
        inputNode.className = "input"

        if(!this.viewController.isSearchable){
            // inputNode.style.color = "transparent"
            // inputNode.style.textShadow = "0 0 0 black"
            inputNode.style.caretColor = "transparent"
            inputNode.setAttribute("inputmode", "none")
        }
        // inputNode.readOnly = !this.isSearchable
        // inputNode.disabled = !this.isSearchable
        
        this.setElementStyle(inputNode, this.style_input)

        this.inputNode = inputNode

        return inputNode

    }



    createStyle_item(){
        return {
            padding: "4px"
        }
    }


    createEachItemNode(item){

        var itemNode = document.createElement("div");
		itemNode.style.width = "100%"
        itemNode.style.float = "left"
        itemNode.style.cursor = "pointer"
        itemNode.innerHTML = item.text
        itemNode.onclick = () => {
            this.viewController.chooseItem(item)
        }
        

        this.setElementStyle(itemNode, this.style_item)

        var isSelected = ("isSelected" in item)? item.isSelected : false
        itemNode.style.backgroundColor = (isSelected)? "lightgray": ""

        
        // this.itemViewsById[item.id] = {
        //     itemNode: itemNode
        // }
        return itemNode
    }




    
    createItemList(items){

        var parentNode = this.parentNode
        parentNode.innerHTML = ""
        
        for(var i=0; i<items.length; i++){
            var item = items[i]
            var itemNode = this.createEachItemNode(item)
            parentNode.appendChild(itemNode)
        }
        return parentNode

    }


    createStyle_listParent(){
        return {
            padding: "4px"
        }
    }


    createListParent(){

        var parentNode = document.createElement("div");
		parentNode.style.width = "100%"
        parentNode.style.float = "left"
        this.parentNode = parentNode

        this.setElementStyle(parentNode, this.style_listParent)

        return parentNode
    }

    setElementStyle(element, styles){
        for(var key in styles){
            element.style[key] = styles[key]
        }
    }





    createStyle_arrowParent(){
        return {
            width: (this.showMoveArrows)? "16px": "0px",
        }
    }

    createArrowNode(){

        var arrowParentNode = document.createElement("div")
        arrowParentNode.style.float = "right"
        arrowParentNode.style.overflow = "hidden"
        this.setElementStyle(arrowParentNode, this.style_arrowParent)

        var createNode = () => {
            var node = document.createElement("div")
            node.style.width = "100%"
            node.style.float = "left"
            node.style.textAlign = "center"
            node.style.padding = "3px 4px"
            node.style.paddingBottom = "4.5px"
            node.style.fontSize = "1px"
            node.style.cursor = "pointer"
            node.style.stroke = this.arrowStrokeColor
            node.innerHTML = '<svg style="display: block;" height="" width="100%" viewBox = "0,0,48,24"><path d="M48 24 L24 2 L0 24" stroke="" stroke-width="6" fill="none"/></svg>'
            return node
        }


        var upNode = createNode()
        // upNode.style.backgroundColor = "pink"
        upNode.onclick = () => {
            this.viewController.moveSelection("previous")
        }
        this.upArrowNode = upNode
        arrowParentNode.appendChild(upNode)


        var downNode = createNode()
        // downNode.style.backgroundColor = "blue"
        downNode.style.transform = "rotate(180deg)"
        downNode.onclick = () => {
            this.viewController.moveSelection("next")
        }
        arrowParentNode.appendChild(downNode)
        this.downArrowNode = downNode
        return arrowParentNode
    }    




    //-- view modifier ---------
    changeItemSelections(items){
        this.createItemList(items)
    }
    showSelectedItemInInput(selectedItem){
        this.inputNode.value = selectedItem.text
    }

    changeArrowStrokeColor(selectionOrder, items){
        this.upArrowNode.style.stroke  = (selectionOrder==0)? "lightgray": this.arrowStrokeColor
        this.downArrowNode.style.stroke = (selectionOrder==items.length-1)? "lightgray": this.arrowStrokeColor
    }






    



}























