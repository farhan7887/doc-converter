export default function Contact() {
  return (
    <main className="min-h-screen bg-white px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Contact Us</h1>
        <div className="space-y-4 text-slate-600 leading-relaxed">
          <p>
            Have a question, found a bug, or want to suggest a new feature? We would love to hear from you.
          </p>
          <p>
            Email us at <a href="mailto:support@docconverter.com" className="text-indigo-600 hover:underline">support@docconverter.com</a> and we will get back to you as soon as possible.
          </p>
        </div>
      </div>
    </main>
  );
}