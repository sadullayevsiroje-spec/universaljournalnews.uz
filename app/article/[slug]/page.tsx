"use client";

import { useEffect, useState } from "react";

type Article = {
  title: string;
  abstract: string | null;
  pdfUrl: string | null;
};

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<Article | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/article/${params.slug}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return r.json();
      })
      .then(setData)
      .catch((e) => setErr(e.message || "Error"));
  }, [params.slug]);

  if (err) return <div style={{ padding: 24 }}>Xatolik: {err}</div>;
  if (!data) return <div style={{ padding: 24 }}>Yuklanmoqda...</div>;

  return (
    <main style={{ padding: 24 }}>
      <h1>{data.title}</h1>
      {data.pdfUrl ? (
        <p>
          <a href={data.pdfUrl} target="_blank" rel="noreferrer">
            PDF
          </a>
        </p>
      ) : null}
      <p>{data.abstract ?? ""}</p>
    </main>
  );
}
