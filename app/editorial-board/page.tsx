import Image from "next/image";

export default function EditorialBoardPage() {
  const editorInChief = {
    name: "Sadullayev Siroj Ernazarovich",
    title: "Assistant",
    affiliation: "Urgench State Medical Institute (Uzbekistan)",
    image: "/editorial-board/sadullayev.jpg",
  };

  const managingEditor = {
    name: "Otajanov Shamsiddin Zarifboyevich",
    title: "PhD, Senior Teacher",
    affiliation: "Urgench State Medical Institute (Uzbekistan)",
    image: "/editorial-board/otajanov.jpg",
  };

  const boardMembers = [
    {
      name: "Raxmatullayeva Shaxnoza Baxadirovna",
      title: "DSc, Associate Professor",
      affiliation: "Tashkent State Medical University (Uzbekistan)",
      image: "/editorial-board/raxmatullayeva.jpg",
    },
    {
      name: "Yusupov Shavkat Raximboyevich",
      title: "Candidate of Medical Sciences, Associate Professor",
      affiliation: "Urgench State Medical Institute (Uzbekistan)",
      image: "/editorial-board/yusupov-shavkat.jpg",
    },
    {
      name: "Ibraximova Hamida Rustamovna",
      title: "Candidate of Medical Sciences (PhD), Associate Professor",
      affiliation: "Urgench State Medical Institute (Uzbekistan)",
      image: "/editorial-board/ibraximova.jpg",
    },
    {
      name: "Masharipova Shoxista Sabirovna",
      title: "Candidate of Medical Sciences (PhD), Senior Teacher",
      affiliation: "Urgench State Medical Institute (Uzbekistan)",
      image: "/editorial-board/masharipova.jpg",
    },
    {
      name: "Yusupov Akmal Po'latovich",
      title: "Candidate of Medical Sciences (PhD), Senior Teacher",
      affiliation: "Alfraganus University (Uzbekistan)",
      image: "/editorial-board/yusupov-akmal.jpg",
    },
  ];

  const advisoryBoard = [
    {
      name: "Rujentsova Tatyana Aleksandrovna",
      title: "Deputy Director",
      affiliation:
        "FBUN Moscow Research Institute of Epidemiology and Microbiology named after G.N. Gabrichevsky (Russia)",
      image: "/editorial-board/rujentsova.jpg",
    },
  ];

  /* === BARCHA KARTOCHKALAR UCHUN BITTA KOMPONENT === */
  function PersonCard({
    name,
    title,
    affiliation,
    image,
  }: {
    name: string;
    title?: string;
    affiliation?: string;
    image?: string;
  }) {
    return (
      <div className="rounded-2xl border p-4 flex gap-4 items-start">
        {image && (
          <div className="relative w-32 h-32 flex-shrink-0">
            <Image
              src={image}
              alt={name}
              width={128}
              height={128}
              className="rounded-full object-cover w-full h-full"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          {/* MAJBURIY JIRNIY */}
          <strong className="block !font-extrabold text-gray-900">
            {name}
          </strong>

          {title && (
            <p className="text-sm text-gray-700 mt-1">{title}</p>
          )}

          {affiliation && (
            <p className="text-sm text-gray-600">{affiliation}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Editorial Board</h1>
        <p className="text-gray-600">
          Universal Journal News (UJN) tahririyati tarkibi: bosh muharrir,
          mas’ul kotib va tahrir hay’ati a’zolari.
        </p>
      </header>

      {/* Editor-in-Chief */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Editor-in-Chief</h2>
        <PersonCard {...editorInChief} />
      </section>

      {/* Managing Editor */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          Managing Editor (Mas’ul kotib)
        </h2>
        <PersonCard {...managingEditor} />
      </section>

      {/* Editorial Board Members */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Editorial Board Members</h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {boardMembers.map((m) => (
            <li key={m.name}>
              <PersonCard {...m} />
            </li>
          ))}
        </ul>
      </section>

      {/* International Advisory Board */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">International Advisory Board</h2>
        <ul className="space-y-3">
          {advisoryBoard.map((m) => (
            <li key={m.name}>
              <PersonCard {...m} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
