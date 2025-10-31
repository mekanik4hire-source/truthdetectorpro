const stats = [
  { value: "10M+", label: "Claims Verified" },
  { value: "98.5%", label: "Accuracy Rate" },
  { value: "150K+", label: "Active Users" },
  { value: "<3s", label: "Average Response Time" }
];

export default function Statistics() {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Trusted by Thousands</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Join the community fighting misinformation with data-driven verification
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center" data-testid={`stat-${index}`}>
              <div className="text-4xl font-bold font-mono mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
