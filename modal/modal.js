import View from "./view.js"

export default class Model{

    /*    
    README

    STRUCTURE

    CUSTOMIZATION

    WARNING
       
    DEPENDENCY
    */


    constructor(){

        //--setting -----
        this.haveCloseIcon = false
        

        //-- view 
        this.view = new View(this, options)

        // -- utilities
        this.isDisplaying = false
    }

    createViews(elementStyle={}){
        this.view.createElements(elementStyle)
    }

    //--view action
    hideModal(){
        // console.log("hide modal")
        this.isDisplaying = false
        this.view.changeModalDisplaying()
    }

    showModal(){
        // console.log("show modal")
        this.isDisplaying = true
        this.view.changeModalDisplaying()
    }


}



