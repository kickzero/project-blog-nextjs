import API from './api';

const userService = {
  login({ username, password }:any) {
    return API.call().post('/jwt-auth/v1/token', {
      username,
      password
    });
  },
  register({ username, password, email, nickname }:any) {
    return API.call().post('/wp/v2/users/register', {
      username,
      password,
      email,
      nickname
    });
  },
  changePassword({ password, new_password, confirm_new_password }:any) {
    return API.callWithToken().put('/wp/v2/users/password', {
      password,
      new_password,
      confirm_new_password
    });
  },
  updateProfile( {description , mediaId} :any) {
    return API.callWithToken().put('/wp/v2/users/me', {
      description,
      simple_local_avatar: {
        media_id: mediaId
      },
    });
  },
  uploadMedia({file} : any) {
    return API.callWithToken().post('/wp/v2/media', file);
  },
  fetchMe({token} : any){
    return API.callWithToken(token).get('/wp/v2/users/med');
  },
};

export default userService;