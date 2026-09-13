export default function About() {
  return (
    <main className="min-h-screen bg-white px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
          About DocConverter
        </h1>
        <div className="space-y-4 text-slate-600 leading-relaxed">
          <p>
            DocConverter was built to make everyday file conversion simple,
            fast, and free — no signups, no watermarks, and no hidden fees.
          </p>
          <p>
            Whether you need to turn an image into a PDF, convert a PDF into
            an editable Word document, or shrink a file down for easier
            sharing, DocConverter handles it in seconds, right in your
            browser.
          </p>
          <p>
            This project is built and maintained by Farri, a student at
            COMSATS University Islamabad, with the goal of offering a clean,
            reliable alternative to cluttered conversion websites.
          </p>
          <p>
            Files uploaded to DocConverter are processed securely and are
            never stored longer than necessary.
          </p>
        </div>
      </div>
    </main>
  );
}