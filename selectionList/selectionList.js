
import View from "./view.js"

export default class SelectionList{

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

    
    constructor() {

        //--settting
        /*
        selectionType:

            1 = click to toggle tick box
            2 = can select only 1 box (cannot uncheck)
            3 = can select only 1 box (allow uncheck)
            4 = can select more than one but have to select at least one
        */
        this.selectionType = 1
        this.showCheckbox = true 
       
        

        // To do:
        // 5 = tick box to toggle & tick text to select one (unselect other)

        //-- view 
        this.view = new View(this)
        
        // -- data
        this.items = []

        
        //-- utility


        //-- function
        this.afterFunction_clickItem = () => {}


    }


    createViews(elementStyle={}){
        return this.view.createElements(elementStyle)
    }



    clickItem(clickItem) {

        var selectionType = this.selectionType

        if(selectionType == 1) {
            clickItem.isSelected = !clickItem.isSelected
        }
        else if(selectionType == 2) {

            if(clickItem.isSelected) return //-- unselect

            this.changeAllItemToUnselected()
            clickItem.isSelected = true
        }
        else if(selectionType == 3) {
            if(clickItem.isSelected){ //-- unselect
                this.changeAllItemToUnselected()
            }
            else {//-- select
                this.changeAllItemToUnselected()
                clickItem.isSelected = true
            }
        }
        else if(selectionType == 4) {

            if(!clickItem.isSelected){ //-- select
                clickItem.isSelected = true
            }
            else{ //-- unselect
                var numberOfSelected = 0
                var items = this.items
                for(var i = 0; i < items.length; i++){
                    if(items[i].isSelected) numberOfSelected++
                }
                if(numberOfSelected > 1){
                    clickItem.isSelected = false
                }
            }
        }

        console.log(this.items)
        this.view.createItemList(this.items)
        this.afterFunction_clickItem(clickItem)
    }

    changeAllItemToUnselected() {
        var items = this.items
        for(var i = 0; i < items.length; i++){
            items[i].isSelected = false
        }
    }



}

