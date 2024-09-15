import { UserRole } from "../types/user";
import UserPage from "./UserPage";

export default function CustomerPage() {
  return <UserPage role={UserRole.CUSTOMER} />;
}
