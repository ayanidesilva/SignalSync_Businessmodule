# Analysis and Assessment: Strategic Analysis and Systems Design in the SignalSync Prototype

The SignalSync prototype operationalises the group coursework's strategic and systems-level analysis into a functional, role-based web platform. Rather than a generic informational site, the prototype is structured around advanced operational capabilities — junction control, AI-driven signal optimisation, incident management, and public traffic intelligence — each traceable to a specific analytical output. Five examples illustrate this alignment.

---

## 1. SWOT Analysis — Strength: Infrastructure Reuse

The SWOT analysis identified SignalSync's core competitive advantage as the ability to leverage existing urban CCTV infrastructure, avoiding the capital expenditure of dedicated roadside sensors. This directly shaped two prototype pages. The *CCTV Detection Monitoring* page presents live feed health status, detection confidence scores (flagging feeds below 75% confidence), and per-junction queue estimates derived from camera inputs — demonstrating that the system extracts operational intelligence from existing assets without requiring new hardware. The *Solution Overview* page explicitly names "infrastructure-light" as a core design principle within the six-layer architecture walkthrough. These design choices ensure the business's primary competitive differentiator is visible to procurement evaluators, not merely documented in a report.

---

## 2. Porter's Five Forces — Buyer Power and Competitive Rivalry

The Porter's analysis found that government buyers hold significant negotiating power and that competing vendors can replicate basic adaptive signal functionality. SignalSync's strategic response was to compete on measurable operational value and evidence-based reporting. This is reflected in the *Traffic Operations Dashboard*, which displays real-time KPIs including active junction count, incident volume, average congestion index, and override event frequency. The *Reports and Analytics* page extends this by providing exportable corridor performance data, trend comparisons, and system uptime metrics across configurable time periods. These features directly address the procurement reality that public authorities require demonstrable, auditable outcomes before committing to long-term contracts — making the prototype commercially credible rather than conceptually generic.

---

## 3. PESTLE Analysis — Legal, Social, and Governance Risks

The PESTLE analysis flagged significant concerns around algorithmic accountability, data privacy, and public trust in automated decision-making — risks amplified in a B2G context where system failures affect public safety. The prototype addresses these through three design decisions. First, the *Audit Logs* page records every consequential action — override activations, rule changes, user account modifications — with a timestamp, actor identity, and outcome, enabling regulatory review and internal governance. Second, the *User and Role Management* page enforces role-based access control, restricting sensitive functions such as override activation and rule configuration to defined roles (Police Officers, Traffic Administrators, System Administrators). Third, the public interface is fully separated from internal operations: road users access only congestion summaries, incident alerts, and route guidance, with no exposure to junction control parameters. These three decisions implement governance-by-design rather than treating compliance as a post-implementation addition.

---

## 4. Use-Case Model — Functional Requirements Traceability

The group coursework produced a use-case model defining five actors and their system interactions. The prototype maps each major use case to a dedicated page: "Monitor Traffic Dashboard" → *Traffic Operations Dashboard*; "Manage Incidents" → *Incident Management*; "Activate Emergency Priority" → *Emergency Priority*; "Configure Optimisation Rules" → *Optimisation Rules*; "Monitor CCTV Detection" → *CCTV Monitoring*; "View Public Traffic Conditions" → *Congestion Map* and *Incident Alerts*. This one-to-one traceability confirms the prototype was derived from defined user needs and operational responsibilities rather than designed independently. It also ensures each page serves a coherent functional purpose rather than existing for visual completeness.

---

## 5. IT Strategy — Focused Differentiation and Dual-Interface Architecture

The group IT strategy proposed a focused differentiation approach targeting government traffic authorities while providing a public value layer for road users. The prototype realises this through a dual-interface structure: a secured internal platform for operational control and a public portal for traffic intelligence. One deliberate extension beyond the group coursework was expanding the public-facing content with a dedicated *Route Guidance* page providing AI-ranked alternative routes based on live congestion and active incidents. This was a considered implementation decision: a live prototype must communicate stakeholder value visually and immediately, and the public interface required sufficient depth to demonstrate the complete value chain — from CCTV detection through AI optimisation to a tangible road-user benefit — rather than leaving the public-sector justification implicit.

---

In summary, the SignalSync prototype is a direct and traceable implementation of the group coursework's analytical outputs. Each major page reflects a strategic or functional decision, and the overall architecture embodies the governance-first, infrastructure-light, dual-audience positioning established in the group analysis.
