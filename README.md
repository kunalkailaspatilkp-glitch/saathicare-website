# SaathiCare (साथी केयर) — Web Platform & Interactive Prototype

> **Verified Elder-Care & Companionship for India's Migrant Families**  
> *Managing Platform Businesses (MPB) Capstone Venture Deliverable • Digital Venture Lab*

---

## 🌟 1. Venture Overview

India's rapid urban migration has separated a growing share of adult children from their aging parents. While joint families are increasingly replaced by nuclear setups, millions of elderly parents live independently in Tier 1 and Tier 2 cities.

SaathiCare addresses the **"Missing Middle"** between:
1. **Unregulated informal domestic maids** (zero background verification, zero remote accountability, high flight risk).
2. **Heavy clinical home-healthcare agencies** (Portea, Nightingales — ₹25,000–₹45,000/month, sterile and medicalized).

SaathiCare provides **verified, dignified non-medical companionship**: doctor appointment escorts, grocery and pension errands, medication routine reminders, technology assistance, and morning/evening walks — with **real-time WhatsApp photo visit logs and GPS check-in verification** for adult children living across cities or oceans.

---

## 🏗️ 2. Platform Architecture (MPB Lens)

| Dimension | Platform Implementation |
| :--- | :--- |
| **Two-Sided Market Structure** | **Demand / Buyer Side**: Remote adult children (NRI / domestic migrants) seeking peace of mind and auditability.<br>**Service Recipient**: Elderly parents seeking warmth, patience, dignity, and autonomy.<br>**Supply Side**: Vetted local companions (ANM/GNM dropouts, semi-retirees, educated gig workers). |
| **Trust as the Core Product** | Verification and remote audit logs are the primary product being sold — not merely caregiver matchmaking. |
| **Scope Discipline** | Deliberately non-medical: Companionship, escorts, and errands are in scope; clinical procedures (IV, injections) are strictly out of scope, eliminating heavy malpractice liabilities. |
| **Parent Veto Rights** | Mandatory free introductory tea meet-and-greet prior to any paid engagement, overcoming the #1 barrier to adoption (cultural parent resistance). |

---

## 💰 3. Unit Economics & Pricing Tiers

The website integrates dynamic currency switching (**₹ INR** for domestic migrants and **$ USD** for NRI professionals):

| Plan | Pricing (INR) | Pricing (USD) | Frequency | Core Deliverables |
| :--- | :--- | :--- | :--- | :--- |
| **Single Test Trial** | ₹399 | $6 | 1 Visit (2 hrs) | Doctor escort or errand help, full WhatsApp photo log, zero-commitment trial |
| **Basic Companion** | ₹1,800 / mo | $24 / mo | 4 Visits / mo | 1 Doctor escort, routine companionship, BP/vital check, WhatsApp reports |
| **Standard Care** *(Most Popular)* | **₹3,200 / mo** | **$39 / mo** | **12 Visits / mo** (3x/week) | Doctor escorts, chai conversations, park walks, pension/Jeevan Pramaan errands, dedicated WhatsApp coordinator |
| **Daily Saathi** | ₹5,800 / mo | $69 / mo | 26 Visits / mo (Mon–Sat) | Daily presence, full errand coordination, priority emergency dispatch backup |

*Target Unit Contribution Margin: ~36% with CAC payback within 1–2 months.*

---

## 💻 4. Technology Stack & Key Features

* **Zero-Dependency Modern Web Stack**: HTML5, Tailwind CSS (via CDN), Google Fonts (Plus Jakarta Sans & Playfair Display), and Lucide Icons.
* **Interactive Live Remote Care Dashboard**: Simulates real-time smartphone WhatsApp reports, GPS check-in timestamps, vitals monitoring, and geo-tagged photo logs across 3 visit scenarios:
  1. *Morning Chai & Park Walk*
  2. *Doctor Appointment Escort & Notes*
  3. *Pension & Jeevan Pramaan Tech Help*
* **Dynamic Currency Switcher**: Seamless live conversion between INR (₹) and USD ($).
* **Interactive Family Onboarding & Booking Modal**: Lead capture modal with parent details, city selection, service checkboxes, and simulated WhatsApp confirmation.
* **4-Pillar Trust & Safety Engine**: Police e-KYC, geriatric sensitivity training, parent veto guarantee, and ₹5 Lakh liability insurance.
* **Responsive FAQ Accordion**: Addresses cultural resistance, emergency protocols, pausing during family vacations, and DPDP Act data privacy.

---

## 🚀 5. How to Run Locally

You do not need any build tool or Node.js server. Simply open `index.html` in any web browser:

```powershell
# In PowerShell / Command Prompt:
Start-Process "index.html"
```

Or double-click **`index.html`** in Windows File Explorer.
