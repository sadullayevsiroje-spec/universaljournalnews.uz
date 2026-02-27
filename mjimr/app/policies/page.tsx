export default function PoliciesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Journal Policies</h1>
      
      <div className="prose max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Open Access Policy</h2>
          <p className="text-gray-700">
            This journal provides immediate open access to its content on the principle that making 
            research freely available to the public supports a greater global exchange of knowledge.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Copyright and Licensing</h2>
          <p className="text-gray-700 mb-4">
            Authors retain copyright of their work. Articles are published under Creative Commons 
            Attribution License (CC BY 4.0), which permits unrestricted use, distribution, and 
            reproduction in any medium, provided the original work is properly cited.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Peer Review Policy</h2>
          <p className="text-gray-700 mb-4">
            All manuscripts submitted to this journal undergo rigorous double-blind peer review. 
            At least two independent reviewers evaluate each submission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Plagiarism Policy</h2>
          <p className="text-gray-700 mb-4">
            All submissions are screened for plagiarism using appropriate software. Manuscripts 
            with significant similarity to published work will be rejected.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Retraction Policy</h2>
          <p className="text-gray-700 mb-4">
            Articles may be retracted if there is clear evidence of unreliability, plagiarism, 
            ethical violations, or other serious misconduct.
          </p>
        </section>
      </div>
    </div>
  )
}
