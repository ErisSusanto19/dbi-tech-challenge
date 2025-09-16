'use client';

import { useEffect, useState } from "react";
import { Banner } from "@prisma/client";
import SafeImage from "@/components/ui/SafeImage";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";
import EditBannerModal, { FormData as EditFormData } from "@/components/admin/EditBannerModal";
import { AlertTriangle, Loader2 } from "lucide-react";
import AdminSkeleton from "@/components/admin/AdminSkeleton";

const AdminBannersPage = () => {
    const [banners, setBanners] = useState<Banner[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [newTitle, setNewTitle] = useState('')
    const [newCtaLink, setNewCtaLink] = useState('')
    const [newIsActive, setNewIsActive] = useState(true)

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isEditSubmitting, setIsEditSubmitting] = useState(false)
    const [isDeleteSubmitting, setIsDeleteSubmitting] = useState(false)

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [bannerToDelete, setBannerToDelete] = useState<string | null>(null);

    const openDeleteModal = (bannerId: string) => {
        setBannerToDelete(bannerId);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setBannerToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [bannerToEdit, setBannerToEdit] = useState<Banner | null>(null);

    const openEditModal = (banner: Banner) => {
        setBannerToEdit(banner);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setBannerToEdit(null);
        setIsEditModalOpen(false);
    };

    const fetchBanners = async () => {
        try {
            setIsLoading(true)

            const response = await fetch('/api/banners-admin/')
            if(!response.ok) throw new Error("Failed to fetch banners")

            const data = await response.json()
            setBanners(data)
            
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchBanners()
    }, [])

    const handleCreateBanner = async (e: React.FormEvent) => {
        e.preventDefault();
         if (!selectedFile) {
            setError("Please select an image file to upload.");
            return;
        }
        setIsSubmitting(true)
        setError(null)

        try {
           const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

            const cloudinaryResponse = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            const cloudinaryData = await cloudinaryResponse.json();

            if (cloudinaryResponse.status !== 200) {
                throw new Error(cloudinaryData.error.message || "Cloudinary upload failed");
            }
            
            const imageUrl = cloudinaryData.secure_url;

            const response = await fetch('/api/banners', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    imageUrl,
                    title: newTitle,
                    ctaLink: newCtaLink,
                    isActive: newIsActive
                })
            })

            if(!response.ok){
                const erroData = await response.json()
                throw new Error(erroData.message || 'Failed to create banner')
            }

            setSelectedFile(null);
            setNewTitle('')
            setNewCtaLink('')
            setNewIsActive(true)

            await fetchBanners()
            
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDeleteBanner = async () => {
        if (!bannerToDelete) return;
        setIsDeleteSubmitting(true);

        try {
            const response = await fetch(`/api/banners/${bannerToDelete}`, {method: 'DELETE'})

            if(!response.ok){
                const errorData = await response.json()
                throw new Error(errorData || "Failed to delete banner.")
            }

            setBanners(currentBanners => currentBanners.filter(banner => bannerToDelete !== banner.id))
            closeDeleteModal();
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setIsDeleteSubmitting(false)
        }
    }

    const handleUpdateBanner = async(formData: EditFormData, bannerId: string, oldImageUrl: string) => {
        setIsEditSubmitting(true);
        setError(null);

        let newImageUrl = oldImageUrl;

        try {
             if (formData.newFile) {
                const cloudiForm = new FormData();
                cloudiForm.append('file', formData.newFile);
                cloudiForm.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
                
                const cloudiRes = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: cloudiForm });
                const cloudiData = await cloudiRes.json();
                if (!cloudiRes.ok) throw new Error(cloudiData.error.message);
                
                newImageUrl = cloudiData.secure_url;

                await fetch('/api/delete-image', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ imageUrl: oldImageUrl }),
                });
            }

            const response = await fetch(`/api/banners/${bannerId}`, {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    imageUrl: newImageUrl,
                    title: formData.title,
                    ctaLink: formData.ctaLink,
                    isActive: formData.isActive,
                })
            })

            if(!response.ok){
                const errorData = await response.json()
                throw new Error(errorData || "Failed to update banner")
            }

            closeEditModal();

            await fetchBanners()
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setIsEditSubmitting(false);
        }
    }

    const activeBannersCount = banners.filter(b => b.isActive).length;
    const BANNER_LIMIT = 5;

    if(isLoading) return <AdminSkeleton />;
    if(error) {
         return (
            <main className="container mx-auto px-4 py-8">
                <div className="p-6 bg-red-50 border border-red-200 text-red-800 rounded-lg">
                    <h2 className="font-bold text-lg mb-2">Failed to Load Data</h2>
                    <p>{error}</p>
                    <button 
                        onClick={() => fetchBanners()} 
                        className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                    >
                        Try Again
                    </button>
                </div>
            </main>
        );
    }

    return (
        <>
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Manage Banners</h1>

                <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Add New Banner</h2>
                    <form onSubmit={handleCreateBanner} className="space-y-6">

                        <div>
                            <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 mb-1">
                                Image File*
                            </label>
                            <input 
                                id="imageFile" 
                                type="file" 
                                accept="image/png, image/jpeg, image/webp"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setSelectedFile(e.target.files[0]);
                                    }
                                }}
                                required 
                                className={`
                                    block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-violet-50 file:text-violet-700
                                    hover:file:bg-violet-100
                                    file:cursor-pointer
                                    cursor-pointer
                                `}
                            />
                        
                            {selectedFile && (
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-700">Image Preview:</p>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img 
                                        src={URL.createObjectURL(selectedFile)} 
                                        alt="Preview" 
                                        className="mt-2 rounded-md max-h-40 border cursor-pointer"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                    Title (Optional)
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="ctaLink" className="block text-sm font-medium text-gray-700 mb-1">
                                    Call to Action Link (Optional)
                                </label>
                                <input
                                    id="ctaLink"
                                    type="text"
                                    value={newCtaLink}
                                    onChange={(e) => setNewCtaLink(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="isActive" 
                                    type="checkbox" 
                                    checked={newIsActive} 
                                    onChange={(e) => setNewIsActive(e.target.checked)}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer" />
                                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                                    Set as Active
                                </label>
                            </div>
                            <button type="submit" disabled={isSubmitting} className="bg-[#7124a8] hover:bg-[#5f1d8f] text-white font-bold py-2 px-4 rounded-md cursor-pointer disabled:bg-[#ceb9fc] disabled:cursor-none">
                                {isSubmitting ? (<Loader2 className="h-5 w-5 animate-spin"/>) : 'Create Banner'}
                            </button>
                        </div>

                    </form>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>

                {activeBannersCount > BANNER_LIMIT && (
                    <div className="my-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-lg shadow-md">
                        <div className="flex">
                            <div className="py-1">
                                <AlertTriangle className="h-6 w-6 text-yellow-500 mr-4" /> 
                            </div>
                            <div>
                                <p className="font-bold">Perhatian: Batas Banner Aktif Terlampaui</p>
                                <p className="text-sm">
                                    Saat ini ada {activeBannersCount} banner aktif. Sistem hanya akan menampilkan {BANNER_LIMIT} banner yang terakhir diperbarui di halaman utama.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

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
                            {banners.map((banner) => {
                                const isDisplayedOnHome = banner.isActive && banners.filter(b => b.isActive).indexOf(banner) < BANNER_LIMIT;
                                return (
                                    <tr key={banner.id}>
                                        <td className="px-6 py-4">
                                            <div className="relative h-10 w-20">
                                                <SafeImage src={banner.imageUrl} alt="Banner" fill style={{ objectFit: 'contain' }} />
                                            </div>
                                            {isDisplayedOnHome && (
                                                <span className="block text-xs text-blue-600 mt-1">Displayed on Home</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{banner.title? banner.title : '-'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{banner.ctaLink? banner.ctaLink: '-'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            banner.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                            >
                                                {banner.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{new Date(banner.createdAt).toLocaleString()}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{new Date(banner.updatedAt).toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right text-sm font-medium">
                                            <button onClick={() => openEditModal(banner)} className="text-[#7124a8] hover:text-[#5f1d8f] mr-4 cursor-pointer">
                                                Edit
                                            </button>
                                            <button onClick={() => openDeleteModal(banner.id)} className="text-red-600 hover:text-red-900 cursor-pointer">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </main>

            <EditBannerModal 
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                banner={bannerToEdit}
                onSave={handleUpdateBanner}
                isSubmitting={isEditSubmitting}
            />

            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={handleDeleteBanner}
                title="Delete Banner"
                message="Are you sure you want to delete this banner? This action cannot be undone."
                isSubmitting={isDeleteSubmitting}
            />
        </>
    )
}

export default AdminBannersPage;