export const metadata = {
  title: "Publication Ethics | Universal Journal News",
  description: "Ethical guidelines and standards for authors, reviewers, and editors.",
};

export default function PublicationEthicsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold">Publication Ethics and Malpractice Statement</h1>

      <div className="space-y-3 text-gray-700 leading-relaxed">
        <p>
          Universal Journal News is committed to maintaining the highest standards of publication 
          ethics and takes all possible measures against publication malpractice. Our ethical 
          guidelines are based on the Committee on Publication Ethics (COPE) best practice 
          guidelines.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Duties of Authors</h2>
        <div className="space-y-3 text-gray-700 leading-relaxed">
          <p><strong>Reporting Standards:</strong></p>
          <p>
            Authors should present an accurate account of their research and an objective 
            discussion of its significance. Data should be represented accurately in the manuscript. 
            A manuscript should contain sufficient detail and references to permit others to 
            replicate the work.
          </p>

          <p><strong>Originality and Plagiarism:</strong></p>
          <p>
            Authors must ensure that their work is entirely original. Plagiarism in all its forms 
            constitutes unethical behavior and is unacceptable. Authors should properly cite the 
            work of others and acknowledge all sources.
          </p>

          <p><strong>Multiple, Redundant, or Concurrent Publication:</strong></p>
          <p>
            Authors should not submit manuscripts describing essentially the same research to more 
            than one journal. Submitting the same manuscript to more than one journal concurrently 
            constitutes unethical behavior and is unacceptable.
          </p>

          <p><strong>Acknowledgment of Sources:</strong></p>
          <p>
            Authors should acknowledge all sources of data used in the research and cite 
            publications that have influenced their work.
          </p>

          <p><strong>Authorship of the Paper:</strong></p>
          <p>
            Authorship should be limited to those who have made a significant contribution to the 
            conception, design, execution, or interpretation of the study. All those who have made 
            significant contributions should be listed as co-authors.
          </p>

          <p><strong>Disclosure and Conflicts of Interest:</strong></p>
          <p>
            All authors should disclose any financial or other substantive conflicts of interest 
            that might be construed to influence the results or interpretation of their manuscript.
          </p>

          <p><strong>Fundamental Errors in Published Works:</strong></p>
          <p>
            When an author discovers a significant error or inaccuracy in their published work, 
            they should promptly notify the journal editor and cooperate to retract or correct 
            the paper.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Duties of Reviewers</h2>
        <div className="space-y-3 text-gray-700 leading-relaxed">
          <p><strong>Contribution to Editorial Decisions:</strong></p>
          <p>
            Peer review assists the editor in making editorial decisions and may also help authors 
            improve their manuscripts. Reviewers should provide constructive, honest, and unbiased 
            feedback in a timely manner.
          </p>

          <p><strong>Promptness:</strong></p>
          <p>
            If a reviewer feels unqualified to review the manuscript or knows that its timely 
            review will be impossible, they should notify the editor and decline to participate 
            in the review process.
          </p>

          <p><strong>Confidentiality:</strong></p>
          <p>
            Any manuscripts received for review must be treated as confidential documents. 
            Reviewers must not share the manuscript with others or discuss it with colleagues 
            without permission from the editor.
          </p>

          <p><strong>Standards of Objectivity:</strong></p>
          <p>
            Reviews should be conducted objectively. Personal criticism of the author is 
            inappropriate. Reviewers should express their views clearly with supporting arguments.
          </p>

          <p><strong>Acknowledgment of Sources:</strong></p>
          <p>
            Reviewers should identify relevant published work that has not been cited by the 
            authors and should alert the editor to any substantial similarity between the 
            manuscript and any published paper or manuscript under consideration elsewhere.
          </p>

          <p><strong>Disclosure and Conflict of Interest:</strong></p>
          <p>
            Reviewers should decline to review manuscripts in which they have conflicts of 
            interest resulting from competitive, collaborative, or other relationships with any 
            of the authors, companies, or institutions connected to the papers.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Duties of Editors</h2>
        <div className="space-y-3 text-gray-700 leading-relaxed">
          <p><strong>Publication Decisions:</strong></p>
          <p>
            The editor is responsible for deciding which articles submitted to the journal should 
            be published. The editor may be guided by the policies of the journal's editorial 
            board and constrained by legal requirements regarding libel, copyright infringement, 
            and plagiarism.
          </p>

          <p><strong>Fair Play:</strong></p>
          <p>
            Manuscripts shall be evaluated solely on their intellectual merit, without regard to 
            the authors' race, gender, sexual orientation, religious belief, ethnic origin, 
            citizenship, or political philosophy.
          </p>

          <p><strong>Confidentiality:</strong></p>
          <p>
            The editor and editorial staff must not disclose any information about a submitted 
            manuscript to anyone other than the corresponding author, reviewers, potential 
            reviewers, other editorial advisers, and the publisher.
          </p>

          <p><strong>Disclosure and Conflicts of Interest:</strong></p>
          <p>
            Unpublished materials disclosed in a submitted manuscript must not be used by editors 
            for their own research without the express written consent of the author. Editors 
            should recuse themselves from considering manuscripts in which they have conflicts of 
            interest.
          </p>

          <p><strong>Involvement and Cooperation in Investigations:</strong></p>
          <p>
            The editor should take responsive measures when ethical complaints have been presented 
            concerning a submitted manuscript or published paper. Such measures will generally 
            include contacting the author and giving due consideration to the complaint.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Research Misconduct</h2>
        <div className="space-y-3 text-gray-700 leading-relaxed">
          <p>
            Research misconduct includes but is not limited to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Plagiarism: Using others' work without proper attribution</li>
            <li>Fabrication: Making up data or results</li>
            <li>Falsification: Manipulating research materials, equipment, or processes</li>
            <li>Duplicate submission: Submitting the same manuscript to multiple journals</li>
            <li>Duplicate publication: Publishing the same research in multiple journals</li>
            <li>Improper authorship: Not giving credit to contributors or including non-contributors</li>
          </ul>
          <p>
            Any suspected cases of research misconduct will be investigated thoroughly. If 
            misconduct is confirmed, appropriate action will be taken, including rejection of the 
            manuscript, retraction of published articles, and notification of the author's 
            institution.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Complaints and Appeals</h2>
        <div className="space-y-3 text-gray-700 leading-relaxed">
          <p>
            Authors who wish to appeal an editorial decision should contact the Editor-in-Chief 
            at sadullayev.siroje@gmail.com with a detailed explanation of their concerns.
          </p>
          <p>
            Complaints about ethical issues should be sent to the same address. All complaints 
            will be investigated thoroughly and handled confidentially.
          </p>
        </div>
      </section>
    </main>
  );
}
