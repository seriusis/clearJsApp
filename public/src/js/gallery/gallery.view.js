export class LiteGalleryView{
        constructor(utils){
            this.utils = utils;
            this.gallery = document.querySelector('#gallery'),
            this.dropdownName0 = document.querySelector('#dropdown-name a.dropdown-item[sorting-type="0"]');
            this.dropdownName1 = document.querySelector('#dropdown-name a.dropdown-item[sorting-type="1"]');
            this.dropdownDate0 = document.querySelector('#dropdown-date a.dropdown-item[sorting-type="2"]');
            this.dropdownDate1 = document.querySelector('#dropdown-date a.dropdown-item[sorting-type="3"]');
            this.modal = document.querySelector('#modal');
            this.modalContent = document.querySelector('#'+this.modal.id+' .modal-content .modal-inner');
            this.errorDiv = document.querySelector('#'+this.modal.id+' .error');
            this.galleryData = [];
            this.userMenu = document.querySelector('#userMenu');
        }

        init(){
            this.utils.showView([this.userMenu]);
        }

        checkBtnClass(e){
            e.preventDefault();
            if(e.target.classList.contains('remove')){
                return 'remove';
            } else if(e.target.classList.contains('view')){
                return 'show';
            } else if(e.target.classList.contains('edit')){
                return 'edit';
            }
        }

        getSortingAttr(e){
            return e.target.getAttribute('sorting-type');
        }

        getItemUrlAttr(e){
           return  e.target.getAttribute('item-url');
        }

        printHtml(data){
            this.gallery.innerHTML = data;
        }

        showDetailedModal(data){
            this.modalContent.innerHTML = data;
            $(this.modal).modal();
        }
    }
    
export  class ProGalleryView extends LiteGalleryView{
        constructor(utils){
            super();
            this.utils = utils;
            this.add = document.querySelector('#next-page');
            this.galleryStats = document.querySelector('.gallery-stats');
            this.visibleCount = document.querySelector('#visibleCount');
            this.availableCount = document.querySelector('#availableCount');
        }
        init(){
            this.add.classList.remove('hide');
            this.utils.showView([this.userMenu]);
        }


        getFormAddData(){
            
            let name = document.querySelector('#'+this.modal.id+' #formName').value;
            let imageTag = document.querySelector('#'+this.modal.id+' .imagePreview img');
            let image = '';
            if(imageTag){
                image = imageTag.getAttribute('src');
             } else {
                 image = '';
             }
            
            console.log(image)
            let description = document.querySelector('#'+this.modal.id+'  form #formDescription').value;
            return {
                name:name,
                url:image,
                description:description
            }
        }
        
        getItemAction(e){
            if(e.target.classList.contains('sendNewItem')){
                return 'new';
            } else if(e.target.classList.contains('sendEditedItem')) {
                return 'edited';
            } else if(e.target.classList.contains('uploadImage')){
                return 'upload';
            }
        }

        getItemId(e){
            return e.target.getAttribute('item-id');
        }

        showNewItemForm(e, data){
            e.preventDefault();
            this.modalContent.innerHTML = data;
            $(this.modal).modal();	
            this.defineUploadDOM();
        }

        hideItemForm(){
            $(this.modal).modal('hide');
        }

        showEditItemForm(e, data){
            e.preventDefault();
            $(this.modal).modal();
            this.modalContent.innerHTML = data;
            this.defineUploadDOM();
        }

        showValidatorMsg(data){
            this.errorDiv.innerHTML = data;
        }


        getItemTemplate(item, view){
            return `<div class="col-md-4 ev b">
            <div class="card mb-4 box-shadow">
                <img data-action="zoom"  src="${item.url}" alt="${this.utils.modifyName(item.name)}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${this.utils.modifyName(item.name)}</h5>
                    <small class="text-muted">${moment(item.date).format('YYYY/MM/DD HH:mm')}</small>
                    <p class="card-text">${this.utils.modifyDescription(item.description)}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <a href="#" item-id = '${item.id}' class="cg axu nq edit ${view == 'lite' ? 'hide' : ''}">Edit photo</a>
                            <a href="#" item-id = '${item.id}' class="cg axu ns remove ${view == 'lite' ? 'hide' : ''}">x</a>
                        </div>
                    </div>
                 </div>
            </div>
        </div>`;
        };
    
            
        getDetailedItemTemplate(item){
            return `<img src = "${item}" class="big-img">`
        };

        defineUploadDOM(){   
            this.imageFile  = document.querySelector('#imageFile');
            this.imagePreview = document.querySelector('.imagePreview');
            this.uploadBtn = document.querySelector('.uploadImage');
        }
        showUploadedImage(path){
            
            if(path){
                let img = `<img src = "${path}" width = 110>`;
                this.imagePreview.innerHTML = img;
                this.uploadBtn.innerHTML = 'Uploaded'
            }
        }
    
    
        showModalAdd(){
            return `<h5 class="modal-title">Add photo to gallery</h5>
                    <form>
                        <div class="form-group">
                            <label for="formName">Title</label>
                            <input type="text" class="form-control" id="formName">
                        </div>
                        <div class="form-group">
                            <label for="formUrl">Photo</label><br>
                            <input class="file-input cg nz ok afh" type="file" name="imageFile" id="imageFile">
                            <button class="cg axu nq afh uploadImage">Upload</button>
                            <div class="imagePreview afh">          
                            </div>
                        </div> 
                        <div class="form-group">
                            <label for="formDescription">Description</label>
                            <textarea class="form-control" id="formDescription" rows="3"></textarea>
                        </div>
                        <div class="axx">
                            <button type="submit" class="oh axy sendNewItem"><span class="h bbi"></span> Create</button>
                            <button type="button" class="oh axy" data-dismiss="modal">Cancel</button>
                        </div>
                     </form>
                </div>`;
        }
    
        showModalEdit(item){
            return `<h5 class="modal-title">Edit photo - '${this.utils.modifyName(item.name)}'</h5>
                    <form>
                        <div class="form-group">
                            <label for="formName">Title</label>
                            <input type="text" class="form-control" id="formName" value="${this.utils.modifyName(item.name)}">
                        </div>
                        <div class="form-group">
                            <label for="formUrl">Photo</label><br>
                            <input class="file-input cg nz ok afh" type="file" name="imageFile" id="imageFile">
                            <button class="cg axu nq afh uploadImage">Upload</button>
                            <div class="imagePreview afh">
                            <img src = "${item.url}" width = 110>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="formDescription">Description</label>
                            <textarea class="form-control" id="formDescription" rows="3">${this.utils.modifyDescription(item.description)}</textarea>
                        </div>

                        <div class="axx">
                        <button type="submit" item-id='${item.id}' class="oh axy sendEditedItem"><span class="h bar"></span> Save</button>
                        <button type="button" class="oh axy" data-dismiss="modal">Cancel</button>
                        </div>
                     </form>
                </div>`;
        }
        
    }
