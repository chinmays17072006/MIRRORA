import { useMemo, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Check,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Database,
  Download,
  Eye,
  FileText,
  Gauge,
  GitBranch,
  GitCompare,
  Info,
  LayoutDashboard,
  Menu,
  Network,
  Play,
  Radar,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  Timer,
  Users,
  X,
  Zap,
} from 'lucide-react'
import {
  accounts,
  alerts,
  computeMirrorScore,
  contributions,
  formatCurrency,
  riskTone,
  showcaseAccount,
  normalAccount,
  comparisonMetrics,
  stabilityTests,
  transactions,
  type Account,
  type FeatureId,
  type Transaction,
  type View,
} from './data'
import { CompareView, DemoOverlay, FormulaDrawer } from './CompareFeatures'

type SignalMap = Record<FeatureId, boolean>

const navItems: { id: View; label: string; icon: typeof LayoutDashboard; group: string }[] = [
  { id: 'command', label: 'Command Center', icon: LayoutDashboard, group: 'Workspace' },
  { id: 'network', label: 'Network Intelligence', icon: Network, group: 'Workspace' },
  { id: 'explain', label: 'Why Flagged?', icon: BrainCircuit, group: 'Workspace' },
  { id: 'mirror', label: 'Risk Mirror', icon: Radar, group: 'Challenge' },
  { id: 'stability', label: 'Explanation Stability', icon: Gauge, group: 'Challenge' },
  { id: 'compare', label: 'Compare Accounts', icon: GitCompare, group: 'Challenge' },
  { id: 'report', label: 'Investigation Report', icon: FileText, group: 'Output' },
  { id: 'explorer', label: 'Data Explorer', icon: Database, group: 'Output' },
]

const signalLabels: Record<FeatureId, string> = {
  passThrough: 'Rapid Pass-Through',
  concentration: 'Network Concentration',
  velocity: 'Transaction Velocity',
  dormant: 'Dormant Activation',
  counterparty: 'Counterparty Pattern',
}

function LogoMark() {
  return <div className="logo-mark" aria-label="MIRRORA logo"><span /><span /></div>
}

function Pill({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'critical' | 'high' | 'mint' | 'amber' }) {
  return <span className={`pill pill-${tone}`}>{children}</span>
}

function SectionLabel({ children, icon: Icon = Activity }: { children: ReactNode; icon?: typeof Activity }) {
  return <div className="section-label"><Icon size={13} strokeWidth={2.2} /><span>{children}</span></div>
}

function Button({ children, onClick, variant = 'secondary', icon, className = '', type = 'button' }: { children: ReactNode; onClick?: () => void; variant?: 'primary' | 'secondary' | 'ghost' | 'danger'; icon?: ReactNode; className?: string; type?: 'button' | 'submit' }) {
  return <button type={type} onClick={onClick} className={`btn btn-${variant} ${className}`}>{icon}{children}</button>
}

function ScoreRing({ score, small = false }: { score: number; small?: boolean }) {
  const tone = riskTone(score)
  return <div className={`score-ring score-ring-${tone} ${small ? 'score-ring-small' : ''}`} style={{ '--score': `${score * 3.6}deg` } as CSSProperties}>
    <div className="score-ring-inner"><strong>{score}</strong><span>/ 100</span></div>
  </div>
}

function Sparkline({ color = '#9ef2d0', bars = [22, 32, 27, 46, 39, 62, 52, 76, 69, 94] }: { color?: string; bars?: number[] }) {
  return <div className="sparkline" aria-hidden="true">{bars.map((height, index) => <span key={index} style={{ height: `${height}%`, background: color }} />)}</div>
}

function Landing({ onLaunch, onExplore, onHow }: { onLaunch: () => void; onExplore: () => void; onHow: () => void }) {
  return <div className="landing-page">
    <div className="landing-grid" />
    <header className="landing-header">
      <div className="brand-lockup"><LogoMark /><div><strong>MIRRORA</strong><span>Mule Intelligence & Risk Recognition Analytics</span></div></div>
      <div className="landing-meta"><span className="live-dot" /> SYNTHETIC DEMO ENVIRONMENT <span className="mono">v0.9.4</span></div>
    </header>
    <main className="landing-main">
      <div className="landing-copy">
        <div className="eyebrow"><span>FINANCIAL NETWORK INTELLIGENCE</span><i /></div>
        <h1>Financial risk<br /><em>should never be</em><br />a black box.</h1>
        <p className="landing-lede">MIRRORA turns suspicious transaction patterns into an investigation trail that teams can inspect, challenge, and defend.</p>
        <div className="landing-actions">
          <Button variant="primary" icon={<Play size={15} fill="currentColor" />} onClick={onLaunch}>Launch demo</Button>
          <Button variant="ghost" icon={<Network size={16} />} onClick={onExplore}>Explore network</Button>
          <button className="text-button" onClick={onHow}>How MIRRORA works <ArrowRight size={14} /></button>
        </div>
        <div className="landing-note"><ShieldCheck size={15} /><span>Synthetic data only. Built for human review — not automated verdicts.</span></div>
      </div>
      <div className="landing-visual">
        <div className="orbit orbit-one" /><div className="orbit orbit-two" />
        <div className="hero-node hero-node-main"><span>ACC-1042</span><strong>91</strong><small>CRITICAL</small></div>
        <div className="hero-node hero-node-a"><span>ACC-2281</span><strong>43</strong></div>
        <div className="hero-node hero-node-b"><span>ACC-2911</span><strong>82</strong></div>
        <div className="hero-node hero-node-c"><span>ACC-7712</span><strong>76</strong></div>
        <div className="hero-node hero-node-d"><span>ACC-5021</span><strong>67</strong></div>
        <svg className="hero-lines" viewBox="0 0 620 580" aria-hidden="true">
          <path d="M305 284 L150 158 M319 264 L472 118 M329 304 L493 370 M273 326 L165 438" />
          <path d="M472 118 L493 370 L412 460" />
        </svg>
        <div className="visual-caption"><span className="signal-line" /> <span>SHOWCASE NETWORK / 01</span><strong>Detect → Explain → Challenge</strong></div>
      </div>
    </main>
    <section className="landing-features" id="how-it-works">
      {[
        { n: '01', title: 'DETECT', text: 'Discover suspicious financial networks before they disappear into a spreadsheet.', icon: Radar },
        { n: '02', title: 'EXPLAIN', text: 'Trace every model signal back to real synthetic transactions and network structure.', icon: BrainCircuit },
        { n: '03', title: 'CHALLENGE', text: 'Test whether the assessment survives when individual evidence is removed.', icon: SlidersHorizontal },
      ].map(({ n, title, text, icon: Icon }) => <div className="feature-card" key={title}><span className="feature-number">{n}</span><Icon size={18} /><h3>{title}</h3><p>{text}</p><span className="feature-arrow"><ArrowDownRight size={15} /></span></div>)}
    </section>
    <footer className="landing-footer"><span>© 2026 MIRRORA LABS</span><span>DETECT · EXPLAIN · CHALLENGE · VALIDATE · INVESTIGATE</span><span>Prototype / Synthetic Dataset</span></footer>
  </div>
}

function Sidebar({ view, onNavigate, onLaunch, collapsed, onToggle }: { view: View; onNavigate: (view: View) => void; onLaunch: () => void; collapsed: boolean; onToggle: () => void }) {
  return <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
    <div className="sidebar-top"><div className="brand-lockup"><LogoMark /><div><strong>MIRRORA</strong><span>Network intelligence</span></div></div><button className="sidebar-toggle" onClick={onToggle}><Menu size={17} /></button></div>
    <Button variant="primary" className="demo-button" icon={<Play size={14} fill="currentColor" />} onClick={onLaunch}>Launch Demo</Button>
    <nav className="sidebar-nav">{(['Workspace', 'Challenge', 'Output'] as const).map((group) => <div key={group} className="nav-group"><span className="nav-group-label">{group}</span>{navItems.filter((item) => item.group === group).map(({ id, label, icon: Icon }) => <button key={id} className={`nav-item ${view === id ? 'nav-item-active' : ''}`} onClick={() => onNavigate(id)} title={label}><Icon size={17} /><span>{label}</span>{view === id && <i />}</button>)}</div>)}</nav>
    <div className="sidebar-bottom"><div className="system-status"><span className="live-dot" /><div><strong>Prototype engine online</strong><small>Local synthetic data layer</small></div></div><div className="sidebar-disclaimer">MIRRORA identifies suspicious patterns and supports investigation. It does not establish fraud or criminal activity.</div></div>
  </aside>
}

function Topbar({ view, onBack, onAnalyst, analystOpen }: { view: View; onBack: () => void; onAnalyst: () => void; analystOpen: boolean }) {
  const title = navItems.find((item) => item.id === view)?.label ?? 'Command Center'
  return <header className="topbar"><div className="topbar-left"><button className="mobile-back" onClick={onBack}><ChevronRight size={16} /></button><div><span className="breadcrumbs">MIRRORA / WORKSPACE /</span><strong>{title.toUpperCase()}</strong></div></div><div className="topbar-right"><div className="topbar-status"><span className="live-dot" /> Live synthetic workspace</div><span className="topbar-disclaimer">Synthetic data · pattern support, not fraud verdicts</span><button className={`analyst-button ${analystOpen ? 'active' : ''}`} onClick={onAnalyst}><Sparkles size={15} /> MIRRORA Analyst</button><div className="avatar">AM</div></div></header>
}

function KpiCard({ label, value, detail, icon: Icon, accent = 'mint', spark }: { label: string; value: string; detail: string; icon: typeof Activity; accent?: string; spark?: number[] }) {
  return <div className={`kpi-card kpi-${accent}`}><div className="kpi-top"><span>{label}</span><Icon size={16} /></div><div className="kpi-value">{value}</div><div className="kpi-bottom"><span>{detail}</span>{spark && <Sparkline bars={spark} />}</div></div>
}

function RiskOverview() {
  const bars = [52, 48, 61, 45, 68, 64, 82, 58, 73, 91, 66, 77, 60, 84, 71, 88, 79, 93, 72, 69, 81, 75, 90, 94]
  return <div className="overview-chart"><div className="chart-grid-lines"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div><div className="chart-bars">{bars.map((height, i) => <div className={`chart-bar ${i > 16 ? 'bar-hot' : ''}`} key={i} style={{ height: `${height}%` }}><i /></div>)}</div><div className="chart-xlabels"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>Now</span></div></div>
}

function CommandCenter({ onNavigate, onSelectAlert, onDemo, onFormula, reviewCount }: { onNavigate: (view: View) => void; onSelectAlert: (id: string) => void; onDemo: () => void; onFormula: () => void; reviewCount: number }) {
  return <div className="view-stack command-view">
    <div className="page-heading"><div><SectionLabel icon={Activity}>Live monitoring / 23 Oct 2026</SectionLabel><h1>Command Center</h1><p>One workspace for finding signal in the flow of funds.</p></div><div className="heading-actions"><Button variant="secondary" icon={<BrainCircuit size={15} />} onClick={onFormula}>View scoring formula</Button><Button variant="secondary" icon={<Download size={15} />} onClick={() => window.print()}>Export snapshot</Button><Button variant="primary" icon={<Play size={14} fill="currentColor" />} onClick={onDemo}>Start 3-min demo</Button></div></div>
    <div className="kpi-grid"><KpiCard label="Accounts analyzed" value="12,840" detail="+8.4% vs last window" icon={Users} spark={[30, 45, 42, 62, 55, 70, 66, 80, 86]} /><KpiCard label="High-risk networks" value="37" detail="9 require priority review" icon={Network} accent="lavender" spark={[42, 38, 55, 49, 64, 62, 72, 77, 84]} /><KpiCard label="Accounts flagged" value="184" detail="12 new in last 24h" icon={AlertTriangle} accent="amber" spark={[35, 41, 37, 54, 49, 64, 61, 74, 78]} /><KpiCard label="Critical networks" value="9" detail="3 opened this hour" icon={Radar} accent="coral" spark={[35, 29, 41, 36, 50, 45, 61, 55, 67]} /><KpiCard label="Average risk" value="31.8" detail="Within expected range" icon={Gauge} accent="blue" spark={[63, 58, 61, 57, 60, 53, 55, 48, 51]} /></div>
    <div className="command-grid"><section className="panel panel-overview"><div className="panel-heading"><div><SectionLabel icon={BarChart3}>Network risk overview</SectionLabel><h2>Signal activity across the synthetic network</h2></div><div className="legend"><span><i className="legend-dot mint" />Normal</span><span><i className="legend-dot amber" />Review</span><span><i className="legend-dot coral" />Critical</span></div></div><RiskOverview /><div className="overview-footer"><div><span className="big-stat">9</span><span>critical<br />networks</span></div><div><span className="big-stat">31.8</span><span>average<br />risk</span></div><div><span className="big-stat">2.4m</span><span>median<br />review time</span></div><button onClick={() => onNavigate('network')}>Open network intelligence <ArrowRight size={15} /></button></div></section><section className="panel signal-panel"><div className="panel-heading"><div><SectionLabel icon={Radar}>Live signal mix</SectionLabel><h2>What the engine is seeing</h2></div><span className="tiny-badge">PROTOTYPE</span></div><div className="signal-list">{contributions.map((item) => <div className="signal-row" key={item.id}><div className="signal-row-name"><span className="signal-icon" style={{ background: item.color }} />{item.label}<span className="signal-count">{item.value}%</span></div><div className="signal-track"><span style={{ width: `${item.value * 2.5}%`, background: item.color }} /></div></div>)}</div><div className="signal-callout"><Info size={15} /><span>Signals are transparent feature contributions calculated from synthetic transaction behavior.</span></div></section></div>
    <div className="command-insights"><div className="why-matters"><div className="section-label"><Sparkles size={13} /><span>Why this matters</span></div><strong>Make the reasoning defensible.</strong><span>MIRRORA is not claiming a novel algorithm. Its innovation is the integrated investigation workflow: detect, explain, challenge, validate, investigate.</span><button onClick={() => onNavigate('compare')}>Compare with a normal account <ArrowRight size={14} /></button></div><div className="review-queue-card"><ClipboardCheck size={18} /><div><span>Human review queue</span><strong>{reviewCount} account{reviewCount === 1 ? '' : 's'} queued</strong></div><button onClick={() => onNavigate('network')}>Open queue <ChevronRight size={14} /></button></div></div><section className="panel alerts-panel"><div className="panel-heading"><div><SectionLabel icon={AlertTriangle}>Recent alerts</SectionLabel><h2>Prioritized for human review</h2></div><button className="link-button" onClick={() => onNavigate('explorer')}>View all activity <ArrowRight size={14} /></button></div><div className="table-wrap"><table><thead><tr><th>Account</th><th>Risk score</th><th>Network size</th><th>Primary signal</th><th>Status</th><th /></tr></thead><tbody>{alerts.map((alert) => <tr key={alert.id} className="clickable-row" onClick={() => onSelectAlert(alert.id)}><td><div className="account-cell"><span className={`account-dot ${riskTone(alert.risk)}`} /><div><strong>{alert.id}</strong><small>{alert.note}</small></div></div></td><td><strong className="mono score-text">{alert.risk}</strong><div className="mini-progress"><span style={{ width: `${alert.risk}%` }} /></div></td><td className="muted-cell">{alert.size}</td><td>{alert.signal}</td><td><Pill tone={alert.status === 'Critical' ? 'critical' : alert.status === 'High' ? 'high' : 'amber'}>{alert.status}</Pill></td><td><button className="row-action" onClick={(event) => { event.stopPropagation(); onSelectAlert(alert.id) }}>Investigate <ChevronRight size={14} /></button></td></tr>)}</tbody></table></div></section>
  </div>
}

function NetworkSvg({ graphAccounts, graphTransactions, activeFeature, selectedTx, selectedAccountId, onSelectAccount, onSelectTx }: { graphAccounts: Account[]; graphTransactions: Transaction[]; activeFeature: FeatureId | null; selectedTx: string | null; selectedAccountId: string; onSelectAccount: (account: Account) => void; onSelectTx: (tx: Transaction) => void }) {
  const visibleTransactions = graphTransactions.filter((tx) => graphAccounts.some((account) => account.id === tx.sender) && graphAccounts.some((account) => account.id === tx.receiver))
  const position = (id: string) => graphAccounts.find((account) => account.id === id) ?? graphAccounts[0]
  return <div className="network-canvas"><div className="network-caption"><span className="network-live"><i /> PATHFINDING LIVE</span><span className="mono">{graphAccounts.length} nodes / {visibleTransactions.length} edges / 3 hops</span></div><svg viewBox="0 0 820 520" role="img" aria-label="Synthetic transaction network">
    <defs><marker id="arrow-mint" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#9ef2d0" /></marker><marker id="arrow-muted" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#3b4b60" /></marker></defs>
    <g className="network-grid"><path d="M0 100 H820 M0 200 H820 M0 300 H820 M0 400 H820" /><path d="M120 0 V520 M280 0 V520 M440 0 V520 M600 0 V520 M760 0 V520" /></g>
    {visibleTransactions.map((tx, edgeIndex) => { const from = position(tx.sender); const to = position(tx.receiver); const active = selectedTx === tx.id || (activeFeature !== null && tx.highlight === activeFeature); return <g key={tx.id} className={`network-edge ${active ? 'network-edge-active' : ''}`} onClick={() => onSelectTx(tx)}><line x1={from.x} y1={from.y} x2={to.x} y2={to.y} markerEnd={active ? 'url(#arrow-mint)' : 'url(#arrow-muted)'} /><circle className="flow-particle" r={active ? 3 : 2} style={{ offsetPath: `path('M ${from.x} ${from.y} L ${to.x} ${to.y}')`, animationDelay: `${edgeIndex * -0.28}s` }} /><circle className="edge-hit" cx={(from.x + to.x) / 2} cy={(from.y + to.y) / 2} r="15" /></g> })}
    {graphAccounts.map((account) => { const selected = account.id === selectedAccountId; return <g key={account.id} className={`network-node network-node-${riskTone(account.risk)} ${selected ? 'network-node-selected' : ''}`} onClick={() => onSelectAccount(account)}><circle className="node-pulse" cx={account.x} cy={account.y} r={selected ? 28 : 21} /><circle className="node-circle" cx={account.x} cy={account.y} r={selected ? 19 : 14} /><text className="node-label" x={account.x} y={account.y + 36} textAnchor="middle">{account.id}</text><text className="node-score" x={account.x} y={account.y + 4} textAnchor="middle">{account.risk}</text></g> })}
  </svg><div className="network-legend"><span><i className="legend-dot low" />Low</span><span><i className="legend-dot amber" />Review</span><span><i className="legend-dot high" />High</span><span><i className="legend-dot coral" />Critical</span></div></div>
}

function AccountPanel({ account, onExplain, onMirror, onQueue, queued }: { account: Account; onExplain: () => void; onMirror: () => void; onQueue: () => void; queued: boolean }) {
  const isShowcase = account.id === 'ACC-1042'
  return <section className="panel account-panel"><div className="account-panel-top"><div><SectionLabel icon={Target}>Selected account</SectionLabel><h2>{account.id}</h2><span className="account-type"><span className={`account-dot ${riskTone(account.risk)}`} />{account.type} · {isShowcase ? 'SHOWCASE SCENARIO' : 'NETWORK PEER'}</span></div><ScoreRing score={account.risk} small /></div><div className="account-status-row"><Pill tone={account.risk >= 85 ? 'critical' : account.risk >= 70 ? 'high' : 'amber'}>{account.risk >= 85 ? 'CRITICAL' : account.risk >= 70 ? 'HIGH' : 'REVIEW'}</Pill><span className="muted-cell">Prototype risk assessment</span><span className="confidence-chip"><ShieldCheck size={12} /> 87% evidence confidence</span></div><div className="metrics-grid"><div><span>Connections</span><strong>{isShowcase ? showcaseAccount.connections : account.connections}</strong></div><div><span>Incoming txns</span><strong>{isShowcase ? showcaseAccount.incoming : 12}</strong></div><div><span>Outgoing txns</span><strong>{isShowcase ? showcaseAccount.outgoing : 9}</strong></div><div><span>Pass-through</span><strong>{isShowcase ? `${showcaseAccount.passThrough}%` : '38%'}</strong></div><div><span>Avg hold time</span><strong>{isShowcase ? showcaseAccount.holding : '26 min'}</strong></div><div><span>Velocity change</span><strong>{isShowcase ? showcaseAccount.velocity : '+72%'}</strong></div></div>{isShowcase && <div className="dormancy-strip"><Timer size={15} /><div><span>DORMANCY → BURST</span><strong>17 days inactive before activity window</strong></div></div>}<div className="account-actions"><Button variant="secondary" onClick={onExplain} icon={<Eye size={15} />}>Why flagged?</Button><Button variant="primary" onClick={onMirror} icon={<SlidersHorizontal size={15} />}>Challenge score</Button></div><button className={`review-queue-button ${queued ? 'queued' : ''}`} onClick={onQueue}><ClipboardCheck size={14} /> {queued ? 'Queued for human review' : 'Add to human review queue'}</button></section>
}

function NetworkView({ selectedAccountId, setSelectedAccount, activeFeature, selectedTx, setSelectedTx, onNavigate, onQueue, reviewQueue }: { selectedAccountId: string; setSelectedAccount: (account: Account) => void; activeFeature: FeatureId | null; selectedTx: string | null; setSelectedTx: (tx: Transaction | null) => void; onNavigate: (view: View) => void; onQueue: (id: string) => void; reviewQueue: string[] }) {
  const [filter, setFilter] = useState('All')
  const [timeline, setTimeline] = useState(82)
  const selectedAccount = accounts.find((account) => account.id === selectedAccountId) ?? accounts[4]
  const activeTransaction = transactions.find((tx) => tx.id === selectedTx)
  const filteredTransactions = useMemo(() => {
    const byFilter = transactions.filter((tx) => {
      if (filter === 'High Risk') return accounts.some((account) => account.id === tx.sender && account.risk >= 70) || accounts.some((account) => account.id === tx.receiver && account.risk >= 70)
      if (filter === 'Critical') return tx.sender === 'ACC-1042' || tx.receiver === 'ACC-1042'
      if (filter === '1-hop') return tx.depth === 1
      if (filter === '2-hop') return tx.depth === 2
      if (filter === '3-hop') return tx.depth === 3
      return true
    })
    return byFilter.slice(0, Math.max(1, Math.round((timeline / 100) * byFilter.length)))
  }, [filter, timeline])
  const graphAccounts = accounts.filter((account) => account.id === selectedAccountId || filteredTransactions.some((tx) => tx.sender === account.id || tx.receiver === account.id))
  return <div className="view-stack"><div className="page-heading"><div><SectionLabel icon={Network}>Network intelligence / synthetic graph</SectionLabel><h1>Follow the money trail.</h1><p>Trace the account relationships that shaped the assessment.</p></div><div className="heading-actions"><Pill tone="mint"><span className="live-dot" /> Data layer healthy</Pill></div></div><div className="filter-bar"><div className="filter-tabs">{['All', 'High Risk', 'Critical', '1-hop', '2-hop', '3-hop'].map((item) => <button key={item} className={filter === item ? 'filter-active' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="timeline"><span>13:00</span><input type="range" min="0" max="100" value={timeline} onChange={(event) => setTimeline(Number(event.target.value))} /><span>Now</span><span className="timeline-value">{timeline}% window · {filteredTransactions.length} paths</span></div></div><div className="network-layout"><section className="panel network-panel"><NetworkSvg graphAccounts={graphAccounts} graphTransactions={filteredTransactions} activeFeature={activeFeature} selectedTx={selectedTx} selectedAccountId={selectedAccountId} onSelectAccount={setSelectedAccount} onSelectTx={setSelectedTx} /><div className="network-footer"><div><span className="network-stat-label">ACTIVE VIEW</span><strong>{filter === 'All' ? 'Full synthetic network' : filter}</strong></div><div><span className="network-stat-label">WINDOW</span><strong>13:00 — 14:35</strong></div><div><span className="network-stat-label">HIGHLIGHTED</span><strong>{activeTransaction ? activeTransaction.id : activeFeature ? signalLabels[activeFeature] : 'None'}</strong></div></div></section><div className="network-side"><AccountPanel account={selectedAccount} onExplain={() => onNavigate(selectedAccount.id === 'ACC-1042' ? 'explain' : 'network')} onMirror={() => onNavigate('mirror')} onQueue={() => onQueue(selectedAccount.id)} queued={reviewQueue.includes(selectedAccount.id)} />{activeTransaction && <section className="panel edge-card"><div className="edge-card-heading"><SectionLabel icon={GitBranch}>Selected transaction</SectionLabel><button onClick={() => setSelectedTx(null)}><X size={14} /></button></div><div className="edge-route"><span>{activeTransaction.sender}</span><ArrowRight size={16} /><span>{activeTransaction.receiver}</span></div><div className="edge-details"><div><span>Amount</span><strong>{formatCurrency(activeTransaction.amount)}</strong></div><div><span>Timestamp</span><strong>{activeTransaction.timestamp}</strong></div><div><span>Signal</span><strong>{activeTransaction.signal}</strong></div></div></section>}{!activeTransaction && <section className="network-tip"><Sparkles size={15} /><div><strong>Select a node or edge</strong><span>The graph is the evidence layer. Click a path to inspect the synthetic transaction behind it.</span></div></section>}</div></div></div>
}

function ExplainView({ activeFeature, setActiveFeature, onNavigate }: { activeFeature: FeatureId | null; setActiveFeature: (feature: FeatureId | null) => void; onNavigate: (view: View) => void }) {
  const selected = contributions.find((item) => item.id === activeFeature) ?? contributions[1]
  return <div className="view-stack"><div className="page-heading"><div><SectionLabel icon={BrainCircuit}>Explainability / feature contributions</SectionLabel><h1>Why did MIRRORA flag ACC-1042?</h1><p>Each contribution is tied to a visible pattern in the synthetic evidence layer.</p></div><div className="heading-actions"><Pill tone="critical">Critical · 91 / 100</Pill></div></div><div className="explain-grid"><section className="panel contributions-panel"><div className="panel-heading"><div><SectionLabel icon={BarChart3}>Feature contribution</SectionLabel><h2>What moved the score</h2></div><span className="tiny-badge">SHAP-STYLE / PROTOTYPE</span></div><div className="contribution-list">{contributions.map((item) => <button className={`contribution-row ${activeFeature === item.id ? 'contribution-active' : ''}`} key={item.id} onClick={() => setActiveFeature(activeFeature === item.id ? null : item.id)}><div className="contribution-top"><span className="contribution-title"><i style={{ background: item.color }} />{item.label}</span><strong>{item.value}%</strong></div><div className="contribution-track"><span style={{ width: `${item.value * 2.7}%`, background: item.color }} /></div><p>{item.description}</p></button>)}</div><div className="model-footnote"><Info size={15} /><span>Feature contributions are calculated transparently from synthetic behavior. They are not a scientifically validated fraud model.</span></div></section><section className="panel evidence-panel"><div className="panel-heading"><div><SectionLabel icon={Eye}>Evidence trail</SectionLabel><h2>{selected.label}</h2></div><Pill tone="mint">{selected.value}% contribution</Pill></div><div className="evidence-flow"><div><span className="flow-icon incoming">↓</span><strong>Received</strong><small>{selected.id === 'passThrough' ? 'Multiple counterparties' : 'Funds enter account'}</small></div><ArrowRight size={17} /><div><span className="flow-icon held">◷</span><strong>Held</strong><small>{selected.id === 'passThrough' ? '4.2 minutes avg.' : 'Short activity window'}</small></div><ArrowRight size={17} /><div><span className="flow-icon forwarded">↑</span><strong>Forwarded</strong><small>{selected.id === 'passThrough' ? '92% of incoming value' : 'To linked accounts'}</small></div></div><div className="evidence-list">{selected.evidence.map((line) => <div className="evidence-line" key={line}><span className="evidence-dot" /><span>{line}</span></div>)}</div><div className="evidence-quote">“{selected.description}”</div><div className="evidence-actions"><Button variant="secondary" onClick={() => onNavigate('network')} icon={<Network size={15} />}>View on network</Button><Button variant="primary" onClick={() => onNavigate('mirror')} icon={<SlidersHorizontal size={15} />}>Challenge this signal</Button></div></section></div><div className="explain-bottom"><div className="small-insight"><Sparkles size={16} /><div><strong>The score has a trace.</strong><span>Click any feature to move from model output to transaction evidence.</span></div></div><div className="explain-disclaimer"><ShieldCheck size={15} /> Suspicious pattern ≠ confirmed fraud. Human review remains the decision point.</div></div></div>
}

function MirrorView({ enabled, setEnabled, score, onNavigate }: { enabled: SignalMap; setEnabled: (map: SignalMap) => void; score: number; onNavigate: (view: View) => void }) {
  const disabled = (Object.keys(enabled) as FeatureId[]).filter((id) => !enabled[id])
  const delta = score - showcaseAccount.risk
  const toggle = (id: FeatureId) => setEnabled({ ...enabled, [id]: !enabled[id] })
  const explanation = disabled.length === 0 ? 'All five signals are active in the original assessment. Toggle a signal to challenge the reasoning and see exactly what changes.' : disabled.length >= 4 ? 'With the major signals removed, the residual score reflects only the prototype’s baseline context. This is a challenge scenario, not a new verdict.' : `Removing ${disabled.length === 1 ? signalLabels[disabled[0]].toLowerCase() : `${disabled.length} signals`} reduces the assessment by ${Math.abs(delta)} points because ${disabled.length === 1 ? 'it' : 'they'} contributed materially to the original pattern.`
  return <div className="view-stack mirror-view"><div className="page-heading"><div><SectionLabel icon={Radar}>Challenge / counterfactual analysis</SectionLabel><h1>Risk Mirror</h1><p>Challenge the AI’s reasoning. See what survives scrutiny.</p></div><div className="mirror-tag"><span className="mirror-glyph">◌</span>HUMAN-IN-THE-LOOP</div></div><div className="mirror-hero"><div className="mirror-main"><div className="mirror-intro"><span className="mono">ORIGINAL ASSESSMENT</span><h2>What if this evidence<br /><em>didn’t exist?</em></h2><p>Disable one or more signals to run a transparent counterfactual test against the same synthetic account.</p></div><div className="mirror-score-layout"><div className="mirror-score"><div className="score-label">CURRENT MIRROR SCORE</div><div className={`mirror-number ${score !== 91 ? 'mirror-number-changed' : ''}`}>{score}<span>/100</span></div><div className={`mirror-change ${delta === 0 ? 'neutral' : 'negative'}`}>{delta === 0 ? 'Original assessment' : `${delta} points vs original`}</div></div><div className="mirror-score-arrow"><ArrowRight size={22} /></div><div className="mirror-original"><span>ORIGINAL</span><strong>91</strong><small>CRITICAL</small></div></div><div className="mirror-explanation"><Sparkles size={17} /><span>{explanation}</span></div></div><div className="mirror-controls"><div className="panel-heading"><div><SectionLabel icon={SlidersHorizontal}>Signal controls</SectionLabel><h2>Challenge each assumption</h2></div><span className="tiny-badge">LIVE RECALCULATION</span></div><div className="toggle-list">{contributions.map((item) => <button key={item.id} className={`toggle-row ${enabled[item.id] ? 'toggle-on' : 'toggle-off'}`} onClick={() => toggle(item.id)}><span className="toggle-indicator">{enabled[item.id] ? <Check size={12} /> : <X size={12} />}</span><span className="toggle-copy"><strong>{item.label}</strong><small>{item.value}% contribution · calibrated score delta</small></span><span className="toggle-value">{enabled[item.id] ? 'Included' : 'Challenged'}</span></button>)}</div></div></div><div className="mirror-results"><div className="result-card"><span>BEFORE</span><strong>91</strong><small>Original assessment</small></div><div className="result-arrow"><ArrowRight size={20} /></div><div className="result-card result-after"><span>AFTER</span><strong>{score}</strong><small>With challenged evidence</small></div><div className="result-card result-change"><span>CHANGE</span><strong>{delta > 0 ? '+' : ''}{delta}</strong><small>Counterfactual delta</small></div><div className="mirror-insight"><div className="insight-title"><Sparkles size={15} /> MIRROR INSIGHT</div><p>{score >= 64 ? 'The account remains elevated-risk after challenging an individual signal. This indicates multiple independent signals contribute to the assessment.' : 'The score drops sharply when several signals are challenged. The original assessment is materially dependent on the selected evidence set.'}</p><button onClick={() => onNavigate('stability')}>Validate stability <ArrowRight size={14} /></button></div></div></div>
}

function StabilityView({ onNavigate }: { onNavigate: (view: View) => void }) {
  return <div className="view-stack"><div className="page-heading"><div><SectionLabel icon={Gauge}>Validation / stress testing</SectionLabel><h1>Explanation stability</h1><p>Does the model still reach a similar conclusion when individual evidence is challenged?</p></div><Pill tone="mint">Prototype metric</Pill></div><div className="stability-grid"><section className="panel stability-gauge-panel"><div className="gauge-wrap"><div className="stability-gauge"><div className="gauge-inner"><strong>87<span>%</span></strong><small>STABILITY</small></div></div><div className="gauge-labels"><span>0</span><span>50</span><span>100</span></div></div><div className="gauge-copy"><SectionLabel icon={ShieldCheck}>Prototype explanation stability metric</SectionLabel><h2>Supported by more than one signal.</h2><p>High stability means the risk assessment is supported by multiple signals rather than depending entirely on one feature.</p><div className="warning-note"><Info size={15} /><span>This 87% value is a prototype metric for demo purposes; it is not scientifically validated.</span></div></div></section><section className="panel stress-panel"><div className="panel-heading"><div><SectionLabel icon={Zap}>Automated stress tests</SectionLabel><h2>Challenge one signal at a time</h2></div><span className="tiny-badge">{stabilityTests.length} RUNS</span></div><div className="stress-list">{stabilityTests.map((test, index) => <div className="stress-row" key={test.label}><div className="stress-name"><span className="stress-index">0{index + 1}</span><span>{test.label}</span></div><div className="stress-track"><span style={{ width: `${test.value}%`, background: test.color }} /></div><strong>{test.value}</strong></div>)}</div><div className="stress-footer"><span><i className="legend-dot mint" />Original evidence</span><span><i className="legend-dot blue" />Challenged evidence</span></div></section></div><div className="stability-bottom"><div className="stability-callout"><Sparkles size={17} /><div><strong>What the stress test tells you</strong><span>Removing pass-through changes the score, but the account remains elevated because network structure and velocity independently contribute.</span></div></div><Button variant="primary" onClick={() => onNavigate('report')} icon={<FileText size={15} />}>Open investigation report</Button></div></div>
}

function ReportView({ score, enabled }: { score: number; enabled: SignalMap }) {
  return <div className="view-stack report-view"><div className="page-heading report-heading"><div><SectionLabel icon={FileText}>Investigation output / synthetic case file</SectionLabel><h1>MIRRORA Investigation Report</h1><p>Account <span className="mono">ACC-1042</span> · Generated 23 Oct 2026, 14:36 IST</p></div><Button variant="primary" onClick={() => window.print()} icon={<Download size={15} />}>Export report</Button></div><div className="report-paper"><div className="report-paper-header"><div className="brand-lockup"><LogoMark /><div><strong>MIRRORA</strong><span>Explainable financial network intelligence</span></div></div><div className="report-ref"><span>CASE REF</span><strong>MR-1042-23OCT</strong></div></div><div className="report-account-banner"><div><span className="report-kicker">ACCOUNT UNDER REVIEW</span><h2>ACC-1042</h2><span className="account-type"><span className="account-dot critical" />PERSONAL · SYNTHETIC SHOWCASE</span></div><div className="report-risk"><span>RISK SCORE</span><strong>91<small>/100</small></strong><Pill tone="critical">CRITICAL</Pill></div></div><div className="report-grid"><div className="report-section report-wide"><span className="report-section-number">01</span><div><h3>Executive summary</h3><p>ACC-1042 exhibits multiple unusual transaction patterns within the synthetic dataset. The strongest indicators are network concentration, rapid pass-through behavior, and abnormal transaction velocity. This assessment supports prioritization for human investigation; it does not establish fraud or criminal activity.</p></div></div><div className="report-section"><span className="report-section-number">02</span><div><h3>Network overview</h3><div className="report-metrics"><div><span>Connections</span><strong>14</strong></div><div><span>Network depth</span><strong>3 hops</strong></div><div><span>Incoming txns</span><strong>37</strong></div><div><span>Outgoing txns</span><strong>34</strong></div></div></div></div><div className="report-section"><span className="report-section-number">03</span><div><h3>Behavioral indicators</h3><ul className="report-list"><li>92% pass-through ratio</li><li>4.2-minute average holding time</li><li>+840% velocity change</li><li>17-day dormant period</li></ul></div></div><div className="report-section report-wide"><span className="report-section-number">04</span><div><h3>Key transactions</h3><div className="report-tx-list">{transactions.filter((tx) => tx.kind !== 'ambient').slice(0, 4).map((tx) => <div key={tx.id}><span className="mono">{tx.id}</span><span>{tx.sender} → {tx.receiver}</span><strong>{formatCurrency(tx.amount)}</strong><span>{tx.timestamp}</span></div>)}</div></div></div><div className="report-section"><span className="report-section-number">05</span><div><h3>Explainable AI evidence</h3><div className="report-bars">{contributions.map((item) => <div key={item.id}><span>{item.label}</span><div><i style={{ width: `${item.value * 2.5}%`, background: item.color }} /></div><strong>{item.value}%</strong></div>)}</div></div></div><div className="report-section"><span className="report-section-number">06</span><div><h3>Risk Mirror results</h3><div className="report-mirror"><div><span>Original</span><strong>91</strong></div><ArrowRight size={15} /><div><span>Challenged</span><strong>{score}</strong></div><span className="mono">{Object.values(enabled).filter(Boolean).length}/5 signals active</span></div></div></div><div className="report-section report-wide"><span className="report-section-number">07</span><div><h3>Explanation stability</h3><p><strong>87% prototype explanation stability metric.</strong> The assessment remains supported when individual evidence is challenged, indicating that network structure and transaction velocity independently contribute.</p></div></div><div className="report-section report-wide recommendation"><span className="report-section-number">08</span><div><h3>Recommended human review</h3><p>Prioritize this account for human investigation. Review the synthetic evidence trail, counterparties, and context surrounding the activity window before taking any action.</p></div><ShieldCheck size={24} /></div></div><div className="report-footer"><ShieldCheck size={15} /><span>MIRRORA identifies suspicious patterns and supports investigation. It does not establish fraud or criminal activity.</span><span className="mono">SYNTHETIC DATASET · PROTOTYPE</span></div></div></div>
}

function exportTransactionsCsv() {
  const header = 'Transaction ID,Sender,Receiver,Amount,Timestamp,Risk Signal,Network Depth'
  const rows = transactions.map((tx) => [tx.id, tx.sender, tx.receiver, tx.amount, tx.timestamp, `"${tx.signal}"`, tx.depth].join(','))
  const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'mirrora-synthetic-transactions.csv'
  anchor.click()
  URL.revokeObjectURL(url)
}

function ExplorerView({ onSelectTransaction, selectedTx }: { onSelectTransaction: (tx: Transaction) => void; selectedTx: string | null }) {
  const [query, setQuery] = useState('')
  const [riskFilter, setRiskFilter] = useState('All risk')
  const [amountFilter, setAmountFilter] = useState('All amounts')
  const [accountFilter, setAccountFilter] = useState('All accounts')
  const [dateFilter, setDateFilter] = useState('All dates')
  const filtered = useMemo(() => transactions.filter((tx) => `${tx.id} ${tx.sender} ${tx.receiver} ${tx.signal}`.toLowerCase().includes(query.toLowerCase())).filter((tx) => riskFilter === 'All risk' || (riskFilter === 'Signal' ? tx.highlight !== undefined : tx.kind === 'ambient')).filter((tx) => amountFilter === 'All amounts' || (amountFilter === '₹50k+' ? tx.amount >= 50000 : tx.amount < 50000)).filter((tx) => accountFilter === 'All accounts' || tx.sender === accountFilter || tx.receiver === accountFilter).filter((tx) => dateFilter === 'All dates' || (dateFilter === 'Burst window' ? tx.timestamp >= '14:00' : tx.timestamp < '14:00')), [query, riskFilter, amountFilter, accountFilter, dateFilter])
  return <div className="view-stack"><div className="page-heading"><div><SectionLabel icon={Database}>Synthetic data layer / {transactions.length} records</SectionLabel><h1>Data Explorer</h1><p>Inspect the transaction records behind the graph and explanations.</p></div><div className="heading-actions"><Pill tone="mint">Offline-ready</Pill><Button variant="secondary" icon={<Download size={14} />} onClick={exportTransactionsCsv}>Export CSV</Button></div></div><section className="panel explorer-panel"><div className="explorer-toolbar"><div className="search-box"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search transaction, sender, receiver…" /></div><select value={dateFilter} onChange={(event) => setDateFilter(event.target.value)}><option>All dates</option><option>Burst window</option><option>Before burst</option></select><select value={amountFilter} onChange={(event) => setAmountFilter(event.target.value)}><option>All amounts</option><option>₹50k+</option><option>Under ₹50k</option></select><select value={accountFilter} onChange={(event) => setAccountFilter(event.target.value)}><option>All accounts</option><option>ACC-1042</option><option>ACC-2911</option><option>ACC-7712</option></select><select value={riskFilter} onChange={(event) => setRiskFilter(event.target.value)}><option>All risk</option><option>Signal</option><option>Ambient</option></select></div><div className="table-wrap"><table><thead><tr><th>Transaction ID</th><th>Sender</th><th>Receiver</th><th>Amount</th><th>Timestamp</th><th>Risk signal</th><th>Depth</th></tr></thead><tbody>{filtered.map((tx) => <tr className={`clickable-row ${selectedTx === tx.id ? 'row-selected' : ''}`} key={tx.id} onClick={() => onSelectTransaction(tx)}><td className="mono tx-id">{tx.id}</td><td>{tx.sender}</td><td>{tx.receiver}</td><td className="mono">{formatCurrency(tx.amount)}</td><td className="mono muted-cell">{tx.timestamp}</td><td>{tx.kind === 'ambient' ? <span className="normal-signal">{tx.signal}</span> : <span className="risk-signal">{tx.signal}</span>}</td><td><span className="depth-chip">{tx.depth} hop</span></td></tr>)}</tbody></table></div><div className="explorer-footer"><span>Showing {filtered.length} of {transactions.length} synthetic transactions</span><span><Info size={14} /> Selecting a record highlights the corresponding graph edge.</span></div></section></div>
}

function Analyst({ onClose }: { onClose: () => void }) {
  const [question, setQuestion] = useState('What caused this account\'s risk score?')
  const questions = ["What caused this account's risk score?", 'What is the strongest evidence?', 'Which transactions contributed most?', 'What happens if pass-through behavior is removed?', 'How stable is the explanation?']
  const answer = question.includes('strongest') ? 'Rapid pass-through is the strongest single signal at 27% of the prototype feature contribution. ACC-1042 received ₹47,800 from ACC-2281 at 14:03 and forwarded ₹47,200 to ACC-2911 at 14:07 — a 4.2-minute hold.' : question.includes('transactions') ? 'The highest-signal records are TX-84012, TX-84016, TX-84013, and TX-84017. Together they show inbound value entering ACC-1042 and being forwarded within the same activity window.' : question.includes('pass-through') ? 'The mirror score moves from 91 to 64 when rapid pass-through is challenged. The account remains elevated because network concentration, velocity, counterparty pattern, and dormant activation remain active.' : question.includes('stable') ? 'The prototype explanation stability metric is 87%. In the stress test, removing velocity, network, pass-through, or dormancy changes the score, but the conclusion remains supported by multiple signals.' : 'The 91/100 prototype score is supported by five transparent feature contributions: network concentration (34%), rapid pass-through (27%), transaction velocity (21%), counterparty pattern (11%), and dormant activation (7%).'
  return <div className="analyst-drawer"><div className="analyst-header"><div><span className="analyst-orb"><Sparkles size={16} /></span><div><strong>MIRRORA Analyst</strong><small>Structured synthetic evidence only</small></div></div><button onClick={onClose}><X size={17} /></button></div><div className="analyst-context"><span className="live-dot" /> Context: <strong>ACC-1042</strong><span>·</span><span>Risk 91/100</span></div><div className="analyst-questions">{questions.map((item) => <button className={question === item ? 'selected' : ''} key={item} onClick={() => setQuestion(item)}>{item}<ChevronRight size={14} /></button>)}</div><div className="analyst-answer"><div className="answer-label"><Sparkles size={14} /> ANSWER FROM SYNTHETIC DATA</div><p>{answer}</p><div className="answer-source"><Database size={13} /> Source: MIRRORA showcase dataset / ACC-1042</div></div><div className="analyst-footer">No external LLM connected. Responses are predefined from the structured evidence layer to prevent hallucinated evidence.</div></div>
}

export default function App() {
  const [landing, setLanding] = useState(true)
  const [view, setView] = useState<View>('command')
  const [selectedAccountId, setSelectedAccountId] = useState('ACC-1042')
  const [activeFeature, setActiveFeature] = useState<FeatureId | null>('passThrough')
  const [selectedTx, setSelectedTx] = useState<string | null>(null)
  const [enabled, setEnabled] = useState<SignalMap>({ concentration: true, passThrough: true, velocity: true, counterparty: true, dormant: true })
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [analystOpen, setAnalystOpen] = useState(false)
  const [formulaOpen, setFormulaOpen] = useState(false)
  const [demoStep, setDemoStep] = useState<number | null>(null)
  const [reviewQueue, setReviewQueue] = useState<string[]>([])
  const score = computeMirrorScore(enabled)
  const selectedAccount = accounts.find((account) => account.id === selectedAccountId) ?? accounts[4]
  const launchDemo = () => { setLanding(false); setView('network'); setSelectedAccountId('ACC-1042'); setActiveFeature('passThrough'); setEnabled({ concentration: true, passThrough: true, velocity: true, counterparty: true, dormant: true }); setSelectedTx(null) }
  const navigate = (next: View) => { setLanding(false); setView(next); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const selectAlert = (id: string) => { setSelectedAccountId(id); navigate('network') }
  const selectAccount = (account: Account) => { setSelectedAccountId(account.id); setSelectedTx(null) }
  const queueAccount = (id: string) => setReviewQueue((queue) => queue.includes(id) ? queue : [...queue, id])
  const startDemo = () => { setLanding(false); setDemoStep(0); launchDemo() }
  const advanceDemo = () => setDemoStep((step) => step === null || step >= 4 ? null : step + 1)
  if (landing) return <Landing onLaunch={launchDemo} onExplore={() => navigate('network')} onHow={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} />
  return <div className="app-shell"><Sidebar view={view} onNavigate={navigate} onLaunch={launchDemo} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} /><main className="app-main"><Topbar view={view} onBack={() => setLanding(true)} onAnalyst={() => setAnalystOpen(!analystOpen)} analystOpen={analystOpen} /><div className="app-content">{view === 'command' && <CommandCenter onNavigate={navigate} onSelectAlert={selectAlert} onDemo={startDemo} onFormula={() => setFormulaOpen(true)} reviewCount={reviewQueue.length} />}{view === 'network' && <NetworkView selectedAccountId={selectedAccountId} setSelectedAccount={selectAccount} activeFeature={activeFeature} selectedTx={selectedTx} setSelectedTx={(tx) => setSelectedTx(tx ? tx.id : null)} onNavigate={navigate} onQueue={queueAccount} reviewQueue={reviewQueue} />}{view === 'explain' && <ExplainView activeFeature={activeFeature} setActiveFeature={setActiveFeature} onNavigate={navigate} />}{view === 'mirror' && <MirrorView enabled={enabled} setEnabled={setEnabled} score={score} onNavigate={navigate} />}{view === 'stability' && <StabilityView onNavigate={navigate} />}{view === 'compare' && <CompareView onNavigate={navigate} />}{view === 'report' && <ReportView score={score} enabled={enabled} />}{view === 'explorer' && <ExplorerView onSelectTransaction={(tx) => { setSelectedTx(tx.id); navigate('network') }} selectedTx={selectedTx} />}</div></main>{analystOpen && <Analyst onClose={() => setAnalystOpen(false)} />}{formulaOpen && <FormulaDrawer onClose={() => setFormulaOpen(false)} />}{demoStep !== null && <DemoOverlay step={demoStep} onNext={advanceDemo} onClose={() => setDemoStep(null)} onNavigate={(next) => { setDemoStep(null); navigate(next) }} />}</div>
}
