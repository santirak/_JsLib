import Responsive from "../responsive/responsive.js"
import EventHandler from "../eventHandler/eventHandler.js"

export default class DragableList{

    /*    
    README

        
   
    STRUCTURE

        var item = {
            id: ...,
            dragButtonNode: xxxx, //-- node for drag icon 
            itemParentNode: xxxx, //-- parent node for switch the list div
            
        }   

    CUSTOMIZATION


    WARNING
        reorderMethod 1 has problem when move dragged item out of parent and come back, the getNewIndex() of the newIdex might confuse user
       

    DEPENDENCY

    */

    
    constructor(items, listParentNode, options={}) {

        this.items = items
        this.listParentNode = listParentNode

        //-- setting 
        this.reorderMethod = 2 //-- 1 = by entering direction, 2 = increase or decrease order

        this.draggedItem_effectBackgroundColor = "lightgray";
        this.overedItem_effectBorderStyle = "1px solid blue";

        this.changeOrderWhen = "enter"; //-- enter or drop
        this.listItemStackDirection = "y" //-- x or y

        this.allowDragOnTouchDevice = true
    

        //-- get option value
        for(var key in options){
            this[key] = options[key]
        }


        //-- view 
        
        //-- utility ---------
        this.draggedItem_originalBackgroundColor
        this.overredItem_originalBorderStyle
        this.addBorderEffectItem = "none"

        //-- for detect mouse enter side
        this.previousMousePosition_x;
        this.previousMousePosition_y;
        this.changeInMousePosition_x;
        this.changeInMousePosition_y;

        this.touchMoveOverItem = "none"

        // this.actionWhen_dragStart = function(){}
        // this.actionAfter_drop = function(){}
        // this.actionAfter_changeOrder = function(){}

        this.scrollParent_controller;
        
        this.attachEventToItems()

    }


    attachEventToItems(){
        
        var items = this.items
        // console.log(items)
        for(var i=0; i<items.length; i++){
            
            if(Responsive.isTouchDevice()){
                if(this.allowDragOnTouchDevice){
                    this.attach_touchHoldForStartDrag_function(items[i]);
                }
            }
            else{
                this.attach_ondragStart_function(items[i]);
            }
        }
    }




    attach_ondragStart_function(item){
        
        item.dragButtonNode.addEventListener("dragstart", item.eventFunction_start = (event)=>{
            this.dragList_start(event, item);
        });        
    };

    attach_ondragMove_function(item){
        item.dragButtonNode.addEventListener("drag", item.eventFunction_move = (event)=>{
            this.dragList_move(event, item);
        });
    };

    attach_ondragEnd_function(item){
        item.dragButtonNode.addEventListener("dragend", item.eventFunction_end = (event)=>{
            this.dragList_end(event, item);
        });
    };

    attach_ondragEnter_function(item){
        item.itemParentNode.addEventListener("dragenter", item.eventFunction_enter = (event)=>{
            this.dragList_enter(event, item);
        });
          
    };

    attach_ondragOver_function (item){
        item.itemParentNode.addEventListener("dragover", item.eventFunction_over = (event)=>{
            this.dragList_over(event, item);
        });

    };

    attach_ondragLeave_function(item){
        item.itemParentNode.addEventListener("dragleave", item.eventFunction_leave = (event)=>{
            this.dragList_leave(event, item);
        });

    };

    attach_ondragDrop_function(item){
        item.itemParentNode.addEventListener("drop", item.eventFunction_drop = (event)=>{
            this.dragList_drop(event, item);
        }); 
    };



    attachAllDragEventListenerAfterDragStart (item){

        this.attach_ondragMove_function(item);
        this.attach_ondragEnd_function(item);

        var items = this.items;
        var i;
        for(i=0; i<items.length; i++){
            this.attach_ondragEnter_function(items[i]);
            this.attach_ondragLeave_function(items[i]);
            this.attach_ondragOver_function(items[i]);
            this.attach_ondragDrop_function(items[i]);
        }
    }


    removeAllDragEventListenerAfterDragEnd(item){

        item.dragButtonNode.removeEventListener("drag", item.eventFunction_move);
        item.dragButtonNode.removeEventListener("dragend", item.eventFunction_end);


        var items = this.items;
        var i;
        for(i=0; i<items.length; i++){

            items[i].itemParentNode.removeEventListener("dragenter", items[i].eventFunction_enter);
            items[i].itemParentNode.removeEventListener("dragover", items[i].eventFunction_over);
            items[i].itemParentNode.removeEventListener("dragleave", items[i].eventFunction_leave);
            items[i].itemParentNode.removeEventListener("drop", items[i].eventFunction_drop);
            
            
            // if("extraNodeForDrop" in items[i]){
            //     items[i].extraNodeForDrop.removeEventListener("dragenter", items[i].eventFunction_enter_extraNode);
            //     items[i].extraNodeForDrop.removeEventListener("dragover", items[i].eventFunction_over_extraNode);
            //     items[i].extraNodeForDrop.removeEventListener("dragleave", items[i].eventFunction_leave_extraNode);
            //     items[i].extraNodeForDrop.removeEventListener("drop", items[i].eventFunction_drop_extraNode);
            // }

        }

        // var extraItems = this.extraItems;

        // var i;
        // for(i=0; i<extraItems.length; i++){

        //     extraItems[i].dragButtonNode.removeEventListener("drag", extraItems[i].eventFunction_move);
        //     extraItems[i].dragButtonNode.removeEventListener("dragend", extraItems[i].eventFunction_end);

        //     extraItems[i].itemParentNode.removeEventListener("dragenter", extraItems[i].eventFunction_enter);
        //     extraItems[i].itemParentNode.removeEventListener("dragover", extraItems[i].eventFunction_over);
        //     extraItems[i].itemParentNode.removeEventListener("dragleave", extraItems[i].eventFunction_leave);
        //     extraItems[i].itemParentNode.removeEventListener("drop", extraItems[i].eventFunction_drop);
            
            
        //     if("extraNodeForDrop" in extraItems[i]){
        //         extraItems[i].extraNodeForDrop.removeEventListener("dragenter", extraItems[i].eventFunction_enter_extraNode);
        //         extraItems[i].extraNodeForDrop.removeEventListener("dragover", extraItems[i].eventFunction_over_extraNode);
        //         extraItems[i].extraNodeForDrop.removeEventListener("dragleave", extraItems[i].eventFunction_leave_extraNode);
        //         extraItems[i].extraNodeForDrop.removeEventListener("drop", extraItems[i].eventFunction_drop_extraNode);
        //     }

        // }
        
        // this.removeMore_toOtherNode(item);
    };



    removeDragImageNode(){
        var dragImageParentNode = this.dragImageParentNode;
        dragImageParentNode.parentElement.removeChild(dragImageParentNode);
        this.dragImageParentNode = "";
    }

    createDragImageNode(event, item){

        var divWidth = item.itemParentNode.offsetWidth;
    
        //--parent
        var dragImageParentNode = document.createElement("div");
        dragImageParentNode.style.width = divWidth+"px";
        dragImageParentNode.style.textAlign = "center";
        // dragImageParentNode.style.backgroundColor = this.effect_dragItem;
        dragImageParentNode.style.opacity = "1";
        dragImageParentNode.style.position = "absolute"; 
        dragImageParentNode.style.bottom = "100%"; 
        dragImageParentNode.style.right = "100%"; 
        dragImageParentNode.style.opacity = "0.8"; 

        this.dragImageParentNode = dragImageParentNode

        //--content
        var dragImageContentNode = this.createDragImageContentNode(item);
        dragImageParentNode.appendChild(dragImageContentNode)
        
        document.getElementsByTagName("BODY")[0].appendChild(dragImageParentNode);

        
        return dragImageParentNode

    }   

    createDragImageContentNode(item){
        return item.itemParentNode.cloneNode(true);
    }

    calculateDragImagePosition(event, item){
        var clickPositon = this.getClickPostion(event)
        var elementPostion = item.itemParentNode.getBoundingClientRect()
        return {
            x: clickPositon.x - elementPostion.x,
            y: clickPositon.y - elementPostion.y
        }
    }
    
    
    
    
    dragList_start(event, item){
        
    
        this.draggedItem = item
       

        // this.actionWhen_dragStart(item)

        ////console.log("-------");

        // var x = event.clientX;     // Get the horizontal coordinate
        // var y = event.clientY;

        var clickPositon = this.getClickPostion(event)
        var x = clickPositon.x
        var y = clickPositon.y

        this.previousMousePosition_x = x;  
        this.previousMousePosition_y = y; 

        //--create drage item
        var dragImageParentNode = this.createDragImageNode(event, item)
        //-- insert
        var dragImagePosition = this.calculateDragImagePosition(event, item)
        event.dataTransfer.setDragImage(dragImageParentNode, dragImagePosition.x, dragImagePosition.y);


        //--add effect 
        this.changeBackgroudColorToDraggedItem("add")
        


        //--add even listener
        this.attachAllDragEventListenerAfterDragStart(item);
    }
    
    dragList_end(event ,item){
        
        //console.log("end");
        ////console.log(this.dragImageParentNode);

        this.removeAllDragEventListenerAfterDragEnd(item);
        
        this.dragImageParentNode.style.display = "none";
        
        //--remove drag image node

        this.removeDragImageNode()
        
        //item.dragButtonNode.removeEventListener("dragend", eventFunction_end)
        this.changeBackgroudColorToDraggedItem("remove")
        
        
        clearInterval(this.scrollParent_controller);
        
    }
    
    dragList_move(event ,item){
        
        if(this.changeOrderWhen=="enter"){
            this.checkMouseEnterDirection(event, "move");
        }
    }
    
    dragList_enter(event ,item){
        
        if(this.changeOrderWhen=="drop"){
            this.checkMouseEnterDirection(event, "enter: "+item.id);
            this.changeBorderColorToOverredItem(event, item, "add")
        }
        
        
        if(this.draggedItem==item){
            return;
        }
        
        if(this.changeOrderWhen=="enter"){
            this.reorderItem(event ,item);
        }
    }


    dragList_over(event ,item){

        event.preventDefault();//--this for allow drop
        if(this.draggedItem==item){
            return;
        }
    }
    dragList_leave(event ,item){
        
        clearInterval(this.scrollParent_controller);
        this.checkDragPositionToScrollParentNodeWhenDraggedItemIsOutside(event);
        if(this.draggedItem==item){
            return;
        }

        
    }
    dragList_drop(event ,item){

       
        if(this.changeOrderWhen=="drop"){
            this.removeBorderColorToOverredItem()
            this.reorderItem(event ,item);
        }

        // this.actionAfter_drop();
        
    }
    

    changeBackgroudColorToDraggedItem(action){

        var item = this.draggedItem

        if(action=="add"){
            this.draggedItem_originalBackgroundColor = item.itemParentNode.style.backgroundColor
            item.itemParentNode.style.backgroundColor = this.draggedItem_effectBackgroundColor;
        }
        else{
            item.itemParentNode.style.backgroundColor = this.draggedItem_originalBackgroundColor;
        }

    }


    getBorderNameToAddEffect(){
        return (this.listItemStackDirection=="y")? "borderBottom": "borderRight"
    }


    removeBorderColorToOverredItem(){
        var addBorderEffectItem = this.addBorderEffectItem
        if(addBorderEffectItem!="none"){
            var borderName = this.getBorderNameToAddEffect()
            addBorderEffectItem.itemParentNode.style[borderName] = this.overredItem_originalBorderStyle
            addBorderEffectItem = "none"
        }
    }
    

    changeBorderColorToOverredItem(event, item, action){

        //--always remove the old one

        this.removeBorderColorToOverredItem()

        this.overredItem_originalBorderStyle = item.itemParentNode.style.borderBottom

        var newIndices = this.getNewIndex(item)
        if(newIndices==false) return

        var newIndex = newIndices.newIndex
        // var originalIndex = newIndices.originalIndex
        newIndex--

        if(newIndex<0) return

        // console.log("newIndex: "+newIndex)
        var targetItem = this.items[newIndex]
        this.addBorderEffectItem = targetItem

        var borderName = this.getBorderNameToAddEffect()
        targetItem.itemParentNode.style[borderName] = this.overedItem_effectBorderStyle
              
    }

    
    checkMouseEnterDirection(event, from){

        // console.log("checkMouseEnterDirection: "+from)
        
        // var x = event.clientX;     // Get the horizontal coordinate
        // var y = event.clientY;
        
        // if(Responsive.isTouchDevice()){
        //     var x = event.touches[0].clientX;
        //     var y = event.touches[0].clientY;
            
        // }

        var clickPositon = this.getClickPostion(event)
        var x = clickPositon.x
        var y = clickPositon.y
        
        //console.log("check direction :"+x+" "+y);
        
        var changeIn_x = "negative";
        if(x>this.previousMousePosition_x){
            changeIn_x = "positive";
        }
        
        // console.log("previous y :"+this.previousMousePosition_y);
        // console.log("current y :"+y);
        // console.log(y-this.previousMousePosition_y);
        
        var changeIn_y = "negative";
        if(y>this.previousMousePosition_y){
            changeIn_y = "positive";
        }
        
        
        this.changeInMousePosition_x = changeIn_x;
        this.changeInMousePosition_y = changeIn_y;

        // console.log("checkMouseEnterDirection")
        // console.log("changeIn_x: "+changeIn_x)
        // console.log("changeIn_y: "+changeIn_y)
        
        
        this.previousMousePosition_x = x;
        this.previousMousePosition_y = y;
    }
    
    getNewIndex(overItem){

        var originalIndex = "none";
        var newIndex = "none";
        
        var items = this.items;
        var i;
        for(i=0; i<items.length; i++){
            if(overItem==items[i]){
                newIndex = i;
            }
            if(this.draggedItem==items[i]){
                originalIndex = i;
            }
        }
        
        
        if(originalIndex==="none"){
            return false
        }
        
        if(newIndex==="none"){
            
            return false
        }

        if(newIndex==originalIndex){
            return false
        }
        
      

        if(this.reorderMethod==1){
            var changeInMousePostion = (this.listItemStackDirection=="x")? this.changeInMousePosition_x: this.changeInMousePosition_y;
            if(changeInMousePostion=="positive"){
                newIndex++;
            }
        }
        else if(this.reorderMethod==2){
            if(newIndex > originalIndex){
                newIndex++
            }
        }

        return {
            originalIndex: originalIndex,
            newIndex: newIndex
        }
    }
    
    reorderItem(event, overItem){
        
        
        var newIndices = this.getNewIndex(overItem)
        if(newIndices==false) return

        var newIndex = newIndices.newIndex
        var originalIndex = newIndices.originalIndex
        //---change order div ------------------------------------
        this.reorderItemParentNode(newIndex,originalIndex)
        
        // this.actionAfter_changeOrder();
        
    }
    

    animateReorderingItemParent(duration, newIndex, originalIndex){
        var items = this.items
        var itemParentNode = items[originalIndex].itemParentNode

        
        var currentBottomPosition = itemParentNode.offsetHeight + itemParentNode.offsetTop
        var newBottomPostion =  items[newIndex].itemParentNode.offsetTop
        var transformLength= newBottomPostion-currentBottomPosition
        
        console.log(transformLength)

        itemParentNode.style.transition = "transform "+duration+"s"
        itemParentNode.style.transform = "translate(0px,"+transformLength+"px)";

        setTimeout(()=>{
            itemParentNode.style.transition = ""
            itemParentNode.style.transform = "";
        }, duration*1000)
    }
    
    
    reorderItemParentNode(newIndex, originalIndex){

        var items = this.items;

        if(newIndex>=items.length){
            this.listParentNode.appendChild(this.draggedItem.itemParentNode);
            // console.log("last item")
        }
        else{
            this.listParentNode.insertBefore(this.draggedItem.itemParentNode, items[newIndex].itemParentNode);
        }
        //--change position in array
        this.reorderItemArray(this.items, originalIndex, newIndex);

        

        // var durationInSecond = 2
        // var durationInMilliSecond = durationInSecond*1000

        // this.animateReorderingItemParent(durationInSecond, newIndex, originalIndex)

        // setTimeout(()=>{
            
        // }, durationInMilliSecond)
        
        
        
    }
    
    
    reorderItemArray(input_array, originalIndex, newIndex){

        var moveElement = input_array[originalIndex];

        //--add to new positon
        input_array.splice(newIndex, 0, moveElement);

        if(newIndex>originalIndex){
            //--remove original positon
            input_array.splice(originalIndex, 1);

        }
        else{
            //--remove original positon
            input_array.splice(originalIndex+1, 1);
        }
    }
    
    
    getClickPostion(event){

        var x = event.clientX;     // Get the horizontal coordinate
        var y = event.clientY;

        if(Responsive.isTouchDevice()){
            var x = event.touches[0].clientX;
            var y = event.touches[0].clientY;
        }

        return {
            x: x,
            y: y
        }
    }
    
    
    
        
    scrollParentWhenDragIsOutside(outIn_y_code, outIn_x_code){

        var currentScroll_left = this.listParentNode.scrollLeft;
        var currentScroll_top = this.listParentNode.scrollTop;
        

        var scrollLength = 5;
        
        if(outIn_y_code==1){
            this.listParentNode.scrollTop = currentScroll_top - scrollLength;
        }
        else if(outIn_y_code==2){
            this.listParentNode.scrollTop = currentScroll_top + scrollLength;
        }
        
        if(outIn_x_code==1){
            this.listParentNode.scrollLeft = currentScroll_left - scrollLength;
        }
        else if(outIn_x_code==2){
            this.listParentNode.scrollLeft = currentScroll_left + scrollLength;
        }
        
    }
    
    
    checkDragPositionToScrollParentNodeWhenDraggedItemIsOutside(event){
        
    
        ////console.log("check_out_of");
        
        clearInterval(this.scrollParent_controller);
        
        // var drag_x = event.clientX;     // Get the horizontal coordinate
        // var drag_y = event.clientY;

        var clickPositon = this.getClickPostion(event)
        var drag_x = clickPositon.x
        var drag_y = clickPositon.y
        
        
        var parentPositionA = this.listParentNode.getBoundingClientRect()
        
        var parent_top = parentPositionA.top;
        var parent_bottom =  parentPositionA.bottom;
        
        var parent_left = parentPositionA.left;
        var parent_right = parentPositionA.right;
        
        
        //var parent_height = this.listParentNode.offsetHeight;
        //var parent_width = this.listParentNode.offsetWidth;
        
        
        /*
        var parent_top = this.listParentNode.offsetTop;
        //var parent_top = parentPositionA[1];
        var parent_bottom =  parent_top + parent_height;
        
        var parent_left = this.listParentNode.offsetLeft;
        //var parent_left = parentPositionA[0];
        var parent_right = parent_left + parent_width;
        
        */
        
        ////console.log(" position "+ parent_top +","+ parent_bottom +","+ parent_left +","+ parent_right);
        ////console.log(" mouse "+ drag_y +","+ drag_x);
        
        
        var timeInterval = 20;
        
        var outIn_y_code = "none";
        var outIn_x_code = "none";
        
        if(drag_y <= parent_top){//--out of top
            outIn_y_code = 1;
        }
        else if(drag_y >= parent_bottom){ //--out of bottom
            outIn_y_code = 2;
        }
        
        if(drag_x <= parent_left){//--out of left
            outIn_x_code = 1;
        }
        else if(drag_x >= parent_right){ //--out of right
            outIn_x_code = 2;
        }
        

        // if(this.changeOrderWhen=="drop"){
        //     this.checkMouseEnterDirection(event, "leave parent");
        // }
        
        ////console.log(outIn_y_code +" out "+ outIn_x_code)
        this.scrollParent_controller = setInterval(()=>{
            this.scrollParentWhenDragIsOutside(outIn_y_code,outIn_x_code);
        }, timeInterval);

    }
    
    
    
    
    //---------- touch ------------------------------------
    addAllTouchEventAfterStart(item){
        window.addEventListener("touchmove", this.eventFunction_touchMove = (event)=>{
            event.preventDefault();
            if(this.changeOrderWhen=="enter"){
                this.checkMouseEnterDirection(event, "move");
            }
            this.moveImageNodeFromTouchMove(event)
            this.checkDragPositionToScrollParentNodeWhenDraggedItemIsOutside(event)
            var overItem = this.getItemThatTouchMoveOver(event)
            // console.log(overItem.id)

            if(overItem===false) return

            if(this.touchMoveOverItem=="none"){
                this.touchMoveOverItem = overItem
                //--enter new item at start
                console.log("enter item at start: "+overItem.id)
                this.dragList_enter(event, overItem)
            }
            else{
                if(overItem.id==this.touchMoveOverItem.id){
                    //-- over
                    // console.log("over item")
                    
                }
                else{
                    //-- leave old item
                    console.log("leave item: "+this.touchMoveOverItem.id)
                    this.dragList_leave(event, overItem)
                    
                    //-- enter new item 
                    this.touchMoveOverItem = overItem
                    console.log("enter item: "+ overItem.id)
                    this.dragList_enter(event, overItem)
                }
            }

        },{ passive: false })//passive: false for stopping  scrolling "intervention"

        window.addEventListener("touchend", this.eventFunction_touchEnd = (event)=>{

            console.log("end");
            this.removeDragImageNode()
            this.removeAllTouchEventAfterEnd()

            this.changeBackgroudColorToDraggedItem("remove")

            if(this.touchMoveOverItem!="none"){
                this.dragList_drop(event, this.touchMoveOverItem)
                this.touchMoveOverItem = "none"
            }
        })

        
    }


    getItemThatTouchMoveOver(event){
        
        var clickPositon = this.getClickPostion(event)
        var items = this.items
        for(var i=0; i<items.length; i++){
            var item = items[i]

            var itemParentNode = item.itemParentNode
            var elementPostion = itemParentNode.getBoundingClientRect()
            var left = elementPostion.x
            var right = left+itemParentNode.offsetWidth
            var top = elementPostion.y
            var bottom = top+itemParentNode.offsetHeight

            if(clickPositon.x > left && clickPositon.x < right && clickPositon.y > top && clickPositon.y < bottom){
                return item
            }
        }

        return false

    }
    removeAllTouchEventAfterEnd(){
        removeEventListener("touchmove", this.eventFunction_touchMove)
        removeEventListener("touchend", this.eventFunction_touchEnd)

        
    }
    

    attach_touchHoldForStartDrag_function(item){
        
        var eventHandler = new EventHandler(Option);
        eventHandler.attachEventFunction(item.dragButtonNode)
        eventHandler.eventFunction_hold = (event)=>{
            event.preventDefault();

            console.log("hold");
            
            this.draggedItem = item
            
            this.addAllTouchEventAfterStart(item)
        
            var dragImageParentNode = this.createDragImageNode(event, item)

            var elementPostion = item.itemParentNode.getBoundingClientRect()
            dragImageParentNode.style.left = elementPostion.x+"px"
            dragImageParentNode.style.top = elementPostion.y+"px"
            
            var clickPositon = this.getClickPostion(event)

            this.dragImageParentNode_touchOffset_x = clickPositon.x-elementPostion.x
            this.dragImageParentNode_touchOffset_y = clickPositon.y-elementPostion.y
        
            this.changeBackgroudColorToDraggedItem("add")

        };

    };
    
    

    moveImageNodeFromTouchMove(event){
        var clickPositon = this.getClickPostion(event)

        this.dragImageParentNode_touchOffset_x
        this.dragImageParentNode_touchOffset_y

        var x = clickPositon.x - this.dragImageParentNode_touchOffset_x
        var y = clickPositon.y - this.dragImageParentNode_touchOffset_y

        this.dragImageParentNode.style.left = x+"px"
        this.dragImageParentNode.style.top = y+"px"
    }
}




