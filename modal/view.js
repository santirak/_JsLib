export default class View{

    /*    
    README

   
    STRUCTURE
       

    CUSTOMIZATION

    WARNING
       

    DEPENDENCY
    */


    constructor(viewController, options = {}) {


        


        //-- create defaul style

        this.elementStyle = {
            style_mainParent: {},
            style_modalParent: {},
            style_closeIcon: {},
            style_headParent: {},
            style_contentParent: {},
            style_buttonParent: {},
            style_closeButton: {}
        }

        
        //-- get option value
        for(var key in options){
            this[key] =options[key]
        }

        
        //-- view controller
        this.viewController = viewController


        


    }


    //-- view creator ---------

    createElements(elementStyle={}){

        this.elementStyle = elementStyle

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
		mainParentNode.style.width = "100%";
		mainParentNode.style.height = "100%";
		mainParentNode.style.overflow = "auto";
		mainParentNode.style.position = "fixed";
		mainParentNode.style.left = "0px";
		mainParentNode.style.top = "0px";
		mainParentNode.style.display = "none";
		mainParentNode.style.backgroundColor = "rgba(80,80,80,0.4)"
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
		modalParent.style.width = "300px";
		modalParent.style.backgroundColor = "white";
		modalParent.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.1)";
		modalParent.style.padding = "12px";
		modalParent.style.position = "absolute";
		modalParent.style.top = "50%"
		modalParent.style.left = "50%"
		modalParent.style.transform = "translate(-50%, -50%)"
		modalParent.style.overflow = "hidden"
        
        this.setElementStyle(modalParent, this.elementStyle.style_modalParent)

        return modalParent

    }


    createCloseIconNode(){
        var closeIconNode = document.createElement("div");
		closeIconNode.style.position = "absolute";
		closeIconNode.style.width = "15px";
		closeIconNode.style.top = "8px";
		closeIconNode.style.right = "8px";
		closeIconNode.style.stroke = "stroke";
		closeIconNode.style.strokeWidth = "8px";
		closeIconNode.style.cursor = "cursor";
		closeIconNode.innerHTML = '<svg style="display: block;" height="" width="100%" viewBox = "0,0,48,48" ><path d="M2 2 L46 46 M2 46 L46 2" stroke-linecap="round" stroke-width="4" fill="none"/></svg>'
        closeIconNode.onclick = () => {
            this.viewController.hideModal()
        }
        this.setElementStyle(closeIconNode, this.elementStyle.style_closeIcon)

        return closeIconNode
    }




    createHeadParentNode(){
        
        var headParentNode = document.createElement("div");
		headParentNode.style.width = "100%";
		headParentNode.style.float = "left"

        this.setElementStyle(headParentNode, this.elementStyle.style_headParent)

        this.headParentNode = headParentNode

        return headParentNode
        
    }




    createContentParentNode(){
        var contentParentNode = document.createElement("div");
		contentParentNode.style.width = "100%";
		contentParentNode.style.float = "left"

        this.setElementStyle(contentParentNode, this.elementStyle.style_contentParent)

        this.contentParentNode = contentParentNode

        return contentParentNode
    }




    createButtonParentNode(){
        
        var buttonParentNode = document.createElement("div");
		buttonParentNode.style.width = "100%";
		buttonParentNode.style.float = "left"

        this.setElementStyle(buttonParentNode, this.elementStyle.style_buttonParent)
        
        this.buttonParentNode = buttonParentNode


        return buttonParentNode

    }


    



    


    createCloseButtonNode(text = "Close"){
        
        var closeButtonNode = document.createElement("div");
		closeButtonNode.style.display = "inline-block";
		closeButtonNode.style.cursor = "pointer";
		closeButtonNode.style.float = "right";
		closeButtonNode.style.padding = "8px";
		closeButtonNode.style.backgroundColor = "gray";
		closeButtonNode.innerHTML = text
        closeButtonNode.onclick = () => {
            this.viewController.hideModal()    
        }

        this.setElementStyle(closeButtonNode, this.elementStyle.style_closeButton)

        this.closeButtonNode = closeButtonNode

        return closeButtonNode
    }




    setElementStyle(element, styles){
        for(var key in styles){
            element.style[key] = styles[key]
        }
    }




    //-- view modifier ---------
    changeModalDisplaying(){
        let mainParentNode = this.mainParentNode 
        mainParentNode.style.display = (this.viewController.isDisplaying)? "": "none"
    }







    



}























