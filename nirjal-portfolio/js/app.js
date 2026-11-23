(function(){
  var NL = window.NL, D = NL.data, body = document.body, root = document.documentElement, view = document.getElementById('view');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var timers = [], R = D.reviewer;
  var TITLES = { home:'Nirjal Lamichhane | Mechanical Engineer', work:'Work | Nirjal Lamichhane', research:'Research and peer review | Nirjal Lamichhane', about:'About | Nirjal Lamichhane', contact:'Contact | Nirjal Lamichhane' };
  var ICON = {
    linkedin:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3zM9.5 9.75h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.6 4.77 6v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4z"/></svg>',
    scholar:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 1 9l11 6 9-4.9V17h2V9zM5 13.2v3.6C6.8 18.6 9.3 19.5 12 19.5s5.2-.9 7-2.7v-3.6l-7 3.8z"/></svg>',
    facebook:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.87.25-1.46 1.5-1.46H16.6V4.46A21 21 0 0 0 14.3 4.3c-2.3 0-3.85 1.4-3.85 3.97v2.23H7.9v3h2.55V21z"/></svg>',
    instagram:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6" fill="currentColor"/></svg>',
    mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6 8.5 7 8.5-7"/></svg>'
  };
  function socials(){
    return '<div class="socials">' +
      '<a href="mailto:' + D.email + '" aria-label="Email">' + ICON.mail + '</a>' +
      '<a href="' + D.linkedin + '" target="_blank" rel="noopener" aria-label="LinkedIn">' + ICON.linkedin + '</a>' +
      '<a href="' + D.scholar + '" target="_blank" rel="noopener" aria-label="Google Scholar">' + ICON.scholar + '</a>' +
      '<a href="' + D.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' + ICON.instagram + '</a>' +
      '<a href="' + D.facebook + '" target="_blank" rel="noopener" aria-label="Facebook">' + ICON.facebook + '</a></div>';
  }
  function proj(id){ for(var i = 0; i < D.projects.length; i++){ if(D.projects[i].id === id) return D.projects[i]; } return null; }
  function cat(c){ return c === 'space' ? 'Space' : 'Energy'; }
  function tags(a){ return '<div class="tagrow">' + a.map(function(x){ return '<span class="tag">' + x + '</span>'; }).join('') + '</div>'; }
  function photo(src, alt, cls, extra){ return '<figure class="photo rv ' + (cls || '') + '" data-tilt="6"' + (extra || '') + '><img src="img/' + src + '" alt="' + alt + '" loading="lazy" data-par></figure>'; }
  function footer(){
    return '<footer><div class="wrap"><div class="fbig"><h2>Have a project in <em class="grad">energy</em> or research?</h2><a class="btn solid" href="#contact">Start a conversation <span class="ar">&rarr;</span></a></div>' +
      '<div class="fbase"><span>&copy; 2026 Nirjal Lamichhane &middot; Bhaktapur, Nepal</span><nav aria-label="Elsewhere"><a href="' + D.linkedin + '" target="_blank" rel="noopener">LinkedIn</a><a href="' + D.scholar + '" target="_blank" rel="noopener">Scholar</a><a href="' + D.instagram + '" target="_blank" rel="noopener">Instagram</a><a href="' + D.facebook + '" target="_blank" rel="noopener">Facebook</a><a href="#home" id="toTop">Back to top &uarr;</a></nav></div></div></footer>';
  }

  /* ---------- home ---------- */
  function home(){
    function feature(id, flip){
      var p = proj(id);
      return '<article class="feature' + (flip ? ' flip' : '') + '"><a class="fart rv" data-tilt href="#project-' + p.id + '" aria-label="Open ' + p.title + '">' + NL.art(p.id, p.title) + '</a>' +
        '<div class="ftxt rv" data-depth="-0.06"><span class="no">' + p.n + ' &mdash; ' + cat(p.cat) + '</span><h3>' + p.title + '</h3><p>' + p.lede + '</p><div class="meta"><span class="tag">' + p.period + '</span><span class="tag">' + p.team + '</span></div><a class="link" href="#project-' + p.id + '">Read the case study <span>&rarr;</span></a></div></article>';
    }
    function feature(id, flip){
      var p = proj(id);
      return '<article class="feature' + (flip ? ' flip' : '') + '"><a class="fart rv" href="#project-' + p.id + '" aria-label="Open ' + p.title + '">' + NL.art(p.id, p.title) + '</a>' +
        '<div class="ftxt rv"><span class="no">' + p.n + ' &mdash; ' + cat(p.cat) + '</span><h3>' + p.title + '</h3><p>' + p.lede + '</p><div class="meta"><span class="tag">' + p.period + '</span><span class="tag">' + p.team + '</span></div><a class="link" href="#project-' + p.id + '">Read the case study <span>&rarr;</span></a></div></article>';
    }
    var credWords = ['Published in <i>Elsevier</i>','Published in <i>MDPI Buildings</i>','Published in <i>Thermal Science and Engineering</i>','Peer reviewer, <i>RESM</i> 2026','<i>Kathmandu University</i>, B.E. 2024','Team leader at <i>Autolab</i>'];
    var cred = credWords.map(function(w){ return '<span>' + w + '</span>'; }).join('');
    return '' +
    '<section class="hero"><div class="wrap hero-grid">' +
      '<div class="hero-copy" data-depth="-0.12">' +
        '<p class="hello fade"><b></b>Engineer Team Leader at Autolab Technologies</p>' +
        '<h1><span class="ln"><span>Nirjal</span></span><span class="ln"><span><em>Lamichhane</em></span></span></h1>' +
        '<p class="lede fade d1">Mechanical engineer in energy technology. I design, simulate and build <strong>renewable energy systems</strong>, publish on <strong>infrared thermography</strong>, and lead the engineers who ship the work.</p>' +
        '<div class="actions fade d2"><a class="btn solid" href="#work">Explore my work <span class="ar">&rarr;</span></a><a class="btn" href="#about">About me</a></div>' +
        '<div class="hero-facts fade d3"><div><b>6</b><span>engineering projects</span></div><div><b>3</b><span>journal publications</span></div><div><b>16</b><span>led on one mission</span></div></div>' +
      '</div>' +
      '<div class="hero-pic" id="heroPic">' +
        '<figure class="photo"><img src="img/portrait-close.jpg" alt="Portrait of Nirjal Lamichhane" width="1050" height="1400"></figure>' +
        '<div class="badge b2"><div class="bin"><span class="ic">K</span><div><b>Kathmandu University</b><span>B.E. Mechanical, 2024</span></div></div></div>' +
        '<div class="badge b1"><div class="bin"><span class="ic">R</span><div><b>Peer reviewer, 2026</b><span>Engineering Structures &amp; Materials</span></div></div></div>' +
        '<div class="ring" aria-hidden="true"><svg viewBox="0 0 120 120"><defs><path id="rc" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1 -92 0"/></defs><text><textPath href="#rc">Energy &middot; Research &middot; Space &middot; Design &middot;</textPath></text></svg><i>N</i></div>' +
      '</div>' +
    '</div></section>' +
    '<section class="sec"><div class="wrap"><div class="head"><div><div class="label">Selected work</div><h2 class="h2">Systems built, simulated<br>and <em>flown</em>.</h2></div><a class="link" href="#work">All six projects <span>&rarr;</span></a></div>' +
      feature('hab', false) + feature('cookstove', true) + feature('solar', false) +
    '</div></section>' +
    '<section class="band" aria-label="Philosophy"><img class="band-bg" src="img/portrait-mountain.jpg" alt="" data-par="0.2"><div class="wrap band-grid"><div><blockquote class="rv" data-depth="0.08">Sustainable practice, modern tools, <em>efficient</em> engineering.</blockquote><cite class="rv">My engineering approach</cite></div><figure class="band-photo rv" data-depth="-0.08"><img src="img/portrait-mountain.jpg" alt="Nirjal Lamichhane in front of a mountain ridge" width="706" height="706"></figure></div></section>' +
    '<section class="sec"><div class="wrap"><div class="label">In numbers</div><div class="nums">' +
      '<div class="rv"><b data-count="16">16</b><p>Students led on the high altitude balloon mission</p></div>' +
      '<div class="rv"><b data-count="12">12</b><p>Led on live NOAA 18 satellite image decoding</p></div>' +
      '<div class="rv"><b data-count="3">3</b><p>Journal papers on infrared thermography</p></div>' +
      '<div class="rv"><b data-count="2025">2025</b><p>Leading an engineering team at Autolab</p></div>' +
    '</div></div></section>' +
    '<section class="sec" style="padding-top:0"><div class="wrap rt">' +
      '<div><div class="label">Research</div><h2 class="h2" style="margin-bottom:30px">Seeing heat to <em>find faults</em>.</h2><ol class="rt-list">' +
        D.papers.map(function(p){ return '<li><a href="' + p.url + '" target="_blank" rel="noopener"><span class="y">' + p.year + '</span><div><h3>' + p.title + '</h3><small>' + p.journal + ' &middot; ' + p.pub + '</small></div><span class="ar">&nearr;</span></a></li>'; }).join('') +
      '</ol><p style="margin-top:26px"><a class="link" href="#research">Research and peer review <span>&rarr;</span></a></p></div>' +
      '<div class="certcard rv" data-tilt><button type="button" class="opencert" aria-label="Enlarge the certificate of reviewer"><img src="img/reviewer-certificate.jpg" alt="Certificate of Reviewer presented to Nirjal Lamichhane, 2026" loading="lazy"></button><p><b>Certificate of Reviewer, 2026</b>' + R.journal + '</p></div>' +
    '</div></section>' +
    '<section class="sec" style="background:var(--bg2)"><div class="wrap cta">' +
      photo('portrait-park.jpg', 'Nirjal Lamichhane seated on a railing in a park', 'bw') +
      '<div><div class="label">Say hello</div><h2>Let&rsquo;s build something <em class="grad">efficient</em> together.</h2><p class="lede">Open to engineering roles, research collaboration and energy projects.</p><div class="actions"><a class="btn solid" href="#contact">Get in touch <span class="ar">&rarr;</span></a><a class="btn" href="' + D.linkedin + '" target="_blank" rel="noopener">LinkedIn</a></div>' + socials() + '</div>' +
    '</div></section>' + footer();
  }

  /* ---------- work ---------- */
  function card(p){
    return '<a class="card rv" data-tilt href="#project-' + p.id + '" data-cat="' + p.cat + '"><div class="pic">' + NL.art(p.id, p.title) + '</div><div class="txt"><div class="top-meta"><span>' + p.n + ' &middot; ' + cat(p.cat) + '</span><span>' + p.year + '</span></div><h3>' + p.title + '</h3><p>' + p.lede + '</p><span class="link more">Case study <span>&rarr;</span></span></div></a>';
  }
  function work(){
    var n = D.projects.length, ne = D.projects.filter(function(p){ return p.cat === 'energy'; }).length;
    return '<section class="pagehead"><div class="wrap"><div class="label">Work</div><h1 class="h1" data-depth="-0.08">Energy systems and <em>space</em> projects.</h1><p class="lede">Six projects, from a wind turbine in 2020 to a cookstove simulation in 2024. Open any one for the full case study.</p></div></section>' +
    '<section class="wrap" style="padding-bottom:120px"><div class="chips" role="group" aria-label="Filter projects"><button class="chip" type="button" data-f="all" aria-pressed="true">All (' + n + ')</button><button class="chip" type="button" data-f="energy" aria-pressed="false">Energy (' + ne + ')</button><button class="chip" type="button" data-f="space" aria-pressed="false">Space (' + (n - ne) + ')</button></div>' +
    '<div class="grid" id="grid">' + D.projects.map(card).join('') + '</div></section>' + footer();
  }
  function project(p){
    var i = D.projects.indexOf(p), prev = D.projects[(i + D.projects.length - 1) % D.projects.length], next = D.projects[(i + 1) % D.projects.length];
    return '<section class="case-head"><div class="wrap"><a class="back" href="#work">&larr; All work</a><h1 class="h1" data-depth="-0.08">' + p.title + '</h1><p class="lede">' + p.lede + '</p>' +
      '<dl class="meta-row"><div><dt>Period</dt><dd>' + p.period + '</dd></div><div><dt>Team</dt><dd>' + p.team + '</dd></div><div><dt>Field</dt><dd>' + p.field + '</dd></div><div><dt>Context</dt><dd>' + p.org + '</dd></div></dl></div></section>' +
    '<section class="wrap"><figure class="stage rv" data-tilt="4">' + NL.art(p.id, p.title + ', schematic') + '<figcaption>Schematic illustration, not to scale.</figcaption></figure></section>' +
    '<section class="sec"><div class="wrap case-body"><div><h2>What the project <em>covered</em></h2></div><div><ul class="plain">' + p.points.map(function(x){ return '<li>' + x + '</li>'; }).join('') + '</ul><div style="margin-top:34px"><div class="label">Tools and methods</div>' + tags(p.tools) + '</div></div></div></section>' +
    '<section class="wrap" style="padding-bottom:120px"><nav class="pager" aria-label="More projects"><a href="#project-' + prev.id + '"><small>&larr; Previous</small><span>' + prev.title + '</span></a><a href="#project-' + next.id + '"><small>Next &rarr;</small><span>' + next.title + '</span></a></nav></section>' + footer();
  }

  /* ---------- research ---------- */
  function research(){
    var pubs = D.papers.map(function(p){
      var au = p.authors.map(function(x){ return x === 'Nirjal Lamichhane' ? '<b>' + x + '</b>' : x; }).join(', ');
      return '<li class="rv"><span class="no">' + p.n + '</span><div><h3>' + p.title + '</h3><p class="au">' + au + '</p><p><i>' + p.journal + '</i> &middot; ' + p.pub + ' &middot; ' + p.year + ' &middot; ' + p.cite + '</p><p class="lk"><a class="link" href="' + p.url + '" target="_blank" rel="noopener">Read the paper <span>&nearr;</span></a><span class="doi">DOI ' + p.doi + '</span></p></div></li>';
    }).join('');
    return '<section class="pagehead"><div class="wrap"><div class="label">Research</div><h1 class="h1" data-depth="-0.08">Research and <em>peer review</em>.</h1><p class="lede">Three co-authored papers on infrared thermography, applied to solar panels, buildings and hydropower penstocks, and recognition as a journal reviewer.</p><div class="actions" style="margin-top:28px"><a class="btn" href="' + D.scholar + '" target="_blank" rel="noopener">Google Scholar profile <span class="ar">&nearr;</span></a></div></div></section>' +
    '<section class="sec" style="padding-top:20px"><div class="wrap"><h2 class="h2" style="margin-bottom:30px">Publications</h2><ol class="pubs">' + pubs + '</ol></div></section>' +
    '<section class="sec" style="background:var(--bg2)"><div class="wrap review">' +
      '<div class="certcard rv" data-tilt><button type="button" class="opencert" aria-label="Enlarge the certificate of reviewer"><img src="img/reviewer-certificate.jpg" alt="Certificate of Reviewer presented to Nirjal Lamichhane by Research on Engineering Structures and Materials, 2026" loading="lazy"></button></div>' +
      '<div class="rv"><div class="label">Peer review</div><h3>Certificate of Reviewer, ' + R.year + '</h3><p>' + R.journal + ' thanked Nirjal for his dedication to peer review and his commitment to academic excellence.</p>' +
      '<dl class="kv"><div><dt>Journal</dt><dd>' + R.journal + '</dd></div><div><dt>Publisher</dt><dd>' + R.group + '</dd></div><div><dt>Signed by</dt><dd>' + R.editor + '</dd></div></dl>' +
      '<button class="btn opencert" type="button">View certificate</button></div>' +
    '</div></section>' + footer();
  }

  /* ---------- about ---------- */
  function about(){
    var jobs = D.journey.map(function(e){
      return '<details class="rv"><summary><span class="yr">' + e.y + '</span><span class="tt">' + e.title + '<small>' + e.org + ' &middot; ' + e.when + '</small></span><span class="pm" aria-hidden="true"></span></summary><ul>' + e.points.map(function(x){ return '<li>' + x + '</li>'; }).join('') + '</ul></details>';
    }).join('');
    var skills = D.skills.map(function(s){ return '<div class="rv" data-tilt><h3>' + s.g + '</h3>' + tags(s.items) + '</div>'; }).join('');
    return '<section class="about-hero"><div class="wrap about-grid"><div>' +
        '<div class="label">About</div><h1 class="h1" data-depth="-0.08">Engineer, team lead <em>and builder</em>.</h1>' +
        '<p class="first">Mechanical engineer with hands-on experience in project management, prototyping, CAD modelling and renewable energy systems.</p>' +
        '<p class="s">I care about bringing sustainable practice and modern technology into efficient engineering solutions. I have led research and publication work and co-authored three journal papers, with a strong base in both technical and soft skills.</p>' +
        '<p class="s">I graduated from Kathmandu University in 2024, specialising in Energy Technology. I now lead a team of engineers at Autolab Technologies.</p>' + socials() +
      '</div>' + photo('portrait-fog.jpg', 'Nirjal Lamichhane standing at a railing on a foggy hilltop', 'bw') + '</div></section>' +
    '<section class="sec"><div class="wrap"><div class="label">Experience and recognition</div><h2 class="h2" style="margin-bottom:30px">The path so far.</h2><div class="jobs">' + jobs + '</div></div></section>' +
    '<section class="sec" style="background:var(--bg2)"><div class="wrap"><div class="label">Beyond the desk</div><div class="gallery">' +
      '<div data-depth="-0.06">' + photo('portrait-park.jpg', 'Nirjal seated on a railing in a park', 'bw') + '</div>' +
      '<div data-depth="0.1">' + photo('portrait-mountain.jpg', 'Nirjal in front of a mountain ridge', 'bw') + '</div>' +
    '</div></div></section>' +
    '<section class="sec"><div class="wrap"><div class="label">Toolbox</div><h2 class="h2" style="margin-bottom:30px">Skills.</h2><div class="skills">' + skills + '</div><details class="morebox"><summary>Show selected coursework &darr;</summary>' + tags(D.courses) + '</details></div></section>' +
    '<section class="sec" style="padding-top:0"><div class="wrap"><div class="label">Education</div><div class="edu">' +
      '<article class="rv" data-tilt><span class="small">May 2024</span><h3>Kathmandu University</h3><p>School of Engineering, Dhulikhel. Bachelor&rsquo;s in Mechanical Engineering (Energy Technology). GPA 3.17 / 4.00.</p></article>' +
      '<article class="rv" data-tilt><span class="small">Apr 2019</span><h3>Seabird International College</h3><p>Bhaktapur. +2 Science, Nepal Examination Board. GPA 3.05 / 4.00.</p></article></div></div></section>' + footer();
  }

  /* ---------- contact ---------- */
  function contact(){
    return '<section class="contact"><div class="wrap contact-grid"><div>' +
      '<div class="label">Contact</div><h1 class="h1" data-depth="-0.08">Let&rsquo;s <em>talk</em>.</h1><p class="lede" style="margin-top:16px">Email is the quickest way to reach me. I am glad to discuss engineering roles, research and collaboration.</p>' +
      '<a class="mail" href="mailto:' + D.email + '">' + D.email + '</a>' +
      '<div class="actions"><button class="btn solid" type="button" id="copy">Copy email</button><a class="btn" href="' + D.linkedin + '" target="_blank" rel="noopener">LinkedIn <span class="ar">&nearr;</span></a></div><div class="toast" id="toast" role="status"></div>' +
      '<dl class="kv"><div><dt>Location</dt><dd>Bhaktapur, Nepal</dd></div><div><dt>Local time</dt><dd id="clock">--:--</dd></div><div><dt>Scholar</dt><dd><a href="' + D.scholar + '" target="_blank" rel="noopener">Google Scholar</a></dd></div><div><dt>Instagram</dt><dd><a href="' + D.instagram + '" target="_blank" rel="noopener">@lc_nirjal</a></dd></div><div><dt>Facebook</dt><dd><a href="' + D.facebook + '" target="_blank" rel="noopener">CoolNirzal</a></dd></div><div><dt>References</dt><dd>Available on request</dd></div></dl>' +
      '</div>' + photo('portrait-park.jpg', 'Nirjal Lamichhane seated on a railing in a park', '') +
    '</div></section>' + footer();
  }

  /* ---------- hooks ---------- */
  function hookWork(){
    var bs = [].slice.call(document.querySelectorAll('.chip')), cs = [].slice.call(document.querySelectorAll('#grid .card'));
    bs.forEach(function(b){ b.addEventListener('click', function(){
      bs.forEach(function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      cs.forEach(function(c){ c.hidden = !(b.dataset.f === 'all' || c.dataset.cat === b.dataset.f); });
    }); });
  }
  function hookContact(){
    var clock = document.getElementById('clock'), toast = document.getElementById('toast');
    function tick(){ try{ clock.textContent = new Date().toLocaleTimeString('en-GB', {timeZone:'Asia/Kathmandu', hour:'2-digit', minute:'2-digit'}) + ' NPT'; }catch(e){ clock.textContent = 'UTC+05:45'; } }
    tick(); timers.push(setInterval(tick, 15000));
    document.getElementById('copy').addEventListener('click', function(){
      function ok(){ toast.textContent = 'Email address copied.'; } function bad(){ toast.textContent = 'Copy was blocked. Select the address above and copy it.'; }
      try{ navigator.clipboard.writeText(D.email).then(ok, bad); }catch(e){ bad(); }
    });
  }
  function hookCommon(){
    var lb = document.getElementById('lightbox'), img = document.getElementById('lbImg');
    [].slice.call(document.querySelectorAll('.opencert')).forEach(function(b){ b.addEventListener('click', function(){ img.src = 'img/reviewer-certificate.jpg'; lb.classList.add('open'); }); });
    var tt = document.getElementById('toTop'); if(tt) tt.addEventListener('click', function(e){ e.preventDefault(); window.scrollTo({top:0, behavior: reduce ? 'auto' : 'smooth'}); });
    if(reduce || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function(es){ es.forEach(function(en){ if(en.isIntersecting){ en.target.classList.remove('pre'); io.unobserve(en.target); } }); }, {threshold:.08});
    [].slice.call(document.querySelectorAll('.rv')).forEach(function(el){ if(el.getBoundingClientRect().top > innerHeight*.92){ el.classList.add('pre'); io.observe(el); } });
    [].slice.call(document.querySelectorAll('[data-count]')).forEach(function(el){
      var end = +el.dataset.count, from = end > 1000 ? end - 25 : 0, done = false;
      var co = new IntersectionObserver(function(es){ es.forEach(function(en){
        if(en.isIntersecting && !done){ done = true; co.disconnect(); var t0 = performance.now(); (function step(now){ var k = Math.min(1, (now - t0)/1400); el.textContent = Math.round(from + (end - from)*(1 - Math.pow(1 - k, 3))); if(k < 1) requestAnimationFrame(step); })(t0); }
      }); }, {threshold:.6});
      co.observe(el);
    });
  }

  /* ---------- router ---------- */
  var current = null, busy = false;
  function parse(){
    var h = (location.hash || '#home').slice(1);
    if(h.indexOf('project-') === 0){ var p = proj(h.slice(8)); if(p) return {page:'project', p:p, key:'project-' + p.id, nav:'work'}; return {page:'work', key:'work', nav:'work'}; }
    if(!TITLES[h]) h = 'home';
    return {page:h, key:h, nav:h};
  }
  function render(r){
    timers.forEach(clearInterval); timers = [];
    view.innerHTML = r.page === 'home' ? home() : r.page === 'work' ? work() : r.page === 'project' ? project(r.p) : r.page === 'research' ? research() : r.page === 'about' ? about() : contact();
    body.dataset.page = r.page;
    document.title = r.page === 'project' ? r.p.title + ' | Nirjal Lamichhane' : TITLES[r.page];
    [].slice.call(document.querySelectorAll('.nav a, .menu a')).forEach(function(a){ if(a.dataset.p === r.nav) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    body.classList.remove('menu-open');
    window.scrollTo(0, 0);
    if(r.page === 'work') hookWork(); if(r.page === 'contact') hookContact();
    hookCommon(); bindTilt(); sizeRail(); setTimeout(sizeRail, 400); dirty = true;
    view.focus({preventScroll:true});
  }
  function route(){
    var r = parse(); if(r.key === current || busy) return;
    if(current === null || reduce){ current = r.key; render(r); return; }
    busy = true; view.classList.add('out');
    setTimeout(function(){ var l = parse(); current = l.key; render(l); view.classList.remove('out'); busy = false; if(parse().key !== current) route(); }, 300);
  }
  window.addEventListener('hashchange', route);
  if('scrollRestoration' in history) history.scrollRestoration = 'manual';

  /* ---------- motion engine: scroll parallax, mouse depth, 3D tilt, pinned rail ---------- */
  var top = document.getElementById('top'), prog = document.getElementById('prog'), canvas = document.getElementById('scene');
  var fine = window.matchMedia('(pointer:fine)').matches, wide = window.matchMedia('(min-width: 761px)');
  var tmx = 0, tmy = 0, mx = 0, my = 0, dirty = true;
  function onScroll(){ dirty = true; }
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', function(){ dirty = true; sizeRail(); });
  window.addEventListener('pointermove', function(e){ tmx = e.clientX/innerWidth*2 - 1; tmy = e.clientY/innerHeight*2 - 1; NL.scene.setMouse(tmx, tmy); });

  function sizeRail(){
    var rail = document.getElementById('hrail'), track = document.getElementById('track'); if(!rail || !track) return;
    if(reduce || !wide.matches){ rail.style.height = ''; rail.classList.add('native'); track.style.transform = ''; return; }
    rail.classList.remove('native');
    rail.style.height = (track.scrollWidth - innerWidth + innerHeight + 120) + 'px';
  }

  function tick(){
    requestAnimationFrame(tick);
    mx += (tmx - mx)*.08; my += (tmy - my)*.08;
    var moving = Math.abs(tmx - mx) + Math.abs(tmy - my) > .001;
    if(!dirty && !moving) return; dirty = false;
    var y = scrollY, vh = innerHeight, max = document.documentElement.scrollHeight - vh;
    top.classList.toggle('scrolled', y > 30);
    prog.style.width = (max > 0 ? y/max*100 : 0) + '%';
    NL.scene.setScroll(y/vh);
    canvas.style.opacity = body.dataset.page === 'home' ? Math.max(.28, 1 - y/(vh*1.4)) : .42;
    if(reduce){ if(NL.scene.frame) NL.scene.frame(); return; }

    var els = document.querySelectorAll('[data-par]');
    for(var i = 0; i < els.length; i++){
      var img = els[i], box = img.parentNode.getBoundingClientRect(); if(box.bottom < -100 || box.top > vh + 100) continue;
      if(img.parentNode.classList.contains('pre')){ img.style.transform = ''; continue; }
      var sp = parseFloat(img.dataset.par) || .1, c = box.top + box.height/2 - vh/2, band = img.parentNode.classList.contains('band');
      img.style.transform = 'translate3d(' + (mx*-8).toFixed(1) + 'px,' + (-c*sp).toFixed(1) + 'px,0) scale(' + (band ? 1.02 : 1.14) + ')';
    }
    els = document.querySelectorAll('[data-depth]');
    for(i = 0; i < els.length; i++){
      var el = els[i], pb = el.parentNode.getBoundingClientRect(); if(pb.bottom < -200 || pb.top > vh + 200) continue;
      var d = parseFloat(el.dataset.depth), cc = pb.top + pb.height/2 - vh/2;
      el.style.transform = 'translate3d(' + (mx*d*-60).toFixed(1) + 'px,' + (cc*d).toFixed(1) + 'px,0)';
    }
    els = document.querySelectorAll('[data-drift]');
    for(i = 0; i < els.length; i++){ var dr = els[i], db = dr.parentNode.getBoundingClientRect(); dr.style.transform = 'translate3d(' + ((db.top - vh)*parseFloat(dr.dataset.drift)).toFixed(1) + 'px,0,0)'; }

    var hp = document.getElementById('heroPic');
    if(hp){ var hb = hp.getBoundingClientRect(); hp.style.transform = 'perspective(1100px) translate3d(0,' + (Math.min(0, hb.top - 140)*-.12).toFixed(1) + 'px,0) rotateY(' + (mx*9).toFixed(2) + 'deg) rotateX(' + (my*-7).toFixed(2) + 'deg)'; }

    var rail = document.getElementById('hrail'), track = document.getElementById('track');
    if(rail && track && !rail.classList.contains('native')){
      var rb = rail.getBoundingClientRect(), span = rail.offsetHeight - vh, p = span > 0 ? Math.min(1, Math.max(0, -rb.top/span)) : 0;
      var dist = track.scrollWidth - innerWidth + 40;
      track.style.transform = 'translate3d(' + (-p*dist).toFixed(1) + 'px,0,0)';
      document.getElementById('railBar').style.width = (p*100) + '%';
      var cards = track.querySelectorAll('.rcard'), cx = innerWidth/2, best = 0, bd = 1e9;
      for(i = 0; i < cards.length; i++){
        var cb = cards[i].getBoundingClientRect(), off = (cb.left + cb.width/2 - cx)/innerWidth;
        if(Math.abs(off) < bd){ bd = Math.abs(off); best = i; }
        if(!cards[i].matches(':hover')) cards[i].style.transform = 'perspective(1200px) rotateY(' + (off*-22).toFixed(2) + 'deg) translateZ(' + (-Math.abs(off)*160).toFixed(1) + 'px)';
      }
      document.getElementById('railCount').textContent = '0' + (best + 1) + ' / 0' + cards.length;
    }
  }
  if(!reduce || true) requestAnimationFrame(tick);

  function bindTilt(){
    if(!fine || reduce) return;
    [].slice.call(document.querySelectorAll('[data-tilt]')).forEach(function(el){
      var amt = parseFloat(el.dataset.tilt) || 9;
      el.addEventListener('pointermove', function(e){
        var b = el.getBoundingClientRect(), x = (e.clientX - b.left)/b.width, y = (e.clientY - b.top)/b.height;
        el.style.setProperty('--gx', (x*100) + '%'); el.style.setProperty('--gy', (y*100) + '%');
        el.style.transform = 'perspective(1000px) rotateX(' + ((.5 - y)*amt).toFixed(2) + 'deg) rotateY(' + ((x - .5)*amt).toFixed(2) + 'deg) translateZ(14px)';
        el.classList.add('tilting');
      });
      el.addEventListener('pointerleave', function(){ el.style.transform = ''; el.classList.remove('tilting'); dirty = true; });
    });
  }

  /* ---------- global ui ---------- */
  document.getElementById('mode').addEventListener('click', function(){
    var m = root.getAttribute('data-mode') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-mode', m);
    try{ localStorage.setItem('nl-mode', m); }catch(e){}
  });
  document.getElementById('burger').addEventListener('click', function(){ body.classList.toggle('menu-open'); });
  var lb = document.getElementById('lightbox');
  lb.addEventListener('click', function(){ lb.classList.remove('open'); });
  window.addEventListener('keydown', function(e){ if(e.key === 'Escape'){ lb.classList.remove('open'); body.classList.remove('menu-open'); } });

  route();
})();
