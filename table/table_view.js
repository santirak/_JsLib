class Table_view{

    /*    
    README

   
    ARCHITECTURE
        -   borderCollapse = "collapse" is not used (borderCollapse = "separate" is used instead) 
            because its will make border of fixed head cell disappear when scrolling
            and its will make border of head cells disappear when set position of thead to be sticky
        _   use borderSpacing = "0px" instead of borderCollapse = "collapse"

        -   priority of table cell style is 
                1. this.styleForCells
                2. this.styleForHeadCells or this.styleForContentCells
                3. column.styleForCells
                4. column.styleForHeadCells  column.styleForContentCells

        -   to make table always stays at least full width, set tableNode.style.minWidth = "100%" 
            meaning: 
                when table width < parent width -> extend to full width
                when table width > parent width -> scroll

        -   the first column can be fixed only when no colSpan (colSpan < 2) for all head cells in first column




    CUSTOMIZATION OBJECT

        -   to change dimensions of table view, change size of mainparentNode

        for table cells style
        -   to change style of all cells in table, edit this.styleForCells
        -   to change style of all content cells, edit this.styleForHeadCells
        -   to change style of all head cells, edit this.styleForContentCells
        
        for column cells style
        -   to change style of cells in column , edit column.Style
        -   to change style of only content cells in a column, edit column.styleForHeadCells
        -   to change style of only head cells in a column, edit column.styleForContentCells

        -   to make table alway extend to full width when table width is smaller than parent width,  set this.isTableAlwayFullParentWidth
        
    WARNING
        -   borderCollapse = "collapse" is not used so borderWidth will be display double of the borderWidth value

        -   this.fixTableheadRows() and this.fixCellsFirstColumn() only work when tableNode is displaying


    DEPENDENCY

        
    */

    constructor(){

        this.styleForCells = {
            borderWidth: "0.5px",
            borderStyle: "solid",
            borderColor: "lightgray",
            padding: "4px"
        }
    
        this.styleForHeadCells = {
            backgroundColor: "#f2f2f2"
        }
    
        this.styleForContentCells = {
    
        }
    
        this.isHeadFixed = true
        this.isFirstColumnFixed = true 
        this.isTableAlwayFullParentWidth = true;

        this.columns = []
        this.headRows = []
        this.contentRowsById = {}

        this.createMainParentNode()
    }

    

    
  

    createMainParentNode(){

        var mainParentNode = document.createElement("DIV")
        mainParentNode.style.width = "100%"
        mainParentNode.style.float = "left"
        // mainParentNode.style.width = "300px"
        // mainParentNode.style.height = "650px"
        mainParentNode.style.float = "left"
        mainParentNode.style.overflow = "auto"
        mainParentNode.style.position = "relative" //--for fixed head and first column

        this.mainParentNode = mainParentNode

    }


    createTable(columns, tableContents){

        this.mainParentNode.innerHTML = ""
        this.columns = columns

        //-- table parent
        
        var mainParentNode = this.mainParentNode

        var tableNode = document.createElement("TABLE")
        tableNode.style.borderSpacing = "0px"
        tableNode.style.borderCollapse = "separate" //collapse

        if(this.isTableAlwayFullParentWidth){
            //-- make table always at least being full with
            tableNode.style.minWidth = "100%" 
        }


        //--create head row   
        var theadNode = document.createElement("thead")
        this.createHeadRows(columns, theadNode)
        tableNode.appendChild(theadNode)
        // theadNode.style.backgroundColor = "pink"
        this.theadNode = theadNode


        //-- create content rows
        var tbodyNode = document.createElement("tbody")
        this.createContentRows(columns, tableContents, tbodyNode)
        tableNode.appendChild(tbodyNode)

        this.tbodyNode = tbodyNode



        // this.fixHeadAndFirstColumn()
        this.fixTableHeadRows()

        mainParentNode.appendChild(tableNode)

    }


    // fixHeadAndFirstColumn(){
    //     this.fixTableHeadRows()
    //     this.fixCellsFirstColumn()
    // }


    fixTableHeadRows(){

        var theadNode  = this.theadNode
        
        if(!this.isHeadFixed) return

        //-- ** make thead sticky will keep all sub head stay at their position without setting top position to all head cells
        theadNode.style.position = "sticky"
        theadNode.style.top = "0px"
        theadNode.style.zIndex = 1
        // theadNode.style.backgroundColor = "lightcoral"


        // var headRows = this.headRows
        // for(var index in headRows){
        //     var rowNode = headRows[index].rowNode
        //     var cellNodes = rowNode.children
        //     for(var i=0; i<cellNodes.length; i++){
        //         var cellNode = cellNodes[i]
        //         cellNode.style.position = "sticky"
        //         cellNode.style.top = cellNode.offsetTop+"px"
        //         cellNode.style.zIndex = 1
        //     }
        // }
    }


    checkColumnSpanOfCellInFirstColumnHead(){

        var isSpan = false

        var headRows = this.headRows
        for(var index in headRows){
            var rowNode = headRows[index].rowNode
            var firstCellNode = rowNode.firstChild
            
            if(firstCellNode.colSpan>1) isSpan = true
            // if(firstCellNode.rowSpan>1) isSpan = true
        }

        return isSpan

    }

    fixHeadCellsInFirstColumn(){

        if(!this.isFirstColumnFixed) return

        var isSpanColumn = this.checkColumnSpanOfCellInFirstColumnHead()
        if(isSpanColumn) return


        //-- fix head

        var headRows = this.headRows
        for(var index in headRows){
            var rowNode = headRows[index].rowNode
            var firstCellNode = rowNode.firstChild
            
            firstCellNode.style.position = "sticky"
            firstCellNode.style.left = "0px"
            // firstCellNode.style.top = firstCellNode.offsetTop+"px"
            // firstCellNode.style.zIndex = 2
            // firstCellNode.style.backgroundColor = "lightgray"

            if(firstCellNode.rowSpan>1) break;
        }

    }

    fixContentCellInFirstColumn(cellNode){
        if(!this.isFirstColumnFixed) return

        var isSpanColumn = this.checkColumnSpanOfCellInFirstColumnHead()
        if(isSpanColumn) return

        cellNode.style.position = "sticky"
        cellNode.style.left = "0px"

    }


    // fixCellsFirstColumn(){


    //     if(!this.isFirstColumnFixed) return


    //     var isSpanColumn = this.checkColumnSpanOfCellInFirstColumnHead()
    //     if(isSpanColumn) return


    //     //-- fix head

    //     var headRows = this.headRows
    //     for(var index in headRows){
    //         var rowNode = headRows[index].rowNode
    //         var firstCellNode = rowNode.firstChild
            
    //         firstCellNode.style.position = "sticky"
    //         firstCellNode.style.left = "0px"
    //         // firstCellNode.style.top = firstCellNode.offsetTop+"px"
    //         // firstCellNode.style.zIndex = 2
    //         // firstCellNode.style.backgroundColor = "lightgray"

    //         if(firstCellNode.rowSpan>1) break;
    //     }



    //     //--fix content
    //     var contentRowsById = this.contentRowsById
    //     for(var rowId in contentRowsById){
    //         var rowNode = contentRowsById[rowId].rowNode
    //         var firstCellNode = rowNode.firstChild

    //         firstCellNode.style.position = "sticky"
    //         firstCellNode.style.left = "0px"
    //         // firstCellNode.style.zIndex = "2"
    //         // firstCellNode.style.backgroundColor = "lightblue"

    //     }
    // }


    createRowNode(){
        var rowNode = document.createElement("TR")
        return rowNode;
    }


    createContentCellsInRow(columns, tableContent, contentRow){

        var createEachContentCell = (column, tableContent) => {

            var contentType = column.contentType
            var contentKeyName = column.contentKeyName

            var cellNode = document.createElement("TD")

            if(contentType==1){
                var content = tableContent[contentKeyName]
                var contentText = (Array.isArray(content))? content.join(", "): content
                
                cellNode.innerHTML = contentText
            }
            else if(contentType==2){
                var contentElements = tableContent[contentKeyName]
                for(var i=0; i<contentElements.length; i++){
                    cellNode.appendChild(contentElements[i])
                }
            }
            
            // console.log(this)
            this.addStyleToTableCell(cellNode, column)

            


            return {
                cellNode:cellNode,
                contentKeyName: contentKeyName
            }
        }


        for(var i=0; i<columns.length; i++){
            
            var column = columns[i]
            var contentKeyName = column.contentKeyName
            var subcolumns = column.subcolumns
            
            if(subcolumns.length>0){
                var Subcontents = tableContent[contentKeyName]
                this.createContentCellsInRow(subcolumns, Subcontents, contentRow)
            }
            else{
                var cell = createEachContentCell(column, tableContent)
                contentRow.rowNode.appendChild(cell.cellNode)
                contentRow.cellsByKey[cell.contentKeyName] = cell
            }
            
        }
    }


    createEachContentRow(columns, tableContent){

        var contentRowNode = this.createRowNode()
        var contentRow = {
            rowNode: contentRowNode,
            cellsByKey: {}
        }

        this.createContentCellsInRow(columns, tableContent, contentRow)
        this.contentRowsById[tableContent.id] = contentRow

        this.fixContentCellInFirstColumn(contentRow.rowNode.firstChild)
                
        return contentRow

    }


    createContentRows(columns, tableContents, tbodyNode){
        for(var i in tableContents){
            var tableContent = tableContents[i]
            var contentRow = this.createEachContentRow(columns, tableContent)
            tbodyNode.appendChild(contentRow.rowNode)    
        }
    }


    calculateColumnSpan(column){

        // var subcolumns = column.subcolumns
        // return subcolumns.length


        var getNumber = (column, spanNumber) => {
           
            var subcolumns = column.subcolumns
            var spanNumber = subcolumns.length

            for(var i=0; i<subcolumns.length; i++){
                //-- set level
                var subcolumn = subcolumns[i]
                
                var return_spanNumber = getNumber(subcolumn)
                if(return_spanNumber>1) spanNumber += return_spanNumber-1
                
            }
            return spanNumber
        }

        return getNumber(column, 0)

    }


    calculateRowSpan(column, finalLevelOrder){

        var subcolumns = column.subcolumns

        if(subcolumns.length>0){
            return 0
        }
        else{
            return finalLevelOrder-column.level+1
        }
    }


    createHeadCellsInRow(columns, targetLevel, finalLevelOrder, headRowNode){


        for(var i=0; i<columns.length; i++){

            var column = columns[i]
            var level = column.level
            var subcolumns = column.subcolumns

            if(subcolumns.length>0){
                this.createHeadCellsInRow(subcolumns, targetLevel, finalLevelOrder, headRowNode)
            }

            if(level!=targetLevel) continue

            var headCellNOde = document.createElement("TH")
            headCellNOde.innerHTML = column.name


            //-- column span
            var columnSpan = this.calculateColumnSpan(column)
            if(columnSpan>1) headCellNOde.colSpan =  columnSpan
            
            //-- row span
            var rowSpan = this.calculateRowSpan(column, finalLevelOrder)
            if(rowSpan>1) headCellNOde.rowSpan = rowSpan
            
            //-- add style
            this.addStyleToTableCell(headCellNOde, column, "head")

            headRowNode.appendChild(headCellNOde)
        }

    }


    createHeadRows(columns, tableNode){

        var finalLevelOrder = this.setColumnLevelAndParent(columns)
        
        for(var i=0; i<=finalLevelOrder; i++){
            var headRowNode = this.createRowNode()
            this.createHeadCellsInRow(columns, i, finalLevelOrder, headRowNode)
            tableNode.appendChild(headRowNode)

            this.headRows.push({rowNode: headRowNode})
        } 

        this.fixHeadCellsInFirstColumn()
    }


    setColumnLevelAndParent(columns){

        var setLevel = (columns, level, parentColumn) => {
           
            var finalLevelOrder = level

            for(var i=0; i<columns.length; i++){
                //-- set level
                var column = columns[i]
                column.level = level
                column.parentColumn = parentColumn
                //-- check subcolumn
                var subcolumns = column.subcolumns
                if(subcolumns.length>0){
                    var newLevel = setLevel(subcolumns, level+1, column)
                    if(newLevel>finalLevelOrder) finalLevelOrder = newLevel
                }
            }
            return finalLevelOrder
        }

        return setLevel(columns, 0, null)

    }


    addStyleToTableCell(cellNode, column, headOrContent = "content"){

        // console.log(cellNode.innerHTML)

        //-- apply general style  and then apply head of content style

        var all_cells =  this.styleForCells
        var all_specificCells = (headOrContent=="head")? this.styleForHeadCells : this.styleForContentCells 
        
        var column_cells = column.Style
        var column_specificCells = (headOrContent=="head")? column.styleForHeadCells: column.styleForContentCells
        
        var styles = [all_cells, all_specificCells, column_cells, column_specificCells]

        for(var i=0; i<styles.length; i++){
            var style = styles[i]
            for(var styleName in style){
                cellNode.style[styleName] = style[styleName]
            }
        }

        // console.log(cellNode.innerHTML)
        // console.log(cellNode.style.border)
    }


    insertNewRows(rowContents, insertPosition = "top"){
        for(var id in rowContents){
            var rowContent = rowContents[id]
            var contentRow = this.createEachContentRow(this.columns, rowContent)
            if(insertPosition=="top"){
                this.tbodyNode.insertBefore(contentRow.rowNode, this.tbodyNode.firstChild)    
            }
            else{
                this.tbodyNode.appendChild(contentRow.rowNode)    
            }
        }
    }


    removeContentsInRow(contentRow){
        contentRow.cellsByKey = []
        contentRow.rowNode.innerHTML = ""
    }

    
    /**
        @param {Array} rowContents
     */
    updateContentInRowsByReCreateContentElement(rowContents){
        var columns = this.columns

        for(var index in rowContents){

            var rowContent = rowContents[index]
            var id = rowContent.id
            
            var contentRow = this.contentRowsById[id]

            this.removeContentsInRow(contentRow)
            this.createContentCellsInRow(columns, rowContent, contentRow)
           
        }
    }

    // this.updateContentInRows = function(rowContents){

    //     function updateContent(columns, contentRow, rowContent){

    //         for(var index in columns){
    //             var column = columns[index]
    //             var contentKeyName = column.contentKeyName
                
    //             var subcolumns = column.subcolumns
    //             if(subcolumns.length>0){
    //                 updateContent(subcolumns, contentRow, rowContent[contentKeyName])
    //             }
    //             else{
    //                 contentRow.cellsByKey[contentKeyName].cellNode.innerHTML = rowContent[contentKeyName]
    //             }
    //         }


    //     }

    //     var columns = this.columns

    //     for(var index in rowContents){

    //         var rowContent = rowContents[index]
    //         var id = rowContent.id
            
    //         var contentRow = this.contentRowsById[id]

    //         updateContent(columns, contentRow, rowContent)

    //     }

    // }


    removeRows(rowIds){

        var contentRowsById = this.contentRowsById

        for(var i in rowIds){
            var rowId = rowIds[i]
            var contentRow = contentRowsById[rowId]
            

            //-- remove element
            contentRow.rowNode.remove()
            //-- remove from  object of rows
            delete contentRowsById[rowId];  
        }
    }


}



class Column_view{
    constructor(){   
        this.name = "Colunn name"
        this.contentKeyName = "none"
        this.contentType = 1 //-- 1 = normal text, 2 = html node
        this.styleForCells = {} //--general
        this.styleForHeadCells = {}
        this.styleForContentCells = {}
        this.isDisplay = true
        this.subcolumns = []
    }
}


export {Table_view, Column_view};
