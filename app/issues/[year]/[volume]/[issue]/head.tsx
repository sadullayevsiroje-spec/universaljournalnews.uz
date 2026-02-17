export default function Head({ params }: { params: { year: string; volume: string; issue: string } }) {
  const { year, volume, issue } = params;

  return (
    <>
      <title>{`Issue ${issue} • Volume ${volume} • ${year} | Universal Journal News`}</title>

      <meta name="citation_journal_title" content="Universal Journal News" />
      <meta name="citation_volume" content={String(volume)} />
      <meta name="citation_issue" content={String(issue)} />

      {/*
      ISSN bo'lsa aktiv qiling:
      <meta name="citation_issn" content="XXXX-XXXX" />
      */}
    </>
  );
}
