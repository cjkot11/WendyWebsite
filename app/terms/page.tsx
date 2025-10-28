export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-5xl font-bold mb-8">Terms of Service</h1>
      <div className="prose max-w-none">
        <p className="text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Services</h2>
        <p>Wendy's Travel Agency provides travel planning and booking services.</p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Liability</h2>
        <p>Please review all travel documents carefully. We are not responsible for third-party services.</p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
        <p>For questions about these Terms, contact wendy@wendytravel.com</p>
      </div>
    </div>
  );
}
