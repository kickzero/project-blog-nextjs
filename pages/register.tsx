import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { Input } from "@/components/shared/Input";
import { Button } from "@/components/shared/Button";
import Link from "next/link";
import { useIsAuthenticated } from "@/hooks/useIsAuthenticated";
import userService from "@/services/user";
import Cookies from "js-cookie";
import { useGlobalState } from "@/state";
import { handleError } from "@/helper";

const initRegisterData = {
  nickname: {
    value: '',
    error: '',
  },
  username: {
    value: '',
    error: '',
  },
  email: {
    value: '',
    error: '',
  },
  password: {
    value: '',
    error: '',
  },
};

function RegisterPage() {
  // useIsAuthenticated();

  const [loading, setLoading] = useState(false);
// const [formError, setFormError] = useState("");
  const [registerData, setRegisterData] = useState(initRegisterData);
// const [formData, setFormData] = useState({
//   nickname: "",
//   username: "",
//   email: "",
//   password: "",
// });
  const [, setToken] = useGlobalState("token");
  const [, setCurrentUser] = useGlobalState("currentUser");

  const isValidate = useMemo((): boolean => {
    for (const [key, value] of Object.entries(registerData)) {
      const error = value.error;
      // console.log("error", error, "H20")
      if(error !== '') return false;
    }
    
  //   Object.entries(registerData).forEach(
  //     ([key, value]) => console.log(key, value)
  // );
    // for(let key in registerData) {
    //   const error = registerData[key];
    //   if(error !== '') return false;
    // }
    return true;
  }, [registerData]);

  const onChangeData = (key: string) => (event: any) => {
    const value = event.target.value;
    const password = registerData.password.value;
    const error = handleError(key, value, password);

    setRegisterData({
      ...registerData,
      [key]: {
        value,
        error,
      },
    });
  }
  // console.log("registerData", registerData)

  const handleRegister = (e: any) => {
    e.preventDefault();
    
    if (loading === true) return;
   

    const email = registerData.email.value;
    const nickname = registerData.nickname.value;
    const username = registerData.username.value;
    const password = registerData.password.value;
  
    const data = {
      email,
      nickname,
      username,
      password,
    };

    if (!isValidate) {
      alert("Du lieu nhap vao khong hop le!");
      return;
    }
    
    setLoading(true);
    userService
      .register(data)
      .then((res) => { 
        console.log("res", res)
        // if (res.status === 201) {
        //   setToken(res.data.token);
        //   setCurrentUser(res.data.user);
        //   Cookies.set("tokena", res.data.token, { expires: 30 * 12 });
        //   console.log("success", res.data.token)
        // } else {
        //   alert(res.data.error);
        //   console.log("error", res.status)
        // }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <main className="login">
      <div className="spacing" />
      <div className="tcl-container">
        <div className="tcl-row">
          <div className="tcl-col-12 tcl-col-sm-6 block-center">
            <h1 className="form-title text-center">Đăng ký</h1>
            <div className="form-login-register">
              {/* {formError && (
                <p style={{ color: "red", textAlign: "center" }}>{formError}</p>
              )} */}
              <form action="#" autoComplete="off" onSubmit={handleRegister}>
                <Input
                  label="Nickname"
                  name="nickname"
                  placeholder="Nhập Nickname"
                  value={registerData.nickname.value}
                  autoComplete="off"
                  onChange={onChangeData('nickname')}
                />
                { registerData.nickname.error && 
                                <small className="form-text text-danger">{registerData.nickname.error}</small> }
                <Input
                  label="Tên đăng nhập"
                  name="username"
                  placeholder="Nhập tên đăng nhập ..."
                  value={registerData.username.value}
                  autoComplete="off"
                  onChange={onChangeData('username')}
                />
                { registerData.username.error && 
                                <small className="form-text text-danger">{registerData.username.error}</small> }
                <Input
                  label="Email"
                  name="email"
                  placeholder="Nhập email ..."
                  value={registerData.email.value}
                  autoComplete="off"
                  onChange={onChangeData('email')}
                />
                { registerData.email.error && 
                                <small className="form-text text-danger">{registerData.email.error}</small> }
                <Input
                  name="password"
                  type="password"
                  label="Mật khẩu"
                  placeholder="Nhập mật khẩu của bạn ..."
                  value={registerData.password.value}
                  autoComplete="new-password"
                  onChange={onChangeData('password')}
                />
                { registerData.password.error && 
                                <small className="form-text text-danger">{registerData.password.error}</small> }
                <div className="d-flex tcl-jc-between tcl-ais-center">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={loading}
                  >
                    Đăng ký
                  </Button>
                  <Link href="/login">Bạn đã có tài khoản?</Link>
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

export default RegisterPage;
