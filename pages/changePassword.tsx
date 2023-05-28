import { useState } from 'react';
import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated';
import Link from 'next/link';
import userService from '@/services/user';

const initState = {
  password: '',
  new_password: '',
  confirm_new_password: '',
}

function ChangePasswordPage() {
  // useIsAuthenticated();

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState(initState);

  function handleChangeValue(event: any) {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    setLoading(true);
    try {
      await userService.changePassword(formData)
      .then((res) => {
        if(res.status === 200) {
          alert("Thay doi mat khau thanh cong");
          setFormData(initState);
          setLoading(false);
        } 
      })
    } catch (error) {
      alert("Thay doi mat khau that bai");
      setFormData(initState);
      setLoading(false);
      console.log(error);
    }
    
   
    // dispatch(actChangePasswordAsync(formData)).then((res: any) => {
    //   if (!res.ok) {
    //     setFormError(res.message);
    //     setLoading(false);
    //     console.log(res.message)
    //   }
    // });
  }

  return (
    <main className="login">
      <div className="spacing" />
      <div className="tcl-container">
        <div className="tcl-row">
          <div className="tcl-col-12 tcl-col-sm-6 block-center">
            <h1 className="form-title text-center">Đổi mật khẩu</h1>
            <div className="form-login-register">
              {/* {formError && <p style={{ color: 'red', textAlign: 'center' }}>{formError}</p>} */}
              <form autoComplete="off" onSubmit={handleSubmit}>
              <Input
                  name="password"
                  type="password"
                  label="Mật khẩu"
                  placeholder="Nhập mật khẩu của bạn ..."
                  value={formData.password}
                  autoComplete="new-password"
                  onChange={handleChangeValue}
                />
                <Input
                  name="new_password"
                  type="password"
                  label="Mật khẩu mới"
                  placeholder="Nhập mật khẩu mới ..."
                  value={formData.new_password}
                  autoComplete="new-password"
                  onChange={handleChangeValue}
                />
                <Input
                  name="confirm_new_password"
                  type="password"
                  label="Xác nhận mật khẩu"
                  placeholder="Nhập lại mật khẩu mới của bạn ..."
                  value={formData.confirm_new_password}
                  autoComplete="new-password"
                  onChange={handleChangeValue}
                />

                <div className="d-flex tcl-jc-between tcl-ais-center">
                  <Button htmlType='submit' type="primary" size="large" loading={loading}>
                    Xác nhận
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

export default ChangePasswordPage;
