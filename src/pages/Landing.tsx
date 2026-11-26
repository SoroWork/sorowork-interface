import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Briefcase,
  CheckCircle,
  Shield,
  Users,
  Trophy,
  Zap,
  Lock,
  Globe,
  Code,
  Wallet,
  DollarSign,
  Github,
  ArrowDown,
  Camera,
  MapPin,
  Wrench,
  Shovel,
  Hammer,
  Sparkles,
  Heart,
  HelpingHand,
} from 'lucide-react'
import { Logo } from '../components/Logo'
import { WalletButton } from '../components/WalletButton'

export function Landing() {
  return (
    <div className="min-h-screen bg-sorowork-navy text-white overflow-x-hidden">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-sorowork-navy/60 backdrop-blur-2xl border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/">
            <Logo size={30} />
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-[13px] text-white/50 font-medium">
            <a href="#how" className="hover:text-white transition-colors">How It Works</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#contracts" className="hover:text-white transition-colors">Architecture</a>
            <Link to="/discover" className="hover:text-white transition-colors">Find Work</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              to="/discover"
              className="hidden sm:inline-flex items-center gap-1.5 text-[13px] font-medium text-white/60 hover:text-white transition-colors"
            >
              Launch App <ArrowRight size={13} />
            </Link>
            <WalletButton />
          </div>
        </div>
      </header>

      {/* ==================== HERO — asymmetric split ==================== */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute top-20 -left-40 w-[500px] h-[500px] bg-sorowork-purple/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-20 -right-40 w-[400px] h-[400px] bg-sorowork-blue/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          {/* Left — text */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sorowork-purple/25 bg-sorowork-purple/5 text-xs text-sorowork-purple-light font-medium mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-sorowork-purple-light animate-pulse" />
              Live on Stellar Testnet
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold leading-[1.05] tracking-tight">
              Do the work.
              <br />
              <span className="relative">
                <span className="bg-gradient-to-r from-sorowork-purple via-sorowork-purple-light to-sorowork-blue bg-clip-text text-transparent">
                  Prove it.
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                  <path d="M1 6C40 2 80 2 100 4C120 6 160 2 199 5" stroke="url(#underline-grad)" strokeWidth="2.5" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="underline-grad" x1="0" y1="0" x2="200" y2="0">
                      <stop stopColor="#6c47ff" />
                      <stop offset="1" stopColor="#00d4ff" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <br />
              Get paid.
            </h1>

            <p className="mt-7 text-base sm:text-lg text-white/50 max-w-md leading-relaxed">
              SoroWork connects communities with workers for real-world tasks — cleaning, repairs, landscaping, maintenance.
              USDC is locked in escrow before work begins. Submit proof, get approved, payment settles in seconds.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/discover"
                className="group inline-flex items-center gap-2.5 bg-white text-sorowork-navy font-semibold px-7 py-3.5 rounded-xl hover:bg-white/90 transition-colors"
              >
                Find Community Work
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors px-4 py-3.5"
              >
                Post a Task
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="mt-14 flex items-center gap-6 text-xs text-white/30">
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-sorowork-purple-light/60" />
                Non-custodial
              </div>
              <div className="flex items-center gap-2">
                <Lock size={14} className="text-sorowork-purple-light/60" />
                Escrow-backed
              </div>
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-sorowork-purple-light/60" />
                Instant settlement
              </div>
            </div>
          </div>

          {/* Right — community task card stack */}
          <div className="relative hidden lg:block">
            <div className="absolute -top-6 -right-4 w-72 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 rotate-3 blur-[1px] opacity-60">
              <div className="h-3 w-24 bg-white/10 rounded mb-3" />
              <div className="h-2 w-full bg-white/5 rounded mb-2" />
              <div className="h-2 w-3/4 bg-white/5 rounded" />
            </div>

            {/* Main task card */}
            <div className="relative bg-sorowork-navy-card border border-white/10 rounded-2xl p-6 shadow-2xl shadow-sorowork-purple/10">
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] font-semibold tracking-widest uppercase text-green-400 bg-green-400/10 px-2 py-0.5 rounded border border-green-400/20">Open</span>
                <span className="text-sorowork-blue font-bold text-lg">150.00 USDC</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Clean up Riverside Park — trash &amp; debris removal</h3>
              <p className="text-sm text-white/50 mb-4 leading-relaxed">
                Remove litter, debris, and overgrown weeds from the main trail and picnic areas. Must submit before/after photos as proof of work.
              </p>
              <div className="flex gap-2 mb-5">
                {['Cleaning', 'Outdoors', 'Community'].map((t) => (
                  <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/5 text-white/50 border border-white/[0.06]">{t}</span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-[10px] font-bold">RC</div>
                  <span className="text-xs text-white/50">riverside_council</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-white/30">
                  <MapPin size={10} />
                  Riverside District
                </div>
              </div>
            </div>

            {/* Submission card overlapping */}
            <div className="absolute -bottom-10 -left-6 w-64 bg-sorowork-navy-card border border-sorowork-purple/20 rounded-xl p-4 shadow-xl shadow-sorowork-purple/10">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <span className="text-xs font-medium text-yellow-400/80">Work Submitted</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-[9px] font-bold">JM</div>
                <span className="text-xs text-white/70">james_m</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-sorowork-blue">
                <Camera size={11} />
                <span>4 photos uploaded · before/after</span>
              </div>
            </div>

            {/* Payment notification */}
            <div className="absolute -top-12 left-8 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2 flex items-center gap-2 animate-fade-in">
              <CheckCircle size={14} className="text-green-400" />
              <span className="text-xs text-green-300 font-medium">150 USDC released to worker</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20">
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <ArrowDown size={14} className="animate-bounce" />
        </div>
      </section>

      {/* ==================== STATS BAR ==================== */}
      <section className="border-y border-white/[0.04] bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-y-4">
          {[
            { value: '500+', label: 'Tasks Completed', icon: Briefcase },
            { value: '1,200+', label: 'Community Workers', icon: Users },
            { value: '$85K+', label: 'USDC Paid Out', icon: DollarSign },
            { value: '40+', label: 'Communities', icon: Globe },
          ].map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon size={16} className="text-white/20" />
              <div>
                <span className="text-lg sm:text-xl font-bold">{value}</span>
                <span className="text-xs text-white/30 ml-2">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section id="how" className="py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <span className="text-xs font-mono text-sorowork-purple-light tracking-widest">// HOW_IT_WORKS</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2">Post. Work. Get Paid.</h2>
            <p className="text-white/40 mt-3 max-w-lg text-sm">
              Community leaders post tasks with guaranteed payment. Workers complete them, submit proof, and get paid instantly. No middlemen.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6 items-start">
            {[
              {
                num: '01',
                title: 'Community posts a task',
                desc: 'Describe the work needed — a park cleanup, pothole repair, fence painting — and deposit USDC into escrow. Workers know the payment is guaranteed.',
                code: 'create_task(community, usdc, 150)',
                accent: 'border-violet-500/30',
                dot: 'bg-violet-400',
              },
              {
                num: '02',
                title: 'Worker completes the job',
                desc: 'Find a task in your area, do the work, and submit evidence — photos, video, or any proof that the job is done.',
                code: 'submit_work(task_id, photo_hash)',
                accent: 'border-blue-500/30',
                dot: 'bg-blue-400',
              },
              {
                num: '03',
                title: 'Approve → instant payment',
                desc: 'The task poster reviews the evidence and approves. Escrow releases USDC directly to the worker\'s wallet. Done.',
                code: 'approve_work(task_id) → transfer()',
                accent: 'border-emerald-500/30',
                dot: 'bg-emerald-400',
              },
            ].map(({ num, title, desc, code, accent, dot }, i) => (
              <div key={num} className={`lg:col-span-1 ${i === 0 ? 'lg:col-start-1' : ''}`}>
                <div className={`border ${accent} bg-white/[0.015] rounded-2xl p-5 h-full`}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-2 h-2 rounded-full ${dot}`} />
                    <span className="text-[11px] font-mono text-white/30">{num}</span>
                  </div>
                  <h3 className="font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed mb-4">{desc}</p>
                  <div className="bg-sorowork-navy rounded-lg px-3 py-2 font-mono text-xs text-sorowork-blue/70 border border-white/[0.04]">
                    <span className="text-white/20">$ </span>{code}
                  </div>
                </div>
              </div>
            ))}

            {/* Terminal visualization */}
            <div className="lg:col-span-2 bg-sorowork-navy border border-white/[0.06] rounded-2xl overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                <span className="ml-3 text-[10px] text-white/30 font-mono">sorowork-escrow — task lifecycle</span>
              </div>
              <div className="p-5 font-mono text-xs leading-6 overflow-x-auto">
                <div className="text-white/30">// Community leader posts a cleanup task</div>
                <div><span className="text-violet-400">→</span> <span className="text-sorowork-blue">create_bounty</span>(</div>
                <div className="pl-4"><span className="text-white/40">creator:</span> <span className="text-emerald-400">riverside_council</span>,</div>
                <div className="pl-4"><span className="text-white/40">reward:</span> <span className="text-yellow-300">150 USDC</span>,</div>
                <div className="pl-4"><span className="text-white/40">task:</span> <span className="text-emerald-400">"Park cleanup"</span></div>
                <div>)</div>
                <div className="text-green-400/60 mt-1">✓ 150 USDC locked in escrow</div>
                <div className="mt-3 text-white/30">// Worker submits proof photos</div>
                <div><span className="text-blue-400">→</span> <span className="text-sorowork-blue">submit_work</span>(</div>
                <div className="pl-4"><span className="text-white/40">worker:</span> <span className="text-emerald-400">james_m</span>,</div>
                <div className="pl-4"><span className="text-white/40">evidence:</span> <span className="text-emerald-400">"4 before/after photos"</span></div>
                <div>)</div>
                <div className="mt-3 text-white/30">// Council approves → instant pay</div>
                <div><span className="text-emerald-400">→</span> <span className="text-sorowork-blue">approve_work</span>(task_42)</div>
                <div className="text-green-400/60">✓ 150 USDC released to james_m</div>
                <div className="text-green-400/60">✓ Contribution recorded on-chain</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== WHAT KIND OF WORK ==================== */}
      <section className="py-20 px-4 border-y border-white/[0.04] bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-mono text-white/30 tracking-widest text-center mb-10">COMMUNITY WORK CATEGORIES</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Cleaning', icon: Sparkles, color: 'text-blue-400' },
              { label: 'Road Repair', icon: Wrench, color: 'text-orange-400' },
              { label: 'Landscaping', icon: Shovel, color: 'text-green-400' },
              { label: 'Painting', icon: Hammer, color: 'text-pink-400' },
              { label: 'Maintenance', icon: Wrench, color: 'text-yellow-400' },
              { label: 'Volunteering', icon: Heart, color: 'text-red-400' },
            ].map(({ label, icon: Icon, color }) => (
              <div key={label} className="text-center bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 hover:border-white/10 transition-colors">
                <Icon size={22} className={`${color} mx-auto mb-2`} />
                <p className="text-sm font-medium text-white/70">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURES — bento grid ==================== */}
      <section id="features" className="py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <span className="text-xs font-mono text-sorowork-blue tracking-widest">// FEATURES</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2">Trustless payments for community work</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Large feature — escrow */}
            <div className="sm:col-span-2 bg-gradient-to-br from-violet-500/[0.08] to-transparent border border-violet-500/15 rounded-2xl p-7 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/[0.06] rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-violet-500/10 transition-colors duration-700" />
              <div className="relative z-10">
                <Lock size={24} className="text-violet-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Guaranteed Payment</h3>
                <p className="text-sm text-white/50 leading-relaxed max-w-md">
                  When a community posts a task, the USDC reward is locked in a Soroban smart contract immediately.
                  Workers know the money is there before they pick up a shovel.
                  No chasing payments. No broken promises.
                </p>
                <div className="mt-5 flex gap-3 text-xs font-mono text-white/30">
                  <span className="bg-white/5 px-2 py-1 rounded">escrow_lock()</span>
                  <span className="bg-white/5 px-2 py-1 rounded">approve_work()</span>
                  <span className="bg-white/5 px-2 py-1 rounded">release_funds()</span>
                </div>
              </div>
            </div>

            {/* Non-custodial */}
            <div className="border border-white/[0.06] bg-white/[0.015] rounded-2xl p-6 group hover:border-sorowork-blue/20 transition-colors">
              <Wallet size={20} className="text-sorowork-blue mb-4" />
              <h3 className="font-semibold mb-2">Your Wallet, Your Money</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Connect with Freighter. No bank accounts, no payment apps. USDC goes straight to your Stellar wallet when work is approved.
              </p>
            </div>

            {/* Proof of work */}
            <div className="border border-white/[0.06] bg-white/[0.015] rounded-2xl p-6 group hover:border-emerald-500/20 transition-colors">
              <Camera size={20} className="text-emerald-400 mb-4" />
              <h3 className="font-semibold mb-2">Photo & Video Proof</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Submit before-and-after photos, video walkthroughs, or any evidence of completed work. Every submission is hashed and recorded permanently on-chain.
              </p>
            </div>

            {/* Community treasury */}
            <div className="sm:col-span-2 lg:col-span-1 bg-gradient-to-br from-sorowork-blue/[0.06] to-transparent border border-sorowork-blue/15 rounded-2xl p-6 group">
              <Users size={20} className="text-sorowork-blue mb-4" />
              <h3 className="font-semibold mb-2">Community Treasuries</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Neighborhoods, councils, and groups pool funds in a shared treasury. The admin distributes rewards for completed community tasks — transparently, on-chain.
              </p>
            </div>

            {/* Reputation */}
            <div className="border border-white/[0.06] bg-white/[0.015] rounded-2xl p-6 group hover:border-yellow-500/20 transition-colors">
              <Trophy size={20} className="text-yellow-400 mb-4" />
              <h3 className="font-semibold mb-2">Worker Reputation</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Every approved task earns reputation points. Build your track record, climb the leaderboard, and become a trusted community worker.
              </p>
            </div>

            {/* Instant settlement */}
            <div className="border border-white/[0.06] bg-white/[0.015] rounded-2xl p-6 group hover:border-sorowork-purple/20 transition-colors">
              <Zap size={20} className="text-sorowork-purple-light mb-4" />
              <h3 className="font-semibold mb-2">Instant USDC Payments</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                No invoices, no waiting weeks, no payment processors taking a cut. USDC settles on Stellar in seconds with sub-cent fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOR WHOM — offset cards ==================== */}
      <section className="py-28 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sorowork-purple/[0.02] to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Communities / Task Posters */}
            <div className="relative">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-sorowork-purple/20 to-transparent" />
              <div className="relative bg-sorowork-navy-card rounded-2xl p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-sorowork-purple/20 flex items-center justify-center">
                    <MapPin size={16} className="text-sorowork-purple-light" />
                  </div>
                  <span className="text-xs font-mono text-sorowork-purple-light tracking-wider">FOR_COMMUNITIES</span>
                </div>
                <h3 className="text-2xl font-bold mb-5">Get community work done</h3>
                <div className="space-y-3">
                  {[
                    'Post cleanup, repair, or maintenance tasks',
                    'USDC is locked in escrow — workers trust the payment',
                    'Review submitted proof photos and videos',
                    'One-click approve → worker gets paid instantly',
                    'Pool funds in a community treasury for ongoing work',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-white/60">
                      <CheckCircle size={15} className="text-sorowork-purple-light mt-0.5 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 mt-7 text-sm font-medium text-sorowork-purple-light hover:text-white transition-colors"
                >
                  Start posting tasks <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Workers — offset down */}
            <div className="relative lg:mt-12">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-sorowork-blue/20 to-transparent" />
              <div className="relative bg-sorowork-navy-card rounded-2xl p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-sorowork-blue/20 flex items-center justify-center">
                    <HelpingHand size={16} className="text-sorowork-blue" />
                  </div>
                  <span className="text-xs font-mono text-sorowork-blue tracking-wider">FOR_WORKERS</span>
                </div>
                <h3 className="text-2xl font-bold mb-5">Earn USDC for real work</h3>
                <div className="space-y-3">
                  {[
                    'Browse community tasks in your area',
                    'Complete the job — cleaning, repairs, landscaping',
                    'Submit photo/video proof of your work',
                    'Get paid the moment your work is approved',
                    'Build a verifiable on-chain work history',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-white/60">
                      <CheckCircle size={15} className="text-sorowork-blue mt-0.5 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <Link
                  to="/discover"
                  className="inline-flex items-center gap-2 mt-7 text-sm font-medium text-sorowork-blue hover:text-white transition-colors"
                >
                  Find work near you <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CONTRACTS — architecture strip ==================== */}
      <section id="contracts" className="py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <span className="text-xs font-mono text-sorowork-purple-light tracking-widest">// ARCHITECTURE</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2">Three contracts. One workflow.</h2>
            <p className="text-white/40 mt-3 max-w-lg text-sm">
              Soroban smart contracts handle payment escrow, community funds, and permanent work records — so nobody has to trust anybody.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-violet-500/40 via-blue-500/40 to-emerald-500/40 hidden sm:block" />

            <div className="space-y-6">
              {[
                {
                  name: 'Bounty Escrow',
                  desc: 'Locks USDC when a task is posted. Releases payment to the worker on approval, or refunds the community if cancelled. Every action requires wallet authorization.',
                  funcs: ['create_bounty', 'assign_contributor', 'submit_work', 'approve_work', 'refund_bounty'],
                  color: 'border-l-violet-500',
                  dotColor: 'bg-violet-400',
                  states: 'Open → Assigned → Submitted → Approved | Cancelled',
                },
                {
                  name: 'Community Treasury',
                  desc: 'A shared fund for neighborhoods and groups. Anyone can contribute; only the admin distributes — with a reason attached to every payment.',
                  funcs: ['initialize', 'deposit', 'distribute', 'get_balance', 'get_admin'],
                  color: 'border-l-blue-500',
                  dotColor: 'bg-blue-400',
                  states: 'Deposit → Distribute (admin only)',
                },
                {
                  name: 'Contribution Registry',
                  desc: 'A permanent on-chain record of every completed task — who did it, what evidence was submitted, when, and how much they earned. Workers own their history.',
                  funcs: ['record_contribution', 'get_contribution', 'get_all_contributions'],
                  color: 'border-l-emerald-500',
                  dotColor: 'bg-emerald-400',
                  states: 'Write (escrow only) → Read (public)',
                },
              ].map(({ name, desc, funcs, color, dotColor, states }) => (
                <div key={name} className={`relative bg-white/[0.015] border border-white/[0.06] border-l-2 ${color} rounded-xl p-6 sm:pl-14`}>
                  <div className={`absolute left-[18px] top-7 w-3.5 h-3.5 rounded-full ${dotColor} border-2 border-sorowork-navy hidden sm:block`} />
                  <h3 className="font-bold text-lg mb-1">{name}</h3>
                  <p className="text-sm text-white/50 mb-4">{desc}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {funcs.map((f) => (
                      <span key={f} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/40 border border-white/[0.04]">{f}()</span>
                    ))}
                  </div>
                  <p className="text-[11px] font-mono text-white/25">{states}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ECOSYSTEM ==================== */}
      <section className="border-y border-white/[0.04] bg-white/[0.01] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-mono text-white/30 tracking-widest text-center mb-10">POWERED BY</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Stellar', desc: 'Fast, low-cost blockchain', icon: Globe },
              { name: 'Soroban', desc: 'Rust smart contracts', icon: Code },
              { name: 'Freighter', desc: 'Non-custodial wallet', icon: Wallet },
              { name: 'USDC', desc: 'Dollar-pegged stablecoin', icon: DollarSign },
            ].map(({ name, desc, icon: Icon }) => (
              <div key={name} className="text-center">
                <Icon size={22} className="text-white/20 mx-auto mb-3" />
                <p className="font-semibold text-sm">{name}</p>
                <p className="text-[11px] text-white/30 mt-0.5">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-sorowork-purple/[0.04] to-transparent pointer-events-none" />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <Logo size={48} showText={false} className="justify-center mb-8" />
          <h2 className="text-3xl sm:text-5xl font-bold leading-tight">
            Your community needs work done.
            <br />
            <span className="text-white/40">Pay for it trustlessly.</span>
          </h2>
          <p className="mt-5 text-white/40 max-w-md mx-auto">
            Whether you're a neighborhood council posting tasks or a worker ready to earn — SoroWork makes community work pay.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/discover"
              className="group inline-flex items-center gap-2.5 bg-white text-sorowork-navy font-semibold px-8 py-4 rounded-xl hover:bg-white/90 transition-colors"
            >
              Launch App
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="https://github.com/SoroWork"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors px-4 py-4"
            >
              <Github size={16} />
              View Source
            </a>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="border-t border-white/[0.04] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <Logo size={28} className="mb-4" />
              <p className="text-xs text-white/30 leading-relaxed max-w-[200px]">
                Community work, paid trustlessly. Post tasks, submit proof, earn USDC — all on Stellar.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">Platform</h4>
              <ul className="space-y-2.5 text-sm text-white/30">
                <li><Link to="/discover" className="hover:text-white transition-colors">Find Work</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link to="/communities" className="hover:text-white transition-colors">Communities</Link></li>
                <li><Link to="/leaderboard" className="hover:text-white transition-colors">Leaderboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">Source</h4>
              <ul className="space-y-2.5 text-sm text-white/30">
                <li><a href="https://github.com/SoroWork/sorowork-contracts" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contracts</a></li>
                <li><a href="https://github.com/SoroWork/sorowork-backend" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Backend</a></li>
                <li><a href="https://github.com/SoroWork/sorowork-interface" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Interface</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">Ecosystem</h4>
              <ul className="space-y-2.5 text-sm text-white/30">
                <li><a href="https://stellar.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Stellar</a></li>
                <li><a href="https://www.freighter.app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Freighter</a></li>
                <li><a href="https://github.com/SoroWork" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-white/20">
            <p>&copy; {new Date().getFullYear()} SoroWork</p>
            <p className="font-mono">community work, paid trustlessly</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
