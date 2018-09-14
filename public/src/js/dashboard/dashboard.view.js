export default class DashboardView{
    constructor(utils){
        this.utils = utils;
        this.wrapper = document.querySelector('#wrapper');
        this.template = document.querySelector('#dashboard');
        this.userMenu = document.querySelector('#userMenu');
        this.templateString = ``;
    }

    init(){
       this.utils.showView([this.userMenu])
       this.initDOMElements();
    }
    initDOMElements(){
        this.modal = document.querySelector('#modal-dashboard');
        this.modalContentSelector = '.modal-content .modal-inner';
        this.modalContent = document.querySelector('#'+this.modal.id+' '+ this.modalContentSelector);
        this.postGroup = document.querySelector('#postGroup');
        this.postInput = document.querySelector('#postGroup input[type="text"]');
        this.sendPostBtn = document.querySelector('#'+this.postGroup.id + ' button.sendPost');
        this.fileGroup = document.querySelector('#fileGroup');
        this.showFileGroupBtnClass = 'showFileGroup';
        this.inputImage = document.querySelector('#'+this.postGroup.id + ' #postFile');
        this.uploadImageBtn = document.querySelector('#'+this.postGroup.id + ' button.uploadImage');
        this.uploadImageEditBtnClass = 'uploadImage-edit';
        this.imagePreview = document.querySelector('#'+this.postGroup.id + ' .imagePreview');
        this.editPostBtnClass = 'editPost';
        this.removePostBtnClass = 'removePost';
        this.postsSelector = document.querySelector('#posts')
        this.sendEditedPostBtnClass = 'sendEditedPost';
        this.alertBlock = document.querySelector('.alert-fixed');
    }

    makeTemplate(data){
        //this.template.innerHTML = this.template.innerHTML
        this.templateString =  this.template.innerHTML
                    .replace('{name}', `${data.name}  ${data.lastname}`)
                    .replace('{avatar}', data.avatar)
                    .replace('{wallpaper}', data.wallpaper)
                    .replace('{friends}', data.friends)
                    .replace('{status}', this.utils.modifyStatus(data.status))
                    .replace('{city}', data.city)
                    .replace('{job}', data.job)
                    .replace('{photos}', data.photos)
                    .replace('{posts}', data.posts);

    }

    postsTemplate(posts, currentUser){
        let postsTemp = '';
        for(let i = 0; i< posts.length; i++ ){
            let img = '';
            let edit = '',
                remove = '';
            if(posts[i].image){
               img = '<img class="max-h-300" data-action="zoom" src="'+ posts[i].image+'">'
            }
            if(currentUser == posts[i].autorId){
                edit = `<button class="editPost cg nz ok" postId= "${posts[i].id}">Edit</button>`;
                remove = `<button class="removePost cg nz ok" postId= "${posts[i].id}">Remove</button>`;
            }
            postsTemp += `
        <li class="rv b agz">
            <img class="bos vb yb aff" src="${posts[i].autorAvatar}">
            <div class="rw">
                <div class="bpb">
                    <small class="acx axc">${this.utils.modifyDateandTime(posts[i].date)}</small>
                    <h6>${posts[i].autorName}</h6>  
                </div>
                <p>${posts[i].text}</p>
                <p>${img}</p>
                ${edit} ${remove}
        </div>
      </li>`
        }
        return postsTemp;
    }

    photosTemplate(photos){
        let photosTemp = '';
        for(let i = 0; i<2; i++ ){
            photosTemp += `
            <div class="fm">
                <small>${photos[i].name}</small>
                <img src = ${photos[i].url} data-width="640" data-height="640" data-action="zoom">
            </div>
            `;
        }
        return photosTemp;
    }

    showUploadedImage(path, action){
        let img = `<img src = "${path}" width = 110>`;
        if(action == 'add'){
            this.imagePreview.innerHTML = img;
            this.uploadImageBtn.innerHTML = 'Uploaded'
        } else if(action == 'edit'){
            this.imageEditPreview.innerHTML = img;
            this.uploadImageEditBtn.innerHTML = 'Uploaded'
        }     
    }


    editPostTemplate(data){
        let img = ``;
        if(data.image){
            img = `<img width="300" src = "${data.image}"`
         }
        return `<h5 class="modal-title">Edit my post by ${this.utils.modifyDateandTime(data.date)}</h5>
        <form>
            <div class="form-group">
                <label for="formImage">Image</label><br>
                <input class="file-input cg nz ok afh" type="file" name="imagePostFile" id="imagePostFile">
                <button class="cg axu nq afh uploadImage-edit">Upload</button>
                <div class="imagePreview">
                    ${img}
                </div>
            </div>
            <div class="form-group">
                <label for="formDescription">Message</label>
                <input type="text" class="form-control postTextInput" placeholder="Message" value ="${data.text}">            
            </div>

            <div class="axx">
            <button type="submit" item-id="12" class="oh axy sendEditedPost"><span class="h bar"></span> Save</button>
            <button type="button" class="oh axy" data-dismiss="modal">Cancel</button>
            </div>
        </form>`
    };

    showEditPostForm(data){
        this.modalContent.innerHTML = this.editPostTemplate(data);
        $('#'+this.modal.id).modal('show');
        this.imageEditPreview = document.querySelector('#'+this.modal.id+' .imagePreview');
        this.uploadImageEditBtn = document.querySelector('#'+this.modal.id+' .uploadImage-edit');
        this.inputImageEdit = document.querySelector('#'+this.modal.id + ' #imagePostFile');
        this.postText = document.querySelector('#'+this.modal.id + ' .postTextInput');
        
    }


    successAddAlert(){
        this.showAlertMsg('Post has been added!', 'success')
    }

    successRemoveAlert(){
        this.showAlertMsg('Post is deleted!', 'success')
    }

    infoAlert(text){
        this.showAlertMsg(text, 'info')
    }

    hideEditPostForm(){
       $('#'+this.modal.id).modal('hide');
       this.showAlertMsg('Post updated!', 'success')
    }

    showAlertMsg(text, action){
        let icon = '';
        (action == 'success') ? (icon = '<span class="h bar"></span>') : (icon = '<span class="h bga"></span>'); 
        this.alertBlock.innerHTML = icon +' '+ text;
        this.utils.showView([this.alertBlock]);
        setTimeout(() => this.utils.hideView([this.alertBlock]) ,2500)
    }
}