import Dropdown from "../dropdown/dropdown.js"
import View from "./view.js"

export default class InputWithOption{

    /*    
    README

    STRUCTURE

        items = [
            {
                id: 1,
                text: "aaa"
            },
            {
                id: 2,
                text: "bbb"
            }
        ]

    CUSTOMIZATION

    WARNING
       
    DEPENDENCY
    */

    constructor(){

        //--setting -----
        this.isSearchable = false
        this.inputMode = "text" 
        /* 
            for keyboard in mobile device
            // -- options
            text
            numeric
        */

        this.allowMisMatchInput = false 
        /*
            only when  isSearchable = true
         */

        this.allowEmptyInput = false

        this.placeholder = ""
        this.showMoveArrows = true
        this.showDropdownSymbol = true

       

        //-- other 
        this.dropdown = new Dropdown()

        //-- view 
        this.view = new View(this)


        //-- data
        this.items = []


        //-- utility *** 
        this.eventFunction_forKeyPushed = ()=>{}
        this.disable = false


        //-- after function
        /* 
            trigger to all action that change the selection
                - click item
                - move by arrows
                - move by keys when show list
                - auto first item selection
         */
        this.afterFunction_changeSelectedItem = ()=>{} 


        /* 
            trigger when
                - click item
                - move by arrows
         */
        this.afterFunction_selectItem = ()=>{} 

        

        this.functionFor_searchItems = this.simpleSearchItemsByKeyText
        
    }

    createViews(elementStyle={}, items){

        this.items = items

        var dropdown = this.dropdown
        
        var viewElements = this.view.createElements(elementStyle, items)

        //-- *** prevent input blur when click inside dropdown *** 
        dropdown.view.removeDefaultEvent_mouseDown_dropdownParent()

        //--remove onclick function to show dropdown manu (dropdown will be shown when input is focused)
        dropdown.view.removeClickEventToShowDropDown()

        dropdown.functionForClickOutSide = () => {
            console.log("functionForClickOutSide()")
            this.view.inputNode.blur()
        }

        
        return {
            mainParentNode: viewElements.mainParentNode
        }

    }

    // set_property(name, value){
    //     this[name] = value
    // }

    whenInputFocus(){
        this.dropdown.showDropdown()
        this.addEventListenerForKeyboard()
    }

    whenInputBlur(){
        this.dropdown.hideDropdown()
        if(this.isSearchable){
            this.changeAllItemsDisplaying(true)
            if(!this.allowMisMatchInput){
                this.view.showSelectedItemInInput(this.getSelectedItem())
            }
            else{
                if(!this.allowEmptyInput){
                    this.checkEmptyInput()
                }
                
            }
        }
        this.removeEventListenerForKeyboard()
    }

    addEventListenerForKeyboard(){
        
        window.addEventListener("keyup", this.eventFunction_forKeyPushed = (event) => {

            // console.log("keyup")
            if(event.key=="Enter"){
                this.view.blurInput()
            }
            else if(event.key=="ArrowUp" || event.key=="ArrowDown") {
                if(event.key=="ArrowUp"){
                    this.moveSelection("previous")
                }
                else{
                    this.moveSelection("next")
                }
            }
            else if(event.key=="Tab"){

            }
            else {
                if(!this.isSearchable){
                    event.preventDefault();
                }
                else {
                    this.searchItems()
                }
                
            }
        })

    }

    removeEventListenerForKeyboard(){
        window.removeEventListener("keyup", this.eventFunction_forKeyPushed)
    }

    

    getSelectedItemIndex(){

        var items = this.items
        var targetIndex = "none"
        for(var i=0; i<items.length; i++){
            if(items[i].isSelected===true){
                targetIndex = i
                break
            }
        }

        if(targetIndex=="none") return false

        return targetIndex

    }
    
    getSelectedItem(){
        var targetIndex = this.getSelectedItemIndex()
        if(targetIndex===false) return false
        return this.items[targetIndex]
    }

    getInputValue(){
        return this.view.getInputValue().trim()
    }

    getNeigboringOfSelectedItem(of){
        var items = this.items

        var targetIndex = this.getSelectedItemIndex()

        // console.log("move action: "+of)
        // console.log("selectedItemIndex: "+targetIndex)

        if(targetIndex===false) return false

        var getIndex = false
        while(!getIndex){
            if(of=="previous") targetIndex--
            else if(of=="next") targetIndex++

            if(targetIndex < 0 || targetIndex >= this.items.length) return false

            if(items[targetIndex].isDisplayed){
                getIndex = true
            }
        }

        

        // console.log("newIndex: "+targetIndex)

        return items[targetIndex]
    }
    



    moveSelection(to){
        if(this.disable) return
        var item = this.getNeigboringOfSelectedItem(to)
        if(item===false) return 
        this.changeSelectedItem(item)
    }


    changeSelectedItem(item){
        var items = this.items

        var selectedItem = "none"
        var selectedOrder = "none"
        for(var i=0; i< items.length; i++){
            var thisItem = items[i]
            if(thisItem.id == item.id){
                thisItem.isSelected = true

                selectedItem = items[i]
                selectedOrder = i
            }
            else{
                thisItem.isSelected = false
            }
        }
        if(selectedItem == "none") return

        //-- change selection 
        this.view.changeItemSelections(items)
        //-- show selected item 
        this.view.showSelectedItemInInput(selectedItem)
        //-- change 
        this.view.changeArrowStrokeColor(selectedOrder, items)

        this.afterFunction_changeSelectedItem()

        return selectedItem
    }


    chooseItem(item){
        this.changeSelectedItem(item) 
        this.view.inputNode.blur()
    }



    getItemById(id){

        var items = this.items
        var targetItem = "none"
        for(var i=0; i< items.length; i++){
            var item = items[i]
            if(item.id==id){
                targetItem = item
                break
            }
        }

        return (targetItem==="none")? false: targetItem
    }



    selectItemFromId(id){
        // var itmes = this.items
        var item = this.getItemById(id)
        this.changeSelectedItem(item)  
    }



    disableInputSelection(){
        this.disable = true
        this.view.inputNode.onblur = (event) => {}
        this.view.inputNode.onfocus = (event) => {
            this.view.inputNode.blur()
        }
    }

    enableInputSelection(){
        this.disable = false
        this.view.inputNode.onblur = (event) => {
            this.whenInputBlur()
        }
        this.view.inputNode.onfocus = (event) => {
            this.whenInputFocus()
        }
    }



    searchItems(){

        var searchText = this.view.inputNode.value
        console.log("search: "+searchText)

        var relatedItems = this.functionFor_searchItems(this.items, searchText)

        // console.log(relatedItems)
    
        var relatedIds = []
        for(var index in relatedItems){
            relatedIds.push(relatedItems[index].id)
        }


        for(var index in this.items){
            var item = this.items[index]
            var isDisplayed = false

            if(relatedIds.includes(item.id)){
                isDisplayed = true
            }
            item.isDisplayed = isDisplayed
        }

        this.view.changeItemDisplaying(this.items)
    }



    simpleSearchItemsByKeyText(items, searchText){

        // if(searchText==="") return items

        var relatedItems = []
        for(var index in items){
            var item = items[index]
            if(item.text.toString().includes(searchText)){
                relatedItems.push(item)
            }

        }
        return relatedItems
    }


    changeAllItemsDisplaying(isDisplayed){
        for(var index in this.items){
            this.items[index].isDisplayed = isDisplayed
        }
        this.view.changeItemDisplaying(this.items)
    }


    checkEmptyInput(){
        var inputValue = this.getInputValue()
        var isValid = (inputValue.replace(/\s/g,'') === "")? false: true
        this.view.changeInputStyleAsValueValidation(isValid)

        return isValid

    }


    recreateListItems(items){
        this.items = items
        this.view.recreateListItems(items)
        if(items.length > 0) this.changeSelectedItem(items[0])
        
    }


    checkAndGetInputValue(){
        return {
            isValid: this.checkEmptyInput(),
            value: this.getInputValue()
        }
    }


    setInputValue(value){
        if(this.allowMisMatchInput) this.view.setInputValue(value)
        
    }


    selectItemFromText(text){
        
        var items = this.items
        var targetItem = false
        for(var i=0; i< items.length; i++){
            var item = items[i]
            if(item.text==text){
                targetItem = item
                break
            }
        }
        if(targetItem !== false) this.changeSelectedItem(item)  
        return targetItem
    }

}



