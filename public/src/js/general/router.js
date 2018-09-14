import Utils from '../general/utils.js';
import Validator from '../general/validator.js';
import GeneralModel from '../general/general.model.js';
import UserLogged from '../general/userLogged.js';

import DashboardController from '../dashboard/dashboard.controller.js';
import DashboardView from '../dashboard/dashboard.view.js';

import LoginController from '../login/login.controller.js';
import LoginView from '../login/login.view.js';

import ProfileController from '../profile/profile.controller.js';
import ProfileView from '../profile/profile.view.js';

import GalleryModel from '../gallery/gallery.model.js';
import { ProGalleryController as GalleryController } from '../gallery/gallery.controller.js';
import { ProGalleryView as GalleryView} from '../gallery/gallery.view.js';

let userLogged = new UserLogged();
let wrapper = document.querySelector('#wrapper');


let routeConfig = {
    "" : {
        init : () => {
            let model = new GeneralModel(Utils);
            let view = new DashboardView(Utils);
            let validator = new Validator;
            let controller = new DashboardController(model, view, Utils, validator);
            controller.init();
        },
        initied : false
    },

    "profile" : {
        init : () => {
            let model = new GeneralModel(Utils);
            let view = new ProfileView(Utils);
            let validator = new Validator;
            let controller = new ProfileController(model, view, Utils, validator);
            controller.init();
        },
        initied : false
    },

    "login" : {
        init : () => {
            Utils.initTemplate(wrapper, 'login');
            let model = new GeneralModel(Utils);
            let view = new LoginView(Utils);
            let validator = new Validator;
            let controller = new LoginController(model, view, Utils, validator, userLogged);
            controller.init();
        },
        initied : false
    },

    "logout" : {
        init : () => {
            Utils.initTemplate(wrapper, 'login');
            let model = new GeneralModel(Utils);
            let view = new LoginView(Utils);
            let validator = new Validator;
            let controller = new LoginController(model, view, Utils, validator, userLogged);
            controller.logout();
        },
        initied : false
    },
    "gallery" : {
        init : () => {
            Utils.initTemplate(wrapper, 'gallery-box');
            let model = new GalleryModel;
            let view = new GalleryView(Utils);
            let validator = new Validator;
            let controller = new GalleryController(view, model, Utils, validator);
            controller.init()
        },
        initied : false
    }
};

export default function updateRoute(){
    let route = document.location.hash.replace('#', '');
        if(userLogged.isLogged()){
            if(routeConfig[route]){
                routeConfig[route].init();
                routeConfig[route].initied = true;
        }
    } else {
        routeConfig['login'].init();
        routeConfig['login'].initied = true;

    }
};