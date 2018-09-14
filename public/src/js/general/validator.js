export default class Validator{
    constructor(){
    this.reg =  /^[a-z]+([-_]?[a-z0-9]+){0,2}$/i;
    this.error = null;
	}

    isValid(login, pass){
        if(login.value =='' || pass.value == ''){
            this.error = 'Fill in the empty fields!';
            return false;
        }else if(!login.value.match(this.reg)){
            this.error = 'Login has an incorrect format!';
            return false;
        }else if(pass.value.length < 8){
            this.error = 'Password must be between 8 characters!';
            return false;
        } else {
            return true;
        }
    }
 
    isValidItem(name, url, description){
        if((name == '') || (url == '') || (description == '')){
            this.error = 'Fill in the empty fields!';
            return false;
        } else if(name <=3){
            this.error = 'The name must be between 3 characters!';
            return false;
        } else if(description.length <= 10){
            this.error = 'Description must be between 10 characters!';
            return false; 
        } else {
            return true;
        }
        
    }

    isValidPost(text){
        if(text.length < 10){
            this.error = 'The text of post should be from 10 characters!';
            return false;
        } else {
            return true;
        }
        
    }

    isValidName(firstname, lastname){
        if((firstname.length < 3) || (lastname < 3)){
            this.error = 'First Name and Last Name should be from 3 characters!';
            return false;
        } else {
            return true;
        }
        
    }

    getAlertMsg(){
        return this.error;
    }  

}