import InputWithOption from "../inputWithOption/inputWithOption.js"
import View from "./view.js"

export default class Calendar{

    /*    
    README

    STRUCTURE

    CUSTOMIZATION

    WARNING
       
    DEPENDENCY
    */



    
    constructor(){

        //--setting ------------
        this.showTodayButton = true
        var currentDate = new Date()
        this.firstYear = currentDate.getFullYear()    
        this.lastYear =  this.firstYear - 80
        
        // this.functionFor_clickDay = this.checkAndUpdateInputValue
        

        //-- other
        this.inputWithOption_year = new InputWithOption()
        this.inputWithOption_month = new InputWithOption()

        //-- view ------------
        this.view = new View(this)


        //-- data ------------
        


        //-- utility ------------
        this.selectedDate = null
        // this.selectedDate = new Date(2023, 0, 13)
        // console.log(this.selectedDate)


        //-- function ------------
        this.afterFunction_selectDay = function(){}



        // //-- get option value ------------
        //  for(var key in options){
        //     this[key] = options[key]
        // }
        
        
    }

    createViews(elementStyle={}){
        var returnElements = this.view.createElements(elementStyle)
        return returnElements
    }

    //-- for user intent
    selectDate(dateObject){
        console.log("selectDate: " + dateObject)
        this.selectedDate = dateObject
        this.view.createBodyContent()
        this.afterFunction_selectDay(dateObject)
    }


    //-- for mannually selection (e.g. initial selection)
    /* after function will not be trigger */
    setSelectedDate(dateObject){
        this.selectedDate = dateObject
        this.showCalendarForSpecificYearMonth(dateObject.getFullYear(), dateObject.getMonth()+1)
    }

    showCalendarForSpecificYearMonth(year, monthNumber){
        this.inputWithOption_year.selectItemFromId(year)
        this.inputWithOption_month.selectItemFromId(monthNumber)
    }


    showCurrentMonth(){
        var Today = new Date()
        this.showCalendarForSpecificYearMonth(Today.getFullYear(), Today.getMonth()+1)

    }


    


}



