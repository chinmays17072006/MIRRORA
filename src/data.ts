export type View = 'command' | 'network' | 'explain' | 'mirror' | 'stability' | 'report' | 'explorer'
export type FeatureId = 'concentration' | 'passThrough' | 'velocity' | 'counterparty' | 'dormant'

export type Account = {
  id: string
  label: string
  type: 'PERSONAL' | 'BUSINESS' | 'WALLET' | 'MERCHANT'
  risk: number
  x: number
  y: number
  connections: number
  ring?: boolean
}

export type Transaction = {
  id: string
  sender: string
  receiver: string
  amount: number
  timestamp: string
  signal: string
  depth: number
  kind: 'incoming' | 'outgoing' | 'ambient'
  highlight?: FeatureId
}

export const showcaseAccount = {
  id: 'ACC-1042',
  risk: 91,
  level: 'CRITICAL',
  connections: 14,
  incoming: 37,
  outgoing: 34,
  passThrough: 92,
  holding: '4.2 min',
  velocity: '+840%',
  dormancy: '17 days',
}

export const accounts: Account[] = [
  { id: 'ACC-2281', label: '2281', type: 'PERSONAL', risk: 43, x: 96, y: 72, connections: 4 },
  { id: 'ACC-3810', label: '3810', type: 'PERSONAL', risk: 36, x: 118, y: 176, connections: 3 },
  { id: 'ACC-4491', label: '4491', type: 'BUSINESS', risk: 58, x: 118, y: 315, connections: 5 },
  { id: 'ACC-5021', label: '5021', type: 'WALLET', risk: 67, x: 198, y: 414, connections: 4 },
  { id: 'ACC-1042', label: '1042', type: 'PERSONAL', risk: 91, x: 390, y: 230, connections: 14, ring: true },
  { id: 'ACC-2911', label: '2911', type: 'PERSONAL', risk: 82, x: 628, y: 75, connections: 9 },
  { id: 'ACC-7712', label: '7712', type: 'BUSINESS', risk: 76, x: 690, y: 178, connections: 7 },
  { id: 'ACC-8821', label: '8821', type: 'WALLET', risk: 63, x: 704, y: 312, connections: 6 },
  { id: 'ACC-9001', label: '9001', type: 'MERCHANT', risk: 52, x: 614, y: 422, connections: 5 },
  { id: 'ACC-6120', label: '6120', type: 'PERSONAL', risk: 28, x: 390, y: 444, connections: 3 },
  { id: 'ACC-1734', label: '1734', type: 'MERCHANT', risk: 19, x: 232, y: 94, connections: 2 },
  { id: 'ACC-2405', label: '2405', type: 'PERSONAL', risk: 22, x: 560, y: 26, connections: 2 },
]

export const transactions: Transaction[] = [
  { id: 'TX-84012', sender: 'ACC-2281', receiver: 'ACC-1042', amount: 47800, timestamp: '14:03:12', signal: 'Fan-in + pass-through', depth: 1, kind: 'incoming', highlight: 'passThrough' },
  { id: 'TX-84013', sender: 'ACC-3810', receiver: 'ACC-1042', amount: 48000, timestamp: '14:11:48', signal: 'Fan-in + pass-through', depth: 1, kind: 'incoming', highlight: 'passThrough' },
  { id: 'TX-84014', sender: 'ACC-4491', receiver: 'ACC-1042', amount: 31500, timestamp: '14:15:06', signal: 'Network concentration', depth: 1, kind: 'incoming', highlight: 'concentration' },
  { id: 'TX-84015', sender: 'ACC-5021', receiver: 'ACC-1042', amount: 52200, timestamp: '14:19:22', signal: 'Dormant activation', depth: 1, kind: 'incoming', highlight: 'dormant' },
  { id: 'TX-84016', sender: 'ACC-1042', receiver: 'ACC-2911', amount: 47200, timestamp: '14:07:26', signal: 'Rapid pass-through', depth: 1, kind: 'outgoing', highlight: 'passThrough' },
  { id: 'TX-84017', sender: 'ACC-1042', receiver: 'ACC-7712', amount: 47600, timestamp: '14:15:40', signal: 'Rapid pass-through', depth: 1, kind: 'outgoing', highlight: 'passThrough' },
  { id: 'TX-84018', sender: 'ACC-1042', receiver: 'ACC-8821', amount: 30900, timestamp: '14:19:54', signal: 'Counterparty pattern', depth: 1, kind: 'outgoing', highlight: 'counterparty' },
  { id: 'TX-84019', sender: 'ACC-1042', receiver: 'ACC-9001', amount: 51500, timestamp: '14:24:08', signal: 'Transaction velocity', depth: 1, kind: 'outgoing', highlight: 'velocity' },
  { id: 'TX-84020', sender: 'ACC-2911', receiver: 'ACC-7712', amount: 8200, timestamp: '14:28:31', signal: 'Fan-out', depth: 2, kind: 'ambient', highlight: 'counterparty' },
  { id: 'TX-84021', sender: 'ACC-7712', receiver: 'ACC-8821', amount: 7900, timestamp: '14:31:03', signal: 'Circular flow', depth: 2, kind: 'ambient', highlight: 'velocity' },
  { id: 'TX-84022', sender: 'ACC-8821', receiver: 'ACC-2911', amount: 7600, timestamp: '14:33:15', signal: 'Circular flow', depth: 3, kind: 'ambient', highlight: 'counterparty' },
  { id: 'TX-84023', sender: 'ACC-1734', receiver: 'ACC-2281', amount: 2450, timestamp: '13:42:10', signal: 'Normal retail', depth: 2, kind: 'ambient' },
  { id: 'TX-84024', sender: 'ACC-2405', receiver: 'ACC-2911', amount: 1800, timestamp: '12:18:42', signal: 'Normal peer transfer', depth: 2, kind: 'ambient' },
  { id: 'TX-84025', sender: 'ACC-6120', receiver: 'ACC-9001', amount: 4200, timestamp: '11:06:14', signal: 'Normal merchant payment', depth: 2, kind: 'ambient' },
  { id: 'TX-84026', sender: 'ACC-6120', receiver: 'ACC-1042', amount: 68000, timestamp: '09:00:00', signal: 'Normal salary', depth: 1, kind: 'ambient' },
  { id: 'TX-84027', sender: 'ACC-1042', receiver: 'ACC-1734', amount: 22000, timestamp: '09:15:18', signal: 'Normal rent', depth: 1, kind: 'ambient' },
  { id: 'TX-84028', sender: 'ACC-1042', receiver: 'ACC-9001', amount: 3400, timestamp: '10:04:28', signal: 'Normal bill payment', depth: 1, kind: 'ambient' },
]

export const contributions: { id: FeatureId; label: string; short: string; value: number; color: string; description: string; evidence: string[] }[] = [
  { id: 'concentration', label: 'Network Concentration', short: 'counterparty concentration', value: 34, color: '#b7a6ff', description: 'Four counterparties supplied most of the incoming value, creating a concentrated one-hop cluster around the account.', evidence: ['ACC-4491 → ACC-1042 · ₹31,500 · 14:15', 'ACC-5021 → ACC-1042 · ₹52,200 · 14:19'] },
  { id: 'passThrough', label: 'Rapid Pass-Through', short: 'rapid pass-through behavior', value: 27, color: '#9ef2d0', description: 'The account forwarded most incoming value within minutes. This is a behavioral signal for review, not a verdict.', evidence: ['ACC-2281 → ACC-1042 · ₹47,800 · 14:03', 'ACC-1042 → ACC-2911 · ₹47,200 · 14:07'] },
  { id: 'velocity', label: 'Transaction Velocity', short: 'abnormal transaction velocity', value: 21, color: '#71d9ff', description: 'A burst of 37 transactions after dormancy created an unusually dense activity window.', evidence: ['ACC-1042 → ACC-9001 · ₹51,500 · 14:24', '37 transactions detected in the burst window'] },
  { id: 'counterparty', label: 'Counterparty Pattern', short: 'counterparty pattern', value: 11, color: '#ffc76b', description: 'The account sits between a small set of senders and receivers, with repeated routes across the same network neighborhood.', evidence: ['ACC-2911 → ACC-7712 → ACC-8821', 'Network depth reaches 3 hops'] },
  { id: 'dormant', label: 'Dormant Activation', short: 'dormant-account activation', value: 7, color: '#ff8e9e', description: 'The synthetic account was inactive for 17 days before a sudden burst of transfers.', evidence: ['17 days inactive', 'Burst begins at 14:03:12'] },
]

export const alerts = [
  { id: 'ACC-1042', risk: 91, size: '14 accounts', signal: 'Rapid Pass-Through', status: 'Critical', note: '4.2 min hold' },
  { id: 'ACC-2911', risk: 82, size: '9 accounts', signal: 'Network Concentration', status: 'High', note: '3-hop reach' },
  { id: 'ACC-7712', risk: 76, size: '7 accounts', signal: 'Transaction Velocity', status: 'High', note: '+610% velocity' },
  { id: 'ACC-5021', risk: 67, size: '4 accounts', signal: 'Dormant Activation', status: 'Review', note: '17 day gap' },
]

export const stabilityTests = [
  { label: 'All evidence', value: 91, color: '#9ef2d0' },
  { label: 'Remove velocity', value: 73, color: '#71d9ff' },
  { label: 'Remove network', value: 69, color: '#b7a6ff' },
  { label: 'Remove pass-through', value: 64, color: '#ffc76b' },
  { label: 'Remove dormant activation', value: 84, color: '#ff8e9e' },
  { label: 'Remove counterparty pattern', value: 80, color: '#d2b7ff' },
]

const mirrorDeltas: Record<FeatureId, number> = { passThrough: 27, concentration: 22, velocity: 18, dormant: 7, counterparty: 11 }

export function computeMirrorScore(enabled: Record<FeatureId, boolean>) {
  const disabled = (Object.keys(mirrorDeltas) as FeatureId[]).filter((feature) => !enabled[feature])
  if (disabled.length === 0) return 91
  if (disabled.length >= 4) return 28
  return Math.max(28, 91 - disabled.reduce((sum, feature) => sum + mirrorDeltas[feature], 0))
}

export function formatCurrency(amount: number) {
  return `₹${amount.toLocaleString('en-IN')}`
}

export function riskTone(risk: number) {
  if (risk >= 85) return 'critical'
  if (risk >= 70) return 'high'
  if (risk >= 50) return 'medium'
  return 'low'
}
