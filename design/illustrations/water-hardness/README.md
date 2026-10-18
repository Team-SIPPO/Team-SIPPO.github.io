# ざっくり水硬度計算機のイラスト

`/calc-waterhardness` で使うイラスト（ボトル＋成分表示タグ／コーヒーサーバー／コーヒー豆）。

## 描き方のルール

- 輪郭はすべて **線（stroke）のパス**。輪郭を「塗りの図形」で表現しない
- 塗りは水・黄色のアクセント（キャップのリング、ハトメ）・タグの下地（紙色）だけ。輪郭とは別オブジェクト
- 曲線は3次ベジェで、つなぎ目の接線をそろえて滑らかにする
- 色は `ink #070707` / `paper #ffffff` / `accent #fff000`（`index.css` の `:root` と同じ）

## ファイル

| ファイル | 役割 |
| --- | --- |
| `build.mjs` | ジオメトリの定義。SVG と Illustrator 用スクリプトを書き出す |
| `water-hardness-illustrations.jsx` | Illustrator 用スクリプト（自動生成） |
| `water-hardness-illustrations.ai` | スクリプトで描いた Illustrator 原本。編集はこれを開けばよい |
| `site-src/public/assets/techreate/whx/*.svg` | サイトで使う SVG（自動生成 or Illustrator から書き出し） |

## Illustrator で編集する

1. Illustrator で「ファイル > スクリプト > その他のスクリプト」から `water-hardness-illustrations.jsx` を実行
2. アートボード `bottle`（212×280）、`pitcher`（260×186）、`bean`（40×48）に線パスで描かれる
3. 線を調整する。**アートボードのサイズは変えない**（サイトの入力欄や線の位置がこのサイズ基準）
4. 「書き出し > スクリーン用に書き出し」で形式 SVG を選び、`site-src/public/assets/techreate/whx/` に上書き
   - SVG オプション: スタイル「プレゼンテーション属性」、レスポンシブ ON、「アートボードカラーを含める」OFF、「サブフォルダーを作成」OFF

### 位置を合わせている箇所

タグの枠や注ぎ口の位置を Illustrator で動かした場合は、次も合わせて直す。

- タグ枠 `x80 y100 w124 h116 回転6°` → `index.css` の `.whx-tag`（%）
- サーバーの口の中心 `x120 y10` → `WaterHardnessPage.jsx` の `measure()`

## コードから作り直す

```sh
npm run build:whx-art
```

`build.mjs` の座標を直して実行すると、SVG と `.jsx` の両方が更新される（Illustrator で手直しした SVG は上書きされるので注意）。
