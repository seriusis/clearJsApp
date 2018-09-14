export class LiteGalleryController{
        constructor(view, model, utils){
    
            this.model = model;
            this.view = view;
            this.utils = utils;
            this.status = null;
            this.resultHTML = '';
            this.version = 'lite';
        }
    
        init(){
            this.prepareGalleryData();
    
            if(!this.status){
                this.initListeners();
                this.status = true;
            }
            this.view.init();
        };
    
        initListeners (){
            this.view.dropdownName0.addEventListener('click', this.updateSortingMethod.bind(this));
            this.view.dropdownName1.addEventListener('click', this.updateSortingMethod.bind(this));
            this.view.dropdownDate0.addEventListener('click', this.updateSortingMethod.bind(this));
            this.view.dropdownDate1.addEventListener('click', this.updateSortingMethod.bind(this));
            this.view.gallery.addEventListener('click', this.checkListener.bind(this));
        };
    
        checkListener(e){
            switch(this.view.checkBtnClass(e)){
                case 'remove' : this.removeItem(e);
                break;
                case 'show' : this.showDetailedItem(e);
                break;
                case 'edit' : this.showEditItemForm(e);
            }
        };
    
        getSortingMethod(param){
            let method = null;
            switch(param){
                case '0': method = this.utils.sortNameASK
                break;
                case '1': method = this.utils.sortNameDESC
                break;
                case '2': method = this.utils.sortDateASK
                break;
                case '3': method = this.utils.sortDateDESC
                break;
                default: method = this.utils.sortDateASK
            }
            return method;
        };
    
         sortItems(array, param){array.sort(param)};
    
        updateSortingMethod(e){
            e.preventDefault();
            let attr = this.view.getSortingAttr(e)
            this.sortItems(this.galleryData, this.getSortingMethod(attr));
            this.model.saveSortingMethod(attr);
            this.printData();
        };
    
        defaultSorting (array){
            let storageMethod = this.model.getSavedSortingMethod();
            if(storageMethod){
                this.sortItems(array, this.getSortingMethod(storageMethod));
            } else {
                this.sortItems(array, this.getSortingMethod(0));
            }
        };
        
        prepareGalleryData(){
            this.model.sendRequest(this.model.url).then(cars => {
                if((typeof(cars) == 'object') && (cars[0])){
                    this.galleryData = cars;
                    this.defaultSorting(this.galleryData);
                    this.printData();
                }
            });
        };
    
        printData(){
            this.resultHTML = '';
            for(let i = 0; i < this.galleryData.length; i++){
                this.resultHTML += this.view.getItemTemplate(this.galleryData[i], this.version);
            }
            this.view.printHtml(this.resultHTML);
        };
    
        showDetailedItem(e){
            this.view.showDetailedModal(this.view.getDetailedItemTemplate(this.view.getItemUrlAttr(e)));
        }
    }
    
    export class ProGalleryController extends LiteGalleryController{
        constructor(view, model, utils, validator){
            super();
            this.model = model;
            this.view = view;
            this.utils = utils;
            this.validator = validator; 
            this.version = 'pro';
        };
    
        init(){
        
            this.prepareGalleryData();
            this.view.init();
            if(!this.status){
                this.initListeners();
                this.status = true;
            };
        };
    
        initListeners(){
            //super.initListeners.apply(this); //наследуем события родителя
            super.initListeners();
            /*this.view.add.addEventListener('click', this.showNewItemForm.bind(this));
            this.view.modal.addEventListener('click', this.checkItemAction.bind(this));*/
        };
        
        sendRequestAndUpdate(url, options){
            this.model.sendRequest(url, options).then(data => {
                this.prepareGalleryData();
            });
        }
    
        checkItemAction(e){
            let attr = this.view.getItemAction(e);
            if(attr == 'new'){
                this.submitNewItem(e);
            } else if(attr == 'edited'){
                this.submitEditedItem(e);
            } else if(attr == 'upload'){
                this.uploadImagFile(e);
            }
        }
    
        showNewItemForm(e){
            this.view.showNewItemForm(e, this.view.showModalAdd());
        };
    
        showEditItemForm(e){
            let id = this.view.getItemId(e);
            this.model.sendRequest(this.model.url+id).then(data => {
                this.view.showEditItemForm(e, this.view.showModalEdit(data));
            });
        };
    
        submitNewItem(e){
            e.preventDefault();
            let name = this.view.getFormAddData().name;
            let url = this.view.getFormAddData().url;
            let description = this.view.getFormAddData().description;
            if(this.validator.isValidItem(name, url, description)){
                let options = this.model.getNewItemOptions(name, url, description);   
                this.sendRequestAndUpdate(this.model.url, options); //отправляем и сохраняем данные
                this.view.hideItemForm();
            } else {
                this.view.showValidatorMsg(this.validator.getAlertMsg());
            }
        }
    
        removeItem(e){
            let id = this.view.getItemId(e);
            let options = this.model.getRemoveItemOptions();
            this.sendRequestAndUpdate(this.model.url+id, options);
        };
    
        submitEditedItem(e){
            e.preventDefault();
            let id = this.view.getItemId(e);
            let name = this.view.getFormAddData().name;
            let url = this.view.getFormAddData().url;
            let description = this.view.getFormAddData().description;
            if(this.validator.isValidItem(name, url, description)){
                let options = this.model.getEditedItemOptions(name, url, description);
                this.sendRequestAndUpdate(this.model.url+id, options);
                this.view.hideItemForm();
            } else {
                this.view.showValidatorMsg(this.validator.getAlertMsg());
            }
        }


        uploadImagFile(e){
        e.preventDefault();
        let file = this.view.imageFile.files[0];
        if (file) {
            this.upload(file);
        }
    }

        upload(file) {
            let data = new FormData();
            data.append('myFile', file);

            this.model.uploadImage(data).then(path => {
                this.view.showUploadedImage(path);
            })

        }
    }

