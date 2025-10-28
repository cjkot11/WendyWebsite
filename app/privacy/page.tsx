export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-5xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose max-w-none">
        <p className="text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you fill out a form or contact us.</p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
        <p>We use the information we collect to provide, maintain, and improve our services.</p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
        <p>If you have questions about this Privacy Policy, please contact us at wendy@wendytravel.com</p>
      </div>
    </div>
  );
}
