import { UserRole } from "@/types/user";
import UserPage from "./UserPage";

export default function DoctorPage() {
  return <UserPage role={UserRole.DOCTOR} />;
}
