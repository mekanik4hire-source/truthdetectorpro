// Run with: node scripts/smoke.mjs https://truthdetectorpro.onrender.com
// Uses built-in fetch (Node 18+)

const base = process.argv[2] || "http://localhost:5000";
let failed = 0;
const check = (msg, ok) => {
  console.log(`${ok ? "✅" : "❌"} ${msg}`);
  if (!ok) failed++;
};

async function run() {
  try {
    const hz = await fetch(`${base}/healthz`);
    check("/healthz returns ok", hz.ok && (await hz.text()).trim() === "ok");

    const mres = await fetch(`${base}/manifest.webmanifest`);
    if (!mres.ok) {
      check("manifest reachable", false);
    } else {
      const m = await mres.json().catch(() => null);
      const icons = (m?.icons || []).map(i => i.sizes || "").join(",");
      const shots = (m?.screenshots || []).map(s => s.sizes || "").join(",");
      check("manifest reachable", true);
      check("has 192 & 512 icons", /192/.test(icons) && /512/.test(icons));
      check("has 1280x720 & 1080x1920 screenshots", /1280/.test(shots) && /1080/.test(shots));
    }
  } catch (e) {
    console.log("❌ Smoke test crashed:", e.message);
    failed++;
  }
  console.log("\n---");
  console.log(failed ? `❌ ${failed} tests failed` : "✅ All tests passed!");
  process.exit(failed ? 1 : 0);
}

run();
