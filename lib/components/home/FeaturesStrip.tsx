import { Shield, Truck, Headphones } from 'lucide-react';

const features = [
  { icon: Shield, label: 'ГАРАНТІЯ', desc: 'До 5 років' },
  { icon: Truck, label: 'ДОСТАВКА', desc: 'Безкоштовна від 10 000 грн.' },
  { icon: Headphones, label: 'ПІДТРИМКА', desc: 'Підтримка 24/7' },
];

export default function FeaturesStrip() {
  return (
    <section className="border-y border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
          {features.map(f => (
            <div key={f.label} className="py-8 sm:py-10 px-4 sm:px-8 text-center">
              <f.icon className="w-5 h-5 text-primary mx-auto mb-3" />
              <p className="text-xs font-mono tracking-[0.2em] text-foreground font-medium mb-1">{f.label}</p>
              <p className="text-xs font-mono text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}