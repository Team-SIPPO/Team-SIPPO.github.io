// ざっくり水硬度計算機のイラスト生成スクリプト
//
// 1つのジオメトリ定義から次の2つを書き出す:
//   1. Illustrator 用スクリプト (water-hardness-illustrations.jsx)
//      Illustrator の「ファイル > スクリプト > その他のスクリプト」で実行すると、
//      アートボード3枚(bottle / pitcher / bean)に線パスでイラストが描かれる。
//   2. サイト用 SVG (site-src/public/assets/techreate/whx/*.svg)
//      Illustrator で調整したあとは「書き出し > スクリーン用に書き出し」で
//      このSVGを上書きすればよい(アートボードのサイズは変えないこと)。
//
// 描き方のルール
//   - 輪郭はすべて「線(stroke)」のパス。輪郭を塗りの図形で表現しない
//   - 塗りは水・黄色のアクセント・タグの下地(紙色)だけ。輪郭とは別オブジェクト
//   - 曲線は3次ベジェで、つなぎ目の接線をそろえて滑らかにする
//
// 実行: npm run build:whx-art

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '../../..');
const svgOutDir = resolve(repoRoot, 'site-src/public/assets/techreate/whx');
const jsxOut = resolve(here, 'water-hardness-illustrations.jsx');

/* ---------- 色(index.css の :root と同じ値) ---------- */
const colors = {
  ink: '#070707',
  paper: '#ffffff',
  accent: '#fff000',
};

const LINE = 2.4; // 主線
const THIN = 1.6; // 紐・補助線

/* ---------- パスのヘルパー ---------- */
// コマンドは ['M',x,y] / ['L',x,y] / ['C',x1,y1,x2,y2,x,y] / ['Z']
const K = 0.5522847498; // 円を4本のベジェで近似する係数

function roundRect(x, y, w, h, r) {
  const k = r * (1 - K);
  return [
    ['M', x + r, y],
    ['L', x + w - r, y],
    ['C', x + w - k, y, x + w, y + k, x + w, y + r],
    ['L', x + w, y + h - r],
    ['C', x + w, y + h - k, x + w - k, y + h, x + w - r, y + h],
    ['L', x + r, y + h],
    ['C', x + k, y + h, x, y + h - k, x, y + h - r],
    ['L', x, y + r],
    ['C', x, y + k, x + k, y, x + r, y],
    ['Z'],
  ];
}

function ellipse(cx, cy, rx, ry) {
  const kx = rx * K;
  const ky = ry * K;
  return [
    ['M', cx + rx, cy],
    ['C', cx + rx, cy + ky, cx + kx, cy + ry, cx, cy + ry],
    ['C', cx - kx, cy + ry, cx - rx, cy + ky, cx - rx, cy],
    ['C', cx - rx, cy - ky, cx - kx, cy - ry, cx, cy - ry],
    ['C', cx + kx, cy - ry, cx + rx, cy - ky, cx + rx, cy],
    ['Z'],
  ];
}

const circle = (cx, cy, r) => ellipse(cx, cy, r, r);

// 回転(度・時計回り) + 平行移動 を全座標にかける
function transform(cmds, { rotate = 0, origin = [0, 0], translate = [0, 0] }) {
  const rad = (rotate * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const map = (x, y) => {
    const dx = x - origin[0];
    const dy = y - origin[1];
    return [origin[0] + dx * cos - dy * sin + translate[0], origin[1] + dx * sin + dy * cos + translate[1]];
  };
  return cmds.map(([op, ...nums]) => {
    const out = [op];
    for (let i = 0; i < nums.length; i += 2) out.push(...map(nums[i], nums[i + 1]));
    return out;
  });
}

function point(x, y, opts) {
  return transform([['M', x, y]], opts)[0].slice(1);
}

/* ---------- イラスト定義 ---------- */

// ボトル+成分表示タグ (212 x 280)
// タグは 6° 傾け、左上のハトメから紐でボトルの首に結ぶ
const TAG = { x: 80, y: 100, w: 124, h: 116, rotate: 6 };
const tagFrame = { rotate: TAG.rotate, origin: [0, 0], translate: [TAG.x, TAG.y] };
const tagHole = point(22, 22, tagFrame);

const bottle = {
  name: 'bottle',
  width: 212,
  height: 280,
  shapes: [
    {
      name: 'body',
      stroke: 'ink',
      strokeWidth: LINE,
      // 首 → 肩 → 胴 → 底 → 反対側の肩 → 首(上はリングに隠れるので開いたパス)
      d: [
        ['M', 43, 33],
        ['L', 43, 44],
        ['C', 43, 70, 12, 78, 12, 112],
        ['L', 12, 258],
        ['C', 12, 270, 20, 276, 32, 276],
        ['L', 88, 276],
        ['C', 100, 276, 108, 270, 108, 258],
        ['L', 108, 112],
        ['C', 108, 78, 77, 70, 77, 44],
        ['L', 77, 33],
      ],
    },
    {
      name: 'cap',
      stroke: 'ink',
      strokeWidth: LINE,
      d: [
        ['M', 40, 26],
        ['L', 40, 9],
        ['C', 40, 6.2, 42.2, 4, 45, 4],
        ['L', 75, 4],
        ['C', 77.8, 4, 80, 6.2, 80, 9],
        ['L', 80, 26],
      ],
    },
    { name: 'cap-line', stroke: 'ink', strokeWidth: THIN, d: [['M', 40, 12], ['L', 80, 12]] },
    // キャップ下のリング: 黄色の塗り + 線の輪郭
    { name: 'ring', fill: 'accent', stroke: 'ink', strokeWidth: LINE, d: roundRect(36, 26, 48, 7, 2) },
    // 首にかけた紐(手前側の半周)
    {
      name: 'string-loop',
      stroke: 'ink',
      strokeWidth: THIN,
      d: [['M', 43, 37.5], ['C', 47, 41.5, 73, 41.5, 77, 37.5]],
    },
    // タグの下地(紙色の塗り。ボトルの線を隠す) + 輪郭線
    {
      name: 'tag',
      fill: 'paper',
      stroke: 'ink',
      strokeWidth: LINE,
      d: transform(
        [
          ['M', 20, 0],
          ['L', TAG.w - 8, 0],
          ['C', TAG.w - 3.6, 0, TAG.w, 3.6, TAG.w, 8],
          ['L', TAG.w, TAG.h - 8],
          ['C', TAG.w, TAG.h - 3.6, TAG.w - 3.6, TAG.h, TAG.w - 8, TAG.h],
          ['L', 8, TAG.h],
          ['C', 3.6, TAG.h, 0, TAG.h - 3.6, 0, TAG.h - 8],
          ['L', 0, 20],
          ['Z'],
        ],
        tagFrame,
      ),
    },
    // 単位の上の区切り線
    { name: 'tag-rule', stroke: 'ink', strokeWidth: THIN, d: transform([['M', 22, 84], ['L', 104, 84]], tagFrame) },
    // ハトメ: 黄色のリング + 穴
    { name: 'grommet', fill: 'accent', stroke: 'ink', strokeWidth: THIN, d: circle(tagHole[0], tagHole[1], 6.5) },
    { name: 'grommet-hole', fill: 'paper', stroke: 'ink', strokeWidth: THIN, d: circle(tagHole[0], tagHole[1], 2.8) },
    // 首からハトメへ垂れる紐
    {
      name: 'string',
      stroke: 'ink',
      strokeWidth: THIN,
      d: [['M', 77, 39], ['C', 90, 46, 101, 84, tagHole[0], tagHole[1]]],
    },
  ],
};

// コーヒーサーバー (260 x 186)
// 側面は直線で、底の角は接線をそろえたベジェでつなぐ
const pitcher = {
  name: 'pitcher',
  width: 260,
  height: 186,
  shapes: [
    // 水(輪郭なしの塗り。輪郭線より奥に置く)
    {
      name: 'water',
      fill: 'accent',
      fillOpacity: 0.55,
      d: [
        ['M', 26, 108],
        ['L', 16, 150],
        ['C', 11.7, 168, 22, 178, 40, 178],
        ['L', 200, 178],
        ['C', 218, 178, 228.3, 168, 224, 150],
        ['L', 214, 108],
        ['Z'],
      ],
    },
    { name: 'water-surface', fill: 'paper', fillOpacity: 0.45, d: ellipse(120, 108, 94, 6.5) },
    {
      name: 'body',
      stroke: 'ink',
      strokeWidth: LINE,
      // 注ぎ口の先 → 口の上辺 → 右の縁 → 右側面 → 底 → 左側面 → 注ぎ口の下辺
      d: [
        ['M', 20, 6],
        ['C', 30, 8, 38, 10, 46, 10],
        ['L', 196, 10],
        ['C', 200.4, 10, 204, 13.1, 204, 17],
        ['C', 204, 20.9, 200.4, 24, 196, 24],
        ['L', 194, 24],
        ['L', 224, 150],
        ['C', 228.3, 168, 218, 178, 200, 178],
        ['L', 40, 178],
        ['C', 22, 178, 11.7, 168, 16, 150],
        ['L', 46, 24],
        ['C', 36, 20, 26, 12, 20, 6],
        ['Z'],
      ],
    },
    { name: 'rim-line', stroke: 'ink', strokeWidth: LINE, d: [['M', 46, 24], ['L', 194, 24]] },
    // 取っ手は外側・内側の2本の線
    {
      name: 'handle-outer',
      stroke: 'ink',
      strokeWidth: LINE,
      d: [
        ['M', 196.9, 36],
        ['L', 210, 36],
        ['C', 240, 36, 252, 42, 252, 62],
        ['L', 250, 120],
        ['C', 249.4, 136, 240, 143, 222.6, 144],
      ],
    },
    {
      name: 'handle-inner',
      stroke: 'ink',
      strokeWidth: LINE,
      d: [
        ['M', 200.2, 50],
        ['L', 212, 50],
        ['C', 232, 50, 238, 56, 238, 66],
        ['L', 236.6, 116],
        ['C', 236.3, 126, 230, 131, 219.5, 131],
      ],
    },
  ],
};

// コーヒー豆 (40 x 48)
const beanFrame = { rotate: 22, origin: [20, 24], translate: [0, 0] };
const bean = {
  name: 'bean',
  width: 40,
  height: 48,
  shapes: [
    { name: 'outline', stroke: 'ink', strokeWidth: 2, d: transform(ellipse(20, 24, 12, 18), beanFrame) },
    {
      name: 'center-line',
      stroke: 'ink',
      strokeWidth: 2,
      d: transform([['M', 20, 7], ['C', 14, 16, 26, 32, 20, 41]], beanFrame),
    },
  ],
};

const illustrations = [bottle, pitcher, bean];

/* ---------- SVG 書き出し ---------- */
const fmt = (n) => String(Math.round(n * 100) / 100);

function toD(cmds) {
  return cmds.map(([op, ...nums]) => op + nums.map(fmt).join(' ')).join(' ');
}

function toSvg(art) {
  const body = art.shapes
    .map((s) => {
      const attrs = [
        `id="${art.name}-${s.name}"`,
        `d="${toD(s.d)}"`,
        `fill="${s.fill ? colors[s.fill] : 'none'}"`,
      ];
      if (s.fillOpacity !== undefined) attrs.push(`fill-opacity="${s.fillOpacity}"`);
      if (s.stroke) {
        attrs.push(
          `stroke="${colors[s.stroke]}"`,
          `stroke-width="${s.strokeWidth}"`,
          'stroke-linecap="round"',
          'stroke-linejoin="round"',
        );
      }
      return `  <path ${attrs.join(' ')}/>`;
    })
    .join('\n');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${art.width} ${art.height}" width="${art.width}" height="${art.height}">\n${body}\n</svg>\n`;
}

/* ---------- Illustrator 用データ ---------- */
// ベジェのコマンド列を Illustrator の PathPoint (anchor / leftDirection / rightDirection) に変換
function toPathPoints(cmds) {
  const subpaths = [];
  let cur = null;
  const same = (a, b) => Math.abs(a[0] - b[0]) < 0.01 && Math.abs(a[1] - b[1]) < 0.01;
  for (const [op, ...n] of cmds) {
    if (op === 'M') {
      cur = { closed: false, pts: [{ a: [n[0], n[1]], l: [n[0], n[1]], r: [n[0], n[1]] }] };
      subpaths.push(cur);
    } else if (op === 'L') {
      cur.pts.push({ a: [n[0], n[1]], l: [n[0], n[1]], r: [n[0], n[1]] });
    } else if (op === 'C') {
      cur.pts[cur.pts.length - 1].r = [n[0], n[1]];
      cur.pts.push({ a: [n[4], n[5]], l: [n[2], n[3]], r: [n[4], n[5]] });
    } else if (op === 'Z') {
      cur.closed = true;
      const first = cur.pts[0];
      const last = cur.pts[cur.pts.length - 1];
      if (cur.pts.length > 1 && same(first.a, last.a)) {
        first.l = last.l;
        cur.pts.pop();
      }
    }
  }
  // 両側のハンドルが一直線ならスムーズポイント
  for (const sp of subpaths) {
    for (const p of sp.pts) {
      const v1 = [p.a[0] - p.l[0], p.a[1] - p.l[1]];
      const v2 = [p.r[0] - p.a[0], p.r[1] - p.a[1]];
      const len1 = Math.hypot(...v1);
      const len2 = Math.hypot(...v2);
      const cross = len1 && len2 ? (v1[0] * v2[1] - v1[1] * v2[0]) / (len1 * len2) : 1;
      const dot = len1 && len2 ? v1[0] * v2[0] + v1[1] * v2[1] : -1;
      p.smooth = Math.abs(cross) < 0.02 && dot > 0;
    }
  }
  return subpaths;
}

const round2 = (v) => Math.round(v * 100) / 100;
const jsxData = illustrations.map((art) => ({
  name: art.name,
  width: art.width,
  height: art.height,
  shapes: art.shapes.map((s) => ({
    name: s.name,
    fill: s.fill || null,
    fillOpacity: s.fillOpacity === undefined ? 1 : s.fillOpacity,
    stroke: s.stroke || null,
    strokeWidth: s.strokeWidth || 0,
    subpaths: toPathPoints(s.d).map((sp) => ({
      closed: sp.closed,
      pts: sp.pts.map((p) => ({ a: p.a.map(round2), l: p.l.map(round2), r: p.r.map(round2), s: p.smooth })),
    })),
  })),
}));

const jsx = `// ざっくり水硬度計算機のイラスト (自動生成: design/illustrations/water-hardness/build.mjs)
// Illustrator で「ファイル > スクリプト > その他のスクリプト」からこのファイルを実行する。
// 新規ドキュメントにアートボード bottle / pitcher / bean を作り、線パスで描く。
// 調整後は「書き出し > スクリーン用に書き出し」(SVG) で
// site-src/public/assets/techreate/whx/<アートボード名>.svg を上書きする。
// ※ アートボードのサイズは変えないこと(サイトの入力欄の位置がこのサイズ基準)
#target illustrator

(function () {
  var ARTS = ${JSON.stringify(jsxData)};
  var COLORS = ${JSON.stringify(
    Object.fromEntries(
      Object.entries(colors).map(([k, hex]) => [
        k,
        [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)],
      ]),
    ),
  )};
  var GAP = 40;

  function rgb(key) {
    var c = new RGBColor();
    c.red = COLORS[key][0];
    c.green = COLORS[key][1];
    c.blue = COLORS[key][2];
    return c;
  }

  app.coordinateSystem = CoordinateSystem.DOCUMENTCOORDINATESYSTEM;
  var doc = app.documents.add(DocumentColorSpace.RGB, ARTS[0].width, ARTS[0].height);

  var offsetX = 0;
  for (var i = 0; i < ARTS.length; i++) {
    var art = ARTS[i];
    var left = offsetX;
    var top = 0;
    var rect = [left, top, left + art.width, top - art.height];
    var board = i === 0 ? doc.artboards[0] : doc.artboards.add(rect);
    board.artboardRect = rect;
    board.name = art.name;

    var layer = i === 0 ? doc.layers[0] : doc.layers.add();
    layer.name = art.name;

    // SVG と同じ重なり順にするため、後の図形を手前に積む
    for (var j = 0; j < art.shapes.length; j++) {
      var shape = art.shapes[j];
      var target = layer;
      if (shape.subpaths.length > 1) {
        target = layer.compoundPathItems.add();
      }
      for (var k = 0; k < shape.subpaths.length; k++) {
        var sp = shape.subpaths[k];
        var path = target.pathItems.add();
        for (var m = 0; m < sp.pts.length; m++) {
          var p = sp.pts[m];
          var pp = path.pathPoints.add();
          pp.anchor = [left + p.a[0], top - p.a[1]];
          pp.leftDirection = [left + p.l[0], top - p.l[1]];
          pp.rightDirection = [left + p.r[0], top - p.r[1]];
          pp.pointType = p.s ? PointType.SMOOTH : PointType.CORNER;
        }
        path.closed = sp.closed;
        if (shape.fill) {
          path.filled = true;
          path.fillColor = rgb(shape.fill);
        } else {
          path.filled = false;
        }
        if (shape.stroke) {
          path.stroked = true;
          path.strokeColor = rgb(shape.stroke);
          path.strokeWidth = shape.strokeWidth;
          path.strokeCap = StrokeCap.ROUNDENDCAP;
          path.strokeJoin = StrokeJoin.ROUNDENDJOIN;
        } else {
          path.stroked = false;
        }
        if (shape.fillOpacity < 1) {
          path.opacity = shape.fillOpacity * 100;
        }
        path.name = shape.name;
      }
      if (target !== layer) {
        target.name = shape.name;
      }
    }
    offsetX += art.width + GAP;
  }

  doc.artboards.setActiveArtboardIndex(0);
  app.executeMenuCommand('fitall');
})();
`;

mkdirSync(svgOutDir, { recursive: true });
for (const art of illustrations) {
  writeFileSync(resolve(svgOutDir, `${art.name}.svg`), toSvg(art));
}
writeFileSync(jsxOut, jsx);

// タグ上の入力欄の位置(CSSで使う。%はボトルSVG基準)
console.log('tag frame (% of bottle):', {
  left: round2((TAG.x / bottle.width) * 100),
  top: round2((TAG.y / bottle.height) * 100),
  width: round2((TAG.w / bottle.width) * 100),
  height: round2((TAG.h / bottle.height) * 100),
  rotate: TAG.rotate,
});
console.log('wrote', illustrations.map((a) => `${a.name}.svg`).join(', '), 'and', jsxOut);
