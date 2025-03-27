import React from "react";

export const metadata = {
  title: "Privacy Policy | FlexiconvertIt",
  description: "How FlexiconvertIt collects, uses, and protects your data.",
};

function privacyPolicy() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4 text-sm text-gray-500">Last updated: March 26, 2025</p>

      <p className="mb-6">
        This Privacy Policy describes how <strong>FlexiconvertIt</strong> (“we”,
        “our”, or “us”) collects, uses, and discloses your personal data when
        you use our application (the “Service”). By accessing or using the
        Service, you agree to the collection and use of information in
        accordance with this Privacy Policy.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Definitions</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Account:</strong> A unique account created to access our
          Service.
        </li>
        <li>
          <strong>Application:</strong> Refers to FlexiconvertIt.
        </li>
        <li>
          <strong>Company:</strong> FlexiconvertIt (operating out of Idaho,
          USA).
        </li>
        <li>
          <strong>Device:</strong> Any device used to access the Service.
        </li>
        <li>
          <strong>Personal Data:</strong> Any information relating to an
          identified or identifiable person.
        </li>
        <li>
          <strong>Service Provider:</strong> Third-party entities assisting with
          the operation or analysis of the Service.
        </li>
        <li>
          <strong>Usage Data:</strong> Data collected automatically when using
          the Service, such as IP address, browser details, device info, and
          activity logs.
        </li>
        <li>
          <strong>You:</strong> The individual or entity using the Service.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Data We Collect</h2>
      <p className="mb-4">
        We may collect the following types of personal data when you use our
        Service:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Email address or name (if provided voluntarily)</li>
        <li>
          Usage Data such as IP address, browser type, time spent, pages visited
        </li>
        <li>Device identifiers and diagnostic data from your device</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        How We Use Your Data
      </h2>
      <p className="mb-4">We use your data to:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Provide, operate, and improve our Service</li>
        <li>Manage user accounts and authentication</li>
        <li>Respond to inquiries or customer support</li>
        <li>Send updates, offers, and relevant content (only if opted-in)</li>
        <li>Analyze usage and improve functionality and security</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Data Sharing</h2>
      <p className="mb-4">We may share your data with:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Service providers (e.g., analytics, hosting, communications)</li>
        <li>Business partners (for product or promotional offers)</li>
        <li>Affiliates, under this same policy</li>
        <li>Law enforcement, if legally required</li>
        <li>Other users, if you voluntarily share information publicly</li>
        <li>In case of a merger, acquisition, or sale of the company</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Data Retention</h2>
      <p className="mb-4">
        We retain your Personal Data only as long as necessary to fulfill the
        purposes outlined in this policy. Some data may be retained longer if
        required by law.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Your Rights</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Access, update or delete your Personal Data</li>
        <li>Withdraw consent where processing is based on consent</li>
        <li>Request data portability</li>
        <li>Restrict or object to certain types of processing</li>
      </ul>
      <p className="mt-2">
        To exercise these rights, please email us at{" "}
        <a
          href="mailto:carlosm.devv@gmail.com"
          className="text-blue-600 underline"
        >
          carlosm.devv@gmail.com
        </a>
        .
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Security</h2>
      <p className="mb-4">
        We implement reasonable measures to protect your Personal Data, but no
        method of transmission or storage is 100% secure.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Children’s Privacy</h2>
      <p className="mb-4">
        Our Service is not intended for children under 13. We do not knowingly
        collect information from children. If you believe a child has provided
        us data, please contact us.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Third-Party Links</h2>
      <p className="mb-4">
        Our Service may link to external sites. We are not responsible for their
        privacy practices. Please review their policies before providing any
        personal information.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Changes to This Policy
      </h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page with a new "Last updated" date.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Contact</h2>
      <p className="mb-4">
        For any questions about this Privacy Policy, email us at{" "}
        <a
          href="mailto:carlosm.devv@gmail.com"
          className="text-blue-600 underline"
        >
          carlosm.devv@gmail.com
        </a>
        .
      </p>
    </main>
  );
}

export default privacyPolicy;
