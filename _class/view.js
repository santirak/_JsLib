export default class View{

    constructor() {

        // -- style of each element will be set in subclass
        this.elementStyle = {}

    }

    setElementStyle(element, styles){
        for(var key in styles){
            element.style[key] = styles[key]
        }
    }

    updateStyleObject(elementStyle_new) {

        if(elementStyle_new === null) return

        for(var styleOfElement in elementStyle_new) {

            if(!(styleOfElement in this.elementStyle)) {
                this.elementStyle[styleOfElement] = {}
            }

            var newStyles = elementStyle_new[styleOfElement]

            for(var styleName in newStyles) {
                this.elementStyle[styleOfElement][styleName] = newStyles[styleName]
            }
        }
        
    }




}























