type LegalSection = {
  heading: string
  body: string
}

type LegalPageProps = {
  title: string
  updated: string
  sections: LegalSection[]
}

export const LegalPage = ({ title, updated, sections }: LegalPageProps) => (
  <div className="container animate-fade-in mx-auto flex max-w-180 flex-col gap-6">
    <div className="flex flex-col gap-1">
      <h1>{title}</h1>
      <span className="text-secondary text-sm">{updated}</span>
    </div>
    {sections.map((section) => (
      <section key={section.heading} className="flex flex-col gap-2">
        <h2 className="text-lg">{section.heading}</h2>
        <p className="whitespace-pre-line text-secondary">{section.body}</p>
      </section>
    ))}
  </div>
)
