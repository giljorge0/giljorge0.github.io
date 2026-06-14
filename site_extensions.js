/* ============================================================
   SITE EXTENSIONS
   Projects filtering · Writing grid · Omni stats (v2)
   ============================================================ */

'use strict';

(function () {

  /* ── Inject critical CSS fallback ──────────────────────── */
  (function injectCSS() {
    if (document.getElementById('omni-inline-css')) return;
    const s = document.createElement('style');
    s.id = 'omni-inline-css';
    s.textContent = `
      .omni-section{margin-top:4rem;padding:3rem 0 0;border-top:1px solid rgba(255,255,255,.06);display:flex;flex-direction:column;gap:2rem}
      .omni-title{font-family:'Fraunces',serif;font-size:clamp(1.4rem,3.5vw,2rem);font-weight:300;font-style:italic;color:#e8e0d4;margin-bottom:.5rem}
      .omni-sub{font-family:'IBM Plex Mono',monospace;font-size:.67rem;letter-spacing:.05em;color:#60584c;text-transform:uppercase}
      .omni-counters{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:.75rem}
      .omni-counter-item{border:1px solid rgba(255,255,255,.06);border-radius:6px;background:#12121a;padding:1rem 1.5rem;position:relative;overflow:hidden}
      .omni-counter-item::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#6577a8,transparent)}
      .omni-counter-val{font-family:'Fraunces',serif;font-size:1.8rem;font-weight:300;color:#6577a8;display:block;margin-bottom:.25rem}
      .omni-counter-label{font-family:'IBM Plex Mono',monospace;font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:#60584c}
      .omni-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
      .omni-card{border:1px solid rgba(255,255,255,.06);border-radius:6px;background:#12121a;padding:1.5rem 2rem;position:relative;overflow:hidden}
      .omni-card::after{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,#6577a8,transparent 60%)}
      .omni-card--wide{grid-column:1/-1}
      .omni-card-title{font-family:'IBM Plex Mono',monospace;font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;color:#60584c;margin-bottom:1rem}
      .omni-card-sub{font-family:'IBM Plex Mono',monospace;font-size:.6rem;color:#60584c;margin-bottom:.75rem}
      .omni-card-body{font-size:.85rem;color:#a09888;line-height:1.6}
      .omni-source-row{display:flex;align-items:center;gap:.75rem;margin-bottom:.5rem}
      .omni-source-label{font-family:'IBM Plex Mono',monospace;font-size:.67rem;color:#a09888;min-width:130px}
      .omni-source-bar-bg{flex:1;height:4px;background:rgba(255,255,255,.06);border-radius:99px;overflow:hidden}
      .omni-source-bar{height:100%;border-radius:99px;background:linear-gradient(90deg,#6577a8,#c8a86b);transition:width 800ms;width:0}
      .omni-source-count{font-family:'IBM Plex Mono',monospace;font-size:.6rem;color:#60584c;min-width:50px;text-align:right}
      .omni-llm-stat{display:flex;justify-content:space-between;padding:.5rem 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:.82rem}
      .omni-llm-stat:last-child{border-bottom:none}
      .omni-llm-stat-label{color:#a09888}.omni-llm-stat-val{color:#e8e0d4;font-family:'IBM Plex Mono',monospace;font-size:.78rem}
      .omni-chart{display:flex;align-items:flex-end;gap:2px;height:100px}
      .omni-stacked-col{flex:1;display:flex;flex-direction:column-reverse;align-items:stretch;gap:1px;min-width:0}
      .omni-stacked-seg{width:100%;min-height:0;border-radius:1px;opacity:.8}.omni-stacked-seg:hover{opacity:1}
      .omni-stacked-legend{display:flex;gap:1rem;margin-bottom:.75rem;flex-wrap:wrap}
      .omni-legend-item{display:flex;align-items:center;gap:.5rem;font-family:'IBM Plex Mono',monospace;font-size:.58rem;color:#60584c}
      .omni-legend-swatch{width:10px;height:10px;border-radius:2px}
      .omni-bar-label{font-family:'IBM Plex Mono',monospace;font-size:.5rem;color:#60584c;writing-mode:vertical-rl;text-orientation:mixed;transform:rotate(180deg);white-space:nowrap;max-height:40px;overflow:hidden}
      .omni-tag-cloud{display:flex;flex-wrap:wrap;gap:.5rem}
      .omni-tag{font-family:'IBM Plex Mono',monospace;font-size:.62rem;color:#a09888;border:1px solid rgba(255,255,255,.06);border-radius:2px;padding:2px .75rem}
      .omni-tag-count{color:#60584c;margin-left:.25rem;font-size:.55rem}
      .omni-cluster-item{padding:.75rem 0;border-bottom:1px solid rgba(255,255,255,.06)}.omni-cluster-item:last-child{border-bottom:none}
      .omni-cluster-head{display:flex;justify-content:space-between;margin-bottom:.25rem}
      .omni-cluster-id{font-family:'IBM Plex Mono',monospace;font-size:.62rem;color:#6577a8;text-transform:uppercase}
      .omni-cluster-size{font-family:'IBM Plex Mono',monospace;font-size:.58rem;color:#60584c}
      .omni-cluster-samples{font-size:.82rem;color:#a09888;font-style:italic}
      .omni-highlight{padding:1rem 0;border-bottom:1px solid rgba(255,255,255,.06)}.omni-highlight:last-child{border-bottom:none}
      .omni-highlight-title{font-family:'Fraunces',serif;font-size:.95rem;color:#e8e0d4;margin-bottom:.25rem}
      .omni-highlight-excerpt{font-size:.82rem;color:#a09888;font-style:italic;margin-bottom:.5rem}
      .omni-highlight-meta{display:flex;gap:.75rem;flex-wrap:wrap}
      .omni-highlight-meta span{font-family:'IBM Plex Mono',monospace;font-size:.58rem;color:#60584c}
      .omni-highlight-centrality{color:#c8a86b!important}
      .omni-rabbit-chart{display:flex;align-items:flex-end;gap:.5rem;height:140px;margin:.5rem 0 1rem}
      .omni-rabbit-bar-wrap{flex:1;display:flex;flex-direction:column;align-items:center;gap:.25rem}
      .omni-rabbit-bar{width:100%;min-height:2px;background:#c8a86b;border-radius:2px 2px 0 0;opacity:.7}.omni-rabbit-bar:hover{opacity:1}
      .omni-rabbit-bar-count{font-family:'IBM Plex Mono',monospace;font-size:.52rem;color:#a09888;text-align:center;margin-bottom:2px}
      .omni-rabbit-bar-label{font-family:'IBM Plex Mono',monospace;font-size:.5rem;color:#60584c;text-align:center;white-space:nowrap}
      .omni-rabbit-stat{display:flex;justify-content:space-between;font-family:'IBM Plex Mono',monospace;font-size:.67rem;padding:.25rem 0;color:#60584c}
      .omni-rabbit-stat-val{color:#e8e0d4}
      .omni-rabbit-thread{display:flex;justify-content:space-between;align-items:baseline;padding:.5rem 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:.78rem}
      .omni-rabbit-thread:last-child{border-bottom:none}
      .omni-rabbit-thread-title{color:#a09888;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-right:.75rem}
      .omni-rabbit-thread-turns{font-family:'IBM Plex Mono',monospace;font-size:.67rem;color:#c8a86b;white-space:nowrap}
      .omni-rabbit-thread-platform{font-family:'IBM Plex Mono',monospace;font-size:.55rem;color:#60584c;margin-left:.5rem}
      .omni-obsession-bars{display:flex;flex-direction:column;gap:.5rem}
      .omni-obsession-row{display:flex;align-items:center;gap:.75rem}
      .omni-obsession-label{font-family:'IBM Plex Mono',monospace;font-size:.62rem;color:#a09888;min-width:100px;text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
      .omni-obsession-bar-bg{flex:1;height:6px;background:rgba(255,255,255,.06);border-radius:99px;overflow:hidden}
      .omni-obsession-bar{height:100%;border-radius:99px;background:#c8a86b;transition:width 800ms;width:0}
      .omni-obsession-count{font-family:'IBM Plex Mono',monospace;font-size:.55rem;color:#60584c;min-width:30px}
      @media(max-width:900px){.omni-grid-2{grid-template-columns:1fr}.omni-counters{grid-template-columns:repeat(2,1fr)}}
    `;
    document.head.appendChild(s);
  })();

  /* ── Platform colors ───────────────────────────────────── */
  const PLATFORM_COLORS = {
    'ChatGPT': '#74aa9c',
    'Claude':  '#d4a574',
    'DeepSeek': '#4d6bce',
    'Gemini':  '#8b7ec4',
    'Other':   '#888888',
  };

  function platformColor(name) {
    return PLATFORM_COLORS[name] || '#888888';
  }

  /* ── Source labels ─────────────────────────────────────── */
  const SOURCE_LABELS = {
    'llm_chat': 'LLM Conversations',
    'roam_note': 'Personal Notes',
    'heading': 'Note Sections',
    'youtube_watch': 'YouTube History',
    'youtube_search': 'YouTube Searches',
    'search_history': 'Search History',
    'browser_history': 'Web Browsing',
    'google_search': 'Google Searches',
    'kindle_clipping': 'Kindle Highlights',
    'raw_file': 'Imported Files',
    'pdf_chunk': 'PDF Excerpts',
    'pdf_parent': 'PDF Documents',
    'wiki_page': 'Wiki Pages',
    'web_clip': 'Web Clippings',
    'other_internal': 'Other',
    'unknown': 'Other',
  };
  function sourceLabel(type) {
    return SOURCE_LABELS[type] || type.replace(/_/g, ' ');
  }

  /* ── Project Category Filters ──────────────────────────── */
  const projFilters = document.querySelectorAll('.proj-filter');
  const projCards   = document.querySelectorAll('.proj-card');

  projFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      projFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      let delay = 0;
      projCards.forEach(card => {
        if (cat === 'all' || card.dataset.cat === cat) {
          card.hidden = false;
          card.style.animationDelay = delay + 'ms';
          delay += 60;
        } else {
          card.hidden = true;
        }
      });
    });
  });

  /* ── Writing Grid ──────────────────────────────────────── */
  async function loadWriting() {
    const grid = document.getElementById('writing-grid');
    const empty = document.getElementById('writing-empty');
    if (!grid) return;
    try {
      const res = await fetch('writing.json');
      if (!res.ok) throw new Error();
      const pieces = await res.json();
      if (!pieces?.length) { if (empty) empty.style.display = ''; return; }
      grid.innerHTML = '';
      pieces.forEach((piece, i) => {
        const card = document.createElement('div');
        card.className = 'writing-card';
        card.style.animationDelay = (i * 50) + 'ms';
        card.innerHTML = `
          ${piece.tag ? `<div class="writing-card-tag">${esc(piece.tag)}</div>` : ''}
          <div class="writing-card-title">${esc(piece.title || 'Untitled')}</div>
          <div class="writing-card-excerpt">${esc(piece.excerpt || '')}</div>
          <div class="writing-card-meta">${
            [piece.date, piece.word_count ? piece.word_count.toLocaleString() + ' words' : null]
              .filter(Boolean).join(' · ')}</div>`;
        if (piece.content) {
          card.addEventListener('click', () => {
            const reader = document.getElementById('note-reader');
            if (!reader) return;
            document.getElementById('reader-title').textContent = piece.title || 'Untitled';
            document.getElementById('reader-meta').textContent = [piece.tag, piece.date].filter(Boolean).join(' · ');
            document.getElementById('reader-body').innerHTML = simpleRender(piece.content);
            reader.hidden = false;
            document.body.style.overflow = 'hidden';
          });
        } else if (piece.url) {
          card.addEventListener('click', () => window.open(piece.url, '_blank'));
        }
        grid.appendChild(card);
      });
    } catch { if (empty) empty.style.display = ''; }
  }

  /* ── Omni Intelligence Dashboard ─────────────────────────── */
  async function loadOmniStats() {
    const section = document.getElementById('omni-section');
    if (!section) return;

    try {
      const res = await fetch('omni_stats.json');
      if (!res.ok) throw new Error();
      const s = await res.json();
      section.style.display = '';

      // ── Big counters ──────────────────────────────────
      renderCounters(s);

      // ── Source composition ────────────────────────────
      renderSources(s);

      // ── LLM breakdown ────────────────────────────────
      renderLLMStats(s);

      // ── Stacked monthly chart ────────────────────────
      renderStackedChart(s);

      // ── Rabbit Hole ──────────────────────────────────
      renderRabbitHole(s);

      // ── Obsession Map ────────────────────────────────
      renderObsessionMap(s);

      // ── Tags ─────────────────────────────────────────
      renderTags(s);

      // ── Clusters ─────────────────────────────────────
      renderClusters(s);

      // ── Highlights ───────────────────────────────────
      renderHighlights(s);

    } catch { /* no data, section stays hidden */ }
  }

  function renderCounters(s) {
    const el = document.getElementById('omni-counters');
    if (!el) return;
    const items = [
      { val: fmtNum(s.corpus?.total_notes), label: 'total notes' },
      { val: fmtNum(s.corpus?.total_words), label: 'total words' },
      { val: fmtNum(s.corpus?.total_edges), label: 'edges' },
      { val: fmtNum(s.llm?.total_conversations), label: 'LLM conversations' },
      { val: fmtNum(s.llm?.user_prompts), label: 'prompts sent' },
      { val: fmtNum(s.llm?.assistant_responses), label: 'responses received' },
    ];
    el.innerHTML = items.map(i =>
      `<div class="omni-counter-item">
        <span class="omni-counter-val">${i.val}</span>
        <span class="omni-counter-label">${esc(i.label)}</span>
      </div>`
    ).join('');
  }

  function renderSources(s) {
    const el = document.getElementById('omni-sources-body');
    if (!el || !s.sources?.by_type) return;
    const entries = Object.entries(s.sources.by_type).sort((a, b) => b[1].notes - a[1].notes);
    const max = entries[0]?.[1]?.notes || 1;

    let html = entries.map(([type, data]) => {
      const pct = (data.notes / max * 100).toFixed(1);
      return `<div class="omni-source-row">
        <span class="omni-source-label">${esc(sourceLabel(type))}</span>
        <div class="omni-source-bar-bg"><div class="omni-source-bar" data-pct="${pct}"></div></div>
        <span class="omni-source-count">${fmtNum(data.notes)}</span>
      </div>`;
    }).join('');

    if (s.sources?.provenance) {
      const out = s.sources.provenance.output;
      const inp = s.sources.provenance.input;
      if (out && inp) {
        const total = out.notes + inp.notes;
        const outPct = ((out.notes / total) * 100).toFixed(0);
        html += `<div style="margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,.06);">
          <div class="omni-source-row">
            <span class="omni-source-label" style="color:#c8a86b">Your words</span>
            <div class="omni-source-bar-bg"><div class="omni-source-bar" data-pct="${outPct}" style="background:#c8a86b"></div></div>
            <span class="omni-source-count">${outPct}%</span>
          </div>
          <div class="omni-source-row">
            <span class="omni-source-label" style="color:#6577a8">External input</span>
            <div class="omni-source-bar-bg"><div class="omni-source-bar" data-pct="${100-outPct}" style="background:#6577a8"></div></div>
            <span class="omni-source-count">${100-outPct}%</span>
          </div>
        </div>`;
      }
    }

    el.innerHTML = html;
    requestAnimationFrame(() => setTimeout(() => {
      el.querySelectorAll('.omni-source-bar').forEach(b => b.style.width = b.dataset.pct + '%');
    }, 100));
  }

  function renderLLMStats(s) {
    const el = document.getElementById('omni-llm-body');
    if (!el || !s.llm) return;
    const rows = [
      ['Total messages', fmtNum(s.llm.total_messages)],
      ['Conversations', fmtNum(s.llm.total_conversations)],
      ['Your prompts', fmtNum(s.llm.user_prompts)],
      ['AI responses', fmtNum(s.llm.assistant_responses)],
    ];
    if (s.llm.words_by_role) {
      rows.push(['Words I wrote', fmtNum(s.llm.words_by_role.user)]);
      rows.push(['Words AI wrote', fmtNum(s.llm.words_by_role.assistant)]);
    }
    let html = rows.map(([l, v]) =>
      `<div class="omni-llm-stat"><span class="omni-llm-stat-label">${esc(l)}</span><span class="omni-llm-stat-val">${v}</span></div>`
    ).join('');

    if (s.llm.by_platform) {
      html += '<div style="margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,.06);">';
      for (const [p, c] of Object.entries(s.llm.by_platform)) {
        const color = platformColor(p);
        html += `<div class="omni-llm-stat">
          <span class="omni-llm-stat-label"><span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${color};margin-right:6px;vertical-align:middle"></span>${esc(p)}</span>
          <span class="omni-llm-stat-val">${fmtNum(c)} msgs</span>
        </div>`;
      }
      html += '</div>';
    }
    el.innerHTML = html;
  }

  function renderStackedChart(s) {
    const chartEl = document.getElementById('omni-monthly-chart');
    const legendEl = document.getElementById('omni-platform-legend');
    if (!chartEl || !s.llm?.monthly_stacked) return;

    const months = Object.entries(s.llm.monthly_stacked);
    const platforms = s.llm.platforms || Object.keys(s.llm.by_platform || {});
    if (!months.length || !platforms.length) return;

    // Legend
    if (legendEl) {
      legendEl.innerHTML = platforms.map(p =>
        `<span class="omni-legend-item"><span class="omni-legend-swatch" style="background:${platformColor(p)}"></span>${esc(p)}</span>`
      ).join('');
    }

    // Find max total per month
    let maxTotal = 0;
    for (const [, data] of months) {
      const total = platforms.reduce((sum, p) => sum + (data[p] || 0), 0);
      if (total > maxTotal) maxTotal = total;
    }
    if (maxTotal === 0) maxTotal = 1;

    const recent = months.slice(-24);
    chartEl.innerHTML = recent.map(([month, data]) => {
      const label = month.slice(2);
      const segments = platforms.map(p => {
        const count = data[p] || 0;
        const h = Math.max(0, (count / maxTotal) * 90);
        if (h < 1) return '';
        return `<div class="omni-stacked-seg" style="height:${h}px;background:${platformColor(p)}" title="${p}: ${count}"></div>`;
      }).join('');
      return `<div class="omni-stacked-col" title="${month}">
        ${segments}
        <span class="omni-bar-label" style="writing-mode:vertical-rl;transform:rotate(180deg);font-size:.45rem;color:#60584c;margin-top:4px">${label}</span>
      </div>`;
    }).join('');
  }

  function renderRabbitHole(s) {
    const chartEl = document.getElementById('omni-rabbit-chart');
    const subEl = document.getElementById('omni-rabbit-sub');
    const longestEl = document.getElementById('omni-rabbit-longest');
    const rh = s.llm?.rabbit_hole;
    if (!rh) return;

    // Subtitle
    if (subEl) {
      subEl.textContent = `Median ${rh.median_turns} turns · max ${rh.max_turns} turns across ${fmtNum(rh.total_conversations)} conversations`;
    }

    // Histogram
    if (chartEl && rh.histogram) {
      const buckets = Object.entries(rh.histogram);
      const max = Math.max(...buckets.map(b => b[1]));
      chartEl.innerHTML = buckets.map(([label, count]) => {
        const h = max > 0 ? Math.max(2, (count / max) * 85) : 2;
        return `<div class="omni-rabbit-bar-wrap">
          <span class="omni-rabbit-bar-count">${count}</span>
          <div class="omni-rabbit-bar" style="height:${h}px" title="${label} turns: ${count} conversations"></div>
          <span class="omni-rabbit-bar-label">${label}</span>
        </div>`;
      }).join('');
    }

    // Longest threads
    if (longestEl && rh.longest?.length) {
      let html = '<div style="margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.06);">';
      html += '<div class="omni-rabbit-stat" style="margin-bottom:4px"><span>Deepest rabbit holes</span><span></span></div>';
      html += rh.longest.slice(0, 5).map(t =>
        `<div class="omni-rabbit-thread">
          <span class="omni-rabbit-thread-title">${esc(t.title)}</span>
          <span class="omni-rabbit-thread-turns">${t.turns} turns</span>
          <span class="omni-rabbit-thread-platform">${esc(t.platform)}</span>
        </div>`
      ).join('');
      html += '</div>';
      longestEl.innerHTML = html;
    }
  }

  function renderObsessionMap(s) {
    const el = document.getElementById('omni-obsession-body');
    const obs = s.llm?.obsession_map;
    if (!el || !obs?.top_topics) return;

    const entries = Object.entries(obs.top_topics).slice(0, 15);
    const max = entries[0]?.[1] || 1;

    el.innerHTML = '<div class="omni-obsession-bars">' +
      entries.map(([topic, count]) => {
        const pct = (count / max * 100).toFixed(1);
        return `<div class="omni-obsession-row">
          <span class="omni-obsession-label">${esc(topic)}</span>
          <div class="omni-obsession-bar-bg"><div class="omni-obsession-bar" data-pct="${pct}"></div></div>
          <span class="omni-obsession-count">${count}</span>
        </div>`;
      }).join('') + '</div>';

    requestAnimationFrame(() => setTimeout(() => {
      el.querySelectorAll('.omni-obsession-bar').forEach(b => b.style.width = b.dataset.pct + '%');
    }, 200));
  }

  function renderTags(s) {
    const el = document.getElementById('omni-tags-body');
    if (!el || !s.tags?.top_30) return;
    const tags = Object.entries(s.tags.top_30);
    el.innerHTML = '<div class="omni-tag-cloud">' +
      tags.map(([tag, count]) =>
        `<span class="omni-tag">${esc(tag)}<span class="omni-tag-count">${count}</span></span>`
      ).join('') + '</div>';
  }

  function renderClusters(s) {
    const el = document.getElementById('omni-clusters-body');
    if (!el || !s.clusters?.length) return;
    el.innerHTML = s.clusters.slice(0, 8).map(c =>
      `<div class="omni-cluster-item">
        <div class="omni-cluster-head">
          <span class="omni-cluster-id">Cluster ${c.id}</span>
          <span class="omni-cluster-size">${fmtNum(c.size)} notes</span>
        </div>
        <div class="omni-cluster-samples">${c.sample_titles.map(t => esc(t)).join(' · ')}</div>
      </div>`
    ).join('');
  }

  function renderHighlights(s) {
    const el = document.getElementById('omni-highlights-body');
    if (!el || !s.highlights?.length) return;
    el.innerHTML = s.highlights.map(h =>
      `<div class="omni-highlight">
        <div class="omni-highlight-title">${esc(h.title)}</div>
        ${h.excerpt ? `<div class="omni-highlight-excerpt">${esc(h.excerpt)}</div>` : ''}
        <div class="omni-highlight-meta">
          <span class="omni-highlight-centrality">centrality ${h.centrality.toFixed(5)}</span>
          <span>${fmtNum(h.word_count)} words</span>
          <span>${esc(sourceLabel(h.source_type || ''))}</span>
          ${h.tags?.length ? h.tags.map(t => `<span>${esc(t)}</span>`).join('') : ''}
        </div>
      </div>`
    ).join('');
  }

  /* ── Helpers ────────────────────────────────────────────── */
  function esc(str) {
    if (!str) return '';
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  function fmtNum(n) {
    if (n == null || isNaN(n)) return '—';
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 1_000) return (n / 1_000).toFixed(1) + 'k';
    return String(n);
  }

  function simpleRender(text) {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(?!<[h|b|p])/, '<p>')
      .replace(/$(?![>])/, '</p>');
  }

  /* ── Init ──────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    loadWriting();
    loadOmniStats();
  });

})();
