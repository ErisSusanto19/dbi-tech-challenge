import Image from 'next/image';

const clientLogos = [
    { name: 'Dana', src: 'https://app.dapurbuzzer.co.id/images/klien/klien-01.png', width: 120, height: 40 },
    { name: 'Shopee', src: 'https://app.dapurbuzzer.co.id/images/klien/klien-02.png', width: 110, height: 30 },
    { name: 'Scarlett', src: 'https://app.dapurbuzzer.co.id/images/klien/klien-03.png', width: 120, height: 35 },
    { name: 'MS Glow', src: 'https://app.dapurbuzzer.co.id/images/klien/klien-04.png', width: 130, height: 35 },
    { name: 'Safi', src: 'https://app.dapurbuzzer.co.id/images/klien/klien-05.png', width: 115, height: 35 },
    { name: 'BukuKas', src: 'https://app.dapurbuzzer.co.id/images/klien/klien-06.png', width: 140, height: 30 },
    { name: 'Mola TV', src: 'https://app.dapurbuzzer.co.id/images/klien/klien-07.png', width: 140, height: 30 },
    { name: 'Gojek', src: 'https://app.dapurbuzzer.co.id/images/klien/klien-08.png', width: 140, height: 30 },
];

const ClientLogos = () => {
    return (
        <section className="bg-white py-12 md:py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-center text-xl font-semibold text-gray-500 mb-8">
                    Telah dipercaya oleh berbagai brand di Indonesia
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
                    {clientLogos.map((client) => (
                        <div key={client.name} className="flex justify-center">
                            <Image
                                src={client.src}
                                alt={`${client.name} logo`}
                                width={client.width}
                                height={client.height}
                                className="opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ClientLogos;