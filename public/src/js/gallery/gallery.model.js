export default class GalleryModel{
        constructor(){
            this.url = 'http://localhost:3000/gallery/'
            this.uploadUrl = '/upload';
        }
        sendRequest(url, options){
            return fetch(url, options && options).then(responce => responce.json())	
        };

        getNewItemOptions(name, url, description){
            let body = {
                "url": url,
                "name": name,
                "description": description,
                "date": Date.now()
            }
            
            let options =  {
                method : 'post',
                headers: {
                    'Content-type': 'application/json; charset=utf-8'
                },
                body : JSON.stringify(body)
            }
            return options;
        };

        getRemoveItemOptions(){
            let options =  {
                method : 'delete',
                headers: {
                    'Content-type': 'application/json; charset=utf-8'
                }
            };
            return options;
        };

        getEditedItemOptions(name, url, description){
            let body = {
                "url": url,
                "name": name,
                "description": description,
                'date': Date.now()
            };
            let options =  {
                method : 'put',
                headers: {
                    'Content-type': 'application/json; charset= utf-8'
                },
                body : JSON.stringify(body)
            };
            return options;
        };

        saveSortingMethod(value){
            localStorage.setItem('storageMethod', value);
        }
        getSavedSortingMethod(){
            return localStorage.getItem('storageMethod');
        }

        uploadImage(data){
            return fetch(this.uploadUrl, {
                method: 'POST',
                body: data
            }).then(response => response.json())
        }
    }