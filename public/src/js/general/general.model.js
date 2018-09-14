export default class GeneralModel{
    constructor(utils){
        this.usersUrl = 'http://localhost:3000/users/';
        this.loginUrl = 'http://localhost:3000/login/';
        this.postsUrl = 'http://localhost:3000/posts/';
        this.friendsUrl = 'http://localhost:3000/friends/';
        this.photoUrl = 'http://localhost:3000/gallery/';
        this.uploadUrl = 'http://localhost:3000/upload';
        this.utils = utils;
        this.profile = {};
        this.posts = [];
        this.post = {};
        this.friends = [];
        this.photos = [];
        this.loginData = {};
        this.tags = [];
        this.userTags = [];
        this.languages = {};
        this.userId = null;
    }

    requestUserInfo(id){
         fetch(this.usersUrl + id).then(response => response.json()).then(data => {
            this.profile.mainInfo = data.mainInfo;
            this.profile.otherInfo = data.otherInfo;
            this.profile.photos = data.photos;
            this.loginData = data.loginData;
            this.userId = data.userId;
        });
    }

    editUserInfo(id, data){
        return fetch(this.usersUrl + '' + id, this.getEditedUserOptions(data)).then(response => response);
       
    }



    getEditedUserOptions(data){
        let body = {
            userId : this.userId,
            loginData : this.loginData,
            mainInfo : {
                firstname : data.firstname,
                lastname : data.lastname,
                birthday : data.birthday,
                avatar : data.avatar,
                wallpaper : this.profile.mainInfo.wallpaper,
                contacts : {
                    city : data.city,
                    email : data.email,
                    telegram : data.telegram,
                    skype : data.skype
                },
                status : data.status,
                gender : data.gender,
                friends : this.profile.mainInfo.friends,
                job : data.job,

            },
           otherInfo : {
                education : data.education,
                interests : this.userTags,
                languages : {
                    "uk" : {
                        "title" : this.profile.otherInfo.languages.uk.title,
                        "ico" : this.profile.otherInfo.languages.uk.ico,
                        "status" : data.languages.uk
                    },
                    "en" : {
                        "title" : this.profile.otherInfo.languages.en.title,
                        "ico" : this.profile.otherInfo.languages.en.ico,
                        "status" :  data.languages.en
                    },
                    "ru" : {
                        "title" : this.profile.otherInfo.languages.ru.title,
                        "ico" : this.profile.otherInfo.languages.ru.ico,
                        "status" :  data.languages.ru
                    }
                },
                photos : this.profile.photos
            }
        }
        let options =  {
            method : 'put',
            headers: {
                'Content-type': 'application/json; charset= utf-8'
            },
            body : JSON.stringify(body)
        };
        return options;
    };

    requestPosts(){
        return fetch(this.postsUrl).then(responce => responce.json()).then(data => {
            this.posts = data;
        });
    }
    
    requestFriends(){
        return fetch(this.friendsUrl).then(responce => responce.json()).then(data => {
            this.friends = data;
        });
    }

    requestPhoto(){
        return fetch(this.photoUrl).then(responce => responce.json()).then(data => {
            this.photo = data;
        });
    }
    

    makeUserData(photoTemplate, postsTemplate){//формирую массив данных пользователя
        return {
            name : this.profile.mainInfo.firstname,
            lastname : this.profile.mainInfo.lastname,
            avatar : this.utils.checkData(this.profile.mainInfo.avatar),
            wallpaper : this.utils.checkData(this.profile.mainInfo.wallpaper),
            friends : this.utils.checkData(this.profile.mainInfo.friends.length),
            status : this.utils.checkData(this.profile.mainInfo.status),
            city : this.utils.checkData(this.profile.mainInfo.contacts.city),
            job : this.utils.checkData(this.profile.mainInfo.job),
            photos : this.utils.checkData(photoTemplate),
            posts : postsTemplate
        }
    }

    makeDetailedUserData(interestTemplate, languagesTemplate, photoTemplate, friendsTemplate){//формирую массив полных данных пользователя
        let age = ` (${this.utils.howTimePassed(this.profile.mainInfo.birthday)})`;
        return {
            name : this.profile.mainInfo.firstname,
            lastname : this.profile.mainInfo.lastname,
            avatar : this.utils.checkData(this.profile.mainInfo.avatar),
            wallpaper : this.utils.checkData(this.profile.mainInfo.wallpaper),
            status : this.utils.checkData(this.profile.mainInfo.status),
            birthday: this.utils.modifyDate(this.profile.mainInfo.birthday) + age,
            gender : this.utils.checkData(this.profile.mainInfo.gender),
            job : this.utils.checkData(this.profile.mainInfo.job),
            education : this.utils.checkData(this.profile.otherInfo.education),
            email : this.utils.checkData(this.profile.mainInfo.contacts.email),
            city : this.utils.checkData(this.profile.mainInfo.contacts.city),
            telegram : this.utils.checkData(this.profile.mainInfo.contacts.telegram),
            skype : this.utils.checkData(this.profile.mainInfo.contacts.skype),
            about : this.utils.checkData(this.profile.otherInfo.about),
            interests : this.utils.checkData(interestTemplate),
            languages : this.utils.checkData(languagesTemplate),
            photos : this.utils.checkData(photoTemplate),
            friends : this.utils.checkData(friendsTemplate)
        }
    }

    getCurrentUser(){
        return  JSON.parse(localStorage.getItem('userInfo')).userId;
    }

    requestUserLoginData(login, pass){
        let body = {
			login : login,
			password : pass
		}
        let options = {
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            },
            method: 'post',
            body: JSON.stringify(body)
        };
        return fetch(this.loginUrl, options)
            .then(responce => responce.json())
            .then(data => {
                console.log(body)
                return data;
            });
    }


    requestTags(){
        return fetch('http://localhost:3000/tags/').then(responce => responce.json()).then(data => {
           this.tags = data;
        });
    }

    uploadImage(data){
        return fetch(this.uploadUrl, {
            method: 'POST',
            body: data
        }).then(response => response.json())
    }

    addPost(data){
        return fetch(this.postsUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            },
            body : JSON.stringify({
                text: data.text,
                image: data.image,
                date: Date.parse(new Date()),
                autorId: this.userId,
                autorName: this.profile.mainInfo.firstname,
                autorAvatar: this.profile.mainInfo.avatar
            })
        }).then(response => response.json())
    }
    sortPosts(){
        return (this.posts).sort((a, b) => b.date - a.date);
    }

    getPost(id){
        return fetch(this.postsUrl + ''+ id).then(responce => responce.json()).then(data => {
            this.post = data;
        });
    }

    editPost(id, data){
        return fetch(this.postsUrl + '' + id, this.getEditedPostOptions(data)).then(response => response);
    }
    
    getEditedPostOptions(data){
        let body = {
            postId : this.post.id,
            autorId : this.post.autorId,
            autorName : this.post.autorName,
            autorAvatar : this.post.autorAvatar,
            date : this.post.date,
            text : data.text,
            image : data.image
        }
        return{
            method : 'put',
            headers : {
                'Content-type': 'application/json; charset= utf-8'
            },
            body : JSON.stringify(body)
        }
    }

    removePost(id){
        return fetch(this.postsUrl + id, {
            method : 'delete',
            headers : {
                'Content-type': 'application/json; charset= utf-8'
            }
        }).then(response => response);
    }

}




