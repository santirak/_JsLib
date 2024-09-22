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
        //-- setting ----
       
        

        //-- view
        this.viewController = viewController


        this.checkedBoxSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="" viewBox="0 -960 960 960" width="100%" fill=""><path d="m424-348 248-248-20-20-228 228-114-114-20 20 134 134ZM232-172q-26 0-43-17t-17-43v-496q0-26 17-43t43-17h496q26 0 43 17t17 43v496q0 26-17 43t-43 17H232Zm0-28h496q12 0 22-10t10-22v-496q0-12-10-22t-22-10H232q-12 0-22 10t-10 22v496q0 12 10 22t22 10Zm-32-560v560-560Z"/></svg>'

        this.uncheckedBoxSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="" viewBox="0 -960 960 960" width="100%" fill="#5f6368"><path d="M232-172q-26 0-43-17t-17-43v-496q0-26 17-43t43-17h496q26 0 43 17t17 43v496q0 26-17 43t-43 17H232Zm0-28h496q12 0 22-10t10-22v-496q0-12-10-22t-22-10H232q-12 0-22 10t-10 22v496q0 12 10 22t22 10Z"/></svg>'


        //-- style
        this.elementStyle = {
            style_mainParent: {
                width: "100%",
                float: 'left'
            },
            style_listParent: {
                width: "100%",
                float: 'left'
            },
            style_itemParent: {
                width: "100%",
                float: 'left',
            },
            style_item: {
                width: "100%",
                float: 'left',
                backgroundColor: '',
                cursor: 'pointer'
            },
            style_itemWhenSelected: {
                backgroundColor: 'lightgray'
            },
            style_itemCheckboxParent: {
                width: '22px',
                float: 'left',
            },
            style_chekedBox: {
                width: '100%',
                float: 'left',
                fill: 'orange'
            },
            style_unchekedBox: {
                width: '100%',
                float: 'left',
                fill: ''
            },
            style_itemTextParent: {
                marginLeft: '22px',
                verticalAlign: 'top',
                padding: '2px 2px'
            }
        }

        
        // if(!viewController.showCheckbox) {//-- this works only when showCheckbox is set by OPTION when SelectionList is created)
        //     this.elementStyle.style_itemTextParent.marginLeft = "0px"
        //     this.elementStyle.style_itemTextParent.width = "100%"
        //     this.elementStyle.style_itemTextParent.float = "left"
        // }



        this.functionFor_addResponsiveTo_itemParentNode = () => {}
    }




    
    createElements(elementStyle = null){

        this.updateStyleObject(elementStyle)


        var mainParentNode =  this.createMainParentNode()
        var listParentNode = this.createListParentNode()
        mainParentNode.appendChild(listParentNode)
        
        this.createItemList(this.viewController.items)

        return {
            mainParentNode: mainParentNode
        }

    }




    createMainParentNode(){
        var mainParentNode = document.createElement("DIV")
        
        this.mainParentNode = mainParentNode

        this.setElementStyle(mainParentNode, this.elementStyle.style_mainParent)
        return mainParentNode
    }

    
    createListParentNode(){
        var listParentNode = document.createElement("DIV")
        
        this.listParentNode = listParentNode

        this.setElementStyle(listParentNode, this.elementStyle.style_listParent)
        return listParentNode
    }


    
    createEachItemNode(item){

        if(!("isSelected" in item)){
            item.isSelected = false
        }

        if(!("isDisplayed" in item)){
            item.isDisplayed = true
        }

        var itemParentNode = document.createElement("div");
        this.setElementStyle(itemParentNode, this.elementStyle.style_itemParent)


        var itemNode = document.createElement("div");
        this.setElementStyle(itemNode, this.elementStyle.style_item)

        itemNode.onclick = () => {
            this.viewController.clickItem(item)
            // this.viewController.chooseItem(item)
            // this.viewController.afterFunction_selectItem()
        }
        
        // -- check box
        if(this.viewController.showCheckbox) {

            var checkboxParent = document.createElement("DIV")
            this.setElementStyle(checkboxParent, this.elementStyle.style_itemCheckboxParent)

            var checkboxNode = document.createElement("DIV")
            checkboxNode.innerHTML =  (item.isSelected)? this.checkedBoxSvg: this.uncheckedBoxSvg
            this.setElementStyle(checkboxNode, (item.isSelected)? this.elementStyle.style_chekedBox: this.elementStyle.style_unchekedBox)

            checkboxParent.appendChild(checkboxNode)

            itemNode.appendChild(checkboxParent)
        
        }


        // -- text node
        var textParent  = document.createElement("DIV")
        textParent.innerHTML = item.text

        this.setElementStyle(textParent, this.elementStyle.style_itemTextParent)
        
        itemNode.appendChild(textParent)

        itemParentNode.appendChild(itemNode)
          

        if(item.isSelected) this.setElementStyle(itemNode, this.elementStyle.style_itemWhenSelected)
        itemParentNode.style.display = (item.isDisplayed)? "": "none"
        
        
        this.functionFor_addResponsiveTo_itemParentNode(itemParentNode)

        
        return itemParentNode
    }




    
    createItemList(items){

        var listParentNode = this.listParentNode
        listParentNode.innerHTML = ""
        
        for(var i=0; i<items.length; i++){
            var item = items[i]
            var itemParentNode = this.createEachItemNode(item)
            listParentNode.appendChild(itemParentNode)
        }
        return listParentNode

    }



    //-- view modifications ----------------------------
   
    








    
}

