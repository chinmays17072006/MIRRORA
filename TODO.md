# MIRRORA TODO

## 1. Landing and demo entry

- [ ] Render a polished landing page before entering the dashboard with MIRRORA, “Mule Intelligence & Risk Recognition Analytics”, “Financial risk should never be a black box.”, and working Launch Demo, Explore Network, and How MIRRORA Works actions.
- [ ] Make Launch Demo load synthetic showcase scenario ACC-1042 and guide the user through suspicious network, account risk score, explanation, evidence, Risk Mirror, explanation stability, and investigation report.
- [ ] Keep the demo functional without internet or external database access.

## 2. Command Center

- [ ] Render a professional dark fintech dashboard with Accounts Analyzed 12,840; High-Risk Networks 37; Accounts Flagged 184; Critical Networks 9; Average Risk 31.8.
- [ ] Render Network Risk Overview and a Recent Alerts table with Account, Risk Score, Network Size, Primary Signal, Status, and Action columns, including synthetic ACC-1042 / 91 / 14 accounts / Rapid Pass-Through / Critical, ACC-2911 / 82 / 9 accounts / Network Concentration / High, and ACC-7712 / 76 / 7 accounts / Transaction Velocity / High.
- [ ] Make alert actions open the account investigation workflow.

## 3. Network Intelligence

- [ ] Render an interactive synthetic transaction network whose nodes represent accounts and edges represent transactions, with visually distinct risk levels.
- [ ] Make node selection update the account information panel, including risk score, risk level, connections, incoming/outgoing counts, pass-through ratio, average holding time, velocity change, and dormancy period for ACC-1042.
- [ ] Provide All, High Risk, Critical, 1-hop, 2-hop, and 3-hop filters plus a timeline control.
- [ ] Use synthetic suspicious patterns including fan-in, fan-out, pass-through, burst, dormant activation, circular flow, abnormal velocity, and concentrated counterparties, while retaining normal salary, shopping, bills, rent, and peer transfers in the data layer.

## 4. Explainability

- [ ] Render “Why did MIRRORA flag ACC-1042?” with 91/100 CRITICAL and interactive feature contributions Network Concentration 34%, Rapid Pass-Through 27%, Transaction Velocity 21%, Counterparty Pattern 11%, and Dormant Activation 7%.
- [ ] Selecting a feature must highlight related synthetic transactions and show evidence such as Received → Held → Forwarded, holding time 4.2 minutes, and pass-through ratio 92%.
- [ ] Every explanation must be connected to displayed synthetic transactions and must not claim fraud or criminal activity.

## 5. Risk Mirror

- [ ] Render the hero Risk Mirror with original 91/100 and working toggles for Rapid Pass-Through, Network Concentration, Transaction Velocity, Dormant Activation, and Counterparty Pattern.
- [ ] Disabling signals must recalculate the score, animate the transition, and render BEFORE / AFTER / CHANGE plus an explanation of what changed.
- [ ] Provide a Mirror Insight explaining residual elevated risk when only one signal is removed and the lower residual score when major signals are removed.

## 6. Explanation Stability

- [ ] Render automated stress-test values, a radial/gauge visualization, and a clearly labeled “Prototype explanation stability metric” around 87%.
- [ ] Explain that high stability means the assessment is supported by multiple signals and is not scientifically validated.

## 7. Investigation report and export

- [ ] Render MIRRORA INVESTIGATION REPORT for ACC-1042 with Executive Summary, Network Overview, Behavioral Indicators, Key Transactions, Explainable AI Evidence, Risk Mirror Results, Explanation Stability, and Recommended Human Review.
- [ ] Provide a working Export Report action using a printable report.
- [ ] Keep the disclaimer: “MIRRORA identifies suspicious patterns and supports investigation. It does not establish fraud or criminal activity.”

## 8. Data Explorer and Analyst

- [ ] Render transaction columns Transaction ID, Sender, Receiver, Amount, Timestamp, Risk Signal, and Network Depth, with search, date, amount, risk, and account filters.
- [ ] Make transaction selection highlight the corresponding network edge.
- [ ] Provide a MIRRORA Analyst with predefined responses based only on structured synthetic data, without hallucinating evidence.

## 9. Risk engine and delivery

- [ ] Implement transparent prototype features: velocity, incoming/outgoing counts, pass-through ratio, holding time, counterparty diversity, fan-in/fan-out, centrality/depth, dormancy activation, circular flow, amount concentration, and burst activity; combine ML/behavioral 40%, network 30%, transaction 20%, temporal 10% into a 0–100 score.
- [ ] Keep all buttons functional, explain uncertainty, and avoid calling an account criminal.
- [ ] Provide a clean Vite build on port 3000, route manifest, no required environment variables, readable folder structure, and a checkpoint-ready repository.
