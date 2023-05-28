import API from './api';

const menuService = {
  getAll(inputParam: any) {
    return API.call().get('/menus/v1/menus/main-menu-vi', {
      params: {
        ...inputParam,
      },
    });
  },
 
};

export default menuService;