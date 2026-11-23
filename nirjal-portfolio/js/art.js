/* Schematic illustrations, one per project. Stroke-only SVG so they take the page's colours. */
(function(){
  window.NL = window.NL || {};
  function frame(label){
    return '<g class="f"><path d="M24 48V24h24M776 48V24h-24M24 452v24h24M776 452v24h-24"/></g>' +
      '<text class="t" x="60" y="472">' + label + '</text>';
  }
  function hex(cx, cy, r){
    var p = [];
    for(var i = 0; i < 6; i++){ var a = Math.PI/3*i + Math.PI/6; p.push((cx + r*Math.cos(a)).toFixed(1) + ' ' + (cy + r*Math.sin(a)).toFixed(1)); }
    return 'M' + p.join('L') + 'Z';
  }
  function rng(seed){ return function(){ seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  var ART = {};

  ART.hab = function(){
    var s = frame('FIG. 01   BALLOON ASCENT, SCHEMATIC');
    s += '<path class="f" d="M60 430H740"/>';
    for(var i = 0; i < 27; i++){ s += '<path class="f" d="M' + (72 + i*24) + ' 430l-8 10"/>'; }
    s += '<path class="s a d" d="M150 425C250 385 330 320 400 252S570 170 640 122"/>';
    function bal(x, y, rx, ry, pl){
      return '<ellipse class="s" cx="' + x + '" cy="' + y + '" rx="' + rx + '" ry="' + ry + '"/>' +
        '<path class="s" d="M' + x + ' ' + (y + ry) + 'V' + (y + ry + pl) + '"/>' +
        '<rect class="s" x="' + (x - 6) + '" y="' + (y + ry + pl) + '" width="12" height="10"/>';
    }
    s += bal(160, 398, 12, 15, 8) + bal(400, 232, 26, 32, 14) + bal(640, 104, 44, 54, 16);
    s += '<path class="f" d="M634 196l-62 34M640 196v46M646 196l50 34"/>';
    s += '<text class="t" x="520" y="246">TEMP</text><text class="t" x="618" y="262">PRESSURE</text><text class="t" x="672" y="246">RH</text>';
    s += '<path class="s" d="M724 430V60"/>';
    for(var k = 0; k <= 5; k++){ var y = 430 - k*74; s += '<path class="s" d="M718 ' + y + 'h12"/><text class="t" x="738" y="' + (y + 4) + '">' + (k*6) + ' km</text>'; }
    s += '<text class="t" x="640" y="52" text-anchor="end">ALTITUDE</text>';
    return s;
  };

  ART.noaa = function(){
    var s = frame('FIG. 02   APT DOWNLINK, SCHEMATIC');
    s += '<circle class="s" cx="400" cy="1150" r="750"/>';
    s += '<circle class="s a d" cx="400" cy="1150" r="950"/>';
    s += '<g transform="translate(607 223) rotate(12)"><rect class="s" x="-9" y="-9" width="18" height="18"/><path class="s" d="M-10 0h-34M10 0h34M-44 -8v16M44 -8v16"/></g>';
    s += '<g class="spin pulse" style="transform-origin:607px 223px"><circle class="s f" cx="607" cy="223" r="40"/></g>';
    s += '<circle class="s f" cx="607" cy="223" r="80"/><circle class="s f" cx="607" cy="223" r="120"/>';
    s += '<path class="s a d" d="M592 236L318 404"/>';
    s += '<path class="s" d="M300 430V400M300 400l-22 -34M300 400l22 -34"/><circle class="s" cx="278" cy="366" r="3"/><circle class="s" cx="322" cy="366" r="3"/>';
    s += '<path class="f" d="M300 430l-16 10M300 430l16 10"/>';
    s += '<rect class="s" x="70" y="76" width="210" height="150"/>';
    var r = rng(18);
    for(var i = 0; i < 24; i++){
      var y = 88 + i*5.6, w1 = 20 + r()*150, x1 = 80 + r()*(190 - w1);
      s += '<path class="' + (i % 6 === 2 ? 'a ' : '') + 's" d="M' + x1.toFixed(1) + ' ' + y.toFixed(1) + 'h' + w1.toFixed(1) + '" opacity="' + (0.35 + r()*0.65).toFixed(2) + '"/>';
    }
    s += '<path class="f" d="M175 226V250L296 366"/>';
    s += '<text class="t" x="70" y="66">DECODED LINES</text><text class="t" x="620" y="190">NOAA 18</text><text class="t" x="230" y="420">RTL-SDR</text>';
    return s;
  };

  ART.cookstove = function(){
    var s = frame('FIG. 03   HONEYCOMB INSERT, CUTAWAY');
    s += '<path class="s" d="M250 120V420H550V120"/><path class="s" d="M230 420H570"/>';
    s += '<path class="s" d="M250 120C250 100 550 100 550 120"/>';
    var r = 15, dx = r*Math.sqrt(3), dy = r*1.5, row = 0;
    for(var y = 214; y < 316; y += dy){
      var off = (row % 2) * dx/2;
      for(var x = 268 + off; x < 540; x += dx){
        var hot = (Math.abs(x - 400) < 46 && Math.abs(y - 262) < 26);
        s += '<path class="' + (hot ? 'a ' : 'f ') + 's" d="' + hex(x, y, r - 1) + '"/>';
      }
      row++;
    }
    s += '<path class="s a" d="M400 420C376 396 380 372 400 352C420 372 424 396 400 420Z"/><path class="s a" d="M372 420C356 402 362 388 372 376C386 392 386 404 372 420Z"/>';
    s += '<path class="s a d" d="M340 190C326 170 354 154 340 134M400 190C386 170 414 154 400 134M460 190C446 170 474 154 460 134"/>';
    s += '<path class="s d" d="M150 330H238M150 360H238M562 330H650M562 360H650"/>';
    s += '<text class="t" x="590" y="250">HEX CELL</text><path class="f" d="M586 246L452 262"/>';
    s += '<text class="t" x="80" y="326">AIR IN</text><text class="t" x="600" y="326">FLUE</text>';
    return s;
  };

  ART.tidal = function(){
    var s = frame('FIG. 04   FLOW AND ROTOR, SCHEMATIC');
    s += '<path class="s" d="M60 130q40 -22 80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0"/>';
    s += '<path class="f" d="M60 160q40 -22 80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0"/>';
    s += '<path class="s" d="M60 440H740"/>';
    for(var i = 0; i < 27; i++){ s += '<path class="f" d="M' + (72 + i*24) + ' 440l-8 10"/>'; }
    s += '<path class="s" d="M400 440V300"/><circle class="s" cx="400" cy="290" r="10"/>';
    s += '<g class="spin" style="transform-origin:400px 290px;animation-duration:6s"><path class="s a" d="M400 290L400 206M400 290L473 332M400 290L327 332"/><ellipse class="s" cx="400" cy="206" rx="7" ry="12"/><ellipse class="s" cx="473" cy="332" rx="7" ry="12" transform="rotate(-60 473 332)"/><ellipse class="s" cx="327" cy="332" rx="7" ry="12" transform="rotate(60 327 332)"/></g>';
    s += '<path class="s d" d="M90 250H240M90 300H240M90 350H240"/><path class="s" d="M232 244l10 6-10 6M232 294l10 6-10 6M232 344l10 6-10 6"/>';
    s += '<path class="s d" d="M560 290H710"/><path class="s" d="M702 284l10 6-10 6"/>';
    s += '<text class="t" x="90" y="236">TIDAL FLOW</text><text class="t" x="560" y="276">EXTRACTED</text>';
    return s;
  };

  ART.solar = function(){
    var s = frame('FIG. 05   SINGLE AXIS TRACKING, SCHEMATIC');
    s += '<path class="s a d" d="M110 400C170 120 630 120 690 400"/>';
    var pos = [[170, 262], [400, 152], [630, 262]];
    pos.forEach(function(p){
      s += '<circle class="s" cx="' + p[0] + '" cy="' + p[1] + '" r="16"/>';
      for(var a = 0; a < 8; a++){ var an = a*Math.PI/4; s += '<path class="f" d="M' + (p[0] + 22*Math.cos(an)).toFixed(1) + ' ' + (p[1] + 22*Math.sin(an)).toFixed(1) + 'L' + (p[0] + 30*Math.cos(an)).toFixed(1) + ' ' + (p[1] + 30*Math.sin(an)).toFixed(1) + '"/>'; }
    });
    s += '<path class="s" d="M60 440H740"/><path class="s" d="M400 440V380"/><rect class="s" x="376" y="372" width="48" height="12"/>';
    [-40, 0, 40].forEach(function(d){ s += '<rect class="f s" x="320" y="364" width="160" height="8" transform="rotate(' + d + ' 400 368)"/>'; });
    s += '<g class="rock" style="transform-origin:400px 368px"><rect class="s a" x="320" y="364" width="160" height="8"/><circle class="s" cx="340" cy="360" r="3"/><circle class="s" cx="460" cy="360" r="3"/></g>';
    s += '<text class="t" x="446" y="338">SERVO</text><text class="t" x="270" y="338">LDR PAIR</text>';
    s += '<text class="t" x="300" y="64">SUN PATH</text>';
    return s;
  };

  ART.wind = function(){
    var s = frame('FIG. 06   ROTOR AND AEROFOIL, SCHEMATIC');
    s += '<path class="s" d="M60 440H740"/><path class="s" d="M392 440L396 236H404L408 440"/>';
    s += '<rect class="s" x="386" y="226" width="40" height="16" rx="4"/>';
    s += '<g class="spin" style="transform-origin:398px 232px;animation-duration:7s"><path class="s a" d="M398 232L398 82L408 98L398 232Z"/><path class="s a" d="M398 232L528 307L516 314L398 232Z"/><path class="s a" d="M398 232L268 307L280 314L398 232Z"/><circle class="s" cx="398" cy="232" r="9"/></g>';
    s += '<g transform="translate(540 330) scale(1.6)"><path class="s" d="M0 0C20 -22 70 -26 120 0C70 8 20 6 0 0Z"/><path class="f" d="M0 0H120"/><path class="s a d" d="M-24 -6H-4M-24 4H-4M-24 14H-4"/><path class="s a" d="M60 -16V-46M56 -40l4 -8 4 8"/></g>';
    s += '<text class="t" x="560" y="296">LIFT</text><text class="t" x="520" y="400">CHORD</text><text class="t" x="80" y="120">ROTOR</text>';
    return s;
  };

  NL.art = function(id, label){
    return '<svg class="art" viewBox="0 0 800 500" role="img" aria-label="' + (label || 'Schematic illustration') + '">' + (ART[id] ? ART[id]() : '') + '</svg>';
  };
})();
