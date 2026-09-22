/* ============================================================
   SaathiCare — Firebase configuration
   Replace the object below with YOUR config from Firebase Console
   (Project settings → Your apps → the </> web app you registered).
   All three pages (buyer.html, caregiver.html, parent.html) load
   this same file, so you only ever edit it in ONE place.
   ============================================================ */

const firebaseConfig = {
  apiKey: "AIzaSyAtKi6IWDg2w3tRlACCjH03hiOcx6PVSn8",
  authDomain: "saathicare-live.firebaseapp.com",
  projectId: "saathicare-live",
  storageBucket: "saathicare-live.firebasestorage.app",
  messagingSenderId: "562519803206",
  appId: "1:562519803206:web:3f19fbbbea7a4521259147"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* Default demo family code — all three role pages default to this
   so testers don't have to type anything extra during a demo.
   Anyone entering the SAME code on any device connects to the
   SAME live document. */
const DEFAULT_FAMILY_CODE = "SAATHI2026";

/* Ensures a family document exists with sensible starting data
   the first time anyone connects with a given code. */
async function ensureFamilyDoc(code) {
  const ref = db.collection("families").doc(code);
  const snap = await ref.get();
  if (!snap.exists) {
    await ref.set({
      parentName: "Shalini Rao",
      location: "Jubilee Hills, Hyderabad",
      caregiverName: "Meena Kumari",
      visit: {
        time: "4:00 PM",
        task: "Doctor escort — Dr. Rao's clinic",
        status: "upcoming",
        note: "",
        photo: false
      },
      feed: [
        { text: "Meena confirmed today's visit.", time: nowTime() }
      ]
    });
  }
  return ref;
}

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

/* Small reusable helper: append one item to the feed array
   without needing to read the whole document first. */
function pushFeed(ref, text) {
  return ref.update({
    feed: firebase.firestore.FieldValue.arrayUnion({ text, time: nowTime() })
  });
}

/* ============================================================
   Shared AI backend call — same Google Apps Script deployment
   used by the marketing site's booking form (see index.html).
   Replace this URL if you ever redeploy the Apps Script.
   ============================================================ */
const BACKEND_ENDPOINT = "https://script.google.com/macros/s/AKfycbyot400cc1O3wUYSxrWKUV9SaZCPZEdl-AqShLRWVCOaxDZ9WV5gm_mQWZZ9vKNU3Lk/exec";

async function callAI(payload) {
  try {
    const res = await fetch(BACKEND_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch (err) {
    console.error("AI call failed:", err);
    return null;
  }
}
