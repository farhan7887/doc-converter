export default function Terms() {
  return (
    <main className="min-h-screen bg-white px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
          Terms of Service
        </h1>
        <div className="space-y-5 text-slate-600 leading-relaxed">
          <p>Last updated: {new Date().getFullYear()}</p>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              Use of Service
            </h2>
            <p>
              DocConverter provides free file conversion tools for personal
              and professional use. You agree to use this service only for
              lawful purposes and not to upload any content that infringes
              on the rights of others or violates any applicable law.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              No Warranty
            </h2>
            <p>
              This service is provided "as is" without warranties of any
              kind. We do our best to ensure accurate conversions, but we
              cannot guarantee the output will be free of errors for every
              file type or format.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              Limitation of Liability
            </h2>
            <p>
              We are not liable for any loss or damage resulting from your
              use of this service, including but not limited to loss of
              data or files.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              Changes to Terms
            </h2>
            <p>
              We may update these Terms of Service from time to time. Continued
              use of the site after changes means you accept the updated terms.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}