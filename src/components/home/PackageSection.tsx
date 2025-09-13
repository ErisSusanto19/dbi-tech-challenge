import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

const packages = [
    {
        id: 'package2',
        name: 'Paid Promote 10 Micro',
        price: 1500000,
        description: 'Ideal untuk memulai dan menyebarkan pesan Anda dengan cepat.',
        features: [
            'Total 10 Micro Influencer',
            'Minimal 10k Followers',
            '1x Instagram Story',
            'Konten disediakan Klien',
        ],
        isFeatured: false,
    },
    {
        id: 'package1',
        name: 'Endorsement 10 Micro',
        price: 2500000,
        description: 'Pilihan paling populer untuk engagement dan konten otentik.',
        features: [
            'Total 10 Micro Influencer',
            'Minimal 10k Followers',
            '1x Instagram Feed Post',
            'Konten dibuat Influencer',
        ],
        isFeatured: true,
    },
    {
        id: 'package5',
        name: 'Kampanye Viral 100 Micro',
        price: 25000000,
        description: 'Jangkauan maksimal untuk meningkatkan brand awareness secara masif.',
        features: [
            'Total 100 Micro Influencer',
            'Minimal 10k Followers',
            '1x Feed Post / TikTok Video',
            'Efek Viral Terjamin',
        ],
        isFeatured: false,
    },
];

const PackageSection = () => {
    return (
        <section className="bg-gray-100 py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Paket Influencer Terpopuler</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Pilih paket yang paling sesuai dengan kebutuhan kampanye dan anggaran Anda.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    {packages.map(pkg => (
                        <div
                            key={pkg.id}
                            className={`
                                rounded-lg shadow-md p-8 flex flex-col transition-all duration-300
                                hover:shadow-xl hover:-translate-y-2
                                ${pkg.isFeatured? 'bg-[#7124a8] text-white lg:scale-105' : 'bg-white text-gray-800'}
                            `}
                        >
                            <h3 className="text-2xl font-bold">{pkg.name}</h3>
                            <p className={`mt-2 h-12 ${pkg.isFeatured}? 'text-gray-200' : 'text-gray-600'`}>
                                {pkg.description}
                            </p>

                            <div className="my-6 flex items-baseline flex-wrap">
                                <span className="text-4xl font-bold break-all">
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0}).format(pkg.price)}
                                </span>
                                <span className={`ml-2 ${pkg.isFeatured? 'text-gray-300' : 'text-gray-500'}`}>/paket</span>
                            </div>

                            <ul className="space-y-4 mb-8 flex-grow">
                                {pkg.features.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircle2 className={`w-5 h-5 mr-3 mt-1 flex-shrink-0 ${pkg.isFeatured? 'text-white' : 'text-green-500'}`}/>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={`https://app.dapurbuzzer.co.id/package#${pkg.id}`}
                                className={`
                                    block w-full text-center font-bold py-3 px-6 rounded-md transition-colors
                                    ${pkg.isFeatured
                                        ? 'bg-white text-[#7124a8] hover:bg-[#ceb9fc]'
                                        : 'bg-[#7124a8] text-white hover:bg-[#5f1d8f]'
                                    }
                                `}
                            >
                                Lihat Detail
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link href="/packages" className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-8 rounded-md border border-gray-300 transition-colors">
                        Lihat Semua Paket Kami
                    </Link>
                </div>
            </div>

        </section>
    )
}

export default PackageSection;