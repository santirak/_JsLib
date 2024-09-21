# _JsLib

Javascript library for web applications


## Struture

Consists of 2 files, **View** and **ViewController or Model**, with the ideas of: 
- **View** and **ViewController** are separated camps
- **ViewController** don't know view elements
- no view element in **ViewController**
- **ViewController** can not access **View** but can call view modifier method in **View**
- **View** is created in *constructor()* of **ViewController**
- **Other ViewController** and **Other View** will be created in *constructor()* of **ViewController** (all needed **Object** will be created at the same time so all setting can be changed before view elelemnets are created)
- **ViewController** and **Other ViewController** is passed to **View** when **View** is created 
- all view element (inclued view elements of **Other View**) will be create at the same time in *View.createElements()* (modificaation of element attached function will be done here)

- **ViewController** methods will be attached to view elements when the view elements are created



### ViewController or Model
- name of script file tells what it does
- for logic and data
- consist of view controller method or model method
- control behaviours of view and update view by calling view modifier methods in **View**
- contain intent functions which change the view states or data and then call view modifier to update view elements
- is created first when used
- **View** will be created when **ViewController** is created (inside *constructor* of **ViewController**)
- **Other View** and **Other ViewController** will be created when **ViewController** is created (inside *constructor* of **ViewController**) too
- **ViewController** is passed to **View** as arguments of *constructor(**ViewController**)* of **View**
- to create view elements, run *ViewController.createViews(elementStyle)* (elementStyle can be passed to set view element style )
- constructor() ***!!!*** In sequence
    - set all setting values (including **Other ViewController** setting)
    - create **Other ViewController**
    - create **View** (only **View** Object but no view element is created)
    - data stored
        
    - utility properties and function e.g.
        - extraFunction_xxx
        - afterFunction_xxx


- common properties
    - *this.view*

- common methods
    - *this.createViews()*: for calling *View.createElements()* to create all view elements
    - function for getting value from view elements which will call getting-value-function of **View**
    - function to setting value in view elements which will call setting-value-function of **View**


### View 
- name of script file is *view.js*
- it is extended class of **View** in "class" folder
- no logic and no data
- consists of 2 parts: view element creator and view element modifier (recreate view elements)
- ViewController method will be attached to view elements when they are created
- In modifying view elements, I will try to recreate view rather than modify view elements
- default element styles are set in *constructor()*
- new element styles can be passed when *createElements(elementStyle)* is called, the new one will replace default one (no style is passed inside **options**)
- constructor() ***!!!*** In sequence
    - set all setting values
    - set default *elementStyle*
    - change default style of **Other View** by using
    
        >*this.viewController.otherViewController.view.updateStyleObject(new_elementStyle)*
    


- common properties
    - >*this.viewController*
    - >*this.elementStyle = {style_xxx: {color: red}, style_yyy: {}}*
- common methods
    - >*createElements()*
        - for create all elements (at least create main parent node) 
        - if there are **Other View**, elements of **Other View** will be create here (by call **Other View**.*createViews()*  but do not pass *elementStyle* in )
    - >*createMainParentNode()*
    - function for getting value from view elements
    - function to setting value in view elements




### Warning
- Don't pass element style within **option**
- mark sure that all element style names (both general and specific, e.g. *style_input*, *style_inputForYear*) are set in *elementStyle*
- try not to pass setting value inside **option** (avoid using **option**)
- do not change *elementStyle* directly, it can be changed by 
    1. for **View**, pass new elementStyle when *createView()* is called
    2. for **Other View**, using *view.updateStyleObject(new_elementStyle)*
