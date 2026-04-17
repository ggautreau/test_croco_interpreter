import React, { useState, useMemo, useRef } from "react";
import {
  Upload,
  AlertCircle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Download,
  Table as TableIcon,
  GitBranch,
  ScatterChart as ScatterIcon,
  ClipboardCheck,
  ArrowRight,
  X,
  ChevronDown,
  ChevronUp,
  Search,
  BookOpen,
  MapPin,
} from "lucide-react";

/* ============================================================================
   CroCoDeEL — Interpretation Console
   INRAE graphic charter v4.3 · December 2024
   --------------------------------------------------------------------------
   Typography   Raleway (titles) · Nunito Sans (body, web fallback for Avenir)
   Primary      #00a3a6  institutional emerald
   Deep accent  #275662  deep teal (matches the CroCoDeEL logo background)
   Salmon       #ed6e6c  alerts, contamination line, false positives
   Light green  #9dc544  positive accents
   Warm grey    #c4c0b3  neutral states
   Violet       #423089  cascade events
   ============================================================================ */

/* Logo is injected at the bottom of this file as a base64 data URL.
   Keeps the source browsable. */
const CROCODEEL_LOGO = "data:image/png;base64,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";

/* ============================================================================
   1. OFFICIAL BRAND MARKS (SVG)
   ============================================================================ */

/** INRAE wordmark — institutional emerald, clean reproduction per charter p.2 */
const InraeLogo = ({ height = 32, color = "#00a3a6" }) => (
  <svg
    viewBox="0 0 220 70"
    height={height}
    xmlns="http://www.w3.org/2000/svg"
    aria-label="INRAE"
    style={{ display: "block" }}
  >
    <g fill={color}>
      <rect x="6" y="12" width="14" height="52" rx="1" />
      <path d="M32 12 h14 l24 32 V12 h14 v52 h-14 l-24 -32 V64 h-14 Z" />
      <path d="M100 12 h26 a16 16 0 0 1 2 31.6 L144 64 h-16 l-13 -18 h-3 V64 h-12 Z
               M112 22 v14 h12 a7 7 0 0 0 0 -14 Z" />
      <path d="M148 64 L167 12 h14 l19 52 h-13 l-3.5 -10 h-17 l-3.5 -10 Z
               M171 44 h10 l-5 -15 Z" />
      <path d="M204 37
               a18 18 0 1 0 3 16
               l-10 -5
               a9 9 0 1 1 -1 -16
               a12 12 0 0 1 12 13
               l-20 3
               l1 8
               l28 -4
               a22 22 0 0 0 0 -6
               a22 22 0 0 0 -13 -9 Z" />
    </g>
  </svg>
);

/** French state branding — always in French (official marking) */
const RepubliqueFrancaise = ({ height = 46 }) => (
  <div
    className="flex items-start gap-2"
    style={{ fontFamily: '"Marianne", "Raleway", sans-serif' }}
  >
    <svg viewBox="0 0 40 28" height={height * 0.6} aria-hidden="true">
      <rect x="0" y="0" width="14" height="28" fill="#000091" />
      <rect x="14" y="0" width="12" height="28" fill="#fff" />
      <rect x="26" y="0" width="14" height="28" fill="#e1000f" />
      <path
        d="M20 8 a5 4 0 0 1 5 4 c0 2 -1.5 3 -1.5 5 h-7 c0 -2 -1.5 -3 -1.5 -5 a5 4 0 0 1 5 -4 Z"
        fill="#000091"
      />
    </svg>
    <div
      className="leading-[0.95] text-[11px]"
      style={{ color: "#000091", fontWeight: 700, letterSpacing: "0.02em" }}
    >
      <div>RÉPUBLIQUE</div>
      <div>FRANÇAISE</div>
      <div className="mt-0.5 italic font-normal text-[9px]">
        Liberté
        <br />
        Égalité
        <br />
        Fraternité
      </div>
    </div>
  </div>
);

/* ============================================================================
   2. TSV PARSING
   ============================================================================ */

function parseTSV(text) {
  const lines = text.replace(/\r/g, "").split("\n").filter((l) => l.length > 0);
  if (lines.length === 0) return { header: [], rows: [] };
  const header = lines[0].split("\t");
  const rows = lines.slice(1).map((line) => {
    const cells = line.split("\t");
    const obj = {};
    header.forEach((h, i) => (obj[h] = cells[i] ?? ""));
    return obj;
  });
  return { header, rows };
}

function pickCol(header, candidates) {
  const lc = header.map((h) => h.toLowerCase());
  for (const c of candidates) {
    const i = lc.indexOf(c.toLowerCase());
    if (i >= 0) return header[i];
  }
  for (const c of candidates) {
    const i = lc.findIndex((h) => h.includes(c.toLowerCase()));
    if (i >= 0) return header[i];
  }
  return null;
}

/* ---------- contamination_events.tsv ---------- */
const EVENT_COLS = {
  source: ["source", "contamination_source", "source_sample"],
  target: ["target", "contaminated_sample", "target_sample", "contaminated"],
  rate: ["contamination_rate", "rate", "estimated_rate"],
  score: ["probability", "score", "rf_score", "proba"],
  species: [
    "introduced_species",
    "contamination_specific_species",
    "species_specifically_introduced",
    "species",
  ],
};

function normalizeEvent(raw, cols, idx) {
  const species = (raw[cols.species] || "")
    .split(/[,;]\s*/)
    .filter((s) => s.trim().length > 0);
  return {
    id: idx,
    source: raw[cols.source] || "",
    target: raw[cols.target] || "",
    rate: parseFloat(raw[cols.rate]) || 0,
    score: parseFloat(raw[cols.score]) || 0,
    introduced: species,
    verdict: "pending",
    notes: "",
  };
}

function parseEvents(text) {
  const { header, rows } = parseTSV(text);
  if (rows.length === 0) throw new Error("Empty file or no rows");
  const cols = {
    source: pickCol(header, EVENT_COLS.source),
    target: pickCol(header, EVENT_COLS.target),
    rate: pickCol(header, EVENT_COLS.rate),
    score: pickCol(header, EVENT_COLS.score),
    species: pickCol(header, EVENT_COLS.species),
  };
  if (!cols.source || !cols.target) {
    throw new Error(
      "Could not find source/target columns. Expected headers like 'source' and 'contaminated_sample'.",
    );
  }
  return rows.map((r, i) => normalizeEvent(r, cols, i));
}

/* ---------- species_abundance.tsv ---------- */
function parseAbundance(text) {
  const { header, rows } = parseTSV(text);
  if (header.length < 2) return null;
  const speciesCol = header[0];
  const samples = header.slice(1);
  const matrix = {};
  rows.forEach((r) => {
    const sp = r[speciesCol];
    if (!sp) return;
    matrix[sp] = {};
    samples.forEach((s) => {
      const v = parseFloat(r[s]);
      matrix[sp][s] = Number.isFinite(v) ? v : 0;
    });
  });
  // normalize to relative abundances per sample
  samples.forEach((s) => {
    let total = 0;
    Object.keys(matrix).forEach((sp) => (total += matrix[sp][s] || 0));
    if (total > 0) {
      Object.keys(matrix).forEach(
        (sp) => (matrix[sp][s] = (matrix[sp][s] || 0) / total),
      );
    }
  });
  return { samples, species: Object.keys(matrix), matrix };
}

/* ---------- metadata.tsv ---------- */
const METADATA_COLS = {
  sample: ["sample_id", "sample", "sampleid", "id"],
  subject: [
    "subject_id",
    "subject",
    "patient",
    "patient_id",
    "host",
    "individual",
    "subjectid",
  ],
  timepoint: [
    "timepoint",
    "time",
    "time_point",
    "day",
    "week",
    "visit",
    "tp",
  ],
};

function parseMetadata(text) {
  const { header, rows } = parseTSV(text);
  if (header.length < 2) {
    throw new Error("At least 2 columns required (sample_id and subject_id)");
  }
  const cols = {
    sample: pickCol(header, METADATA_COLS.sample),
    subject: pickCol(header, METADATA_COLS.subject),
    timepoint: pickCol(header, METADATA_COLS.timepoint),
  };
  if (!cols.sample) throw new Error("sample_id column not found");
  if (!cols.subject) throw new Error("subject_id column not found");
  const bySample = {};
  rows.forEach((r) => {
    const id = r[cols.sample];
    if (!id) return;
    bySample[id] = {
      subject: r[cols.subject] || "",
      timepoint: cols.timepoint ? r[cols.timepoint] || "" : "",
      extra: { ...r },
    };
  });
  return {
    cols,
    bySample,
    nSamples: Object.keys(bySample).length,
  };
}

/* ---------- plate_map.tsv ---------- */
const PLATE_COLS = {
  sample: ["sample_id", "sample", "id"],
  plate: ["plate", "plate_id", "plateid"],
  well: ["well", "position", "well_id", "pos"],
};

/** "A01" / "A1" / "H12" / "P24" → {row: 0..15, col: 0..23} */
function parseWell(w) {
  if (!w) return null;
  const s = String(w).trim().toUpperCase();
  const m = s.match(/^([A-P])\s*(\d{1,2})$/);
  if (!m) return null;
  const row = m[1].charCodeAt(0) - 65;
  const col = parseInt(m[2], 10) - 1;
  if (row < 0 || row > 15 || col < 0 || col > 23) return null;
  return { row, col };
}

function wellLabel(row, col) {
  return String.fromCharCode(65 + row) + String(col + 1).padStart(2, "0");
}

function parsePlateMap(text) {
  const { header, rows } = parseTSV(text);
  const cols = {
    sample: pickCol(header, PLATE_COLS.sample),
    plate: pickCol(header, PLATE_COLS.plate),
    well: pickCol(header, PLATE_COLS.well),
  };
  if (!cols.sample || !cols.well) {
    throw new Error(
      "Missing columns: sample_id and well are required (plate optional).",
    );
  }
  const bySample = {};
  let maxRow = 7;
  let maxCol = 11;
  rows.forEach((r) => {
    const id = r[cols.sample];
    if (!id) return;
    const w = parseWell(r[cols.well]);
    if (!w) return;
    bySample[id] = {
      plate: cols.plate ? r[cols.plate] || "P1" : "P1",
      row: w.row,
      col: w.col,
    };
    maxRow = Math.max(maxRow, w.row);
    maxCol = Math.max(maxCol, w.col);
  });
  const format =
    maxRow > 7 || maxCol > 11 ? { rows: 16, cols: 24 } : { rows: 8, cols: 12 };
  return { bySample, format };
}

function plateMapToTSV(plateMap) {
  const lines = ["sample_id\tplate\twell"];
  Object.entries(plateMap.bySample).forEach(([sid, p]) => {
    lines.push(`${sid}\t${p.plate}\t${wellLabel(p.row, p.col)}`);
  });
  return lines.join("\n");
}

/* ============================================================================
   3. DOMAIN LOGIC — scatter, diagnostics, cascade, relatedness, plate distance
   ============================================================================ */

function buildScatter(ab, event) {
  if (!ab) return null;
  const { source, target, introduced, rate } = event;
  if (!ab.samples.includes(source) || !ab.samples.includes(target)) return null;
  const introducedSet = new Set(introduced);
  const points = [];
  ab.species.forEach((sp) => {
    const xs = ab.matrix[sp][target] || 0;
    const ys = ab.matrix[sp][source] || 0;
    if (xs === 0 && ys === 0) return;
    points.push({ species: sp, x: xs, y: ys, onLine: introducedSet.has(sp) });
  });
  const logC = rate > 0 ? Math.log10(rate) : null;
  return { points, logC, source, target };
}

function lineDiagnostics(scatter) {
  if (!scatter) return null;
  const pts = scatter.points.filter((p) => p.onLine && p.x > 0 && p.y > 0);
  const n = pts.length;
  if (n < 2) return { n, r2: null, slope: null };
  const logs = pts.map((p) => ({ x: Math.log10(p.x), y: Math.log10(p.y) }));
  const mx = logs.reduce((s, p) => s + p.x, 0) / n;
  const my = logs.reduce((s, p) => s + p.y, 0) / n;
  let sxy = 0,
    sxx = 0,
    syy = 0;
  logs.forEach((p) => {
    sxy += (p.x - mx) * (p.y - my);
    sxx += (p.x - mx) ** 2;
    syy += (p.y - my) ** 2;
  });
  const slope = sxx > 0 ? sxy / sxx : 0;
  const r2 = sxx * syy > 0 ? (sxy * sxy) / (sxx * syy) : 0;
  return { n, r2, slope };
}

function pointsAboveLine(scatter) {
  if (!scatter || scatter.logC == null) return null;
  let above = 0;
  scatter.points.forEach((p) => {
    if (p.x <= 0 || p.y <= 0 || p.onLine) return;
    const threshold = Math.log10(p.x) - scatter.logC;
    if (Math.log10(p.y) > threshold + 0.3) above++;
  });
  return above;
}

function missingAbundantFromSource(ab, source, target, threshold = 1e-3) {
  if (!ab) return null;
  let missing = 0;
  ab.species.forEach((sp) => {
    const ys = ab.matrix[sp][source] || 0;
    const xs = ab.matrix[sp][target] || 0;
    if (ys > threshold && xs === 0) missing++;
  });
  return missing;
}

function automaticScore(diag, nAbove, nMissing) {
  let good = 0;
  const reasons = [];
  if (diag && diag.r2 != null) {
    if (diag.r2 > 0.8) {
      good++;
      reasons.push({ ok: true, label: `Straight line (R² = ${diag.r2.toFixed(2)})` });
    } else {
      reasons.push({ ok: false, label: `Dispersed line (R² = ${diag.r2.toFixed(2)})` });
    }
  }
  if (diag && diag.n != null) {
    if (diag.n >= 10) {
      good++;
      reasons.push({ ok: true, label: `${diag.n} species on line (≥ 10)` });
    } else {
      reasons.push({ ok: false, label: `Only ${diag.n} species on line` });
    }
  }
  if (nMissing != null) {
    if (nMissing <= 2) {
      good++;
      reasons.push({ ok: true, label: `${nMissing} abundant source species missing in target` });
    } else {
      reasons.push({ ok: false, label: `${nMissing} abundant source species missing from target` });
    }
  }
  if (nAbove != null) {
    if (nAbove <= 3) {
      good++;
      reasons.push({ ok: true, label: `${nAbove} points above line (tolerable)` });
    } else {
      reasons.push({ ok: false, label: `${nAbove} points above line (check for cascade)` });
    }
  }
  return { good, total: 4, reasons };
}

/** A cascade is suspected when event A→B has many points above the line AND
    A is itself flagged as contaminated (C→A).  The points above A→B's line
    can then be explained as species introduced into B via A through C. */
function detectCascades(events, abundance) {
  const incoming = {};
  events.forEach((e) => {
    if (!incoming[e.target]) incoming[e.target] = [];
    incoming[e.target].push(e);
  });

  return events.map((e) => {
    if (!abundance) return { ...e, cascade: null };
    const scatter = buildScatter(abundance, e);
    const above = pointsAboveLine(scatter);
    if (above == null || above <= 3) return { ...e, cascade: null };
    const upstream = incoming[e.source] || [];
    if (upstream.length === 0) return { ...e, cascade: null };
    const explained = [];
    upstream.forEach((up) => {
      const upIntroduced = new Set(up.introduced);
      let count = 0;
      scatter.points.forEach((p) => {
        if (p.onLine || p.x <= 0 || p.y <= 0 || scatter.logC == null) return;
        const threshold = Math.log10(p.x) - scatter.logC;
        if (Math.log10(p.y) > threshold + 0.3 && upIntroduced.has(p.species)) {
          count++;
        }
      });
      if (count >= 2) {
        explained.push({
          upstream_source: up.source,
          upstream_event_id: up.id,
          species_explained: count,
        });
      }
    });
    if (explained.length === 0) return { ...e, cascade: null };
    return {
      ...e,
      cascade: { points_above: above, explained },
    };
  });
}

/** Are source and target from the same subject? */
function areRelated(metadata, source, target) {
  if (!metadata) return null;
  const a = metadata.bySample[source];
  const b = metadata.bySample[target];
  if (!a || !b) return null;
  if (!a.subject || !b.subject) return null;
  return a.subject === b.subject;
}

/** Chebyshev distance on the plate */
function plateDistance(plateMap, source, target) {
  if (!plateMap) return null;
  const a = plateMap.bySample[source];
  const b = plateMap.bySample[target];
  if (!a || !b) return null;
  if (a.plate !== b.plate) return { distance: null, samePlate: false };
  const dr = Math.abs(a.row - b.row);
  const dc = Math.abs(a.col - b.col);
  return { distance: Math.max(dr, dc), dr, dc, samePlate: true };
}

/* ============================================================================
   4. UI PRIMITIVES
   ============================================================================ */

const Pill = ({ children, tone = "neutral", className = "" }) => {
  const tones = {
    neutral: "bg-stone-100 text-stone-800 border-stone-300",
    good: "bg-[#9dc544]/20 text-[#3d5017] border-[#9dc544]",
    bad: "bg-[#ed6e6c]/20 text-[#8a2422] border-[#ed6e6c]",
    warn: "bg-[#c4c0b3]/40 text-stone-800 border-[#c4c0b3]",
    ink: "bg-[#275662] text-white border-[#275662]",
    primary: "bg-[#00a3a6]/15 text-[#275662] border-[#00a3a6]",
    violet: "bg-[#423089]/10 text-[#423089] border-[#423089]",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold border rounded-sm ${tones[tone]} ${className}`}
      style={{ fontFamily: '"Raleway", sans-serif' }}
    >
      {children}
    </span>
  );
};

const SectionTitle = ({ eyebrow, title, children }) => (
  <div className="mb-6">
    {eyebrow && (
      <div
        className="text-[11px] tracking-[0.15em] uppercase font-bold mb-1"
        style={{ color: "#ed6e6c", fontFamily: '"Raleway", sans-serif' }}
      >
        {eyebrow}
      </div>
    )}
    <h2
      className="text-[28px] leading-tight tracking-tight"
      style={{
        fontFamily: '"Raleway", sans-serif',
        fontWeight: 700,
        color: "#275662",
      }}
    >
      {title}
    </h2>
    {children && (
      <p className="mt-2 text-stone-700 max-w-2xl leading-relaxed text-[14px]">
        {children}
      </p>
    )}
  </div>
);

const Chevron = ({ size = 16, color = "#00a3a6" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M4 2 L12 8 L4 14"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Stat = ({ label, value, tone = "neutral" }) => {
  const styles = {
    neutral: { background: "#f6f7f7", color: "#275662" },
    good: { background: "#00a3a6", color: "white" },
    bad: { background: "#275662", color: "white" },
    warn: { background: "#c4c0b3", color: "#275662" },
  };
  return (
    <div className="px-4 py-4 rounded-sm" style={{ ...styles[tone], border: "1px solid #e6e8e8" }}>
      <div
        className="text-[10px] tracking-[0.15em] uppercase"
        style={{
          opacity: tone === "neutral" ? 0.7 : 0.85,
          fontWeight: 700,
          fontFamily: '"Raleway", sans-serif',
        }}
      >
        {label}
      </div>
      <div
        className="mt-1 tabular"
        style={{
          fontWeight: 800,
          fontSize: 32,
          lineHeight: 1,
          fontFamily: '"Raleway", sans-serif',
        }}
      >
        {value}
      </div>
    </div>
  );
};

const Diag = ({ label, value, tone = "neutral", hint }) => {
  const color =
    tone === "good" ? "#00a3a6" :
    tone === "warn" ? "#c4c0b3" :
    tone === "bad" ? "#ed6e6c" :
    "#e6e8e8";
  return (
    <div className="pl-3 py-1.5 mb-2" style={{ borderLeft: `4px solid ${color}` }}>
      <div
        className="text-[10px] tracking-[0.1em] uppercase"
        style={{ color: "#797870", fontWeight: 700, fontFamily: '"Raleway", sans-serif' }}
      >
        {label}
      </div>
      <div
        className="tabular"
        style={{
          color: "#275662",
          fontSize: 22,
          fontWeight: 700,
          lineHeight: 1.1,
          fontFamily: '"Raleway", sans-serif',
        }}
      >
        {value}
      </div>
      {hint && <div className="text-[10px]" style={{ color: "#797870" }}>{hint}</div>}
    </div>
  );
};

const sup = (n) => {
  const map = {
    "-": "⁻", 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴",
    5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹",
  };
  return String(n).split("").map((c) => map[c] ?? c).join("");
};
/* ============================================================================
   5. VISUALIZATIONS
   ============================================================================ */

/* ---------- SCATTERPLOT ---------- */
const Scatterplot = ({ scatter, width = 560, height = 500 }) => {
  const [hover, setHover] = useState(null);
  if (!scatter) return null;
  const pad = { l: 56, r: 20, t: 20, b: 50 };
  const w = width - pad.l - pad.r;
  const h = height - pad.t - pad.b;

  const floor = 1e-8;
  const pts = scatter.points.map((p) => ({
    ...p,
    lx: Math.log10(Math.max(p.x, floor)),
    ly: Math.log10(Math.max(p.y, floor)),
  }));
  const allX = pts.map((p) => p.lx);
  const allY = pts.map((p) => p.ly);
  const minL = Math.min(Math.log10(floor), ...allX, ...allY);
  const maxL = Math.max(...allX, ...allY, -2);
  const lo = Math.floor(minL);
  const hi = Math.ceil(maxL);

  const sx = (v) => pad.l + ((v - lo) / (hi - lo)) * w;
  const sy = (v) => pad.t + h - ((v - lo) / (hi - lo)) * h;

  const ticks = [];
  for (let i = lo; i <= hi; i++) ticks.push(i);

  const lineEls =
    scatter.logC != null ? (
      <line
        x1={sx(lo)}
        y1={sy(lo - scatter.logC)}
        x2={sx(hi)}
        y2={sy(hi - scatter.logC)}
        stroke="#ed6e6c"
        strokeWidth="1.75"
        strokeDasharray="5 3"
      />
    ) : null;

  return (
    <div className="relative">
      <svg
        width={width}
        height={height}
        className="border border-stone-300 rounded-sm"
        style={{ background: "#fff" }}
      >
        {ticks.map((t) => (
          <g key={`gx-${t}`}>
            <line x1={sx(t)} y1={pad.t} x2={sx(t)} y2={pad.t + h} stroke="#eee" strokeWidth="0.5" />
            <text
              x={sx(t)}
              y={pad.t + h + 16}
              textAnchor="middle"
              fontSize="10"
              fontFamily="system-ui, sans-serif"
              fill="#797870"
            >
              10{sup(t)}
            </text>
          </g>
        ))}
        {ticks.map((t) => (
          <g key={`gy-${t}`}>
            <line x1={pad.l} y1={sy(t)} x2={pad.l + w} y2={sy(t)} stroke="#eee" strokeWidth="0.5" />
            <text
              x={pad.l - 8}
              y={sy(t) + 3}
              textAnchor="end"
              fontSize="10"
              fontFamily="system-ui, sans-serif"
              fill="#797870"
            >
              10{sup(t)}
            </text>
          </g>
        ))}
        <line x1={pad.l} y1={pad.t + h} x2={pad.l + w} y2={pad.t + h} stroke="#275662" strokeWidth="1" />
        <line x1={pad.l} y1={pad.t} x2={pad.l} y2={pad.t + h} stroke="#275662" strokeWidth="1" />
        <text
          x={pad.l + w / 2}
          y={height - 10}
          textAnchor="middle"
          fontSize="11"
          fontFamily="Raleway, sans-serif"
          fontWeight="600"
          fill="#275662"
        >
          Target (contaminated) — {scatter.target}
        </text>
        <text
          x={-(pad.t + h / 2)}
          y={14}
          transform="rotate(-90)"
          textAnchor="middle"
          fontSize="11"
          fontFamily="Raleway, sans-serif"
          fontWeight="600"
          fill="#275662"
        >
          Source — {scatter.source}
        </text>
        {lineEls}
        {pts.map((p, i) => (
          <circle
            key={i}
            cx={sx(p.lx)}
            cy={sy(p.ly)}
            r={p.onLine ? 4 : 2.8}
            fill={p.onLine ? "#ed6e6c" : "#275662"}
            fillOpacity={p.onLine ? 0.9 : 0.35}
            stroke={p.onLine ? "#b84442" : "none"}
            strokeWidth="0.7"
            onMouseEnter={() =>
              setHover({
                species: p.species,
                x: p.x,
                y: p.y,
                sx: sx(p.lx),
                sy: sy(p.ly),
                onLine: p.onLine,
              })
            }
            onMouseLeave={() => setHover(null)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </svg>
      {hover && (
        <div
          className="absolute pointer-events-none text-[11px] px-2 py-1 shadow-lg rounded-sm"
          style={{
            left: hover.sx + 12,
            top: hover.sy - 8,
            maxWidth: 260,
            background: "#275662",
            color: "white",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div className="truncate font-semibold">{hover.species}</div>
          <div style={{ opacity: 0.75 }}>target: {hover.x.toExponential(2)}</div>
          <div style={{ opacity: 0.75 }}>source: {hover.y.toExponential(2)}</div>
          {hover.onLine && (
            <div style={{ color: "#ed6e6c" }}>● on contamination line</div>
          )}
        </div>
      )}
    </div>
  );
};

/* ---------- NETWORK GRAPH ---------- */
const NetworkGraph = ({ events, onPick }) => {
  const [hover, setHover] = useState(null);

  const nodes = useMemo(() => {
    const set = new Set();
    events.forEach((e) => {
      set.add(e.source);
      set.add(e.target);
    });
    const arr = Array.from(set);
    const R = 200;
    const cx = 300;
    const cy = 250;
    return arr.map((id, i) => {
      const a = (i / arr.length) * Math.PI * 2 - Math.PI / 2;
      return { id, x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) };
    });
  }, [events]);

  const nodeIdx = useMemo(() => {
    const m = new Map();
    nodes.forEach((n) => m.set(n.id, n));
    return m;
  }, [nodes]);

  const inDeg = useMemo(() => {
    const d = {};
    events.forEach((e) => (d[e.target] = (d[e.target] || 0) + 1));
    return d;
  }, [events]);
  const outDeg = useMemo(() => {
    const d = {};
    events.forEach((e) => (d[e.source] = (d[e.source] || 0) + 1));
    return d;
  }, [events]);

  return (
    <div className="border border-stone-300 rounded-sm bg-white">
      <svg width={600} height={500}>
        <defs>
          <marker
            id="arrow-inrae"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#00a3a6" />
          </marker>
        </defs>
        {events.map((e) => {
          const a = nodeIdx.get(e.source);
          const b = nodeIdx.get(e.target);
          if (!a || !b) return null;
          const rejected = e.verdict === "false_positive";
          const accepted = e.verdict === "true_positive";
          return (
            <line
              key={e.id}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={rejected ? "#c4c0b3" : accepted ? "#00a3a6" : "#275662"}
              strokeOpacity={rejected ? 0.5 : 0.8}
              strokeWidth={1.2 + (e.score || 0) * 2.5}
              strokeDasharray={rejected ? "3 3" : undefined}
              markerEnd="url(#arrow-inrae)"
              onMouseEnter={() => setHover({ kind: "edge", e })}
              onMouseLeave={() => setHover(null)}
              onClick={() => onPick && onPick(e.id)}
              style={{ cursor: "pointer" }}
            />
          );
        })}
        {nodes.map((n) => {
          const isSource = (outDeg[n.id] || 0) > 0 && (inDeg[n.id] || 0) === 0;
          const isTarget = (inDeg[n.id] || 0) > 0 && (outDeg[n.id] || 0) === 0;
          const isBoth = (inDeg[n.id] || 0) > 0 && (outDeg[n.id] || 0) > 0;
          const fill = isSource
            ? "#fff"
            : isTarget
              ? "#275662"
              : isBoth
                ? "#ed6e6c"
                : "#fff";
          const text = isTarget ? "#fff" : isBoth ? "#fff" : "#275662";
          return (
            <g
              key={n.id}
              onMouseEnter={() => setHover({ kind: "node", n })}
              onMouseLeave={() => setHover(null)}
            >
              <circle cx={n.x} cy={n.y} r={14} fill={fill} stroke="#275662" strokeWidth="1.5" />
              <text
                x={n.x}
                y={n.y + 3}
                textAnchor="middle"
                fontSize="9"
                fontFamily="system-ui, monospace"
                fontWeight="600"
                fill={text}
              >
                {n.id.length > 8 ? n.id.slice(0, 6) + "…" : n.id}
              </text>
            </g>
          );
        })}

        <g transform="translate(16, 16)">
          <rect x="0" y="0" width="160" height="80" fill="#fff" stroke="#c4c0b3" />
          <text x="8" y="14" fontSize="10" fontFamily="Raleway" fontWeight="700" fill="#275662">
            LEGEND
          </text>
          <circle cx="14" cy="32" r="5" fill="#fff" stroke="#275662" />
          <text x="26" y="35" fontSize="10" fontFamily="system-ui, sans-serif" fill="#275662">
            source only
          </text>
          <circle cx="14" cy="50" r="5" fill="#275662" />
          <text x="26" y="53" fontSize="10" fontFamily="system-ui, sans-serif" fill="#275662">
            target only
          </text>
          <circle cx="14" cy="68" r="5" fill="#ed6e6c" />
          <text x="26" y="71" fontSize="10" fontFamily="system-ui, sans-serif" fill="#275662">
            cascade (both)
          </text>
        </g>
      </svg>
      {hover?.kind === "node" && (
        <div className="px-3 py-2 text-[12px] border-t border-stone-300 bg-[#f6f7f7]">
          <span className="text-stone-500">sample:</span>{" "}
          <span className="font-semibold" style={{ color: "#275662" }}>
            {hover.n.id}
          </span>
          <span className="text-stone-500 ml-3">contaminates:</span> {outDeg[hover.n.id] || 0}
          <span className="text-stone-500 ml-3">contaminated by:</span> {inDeg[hover.n.id] || 0}
        </div>
      )}
      {hover?.kind === "edge" && (
        <div className="px-3 py-2 text-[12px] border-t border-stone-300 bg-[#f6f7f7]">
          <span className="font-semibold" style={{ color: "#275662" }}>
            {hover.e.source}
          </span>
          <ArrowRight className="inline w-3 h-3 mx-1" style={{ color: "#00a3a6" }} />
          <span className="font-semibold" style={{ color: "#275662" }}>
            {hover.e.target}
          </span>
          <span className="text-stone-500 ml-3">rate:</span>{" "}
          {(hover.e.rate * 100).toFixed(2)}%
          <span className="text-stone-500 ml-3">score:</span>{" "}
          {hover.e.score.toFixed(3)}
        </div>
      )}
    </div>
  );
};

/* ---------- PLATE GRID ---------- */
const PlateGrid = ({
  format,
  plateId,
  plateMap,
  highlightSamples = {},
  onClickWell,
  editable = false,
  labelMode = "sample",
  size = 26,
}) => {
  const rows = format?.rows || 8;
  const cols = format?.cols || 12;

  const grid = useMemo(() => {
    const g = {};
    if (!plateMap) return g;
    Object.entries(plateMap.bySample).forEach(([sid, p]) => {
      if (p.plate !== plateId) return;
      g[`${p.row}-${p.col}`] = sid;
    });
    return g;
  }, [plateMap, plateId]);

  const rowLabel = (r) => String.fromCharCode(65 + r);

  return (
    <div className="inline-block">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `${size}px repeat(${cols}, ${size}px)`,
          gridTemplateRows: `${size}px repeat(${rows}, ${size}px)`,
          gap: 2,
        }}
      >
        <div />
        {Array.from({ length: cols }, (_, c) => (
          <div
            key={`ch-${c}`}
            className="flex items-center justify-center text-[10px]"
            style={{
              color: "#797870",
              fontWeight: 700,
              fontFamily: '"Raleway", sans-serif',
            }}
          >
            {c + 1}
          </div>
        ))}
        {Array.from({ length: rows }, (_, r) => (
          <React.Fragment key={`row-${r}`}>
            <div
              className="flex items-center justify-center text-[10px]"
              style={{
                color: "#797870",
                fontWeight: 700,
                fontFamily: '"Raleway", sans-serif',
              }}
            >
              {rowLabel(r)}
            </div>
            {Array.from({ length: cols }, (_, c) => {
              const sid = grid[`${r}-${c}`];
              const highlight = sid ? highlightSamples[sid] : null;
              const filled = !!sid;
              return (
                <button
                  key={`w-${r}-${c}`}
                  onClick={() => onClickWell && onClickWell(r, c, sid)}
                  className="rounded-sm flex items-center justify-center"
                  style={{
                    width: size,
                    height: size,
                    background: highlight || (filled ? "#f6f7f7" : "#fff"),
                    border: highlight
                      ? `1.5px solid ${highlight}`
                      : filled
                        ? "1px solid #c4c0b3"
                        : "1px dashed #e6e8e8",
                    color: highlight ? "#fff" : "#275662",
                    cursor: editable || onClickWell ? "pointer" : "default",
                    fontSize: 8,
                    fontFamily: "system-ui, monospace",
                    fontWeight: 600,
                    overflow: "hidden",
                    lineHeight: 1,
                  }}
                  title={sid ? `${wellLabel(r, c)} · ${sid}` : wellLabel(r, c)}
                >
                  {labelMode === "sample" && sid
                    ? sid.length > 4
                      ? sid.slice(0, 4)
                      : sid
                    : labelMode === "well"
                      ? wellLabel(r, c)
                      : ""}
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
/* ============================================================================
   6. SHARED UI COMPONENTS
   ============================================================================ */

/* ---------- generic upload card ---------- */
const UploadCard = ({ label, hint, filename, onFile, primary, inputRef }) => {
  const [drag, setDrag] = useState(false);
  const loaded = !!filename;
  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        if (e.dataTransfer.files?.[0]) onFile(e.dataTransfer.files[0]);
      }}
      className="px-4 py-4 flex items-center gap-4 rounded-sm"
      style={{
        border: drag
          ? "2px dashed #00a3a6"
          : loaded
            ? "2px solid #00a3a6"
            : "2px dashed #c4c0b3",
        background: loaded ? "#fff" : "#fafbfb",
      }}
    >
      <div
        className="w-11 h-11 flex items-center justify-center rounded-sm"
        style={{ background: loaded ? "#00a3a6" : "#275662", color: "white" }}
      >
        {loaded ? <CheckCircle2 className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-[14px]"
            style={{
              color: "#275662",
              fontWeight: 700,
              fontFamily: '"Raleway", sans-serif',
            }}
          >
            {label}
          </span>
          {primary && <Pill tone="ink">required</Pill>}
        </div>
        <div className="text-[12px] text-stone-600 mt-0.5">{hint}</div>
        {loaded && (
          <div
            className="text-[12px] mt-1"
            style={{
              color: "#00a3a6",
              fontWeight: 600,
              fontFamily: '"Raleway", sans-serif',
            }}
          >
            ✓ {filename}
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".tsv,.txt,.csv,.tab"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="px-4 py-2 text-[12px] rounded-sm"
        style={{
          background: "#275662",
          color: "white",
          fontWeight: 700,
          letterSpacing: "0.02em",
          fontFamily: '"Raleway", sans-serif',
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = "#00a3a6")}
        onMouseOut={(e) => (e.currentTarget.style.background = "#275662")}
      >
        {loaded ? "Replace" : "Browse"}
      </button>
    </div>
  );
};

/* ---------- metadata / plate specialized upload cards ---------- */
const MetadataUploadCard = ({ metadata, setMetadata, setErr }) => {
  const inputRef = useRef(null);
  const onFile = async (file) => {
    try {
      const text = await file.text();
      setMetadata(parseMetadata(text));
      setErr(null);
    } catch (e) {
      setErr(`Metadata: ${e.message}`);
    }
  };
  return (
    <UploadCard
      label="metadata.tsv"
      hint="Optional — enables related-samples detection (same subject)"
      filename={metadata ? `${metadata.nSamples} samples annotated` : null}
      onFile={onFile}
      inputRef={inputRef}
    />
  );
};

const PlateUploadCard = ({ plateMap, setPlateMap, setErr }) => {
  const inputRef = useRef(null);
  const onFile = async (file) => {
    try {
      const text = await file.text();
      setPlateMap(parsePlateMap(text));
      setErr(null);
    } catch (e) {
      setErr(`Plate map: ${e.message}`);
    }
  };
  return (
    <UploadCard
      label="plate_map.tsv"
      hint="Optional — enables plate view and proximity criteria"
      filename={
        plateMap
          ? `${Object.keys(plateMap.bySample).length} wells (${plateMap.format.rows}×${plateMap.format.cols})`
          : null
      }
      onFile={onFile}
      inputRef={inputRef}
    />
  );
};

/* ---------- event queue sidebar ---------- */
const EventQueue = ({ events, currentId, onSelect, compact }) => (
  <div
    className="rounded-sm max-h-[640px] overflow-auto"
    style={{ border: "1px solid #e6e8e8" }}
  >
    {events.map((e) => {
      const active = e.id === currentId;
      const dotColor =
        e.verdict === "true_positive" ? "#00a3a6" :
        e.verdict === "false_positive" ? "#ed6e6c" :
        e.verdict === "uncertain" ? "#c4c0b3" : "#e6e8e8";
      return (
        <button
          key={e.id}
          onClick={() => onSelect(e.id)}
          className="w-full text-left px-3 py-2 text-[12px] flex items-start gap-2"
          style={{
            borderBottom: "1px solid #f0f2f2",
            background: active ? "#275662" : "#fff",
            color: active ? "#fff" : "#275662",
          }}
          onMouseOver={(ev) => { if (!active) ev.currentTarget.style.background = "#f6f7f7"; }}
          onMouseOut={(ev) => { if (!active) ev.currentTarget.style.background = "#fff"; }}
        >
          {!compact && (
            <span
              className="mt-0.5 w-2 h-2 shrink-0 rounded-full"
              style={{ background: dotColor }}
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="truncate" style={{ fontWeight: 600 }}>
              {e.source} → {e.target}
            </div>
            <div
              className="flex justify-between mt-0.5 tabular"
              style={{ opacity: 0.7, fontFamily: "system-ui, sans-serif" }}
            >
              <span>{(e.rate * 100).toFixed(1)}%</span>
              <span>{e.score.toFixed(2)}</span>
            </div>
          </div>
          {e.cascade && <Pill tone="violet">cascade</Pill>}
        </button>
      );
    })}
  </div>
);

/* ---------- cascade banner ---------- */
const CascadeBanner = ({ cascade, onJumpToUpstream }) => {
  if (!cascade) return null;
  const upstream = cascade.explained[0];
  const total = cascade.explained.reduce((s, e) => s + e.species_explained, 0);
  return (
    <div
      className="p-3 mb-4 rounded-sm"
      style={{
        background: "#f2eeff",
        border: "1px solid #423089",
        borderLeft: "4px solid #423089",
      }}
    >
      <div className="flex items-start gap-2">
        <GitBranch className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#423089" }} />
        <div className="flex-1">
          <div
            className="text-[12px] tracking-[0.1em] uppercase mb-1"
            style={{
              color: "#423089",
              fontWeight: 800,
              fontFamily: '"Raleway", sans-serif',
            }}
          >
            Cascade detected
          </div>
          <div className="text-[13px]" style={{ color: "#275662" }}>
            {cascade.points_above} points above the line — {total} species
            explained by upstream contamination from{" "}
            <button
              onClick={() =>
                onJumpToUpstream && onJumpToUpstream(upstream.upstream_event_id)
              }
              className="font-semibold underline"
              style={{ color: "#423089" }}
            >
              {upstream.upstream_source}
            </button>
            . These "suspicious" points are therefore consistent with a real
            event, not a false positive signal.
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- score bar (for events table) ---------- */
const ScoreBar = ({ v }) => (
  <div className="inline-flex items-center gap-2">
    <div className="w-16 h-1.5 rounded-sm" style={{ background: "#e6e8e8" }}>
      <div
        className="h-full rounded-sm"
        style={{
          width: `${Math.min(1, Math.max(0, v)) * 100}%`,
          background: v > 0.9 ? "#00a3a6" : v > 0.7 ? "#9dc544" : "#ed6e6c",
        }}
      />
    </div>
    <span
      className="tabular"
      style={{ fontWeight: 600, fontFamily: '"Raleway", sans-serif' }}
    >
      {v.toFixed(3)}
    </span>
  </div>
);

const VerdictBadge = ({ v }) => {
  if (v === "true_positive")
    return (
      <Pill tone="good">
        <CheckCircle2 className="w-3 h-3" />
        true positive
      </Pill>
    );
  if (v === "false_positive")
    return (
      <Pill tone="bad">
        <XCircle className="w-3 h-3" />
        false positive
      </Pill>
    );
  if (v === "uncertain")
    return (
      <Pill tone="warn">
        <HelpCircle className="w-3 h-3" />
        uncertain
      </Pill>
    );
  return <Pill>pending</Pill>;
};

const QuickBtn = ({ children, onClick, active, tone, title }) => {
  const bg = active
    ? tone === "good"
      ? "#00a3a6"
      : tone === "bad"
        ? "#ed6e6c"
        : "#c4c0b3"
    : "#fff";
  const color = active ? "#fff" : "#275662";
  return (
    <button
      onClick={onClick}
      title={title}
      className="p-1 rounded-sm"
      style={{ background: bg, color, border: "1px solid #e6e8e8" }}
    >
      {children}
    </button>
  );
};

const Th = ({ children, right, onClick }) => (
  <th
    onClick={onClick}
    className={`px-3 py-3 text-[10px] tracking-[0.1em] uppercase ${
      right ? "text-right" : "text-left"
    } ${onClick ? "cursor-pointer select-none" : ""}`}
    style={{
      color: "#275662",
      fontWeight: 800,
      fontFamily: '"Raleway", sans-serif',
    }}
  >
    {children}
  </th>
);

/* ---------- validation criteria ---------- */
const Criterion = ({ n, title, wiki, pass, value }) => {
  const color = pass == null ? "#e6e8e8" : pass ? "#00a3a6" : "#ed6e6c";
  return (
    <div className="pl-3 py-2 mb-2" style={{ borderLeft: `4px solid ${color}` }}>
      <div className="flex items-baseline gap-2">
        <span
          className="text-[10px]"
          style={{
            color: "#ed6e6c",
            fontWeight: 800,
            fontFamily: '"Raleway", sans-serif',
          }}
        >
          {n}
        </span>
        <span
          style={{
            color: "#275662",
            fontWeight: 700,
            fontSize: 15,
            fontFamily: '"Raleway", sans-serif',
          }}
        >
          {title}
        </span>
      </div>
      <div className="text-[12px] italic mb-1" style={{ color: "#797870" }}>
        {wiki}
      </div>
      <div
        className="text-[13px]"
        style={{ fontWeight: 600, fontFamily: '"Raleway", sans-serif' }}
      >
        {pass == null ? (
          <span style={{ color: "#797870" }}>{value}</span>
        ) : pass ? (
          <span style={{ color: "#00a3a6" }}>✓ {value}</span>
        ) : (
          <span style={{ color: "#ed6e6c" }}>✗ {value}</span>
        )}
      </div>
    </div>
  );
};

/** Contextual criterion — informative only, not counted in /4 auto-score */
const ContextualCriterion = ({ n, title, hint, verdict }) => {
  const color =
    verdict.tone === "good" ? "#00a3a6" :
    verdict.tone === "bad" ? "#ed6e6c" :
    verdict.tone === "warn" ? "#c4c0b3" :
    "#e6e8e8";
  const textColor =
    verdict.tone === "good" ? "#00a3a6" :
    verdict.tone === "bad" ? "#ed6e6c" :
    verdict.tone === "warn" ? "#797870" :
    "#797870";
  return (
    <div
      className="pl-3 py-2 mb-2"
      style={{ borderLeft: `4px solid ${color}`, background: "#fafbfb" }}
    >
      <div className="flex items-baseline gap-2">
        <span
          className="text-[10px]"
          style={{
            color: "#423089",
            fontWeight: 800,
            fontFamily: '"Raleway", sans-serif',
          }}
        >
          {n}
        </span>
        <span
          style={{
            color: "#275662",
            fontWeight: 700,
            fontSize: 15,
            fontFamily: '"Raleway", sans-serif',
          }}
        >
          {title}
        </span>
        <span
          className="text-[10px] uppercase tracking-widest"
          style={{
            color: "#797870",
            fontWeight: 600,
            fontFamily: '"Raleway", sans-serif',
          }}
        >
          context
        </span>
      </div>
      <div className="text-[12px] italic mb-1" style={{ color: "#797870" }}>
        {hint}
      </div>
      <div
        className="text-[13px]"
        style={{
          color: textColor,
          fontWeight: 600,
          fontFamily: '"Raleway", sans-serif',
        }}
      >
        {verdict.text}
      </div>
    </div>
  );
};

/* ---------- verdict button ---------- */
const VerdictBtn = ({ children, onClick, active, tone, icon: Icon }) => {
  const palette = {
    good: { bg: "#00a3a6", border: "#00a3a6" },
    bad: { bg: "#ed6e6c", border: "#ed6e6c" },
    warn: { bg: "#c4c0b3", border: "#c4c0b3" },
    neutral: { bg: "#275662", border: "#275662" },
  };
  const p = palette[tone];
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 text-[13px] rounded-sm flex items-center gap-2"
      style={{
        border: `2px solid ${p.border}`,
        background: active ? p.bg : "#fff",
        color: active ? "#fff" : "#275662",
        fontWeight: 700,
        letterSpacing: "0.02em",
        fontFamily: '"Raleway", sans-serif',
      }}
    >
      <Icon className="w-4 h-4" />
      {children}
    </button>
  );
};
/* ============================================================================
   7. TAB VIEWS
   ============================================================================ */

/* ---------- EMPTY STATE ---------- */
const EmptyState = () => (
  <div className="max-w-7xl mx-auto px-6 py-16">
    <div className="grid md:grid-cols-[1fr_320px] gap-10">
      <div>
        <SectionTitle eyebrow="Getting started" title="Upload your events to begin">
          CroCoDeEL flags cross-sample contamination events but clearly warns that some
          are false positives requiring human inspection. This tool replaces the PDF.
        </SectionTitle>
        <ol className="mt-6 space-y-3">
          {[
            ["01", <span key="s1">Drop your{" "}
              <code
                className="bg-stone-100 px-1.5 py-0.5 rounded-sm text-[12px]"
                style={{ color: "#275662" }}
              >
                contamination_events.tsv
              </code>.
            </span>],
            ["02", <span key="s2">Drop the{" "}
              <code
                className="bg-stone-100 px-1.5 py-0.5 rounded-sm text-[12px]"
                style={{ color: "#275662" }}
              >
                species_abundance.tsv
              </code>{" "}
              to enable scatterplots and the automatic score.
            </span>],
            ["03", <span key="s3">Optionally add{" "}
              <code
                className="bg-stone-100 px-1.5 py-0.5 rounded-sm text-[12px]"
                style={{ color: "#275662" }}
              >
                metadata.tsv
              </code>{" "}and{" "}
              <code
                className="bg-stone-100 px-1.5 py-0.5 rounded-sm text-[12px]"
                style={{ color: "#275662" }}
              >
                plate_map.tsv
              </code>{" "}for deeper context.
            </span>],
            ["04", <span key="s4">Walk through the events, flag each case, and export your curated report.</span>],
          ].map(([n, body]) => (
            <li key={n} className="flex gap-4 items-start">
              <span
                style={{
                  color: "#ed6e6c",
                  fontWeight: 800,
                  fontSize: 16,
                  minWidth: 28,
                  fontFamily: '"Raleway", sans-serif',
                }}
              >
                {n}
              </span>
              <span className="text-[14px] leading-relaxed text-stone-700">{body}</span>
            </li>
          ))}
        </ol>
      </div>
      <aside
        className="p-6 rounded-sm"
        style={{ background: "#f6f7f7", borderLeft: "4px solid #00a3a6" }}
      >
        <div
          className="text-[10px] tracking-[0.15em] uppercase mb-2"
          style={{
            color: "#ed6e6c",
            fontWeight: 700,
            fontFamily: '"Raleway", sans-serif',
          }}
        >
          Recap — what CroCoDeEL does
        </div>
        <p className="text-[13px] leading-relaxed text-stone-700 mb-3">
          For each candidate pair, the tool fits a <em>contamination line</em> in
          log-log abundance space. Species on the line are those introduced into
          the target sample by leakage from the source.
        </p>
        <p className="text-[13px] leading-relaxed text-stone-700">
          The Random Forest score reflects a probability, but CroCoDeEL itself
          requires inspecting every event's scatterplot.
        </p>
      </aside>
    </div>
  </div>
);

/* ---------- OVERVIEW ---------- */
const TopList = ({ title, items, onOpen, fmt }) => (
  <div>
    <div
      className="text-[10px] tracking-[0.15em] uppercase mb-3"
      style={{
        color: "#ed6e6c",
        fontWeight: 700,
        fontFamily: '"Raleway", sans-serif',
      }}
    >
      {title}
    </div>
    <div className="rounded-sm" style={{ border: "1px solid #e6e8e8" }}>
      {items.map((e, i) => (
        <button
          key={e.id}
          onClick={() => onOpen(e.id)}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-left"
          style={{
            borderBottom: i < items.length - 1 ? "1px solid #f0f2f2" : "none",
            background: "#fff",
          }}
          onMouseOver={(e2) => (e2.currentTarget.style.background = "#f6f7f7")}
          onMouseOut={(e2) => (e2.currentTarget.style.background = "#fff")}
        >
          <span
            className="text-[11px] w-6 tabular"
            style={{
              color: "#797870",
              fontWeight: 700,
              fontFamily: '"Raleway", sans-serif',
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-[13px] flex-1 truncate" style={{ color: "#275662" }}>
            <span style={{ fontWeight: 600 }}>{e.source}</span>
            <ArrowRight className="inline w-3 h-3 mx-1.5" style={{ color: "#00a3a6" }} />
            <span style={{ fontWeight: 600 }}>{e.target}</span>
          </span>
          <span
            className="text-[13px] tabular"
            style={{
              color: "#275662",
              fontWeight: 700,
              fontFamily: '"Raleway", sans-serif',
            }}
          >
            {fmt(e)}
          </span>
        </button>
      ))}
    </div>
  </div>
);

const Overview = ({ counts, events, hasAb, metadata, plateMap, onOpen }) => {
  const topByScore = [...events].sort((a, b) => b.score - a.score).slice(0, 5);
  const topByRate = [...events].sort((a, b) => b.rate - a.rate).slice(0, 5);

  const relatedCount = useMemo(() => {
    if (!metadata) return null;
    return events.filter((e) => areRelated(metadata, e.source, e.target) === true).length;
  }, [events, metadata]);

  const adjacentCount = useMemo(() => {
    if (!plateMap) return null;
    return events.filter((e) => {
      const pd = plateDistance(plateMap, e.source, e.target);
      return pd && pd.samePlate && pd.distance != null && pd.distance <= 1;
    }).length;
  }, [events, plateMap]);

  const cascadeCount = events.filter((e) => e.cascade).length;

  return (
    <div>
      <SectionTitle eyebrow="Overview" title="Your analysis at a glance">
        These are the events CroCoDeEL flagged. Your role: distinguish real contamination
        from coincidental abundance similarity. Start from the highest-score events.
      </SectionTitle>

      <div className="grid md:grid-cols-5 gap-3 mt-8 mb-4">
        <Stat label="Events" value={counts.total} />
        <Stat label="Samples involved" value={counts.samples} />
        <Stat label="Mean rate" value={`${(counts.avgRate * 100).toFixed(2)}%`} />
        <Stat label="Validated (TP)" value={counts.tp} tone="good" />
        <Stat label="Rejected (FP)" value={counts.fp} tone="bad" />
      </div>

      {(metadata || plateMap || cascadeCount > 0) && (
        <div className="grid md:grid-cols-3 gap-3 mb-10">
          {metadata && (
            <Stat
              label="Related samples (same subject)"
              value={relatedCount}
              tone={relatedCount > 0 ? "warn" : "neutral"}
            />
          )}
          {plateMap && (
            <Stat
              label="Adjacent wells on plate"
              value={adjacentCount}
              tone={adjacentCount > 0 ? "good" : "neutral"}
            />
          )}
          {cascadeCount > 0 && (
            <Stat label="Cascades detected" value={cascadeCount} tone="bad" />
          )}
        </div>
      )}

      {!hasAb && (
        <div
          className="flex items-start gap-3 p-4 mb-8 rounded-sm"
          style={{ background: "#fdeceb", border: "1px solid #ed6e6c", color: "#8a2422" }}
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-[13px] leading-relaxed">
            <strong>No abundance table loaded.</strong> You can still sort events by
            score and rate, but scatterplots and the 4-criteria automatic score
            require <code>species_abundance.tsv</code>.
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <TopList
          title="Top 5 by probability"
          items={topByScore}
          onOpen={onOpen}
          fmt={(e) => e.score.toFixed(3)}
        />
        <TopList
          title="Top 5 by contamination rate"
          items={topByRate}
          onOpen={onOpen}
          fmt={(e) => `${(e.rate * 100).toFixed(2)}%`}
        />
      </div>
    </div>
  );
};

/* ---------- EVENTS TABLE ---------- */
const EventsTable = ({
  events,
  total,
  filter,
  setFilter,
  sort,
  setSort,
  onPick,
  setVerdict,
  metadata,
  plateMap,
}) => {
  const toggleSort = (by) =>
    setSort({
      by,
      dir: sort.by === by && sort.dir === "desc" ? "asc" : "desc",
    });
  const SortIcon = ({ col }) =>
    sort.by !== col ? null : sort.dir === "desc" ? (
      <ChevronDown className="inline w-3 h-3" />
    ) : (
      <ChevronUp className="inline w-3 h-3" />
    );
  const hasContext = metadata || plateMap;

  return (
    <div>
      <SectionTitle eyebrow="Events" title="Curate each flag">
        Filter, sort, and click a row to open the event in the validation workflow.
      </SectionTitle>

      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <div className="relative">
          <Search
            className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
            style={{ color: "#797870" }}
          />
          <input
            value={filter.q}
            onChange={(e) => setFilter({ ...filter, q: e.target.value })}
            placeholder="sample or species…"
            className="pl-7 pr-3 py-1.5 text-[12px] rounded-sm w-64 outline-none"
            style={{ border: "1px solid #c4c0b3" }}
          />
        </div>
        <div className="flex items-center gap-2 text-[12px]">
          <span style={{ color: "#797870" }}>min score</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={filter.minScore}
            onChange={(e) =>
              setFilter({ ...filter, minScore: parseFloat(e.target.value) })
            }
            style={{ accentColor: "#00a3a6" }}
          />
          <span
            className="tabular w-10"
            style={{ fontWeight: 600, fontFamily: '"Raleway", sans-serif' }}
          >
            {filter.minScore.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[12px]">
          <span style={{ color: "#797870" }}>min rate</span>
          <input
            type="range"
            min={0}
            max={0.5}
            step={0.01}
            value={filter.minRate}
            onChange={(e) =>
              setFilter({ ...filter, minRate: parseFloat(e.target.value) })
            }
            style={{ accentColor: "#00a3a6" }}
          />
          <span
            className="tabular w-12"
            style={{ fontWeight: 600, fontFamily: '"Raleway", sans-serif' }}
          >
            {(filter.minRate * 100).toFixed(0)}%
          </span>
        </div>
        <select
          value={filter.verdict}
          onChange={(e) => setFilter({ ...filter, verdict: e.target.value })}
          className="px-2 py-1.5 text-[12px] rounded-sm outline-none"
          style={{ border: "1px solid #c4c0b3" }}
        >
          <option value="all">all verdicts</option>
          <option value="pending">pending</option>
          <option value="true_positive">true positive</option>
          <option value="false_positive">false positive</option>
          <option value="uncertain">uncertain</option>
        </select>
        {metadata && (
          <label
            className="flex items-center gap-1.5 text-[12px] cursor-pointer"
            style={{ color: "#275662" }}
          >
            <input
              type="checkbox"
              checked={filter.hideRelated}
              onChange={(e) => setFilter({ ...filter, hideRelated: e.target.checked })}
              style={{ accentColor: "#00a3a6" }}
            />
            hide related
          </label>
        )}
        {plateMap && (
          <label
            className="flex items-center gap-1.5 text-[12px] cursor-pointer"
            style={{ color: "#275662" }}
          >
            <input
              type="checkbox"
              checked={filter.adjacentOnly}
              onChange={(e) => setFilter({ ...filter, adjacentOnly: e.target.checked })}
              style={{ accentColor: "#00a3a6" }}
            />
            adjacent wells only
          </label>
        )}
        <span className="text-[12px] ml-auto" style={{ color: "#797870" }}>
          {events.length} / {total}
        </span>
      </div>

      <div
        className="rounded-sm overflow-x-auto"
        style={{ border: "1px solid #e6e8e8" }}
      >
        <table className="w-full text-[13px]">
          <thead>
            <tr style={{ background: "#f6f7f7", borderBottom: "2px solid #00a3a6" }}>
              <Th onClick={() => toggleSort("source")}>
                Source <SortIcon col="source" />
              </Th>
              <Th>→</Th>
              <Th onClick={() => toggleSort("target")}>
                Target <SortIcon col="target" />
              </Th>
              <Th onClick={() => toggleSort("rate")} right>
                Rate <SortIcon col="rate" />
              </Th>
              <Th onClick={() => toggleSort("score")} right>
                Score <SortIcon col="score" />
              </Th>
              {hasContext && <Th>Context</Th>}
              <Th right>Species</Th>
              <Th>Verdict</Th>
              <Th>Action</Th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => {
              const related = areRelated(metadata, e.source, e.target);
              const pd = plateDistance(plateMap, e.source, e.target);
              return (
                <tr
                  key={e.id}
                  style={{ borderBottom: "1px solid #f0f2f2" }}
                  onMouseOver={(ev) => (ev.currentTarget.style.background = "#f6f7f7")}
                  onMouseOut={(ev) => (ev.currentTarget.style.background = "white")}
                >
                  <td
                    className="px-3 py-2.5 cursor-pointer"
                    onClick={() => onPick(e.id)}
                    style={{ fontWeight: 600, color: "#275662" }}
                  >
                    {e.source}
                  </td>
                  <td className="px-1" style={{ color: "#00a3a6" }}>→</td>
                  <td
                    className="px-3 py-2.5 cursor-pointer"
                    onClick={() => onPick(e.id)}
                    style={{ fontWeight: 600, color: "#275662" }}
                  >
                    {e.target}
                  </td>
                  <td
                    className="px-3 py-2.5 tabular text-right"
                    style={{ fontWeight: 600, fontFamily: '"Raleway", sans-serif' }}
                  >
                    {(e.rate * 100).toFixed(2)}%
                  </td>
                  <td className="px-3 py-2.5 tabular text-right">
                    <ScoreBar v={e.score} />
                  </td>
                  {hasContext && (
                    <td className="px-3 py-2.5">
                      <div className="flex gap-1 flex-wrap">
                        {related === true && <Pill tone="warn">related</Pill>}
                        {pd && pd.samePlate && pd.distance != null && pd.distance <= 1 && (
                          <Pill tone="bad">adjacent</Pill>
                        )}
                        {pd && pd.samePlate && pd.distance === 2 && (
                          <Pill tone="warn">Δ=2</Pill>
                        )}
                        {pd && pd.samePlate === false && (
                          <Pill tone="neutral">different plates</Pill>
                        )}
                        {e.cascade && <Pill tone="violet">cascade</Pill>}
                      </div>
                    </td>
                  )}
                  <td
                    className="px-3 py-2.5 text-right tabular"
                    style={{ color: "#797870" }}
                  >
                    {e.introduced.length}
                  </td>
                  <td className="px-3 py-2.5">
                    <VerdictBadge v={e.verdict} />
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex gap-1">
                      <QuickBtn
                        active={e.verdict === "true_positive"}
                        onClick={() =>
                          setVerdict(
                            e.id,
                            e.verdict === "true_positive" ? "pending" : "true_positive",
                          )
                        }
                        tone="good"
                        title="mark as true positive"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </QuickBtn>
                      <QuickBtn
                        active={e.verdict === "false_positive"}
                        onClick={() =>
                          setVerdict(
                            e.id,
                            e.verdict === "false_positive" ? "pending" : "false_positive",
                          )
                        }
                        tone="bad"
                        title="mark as false positive"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                      </QuickBtn>
                      <QuickBtn
                        active={e.verdict === "uncertain"}
                        onClick={() =>
                          setVerdict(
                            e.id,
                            e.verdict === "uncertain" ? "pending" : "uncertain",
                          )
                        }
                        tone="warn"
                        title="mark as uncertain"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                      </QuickBtn>
                    </div>
                  </td>
                </tr>
              );
            })}
            {events.length === 0 && (
              <tr>
                <td
                  colSpan={hasContext ? 9 : 8}
                  className="px-3 py-8 text-center text-[13px]"
                  style={{ color: "#797870" }}
                >
                  No events match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ---------- SCATTER TAB ---------- */
const ScatterTab = ({
  events,
  selected,
  onSelect,
  scatter,
  ab,
  diag,
  above,
  missing,
  metadata,
  plateMap,
}) => {
  const sel = selected || events[0];
  if (!sel) return null;
  if (!ab) {
    return (
      <div
        className="p-6 rounded-sm"
        style={{ background: "#fdeceb", border: "1px solid #ed6e6c", color: "#8a2422" }}
      >
        <strong>Scatterplots require the abundance table.</strong> Drop{" "}
        <code>species_abundance.tsv</code> above to enable this view.
      </div>
    );
  }
  const related = areRelated(metadata, sel.source, sel.target);
  const pd = plateDistance(plateMap, sel.source, sel.target);
  return (
    <div className="grid lg:grid-cols-[1fr_280px] gap-8">
      <div>
        <SectionTitle eyebrow="Scatterplot" title={`${sel.source} → ${sel.target}`}>
          Each point is a species. The dashed salmon line is the theoretical
          contamination line at rate {(sel.rate * 100).toFixed(2)}%. Species
          introduced by contamination are shown in salmon.
        </SectionTitle>
        <CascadeBanner
          cascade={sel.cascade}
          onJumpToUpstream={(id) => onSelect(id)}
        />
        {(related === true ||
          (pd && pd.samePlate && pd.distance != null)) && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {related === true && (
              <Pill tone="warn">
                ⚠ related — same subject ({metadata.bySample[sel.source]?.subject})
              </Pill>
            )}
            {pd && pd.samePlate && pd.distance != null && (
              <Pill
                tone={
                  pd.distance <= 1 ? "bad" : pd.distance === 2 ? "warn" : "neutral"
                }
              >
                plate {plateMap.bySample[sel.source]?.plate} · Δ={pd.distance}
              </Pill>
            )}
          </div>
        )}
        <div className="flex gap-6 items-start flex-wrap">
          <Scatterplot scatter={scatter} />
          <div className="flex-1 min-w-[240px]">
            <Diag label="Probability (RF)" value={sel.score.toFixed(3)} />
            <Diag label="Contamination rate" value={`${(sel.rate * 100).toFixed(2)}%`} />
            <Diag
              label="Species on line"
              value={diag?.n ?? "–"}
              tone={diag?.n >= 10 ? "good" : diag?.n ? "warn" : "bad"}
            />
            <Diag
              label="Line R² (log-log)"
              value={diag?.r2 != null ? diag.r2.toFixed(3) : "–"}
              tone={
                diag?.r2 != null
                  ? diag.r2 > 0.8
                    ? "good"
                    : diag.r2 > 0.5
                      ? "warn"
                      : "bad"
                  : "neutral"
              }
            />
            <Diag
              label="Fitted slope"
              value={diag?.slope != null ? diag.slope.toFixed(2) : "–"}
              hint="expected ≈ 1"
            />
            <Diag
              label="Points above line"
              value={above != null ? above : "–"}
              tone={above == null ? "neutral" : above <= 3 ? "good" : "warn"}
              hint={sel.cascade ? "explained by cascade" : "> 3 → cascade?"}
            />
            <Diag
              label="Abundant source species missing from target"
              value={missing != null ? missing : "–"}
              tone={missing == null ? "neutral" : missing <= 2 ? "good" : "bad"}
            />
          </div>
        </div>
      </div>
      <aside>
        <div
          className="text-[10px] tracking-[0.15em] uppercase mb-3"
          style={{
            color: "#ed6e6c",
            fontWeight: 700,
            fontFamily: '"Raleway", sans-serif',
          }}
        >
          All events
        </div>
        <EventQueue events={events} currentId={sel.id} onSelect={onSelect} compact />
      </aside>
    </div>
  );
};

/* ---------- NETWORK TAB ---------- */
const NetworkTab = ({ events, onPick }) => (
  <div>
    <SectionTitle eyebrow="Network" title="Contamination map">
      Directed graph from source to target. Edge thickness reflects RF probability.
      Salmon nodes appear on both sides — a possible contamination cascade.
    </SectionTitle>
    <NetworkGraph events={events} onPick={onPick} />
    <p className="text-[11px] mt-3" style={{ color: "#797870" }}>
      Click an edge to open the event in guided validation.
    </p>
  </div>
);
/* ---------- PLATE TAB ---------- */
const PlateEditor = ({ samples, plateMap, setPlateMap }) => {
  const [format, setFormat] = useState(
    plateMap?.format || { rows: 8, cols: 12 },
  );
  const [plateId, setPlateId] = useState(
    plateMap ? Object.values(plateMap.bySample)[0]?.plate || "P1" : "P1",
  );
  const [selectedSample, setSelectedSample] = useState(null);

  const placed = useMemo(() => {
    const s = new Set();
    if (plateMap) Object.keys(plateMap.bySample).forEach((id) => s.add(id));
    return s;
  }, [plateMap]);

  const unplaced = samples.filter((s) => !placed.has(s));

  const handleClickWell = (r, c) => {
    if (!selectedSample) return;
    const newMap = { ...(plateMap?.bySample || {}) };
    Object.keys(newMap).forEach((k) => {
      if (k === selectedSample) delete newMap[k];
    });
    Object.entries(newMap).forEach(([k, v]) => {
      if (v.plate === plateId && v.row === r && v.col === c) {
        delete newMap[k];
      }
    });
    newMap[selectedSample] = { plate: plateId, row: r, col: c };
    setPlateMap({ bySample: newMap, format });
    setSelectedSample(null);
  };

  const clearWell = (sid) => {
    const newMap = { ...(plateMap?.bySample || {}) };
    delete newMap[sid];
    setPlateMap(
      Object.keys(newMap).length ? { bySample: newMap, format } : null,
    );
  };

  const downloadTSV = () => {
    if (!plateMap) return;
    const tsv = plateMapToTSV(plateMap);
    const blob = new Blob([tsv], { type: "text/tab-separated-values" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "plate_map.tsv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid lg:grid-cols-[auto_1fr] gap-8">
      <div>
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <label
            className="text-[11px]"
            style={{
              color: "#275662",
              fontWeight: 700,
              fontFamily: '"Raleway", sans-serif',
            }}
          >
            Format:
          </label>
          <select
            value={`${format.rows}x${format.cols}`}
            onChange={(e) => {
              const [r, c] = e.target.value.split("x").map(Number);
              setFormat({ rows: r, cols: c });
              if (plateMap)
                setPlateMap({ ...plateMap, format: { rows: r, cols: c } });
            }}
            className="px-2 py-1 text-[11px] rounded-sm"
            style={{ border: "1px solid #c4c0b3" }}
          >
            <option value="8x12">96-well (8×12)</option>
            <option value="16x24">384-well (16×24)</option>
          </select>
          <label
            className="text-[11px] ml-3"
            style={{
              color: "#275662",
              fontWeight: 700,
              fontFamily: '"Raleway", sans-serif',
            }}
          >
            Plate:
          </label>
          <input
            value={plateId}
            onChange={(e) => setPlateId(e.target.value)}
            className="px-2 py-1 text-[11px] rounded-sm w-16"
            style={{ border: "1px solid #c4c0b3" }}
          />
        </div>
        <PlateGrid
          format={format}
          plateId={plateId}
          plateMap={plateMap}
          highlightSamples={selectedSample ? { [selectedSample]: "#00a3a6" } : {}}
          onClickWell={handleClickWell}
          editable
          labelMode="sample"
          size={format.rows > 8 ? 22 : 32}
        />
        <div className="mt-4 flex gap-2">
          <button
            onClick={downloadTSV}
            disabled={!plateMap}
            className="px-3 py-1.5 text-[11px] rounded-sm"
            style={{
              background: "#275662",
              color: "#fff",
              fontWeight: 700,
              opacity: !plateMap ? 0.4 : 1,
              fontFamily: '"Raleway", sans-serif',
            }}
          >
            <Download className="w-3 h-3 inline mr-1" />
            Export plate map
          </button>
          <button
            onClick={() => setPlateMap(null)}
            disabled={!plateMap}
            className="px-3 py-1.5 text-[11px] rounded-sm"
            style={{
              background: "#fff",
              color: "#275662",
              fontWeight: 700,
              border: "1px solid #c4c0b3",
              opacity: !plateMap ? 0.4 : 1,
              fontFamily: '"Raleway", sans-serif',
            }}
          >
            Clear all
          </button>
        </div>
      </div>

      <div>
        <div
          className="text-[10px] tracking-[0.15em] uppercase mb-3"
          style={{
            color: "#ed6e6c",
            fontWeight: 700,
            fontFamily: '"Raleway", sans-serif',
          }}
        >
          Samples {selectedSample ? "— click a well to place" : ""}
        </div>
        <div className="mb-3 text-[12px]" style={{ color: "#797870" }}>
          {unplaced.length} unplaced · {placed.size} placed of {samples.length}
        </div>
        <div
          className="rounded-sm max-h-[500px] overflow-auto"
          style={{ border: "1px solid #e6e8e8" }}
        >
          {samples.map((s) => {
            const pos = plateMap?.bySample[s];
            const isSelected = selectedSample === s;
            return (
              <div
                key={s}
                className="px-3 py-2 text-[12px] flex items-center gap-2"
                style={{
                  borderBottom: "1px solid #f0f2f2",
                  background: isSelected
                    ? "#00a3a6"
                    : pos
                      ? "#f6f7f7"
                      : "#fff",
                  color: isSelected ? "#fff" : "#275662",
                }}
              >
                <button
                  onClick={() => setSelectedSample(isSelected ? null : s)}
                  className="flex-1 text-left"
                  style={{ fontWeight: 600 }}
                >
                  {s}
                </button>
                {pos ? (
                  <>
                    <Pill tone={isSelected ? "ink" : "primary"}>
                      {pos.plate} · {wellLabel(pos.row, pos.col)}
                    </Pill>
                    <button
                      onClick={() => clearWell(s)}
                      title="remove"
                      style={{ color: isSelected ? "#fff" : "#797870" }}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </>
                ) : (
                  <Pill tone={isSelected ? "ink" : "neutral"}>to place</Pill>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const PlateTab = ({ events, plateMap, setPlateMap, samples, onPick }) => {
  const [mode, setMode] = useState(plateMap ? "view" : "edit");
  const [currentPlate, setCurrentPlate] = useState(null);
  const [hoverEvent, setHoverEvent] = useState(null);

  const plates = useMemo(() => {
    if (!plateMap) return [];
    const s = new Set();
    Object.values(plateMap.bySample).forEach((p) => s.add(p.plate));
    return Array.from(s).sort();
  }, [plateMap]);

  const activePlate = currentPlate || plates[0];

  const edgesOnPlate = useMemo(() => {
    if (!plateMap) return [];
    return events
      .map((e) => {
        const a = plateMap.bySample[e.source];
        const b = plateMap.bySample[e.target];
        if (!a || !b) return null;
        if (a.plate !== activePlate || b.plate !== activePlate) return null;
        return { ...e, a, b };
      })
      .filter(Boolean);
  }, [events, plateMap, activePlate]);

  const highlightSamples = useMemo(() => {
    const h = {};
    if (hoverEvent) {
      h[hoverEvent.source] = "#00a3a6";
      h[hoverEvent.target] = "#ed6e6c";
    }
    return h;
  }, [hoverEvent]);

  return (
    <div>
      <SectionTitle eyebrow="Plate map" title="Physical proximity on the plate">
        Cross-sample (well-to-well) contamination happens between neighboring wells.
        Checking the geographic proximity of a source / target pair is one of the
        strongest diagnostic signals.
      </SectionTitle>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode("view")}
          className="px-4 py-1.5 text-[12px] rounded-sm"
          style={{
            background: mode === "view" ? "#275662" : "#fff",
            color: mode === "view" ? "#fff" : "#275662",
            border: "1px solid #275662",
            fontWeight: 700,
            fontFamily: '"Raleway", sans-serif',
          }}
          disabled={!plateMap}
        >
          View
        </button>
        <button
          onClick={() => setMode("edit")}
          className="px-4 py-1.5 text-[12px] rounded-sm"
          style={{
            background: mode === "edit" ? "#275662" : "#fff",
            color: mode === "edit" ? "#fff" : "#275662",
            border: "1px solid #275662",
            fontWeight: 700,
            fontFamily: '"Raleway", sans-serif',
          }}
        >
          Edit
        </button>
      </div>

      {mode === "view" && plateMap && plates.length > 0 && (
        <div className="grid lg:grid-cols-[auto_1fr] gap-8">
          <div>
            {plates.length > 1 && (
              <div className="flex gap-1 mb-3 flex-wrap">
                {plates.map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPlate(p)}
                    className="px-3 py-1 text-[11px] rounded-sm"
                    style={{
                      background: activePlate === p ? "#00a3a6" : "#f6f7f7",
                      color: activePlate === p ? "#fff" : "#275662",
                      fontWeight: 700,
                      border: "1px solid #e6e8e8",
                      fontFamily: '"Raleway", sans-serif',
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
            <PlateGrid
              format={plateMap.format}
              plateId={activePlate}
              plateMap={plateMap}
              highlightSamples={highlightSamples}
              labelMode="sample"
              size={32}
            />
            <div
              className="mt-3 flex items-center gap-4 text-[11px]"
              style={{ color: "#797870" }}
            >
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm" style={{ background: "#00a3a6" }} />
                source
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm" style={{ background: "#ed6e6c" }} />
                target
              </span>
            </div>
          </div>
          <div>
            <div
              className="text-[10px] tracking-[0.15em] uppercase mb-3"
              style={{
                color: "#ed6e6c",
                fontWeight: 700,
                fontFamily: '"Raleway", sans-serif',
              }}
            >
              Events on {activePlate} ({edgesOnPlate.length})
            </div>
            <div
              className="rounded-sm overflow-auto max-h-[480px]"
              style={{ border: "1px solid #e6e8e8" }}
            >
              {edgesOnPlate.map((e) => {
                const dr = Math.abs(e.a.row - e.b.row);
                const dc = Math.abs(e.a.col - e.b.col);
                const d = Math.max(dr, dc);
                return (
                  <button
                    key={e.id}
                    onClick={() => onPick && onPick(e.id)}
                    onMouseEnter={() => setHoverEvent(e)}
                    onMouseLeave={() => setHoverEvent(null)}
                    className="w-full text-left px-3 py-2.5 text-[12px]"
                    style={{
                      borderBottom: "1px solid #f0f2f2",
                      background: "#fff",
                    }}
                    onMouseOver={(ev) => (ev.currentTarget.style.background = "#f6f7f7")}
                    onMouseOut={(ev) => (ev.currentTarget.style.background = "#fff")}
                  >
                    <div className="flex items-center justify-between">
                      <span style={{ color: "#275662", fontWeight: 600 }}>
                        {wellLabel(e.a.row, e.a.col)} → {wellLabel(e.b.row, e.b.col)}
                      </span>
                      {d === 1 ? (
                        <Pill tone="bad">adjacent</Pill>
                      ) : d === 2 ? (
                        <Pill tone="warn">close (Δ=2)</Pill>
                      ) : (
                        <Pill>Δ={d}</Pill>
                      )}
                    </div>
                    <div
                      className="text-[11px] mt-0.5"
                      style={{ color: "#797870" }}
                    >
                      {e.source} → {e.target} · score {e.score.toFixed(2)}
                    </div>
                  </button>
                );
              })}
              {edgesOnPlate.length === 0 && (
                <div
                  className="px-3 py-6 text-center text-[12px]"
                  style={{ color: "#797870" }}
                >
                  No events involve this plate.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {mode === "edit" && (
        <PlateEditor
          samples={samples}
          plateMap={plateMap}
          setPlateMap={setPlateMap}
        />
      )}

      {mode === "view" && !plateMap && (
        <div
          className="p-6 rounded-sm text-[13px]"
          style={{ background: "#f6f7f7", border: "1px solid #e6e8e8", color: "#275662" }}
        >
          No plate map loaded. Upload <code>plate_map.tsv</code> above, or
          switch to Edit mode to build one manually.
        </div>
      )}
    </div>
  );
};

/* ---------- VALIDATE TAB ---------- */
const ValidateTab = ({
  events,
  selected,
  onSelect,
  scatter,
  diag,
  above,
  missing,
  autoScore,
  hasAb,
  setVerdict,
  setNote,
  metadata,
  plateMap,
}) => {
  const sel = selected || events[0];
  if (!sel) return null;
  const idx = events.findIndex((e) => e.id === sel.id);
  const related = areRelated(metadata, sel.source, sel.target);
  const pd = plateDistance(plateMap, sel.source, sel.target);

  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-8">
      <aside>
        <div
          className="text-[10px] tracking-[0.15em] uppercase mb-3 flex items-center justify-between"
          style={{
            color: "#ed6e6c",
            fontWeight: 700,
            fontFamily: '"Raleway", sans-serif',
          }}
        >
          <span>Event queue</span>
          <span className="tabular" style={{ color: "#275662" }}>
            {idx + 1}/{events.length}
          </span>
        </div>
        <EventQueue events={events} currentId={sel.id} onSelect={onSelect} />
      </aside>

      <div>
        <SectionTitle
          eyebrow={`Event ${idx + 1} of ${events.length}`}
          title={`${sel.source} → ${sel.target}`}
        >
          The four criteria from the CroCoDeEL wiki. The automatic score is a hint,
          not a verdict — the plot is the final arbiter.
        </SectionTitle>

        <CascadeBanner
          cascade={sel.cascade}
          onJumpToUpstream={(id) => onSelect(id)}
        />

        <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 mt-6">
          <div>
            {hasAb ? (
              <Scatterplot scatter={scatter} width={520} height={450} />
            ) : (
              <div
                className="p-4 text-[13px] rounded-sm"
                style={{ background: "#fdeceb", border: "1px solid #ed6e6c", color: "#8a2422" }}
              >
                Upload <code>species_abundance.tsv</code> to see the plot and
                enable automatic diagnostics.
              </div>
            )}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Diag
                label="Probability"
                value={sel.score.toFixed(3)}
                tone={sel.score > 0.9 ? "good" : sel.score > 0.7 ? "warn" : "bad"}
              />
              <Diag label="Rate" value={`${(sel.rate * 100).toFixed(2)}%`} />
            </div>

            {plateMap && pd?.samePlate && (
              <div className="mt-4">
                <div
                  className="text-[10px] tracking-[0.15em] uppercase mb-2"
                  style={{
                    color: "#ed6e6c",
                    fontWeight: 700,
                    fontFamily: '"Raleway", sans-serif',
                  }}
                >
                  Position on {plateMap.bySample[sel.source]?.plate}
                </div>
                <PlateGrid
                  format={plateMap.format}
                  plateId={plateMap.bySample[sel.source]?.plate}
                  plateMap={plateMap}
                  highlightSamples={{
                    [sel.source]: "#00a3a6",
                    [sel.target]: "#ed6e6c",
                  }}
                  labelMode="none"
                  size={18}
                />
              </div>
            )}

            {metadata &&
              (metadata.bySample[sel.source] || metadata.bySample[sel.target]) && (
                <div
                  className="mt-4 p-3 rounded-sm text-[12px]"
                  style={{ background: "#f6f7f7", border: "1px solid #e6e8e8" }}
                >
                  <div
                    className="text-[10px] tracking-[0.15em] uppercase mb-2"
                    style={{
                      color: "#ed6e6c",
                      fontWeight: 700,
                      fontFamily: '"Raleway", sans-serif',
                    }}
                  >
                    Metadata
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div style={{ color: "#797870" }}>source</div>
                      <div style={{ color: "#275662", fontWeight: 600 }}>
                        {sel.source}
                      </div>
                      {metadata.bySample[sel.source] && (
                        <div className="text-[11px]" style={{ color: "#797870" }}>
                          {metadata.bySample[sel.source].subject && (
                            <span>subject {metadata.bySample[sel.source].subject}</span>
                          )}
                          {metadata.bySample[sel.source].subject &&
                            metadata.bySample[sel.source].timepoint && " · "}
                          {metadata.bySample[sel.source].timepoint && (
                            <span>t={metadata.bySample[sel.source].timepoint}</span>
                          )}
                        </div>
                      )}
                    </div>
                    <div>
                      <div style={{ color: "#797870" }}>target</div>
                      <div style={{ color: "#275662", fontWeight: 600 }}>
                        {sel.target}
                      </div>
                      {metadata.bySample[sel.target] && (
                        <div className="text-[11px]" style={{ color: "#797870" }}>
                          {metadata.bySample[sel.target].subject && (
                            <span>subject {metadata.bySample[sel.target].subject}</span>
                          )}
                          {metadata.bySample[sel.target].subject &&
                            metadata.bySample[sel.target].timepoint && " · "}
                          {metadata.bySample[sel.target].timepoint && (
                            <span>t={metadata.bySample[sel.target].timepoint}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
          </div>

          <div>
            <div
              className="p-4 mb-4 rounded-sm"
              style={{ background: "#f6f7f7", border: "1px solid #e6e8e8" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="text-[10px] tracking-[0.15em] uppercase"
                  style={{
                    color: "#ed6e6c",
                    fontWeight: 700,
                    fontFamily: '"Raleway", sans-serif',
                  }}
                >
                  Automatic score
                </div>
                <div
                  className="tabular"
                  style={{ color: "#275662", fontFamily: '"Raleway", sans-serif' }}
                >
                  <span style={{ fontSize: 32, fontWeight: 800 }}>{autoScore.good}</span>
                  <span style={{ fontSize: 16, color: "#797870" }}>
                    /{autoScore.total}
                  </span>
                </div>
              </div>
              <div className="space-y-1.5">
                {autoScore.reasons.length === 0 && (
                  <div className="text-[12px]" style={{ color: "#797870" }}>
                    Upload the abundance table to compute.
                  </div>
                )}
                {autoScore.reasons.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 text-[12px]">
                    {r.ok ? (
                      <CheckCircle2
                        className="w-3.5 h-3.5 shrink-0 mt-0.5"
                        style={{ color: "#00a3a6" }}
                      />
                    ) : (
                      <XCircle
                        className="w-3.5 h-3.5 shrink-0 mt-0.5"
                        style={{ color: "#ed6e6c" }}
                      />
                    )}
                    <span style={{ color: "#275662" }}>{r.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <Criterion
              n="01"
              title="Shape of the contamination line"
              wiki="Must be an actual straight line, not a scatter of points."
              pass={diag?.r2 != null ? diag.r2 > 0.8 : null}
              value={
                diag?.r2 != null
                  ? `R² = ${diag.r2.toFixed(3)}`
                  : "abundance table required"
              }
            />
            <Criterion
              n="02"
              title="Number of points on the line"
              wiki="Fewer than ~10 species → possibly random."
              pass={diag?.n != null ? diag.n >= 10 : null}
              value={
                diag?.n != null ? `${diag.n} species` : "abundance table required"
              }
            />
            <Criterion
              n="03"
              title="Abundant source species present in target"
              wiki="All abundant species in the source should appear in the target."
              pass={missing != null ? missing <= 2 : null}
              value={
                missing != null ? `${missing} missing` : "abundance table required"
              }
            />
            <Criterion
              n="04"
              title="Points above the contamination line"
              wiki="Near zero expected. A few tolerable if the source is itself contaminated (cascade)."
              pass={above != null ? above <= 3 : null}
              value={
                above != null ? `${above} above` : "abundance table required"
              }
            />

            {metadata && (
              <ContextualCriterion
                n="05"
                title="Related samples"
                hint="Longitudinal or same subject → false positive risk"
                verdict={
                  related === true
                    ? {
                        tone: "bad",
                        text: `same subject (${metadata.bySample[sel.source]?.subject})`,
                      }
                    : related === false
                      ? { tone: "good", text: "different subjects" }
                      : { tone: "neutral", text: "sample not referenced" }
                }
              />
            )}

            {plateMap && (
              <ContextualCriterion
                n="06"
                title="Proximity on plate"
                hint="Well-to-well leakage → immediate neighbors = strong suspicion"
                verdict={
                  pd == null
                    ? { tone: "neutral", text: "position unknown" }
                    : !pd.samePlate
                      ? {
                          tone: "warn",
                          text: "different plates — well-to-well unlikely",
                        }
                      : pd.distance <= 1
                        ? { tone: "bad", text: "adjacent wells" }
                        : pd.distance === 2
                          ? { tone: "warn", text: "Δ=2 (close)" }
                          : {
                              tone: "good",
                              text: `Δ=${pd.distance} (distant)`,
                            }
                }
              />
            )}

            {sel.introduced.length > 0 && (
              <div className="mt-4">
                <div
                  className="text-[10px] tracking-[0.15em] uppercase mb-2"
                  style={{
                    color: "#ed6e6c",
                    fontWeight: 700,
                    fontFamily: '"Raleway", sans-serif',
                  }}
                >
                  Introduced species ({sel.introduced.length})
                </div>
                <div
                  className="flex flex-wrap gap-1 max-h-28 overflow-auto p-2 rounded-sm"
                  style={{ background: "#fff", border: "1px solid #e6e8e8" }}
                >
                  {sel.introduced.slice(0, 80).map((s, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-1.5 py-0.5 rounded-sm"
                      style={{
                        background: "#f6f7f7",
                        color: "#275662",
                        fontFamily: "system-ui, monospace",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                  {sel.introduced.length > 80 && (
                    <span
                      className="text-[11px] px-1.5 py-0.5"
                      style={{ color: "#797870" }}
                    >
                      + {sel.introduced.length - 80} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6" style={{ borderTop: "1px solid #e6e8e8" }}>
          <div
            className="text-[10px] tracking-[0.15em] uppercase mb-3"
            style={{
              color: "#ed6e6c",
              fontWeight: 700,
              fontFamily: '"Raleway", sans-serif',
            }}
          >
            Your verdict
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <VerdictBtn
              active={sel.verdict === "true_positive"}
              onClick={() => setVerdict(sel.id, "true_positive")}
              tone="good"
              icon={CheckCircle2}
            >
              True positive
            </VerdictBtn>
            <VerdictBtn
              active={sel.verdict === "false_positive"}
              onClick={() => setVerdict(sel.id, "false_positive")}
              tone="bad"
              icon={XCircle}
            >
              False positive
            </VerdictBtn>
            <VerdictBtn
              active={sel.verdict === "uncertain"}
              onClick={() => setVerdict(sel.id, "uncertain")}
              tone="warn"
              icon={HelpCircle}
            >
              Uncertain
            </VerdictBtn>
            <VerdictBtn
              active={sel.verdict === "pending"}
              onClick={() => setVerdict(sel.id, "pending")}
              tone="neutral"
              icon={X}
            >
              Reset
            </VerdictBtn>
          </div>
          <textarea
            value={sel.notes}
            onChange={(e) => setNote(sel.id, e.target.value)}
            placeholder="Notes: related samples? plate position? cascade?"
            rows={3}
            className="w-full px-3 py-2 text-[13px] rounded-sm outline-none"
            style={{ border: "1px solid #c4c0b3" }}
          />
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => onSelect(events[Math.max(0, idx - 1)].id)}
              disabled={idx === 0}
              className="px-5 py-2 text-[12px] rounded-sm"
              style={{
                border: "1px solid #275662",
                background: "#fff",
                color: "#275662",
                fontWeight: 700,
                opacity: idx === 0 ? 0.3 : 1,
                cursor: idx === 0 ? "not-allowed" : "pointer",
                fontFamily: '"Raleway", sans-serif',
              }}
            >
              ← Previous
            </button>
            <button
              onClick={() =>
                onSelect(events[Math.min(events.length - 1, idx + 1)].id)
              }
              disabled={idx === events.length - 1}
              className="px-5 py-2 text-[12px] rounded-sm"
              style={{
                background: "#00a3a6",
                color: "white",
                fontWeight: 700,
                opacity: idx === events.length - 1 ? 0.3 : 1,
                cursor: idx === events.length - 1 ? "not-allowed" : "pointer",
                border: "none",
                fontFamily: '"Raleway", sans-serif',
              }}
            >
              Next event →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- EXPORT TAB ---------- */
const ExportCard = ({ title, desc, action, onClick }) => (
  <div
    className="p-5 flex flex-col rounded-sm"
    style={{ border: "1px solid #e6e8e8", background: "#fff" }}
  >
    <div
      className="mb-2"
      style={{
        color: "#275662",
        fontSize: 18,
        fontWeight: 700,
        fontFamily: '"Raleway", sans-serif',
      }}
    >
      {title}
    </div>
    <div className="text-[13px] flex-1 mb-4" style={{ color: "#797870", lineHeight: 1.5 }}>
      {desc}
    </div>
    <button
      onClick={onClick}
      className="px-4 py-2 text-[12px] rounded-sm flex items-center gap-2 self-start"
      style={{
        background: "#275662",
        color: "white",
        fontWeight: 700,
        letterSpacing: "0.02em",
        border: "none",
        fontFamily: '"Raleway", sans-serif',
      }}
      onMouseOver={(e) => (e.currentTarget.style.background = "#00a3a6")}
      onMouseOut={(e) => (e.currentTarget.style.background = "#275662")}
    >
      <Download className="w-3.5 h-3.5" />
      {action}
    </button>
  </div>
);

const ExportTab = ({ counts, onExportTSV, onExportJSON }) => (
  <div>
    <SectionTitle eyebrow="Export" title="Save your curated report">
      All your verdicts and notes live in browser memory — export before closing
      the tab.
    </SectionTitle>
    <div className="grid md:grid-cols-3 gap-4 mt-8">
      <ExportCard
        title="TSV — true positives only"
        desc="Drop-in replacement for the CroCoDeEL output, keeping only events marked as true positives."
        action="Download TSV"
        onClick={() => onExportTSV(true)}
      />
      <ExportCard
        title="TSV — everything except false positives"
        desc="Includes uncertain and pending events. Useful for partial filtering before full curation."
        action="Download TSV"
        onClick={() => onExportTSV(false)}
      />
      <ExportCard
        title="JSON — full audit trail"
        desc="All events with verdict, notes, metadata context and cascade flags for reproducibility."
        action="Download JSON"
        onClick={onExportJSON}
      />
    </div>
    <div
      className="mt-10 pt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
      style={{ borderTop: "1px solid #e6e8e8" }}
    >
      <Stat label="Total" value={counts.total} />
      <Stat label="True positives" value={counts.tp} tone="good" />
      <Stat label="False positives" value={counts.fp} tone="bad" />
      <Stat label="Pending" value={counts.pending + counts.uncertain} />
    </div>
  </div>
);
/* ============================================================================
   8. MAIN APP
   ============================================================================ */

export default function App() {
  const [rawEvents, setRawEvents] = useState([]);
  const [ab, setAb] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [plateMap, setPlateMap] = useState(null);
  const [tab, setTab] = useState("overview");
  const [selId, setSelId] = useState(null);
  const [filter, setFilter] = useState({
    q: "",
    minScore: 0,
    verdict: "all",
    minRate: 0,
    hideRelated: false,
    adjacentOnly: false,
  });
  const [sort, setSort] = useState({ by: "score", dir: "desc" });
  const [err, setErr] = useState(null);
  const eventFileRef = useRef(null);
  const abFileRef = useRef(null);

  /* ---- derived state ---- */
  const events = useMemo(
    () => detectCascades(rawEvents, ab),
    [rawEvents, ab],
  );

  const allSamples = useMemo(() => {
    if (ab) return ab.samples;
    const s = new Set();
    rawEvents.forEach((e) => {
      s.add(e.source);
      s.add(e.target);
    });
    return Array.from(s).sort();
  }, [ab, rawEvents]);

  const filtered = useMemo(() => {
    const q = filter.q.trim().toLowerCase();
    let res = events.filter((e) => {
      if (e.score < filter.minScore) return false;
      if (e.rate < filter.minRate) return false;
      if (filter.verdict !== "all" && e.verdict !== filter.verdict) return false;
      if (filter.hideRelated && areRelated(metadata, e.source, e.target) === true)
        return false;
      if (filter.adjacentOnly) {
        const pd = plateDistance(plateMap, e.source, e.target);
        if (!pd || !pd.samePlate || pd.distance == null || pd.distance > 1)
          return false;
      }
      if (q) {
        const hay = `${e.source} ${e.target} ${e.introduced.join(
          " ",
        )}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    res.sort((a, b) => {
      const av = a[sort.by];
      const bv = b[sort.by];
      if (typeof av === "string") {
        return sort.dir === "asc"
          ? av.localeCompare(bv)
          : bv.localeCompare(av);
      }
      return sort.dir === "asc" ? av - bv : bv - av;
    });
    return res;
  }, [events, filter, sort, metadata, plateMap]);

  const counts = useMemo(() => {
    const c = {
      total: events.length,
      tp: 0,
      fp: 0,
      uncertain: 0,
      pending: 0,
      samples: new Set(),
      avgRate: 0,
    };
    let rateSum = 0;
    events.forEach((e) => {
      c[
        e.verdict === "true_positive"
          ? "tp"
          : e.verdict === "false_positive"
            ? "fp"
            : e.verdict === "uncertain"
              ? "uncertain"
              : "pending"
      ]++;
      c.samples.add(e.source);
      c.samples.add(e.target);
      rateSum += e.rate;
    });
    c.avgRate = events.length ? rateSum / events.length : 0;
    c.samples = c.samples.size;
    return c;
  }, [events]);

  const selected = events.find((e) => e.id === selId) || null;
  const setVerdict = (id, verdict) =>
    setRawEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, verdict } : e)),
    );
  const setNote = (id, notes) =>
    setRawEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, notes } : e)),
    );

  /* ---- file loaders ---- */
  const loadEvents = async (file) => {
    try {
      const text = await file.text();
      setRawEvents(parseEvents(text));
      setErr(null);
      setTab("overview");
    } catch (e) {
      setErr(`Events file: ${e.message}`);
    }
  };

  const loadAbundance = async (file) => {
    try {
      const text = await file.text();
      const parsed = parseAbundance(text);
      if (!parsed) throw new Error("Could not parse abundance table");
      setAb(parsed);
      setErr(null);
    } catch (e) {
      setErr(`Abundance file: ${e.message}`);
    }
  };

  /* ---- export ---- */
  const downloadFile = (content, name, mime) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportReport = (onlyTP = true) => {
    const kept = events.filter((e) =>
      onlyTP
        ? e.verdict === "true_positive"
        : e.verdict !== "false_positive",
    );
    const header = [
      "source",
      "target",
      "contamination_rate",
      "probability",
      "introduced_species",
      "verdict",
      "notes",
    ];
    const lines = [header.join("\t")];
    kept.forEach((e) => {
      lines.push(
        [
          e.source,
          e.target,
          e.rate,
          e.score,
          e.introduced.join(","),
          e.verdict,
          e.notes.replace(/\t/g, " "),
        ].join("\t"),
      );
    });
    downloadFile(
      lines.join("\n"),
      `contamination_events_curated${onlyTP ? "_TP_only" : ""}.tsv`,
      "text/tab-separated-values",
    );
  };

  const exportJSON = () => {
    const payload = {
      generated: new Date().toISOString(),
      counts: {
        total: counts.total,
        true_positive: counts.tp,
        false_positive: counts.fp,
        uncertain: counts.uncertain,
        pending: counts.pending,
      },
      has_metadata: !!metadata,
      has_plate_map: !!plateMap,
      events: events.map((e) => ({
        source: e.source,
        target: e.target,
        contamination_rate: e.rate,
        probability: e.score,
        introduced_species: e.introduced,
        verdict: e.verdict,
        notes: e.notes,
        related_samples: areRelated(metadata, e.source, e.target),
        plate_distance: plateDistance(plateMap, e.source, e.target),
        cascade: e.cascade,
      })),
    };
    downloadFile(
      JSON.stringify(payload, null, 2),
      "crocodeel_curation_report.json",
      "application/json",
    );
  };

  /* ---- diagnostics for selected event ---- */
  const scatter = useMemo(
    () => (selected ? buildScatter(ab, selected) : null),
    [ab, selected],
  );
  const diag = useMemo(() => lineDiagnostics(scatter), [scatter]);
  const above = useMemo(() => pointsAboveLine(scatter), [scatter]);
  const missing = useMemo(
    () =>
      selected && ab
        ? missingAbundantFromSource(ab, selected.source, selected.target)
        : null,
    [ab, selected],
  );
  const autoScore = useMemo(
    () => automaticScore(diag, above, missing),
    [diag, above, missing],
  );

  /* ============================================================
     RENDER
     ============================================================ */
  return (
    <div
      className="min-h-screen"
      style={{
        background: "#fff",
        color: "#275662",
        fontFamily:
          '"Avenir Next", "Nunito Sans", system-ui, -apple-system, sans-serif',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800&family=Nunito+Sans:opsz,wght@6..12,400;6..12,500;6..12,600;6..12,700&display=swap');
        .tabular { font-variant-numeric: tabular-nums; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-thumb { background: #c4c0b3; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #00a3a6; }
      `}</style>

      {/* ==================== HEADER ==================== */}
      <header style={{ borderBottom: "3px solid #00a3a6", background: "#fff" }}>
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center gap-8 flex-wrap">
            <RepubliqueFrancaise height={46} />
            <div style={{ width: 1, height: 46, background: "#c4c0b3" }} />
            <InraeLogo height={36} />
            <div style={{ width: 1, height: 46, background: "#c4c0b3" }} />
            <div className="flex items-center gap-3">
              <img
                src={CROCODEEL_LOGO}
                alt="CroCoDeEL"
                style={{
                  height: 46,
                  width: 46,
                  borderRadius: "50%",
                  display: "block",
                }}
              />
              <div className="leading-tight">
                <div
                  className="text-[20px]"
                  style={{
                    color: "#275662",
                    fontWeight: 800,
                    letterSpacing: "-0.01em",
                    fontFamily: '"Raleway", sans-serif',
                  }}
                >
                  CroCoDeEL
                </div>
                <div
                  className="text-[10px] uppercase tracking-[0.15em]"
                  style={{
                    color: "#797870",
                    fontFamily: '"Raleway", sans-serif',
                  }}
                >
                  Interpretation console
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ==================== SUB-BANNER ==================== */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-[1fr_auto] gap-6 items-end">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Chevron size={14} color="#ed6e6c" />
              <span
                className="text-[11px] tracking-[0.15em] uppercase"
                style={{
                  color: "#ed6e6c",
                  fontWeight: 700,
                  fontFamily: '"Raleway", sans-serif',
                }}
              >
                Metagenomics · Cross-sample contamination detection
              </span>
            </div>
            <h1
              className="text-[42px] leading-[1.05] tracking-tight"
              style={{
                color: "#275662",
                fontWeight: 800,
                fontFamily: '"Raleway", sans-serif',
              }}
            >
              Interpreting CroCoDeEL results
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-stone-700 max-w-2xl">
              Upload your events file and abundance table, then walk through each
              flagged pair with interactive scatterplots, automatic diagnostics
              and a guided validation workflow. Export a curated TSV when you are
              done.
            </p>
          </div>
          <div className="text-right">
            <a
              href="https://github.com/metagenopolis/CroCoDeEL"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[12px] font-semibold hover:underline"
              style={{ color: "#00a3a6", fontFamily: '"Raleway", sans-serif' }}
            >
              github.com/metagenopolis/CroCoDeEL{" "}
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <div className="text-[11px] text-stone-500 mt-1">
              100% browser-based — no server upload
            </div>
          </div>
        </div>
      </section>

      {/* ==================== UPLOAD BAR ==================== */}
      <section
        style={{
          background: "#f6f7f7",
          borderTop: "1px solid #e6e8e8",
          borderBottom: "1px solid #e6e8e8",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 grid md:grid-cols-2 gap-4">
          <UploadCard
            label="contamination_events.tsv"
            hint="CroCoDeEL output — required"
            filename={events.length ? `${events.length} events loaded` : null}
            onFile={loadEvents}
            primary
            inputRef={eventFileRef}
          />
          <UploadCard
            label="species_abundance.tsv"
            hint="Abundance table — enables scatterplots and automatic scoring"
            filename={
              ab
                ? `${ab.samples.length} samples × ${ab.species.length} species`
                : null
            }
            onFile={loadAbundance}
            inputRef={abFileRef}
          />
          <MetadataUploadCard
            metadata={metadata}
            setMetadata={setMetadata}
            setErr={setErr}
          />
          <PlateUploadCard
            plateMap={plateMap}
            setPlateMap={setPlateMap}
            setErr={setErr}
          />
        </div>
        {err && (
          <div className="max-w-7xl mx-auto px-6 pb-4">
            <div
              className="flex items-center gap-2 text-sm px-3 py-2 rounded-sm"
              style={{
                background: "#fdeceb",
                border: "1px solid #ed6e6c",
                color: "#8a2422",
              }}
            >
              <AlertCircle className="w-4 h-4" />
              {err}
            </div>
          </div>
        )}
      </section>

      {/* ==================== CONTENT ==================== */}
      {events.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <nav
            className="flex flex-wrap gap-0 mb-8"
            style={{ borderBottom: "2px solid #e6e8e8" }}
          >
            {[
              { id: "overview", label: "Overview", icon: BookOpen },
              { id: "table", label: "Events table", icon: TableIcon },
              { id: "scatter", label: "Scatterplot", icon: ScatterIcon },
              { id: "network", label: "Network", icon: GitBranch },
              { id: "plate", label: "Plate map", icon: MapPin },
              { id: "validate", label: "Guided validation", icon: ClipboardCheck },
              { id: "export", label: "Export", icon: Download },
            ].map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className="px-5 py-3 text-[13px] flex items-center gap-2"
                  style={{
                    borderBottom: active
                      ? "3px solid #00a3a6"
                      : "3px solid transparent",
                    color: active ? "#275662" : "#797870",
                    fontWeight: active ? 700 : 500,
                    marginBottom: "-2px",
                    fontFamily: '"Raleway", sans-serif',
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {t.label}
                </button>
              );
            })}
          </nav>

          {tab === "overview" && (
            <Overview
              counts={counts}
              events={events}
              hasAb={!!ab}
              metadata={metadata}
              plateMap={plateMap}
              onOpen={(id) => {
                setSelId(id);
                setTab("validate");
              }}
            />
          )}
          {tab === "table" && (
            <EventsTable
              events={filtered}
              total={events.length}
              filter={filter}
              setFilter={setFilter}
              sort={sort}
              setSort={setSort}
              metadata={metadata}
              plateMap={plateMap}
              onPick={(id) => {
                setSelId(id);
                setTab(ab ? "validate" : "scatter");
              }}
              setVerdict={setVerdict}
            />
          )}
          {tab === "scatter" && (
            <ScatterTab
              events={events}
              selected={selected}
              onSelect={setSelId}
              scatter={scatter}
              ab={ab}
              diag={diag}
              above={above}
              missing={missing}
              metadata={metadata}
              plateMap={plateMap}
            />
          )}
          {tab === "network" && (
            <NetworkTab
              events={events}
              onPick={(id) => {
                setSelId(id);
                setTab("validate");
              }}
            />
          )}
          {tab === "plate" && (
            <PlateTab
              events={events}
              plateMap={plateMap}
              setPlateMap={setPlateMap}
              samples={allSamples}
              onPick={(id) => {
                setSelId(id);
                setTab("validate");
              }}
            />
          )}
          {tab === "validate" && (
            <ValidateTab
              events={events}
              selected={selected}
              onSelect={setSelId}
              scatter={scatter}
              diag={diag}
              above={above}
              missing={missing}
              autoScore={autoScore}
              hasAb={!!ab}
              setVerdict={setVerdict}
              setNote={setNote}
              metadata={metadata}
              plateMap={plateMap}
            />
          )}
          {tab === "export" && (
            <ExportTab
              counts={counts}
              onExportTSV={exportReport}
              onExportJSON={exportJSON}
            />
          )}
        </div>
      )}

      {/* ==================== FOOTER ==================== */}
      <footer
        style={{
          background: "#fff",
          borderTop: "1px solid #e6e8e8",
          marginTop: 48,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col items-center text-center gap-4">
            <Chevron size={18} color="#00a3a6" />
            <div
              className="text-[13px]"
              style={{
                color: "#275662",
                fontWeight: 600,
                fontFamily: '"Raleway", sans-serif',
              }}
            >
              Institut national de recherche pour
              <br />
              <span style={{ fontWeight: 800 }}>
                l'agriculture, l'alimentation et l'environnement
              </span>
            </div>
            <div className="flex items-center gap-6 mt-2">
              <RepubliqueFrancaise height={40} />
              <InraeLogo height={28} />
            </div>
            <div
              className="text-[11px] mt-4 max-w-2xl leading-relaxed"
              style={{ color: "#797870" }}
            >
              Interpretation aid for CroCoDeEL results. Not officially affiliated
              with Metagenopolis. Cite: Goulet, L. et al., bioRxiv 2025,
              doi:10.1101/2025.01.15.633153.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
