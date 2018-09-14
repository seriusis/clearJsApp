export default class LoginView{
    constructor(utils){
        this.utils = utils;
        this.template = document.querySelector('#login');
        this.wrapper = document.querySelector('#wrapper');
        this.inputLogin = document.querySelector('.input-login');
        this.inputPass = document.querySelector('.input-pass');
        this.errorDiv = document.querySelector('.alert'); 
        this.goLoginBtn = document.querySelector('.goLogin');
        this.logoutBtn = document.querySelector('.logout');
        this.userMenu = document.querySelector('#userMenu');
    }

    init(){
        this.utils.hideView([this.userMenu]);
    }

    showErrorMsg(msg){
        this.errorDiv.innerHTML = msg;
    }

    hideErrorsMsg(){
        this.errorDiv.innerHTML = '';
    }

}