# Techreate GitHub Pages

## 概要

本リポジトリは、`https://www.techreate.org/` をベースに再構築した GitHub Pages 向けのフロントエンド実装である。  
実装は React + Vite + Tailwind CSS を採用し、GitHub Actions 経由で `dist/` を GitHub Pages にデプロイする構成としている。

## 技術スタック

- React 18
- React Router
- Vite
- Tailwind CSS
- GitHub Actions
- GitHub Pages

## 前提環境

- Node.js 22 系
- npm

GitHub Actions でも Node.js 22 を使用する。

## セットアップ

```bash
npm ci
```

## 開発コマンド

| コマンド | 用途 |
| --- | --- |
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | 本番用ビルドを生成 |
| `npm run preview` | build 結果をローカル確認 |

## ビルド仕様

Vite のルートディレクトリは `site-src/` である。  
HTML エントリは `site-src/app.html` を使用する。

```bash
npm run build
```

ビルド出力先:

- `dist/`

主な生成物:

- `dist/index.html`
- `dist/404.html`
- `dist/assets/app/*`
- `dist/assets/techreate/*`

`404.html` は GitHub Pages 上で SPA の直接アクセスを受けるための fallback として利用する。

## GitHub Pages デプロイ

ワークフロー定義:

- [.github/workflows/pages.yml](/home/omi-/projects/HP/.github/workflows/pages.yml)

対象ブランチ:

- `main`
- `master`
- `redesign`

上記ブランチへの push を契機に GitHub Actions が実行され、`dist/` を Pages artifact として deploy する。

GitHub 側では、以下の設定を使用すること。

- `Settings > Pages > Build and deployment > Source = GitHub Actions`

## ディレクトリ構成

```text
.
├── .github/workflows/pages.yml
├── dist/                    # build 出力
├── site-src/
│   ├── app.html             # Vite HTML エントリ
│   ├── public/              # 静的ファイル
│   │   └── assets/techreate/
│   └── src/
│       ├── components/      # UI コンポーネント
│       ├── data/            # ページ用データ
│       ├── lib/             # パス解決・補助ロジック
│       └── pages/           # ルート単位のページ
├── package.json
└── vite.config.js
```

## 静的アセットの配置方針

### `site-src/public`

`site-src/public` は、現行の React/Vite アプリケーションで利用する静的ファイルの配置ディレクトリである。  
ここに配置したファイルは build 時にそのまま `dist/` へコピーされる。

例:

- `site-src/public/assets/techreate/logo.png`
- `site-src/public/assets/techreate/top-image.png`
- `site-src/public/assets/techreate/member-*.png`

コピー結果の例:

- `site-src/public/assets/techreate/logo.png`
  → `dist/assets/techreate/logo.png`

現在のアプリケーションコードは `/assets/techreate/...` を前提として参照している。

関連ファイル:

- [site-src/src/lib/asset.js](/home/omi-/projects/HP/site-src/src/lib/asset.js#L1)
- [site-src/app.html](/home/omi-/projects/HP/site-src/app.html)

### 旧ルート直下の `assets`

旧サイト由来のルート直下 `assets/` ディレクトリは削除済みである。  
現行の React/Vite アプリは当該ディレクトリを source asset として使用しない。

補足:

- [vite.config.js](/home/omi-/projects/HP/vite.config.js#L44) の `assetsDir: 'assets/app'` は、`dist/` 配下の出力先ディレクトリ名を定義している
- これは build 出力のパス指定であり、ルート直下に `assets/` ディレクトリを要求するものではない
- 旧資産が必要な場合は git 履歴から復元する

## 画像・アイコンの追加先

現行構成で新規画像またはアイコンを追加する場合の配置先は以下とする。

- `site-src/public/assets/techreate/`

理由:

- 現在の参照パス設計と一致する
- build 後の URL が変化しない
- GitHub Pages 上の配信パスと一致する

## 運用メモ

- 静的アセットの配置先は `site-src/public/assets/techreate/` に統一する。
- 旧ルート直下 `assets/` は削除済みであり、現行実装の依存先ではない。
- 旧資産が必要になった場合は git 履歴から参照または復元する。
