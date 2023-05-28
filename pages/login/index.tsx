
import {Button} from '../../components/shared/Button';
import {Input} from '../../components/shared/Input';
import styles from './login.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useGlobalState } from '@/state';
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated';
export const ATC_UPDATE_PROFILE = 'ATC_LOGIN';

type FormLogin = {
  username: string;
  password: string;
}

const initFormData: FormLogin = {
  username: '',
  password: ''
}

const LoginPage = () =>  {
  useIsAuthenticated();
  const router = useRouter();
  const [formData, setFormData] = useState(initFormData);
  const [loading, setLoading] = useState(false);

  function onChange(evt: any){
    const value = evt.target.value;
    const name = evt.target.name;
    setFormData({
      ...formData,
      [name]: value
    })
    // console.log(currentUser);
  }

  function handleSubmit(evt: any){
    evt.preventDefault();
    setLoading(true);
    if(loading === true) return;

    const body = JSON.stringify(formData);
    const method = "POST";

    fetch('/api/login', {
      body,
      method,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => {
      router.push('/');
      console.log("data", data)
    })

    // try{
    //   const response = await userService.login(formData);
    //   const data = response.data;
    //   setCurrentUser(data);
    //   console.log("data", data);
    //   router.push('/');
    //   return {
    //     ok: true,
    //   }
    // // if (ok) {
    // //       router.push('/');
    // //     } else {
    // //     }
    // } catch (e){
    //   alert("Dang nhap that bai")
    //   return {
    //     ok: false,
    //     message: 'Thông tin đăng nhập không chính xác!',
    //   }
    // }
    
  }

  return (
    <main className="login">
      <div className="spacing" />
      <div className="tcl-container">
        <div className="tcl-row">
          <div className="tcl-col-12 tcl-col-sm-6 block-center">
            <h1 className={`${styles["form-title"]} text-center`}>Đăng nhập</h1>
            <div className={styles["form-login-register"]}>
              <form autoComplete="off" onSubmit={handleSubmit}>
                <Input name="username" onChange={onChange} value={formData.username}  label="Tên đăng nhập" placeholder="Nhập tên đăng nhập ..." />
                <Input
                  name="password"
                  onChange={onChange}
                  value={formData.password}
                  type="password"
                  label="Mật khẩu"
                  placeholder="Nhập mật khẩu của bạn ..."
                  autoComplete="new-password"
                />

                <div className="d-flex tcl-jc-between tcl-ais-center">
                  <Button htmlType="submit" type="primary" size="large" loading={loading}> 
                    Đăng nhập
                  </Button>
    
                  <Link href="/register">Đăng ký</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="spacing" />
    </main>
  );
}

export default LoginPage;

