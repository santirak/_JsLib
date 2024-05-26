import ViewTemplate from "../_class/view.js"
import DateText from "../_class/dateText.js"

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

        //--setting 
        
        
        
        //-- view controller
        this.viewController = viewController


        //-- create defaul style

        this.elementStyle = {
            style_mainParent: {
                width: "280px",
                float: "left",
                border: "1px solid #d9d9d9",
                backgroundColor: "white"
            },
            style_headParentNode: {
                backgroundColor: "#d9d9d9"
            },
            style_todayButton: {
                display: "inline-block",
                float: "right",
                padding: "8px 4px",
                cursor: "pointer"
            },
            style_dayOfWeekRowParent: {
                padding: "4px",
                borderBottom: "1px solid #d9d9d9"
            },
            style_dayInMonthParentNode: {
                padding: "4px"
            },
            style_dayBlockParent: {// -- *** NOTE: this style is used for unselected too so all selected block style property must be here too,
                cursor: "pointer",
                padding: "4px 0px",
                textAlign: "center",
                color: '',
                backgroundColor: '' 
            },
            style_dayBlockParentWhichIsSelected: {
                backgroundColor: "orange"
            },
            style_dayBlockParentWhichInNotInMonth: {
                color: "lightgray"
            },
            style_dayBlockParentOfToday: {
                color: "red"
            }
            
        }


        // -- change style of Other View
        var elementStyle_forInputWithSelection = {
            style_mainParent: {width: "80px", margin: "4px"}
        }
        this.viewController.inputWithOption_month.view.updateStyleObject(elementStyle_forInputWithSelection)
        this.viewController.inputWithOption_year.view.updateStyleObject(elementStyle_forInputWithSelection)
        console.log(this.viewController.inputWithOption_year.view)

    }

    



    //-- view creator ---------
    createElements(elementStyle = null){

        this.updateStyleObject(elementStyle)

        var mainParentNode = this.createMainParentNode()

        //-- calendar head
        var headParent = this.createHeadParent()
        this.createHeadContent()
        mainParentNode.appendChild(headParent)

        //-- calendar body
        var bodyNode = this.createBodyParent()
        this.createBodyContent()
        mainParentNode.appendChild(bodyNode)
        


        this.viewController.inputWithOption_year.afterFunctin_changeSelectedItem = () => {
            this.createBodyContent()
        }
        this.viewController.inputWithOption_month.afterFunctin_changeSelectedItem = () => {
            this.createBodyContent()
        }


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




    createHeadParent(){
        var headParentNode = document.createElement("DIV")
        headParentNode.style.width = "100%"
        headParentNode.style.float = "left"
        

        
        this.headParentNode = headParentNode

        this.setElementStyle(headParentNode, this.elementStyle.style_headParentNode)

        return headParentNode
    }

    createHeadContent(){
        
        var headParentNode = this.headParentNode

        var monthSelectionParent = this.createMonthSelection()
        headParentNode.appendChild(monthSelectionParent)

        var yearSelectionParent = this.createYearSelection()
        headParentNode.appendChild(yearSelectionParent)

        if(this.viewController.showTodayButton){
            var todayButton = this.createTodayButton() 
            headParentNode.appendChild(todayButton)
        }
        
        // return headParentNode
    }


    createYearSelection(){
        // var inputWithOption = new InputWithOption()
        var inputWithOption = this.viewController.inputWithOption_year
        inputWithOption.isSearchable = true
        inputWithOption.inputMode = "numeric"
        inputWithOption.afterFunctin_selectItem = function(item){
            // console.log(inputWithOption.getSelectedItem())
        }


        var startYear = this.viewController.firstYear
        var endYear = this.viewController.lastYear
        var change = (startYear > endYear)? "decrease": "increase"

        // console.log("startYear: " + startYear)
        // console.log("endYear: " + endYear)


        if(change == "decrease"){
            var tempYear = startYear
            startYear = endYear
            endYear = tempYear
        }

        // console.log("startYear: " + startYear)
        // console.log("endYear: " + endYear)

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


        var returnElements = inputWithOption.createViews(null, items)

        return returnElements.mainParentNode
    }


    createMonthSelection(){

        // var inputWithOption = new InputWithOption()
        var inputWithOption = this.viewController.inputWithOption_month
        inputWithOption.isSearchable = true
        

        inputWithOption.afterFunctin_selectItem = function(item){
            // console.log(inputWithOption.getSelectedItem())
        }


        // var engMonthAbbs = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var engMonthAbbs = new DateText().english.monthAbbreviations
        var items = []
        for(var i=0; i<engMonthAbbs.length; i++){
            items.push({
                id: i+1,
                text: engMonthAbbs[i]
            })
        }

        var returnElements = inputWithOption.createViews(null, items)

        return returnElements.mainParentNode
    }


    createTodayButton(){
        var todayButton = document.createElement("DIV")
        todayButton.innerHTML = "Today"
        todayButton.onclick = () => {
            var today = new Date()
            this.viewController.showCalendarForSpecificYearMonth(today.getFullYear(), today.getMonth()+1)
        }


        this.setElementStyle(todayButton, this.elementStyle.style_todayButton)

        return todayButton
    }



    createBodyParent(){
        var bodyParent = document.createElement("DIV")
        bodyParent.style.width = "100%"
        bodyParent.style.float = "left"
        // bodyParent.style.padding = "4px"
        this.bodyParent = bodyParent
        return bodyParent
    }


    createBodyContent(){

        var bodyParent = this.bodyParent
        bodyParent.innerHTML = ""

        var rowParent = this.createDayOfWeekRow()
        bodyParent.appendChild(rowParent)

        var dayInMonthParentNode = this.createDayInMonth()
        bodyParent.appendChild(dayInMonthParentNode)
    }
    

    // createRowForDayBlock(){
    //     var rowParent = document.createElement("DIV")
    //     rowParent.style.width = "100%"
    //     rowParent.style.float = "left"
    //     // rowParent.style.backgroundColor = "lightgray"
    //     return rowParent
    // }


    createDayOfWeekRow(){
        var rowParent = document.createElement("DIV")
        rowParent.style.width = "100%"
        rowParent.style.float = "left"
        

        // var weekInWeeKAbbs =["Su", "M", "Tu", "W", "Th", "F", "Sa"];
        var weekInWeeKAbbs = new DateText().english.dayOfWeekAbbreviations
        for(var i in weekInWeeKAbbs){
            var dayBlockParent = this.createEachDayBlockNode()
            dayBlockParent.innerHTML = weekInWeeKAbbs[i]
            rowParent.appendChild(dayBlockParent)
        }

        this.setElementStyle(rowParent, this.elementStyle.style_dayOfWeekRowParent)

        return rowParent
    }


    createDayInMonth(){
        
        var dayInMonthParentNode = document.createElement("DIV")
        dayInMonthParentNode.style.width = "100%"
        dayInMonthParentNode.style.float = "left"
       
        this.setElementStyle(dayInMonthParentNode, this.elementStyle.style_dayInMonthParentNode)


        var inputWithOption_month = this.viewController.inputWithOption_month
        var inputWithOption_year = this.viewController.inputWithOption_year

        var monthNumber = inputWithOption_month.getSelectedItem().id
        var monthCode = monthNumber - 1
        var year = inputWithOption_year.getSelectedItem().id

        // console.log("monthNumber: "+monthNumber)
        // console.log("year: "+year)


        //--create date object for fist day in month
        var dateObject_firstDayOfMonth = new Date(year, monthCode, 1);

        //--get day of week of first day in month
        var dayOfWeek_firstDayOfMonth = dateObject_firstDayOfMonth.getDay();//-- 0 = sun, 1 = mon, 2 = tue ...

        //--get number of day in month
        var numberOfdayInMonth = new Date(year, monthCode+1, 0).getDate()
   

        var dateObject_today = new Date();
        var today_year = dateObject_today.getFullYear()
        var today_monthCode = dateObject_today.getMonth()
        var today_day = dateObject_today.getDate()

        var numberOfWeek = 0
        var dayOfWeek = 0;
        var dayNumber = 0-dayOfWeek_firstDayOfMonth+1; //-- start day number


        // console.log("numberOfdayInMonth: "+numberOfdayInMonth)
        var counter = 0;

        while(!(dayNumber > numberOfdayInMonth && dayOfWeek===6 && numberOfWeek>4)){

            var dateObject = new Date(year, monthCode, dayNumber);
            dayOfWeek = dateObject.getDay()
            

            
            // var isToday = false;
            var inMonth = true
            if((dayNumber < 1 || dayNumber > numberOfdayInMonth )){
                inMonth = false
            }


            var isToday = false
            if(today_year === dateObject.getFullYear()){
                if(today_monthCode === dateObject.getMonth()){
                    if(today_day === dateObject.getDate()){
                        isToday = true
                    }
                }
            }

            

         
       
            var dayBlockParent = this.createEachDayBlockNode()
            dayBlockParent.innerHTML = dateObject.getDate()
            this.changeDayBlockStyle(dayBlockParent, inMonth, isToday)
            dayInMonthParentNode.appendChild(dayBlockParent);

            
            //--change selected dayblock style
            if(this.viewController.selectedDate !== null){
                
                if(this.viewController.selectedDate.getTime() === dateObject.getTime()){
                    console.log("selectedDate: " + this.viewController.selectedDate)
                    this.changeSelectionDayBlockStyle(dayBlockParent)
                }
            }

            this.attachOnClickFunction(dayBlockParent, dateObject)

            dayNumber++;
            if(dayOfWeek === 6){
                numberOfWeek++
            }

            // console.log("dayNumber: "+dayNumber)
            // console.log("dayOfWeek: "+dayOfWeek)
            // console.log("numberOfWeek: "+numberOfWeek)

            //-- to prevent infinite loop
            counter++
            if(counter>50) return dayInMonthParentNode
        }

        return dayInMonthParentNode
    }


    createEachDayBlockNode(){
        var dayBlockParent = document.createElement("DIV")
        dayBlockParent.style.width = (100/7)+"%"
        dayBlockParent.style.float = "left"
        

        this.setElementStyle(dayBlockParent, this.elementStyle.style_dayBlockParent)

        return dayBlockParent
    }


    changeDayBlockStyle(dayBlockParent, inMonth, isToday){
        if(!inMonth) this.setElementStyle(dayBlockParent, this.elementStyle.style_dayBlockParentWhichInNotInMonth)
        if(isToday) this.setElementStyle(dayBlockParent, this.elementStyle.style_dayBlockParentOfToday)
    }

    changeSelectionDayBlockStyle(dayBlockParent){
        this.setElementStyle(dayBlockParent, this.elementStyle.style_dayBlockParentWhichIsSelected)
    }

    
    attachOnClickFunction(dayBlockParent, dateObject){
        dayBlockParent.onclick = () => {
            this.viewController.selectDate(dateObject)
        }
    }





    //-- view modifier ---------
    


    



}























