import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: { year: string; volume: string; issue: string } }
): Promise<Metadata> {
  const { year, volume, issue } = params;

  const journalTitle = "Universal Journal News";
  const issn = "1234-5678";

  return {
    title: `Issue ${issue} - Volume ${volume} - ${year} | ${journalTitle}`,
    other: {
      citation_journal_title: journalTitle,
      citation_issn: issn,
      citation_volume: String(volume),
      citation_issue: String(issue)
    }
  };
}

export default function IssuePage({ params }: { params: { year: string; volume: string; issue: string } }) {
  const { year, volume, issue } = params;

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">Issue {issue} - Volume {volume} - {year}</h1>
      <p className="text-gray-600 mt-2">Published: 2026-01-15</p>
    </main>
  );
}



