import AccountNav from "../UI/AccountNav"
import { Outlet } from "react-router-dom"

export default function Account() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border p-6">
              <AccountNav />
            </div>
          </div>
          <div className="min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
