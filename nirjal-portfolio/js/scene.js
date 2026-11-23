/* Northern lights backdrop: shader aurora curtains and stars on a full-screen layer,
   a low particle ridge in aurora colours, and drifting snow-light dust. Mouse and scroll move every layer. */
(function(){
  window.NL = window.NL || {};
  var api = NL.scene = { setScroll:function(){}, setMouse:function(){}, ok:false };
  var canvas = document.getElementById('scene');
  if(!window.THREE || !canvas) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var renderer;
  try{ renderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true, alpha:true}); }catch(e){ return; }
  api.ok = true;
  renderer.autoClear = false;
  var root = document.documentElement;
  function hex(h){ var c = new THREE.Color(h); return new THREE.Vector3(c.r, c.g, c.b); }

  /* ---- aurora layer ---- */
  var auroraScene = new THREE.Scene(), ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  var au = { uTime:{value:0}, uRes:{value:new THREE.Vector2(1, 1)}, uScroll:{value:0}, uMouse:{value:new THREE.Vector2()}, uLight:{value:0} };
  var auroraMat = new THREE.ShaderMaterial({
    uniforms:au, transparent:true, depthWrite:false, depthTest:false,
    vertexShader:'void main(){ gl_Position = vec4(position.xy, 0.0, 1.0); }',
    fragmentShader:[
      'uniform float uTime; uniform vec2 uRes; uniform float uScroll; uniform vec2 uMouse; uniform float uLight;',
      'float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }',
      'float noise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(hash(i),hash(i+vec2(1,0)),f.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x), f.y); }',
      'float fbm(vec2 p){ float v=0.0, a=.5; for(int i=0;i<4;i++){ v+=a*noise(p); p*=2.03; a*=.5; } return v; }',
      'void main(){',
      ' vec2 uv = gl_FragCoord.xy/uRes; float ar = uRes.x/uRes.y; vec2 p = vec2(uv.x*ar, uv.y);',
      ' p.x += uMouse.x*.06; p.y += uScroll*.22 - uMouse.y*.025;',
      ' vec3 green = mix(vec3(.24,.95,.66), vec3(.04,.56,.42), uLight);',
      ' vec3 teal  = mix(vec3(.18,.83,.85), vec3(.05,.45,.55), uLight);',
      ' vec3 violet= mix(vec3(.62,.45,1.0), vec3(.42,.25,.82), uLight);',
      ' vec3 col = vec3(0.0); float a = 0.0;',
      ' for(int i=0;i<3;i++){ float fi=float(i);',
      '  float x = p.x*(1.1+fi*.4) + uTime*(.025+fi*.012) + fi*5.3;',
      '  float c = .66 + fi*.06 + (fbm(vec2(x*.7, fi*2.7 + uTime*.04)) - .5)*.42;',
      '  float d = p.y - c;',
      '  float rays = pow(fbm(vec2(x*7.0, uTime*.12 + fi*3.1)), 1.6)*1.6;',
      '  float shape = d > 0.0 ? exp(-d*(4.5+fi*1.5)) : exp(d*38.0);',
      '  float I = rays*shape*(1.0 - fi*.22);',
      '  vec3 tint = mix(green, teal, smoothstep(0.0,.12,d)); tint = mix(tint, violet, smoothstep(.1,.32,d));',
      '  col += tint*I; a += I;',
      ' }',
      ' a = clamp(a*(uLight > .5 ? .42 : .8), 0.0, 1.0);',
      ' vec3 tintN = col/max(1e-3, max(col.r, max(col.g, col.b)));',
      ' float star = 0.0;',
            ' vec3 outc = tintN*a + vec3(star*.9);',
      ' gl_FragColor = vec4(outc, clamp(a + star*.9, 0.0, 1.0));',
      '}'
    ].join('\n')
  });
  var quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), auroraMat); quad.frustumCulled = false; auroraScene.add(quad);

  /* ---- 3D ridge ---- */
  var scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(50, 1, .1, 120);
  var DARK = ['#3ee6a8','#2dd4bf','#38bdf8','#8b5cf6','#c084fc'].map(hex);
  var LIGHT = ['#0b8f6a','#0e8a9a','#1d6fd1','#6d3fd0','#8b3fbf'].map(hex);
  var COLS = 150, ROWS = 60, N = COLS*ROWS, pos = new Float32Array(N*3), tt = new Float32Array(N), k = 0;
  for(var r = 0; r < ROWS; r++){ for(var c = 0; c < COLS; c++){ pos[k*3] = (c/(COLS - 1) - .5)*34; pos[k*3+2] = -r/(ROWS - 1)*24 + 5; tt[k] = c/(COLS - 1); k++; } }
  var g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('aT', new THREE.BufferAttribute(tt, 1));
  var uni = { uTime:{value:0}, uMouse:{value:new THREE.Vector2()}, uAlpha:{value:.7}, uSize:{value:2.2},
    c1:{value:DARK[0]}, c2:{value:DARK[1]}, c3:{value:DARK[2]}, c4:{value:DARK[3]}, c5:{value:DARK[4]} };
  var mat = new THREE.ShaderMaterial({
    uniforms:uni, transparent:true, depthWrite:false, blending:THREE.AdditiveBlending,
    vertexShader:[
      'uniform float uTime; uniform vec2 uMouse; uniform float uSize; attribute float aT; varying float vT; varying float vH; varying float vD;',
      'void main(){ vec3 p = position;',
      ' float w = sin(p.x*.28 + uTime*.35)*.6 + cos(p.z*.38 + uTime*.25)*.5 + sin((p.x + p.z)*.15 + uTime*.2)*.7;',
      ' float d = distance(p.xz, vec2(uMouse.x*14.0, uMouse.y*8.0 - 4.0)); w += exp(-d*d*.04)*1.3;',
      ' p.y += w; vH = w; vT = aT; vec4 mv = modelViewMatrix*vec4(p,1.0); vD = -mv.z;',
      ' gl_PointSize = uSize*(22.0/vD); gl_Position = projectionMatrix*mv; }'
    ].join('\n'),
    fragmentShader:[
      'uniform vec3 c1; uniform vec3 c2; uniform vec3 c3; uniform vec3 c4; uniform vec3 c5; uniform float uAlpha; varying float vT; varying float vH; varying float vD;',
      'vec3 grad(float t){ t = clamp(t,0.0,1.0)*4.0; if(t<1.0) return mix(c1,c2,t); if(t<2.0) return mix(c2,c3,t-1.0); if(t<3.0) return mix(c3,c4,t-2.0); return mix(c4,c5,t-3.0); }',
      'void main(){ vec2 q = gl_PointCoord - .5; float r = length(q); if(r > .5) discard;',
      ' float a = (1.0 - smoothstep(.15,.5,r))*uAlpha*(.3 + .7*smoothstep(-1.2,1.8,vH))*(1.0 - smoothstep(16.0,30.0,vD));',
      ' gl_FragColor = vec4(grad(vT), a); }'
    ].join('\n')
  });
  var land = new THREE.Group(); land.position.y = -3.4;

  var DN = 380, dp = new Float32Array(DN*3);
  for(var i = 0; i < DN; i++){ dp[i*3] = (Math.random() - .5)*40; dp[i*3+1] = Math.random()*14 - 3; dp[i*3+2] = -Math.random()*28 + 6; }
  var dg = new THREE.BufferGeometry(); dg.setAttribute('position', new THREE.BufferAttribute(dp, 3));
  var dmat = new THREE.PointsMaterial({color:0xd8fff1, size:.05, transparent:true, opacity:.5, depthWrite:false});
  var dust = new THREE.Points(dg, dmat);

  var S = 0, mx = 0, my = 0, tmx = 0, tmy = 0, mode = '', clock = new THREE.Clock();
  api.setScroll = function(s){ S = s; };
  api.setMouse = function(x, y){ tmx = x; tmy = y; };

  function applyMode(){
    var m = root.getAttribute('data-mode'); if(m === mode) return; mode = m;
    var light = m === 'light', P = light ? LIGHT : DARK;
    uni.c1.value = P[0]; uni.c2.value = P[1]; uni.c3.value = P[2]; uni.c4.value = P[3]; uni.c5.value = P[4];
    mat.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending; mat.needsUpdate = true;
    uni.uAlpha.value = light ? .45 : .7;
    au.uLight.value = light ? 1 : 0;
    dmat.color.set(light ? 0x0b8f6a : 0xd8fff1); dmat.opacity = light ? .3 : .5;
  }

  function resize(){
    var w = innerWidth, h = innerHeight, pr = Math.min(window.devicePixelRatio || 1, w < 700 ? 1 : 1.5);
    renderer.setPixelRatio(pr); renderer.setSize(w, h, false);
    au.uRes.value.set(w*pr, h*pr);
    camera.aspect = w/h; camera.updateProjectionMatrix(); uni.uSize.value = w < 700 ? 1.7 : 2.2;
  }
  window.addEventListener('resize', function(){ resize(); if(reduce) frame(0); }); resize();

  function frame(t){
    applyMode();
    mx += (tmx - mx)*.05; my += (tmy - my)*.05;
    au.uTime.value = t; au.uScroll.value = S; au.uMouse.value.set(mx, my);
    uni.uTime.value = t; uni.uMouse.value.set(mx, -my);
    camera.position.set(mx*1.5, 2.3 - my*.5 + S*1.0, 9); camera.lookAt(mx*.5, -.4 + S*.4, -4);
    land.position.z = S*4; dust.position.y = S*1.6; dust.rotation.y = t*.008 + mx*.05;
    renderer.clear();
    renderer.render(auroraScene, ortho);
  }
  api.frame = function(){ frame(clock.getElapsedTime()); };
  function loop(){ requestAnimationFrame(loop); if(!document.hidden) frame(clock.getElapsedTime()); }
  if(reduce) frame(8); else loop();
})();
