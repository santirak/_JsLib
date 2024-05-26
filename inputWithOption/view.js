import ViewTemplate from "../_class/view.js"

export default class View extends ViewTemplate{

    /*    
    README

   
    STRUCTURE
       

    CUSTOMIZATION

    WARNING
       

    DEPENDENCY
    */


    constructor(viewController) {

        super()
        
        //--setting 
        
        
        
        //-- view controller
        this.viewController = viewController


        //-- style
        this.elementStyle = {
            style_mainParent: {
                width: "100%",
                float: "left"
            },
            style_arrowParent: {
                width: "16px",
                float: "right",
                overflow: "hidden"
            },
            style_arrowParentWhenHide: {
                width: "0px",
            },
            style_arrowSvgNode: {
                width: "100%",
                float: "left",
                textAlign: "center",
                stroke: "dimgray",
                padding: "3px 4px",
                paddingBottom: "4.5px",
                fontSize: "1px",
                cursor: "pointer"
            },
            style_arrowSvgNodeWhenDisabled: {
                stroke: "lightgray"
            },
            style_inputParent: {
                position: "relative",
                marginRight: "16px"
            },
            style_inputParentWhenNoArrow: {
                marginRight: "0px"
            },
            style_input: {
                width: "100%",
                // float: "left" //-- ** No float to make input parent node wrap input node since input parent node has no float
                padding: "4px",
                borderColor: ''
            },
            style_inputWithInvalidValue: {borderColor: 'red'},
            style_dropdownSymbolNode: {
                position: "absolute",
                right: "0px",
                padding: "4px",
                top: "50%",
                transform: "translate(0%,-50%)",
                cursor: "pointer"

            },
            style_listParent: {
                width: "100%",
                float: "left"
            },
            style_item: {
                width: "100%",
                float: "left",
                cursor: "pointer",
                padding: "4px",
                textAlign: "left",
                backgroundColor: ''
            },
            style_itemWhenSelected: {
                backgroundColor: 'lightgray'
            }
            
        }


        this.arrowSVG = '<svg style="display: block;" height="" width="100%" viewBox = "0,0,48,24"><path d="M48 24 L24 2 L0 24" stroke="" stroke-width="6" fill="none"/></svg>'
    
    }

    

    //-- view creator ---------
    createElements(elementStyle = null, items){

        this.updateStyleObject(elementStyle)

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
        this.viewController.dropdown.createViews(null, elements)
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
        this.mainParentNode = mainParentNode
        this.setElementStyle(mainParentNode, this.elementStyle.style_mainParent)
        return mainParentNode
    }


    createInputParentNode(){
        var inputParentNode = document.createElement("div");
        this.inputParentNode = inputParentNode

        if(this.viewController.showDropdownSymbol){
            var dropdownSymbolNode = document.createElement("div")
            dropdownSymbolNode.innerHTML = "&#9662;"
            dropdownSymbolNode.onclick = () => {this.inputNode.focus()}

            this.setElementStyle(dropdownSymbolNode, this.elementStyle.style_dropdownSymbolNode)
            inputParentNode.appendChild(dropdownSymbolNode)
        }
        
        
        this.setElementStyle(inputParentNode, this.elementStyle.style_inputParent)
        if(!this.viewController.showMoveArrows) this.setElementStyle(inputParentNode, this.elementStyle.style_inputParentWhenNoArrow)
        return inputParentNode
    }



    createInputNode(){

        var inputNode = document.createElement("input");
        // // inputNode.style.float = "left" //-- *** NOTE: No float to make input parent node wrap input node since input parent node has no float
        
        inputNode.placeholder = this.viewController.placeholder

        if(!this.viewController.isSearchable){
            inputNode.style.caretColor = "transparent"
            inputNode.setAttribute("inputmode", "none") //-- *** NOTE: prevent showing keyboard on touch device
            inputNode.addEventListener("keydown", (event)=>{event.preventDefault()}) //-- *** NOTE: prevnet all keyboard
        }
        else{
            inputNode.setAttribute("inputmode", this.viewController.inputMode)
        }

        /* *** NOTE: readOnly is not used because it prevent focus the input */
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
        itemNode.innerHTML = item.text
        itemNode.onclick = () => {
            this.viewController.chooseItem(item)
            this.viewController.afterFunctin_selectItem()
        }
        

        this.setElementStyle(itemNode, this.elementStyle.style_item)

        if(item.isSelected) this.setElementStyle(itemNode, this.elementStyle.style_itemWhenSelected)
        itemNode.style.display = (item.isDisplayed)? "": "none"
        

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
        this.listParentNode = parentNode

        this.setElementStyle(parentNode, this.elementStyle.style_listParent)

        return parentNode
    }

   



    createArrowNode(){

        var arrowParentNode = document.createElement("div")
        this.setElementStyle(arrowParentNode, this.elementStyle.style_arrowParent)
        if(!this.viewController.showMoveArrows) this.setElementStyle(arrowParentNode, this.elementStyle.style_arrowParentWhenHide)

        var createNode = () => {
            var node = document.createElement("div")
            node.innerHTML = this.arrowSVG

            this.setElementStyle(node, this.elementStyle.style_arrowSvgNode)
            
            return node
        }


        var upNode = createNode()
        upNode.onclick = () => {
            this.viewController.moveSelection("previous")
            this.viewController.afterFunctin_selectItem()
        }
        this.upArrowNode = upNode
        arrowParentNode.appendChild(upNode)


        var downNode = createNode()
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
        
        var elementStyle = this.elementStyle 

        this.setElementStyle(this.upArrowNode, (selectionOrder==0)? elementStyle.style_arrowSvgNodeWhenDisabled: elementStyle.style_arrowSvgNode)
        this.setElementStyle(this.downArrowNode, (selectionOrder==items.length-1)? elementStyle.style_arrowSvgNodeWhenDisabled: elementStyle.style_arrowSvgNode)

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
        
        var style = (isValid)? this.elementStyle.style_input: this.elementStyle.style_inputWithInvalidValue
        this.setElementStyle(this.inputNode, style)
    }
    
    

    recreateListItems(items){
        this.createItemList(items)
    }

    setInputValue(value){
        this.inputNode.value = value
    }





}























