

export default function About() {
    return (
        <>
        <Header />
        <div className="container mx-auto">
            <div className="my-12">
            <h1 className="text-3xl font-bold text-center text-gray-800">
                About Us
            </h1>
            <p className="text-center text-gray-500">
                We are a company that provides the best service for your vacation
                needs
            </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <img
                src="/images/about.jpg"
                alt="About Us"
                className="w-full object-cover rounded"
                />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
                <p className="text-gray-500">
                Our mission is to provide the best service for your vacation needs
                </p>
                <h2 className="text-2xl font-bold text-gray-800 mt-4">Our Vision</h2>
                <p className="text-gray-500">
                Our vision is to provide the best service for your vacation needs
                </p>
            </div>
            </div>
        </div>
        <Vission />
        <Footer />
        </>
    );
}
    