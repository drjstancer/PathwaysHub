import Link from 'next/link';

export default function Home() {
  return (
    <main className="page">
      <section className="hero">
        <div>
          <div className="eyebrow">Office of Community, Professional Proficiency & Student Success</div>
          <h1>One ecosystem. Two connected workspaces.</h1>
          <p>PSMS manages participant success operations. PathwaysHub turns the shared longitudinal record into CQI, comparisons, outcomes, and leadership intelligence.</p>
        </div>
      </section>

      <div className="grid two">
        <section className="card">
          <span className="pill">Operational System</span>
          <h2>PSMS</h2>
          <p className="subtle">Participants, programs, requirements, attendance, support meetings, academics, experiences, alerts, interventions, and follow-up.</p>
          <Link className="button" href="/psms">Open PSMS</Link>
        </section>
        <section className="card">
          <span className="pill">Analytics + CQI</span>
          <h2>PathwaysHub</h2>
          <p className="subtle">Longitudinal journeys, cohort and program comparisons, matriculation, residency outcomes, CQI metrics, and executive reporting.</p>
          <Link className="button" href="/hub">Open PathwaysHub</Link>
        </section>
      </div>

      <h2 className="section-title">Connected data flow</h2>
      <div className="flow">
        <div className="node">Student / Staff Input</div><div className="arrow">→</div>
        <div className="node">PSMS Operational Record</div><div className="arrow">→</div>
        <div className="node">Shared Participant Backbone</div><div className="arrow">→</div>
        <div className="node">PathwaysHub Analytics & Outcomes</div>
      </div>

      <h2 className="section-title">Governance rule</h2>
      <div className="notice"><strong>Enter once, use many times.</strong> PathwaysHub does not duplicate attendance, advising, requirement, or intervention entry. It consumes the shared record and curated analytical views.</div>
    </main>
  );
}
