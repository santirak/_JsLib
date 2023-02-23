export default class Responsive {


    /*    
    README

   
    ARCHITECTURE

        -   screen size

            this.screenSizesUpTo: [350, 550, 750, 950] //-- the number is the width of screen 

		- value option for screen sizes

            var valuesByOrder = {
                0: "100%",
                1: "100%",
                2: "50%",
                3: "33.33%",
                4: "25%"
                extraFunction: function(){}
            }
            note - number of property of value object must be greater than screenSizesUpTo.length by 1 for larger screen size than last setting screen size

    CUSTOMIZATION 


    WARNING
       

    DEPENDENCY
    */

    constructor(option = {}){


        this.screenSizesUpTo = ("screenSizesUpTo" in option)? option.screenSizesUpTo: [350, 550, 750, 950]
            
        this.responsiveElements = []
        
        this.callback_resizeScreen = function(screenSizeOrder){}

        window.addEventListener("resize", this.changeElePropertyWhenResizeScreen.bind(this));
    }


    getBodyDimensions(){
        var bodyNode = document.getElementsByTagName("BODY")[0];
		
		var width = bodyNode.offsetWidth;
		var height = bodyNode.offsetHeight;

		return {
			width: width,
			height: height
		}
    }


    updateBodyDimension(){
        var bodyDimensions = this.getBodyDimensions()

		this.bodyWidth = bodyDimensions.width;
		this.bodyHeight = bodyDimensions.height;
    }
	
	

	getScreenSizeOrder(){

		var w_width = window.innerWidth;

		var screenSizeOrder = "none"
		var screenSizesUpTo = this.screenSizesUpTo

		var i
		for(i=0; i<screenSizesUpTo.length; i++){
			var screenSize = screenSizesUpTo[i]

			if(w_width<=screenSize){
				screenSizeOrder = i;
				break
			}
		}

		if(screenSizeOrder=="none"){
			screenSizeOrder = i;
		}

		return screenSizeOrder;
	}

	
	selectValueRelateToScreenSize(valuesByOrder){
		/*
		number of property greater than screenSizesUpTo by 1
		var valuesByOrder = {
			0: "100%",
			1: "100%",
			2: "50%",
			3: "33.33%",
			4: "25%"
            extraFunction: function(){}
		}
		*/

		var screenSizeOrder = this.getScreenSizeOrder();
		var selectedValue = valuesByOrder[screenSizeOrder];


		if("extraFunction" in valuesByOrder){
			selectedValue = valuesByOrder.extraFunction(screenSizeOrder, selectedValue);
		}
		
		return selectedValue
	}
	


    isTouchDevice(){
        return typeof window.ontouchstart !== 'undefined';
    }
	

	changeElePropertyWhenResizeScreen(callback = this.callback_resizeScreen){
		
		if(this.isTouchDevice()){ //Math.abs(-7.25)
			
			var previousBodyWidth = this.bodyWidth;
			var bodyDimensions = this.getBodyDimensions();
			var newBodyWidth = bodyDimensions.width
			
			if(previousBodyWidth==newBodyWidth){
				return;
			}
		}
		
		this.changeEleProperty(this.responsiveElements)
        
        this.updateBodyDimension()

		var screenSizeOrder = this.getScreenSizeOrder();
		callback(screenSizeOrder);

	}
	


	changeEleProperty = function(responsiveElements){

        

        /* 
            responsiveElements = [
                {
                    node: ...,
                    stylesByProperty: {
                        width: {valuesByOrder},
                        height: {},
                        float: {}
                    }
                },
                {
                    node: ...,
                    stylesByProperty: {
                        width: {},
                        height: {},
                        float: {}
                    }
                }

            ]
        
        */

		var screenSizeOrder = this.getScreenSizeOrder();

		var i;
		for(i=0; i<responsiveElements.length; i++){
				
			var responsiveElement = responsiveElements[i];
            var node = responsiveElement.node
			var stylesByProperty = responsiveElement.stylesByProperty;
			
			for (var propertyName in stylesByProperty) {
				if (stylesByProperty.hasOwnProperty(propertyName)) {

					var	valuesByOrder = stylesByProperty[propertyName]
                    var value = this.selectValueRelateToScreenSize(valuesByOrder)


                    if(propertyName=="innerHTML"){
						node[propertyName] = value
                    }
					else if(propertyName=="className"){
                        node[propertyName] = value
                    }
                    else{
                        node.style[propertyName] = value
                    }
				}
			}
		}
	}


    createResponsiveElementObject(node, stylesByProperty){
        return {
			node: node,
			stylesByProperty: stylesByProperty
		}
    }


	addResponsiveElement(responsiveElement){
		this.responsiveElements.push(responsiveElement);
	} 

    addResponsiveElementAndChangeElementProperty(node, stylesByProperty){
        var responsiveElement = this.createResponsiveElementObject(node, stylesByProperty)
        this.changeEleProperty([responsiveElement])
        this.addResponsiveElement(responsiveElement)
    }
}



