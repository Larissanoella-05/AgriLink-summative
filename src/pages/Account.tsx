import AccountNav from "@/UI/AccountNav";
import { Outlet } from "react-router-dom";

export default function Account() {
  return (
    <div className="grid grid-cols-[10Svw_auto] gap-6 px-[20vw]">
      <div className="mb-[70px] mt-[90px] items-center border-r-[1px]">
        <AccountNav></AccountNav>
      </div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
