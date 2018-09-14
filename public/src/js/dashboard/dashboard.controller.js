export default class DashboardController{
    constructor(model, view, utils, validator){
        this.model = model;
        this.view = view;
        this.utils = utils;
        this.validator = validator;
        this.template = this.view.template.innerHTML;
        this.user = null;
        this.postInfo = {
            image: null,
            id:null
        }
    } 
    
    async getAllData(){
        await this.model.requestUserInfo(this.user);
        await this.model.requestPosts();
        await this.model.requestPhoto();
        await this.makeUserDataTemplate();
    }

    makeUserDataTemplate(){
        this.photoTemp = this.view.photosTemplate(this.model.photo);
        let photoTemp = this.view.photosTemplate(this.model.photo);
        let postsTemp = this.view.postsTemplate(this.model.sortPosts(), this.user);
        this.postTemp = this.view.postsTemplate(this.model.sortPosts(), this.user);
        this.view.makeTemplate(this.model.makeUserData(photoTemp, postsTemp));
    }

    initListeners(){
        this.view.sendPostBtn.addEventListener('click', this.sendPost.bind(this));
        this.view.postGroup.addEventListener('keypress', this.sendPost.bind(this));
        this.view.postGroup.addEventListener('click', this.postImageHandler.bind(this));
        this.view.modal.addEventListener('click', this.postImageHandler.bind(this));
        this.view.modal.addEventListener('click', this.sendPostHandler.bind(this));
        this.view.postInput.addEventListener('focus', this.postInputHandler.bind(this));
        this.view.postsSelector.addEventListener('click', this.postsEditHandler.bind(this));
    }

    uploadImageFile(e, action){
        e.preventDefault();
        let file = null;
        (action == 'add') &&  (file = this.view.inputImage.files[0]);
        (action == 'edit') &&  (file = this.view.inputImageEdit.files[0]);
        if (file) {
            this.upload(file, action);
        }
    }

    upload(file, action) {
        let data = new FormData();
        data.append('myFile', file);

        this.model.uploadImage(data).then(path => {
                this.view.showUploadedImage(path, action);
                this.postInfo.image = path;
        })
    }

    postImageHandler(e){
        if(e.target == this.view.uploadImageBtn){
            e.preventDefault();
            this.uploadImageFile(e, 'add');
        } else if(e.target.classList.contains(this.view.uploadImageEditBtnClass)){
            e.preventDefault();
            this.uploadImageFile(e, 'edit');
        }
    }

    sendPostHandler(e){
        if(e.target.classList.contains(this.view.sendEditedPostBtnClass)){
            e.preventDefault();
            this.sendEditedPost();
        }
    }

    postInputHandler(e){
        e.type == 'focus' && this.utils.showView([this.view.fileGroup]);
        e.type == 'blur' && this.utils.hideView([this.view.fileGroup]);
        
    }

    sendPost(e){
        if((e.type=='click') || (e.keyCode==13)){
            let text = this.view.postInput.value;
            let image = null;
            this.view.inputImage.files[0] && (image = this.postInfo.image);
            if(this.validator.isValidPost(text)){
                this.model.addPost({
                    text : text,
                    image: image
                }).then(data => {  
                    this.postInfo.image = null;
                    this.updateState();
                    this.view.successAddAlert();
                });
            } else {
                this.view.infoAlert(this.validator.getAlertMsg());
            }
        }
    }

    postsEditHandler(e){
        if(e.target.classList.contains(this.view.editPostBtnClass)){
            this.editPost(e);
        } else if(e.target.classList.contains(this.view.removePostBtnClass)){
            this.removePost(e);
        }
    }

    editPost(e){
        this.postInfo.id = e.target.getAttribute('postId');
        this.model.getPost(this.postInfo.id).then(data => {
            this.postInfo.image = this.model.post.image
            this.view.showEditPostForm(this.model.post);
        });
    }

    sendEditedPost(){
        this.model.editPost(this.postInfo.id, {
                postId : this.postInfo.id,
                image : this.postInfo.image,
                text : this.view.postText.value
        }).then(data => {
            this.postInfo.image = null;
            this.view.hideEditPostForm();
            this.updateState();
        })
    }

    removePost(e){
        this.model.removePost(e.target.getAttribute('postId')).then(data =>{
            this.updateState();
            this.view.successRemoveAlert();
        });
    }

    hideModal(){
        this.postInfo.image = null;
        console.log('hide')
    }

    updateState(){
        this.getAllData().then((response => {
        // this.utils.initTemplate(this.view.wrapper, 'dashboard');
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