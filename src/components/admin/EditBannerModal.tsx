'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { Banner } from '@prisma/client';
import { X, Image as ImageIcon, Loader2 } from 'lucide-react';
import SafeImage from '../ui/SafeImage';

interface EditBannerModalProps {
    isOpen: boolean;
    onClose: () => void;
    banner: Banner | null;
    onSave: (formData: FormData, bannerId: string, oldImageUrl: string) => Promise<void>;
    isSubmitting: boolean;
}

export interface FormData {
    newFile?: File | null;
    title: string;
    ctaLink: string;
    isActive: boolean;
}

export default function EditBannerModal({ isOpen, onClose, banner, onSave, isSubmitting }: EditBannerModalProps) {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        ctaLink: '',
        isActive: true,
    });
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (banner) {
            setFormData({
                title: banner.title || '',
                ctaLink: banner.ctaLink || '',
                isActive: banner.isActive,
                newFile: null,
            });
            setPreviewUrl(banner.imageUrl);
        }
    }, [banner]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData(prev => ({ ...prev, newFile: file }));
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (banner) {
            onSave(formData, banner.id, banner.imageUrl);
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child 
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                    Edit Banner
                                </Dialog.Title>
                                
                                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Banner Image</label>
                                        <div className="mt-1 flex items-center gap-4">
                                            <div className="relative h-20 w-40 bg-gray-100 rounded-md flex items-center justify-center">
                                                {previewUrl ? (
                                                    <SafeImage src={previewUrl} alt="Preview" fill style={{ objectFit: 'contain' }} />
                                                ) : (
                                                    <ImageIcon className="h-8 w-8 text-gray-400" />
                                                )}
                                            </div>
                                            <input 
                                                type="file" 
                                                accept="image/*" 
                                                onChange={handleFileChange} 
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
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title (Optional)</label>
                                        <input 
                                            id="title" 
                                            type="text" 
                                            value={formData.title} 
                                            onChange={e => setFormData(prev => ({...prev, title: e.target.value}))}
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
                                            value={formData.ctaLink}
                                            onChange={(e) => setFormData(prev => ({...prev, ctaLink: e.target.value}))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        <input 
                                            id="isActive" 
                                            type="checkbox" 
                                            checked={formData.isActive} 
                                            onChange={(e) => setFormData(prev => ({...prev, isActive: e.target.checked}))} 
                                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer" 
                                        />
                                        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                                            Set as Active
                                        </label>
                                    </div>

                                    <div className="mt-6 flex justify-end space-x-3">
                                        <button 
                                            type="button"
                                            disabled={isSubmitting}
                                            onClick={onClose} 
                                            className={`inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 ${isSubmitting? 'hover:bg-gray-200 cursor-none' : 'cursor-pointer'} focus:outline-none`}
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`inline-flex justify-center rounded-md border border-transparent bg-[#7124a8] px-4 py-2 text-sm font-medium text-white ${isSubmitting? 'hover:bg-[#5f1d8f] cursor-none' : 'cursor-pointer'}  focus:outline-none`}
                                        >
                                            {isSubmitting? (<Loader2 className="h-5 w-5 animate-spin"/>) : 'Save Changes'}
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}