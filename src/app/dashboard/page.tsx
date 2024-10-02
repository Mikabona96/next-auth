import { verifySession } from "@/app/lib/dal";
import { redirect } from "next/navigation";

export default async function Dashboard() {
	const session = await verifySession();
	const userRole = session?.user?.role || "user"; // Assuming 'role' is part of the session object

	if (userRole === "admin") {
		return <div>Admin Dashboard</div>;
	} else if (userRole === "user") {
		return <div>User dashboard</div>;
	} else {
		redirect("/login");
	}
}
