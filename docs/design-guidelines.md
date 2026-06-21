# Techreate サイト デザインガイドライン

最終更新: 2026-06-13 / 対象: site-src 配下の全ページ

## ブレークポイント(3段階)

| 区分 | 幅 | コンテナ(--container-wide) | H1 | H2 | --gap-section |
|---|---|---|---|---|---|
| スマホ | 〜767px | 100% | 32px | 24px | 32px |
| タブレット | 768〜1023px | 880px | 38px | 26px | 40px |
| PC | 1024px〜 | 1040px | 44px | 28px | 48px |

## タイルセクション共通仕様(What's new / portfolio / history)

3つは **同一コンポーネント** `TileGridSection` + `.media-tile` を使う。個別の上書きクラス禁止。

| 項目 | PC/タブレット | スマホ |
|---|---|---|
| 列数 | 4列 | 2列 |
| タイル幅(--tile-width) | 136px | 136px |
| 画像 | 86×86 contain | 同 |
| メタ(年/日付) | 16px・画像から12px | 同 |
| 罫線 | 71px・上8px 下10px | 同 |
| タイトル | 13px・幅136px・折返し(pre-line) | 同 |
| グリッドgap | 列32px / 行48px | 列24px / 行40px |
| セクション上マージン | --gap-section | 同 |
| 見出し→グリッド | 32px(--tile-section-grid-gap) | 同 |

## インタラクション

- ホバーアニメーションは**クリックできる要素のみ**(`a.media-tile:hover` のようにアンカー限定で書く)。装飾画像には付けない
- ヘッダーは `max-w-[920px]` 内で logo / nav を `justify-between`。位置調整のための translate ハック禁止(横スクロールの原因)

## 0. 現状調査で見つかったばらつき

| 項目 | 現状 | 箇所 |
|---|---|---|
| H1サイズ | PageIntro=44px / Home=34px(直書き) / 会員詳細=44px左寄せ | `HomeHero.jsx:8` `text-[34px]` |
| 本文サイズ | About本文=13px / 会員紹介=15px / リード=17px | `.about-copy`(13px) が最小で読みにくい |
| 見出しクラス | `.member-section-title` と `.activity-history-title` がほぼ同一定義で重複 | index.css 770行/1284行 |
| セクション余白 | 24 / 25 / 26 / 32 / 34 / 42 / 48 / 54px が混在 | `.two-column` 24, `.activity-history` 25, `.about-copy` gap 26, `.social-grid` 34, `.members-grid` 54 など |
| コンテナ幅 | 720px が `.news-section` と `.members-page` に直書きで重複 | トークン化されていない |
| 直書きの魔法数 | `pt-[132px]` `ml-[160px]` `gap-[140px]` `gap-[94px]` `translate-x-[28px]` `gap-[20px]` | HomeHero / Header / Footer |
| フォント別名 | `font-sans` と `font-techreate` が同一スタックの二重定義 | tailwind.config.js |
| 色 | Tailwindに `ink/techYellow/lineGray` があるのにCSSは `#070707` `#fff000` `#c7c7c7` を直書き | index.css 全域 |

## 1. タイポグラフィ

**フォントは IBM Plex Sans JP のみ**。例外は「ざっくり水硬度計算機」(`/calc-waterhardness`)の
手書きフォント **Zen Kurenaido**(Google Fonts / `--font-hand`)— ページ専用テーマとして扱い、他ページでは使わない。
`font-techreate` 別名は廃止し `font-sans` に統一する。

タイプスケール(既存トークンを正とする / モバイル→タブレット→PC):

| 役割 | トークン | サイズ | weight | 揃え |
|---|---|---|---|---|
| H1 ページタイトル | `--fs-h1-hero` | 32/38/44 | 400 | 中央 |
| H2 セクション見出し | `--fs-h2-section` | 24/26/28 | 400 | 中央(英語小文字: history, portfolio) |
| H3 小見出し | `--fs-h3-sub` | 18/19/20 | 400 | 文脈依存 |
| リード(イントロ下の説明) | `--fs-body-lg` | 17 | 400 | 中央 |
| 本文(読み物) | `--fs-body-md` | 15 | 400 | **中央**・行間1.95(イントロが中央のため本文も中央で統一) |
| 補助・メタ | `--fs-body-sm` | 13 | 400 | 文脈依存 |
| ラベル(役職など) | `--fs-label-sm` | 12 | 400 | - |
| アイブロウ(タイトル上の小語) | `--fs-label-md` | 14 | 400 | 中央 |

変更が必要な箇所:
- `.about-copy` 13px → **15px**(本文は body-md が下限)
- Home の H1 は 34px 直書き → トークン化(案: そのまま `--fs-h1-hero` にせず、ホーム専用なら `--fs-h1-home: 22/34px` をトークンとして定義し由来を明示)
- `.page-kicker` 15px → 14px(`--fs-label-md`)

## 2. 配置(揃え)の原則

- **ページイントロ(H1+リード)= 中央揃え**。全ページ PageIntro を通す(会員詳細は専用レイアウトだが、タイトルの書式トークンは共有)
- **読み物本文 = 左揃え**、幅は `--reading`(640px)に収める(About本文・会員bio)
- **セクション見出し = 中央揃え**
- タイル群(news/members)= グリッドごと中央寄せ

## 3. 余白

スペーシングスケール: **4 / 8 / 12 / 16 / 24 / 32 / 40 / 48** に丸める(25・26・34・42・54は廃止)。

| 用途 | トークン | 値 |
|---|---|---|
| ページ上/下パディング | `--pad-y-top` / `--pad-y-bottom` | 48→64→80 / 72→84→96 |
| 横パディング | `--pad-x` | 24 |
| イントロ→最初のセクション | `--gap-section` | 32→40→48 (members-grid 54, social-grid 34 をこれに寄せる) |
| セクション見出し→グリッド | `--tile-section-grid-gap` | 32(activity-history の25px上書きは廃止) |
| グリッドのセル間 | `--gap-grid` | 24→22 |

## 4. コンテナ幅

| トークン | 幅 | 用途 |
|---|---|---|
| `--container-wide` | 1040 | ページシェル(page-main) |
| `--container-default` | 880 | 会員詳細 |
| `--container-board`(新設) | 720 | タイル盤面(news / members) ← 現在2箇所に直書きの720を統合 |
| `--reading` | 640 | 読み物本文 |

## 5. 色

CSS変数に集約し、Tailwind config は `var()` 参照にする(値の二重管理をやめる):

```css
--color-ink: #070707;      /* 文字・線 */
--color-paper: #ffffff;    /* 背景 */
--color-accent: #fff000;   /* 強調(黄) */
--color-line: #c7c7c7;     /* 罫線 */
--color-muted: #555555;    /* 補助文字 */
```

計算機ページ専用テーマ(他ページ使用禁止):
`--wh-bg: #e8e6e6` / `--wh-blue: #3d9be9` / `--wh-pill: #96c7ff` / フォント `--font-hand`(Zen Kurenaido)

## 6. テンプレ化(リファクタリング計画)

**Phase 1: トークン整備(見た目変化なし)**
1. 色をCSS変数化し、index.css の直書きを置換。tailwind.config.js は var() 参照に
2. `--container-board` 新設、`.news-section` / `.members-page` を置換
3. `font-techreate` 廃止 → `font-sans`

**Phase 2: コンポーネント統合**
4. `.section-title` を新設し `.member-section-title` / `.activity-history-title` を統合
   (TileGridSection の titleClassName 指定が不要になる)
5. PageIntro を全ページの H1 経路として固定(404含む)。会員詳細の `<h1>` は書式だけ共通クラスへ
6. TileGridSection に幅プリセット(board/default)を持たせ、ページ側のラッパー class を削減

**Phase 3: 余白・サイズの正規化(軽微な見た目変化あり、要確認)**
7. `.about-copy` 13→15px、グループgap 26→24px
8. `.members-grid` margin 54→48px、`.social-grid` 34→32px、activity-history のgap 25→32px
9. `.page-kicker` 15→14px

**Phase 4: 直書き値の解消**
10. HomeHero: `pt-[132px]`/`ml-[160px]`/`text-[34px]` をトークン・既存ユーティリティへ
11. Header: `gap-[140px]`/`gap-[94px]`/`translate-x-[28px]` を見直し(センタリングはレイアウトで解決)
12. Footer: `gap-[20px]` → `gap-grid` 系へ

各Phaseは独立してビルド&スクリーンショット検証可能。Phase 3 のみ視覚差分が出るため、変更前後の比較スクリーンショットを取って確認する。
