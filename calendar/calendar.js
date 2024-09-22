import InputWithOption from "../inputWithOption/inputWithOption.js"
import DateText from "../_class/dateText.js"
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

        
        this.createYearSelectionItems()
        this.createMonthSelectionItems()



        var returnElements = this.view.createElements(elementStyle)
        return returnElements
    }




    createYearSelectionItems(){
        var inputWithOption = this.inputWithOption_year
        inputWithOption.isSearchable = true
        inputWithOption.inputMode = "numeric"
        inputWithOption.afterFunction_selectItem = function(item){
        }


        var startYear = this.firstYear
        var endYear = this.lastYear
        var change = (startYear > endYear)? "decrease": "increase"

        if(change == "decrease"){
            var tempYear = startYear
            startYear = endYear
            endYear = tempYear
        }

        var items = []

        for(var i=startYear; i<=endYear; i++){
            var item = {
                id: i,
                text: i
            }

            // console.log("i: "+i)
            if(change == "decrease"){
                items.unshift(item)
            }
            else{
                items.push(item)
            }
        }
        inputWithOption.items = items
    }


    createMonthSelectionItems(){

        var inputWithOption = this.inputWithOption_month
        inputWithOption.isSearchable = true
        

        inputWithOption.afterFunction_selectItem = function(item){
        }


        var engMonthAbbs = new DateText().english.monthAbbreviations
        var items = []
        for(var i=0; i<engMonthAbbs.length; i++){
            items.push({
                id: i+1,
                text: engMonthAbbs[i]
            })
        }


        inputWithOption.items = items
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



