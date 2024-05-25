import View from "./view.js"

export default class Model{

    /*    
    README

    STRUCTURE

    CUSTOMIZATION

    WARNING
       
    DEPENDENCY
    */


    constructor(options={}){

        //--setting -----
        this.haveCloseIcon = false
        

        //-- get option value
        for(var key in options){
            this[key] = options[key]
        }

        //-- view 
        this.view = new View(this, options)

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



