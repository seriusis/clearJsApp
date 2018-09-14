export default class ProfileView{
    constructor(utils){
        this.utils = utils;
        this.wrapper = document.querySelector('#wrapper');
        this.template = document.querySelector('#profile');
        this.userMenu = document.querySelector('#userMenu');
        this.templateString = ``;
    }

    init(){
        this.initDOMElements()
        this.utils.showView([this.userMenu]);
    }

    initDOMElements(){
        this.editBtnSelector = '.edit-profile';
        this.modalSelector = '#modal-profile';
        this.modalContentSelector = '.modal-content .modal-inner';
        this.sendUserDataBtnClass = 'sendEditedData';
        this.getTagsInputId = 'formTags';
        this.selectedTagsId = 'selectedInterests';
        this.tagItemClass = 'tagItem';
        this.removeTagBtnClass = 'tag-remove';
        this.addTagBtnClass = 'tag-add';
        this.uploadAvatarBtnClass = 'uploadAvatar';
        this.avatarPreviewClass = 'avatarPreview';
        this.editProfileBtn = document.querySelector(this.editBtnSelector);
        this.modal = document.querySelector(this.modalSelector);
        this.modalContent = document.querySelector('#'+this.modal.id+' '+ this.modalContentSelector);
        this.alertBlock = document.querySelector('.alert-fixed');
    }

    printUserData(data){
        this.template.innerHTML = data;
    }


    makeTemplate(data){
        //this.template.innerHTML = this.template.innerHTML
        this.templateString = this.template.innerHTML
                    .replace('{name}', `${data.name}  ${data.lastname}`)
                    .replace('{avatar}', data.avatar)
                    .replace('{wallpaper}', data.wallpaper)
                    .replace('{status}', this.utils.modifyStatus(data.status))
                    .replace('{birthday}', data.birthday)
                    .replace('{gender}', data.gender)
                    .replace('{job}', data.job)
                    .replace('{education}', data.education)
                    .replace('{email}', data.email)
                    .replace('{city}', data.city)
                    .replace('{telegram}', data.telegram)
                    .replace('{skype}', data.skype)
                    .replace('{about}', data.status)
                    .replace('{interests}', data.interests)
                    .replace('{languages}', data.languages)
                    .replace('{photos}', data.photos)
                    .replace('{friends}', data.friends);
       
    }

    photosTemplate(photo){
        let temp = '';
        for(let i = 0; i < 4; i++ ){
            temp += `
            <div style="width: 49%;margin-bottom: 10px;  display: inline-block; vertical-align: bottom;">
            <h5>${photo[i].name}</h5>
            <img data-width="640" data-height="400" data-action="zoom" src="${photo[i].url}" style="width: 405px; height: 254px;">
          </div>
            `;
        }
        return temp;
    }

    friendsTemplate(friends){
        let temp = '';
        for(let i = 0; i < friends.length; i++ ){
        temp += `
        <li class="b">
            <div class="rv ady">
                <img class="bos us aff" src="${friends[i].avatar}">
                <div class="rw yd">
                    <button class="cg nz ok acx">
                    <span class="h bju"></span> Unfollow
                    </button>
                    <strong>${friends[i].firstname} ${friends[i].lastname}</strong> |
                    <small>${friends[i].city}</small>
                </div>
            </div>
        </li>
        `
        }
        return temp;
    }

    languagesTemplate(data){
        let temp = '';
        data.uk.status && (temp += `<li class="cg"><img width = "18" title=" ${data.uk.title}" src ="${data.uk.ico}"></li>`);
        data.en.status && (temp +=  `<li class="cg"><img width = "18" title=" ${data.en.title}" src ="${data.en.ico}"></li>`);
        data.ru.status && (temp +=  `<li class="cg"><img width = "18" title=" ${data.ru.title}" src ="${data.ru.ico}"></li>`);
        return temp; 

    }

    languagesEditTemplate(data){
        
        return `<div class="form-check form-check-inline">
                    <label class="form-check-label">
                        <img width="18" src = "${data.uk.ico}"> 
                        <input class="form-check-input" type="checkbox" id="input-Uk" value="uk" ${data.uk.status && 'checked'}>${data.uk.title}
                    </label>
                    <label class="form-check-label">
                        <img width="18" src = "${data.en.ico}"> 
                        <input class="form-check-input" type="checkbox" id="input-En" value="en" ${data.en.status && 'checked'}>${data.en.title}                        
                    </label>
                    <label class="form-check-label">
                        <img width="18" src = "${data.ru.ico}"> 
                        <input class="form-check-input" type="checkbox" id="input-Ru" value="ru" ${data.ru.status && 'checked'}>${data.ru.title}                   
                    </label>
                </div>
                `;
    }

    interestsTemplate(data){
        let temp = '';
        for(let i = 0; i < data.length; i++ ){
            temp += `<li class="cg"><img width = "18" src ="${data[i].ico}"> ${data[i].title}</li>`
        }
        return temp;
    }

  


    tagsEditTemplate(data, view){
        let btnClass = '';
        (view =='remove') ? (btnClass = this.removeTagBtnClass) : (btnClass = this.addTagBtnClass);
        let temp = '';
        for(let i = 0; i < data.length; i++){
            temp += `<button tagId="${data[i].tagId}" id="tag_${data[i].tagId}" class="cg ns tagItem ${btnClass}">
                        <span class="no-events"><img width ="20" height="20" src="${data[i].ico}" class="no-events"></span>
                        <span class="title no-events">${data[i].title}</span> 
                    </button>`
        }
        return temp;
    }

    editFormTemplate(data){
        return `<div class="modal-body">
                <div class="modal-inner"><h5 class="modal-title">Edit data about ${data.mainInfo.firstname} ${data.mainInfo.lastname}</h5>
                      <form>
                    <div class="dp afo">
                      <div class="fm">
                      <div class="dp form-group ">
                          <div class="fm">
                              <label for="formName">First Name</label>
                              <input type="text" class="form-control" id="formName" value="${data.mainInfo.firstname}">
                          </div>
                          <div class="fm">
                            <label for="formName">Last Name</label>
                            <input type="text" class="form-control" id="formLastName" value="${data.mainInfo.lastname}">
                            </div>
                    </div>
                          <div class="form-group">
                              <label for="formUrl">Avatar</label><br>
                              <input class="file-input cg nz ok afh" type="file" name="avatarFile" id="avatarFile">
                              <button class="cg nq afh uploadAvatar">Upload</button>
                              <div class="avatarPreview afh">
                              <img src = "${data.mainInfo.avatar}" width = 110>
                              </div>
                          </div>
                          
                          <div class="form-group">
                              <label for="formStatus">Resume</label>
                              <textarea class="form-control" id="formStatus" rows="7">${data.mainInfo.status}</textarea>
                          </div>
                          <div class="form-group">
                          <label for="formGender">Gender</label>
                          <select id= "formGender">
                            <option value = "male" ${(data.mainInfo.gender == 'male') && 'selected'}>Male</option>
                            <option value = "female" ${(data.mainInfo.gender == 'female') && 'selected'}>Female</option>
                          </select>
                        </div>
                          <div class="form-group">
                          <label for="formCity">City</label>
                          <input type="text" class="form-control" id="formCity" value="${data.mainInfo.contacts.city}">
                      </div>
                        </div>
                        <div class="fm">
                            <div class="form-group">
                                <label for="formBirthday">Birthday (<span>${this.utils.howTimePassed(data.mainInfo.birthday)}</span> years old)</label>
                                <input type="text" class="form-control datepicker" id="formBirthday"  value="${this.utils.modifyDate(data.mainInfo.birthday)}">
                            </div>
                            <div class="form-group">
                                <label for="formName">Job</label>
                                <input type="text" class="form-control" id="formJob" value="${data.mainInfo.job}">
                            </div>
                         
                            <div class="form-group">
                                <label for="formName">Education</label>
                                <input type="text" class="form-control" id="formEducation" value="${data.otherInfo.education}">
                            </div>

                            <div class="form-group">
                                <label for="formName">Email</label>
                                <input type="text" class="form-control" id="formEmail" value="${data.mainInfo.contacts.email}">
                            </div>

                            <div class="form-group">
                                <label for="formName">Telegram</label>
                                <input type="text" class="form-control" id="formTelegram" value="${data.mainInfo.contacts.telegram}">
                            </div>

                            <div class="form-group">
                                <label for="formName">Skype</label>
                                <input type="text" class="form-control" id="formSkype" value="${data.mainInfo.contacts.skype}">
                            </div>

                            <div class="form-group">
                                <label for="formName">Languages</label>
                                ${this.languagesEditTemplate(data.otherInfo.languages)}
                            </div>

                            <div class="form-group form-control">
                                <label for="formTags">Interests:</label>
                                <div id = "selectedInterests">
                                ${this.tagsEditTemplate(data.otherInfo.interests, 'remove')}
                                </div>
                                <label for="formTags">Add new tag:</label>
                                <input type="text" class="form-control" id="formTags" value="" autocomplete="off">
                                <div id ="tags" class="nav nav-pills nav-stacked flex-column"></div>
                                <small>At least 2 characters</small>
                           </div>
                        </div>
                    </div>
                    <div class="dp">
                        <div class="axx fs">
                        <button type="submit" item-id="3" class="oh axy sendEditedData"><span class="h bar"></span> Save</button>
                        <button type="button" class="oh axy" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="error"></div>
        </div>
      </div>`
    }
    showEditForm(data){
        $('#'+this.modal.id).modal('show');
        this.modalContent.innerHTML = data;
        this.inputTags = document.querySelector('#'+this.modal.id+' '+ '#formTags');
        this.tags = document.querySelector('#'+this.modal.id+' '+ '#tags');
        this.selectedTags = document.querySelector('#'+this.modal.id+' #'+ this.selectedTagsId);
        this.inputAvatar = document.querySelector('#avatarFile');
        let birthdayInput = document.querySelector(`${this.modalSelector}  #formBirthday`);
        let age = document.querySelector(`${this.modalSelector}  label[for='formBirthday'] span`);
        this.initDatePicker(birthdayInput, age);
    }

    showAlertMsg(text, action){
        let icon = '';
        (action == 'success') ? (icon = '<span class="h bar"></span>') : (icon = '<span class="h bga"></span>'); 
        this.alertBlock.innerHTML = icon +' '+ text;
        this.utils.showView([this.alertBlock]);
        setTimeout(() => this.utils.hideView([this.alertBlock]) ,2500)
    }

    infoAlert(text){
        this.showAlertMsg(text, 'info')
    }

    hideEditUserForm(){
        $('#'+this.modal.id).modal('hide');
        this.showAlertMsg('User info is updated!', 'success')
     }

    initDatePicker(birthdayInput, age){
        $(birthdayInput).daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
            minYear: 1920,
            maxYear: parseInt(moment().format('YYYY'),10),
            locale:{
                format: 'DD MMM, YYYY'
            }
          }, function(start, end, label) {
            let years = moment().diff(start, 'years');
            age.innerHTML = years
          });
    }

    showTags(data){
        data.length ? this.tags.innerHTML = this.tagsEditTemplate(data, 'add') : this.tags.innerHTML = 'tag not found!'

    }

    removeTag(e){
        e.target.remove();
    }

    addTag(e){
        e.preventDefault();
        let newTag = e.target.cloneNode(true);
        newTag.classList.remove(this.addTagBtnClass)
        newTag.classList.add(this.removeTagBtnClass)
        this.selectedTags.appendChild(newTag);
    }

    getFormTagsData(){
        let data = [];
        let tags = document.querySelectorAll(`${this.modalSelector} #${this.selectedTagsId} .${this.tagItemClass}`);
        tags.forEach((element, index) => {
            let img = document.querySelector('#'+element.id+ ' img').getAttribute('src');
            let title = document.querySelector('#'+element.id+ ' span.title').textContent;
            let id = document.querySelector('#'+element.id).getAttribute('tagId');
            data.push({
               tagId : id,
               ico : img,
               title : title
            })
        });
        return data;
    }

    showUploadedAvatar(path){
        let uploadBtn  = document.querySelector(`${this.modalSelector}  .${this.uploadAvatarBtnClass}`);
        let avatarPreview = document.querySelector(`${this.modalSelector} .${this.avatarPreviewClass}`);
        if(path){
            let img = `<img src = "${path}" width = 110>`;
            avatarPreview.innerHTML = img;
            uploadBtn.innerHTML = 'Uploaded'
        }
    }

    getFormData(){
        let firstname = document.querySelector(`${this.modalSelector}  #formName`).value;
        let lastname = document.querySelector(`${this.modalSelector}  #formLastName`).value;
        let avatarImg = document.querySelector(`${this.modalSelector}  .${this.avatarPreviewClass} img`);
        let avatar = avatarImg.getAttribute('src');
        let status = document.querySelector(`${this.modalSelector}  #formStatus`).value;
        let job = document.querySelector(`${this.modalSelector}  #formJob`).value;
        let city = document.querySelector(`${this.modalSelector}  #formCity`).value;
        let gender = document.querySelector(`${this.modalSelector}  #formGender`).value
        let birthday = document.querySelector(`${this.modalSelector}  #formBirthday`).value;
        let education = document.querySelector(`${this.modalSelector}  #formEducation`).value;
        let telegram = document.querySelector(`${this.modalSelector}  #formTelegram`).value;
        let skype = document.querySelector(`${this.modalSelector}  #formSkype`).value;
        let email = document.querySelector(`${this.modalSelector}  #formEmail`).value;
        let languages = {
            'uk' : document.querySelector(`${this.modalSelector}  #input-Uk`).checked,
            'en' : document.querySelector(`${this.modalSelector}  #input-En`).checked,
            'ru' : document.querySelector(`${this.modalSelector}  #input-Ru`).checked
        }
        
        return {
            firstname : firstname,
            lastname : lastname,
            avatar : avatar,
            status : status,
            job : job,
            city : city,
            gender : gender,
            education : education,
            birthday : Date.parse(birthday),
            skype : skype,
            telegram : telegram,
            email : email,
            languages : languages
        }
    }
}