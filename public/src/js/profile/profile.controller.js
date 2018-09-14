import updateRoute from '../general/router.js';
export default class ProfileController{
    constructor(model, view, utils, validator){
        this.model = model;
        this.view = view;
        this.utils = utils;
        this.validator = validator;
        this.user = null;
        this.template = this.view.template.innerHTML;
    }

    async getAllData(){
        await this.model.requestUserInfo(this.user);
        await this.model.requestFriends();
        await this.model.requestPhoto();
        await this.makeUserDataTemplate();

    }

    makeUserDataTemplate(){
        let photoTemp = this.view.photosTemplate(this.utils.checkData(this.model.photo));
        let interestsTemp = this.view.interestsTemplate(this.utils.checkData(this.model.profile.otherInfo.interests));
        let langTemp = this.view.languagesTemplate(this.utils.checkData(this.model.profile.otherInfo.languages));
        let friendsTemp = this.view.friendsTemplate(this.utils.checkData(this.model.friends));

        this.view.makeTemplate(this.model.makeDetailedUserData(interestsTemp, langTemp, photoTemp, friendsTemp));
    }

    editProfile(){
        this.view.showEditForm(this.view.editFormTemplate(this.model.profile));

    }

    sendEditedUserData(e){
        e.preventDefault();
        let data = this.view.getFormData();
        if(this.validator.isValidName(data.firstname, data.lastname)){
            this.model.editUserInfo(this.user, data).then(data=>{
                this.view.hideEditUserForm();
                this.updateState();
            });
        } else {
            this.view.infoAlert(this.validator.getAlertMsg());
        }
        
      
    }

    uploadAvatarFile(e){
        e.preventDefault();
        let file = this.view.inputAvatar.files[0];
        if (file) {
            this.upload(file);
        }
    }

    upload(file) {
        let data = new FormData();
        data.append('myFile', file);

        this.model.uploadImage(data).then(path => {
            this.view.showUploadedAvatar(path);
        })

    }

    getTags(e){
        this.model.requestTags().then(data => {
            let val = e.target.value.replace(/\\/g, "\\\\"); //уберечься от \\ в input
            let exp = new RegExp(val, "i");
            if(val.length >= 2){
                let res =  this.model.tags.filter(item => {
                    return exp.test(item.title);
                })
                setTimeout(() => this.view.showTags(res), 500)    
            };     
        });
    }
  
    getFormTags(){
        this.model.userTags = this.view.getFormTagsData();

    }
    formHandler(e){//keypress отдельно
        if(e.target.classList.contains(this.view.sendUserDataBtnClass)){//если отправляем форму
            this.getFormTags();
            this.sendEditedUserData(e);
        } else if(e.target.classList.contains(this.view.removeTagBtnClass)){//если  удаляем тег
            this.view.removeTag(e);
            this.getFormTags();
        } else if(e.target.classList.contains(this.view.addTagBtnClass)){//если добавляем тег
            this.view.addTag(e);
            this.getFormTags();
        } else if(e.target.classList.contains(this.view.uploadAvatarBtnClass)){
            this.uploadAvatarFile(e);
        }
    }

    formTagsHandler(e){
        if(e.target.id == this.view.getTagsInputId){//если ищем тег
            this.getTags(e)
        }
    }

    initListeners(){
        this.view.editProfileBtn.addEventListener('click', this.editProfile.bind(this));
        this.view.modal.addEventListener('click', this.formHandler.bind(this));
        this.view.modal.addEventListener('keypress', this.formTagsHandler.bind(this));
    }

    
    updateState(){
        this.getAllData().then((response => {
            //this.utils.initTemplate(this.view.wrapper, 'profile');
            this.utils.updateTemplate(this.view.wrapper, this.view.templateString);
            this.view.init();
            this.initListeners();
        }));  
    }

    init(){
        this.user = this.model.getCurrentUser();
        this.updateState();
    }
}