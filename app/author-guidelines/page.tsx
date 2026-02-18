export const metadata = {
  title: "Author Guidelines | Universal Journal News",
  description: "Guidelines for authors submitting manuscripts to Universal Journal News.",
};

export default function AuthorGuidelinesPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold">Author Guidelines</h1>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <p className="text-blue-900">
          <strong>Note:</strong> Universal Journal News is an open access journal. There are 
          currently no article processing charges (APCs) for publication.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Manuscript Submission</h2>
        <div className="space-y-3 text-gray-700 leading-relaxed">
          <p>
            Manuscripts should be submitted via email to: <strong>sadullayev.siroje@gmail.com</strong>
          </p>
          <p>
            All submissions must be original work that has not been published elsewhere and is 
            not under consideration by another journal. Authors must confirm this in their cover 
            letter. Articles are published monthly.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Article Types</h2>
        <div className="space-y-3 text-gray-700 leading-relaxed">
          <p>We accept the following types of manuscripts:</p>
          
          <div className="ml-4 space-y-4">
            <div>
              <p><strong>Original Research Articles</strong> (Maximum 6000 words)</p>
              <p className="text-sm">
                Reports of original research findings. Should include Introduction, Methods, 
                Results, and Discussion sections.
              </p>
            </div>

            <div>
              <p><strong>Review Articles</strong> (Maximum 8000 words)</p>
              <p className="text-sm">
                Comprehensive reviews of specific topics. Should provide critical analysis and 
                synthesis of existing literature.
              </p>
            </div>

            <div>
              <p><strong>Short Communications</strong> (Maximum 3000 words)</p>
              <p className="text-sm">
                Brief reports of preliminary or significant findings that warrant rapid publication.
              </p>
            </div>

            <div>
              <p><strong>Case Reports</strong> (Maximum 3000 words)</p>
              <p className="text-sm">
                Descriptions of unique or rare cases with educational value.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Manuscript Preparation</h2>
        <div className="space-y-3 text-gray-700 leading-relaxed">
          <p><strong>Language:</strong></p>
          <p>Manuscripts can be written in English, Uzbek, or Russian. All manuscripts must be grammatically correct and clearly written.</p>

          <p><strong>Format:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>File format: Microsoft Word (.docx) or PDF</li>
            <li>Font: Times New Roman, 12 pt</li>
            <li>Line spacing: Double</li>
            <li>Margins: 2.5 cm on all sides</li>
            <li>Page numbers: Bottom center</li>
          </ul>

          <p><strong>Structure:</strong></p>
          <p>Research articles should follow the IMRAD structure:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Title Page:</strong> Title, authors, affiliations, corresponding author details</li>
            <li><strong>Abstract:</strong> 250-300 words, structured (Background, Methods, Results, Conclusions)</li>
            <li><strong>Keywords:</strong> 4-6 keywords</li>
            <li><strong>Introduction:</strong> Background, objectives, and significance</li>
            <li><strong>Methods:</strong> Detailed methodology, materials, and procedures</li>
            <li><strong>Results:</strong> Findings presented clearly with tables and figures</li>
            <li><strong>Discussion:</strong> Interpretation, implications, and limitations</li>
            <li><strong>Conclusions:</strong> Main findings and future directions</li>
            <li><strong>Acknowledgments:</strong> Funding sources and contributors</li>
            <li><strong>References:</strong> Cited literature</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">References</h2>
        <div className="space-y-3 text-gray-700 leading-relaxed">
          <p>
            References should be cited in the text using the Vancouver style (numbered citations 
            in square brackets). The reference list should be numbered in the order of appearance.
          </p>
          
          <p><strong>Examples:</strong></p>
          <div className="bg-gray-50 p-4 rounded space-y-2 text-sm">
            <p><strong>Journal article:</strong></p>
            <p className="ml-4">
              Smith J, Jones M. Title of article. Journal Name. 2023;10(2):123-130.
            </p>
            
            <p><strong>Book:</strong></p>
            <p className="ml-4">
              Brown A. Title of Book. 2nd ed. Publisher; 2022.
            </p>
            
            <p><strong>Website:</strong></p>
            <p className="ml-4">
              Organization Name. Page title. Available from: URL. Accessed Date.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Tables and Figures</h2>
        <div className="space-y-3 text-gray-700 leading-relaxed">
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Tables and figures should be numbered consecutively</li>
            <li>Each should have a descriptive title and legend</li>
            <li>Figures should be high resolution (minimum 300 dpi)</li>
            <li>Acceptable formats: JPEG, PNG, TIFF</li>
            <li>Tables should be editable (not images)</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Ethical Considerations</h2>
        <div className="space-y-3 text-gray-700 leading-relaxed">
          <p><strong>Human Subjects:</strong></p>
          <p>
            Research involving human subjects must have ethics committee approval. Informed 
            consent must be obtained from all participants.
          </p>

          <p><strong>Animal Research:</strong></p>
          <p>
            Animal studies must comply with institutional and national guidelines. Ethics 
            approval must be obtained.
          </p>

          <p><strong>Clinical Trials:</strong></p>
          <p>
            Clinical trials must be registered in a public trials registry (e.g., ClinicalTrials.gov) 
            before patient enrollment.
          </p>

          <p><strong>Conflicts of Interest:</strong></p>
          <p>
            All authors must disclose any financial or personal relationships that could 
            influence their work.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Submission Checklist</h2>
        <div className="space-y-3 text-gray-700 leading-relaxed">
          <p>Before submission, ensure that:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>✓ Manuscript follows the required format and structure</li>
            <li>✓ All authors have approved the final version</li>
            <li>✓ Ethics approval obtained (if applicable)</li>
            <li>✓ Conflicts of interest disclosed</li>
            <li>✓ References formatted correctly</li>
            <li>✓ Figures and tables are high quality</li>
            <li>✓ Cover letter included</li>
            <li>✓ Manuscript is original and not under consideration elsewhere</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Review Process</h2>
        <div className="space-y-3 text-gray-700 leading-relaxed">
          <p>
            All manuscripts undergo double-blind peer review. The typical timeline is:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Initial screening: 5-7 days</li>
            <li>Peer review: 2-4 weeks</li>
            <li>Author revision: 2-3 weeks</li>
            <li>Final decision: 1-2 weeks</li>
            <li>Publication: 1-2 weeks after acceptance</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <div className="space-y-3 text-gray-700 leading-relaxed">
          <p>
            For questions about manuscript submission or author guidelines, please contact:
          </p>
          <p>
            <strong>Email:</strong> sadullayev.siroje@gmail.com<br />
            <strong>Editor-in-Chief:</strong> Sadullayev Siroj Ernazarovich
          </p>
        </div>
      </section>
    </main>
  );
}
