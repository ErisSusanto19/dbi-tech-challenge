'use client';

import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { InstagramApiResponse } from '@/types';

const StatusBadge = ({ status, onText, offText }: { status: boolean, onText: string, offText: string }) => {
    const isOff = status === false;
    return (
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
            isOff ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
            {isOff ? offText : onText}
        </span>
    );
};

const ResultRow = ({ label, value }: { label: string, value: React.ReactNode }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-100">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium text-gray-800 text-right">{value}</span>
    </div>
);


export default function InstagramCheckerPage() {
    const [username, setUsername] = useState('');
    const [result, setResult] = useState<InstagramApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [useMock, setUseMock] = useState(false);

    const handleCheck = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const endpoint = useMock ? '/api/instagram-check/mock' : '/api/instagram-check/live';
            const response = await fetch(`${endpoint}?username=${username}`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "An error occurred.");
            setResult(data);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Instagram Spam Filter Check</h1>
                        <p className="text-gray-600 mt-2">
                            Masukkan username Instagram untuk memeriksa informasi profil.
                        </p>
                    </div>

                    <form onSubmit={handleCheck} className="flex gap-2 mb-8">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="e.g., dapurbuzzer"
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7124a8] focus:border-transparent"
                            required
                        />
                        <button type="submit" disabled={isLoading} className="bg-[#7124a8] text-white font-bold px-6 py-2 rounded-md hover:bg-[#5f1d8f] disabled:bg-gray-400">
                            {isLoading ? 'Checking...' : 'Check'}
                        </button>
                    </form>

                    <div className="my-6 flex items-center justify-center gap-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <span className={`font-medium ${!useMock ? 'text-violet-700' : 'text-gray-500'}`}>
                            Live API
                        </span>
                        <Switch
                            checked={useMock}
                            onChange={setUseMock}
                            className={`${
                                useMock ? 'bg-blue-600' : 'bg-gray-200'
                            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                        >
                            <span
                                className={`${
                                    useMock ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                            />
                        </Switch>
                        <span className={`font-medium ${useMock ? 'text-blue-700' : 'text-gray-500'}`}>
                            Mock Data
                        </span>
                    </div>

                    {isLoading && <div className="text-center">Checking...</div>}
                    {error && <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>}
                    
                    {result && (
                        <div className="space-y-6">
                       
                            <div className="p-6 bg-white rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-4 border-b pb-3">Hasil</h2>
                                <div className="space-y-2">
                                    <ResultRow label="Nama" value={result.data?.full_name || 'N/A'} />
                                    <ResultRow label="Followers" value={result.data?.follower_count?.toLocaleString() || 'N/A'} />
                                    <ResultRow label="Following" value={result.data?.following_count?.toLocaleString() || 'N/A'} />
                                    <ResultRow label="Posts" value={result.data?.media_count?.toLocaleString() || 'N/A'} />
                                    <ResultRow 
                                        label="Status Private" 
                                        value={<StatusBadge status={result.data?.is_private} onText="Private is ON" offText="Private is OFF" />} 
                                    />
                                    <ResultRow 
                                        label="Spam Filter" 
                                        value={<StatusBadge status={result.data?.is_spam_filtered} onText="Filter is ON" offText="Filter is OFF" />} 
                                    />
                                </div>
                            </div>

                            <details className="bg-gray-800 text-white rounded-lg shadow-md overflow-hidden">
                                <summary className="cursor-pointer font-semibold p-4 hover:bg-gray-700">
                                    Raw JSON (debug)
                                </summary>
                                <div className="p-4 border-t border-gray-600">
                                    <pre className="text-xs whitespace-pre-wrap break-all">
                                        {JSON.stringify(result, null, 2)}
                                    </pre>
                                </div>
                            </details>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}