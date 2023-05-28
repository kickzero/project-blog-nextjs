import { useState } from "react";
import { Input } from "../shared/Input";
import { useRouter } from "next/router";


function HeaderSearch() {
  const [value, setValue] = useState('');
  const router = useRouter()
  // const { pid } = router.query
  function handleChangeValue(e: any){
    setValue(e.target.value);
  }

  function handleSubmit(e: any){
    e.preventDefault();
    router.push(`/search?q=${value}`)
  }
  return (
    <div className="tcl-col-4">
      {/* Header Search */}
      <form onSubmit={handleSubmit}>
        <Input type="search" onChange={handleChangeValue} value={value} placeholder="Nhap gia tri search ..." />
      </form>
    </div>
  );
}

export default HeaderSearch;
