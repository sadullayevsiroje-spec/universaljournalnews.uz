"use client";

import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to send message");
      }

      setSuccess("Your message has been sent successfully.");
      form.reset();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Contact</h1>
        <p className="text-gray-600">
          For editorial inquiries, submissions, and technical support, please
          contact us using the form below.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        {/* Contact info */}
        <div className="rounded-2xl border p-5 space-y-4">
          <h2 className="text-lg font-semibold">Contact information</h2>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-semibold">sadullayev.siroje@gmail.com</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-semibold">+998 (__) ___-__-__</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-semibold">
              Urgench State Medical Institute, Urgench, Uzbekistan
            </p>
          </div>

          <div className="pt-2 text-sm text-gray-600">
            Working hours: Mon–Fri, 09:00–18:00 (UTC+5)
          </div>
        </div>

        {/* Form */}
        <div className="rounded-2xl border p-5 lg:col-span-2">
          <h2 className="text-lg font-semibold">Send a message</h2>
          <p className="mt-1 text-sm text-gray-600">
            We typically reply within 1–3 business days.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-1">
                <span className="text-sm font-medium">Full name</span>
                <input
                  name="name"
                  required
                  className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2"
                  placeholder="Your name"
                />
              </label>

              <label className="space-y-1">
                <span className="text-sm font-medium">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <label className="space-y-1 block">
              <span className="text-sm font-medium">Subject</span>
              <input
                name="subject"
                required
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2"
                placeholder="Manuscript inquiry / Technical issue / Other"
              />
            </label>

            <label className="space-y-1 block">
              <span className="text-sm font-medium">Message</span>
              <textarea
                name="message"
                required
                rows={6}
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2"
                placeholder="Write your message..."
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl border px-4 py-2 font-semibold hover:bg-gray-50 disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send"}
            </button>

            {success && (
              <p className="text-sm text-green-600 font-medium">{success}</p>
            )}
            {error && (
              <p className="text-sm text-red-600 font-medium">{error}</p>
            )}

            <p className="mt-3 text-xs text-gray-500">
              By submitting this form, you agree that your message will be used
              for editorial communication purposes.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
