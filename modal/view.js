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

        
        
        // //-- get option value
        // for(var key in options){
        //     this[key] =options[key]
        // }

        
        //-- view controller
        this.viewController = viewController


        //-- create defaul style

        this.elementStyle = {
            style_mainParent: {
                width: "100%",
                height: "100%",
                overflow: "auto",
                position: "fixed",
                left: "0px",
                top: "0px",
                display: "none",
                backgroundColor: "rgba(80,80,80,0.4)"
            },
            style_modalParent: {
                width: "300px",
                backgroundColor: "white",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                padding: "12px",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                overflow: "hidden"
                
            },
            style_closeIcon: {
                position: "absolute",
                width: "15px",
                top: "8px",
                right: "8px",
                stroke: "stroke",
                strokeWidth: "8px",
                cursor: "cursor"
                },
            style_headParent: {
                width: "100%",
		        float: "left"

            },
            style_contentParent: {
                width: "100%",
		        float: "left"

            },
            style_buttonParent: {
                width: "100%",
		        float: "left"
            },
            style_closeButton: {
                display: "inline-block",
                cursor: "pointer",
                float: "right",
                padding: "8px",
                backgroundColor: "gray"
            }
        }


        this.closeSvg = '<svg style="display: block;" height="" width="100%" viewBox = "0,0,48,48" ><path d="M2 2 L46 46 M2 46 L46 2" stroke-linecap="round" stroke-width="4" fill="none"/></svg>'
         


    }


    //-- view creator ---------

    createElements(elementStyle = null){

        this.updateStyleObject(elementStyle)

        var mainParentNode = this.createMainParentNode()

        var modalParent = this.createModalParentNode()


        //--close icon 
        if(this.viewController.haveCloseIcon){
            var closeIconNode = this.createCloseIconNode()
            modalParent.appendChild(closeIconNode)
        }
        
        //-- head
        var headParentNode = this.createHeadParentNode()
        modalParent.insertBefore(headParentNode, modalParent.firstChild)


        //-- content
        var contentParentNode = this.createContentParentNode()
        modalParent.appendChild(contentParentNode)


        //-- button
        var buttonParentNode = this.createButtonParentNode()
        
        //-- closs button
        var closeButtonNode = this.createCloseButtonNode()
        buttonParentNode.appendChild(closeButtonNode)

        modalParent.appendChild(buttonParentNode)



        mainParentNode.appendChild(modalParent)

        document.body.appendChild(mainParentNode)


    }



    createMainParentNode(){
        var mainParentNode = document.createElement("div");
		
        mainParentNode.onmouseup = (event) => {
            var clickElement = event.target;
            if(clickElement==mainParentNode){
                this.viewController.hideModal()
            }  
        }

        this.setElementStyle(mainParentNode, this.elementStyle.style_mainParent)

        this.mainParentNode = mainParentNode

        return mainParentNode
    }


    createModalParentNode(){

        var modalParent = document.createElement("div");
		
        this.setElementStyle(modalParent, this.elementStyle.style_modalParent)

        return modalParent

    }


    createCloseIconNode(){
        var closeIconNode = document.createElement("div");
		closeIconNode.innerHTML = this.closeSvg
           
        closeIconNode.onclick = () => {
            this.viewController.hideModal()
        }
        this.setElementStyle(closeIconNode, this.elementStyle.style_closeIcon)

        return closeIconNode
    }




    createHeadParentNode(){
        
        var headParentNode = document.createElement("div");
		
        this.setElementStyle(headParentNode, this.elementStyle.style_headParent)

        this.headParentNode = headParentNode

        return headParentNode
        
    }




    createContentParentNode(){
        var contentParentNode = document.createElement("div");
		
        this.setElementStyle(contentParentNode, this.elementStyle.style_contentParent)

        this.contentParentNode = contentParentNode

        return contentParentNode
    }




    createButtonParentNode(){
        
        var buttonParentNode = document.createElement("div");

        this.setElementStyle(buttonParentNode, this.elementStyle.style_buttonParent)
        
        this.buttonParentNode = buttonParentNode


        return buttonParentNode

    }


    



    


    createCloseButtonNode(text = "Close"){
        
        var closeButtonNode = document.createElement("div");
		closeButtonNode.innerHTML = text
        closeButtonNode.onclick = () => {
            this.viewController.hideModal()    
        }

        this.setElementStyle(closeButtonNode, this.elementStyle.style_closeButton)

        this.closeButtonNode = closeButtonNode

        return closeButtonNode
    }






    //-- view modifier ---------
    changeModalDisplaying(){
        let mainParentNode = this.mainParentNode 
        mainParentNode.style.display = (this.viewController.isDisplaying)? "": "none"
    }







    



}























