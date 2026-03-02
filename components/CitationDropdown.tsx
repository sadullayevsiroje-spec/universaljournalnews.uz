'use client';

type CitationProps = {
  authors: string[];
  title: string;
  year: number;
  volume: number;
  issue: number;
  pages?: string | number;
  doi?: string;
  slug: string;
};

export default function CitationDropdown({ authors, title, year, volume, issue, pages, doi, slug }: CitationProps) {
  const pagesStr = pages?.toString() || "";
  
  return (
    <section className="mb-8 bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
        <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        How to Cite
      </h2>
      
      <div className="space-y-4">
        {/* APA Format - Always Visible */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
            <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs mr-2">APA</span>
            American Psychological Association
          </h3>
          <p className="text-sm text-gray-800 font-mono bg-white p-3 rounded border border-gray-300 break-words">
            {authors.join(", ")} ({year}). {title}. <em>Universal Journal News</em>, {volume}({issue}){pagesStr ? `, ${pagesStr}` : ""}. {doi ? `https://doi.org/${doi}` : `https://universaljournalnews.uz/articles/${slug}`}
          </p>
        </div>

        {/* Other Formats - Dropdown */}
        <details className="bg-gray-50 rounded-lg border border-gray-200">
          <summary className="cursor-pointer p-4 font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition flex items-center justify-between">
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              Other Citation Formats
            </span>
            <span className="text-xs text-gray-500">Click to expand</span>
          </summary>
          
          <div className="p-4 pt-2 space-y-4">
            {/* MLA Format */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                <span className="bg-green-600 text-white px-2 py-1 rounded text-xs mr-2">MLA</span>
                Modern Language Association
              </h3>
              <p className="text-sm text-gray-800 font-mono bg-gray-50 p-3 rounded border border-gray-300 break-words">
                {authors.join(", ")}. "{title}." <em>Universal Journal News</em>, vol. {volume}, no. {issue}, {year}{pagesStr ? `, pp. ${pagesStr}` : ""}. {doi ? `doi:${doi}` : `universaljournalnews.uz/articles/${slug}`}.
              </p>
            </div>

            {/* Chicago Format */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs mr-2">Chicago</span>
                Chicago Manual of Style
              </h3>
              <p className="text-sm text-gray-800 font-mono bg-gray-50 p-3 rounded border border-gray-300 break-words">
                {authors.join(", ")}. "{title}." <em>Universal Journal News</em> {volume}, no. {issue} ({year}): {pagesStr}. {doi ? `https://doi.org/${doi}` : `https://universaljournalnews.uz/articles/${slug}`}.
              </p>
            </div>

            {/* BibTeX Format */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                <span className="bg-orange-600 text-white px-2 py-1 rounded text-xs mr-2">BibTeX</span>
                For LaTeX Users
              </h3>
              <pre className="text-xs text-gray-800 font-mono bg-gray-50 p-3 rounded border border-gray-300 overflow-x-auto">
{`@article{${slug},
  title={${title}},
  author={${authors.join(" and ")}},
  journal={Universal Journal News},
  volume={${volume}},
  number={${issue}},
  pages={${pagesStr}},
  year={${year}},${doi ? `\n  doi={${doi}},` : ""}
  url={https://universaljournalnews.uz/articles/${slug}}
}`}
              </pre>
            </div>

            {/* RIS Format */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                <span className="bg-red-600 text-white px-2 py-1 rounded text-xs mr-2">RIS</span>
                For Reference Managers (EndNote, Mendeley, Zotero)
              </h3>
              <pre className="text-xs text-gray-800 font-mono bg-gray-50 p-3 rounded border border-gray-300 overflow-x-auto">
{`TY  - JOUR
TI  - ${title}
${authors.map(author => `AU  - ${author}`).join("\n")}
JO  - Universal Journal News
VL  - ${volume}
IS  - ${issue}
SP  - ${pagesStr.split("-")[0] || ""}
EP  - ${pagesStr.split("-")[1] || ""}
PY  - ${year}${doi ? `\nDO  - ${doi}` : ""}
UR  - https://universaljournalnews.uz/articles/${slug}
ER  -`}
              </pre>
            </div>
          </div>
        </details>
      </div>
    </section>
  );
}
