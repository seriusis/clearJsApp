export default class LoginController{
	constructor(model, view, utils, validator, UserLogged){
		this.view = view;
		this.model = model;
		this.validator = validator;
		this.utils = utils;
		this.userLogged = UserLogged;
		this.userMenuSelector = '#userMenu'
	}
	
	init(){

		this.view.init();
		this.initListeners();
		this.userLogged.isLogged() && this.logged();
		
	}
	
	initListeners(){
		this.view.goLoginBtn.addEventListener('click', this.goLogin.bind(this));
	}

	validateUserData(){
		this.validator.isValid(this.view.inputLogin, this.view.inputPass) ? this.checkLoginData() : this.view.showErrorMsg(this.validator.getAlertMsg());
		
	}

	checkLoginData(){
		let login = this.view.inputLogin.value;
		let pass = this.view.inputPass.value;

		this.model.requestUserLoginData(login, pass).then(
			data => {
			if(data.loginStatus){
				this.userLogged.saveUserData(true, data.userId);
				this.logged();
			} else {
				this.view.showErrorMsg('Вы ввели несуществующий логин или неверный пароль!');
			}
		});

	}

	goLogin(e){
		e.preventDefault();
		this.view.hideErrorsMsg();
		this.validateUserData();
	}

	logged(){
		document.location.href = '';
		this.utils.hideView([this.userMenu]);
		
	}
	
	logout(){
		this.userLogged.saveUserData(false);
		document.location.href = '#login';
		
	}

}