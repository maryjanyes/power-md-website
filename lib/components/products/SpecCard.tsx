export function SpecCard({ icon: Icon, label, value }: any) {
  return (
    <div className="p-3 rounded-lg border border-border bg-card/40">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-3.5 h-3.5 text-primary" />
        <span className="text-[10px] font-mono text-muted-foreground tracking-wider">{label.toUpperCase()}</span>
      </div>
      <p className="text-sm font-heading font-semibold">{value}</p>
    </div>
  );
}
