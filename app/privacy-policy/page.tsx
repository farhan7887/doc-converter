export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
          Privacy Policy
        </h1>
        <div className="space-y-5 text-slate-600 leading-relaxed">
          <p>Last updated: {new Date().getFullYear()}</p>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              Files You Upload
            </h2>
            <p>
              Files you upload for conversion are processed automatically
              and are not permanently stored on our servers. Files are
              deleted shortly after processing is complete.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              Information We Collect
            </h2>
            <p>
              We may collect basic, non-identifying analytics data such as
              page views and general usage patterns to help us improve the
              service. We do not require account creation or personal
              information to use our tools.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              Cookies and Advertising
            </h2>
            <p>
              This site may use cookies and third-party advertising services
              (such as Google AdSense) to display ads. These services may
              use cookies to serve ads based on your prior visits to this or
              other websites. You can opt out of personalized advertising by
              visiting Google's Ads Settings.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              Contact
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us through our Contact page.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}