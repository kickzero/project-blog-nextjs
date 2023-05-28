import { Button } from '@/components/shared/Button';
import { formatUserInfo } from '@/helper/formatApi';
import userService from '@/services/user';
import { useGlobalState } from '@/state';
import { useEffect, useState } from 'react';

type Props = {};

function Profile({}: Props) {
  const [user, setUser] = useGlobalState("user");
  const initialForm = {
    file: "",
    desc: "",
  };
  const [preview, setPreview] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialForm);
  const userInfo = useGlobalState("user")[0];
  const setField = (field: string, value: any) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const updateProfile = async (e : any) => {
    e.preventDefault();
    if (!loading) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", form.file);
      const avatar = await userService.uploadMedia({ file: formData });
      console.log("avatar", avatar.data.id)
      userService
        .updateProfile({
          description: form.desc,
          mediaId: avatar?.data?.id,
        })
        .then(() => {
          setForm(initialForm);
          userService.fetchMe({}).then((res) => {
            setUser(formatUserInfo(res.data));
            console.log("res.data", res.data)
          });
          alert("Cap nhat thanh cong");
        })
        .catch(() => {
          alert("Cap nhat that bai");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl: any = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return (
    <main className="login">
      <div className="spacing" />
      <div className="tcl-container">
        <div className="tcl-row">
          <div className="tcl-col-12 tcl-col-sm-6 block-center">
            <h1 className="form-title text-center">Cập nhật thông tin</h1>
            <div className="form-login-register">
              <form autoComplete="off" onSubmit={updateProfile}>
                {selectedFile && <img src={URL.createObjectURL(selectedFile)} />}
                <input type="file"
                  placeholder="Nhập tên đăng nhập ..."
                  autoComplete="off"
                  onChange={(e: any) => {
                  setField("file", e.target.files[0]);
                  setSelectedFile(e.target.files[0]);
                }} />
                <input
                  value={form?.desc}
                  type="text"
                  placeholder="Nhập mật mô tả của bạn ..."
                  onChange={(e: any) => {
                    setField("desc", e.target.value);
                  }}
                />
                <div className="d-flex tcl-jc-between tcl-ais-center">
                  <Button htmlType='submit' type="primary" size="large">
                    Save
                  </Button>
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

export default Profile;
