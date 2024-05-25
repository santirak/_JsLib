# _JsLib note

## Overview
- each libery is separated into 2 file: **viewController** (use lib name) and **view**
- **viewController** is passed to **view** when **view** is created 


## viewController
- control behaviours of view and update view by calling view modifier function in **view**
- contain intent functions which change the view states or data and then call view modifier to update **view**

## view
- consists of 2 main parts
    - view creator
        - attach intent functions to elements (which is in the **viewController**)
    - view modifier



