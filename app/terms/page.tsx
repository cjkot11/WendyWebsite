export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <div className="flex items-center justify-center gap-4 mb-8">
        <img 
          src="/images/about/logo.jpeg" 
          alt="Time2Wander Logo" 
          className="h-16 w-auto"
        />
        <h1 className="text-5xl font-bold">Terms of Service</h1>
        <img 
          src="/images/about/logo.jpeg" 
          alt="Time2Wander Logo" 
          className="h-16 w-auto"
        />
      </div>
      <div className="prose max-w-none">
        <p className="text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Services</h2>
        <p>Time2Wander provides travel planning and booking services.</p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Liability</h2>
        <p>Please review all travel documents carefully. We are not responsible for third-party services.</p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
        <p>For questions about these Terms, contact wakotsen@aol.com</p>
      </div>
    </div>
  );
}
