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
            style_mainParent: {},
            style_arrowParent: {},
            style_inputParent: {},
            style_input: {},
            style_listParent: {},
            style_item: {}
        }
        // this.itemViewsById = {}


        
        //-- get option value
        for(var key in options){
            this[key] = options[key]
        }


    }

    

    //-- view creator ---------
    createElements(elementStyle, items){

        this.elementStyle = elementStyle

        var mainParentNode = this.createMainParentNode()
        
        var arrowParentNode = this.createArrowNode()
        mainParentNode.appendChild(arrowParentNode)
        
        var inputParentNode = this.createInputParentNode()
        var inputNode = this.createInputNode()
        inputParentNode.appendChild(inputNode)
        mainParentNode.appendChild(inputParentNode)

        var listParentNode = this.createListParent(items)//-- list parent has to be appended to dropdownParent
        
        this.createItemList(items)


        //--select first item
        this.viewController.changeSelectedItem(items[0])

        var elements = {
            parentNode: inputParentNode,
            buttonNode: inputNode
        }
        this.viewController.dropdown.createViews(elementStyle, elements)
        this.viewController.dropdown.setDrowdownConent(listParentNode)

        return {
            mainParentNode: mainParentNode,
            inputParentNode: inputParentNode,
            inputNode: inputNode,
            listParentNode: listParentNode
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
        inputParentNode.style.position = "relative"
        inputParentNode.style.marginRight = (this.viewController.showMoveArrows)? "16px": "0px"
        // inputParentNode.style.fontFamily = "inherit"
        // inputParentNode.style.overflow = "hidden"

        this.inputParentNode = inputParentNode

        if(this.viewController.showDropdownSymbol){
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
        
        
        this.setElementStyle(inputParentNode, this.elementStyle.style_inputParent)
        return inputParentNode
    }



    createInputNode(){

        var inputNode = document.createElement("input");
		inputNode.style.width = "100%"
        // inputNode.style.float = "left" //-- ** No float to make input parent node wrap input node since input parent node has no float
        inputNode.style.padding = "4px"
        inputNode.placeholder = this.viewController.placeholder

        if(!this.viewController.isSearchable){
            // inputNode.style.color = "transparent"
            // inputNode.style.textShadow = "0 0 0 black"
            inputNode.style.caretColor = "transparent"
            inputNode.setAttribute("inputmode", "none") //--prevent showing keyboard on touch device
            inputNode.addEventListener("keydown", (event)=>{event.preventDefault()}) //-- prevnet all keyboard
        }
        else{
            inputNode.setAttribute("inputmode", this.viewController.inputMode)
        }

        /* readOnly is not used because it prevent focus the input */
        // inputNode.readOnly = !this.isSearchable
        // inputNode.disabled = !this.isSearchable
        
        this.setElementStyle(inputNode, this.elementStyle.style_input)

        this.inputNode = inputNode


        this.inputNode.onfocus = (event) => {
            this.viewController.whenInputFocus()
        }
        this.inputNode.onblur = (event) => {
            this.viewController.whenInputBlur()
        }

        return inputNode

    }



    createEachItemNode(item){

        if(!("isSelected" in item)){
            item.isSelected = false
        }

        if(!("isDisplayed" in item)){
            item.isDisplayed = true
        }


        var itemNode = document.createElement("div");
		itemNode.style.width = "100%"
        itemNode.style.float = "left"
        itemNode.style.cursor = "pointer"
        itemNode.style.padding = "4px"
        itemNode.style.textAlign = "left"
        itemNode.innerHTML = item.text
        itemNode.onclick = () => {
            this.viewController.chooseItem(item)
            this.viewController.afterFunctin_selectItem()
        }
        

        this.setElementStyle(itemNode, this.elementStyle.style_item)

        itemNode.style.backgroundColor = (item.isSelected)? "lightgray": ""
        itemNode.style.display = (item.isDisplayed)? "": "none"
        

        
        // this.itemViewsById[item.id] = {
        //     itemNode: itemNode,
        //     isDisplayed: true
        // }
        return itemNode
    }




    
    createItemList(items){

        var listParentNode = this.listParentNode
        listParentNode.innerHTML = ""
        
        for(var i=0; i<items.length; i++){
            var item = items[i]
            var itemNode = this.createEachItemNode(item)
            listParentNode.appendChild(itemNode)
        }
        return listParentNode

    }


    createListParent(){

        var parentNode = document.createElement("div");
		parentNode.style.width = "100%"
        parentNode.style.float = "left"
        // parentNode.style.padding = "4px"
        this.listParentNode = parentNode

        this.setElementStyle(parentNode, this.elementStyle.style_listParent)

        return parentNode
    }

    setElementStyle(element, styles){
        for(var key in styles){
            element.style[key] = styles[key]
        }
    }





    createArrowNode(){

        var arrowParentNode = document.createElement("div")
        arrowParentNode.style.width = (this.viewController.showMoveArrows)? "16px": "0px",
        arrowParentNode.style.float = "right"
        arrowParentNode.style.overflow = "hidden"
        this.setElementStyle(arrowParentNode, this.elementStyle.style_arrowParent)

        var createNode = () => {
            var node = document.createElement("div")
            node.style.width = "100%"
            node.style.float = "left"
            node.style.textAlign = "center"
            node.style.padding = "3px 4px"
            node.style.paddingBottom = "4.5px"
            node.style.fontSize = "1px"
            node.style.cursor = "pointer"
            node.style.stroke = this.viewController.arrowStrokeColor
            node.innerHTML = '<svg style="display: block;" height="" width="100%" viewBox = "0,0,48,24"><path d="M48 24 L24 2 L0 24" stroke="" stroke-width="6" fill="none"/></svg>'
            return node
        }


        var upNode = createNode()
        // upNode.style.backgroundColor = "pink"
        upNode.onclick = () => {
            this.viewController.moveSelection("previous")
            this.viewController.afterFunctin_selectItem()
        }
        this.upArrowNode = upNode
        arrowParentNode.appendChild(upNode)


        var downNode = createNode()
        // downNode.style.backgroundColor = "blue"
        downNode.style.transform = "rotate(180deg)"
        downNode.onclick = () => {
            this.viewController.moveSelection("next")
            this.viewController.afterFunctin_selectItem()
        }
        arrowParentNode.appendChild(downNode)
        this.downArrowNode = downNode
        return arrowParentNode
    }    


    getInputValue(){
        return this.inputNode.value
    }


    //-- view modifier ---------
    changeItemSelections(items){
        this.createItemList(items)
    }
    showSelectedItemInInput(selectedItem){
        this.inputNode.value = (selectedItem===false)? "": selectedItem.text
    }

    changeArrowStrokeColor(selectionOrder, items){
        this.upArrowNode.style.stroke  = (selectionOrder==0)? "lightgray": this.viewController.arrowStrokeColor
        this.downArrowNode.style.stroke = (selectionOrder==items.length-1)? "lightgray": this.viewController.arrowStrokeColor
    }

    changeItemDisplaying(items){
        this.createItemList(items)
    }


    blurInput(){
        this.inputNode.blur()
    }


    getInputValue(){
        return this.inputNode.value
    }

    

    //-- view modifier ---------
    changeInputStyleAsValueValidation(isValid,){
        this.setElementStyle(this.inputNode, this.viewController.validStyle[isValid])
    }
    

    recreateListItems(items){
        this.createItemList(items)
    }

    setInputValue(value){
        this.inputNode.value = value
    }





}























