import Button from "./components/Button";
import Navbar from "./components/Navbar";

export default function Page() {
  return (
    <main className="min-h-screen bg-base-100 pt-20">
      
      <Navbar />

      <div className="hero min-h-[70vh]">
        <div className="hero-content text-center">
          <div className="max-w-md md:max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              Manage your <span className="text-primary">records</span> instantly.
            </h1>
            <p className="py-6 text-lg text-base-content/70">
              Welcome to <strong className="text-primary">Quick Records</strong>. The secure, high-performance platform 
              designed to streamline your record-keeping workflow.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="primary" href="/register" className="px-8">
                Get Started
              </Button>

              <Button outline>
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}