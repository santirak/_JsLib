export default class View{

    /*    
    README

   
    STRUCTURE
       

    CUSTOMIZATION

    WARNING
       

    DEPENDENCY
    */


    constructor(viewController, options = {}) {


        this.haveCloseIcon = false

        //-- get option value
        for(var key in options){
            this[key] =options[key]
        }

        
        //-- view controller
        this.viewController = viewController


        //-- create defaul style
        this.style_mainParent = this.createStyle_mainParent()
        this.style_modalParent = this.createStyle_modalParent()
        this.style_closeIcon = this.createStyle_closeIcon()
        this.style_headParent = this.createStyle_headParent()
        this.style_contentParent = this.createStyle_contentParent()
        this.style_buttonParent = this.createStyle_buttonParent()
        this.style_closeButton = this.createStyle_closeButton()


    }


    //-- view creator ---------

    createElements(){

        var mainParentNode = this.createMainParentNode()

        var modalParent = this.createModalParentNode()


        //--close icon 
        if(this.haveCloseIcon){
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


    createStyle_mainParent(){
        return {
            backgroundColor: "rgba(80,80,80,0.4)"
            // backgroundColor: "red"
        }
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
        mainParentNode.className = "modal_mainParent"
        mainParentNode.onmouseup = (event) => {
            var clickElement = event.target;
            if(clickElement==mainParentNode){
                this.viewController.hideModal()
            }  
        }

        this.setElementStyle(mainParentNode, this.style_mainParent)

        this.mainParentNode = mainParentNode

        return mainParentNode
    }


    createStyle_modalParent(){
        return {
            width: "300px",
            backgroundColor: "white",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            padding: "12px",
            borderRadius: "8px",
            position: "relative"
        }
    }

    createModalParentNode(){

        var modalParent = document.createElement("div");
		modalParent.style.position = "absolute";
		modalParent.style.top = "50%"
		modalParent.style.left = "50%"
		modalParent.style.transform = "translate(-50%, -50%)"
		modalParent.style.overflow = "hidden"
        modalParent.className = "modal_parent"
        
        this.setElementStyle(modalParent, this.style_modalParent)

        return modalParent

    }


    createStyle_closeIcon(){
        return {
            width: "15px",
            top: "8px",
            right: "8px",
            stroke: "dimgray",
            strokeWidth: "8px",
            cursor: "pointer"
        }
    }

    createCloseIconNode(){
        var closeIconNode = document.createElement("div");
		closeIconNode.style.position = "absolute";
		closeIconNode.innerHTML = '<svg style="display: block;" height="" width="100%" viewBox = "0,0,48,48" ><path d="M2 2 L46 46 M2 46 L46 2" stroke-linecap="round" stroke-width="4" fill="none"/></svg>'
        closeIconNode.onclick = () => {
            this.viewController.hideModal()
        }
        this.setElementStyle(closeIconNode, this.style_closeIcon)

        return closeIconNode
    }




    createStyle_headParent(){
        return {
        }
    }

    createHeadParentNode(){
        
        var headParentNode = document.createElement("div");
		headParentNode.style.width = "100%";
		headParentNode.style.float = "left"
        headParentNode.className = "modal_headParent"

        this.setElementStyle(headParentNode, this.style_headParent)

        this.headParentNode = headParentNode

        return headParentNode
        
    }



    createStyle_contentParent(){
        return {
        }
    }

    createContentParentNode(){
        var contentParentNode = document.createElement("div");
		contentParentNode.style.width = "100%";
		contentParentNode.style.float = "left"
        contentParentNode.className = "modal_contentParent"

        this.setElementStyle(contentParentNode, this.style_contentParent)

        this.contentParentNode = contentParentNode

        return contentParentNode
    }



    createStyle_buttonParent(){
        return {}
    }


    createButtonParentNode(){
        
        var buttonParentNode = document.createElement("div");
		buttonParentNode.style.width = "100%";
		buttonParentNode.style.float = "left"
        buttonParentNode.className = "modal_buttonParent"

        this.setElementStyle(buttonParentNode, this.style_buttonParent)
        
        this.buttonParentNode = buttonParentNode


        return buttonParentNode

    }


    

    createHeadNode(headText){

        var headParentNode = this.headParentNode
        headParentNode.innerHTML = ""

        var headNode = document.createElement("div");
		headNode.style.display = "inline-block";
		headNode.className = "modal_head"
		headNode.innerHTML = headText
        this.headNode = headNode

        headParentNode.appendChild(headNode)

    }



    

    createStyle_closeButton(){
        return {
            float: "right",
            backgroundColor: "gray"
        }
    }


    createCloseButtonNode(text = "Close"){
        
        var closeButtonNode = document.createElement("div");
		closeButtonNode.style.display = "inline-block";
		closeButtonNode.style.cursor = "pointer";
		closeButtonNode.className = "button";
		closeButtonNode.innerHTML = text
        closeButtonNode.onclick = () => {
            this.viewController.hideModal()    
        }

        this.setElementStyle(closeButtonNode, this.style_closeButton)

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























