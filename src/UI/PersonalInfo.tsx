import UpdatePassword from "@/features/Authentication/UpdatePassword";
import UpdateUserInfo from "@/features/Authentication/UpdateUserInfo";

export default function PersonalInfo() {
  return (
    <div className="mb-[20px] mt-[60px] space-y-5">
      <UpdateUserInfo></UpdateUserInfo>
      <UpdatePassword></UpdatePassword>
    </div>
  );
}
