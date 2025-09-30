import React, { useMemo, useState, useEffect } from "react";

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`scroll-mt-24 py-16 md:py-24 ${className}`}>{children}</section>
);

const H2 = ({ children, kicker }) => (
  <div className="max-w-4xl mx-auto text-center">
    {kicker && <p className="uppercase tracking-widest text-xs font-semibold text-emerald-400/80 mb-2">{kicker}</p>}
    <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-white drop-shadow-[0_0_20px_rgba(16,185,129,0.15)]">{children}</h2>
  </div>
);

const Kbd = ({ children }) => (
  <kbd className="px-2 py-1 rounded border border-white/10 bg-white/5 text-xs font-mono">{children || "—"}</kbd>
);

const SafeImage = ({ src, alt, className, width, height, loading = "lazy" }) => {
  const [index, setIndex] = React.useState(0);
  const [error, setError] = React.useState(false);
  const sources = Array.isArray(src) ? src : [src];
  if (!sources.length) return null;
  if (error) {
    return (
      <div className={`grid place-items-center text-white/60 text-xs ${className || ''}`} aria-label={alt || 'Image not found'}>
        {alt || 'Image not found'}
      </div>
    );
  }
  return (
    <img
      src={sources[index]}
      alt={alt || ''}
      className={className}
      width={width}
      height={height}
      loading={loading}
      onError={() => {
        if (index + 1 < sources.length) setIndex(index + 1);
        else setError(true);
      }}
    />
  );
};

const tiers = [
  { label: "Slots 1–55", mult: 1, base: { basic: 22.22, pro: 44.44, prem: 227.77 } },
  { label: "Slots 56–99 (+5%)", mult: 1.05, base: { basic: 22.22, pro: 44.44, prem: 227.77 } },
  { label: "Slots 100–150 (+11%)", mult: 1.11, base: { basic: 22.22, pro: 44.44, prem: 227.77 } },
  { label: "Slots 151–199 (+22%)", mult: 1.22, base: { basic: 22.22, pro: 44.44, prem: 227.77 } },
  { label: "Slots 200–255 (+33%)", mult: 1.33, base: { basic: 22.22, pro: 44.44, prem: 227.77 } },
];

function price(mult, v) { return (mult * v).toFixed(2); }

function useFakeSlots() {
  const [slot, setSlot] = useState(37);
  useEffect(() => {
    const t = setInterval(() => setSlot((s) => (s < 252 ? s + Math.floor(Math.random() * 2) : s)), 4500);
    return () => clearInterval(t);
  }, []);
  return slot;
}

const Feature = ({ title, desc, icon }) => (
  <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:bg-white/10 transition">
    <div className="flex items-center gap-3 mb-3">
      <div className="h-10 w-10 rounded-xl bg-emerald-400/10 grid place-items-center ring-1 ring-emerald-400/20">
        {icon}
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
    </div>
    <p className="text-white/80 leading-relaxed">{desc}</p>
  </div>
);

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full text-left px-5 py-4 bg-white/5 hover:bg-white/10 transition flex items-center justify-between">
        <span className="font-semibold">{q}</span>
        <span className="text-white/60">{open ? "–" : "+"}</span>
      </button>
      {open && <div className="px-5 pb-5 text-white/80 leading-relaxed">{a}</div>}
    </div>
  );
};

function TestKbd() {
  return (
    <div className="hidden">
      <Kbd>iOS</Kbd>
      <Kbd>{null}</Kbd>
      <Kbd></Kbd>
      <Kbd>Android</Kbd>
    </div>
  );
}

export default function ArkosLanding() {
  const slot = useFakeSlots();
  const tierIndex = useMemo(() => {
    if (slot <= 55) return 0;
    if (slot <= 99) return 1;
    if (slot <= 150) return 2;
    if (slot <= 199) return 3;
    return 4;
  }, [slot]);
  const tier = tiers[tierIndex];

  return (
    <>
      <main className="min-h-screen text-white bg-[#07090B] relative">
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[50rem] w-[50rem] rounded-full blur-3xl opacity-20 bg-emerald-500/40"></div>
          <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-20 bg-cyan-500/30"></div>
        </div>

        <nav className="sticky top-0 z-20 backdrop-blur bg-[#07090B]/70 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
            <a href="#top" className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 grid place-items-center ring-2 ring-white/20 shadow-lg">
                <SafeImage src={"arkos-logo.png"} alt="Arkos Inari" width={28} height={28} />
              </div>
              <span className="font-extrabold tracking-tight">Arkos Inari</span>
            </a>
            <div className="hidden md:flex items-center gap-6 text-sm text-white/80">
              <a href="#features" className="hover:text-white">Features</a>
              <a href="#badges" className="hover:text-white">XP & Badges</a>
              <a href="#pricing" className="hover:text-white">Pricing</a>
              <a href="#faq" className="hover:text-white">FAQ</a>
              <a href="#community" className="hover:text-white">Community</a>
              <a href="#qa" className="hover:text-white">Q&A</a>
            </div>
            <div className="flex items-center gap-3">
              <a href="#join" className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm">Join Beta</a>
            </div>
          </div>
        </nav>

        <Section id="top" className="pt-12 md:pt-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="uppercase text-xs tracking-widest text-emerald-300/80 font-semibold">The code that rewires your reality</p>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] mt-3">
                Turn habits into XP. <span className="text-transparent bg-clip-text bg-gradient-to-tr from-emerald-400 to-cyan-300">Forge your destiny</span> with Arkos Inari.
              </h1>
              <p className="text-white/80 mt-5 leading-relaxed">
                A gamified life-achievement system: track habits, build streaks, earn badges (Bronze → Silver → Gold → Quantum), and mint your discipline into digital-physical relics. Designed for creators, entrepreneurs, students, and teams.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href="#join" className="px-5 py-3 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 font-semibold shadow hover:opacity-95">Get Early Access</a>
                <a href="#demo" className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20">Watch Demo</a>
                <div className="text-sm text-white/70">Current slot: <span className="font-semibold text-white">{slot}</span> • Tier: {tiers[tierIndex].label}</div>
              </div>
              <div className="mt-6 text-xs text-white/60 flex items-center gap-2">
                <Kbd>iOS</Kbd>
                <Kbd>Android</Kbd>
                <Kbd>PWA</Kbd>
                <span>• Built with Supabase, Stripe, n8n, Firebase push</span>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl bg-white/5 border border-white/10 p-3 overflow-hidden shadow-2xl">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#0b1f16] via-[#0a1221] to-[#071013] p-4 grid grid-cols-2 gap-4">
                  <div className="relative rounded-2xl bg-black/40 ring-1 ring-emerald-400/20 shadow-xl overflow-hidden">
                    <SafeImage src={"arkos-logo.png"} alt="Arkos Inari foxfire logo" className="w-full h-full object-contain p-6" loading="eager" />
                    <div className="pointer-events-none absolute inset-0 shadow-[0_0_80px_0_rgba(16,185,129,0.25)]" />
                  </div>
                  <div className="relative rounded-2xl bg-black/40 ring-1 ring-emerald-400/20 shadow-xl overflow-hidden">
                    <SafeImage src={"arkos-shield.png"} alt="Arkos Inari shield" className="w-full h-full object-cover object-center" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 p-3 text-sm">
                <p className="font-semibold">Discord is live</p>
                <a href="https://discord.gg/" className="text-emerald-300 underline underline-offset-4">Join the Foxfire</a>
              </div>
            </div>
          </div>
        </Section>

        <Section id="how" className="bg-white/5">
          <H2 kicker="How it works">From habit → XP → Badge → Relic</H2>
          <div className="max-w-6xl mx-auto px-4 md:px-8 grid md:grid-cols-4 gap-6 mt-10">
            {[{ t: 'Log habits', d: 'Choose your daily/weekly habits. Arkos tracks completion, weight, and frequency.' }, { t: 'Earn XP', d: 'Every completion adds XP. Bonus XP is one-quarter of the base task value.' }, { t: 'Unlock badges', d: 'Progress Bronze → Silver → Gold. Quantum requires 3×/week consistency for that badge.' }, { t: 'Mint relics', d: 'Long streaks (9–12 mo) can be minted as a physical-digital relic (QR-linked NFT).' }].map((s, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-[#0a0f12] p-6">
                <div className="text-2xl">{i === 0 ? '✅' : i === 1 ? '⚡' : i === 2 ? '🏅' : '🔗'}</div>
                <h3 className="mt-3 font-bold text-lg">{s.t}</h3>
                <p className="text-white/80 mt-2">{s.d}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="features">
          <H2 kicker="Features">Gamified systems that make momentum inevitable</H2>
          <div className="max-w-6xl mx-auto px-4 md:px-8 grid md:grid-cols-3 gap-6 mt-12">
            <Feature title="Streak Engine" desc="Weekly and daily streaks with numeric grading (e.g., 86%). Keeps you honest and motivated." icon={<span>🔥</span>} />
            <Feature title="XP Economy" desc="Task XP, bonus rules (¼ value), and slot-based pricing for early adopters. Level up your life." icon={<span>🎮</span>} />
            <Feature title="Quest Builder" desc="Turn goals into quests. Arkos guides onboarding with prompts that generate your personal blueprint." icon={<span>🗺️</span>} />
            <Feature title="Health Map" desc="Cardio, strength, sauna+meditation—earn category badges like Cardio King or Iron Warrior." icon={<span>💪</span>} />
            <Feature title="Finance Track" desc="Savings, trading, crypto—own dedicated badge families like Bull’s Oak Compounder’s Seal." icon={<span>📈</span>} />
            <Feature title="Relics" desc="After 9–12 months, mint your streak history into a silver bar with engraved QR → NFT." icon={<span>🪙</span>} />
            <Feature title="Push Notifications" desc="Firebase-powered nudges, streak saves, and daily ‘Mission Brief’ reminders." icon={<span>📳</span>} />
            <Feature title="Team/Youth Mode" desc="Arkos Inari EDU gamifies classwork and mentorship with dashboards & leaderboards." icon={<span>🏫</span>} />
            <Feature title="Integrations" desc="Supabase auth, Stripe billing, n8n automations, Telegram/Slack options." icon={<span>🧩</span>} />
          </div>
        </Section>

        <Section id="badges" className="bg-white/5">
          <H2 kicker="XP & Badges">Bronze → Silver → Gold → Quantum</H2>
          <div className="max-w-6xl mx-auto px-4 md:px-8 grid md:grid-cols-4 gap-6 mt-10">
            {[{ name: 'Code & Coffee', note: 'For builders who ship', icon: '☕' }, { name: 'Cardio King', note: 'Pace. Pulse. Progress.', icon: '🏃' }, { name: 'Shotel of Precision', note: 'Market discipline', icon: '🗡️' }, { name: 'Briefcase of Prosperity', note: '9-to-5 excellence', icon: '💼' }].map((b, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-[#0a0f12] p-6">
                <div className="text-3xl">{b.icon}</div>
                <h3 className="mt-3 font-bold">{b.name}</h3>
                <p className="text-white/70 text-sm">{b.note}</p>
                <ul className="mt-4 text-sm text-white/80 space-y-1">
                  <li>• Bronze: start the streak</li>
                  <li>• Silver: sustained consistency</li>
                  <li>• Gold: elite execution</li>
                  <li>• Quantum: 3×/week minimum</li>
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="pricing">
          <H2 kicker="Early Adopter Slots">Founders lock lifetime pricing</H2>
          <p className="text-center text-white/70 mt-3">Current slot <span className="font-semibold text-white">#{slot}</span> • {tier.label}</p>
          <div className="max-w-6xl mx-auto px-4 md:px-8 grid md:grid-cols-3 gap-6 mt-10">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-extrabold text-xl">Basic</h3>
              <p className="text-sm text-white/70">Core tracking • XP • Streaks</p>
              <p className="text-4xl font-black mt-4">${price(tier.mult, tier.base.basic)}<span className="text-base font-semibold text-white/70">/mo</span></p>
              <ul className="mt-4 space-y-2 text-white/80 text-sm">
                <li>• Habit & XP tracking</li>
                <li>• Weekly grade report</li>
                <li>• Core badges</li>
              </ul>
              <a href="#join" className="mt-6 inline-block px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20">Choose Basic</a>
            </div>
            <div className="rounded-3xl border-2 border-emerald-400/30 bg-gradient-to-b from-white/10 to-transparent p-6 shadow-xl">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-400/30 mb-2">Most Popular</div>
              <h3 className="font-extrabold text-xl">Pro</h3>
              <p className="text-sm text-white/70">Quests • Push • Advanced badges</p>
              <p className="text-4xl font-black mt-4">${price(tier.mult, tier.base.pro)}<span className="text-base font-semibold text-white/70">/mo</span></p>
              <ul className="mt-4 space-y-2 text-white/80 text-sm">
                <li>• Everything in Basic</li>
                <li>• Quest Generator + Health Map</li>
                <li>• Firebase push notifications</li>
              </ul>
              <a href="#join" className="mt-6 inline-block px-5 py-3 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 font-semibold">Choose Pro</a>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-extrabold text-xl">Premium</h3>
              <p className="text-sm text-white/70">Teams • EDU • Relic eligibility</p>
              <p className="text-4xl font-black mt-4">${price(tier.mult, tier.base.prem)}<span className="text-base font-semibold text-white/70">/mo</span></p>
              <ul className="mt-4 space-y-2 text-white/80 text-sm">
                <li>• Everything in Pro</li>
                <li>• Team/Youth dashboards</li>
                <li>• Relic mint eligibility (9–12 mo)</li>
              </ul>
              <a href="#join" className="mt-6 inline-block px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20">Choose Premium</a>
            </div>
          </div>
          <p className="text-center text-xs text-white/60 mt-3">Prices lock for life at your signup slot. Managed via Stripe. Taxes may apply.</p>
        </Section>

        <Section id="community" className="bg-white/5">
          <H2 kicker="Community">Join the Foxfire</H2>
          <div className="max-w-4xl mx-auto px-4 md:px-8 mt-8 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 bg-[#0a0f12] p-6">
              <h3 className="font-bold text-lg">Discord</h3>
              <p className="text-white/80 mt-2">Build in public, swap streak tips, share badge art, and join challenges.</p>
              <a className="inline-block mt-4 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20" href="https://discord.gg/">Join Discord</a>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#0a0f12] p-6">
              <h3 className="font-bold text-lg">Social</h3>
              <ul className="mt-3 space-y-2 text-white/80">
                <li>• X / Twitter: <a className="underline underline-offset-4" href="https://twitter.com/">@ArkosInari</a></li>
                <li>• Instagram: <a className="underline underline-offset-4" href="https://instagram.com/">@arkosinari</a></li>
                <li>• YouTube: <a className="underline underline-offset-4" href="https://youtube.com/">Arkos Inari</a></li>
                <li>• Substack: <a className="underline underline-offset-4" href="https://substack.com/">Arkos Inari Dispatch</a></li>
              </ul>
            </div>
          </div>
        </Section>

        <Section id="qa">
          <H2 kicker="Q & A">Founder’s Quick Answers</H2>
          <div className="max-w-4xl mx-auto px-4 md:px-8 mt-8 space-y-6">
            <FaqItem q="What makes Arkos different from habit apps?" a={<>
              Arkos converts your entire life into a <strong>coherent XP system</strong> with <em>badge families</em>, <em>weekly numeric grades</em>, and eventually <em>relics</em>. It’s not just tracking—it’s a hero’s journey.
            </>} />
            <FaqItem q="How do badges work?" a={<>
              Each category (health, finance, work, creativity, community) has badge families. You climb Bronze → Silver → Gold. <strong>Quantum</strong> requires 3×/week consistency for that badge to remain active.
            </>} />
            <FaqItem q="What’s the relic program?" a={<>
              After 9–12 months of consistent streaks, you can <strong>mint a physical-digital relic</strong> (e.g., a silver bar) engraved with a QR that links to your on-chain badge history.
            </>} />
            <FaqItem q="Do you support youth/teams?" a={<>
              Yes. <strong>Arkos Inari EDU</strong> gamifies classroom assignments with dashboards, streaks, and positive habit rewards.
            </>} />
          </div>
        </Section>

        <Section id="faq" className="bg-white/5">
          <H2 kicker="FAQ">Details & Logistics</H2>
          <div className="max-w-4xl mx-auto px-4 md:px-8 mt-8 space-y-4">
            <FaqItem q="Which platforms are supported?" a={<>iOS, Android (PWA), and web. Push notifications via Firebase on supported devices.</>} />
            <FaqItem q="How are prices determined?" a={<>
              Early adopters lock lifetime pricing based on their <em>signup slot</em> (1–255). See the pricing table above.
            </>} />
            <FaqItem q="How is XP calculated?" a={<>
              Each habit has a base XP value. <strong>Bonus XP</strong> for extra reps is worth <em>¼ of the base</em>.
            </>} />
            <FaqItem q="Refunds & cancellation?" a={<>
              Monthly subscriptions via Stripe. Cancel anytime from your account portal. Contact support if you need help.
            </>} />
            <FaqItem q="Do you integrate with Apple Health / Google Fit?" a={<>Not at launch. It’s on the roadmap as we validate core features with the beta cohort.</>} />
          </div>
        </Section>

        <Section id="join">
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <H2 kicker="Beta Access">Secure your slot</H2>
            <p className="text-white/80 mt-4">Your discipline deserves dividends. Join the founding 255 and shape Arkos with us.</p>
            <div className="mt-6 flex flex-col md:flex-row justify-center gap-3">
              <a className="px-6 py-3 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 font-semibold" href="#pricing">Choose a plan</a>
              <a className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20" href="https://forms.gle/">Request EDU/Team</a>
            </div>
            <p className="text-xs text-white/60 mt-4">By joining, you agree to our Terms & Privacy. A portion of proceeds supports EERC & NAAEA community programs.</p>
          </div>
        </Section>

        <footer className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid md:grid-cols-4 gap-8 text-sm">
            <div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-400 grid place-items-center">
                  <SafeImage src={"arkos-logo.png"} alt="Arkos Inari" width={24} height={24} />
                </div>
                <span className="font-extrabold">Arkos Inari</span>
              </div>
              <p className="text-white/70 mt-3">Myth • Mastery • Momentum</p>
              <p className="text-white/60 mt-2">© {new Date().getFullYear()} Arkos Inari. All rights reserved.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Product</p>
              <ul className="space-y-2 text-white/80">
                <li><a href="#features" className="hover:underline">Features</a></li>
                <li><a href="#pricing" className="hover:underline">Pricing</a></li>
                <li><a href="#faq" className="hover:underline">FAQ</a></li>
                <li><a href="#qa" className="hover:underline">Q&A</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Community</p>
              <ul className="space-y-2 text-white/80">
                <li><a href="https://discord.gg/" className="hover:underline">Discord</a></li>
                <li><a href="https://twitter.com/" className="hover:underline">X / Twitter</a></li>
                <li><a href="https://instagram.com/" className="hover:underline">Instagram</a></li>
                <li><a href="https://substack.com/" className="hover:underline">Substack</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Contact</p>
              <ul className="space-y-2 text-white/80">
                <li>Email: <a className="underline" href="mailto:hello@arkosinari.com">hello@arkosinari.com</a></li>
                <li>Business: Frozen Imagination AI Solutions</li>
                <li>Nonprofits: EERC • NAAEA</li>
              </ul>
            </div>
          </div>
        </footer>
      </main>
      <TestKbd />
    </>
  );
}

