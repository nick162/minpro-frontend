import { redirect } from "next/navigation";

export default function UserHome() {
  redirect("/user/dashboard");
}
