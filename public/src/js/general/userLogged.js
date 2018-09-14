export default class UserLogged{
    constructor(model){
        this.user = null;
    }

    isLogged(){
		let data = this.getUserInfo();
		return data && JSON.parse(data).isLogged;
    }
    
    getUserInfo(){
        return localStorage.getItem('userInfo');
    }

    saveUserData(loggedStatus, userId){
		let data  = {
			userId : userId,
			isLogged:loggedStatus
		}
		this.setUserInfo(data);
    }
    
    setUserInfo(data){
        localStorage.setItem('userInfo', JSON.stringify(data));
        this.user = data.userId;
    }
    



}

