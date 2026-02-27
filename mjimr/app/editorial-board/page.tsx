export default function EditorialBoardPage() {
  const editors = [
    {
      name: "Editor-in-Chief Name",
      title: "Professor of Medicine",
      affiliation: "University Name",
      country: "Country"
    },
    {
      name: "Associate Editor Name",
      title: "Associate Professor",
      affiliation: "Medical School Name",
      country: "Country"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Editorial Board</h1>
      
      <div className="space-y-6">
        {editors.map((editor, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{editor.name}</h3>
            <p className="text-gray-600">{editor.title}</p>
            <p className="text-gray-600">{editor.affiliation}</p>
            <p className="text-gray-500 text-sm mt-2">{editor.country}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded">
        <p className="text-gray-700">
          <strong>Note:</strong> Editorial board members will be added as the journal develops.
        </p>
      </div>
    </div>
  )
}
