const SkeletonTableRow = () => (
    <tr className="animate-pulse">
        <td className="px-6 py-4"><div className="h-10 w-20 rounded bg-gray-200"></div></td>
        <td className="px-6 py-4"><div className="h-4 rounded bg-gray-200 w-24"></div></td>
        <td className="px-6 py-4"><div className="h-4 rounded bg-gray-200 w-20"></div></td>
        <td className="px-6 py-4"><div className="h-5 rounded-full bg-gray-200 w-16"></div></td>
        <td className="px-6 py-4"><div className="h-4 rounded bg-gray-200 w-32"></div></td>
        <td className="px-6 py-4"><div className="h-4 rounded bg-gray-200 w-32"></div></td>
        <td className="px-6 py-4 text-right">
            <div className="flex justify-end gap-4">
                <div className="h-5 w-10 rounded bg-gray-200"></div>
                <div className="h-5 w-14 rounded bg-gray-200"></div>
            </div>
        </td>
    </tr>
);

export default function AdminSkeleton() {
    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Manage Banners</h1>

            <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow animate-pulse">
                <div className="h-6 w-1/3 bg-gray-200 rounded mb-6"></div>
                <div className="space-y-6">

                    <div>
                        <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="h-10 bg-gray-200 rounded"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                    </div>

                    <div className="flex justify-end">
                        <div className="h-10 w-32 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CTA Link</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <SkeletonTableRow />
                        <SkeletonTableRow />
                        <SkeletonTableRow />
                        <SkeletonTableRow />
                    </tbody>
                </table>
            </div>
        </main>
    );
}