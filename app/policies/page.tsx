export const metadata = {
  title: "Policies & Ethics | Universal Journal News",
  description: "Publication ethics, peer-review, plagiarism policy, open access, and copyright.",
};

export default function PoliciesPage() {
  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "28px 16px" }}>
      <h1 style={{ fontSize: 34, fontWeight: 900 }}>Policies & Ethics</h1>

      <h2>Peer Review</h2>
      <p style={{ color: "#444", lineHeight: 1.8 }}>
        Describe your peer-review model (single/double-blind), timelines, and decision process.
      </p>

      <h2>Publication Ethics</h2>
      <p style={{ color: "#444", lineHeight: 1.8 }}>
        Add COPE-aligned principles: authorship, conflicts of interest, misconduct handling.
      </p>

      <h2>Plagiarism Policy</h2>
      <p style={{ color: "#444", lineHeight: 1.8 }}>
        Explain plagiarism checking, similarity thresholds, and rejection rules.
      </p>

      <h2>Open Access & Copyright</h2>
      <p style={{ color: "#444", lineHeight: 1.8 }}>
        Specify licensing (e.g., CC BY), archiving, and author rights.
      </p>
    </main>
  );
}
