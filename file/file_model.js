export default class File_model{

    /*    
    README

   
    ARCHITECTURE
       

    CUSTOMIZATION OBJECT

    WARNING
       

    DEPENDENCY
    */


    constructor() {
       
        this.maxFileSize = 6000000; // "6 MB"; 
        this.allowFileExtensions = ["jpg", "jpeg", "png"]

    }


    getFileExtension(file){
        var fileNameAndExtension = file.name;
        var nameParts = fileNameAndExtension.split(".");
        var fileExtension = nameParts[nameParts.length-1].toLowerCase();
        return fileExtension
    }

    checkFileSize(file){
        var isValid = false
        if(file.size <= this.maxFileSize){
            isValid = true;
        }

        return {
            isValid: isValid,
            fileSize: file.size,
            maxFileSize: this.maxFileSize
        }

    }


    checkFileExtension(file){
        var fileExtension = this.getFileExtension(file)
        var isValid = false
        if(this.allowFileExtensions.includes(fileExtension))  isValid = true
        return {
            isValid: isValid,
            fileExtension: fileExtension
        }
    }


}



