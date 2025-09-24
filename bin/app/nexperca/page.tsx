// src/app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Welcome, {session.user?.name}!</h1>
            <p>Email: {session.user?.email}</p>
            <img
                src={session.user?.image || ""}
                alt="Profile"
                className="w-16 h-16 rounded-full my-4"
            />
        </div>
    );
}