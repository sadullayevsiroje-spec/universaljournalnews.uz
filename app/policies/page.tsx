export const metadata = {
  title: "Policies | Universal Journal News",
  description: "Publication policies, peer review process, open access, and copyright information.",
};

export default function PoliciesPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold">Journal Policies</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Peer Review Policy</h2>
        <div className="space-y-3 text-gray-700 leading-relaxed">
          <p>
            Universal Journal News employs a rigorous double-blind peer review process to ensure 
            the quality and integrity of published research. All submitted manuscripts undergo 
            initial screening by the editorial team, followed by evaluation by at least two 
            independent expert reviewers.
          </p>
          <p><strong>Review Process:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Initial screening: 5-7 days</li>
            <li>Peer review: 2-4 weeks</li>
            <li>Author revision: 2-3 weeks</li>
            <li>Final decision: 1-2 weeks</li>
          </ul>
          <p>
            Reviewers are selected based on their expertise in the relevant field. Both authors 
            and reviewers remain anonymous throughout the review process.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Open Access Policy</h2>
        <div className="space-y-3 text-gray-700 leading-relaxed">
          <p>
            Universal Journal News is an open access journal. All articles are freely available 
            to read, download, and share immediately upon publication. We believe in the free 
            dissemination of research to advance science and benefit society.
          </p>
          <p><strong>License:</strong></p>
          <p>
            All articles are published under the Creative Commons Attribution 4.0 International 
            License (CC BY 4.0). This allows users to copy, distribute, transmit, and adapt the 
            work, provided the original work is properly cited.
          </p>
          <p><strong>Article Processing Charges (APC):</strong></p>
          <p>
            Currently, there are no article processing charges. Authors can publish their work 
            free of charge.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Copyright Policy</h2>
        <div className="space-y-3 text-gray-700 leading-relaxed">
          <p>
            Authors retain copyright of their work. By publishing in Universal Journal News, 
            authors grant the journal the right to publish and distribute the article.
          </p>
          <p>
            Authors are free to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Share their work on personal websites and institutional repositories</li>
            <li>Use their work for teaching and presentations</li>
            <li>Reuse figures and data in future publications</li>
            <li>Translate their work into other languages</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Plagiarism Policy</h2>
        <div className="space-y-3 text-gray-700 leading-relaxed">
          <p>
            Universal Journal News has a zero-tolerance policy towards plagiarism. All submitted 
            manuscripts are checked for plagiarism using similarity detection software.
          </p>
          <p><strong>Similarity Thresholds:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Overall similarity: Maximum 20%</li>
            <li>Single source similarity: Maximum 5%</li>
            <li>Proper citations must be provided for all referenced work</li>
          </ul>
          <p>
            Manuscripts with excessive similarity will be rejected. Cases of confirmed plagiarism 
            will result in immediate rejection and may lead to notification of the author's 
            institution.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Authorship Policy</h2>
        <div className="space-y-3 text-gray-700 leading-relaxed">
          <p>
            Authorship should be limited to those who have made significant contributions to the 
            conception, design, execution, or interpretation of the research.
          </p>
          <p><strong>Author Responsibilities:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>All authors must approve the final version of the manuscript</li>
            <li>All authors must agree to be accountable for all aspects of the work</li>
            <li>Corresponding author is responsible for communication with the journal</li>
            <li>Any changes to authorship must be agreed upon by all authors</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Conflict of Interest</h2>
        <div className="space-y-3 text-gray-700 leading-relaxed">
          <p>
            Authors must disclose any financial or personal relationships that could influence 
            their work. This includes funding sources, employment, consultancies, stock ownership, 
            and personal relationships with individuals or organizations.
          </p>
          <p>
            Reviewers and editors must also disclose any conflicts of interest that could bias 
            their evaluation of manuscripts.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Research Ethics</h2>
        <div className="space-y-3 text-gray-700 leading-relaxed">
          <p>
            All research involving human subjects or animals must comply with relevant ethical 
            guidelines and regulations.
          </p>
          <p><strong>Requirements:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Human research: Informed consent and ethics committee approval required</li>
            <li>Animal research: Institutional animal care committee approval required</li>
            <li>Clinical trials: Must be registered in a public trials registry</li>
            <li>Data privacy: Personal data must be anonymized and protected</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Corrections and Retractions</h2>
        <div className="space-y-3 text-gray-700 leading-relaxed">
          <p>
            We are committed to maintaining the integrity of the published record. Errors will 
            be corrected promptly, and articles will be retracted if necessary.
          </p>
          <p><strong>Corrections:</strong> Minor errors that do not affect the conclusions will be corrected with a published correction notice.</p>
          <p><strong>Retractions:</strong> Articles will be retracted in cases of research misconduct, ethical violations, or fundamental errors that invalidate the findings.</p>
        </div>
      </section>
    </main>
  );
}
