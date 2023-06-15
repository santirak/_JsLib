import Dropdown from "../dropdown/dropdown.js"
import View from "./view.js"

export default class InputWithSelection{

    /*    
    README

    STRUCTURE

    CUSTOMIZATION

    WARNING
       
    DEPENDENCY
    */

    constructor(options={}){

        //--setting -----
        this.isSearchable = false

        //-- get option value
        for(var key in options){
            this[key] = options[key]
        }


        //-- view 
        this.view = new View(this)


        //-- data
        this.items = []


        //-- utility
        this.eventFunction_moveSelectionByKeys = ()=>{}
    }

    createViews(items){
        
        this.view.createElements(items)


        this.items = items


        //--make dropdown
        var elements = {
            parentNode: this.view.mainParentNode,
            buttonNode: this.view.inputNode
        }
        var dropdown = new Dropdown(elements)
        dropdown.createViews()

        //-- *** prevent input blur when click inside dropdown *** 
        dropdown.view.dropdownParentNode.onmousedown = function(event){
            event.preventDefault();
        }

        //--remove onclick function to show dropdown manu
        this.view.inputNode.onclick = function(){}

        //-- attach show and hide dropdown function to focus and blur
        this.view.inputNode.onfocus = (event) => {
            this.whenInputFocus()
        }
        this.view.inputNode.onblur = (event) => {
            this.whenInputBlur()
        }
        
        //--apprend selection list to drop down
        dropdown.view.dropdownParentNode.innerHTML = ""
        dropdown.view.dropdownParentNode.appendChild(this.view.parentNode)

        this.dropdown = dropdown

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
        this.removeEventListenerForKeyboard()
    }

    addEventListenerForKeyboard(){
        window.addEventListener("keydown", this.eventFunction_moveSelectionByKeys = (event) => {

            if(event.key=="Enter"){
                this.view.inputNode.blur()
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
                
            }
        })

    }

    removeEventListenerForKeyboard(){
        window.removeEventListener("keydown", this.eventFunction_moveSelectionByKeys)
    }

    

    moveSelection(to){
        var item = this.getNeigboringOfSelectedItem(to)
        if(item===false) return 
        this.changeSelectedItem(item)
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
        if(targetIndex==false) return false
        return this.items[targetIndex]
    }

    getNeigboringOfSelectedItem(of){
        var items = this.items

        var targetIndex = this.getSelectedItemIndex()

        if(targetIndex==false) return false

        if(of=="previous") targetIndex--
        else if(of=="next") targetIndex++

        if(targetIndex<0 || targetIndex >= this.items.length) return false

        return items[targetIndex]
    }
    


    changeSelectedItem(item){

        var items = this.items
        var selectedItem = "none"
        var selectedOrder = "none"
        for(var i=0; i< items.length; i++){
            var thisItem = items[i]
            if(thisItem.id==item.id){
                thisItem.isSelected = true

                selectedItem = thisItem
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



}



