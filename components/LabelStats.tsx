export function LabelStats() {
  const stats = [
    { label: 'Artiesten', value: '3+', note: 'in de Abra family' },
    { label: 'Tracks', value: '10+', note: 'uitgebracht op Spotify' },
    { label: 'Streams', value: '50K+', note: 'en groeiende' },
  ];

  return (
    <section className="label-stats" aria-label="Abra Entertainment in cijfers">
      <div className="label-stats-inner">
        {stats.map((stat) => (
          <div key={stat.label} className="label-stat-card">
            <div className="label-stat-value">{stat.value}</div>
            <div className="label-stat-label">{stat.label}</div>
            <div className="label-stat-note">{stat.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

