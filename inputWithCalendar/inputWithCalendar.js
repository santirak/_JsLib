import Dropdown from "../dropdown/dropdown.js"
import Calendar from "../calendar/calendar.js"
import View from "./view.js"

export default class InputWithCalendar{

    /*    
    README

    STRUCTURE

    CUSTOMIZATION

    WARNING
       
    DEPENDENCY
    */

    constructor(){

        //--setting -----
        this.hideCalendarAfterSelect = true
        this.allowNoSelected = false
        this.placeholder = ""


        // -- calendar properties
        this.showTodayButton = true
        var currentDate = new Date()
        this.firstYear = currentDate.getFullYear()    
        this.lastYear =  this.firstYear - 10


        //-- other 
        this.dropdown = new Dropdown()
        this.calendar = new Calendar()

        //-- view 
        this.view = new View(this)

        //-- data
        
        //-- utility 
        this.disable = false
        
    }

    createViews(elementStyle={}){

        var dropdown = this.dropdown
        var calendar = this.calendar
        calendar.showTodayButton = this.showTodayButton
        calendar.firstYear = this.firstYear
        calendar.lastYear = this.lastYear
        
        var viewElements = this.view.createElements(elementStyle)

        calendar.afterFunction_selectDay = (dateObject) => {
            this.showSelectedDateInInput(dateObject)
            if(this.hideCalendarAfterSelect){
                this.dropdown.hideDropdown()
            }
        }

        //--remove onclick function to show dropdown manu (dropdown will be shown when input is focused)
        dropdown.view.removeClickEventToShowDropDown()

        dropdown.afterFunction_hideDropdown = () => {
            this.view.inputNode.blur()
            if(!this.allowNoSelected){
                this.checkSelectedDate()
            }
        }
        
        return {
            mainParentNode: viewElements.mainParentNode
        }

    }

    

    whenInputFocus(){
        this.dropdown.showDropdown()
        this.addEventListenerForKeyboard()
    }

    /* when input blur, do not hide dropdown because user may choose month or year selection whick make input of selection focused */

    // whenInputBlur(){
    //     
    // }

    addEventListenerForKeyboard(){       
        /* use key down to prevent hide show and hide dropdown immidiately when use tap key to focus input */
        window.addEventListener("keydown", this.eventFunction_forKeyPushed = (event) => {
            if(event.key=="Tab"){
                this.dropdown.hideDropdown()
                this.removeEventListenerForKeyboard()
            }
        })

    }

    removeEventListenerForKeyboard(){
        window.removeEventListener("keyup", this.eventFunction_forKeyPushed)
    }

    


    showSelectedDateInInput(dateObject){
        this.view.showSelectedDateInInput(dateObject)
    }

    
    getSelectedDate(){
        return this.calendar.selectedDate
    }

    setSelectedDate(dateObject){
        this.showSelectedDateInInput(dateObject)
        this.calendar.setSelectedDate(dateObject)
    }

    checkSelectedDate(){
        var selectedDate = this.getSelectedDate()
        console.log(selectedDate)
        this.view.changeInputStyleAsValueValidation((selectedDate === null)? false: true)
    }


    checkSelectedAndGetValue(){
        this.checkSelectedDate()
        var selectedDate = this.getSelectedDate()
        return {
            isValid: (selectedDate === null)? false: true,
            value: selectedDate
        }
    }




}



