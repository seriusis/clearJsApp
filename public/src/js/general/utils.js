export default class Utils{
    constructor(){
    }

    static showView(elem){
        elem.forEach(item => {
            item.classList.remove('d-none');
        })
    }

    static hideView(elem){
        elem.forEach(function(item){
            item.classList.add('d-none');
        })
    }
    static navigateTo(routeName){
        window.location.hash = '#' + routeName;
    }
    
    static initTemplate(wrapperDiv, templateId){
        let template = document.querySelector(`#${templateId}`);
        let tempClone = template.content.cloneNode(true);
        wrapperDiv.innerHTML = '';
        wrapperDiv.appendChild(tempClone);

    }

    static updateTemplate(wrapperDiv, templateString){
        wrapperDiv.innerHTML = '';
        wrapperDiv.innerHTML = templateString;
    }
    static modifyDate(seconds){
        let date = new Date(parseInt(seconds));
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric'});
        // return moment(date).format("DD/MM/YYYY"); 
    }

    static modifyDateandTime(seconds){
        let date = new Date(parseInt(seconds));
        return date.toLocaleDateString() +' | '+ date.toLocaleTimeString()
    }

    static howTimePassed(seconds){
        let date = new Date(parseInt(seconds));
        let now = new Date;
        return now.getFullYear() - date.getFullYear();
    } 

    static checkData(data){
    return data ? data : '';
    }


    static copyArray(array, param){ 
        let newData = [];
        if(!param){
            newData = newData.concat(array.map(a => Object.assign({}, a)));
        } else {
            for(let i = 0; i < param; i++){
                newData = newData.concat(array.map(a => Object.assign({}, a)));
            }
        }
        return newData;
    }

    static toogleBlocks(blocks, action){ 
        blocks.forEach((item) => {
            item.classList.remove('hide', 'show');
            item.classList.add(action);
        })
    }

    static modifyName(value){
		return value = value[0].toUpperCase() + ((value.toLowerCase()).substr(1));
	};
	static modifyDescription(value){
		return (value.length > 15) ? (value.substr(0, 15) + '...') : value; 
    };
    
    static modifyStatus(value){
		return (value.length > 100) ? (value.substr(0, 100) + '...') : value; 
	};
	static modifyURL(value){ 
		return (value.indexOf('http://') == -1) ? (`http://${value}`) : value; 
	};


    static sortDateASK(a, b){ 
		return a.date < b.date ? 1 : -1; 
	}
    static sortDateDESC(a, b){ 
		return a.date > b.date ? 1 : -1; 
	}
	static sortNameASK(a, b){ 
		return a.name > b.name ? 1 : -1; 
	}
	static sortNameDESC(a, b){ 
		return a.name < b.name ? 1 : -1; 
    }

}