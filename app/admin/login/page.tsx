export default function AdminLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] p-4">
      <div className="max-w-sm w-full bg-white rounded-lg shadow-sm p-8 border border-[#E5E7EB]">
        <h2 className="text-2xl font-bold mb-1 text-[#111827]">Admin Login</h2>
        <p className="text-sm text-[#6B7280] mb-6">Log in as admin to manage your products and orders.</p>
        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#111827]">Email</label>
            <input type="email" id="email" name="email" required className="mt-1 block w-full px-4 py-3 rounded-md border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#111827] bg-[#F9FAFB]" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#111827]">Password</label>
            <input type="password" id="password" name="password" required className="mt-1 block w-full px-4 py-3 rounded-md border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#111827] bg-[#F9FAFB]" />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-md font-medium hover:bg-blue-600 transition disabled:opacity-40">Sign In</button>
        </form>
      </div>
    </div>
  );
}
