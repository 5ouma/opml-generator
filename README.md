<h1 align="center">OPML Generator</h1>

<div align="center">

**📰 Generate OPML file via TOML file easily**

[![GitHub Release](https://img.shields.io/github/v/release/5ouma/opml-generator?style=flat-square)](https://github.com/5ouma/opml-generator/releases)
[![JSR](https://jsr.io/badges/@5ouma/opml-generator?style=flat-square)](https://jsr.io/@5ouma/opml-generator)
[![JSR Score](https://jsr.io/badges/@5ouma/opml-generator/score)](https://jsr.io/@5ouma/opml-generator)
<br />
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/5ouma/opml-generator?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/5ouma/opml-generator?style=flat-square)
[![GitHub last commit](https://img.shields.io/github/last-commit/5ouma/opml-generator?style=flat-square)](https://github.com/5ouma/opml-generator/commit/HEAD)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/m/5ouma/opml-generator?style=flat-square)](https://github.com/5ouma/opml-generator/commits/main)
<br />
[![Test](https://img.shields.io/github/actions/workflow/status/5ouma/opml-generator/test.yml?label=test&style=flat-square)](https://github.com/5ouma/opml-generator/actions/workflows/test.yml)
[![Release](https://img.shields.io/github/actions/workflow/status/5ouma/opml-generator/release.yml?label=release&style=flat-square)](https://github.com/5ouma/opml-generator/actions/workflows/release.yml)
[![pre-commit.ci status](https://results.pre-commit.ci/badge/github/5ouma/opml-generator/main.svg?style=flat-square)](https://results.pre-commit.ci/latest/github/5ouma/opml-generator/main)
[![codecov](https://codecov.io/github/5ouma/opml-generator/graph/badge.svg?token=ICJ7C3IDX7)](https://codecov.io/github/5ouma/opml-generator)

</div>

<br /><br />

## 📊 Usage

OPML Generator has 2 ways to convert TOML to OPML.

### 💻 On Local

1. Prepare your TOML file (Reference: [feeds.toml](./.github/assets/example/feeds.toml))

2. Run this command

   ```she
   deno run -A jsr:@5ouma/opml-generator
   ```

3. Outputs are stored in the `outputs` directory separated by `lists`

<br />

### 🐙 On GitHub Actions

1. Create two [GitHub Gist](https://gist.github.com):

   - includes [`feeds.toml`](./.github/assets/example/feeds.toml)
   - for outputs

2. Prepare your repository to run

3. Add Actions secrets
   from `Settings > Secrets and variables | Actions` in the sidebar

   > [🌍 Environment Variables](#-environment-variables)

4. Add this workflow file to `.github/workflows`:

   ```yaml
   name: ⬆️ Update OPML in Gist

   on:
     schedule: [cron: 0 0 * * *]
     workflow_dispatch:

   jobs:
     Update:
       runs-on: Ubuntu-Latest

       steps:
         - name: 🦕 Setup Deno
           uses: denoland/setup-deno@1
           with:
             deno-version: v1.x

         - name: ⬇️ Download the TOML and OPML repository
           run: |
             git clone "https://gist.github.com/${{ secrets.TOML_GIST_ID }}.git" feeds
             git clone "https://gist.github.com/${{ secrets.OPML_GIST_ID }}.git" outputs

         - name: 🧰 Generate OPML file
           run: deno run -A jsr:@5ouma/opml-generator --feeds=./feeds/feeds.toml --outputs=./outputs

         - name: ⬆️ Upload OPML file
           env:
             GH_TOKEN: ${{ secrets.TOKEN }}
           run: |
             git -C 'outputs' add -AN
             while read -r file; do
               gh gist edit ${{ secrets.OPML_GIST_ID }} "./outputs/$file" -a "./outputs/$file"
             done < <(git -C 'outputs' diff --name-only HEAD)
   ```

🎉 Automatically update every 0 a.m. UTC

<br /><br />

## 🌍 Environment Variables

|      Name       |        Description         | GitHub Actions requires |
| :-------------: | :------------------------: | :---------------------: |
| `TOML_GIST_ID`  | Gist ID for [`feeds.toml`] |           yes           |
| `OPML_GIST_ID`  |    Gist ID for outputs     |           yes           |
|     `TOKEN`     |  [Personal Access Token]   |           yes           |
| `NITTER_DOMAIN` |     Nitter RSS domain      |           no            |

[`feeds.toml`]: ./assets/example/feeds.toml
[Personal Access Token]: https://github.com/settings/tokens/new?description=OPML%20Generator&scopes=gist

<br /><br />

## 🗞️ Subscribe OPML

For Inoreader, please see the official blog, [**OPML subscriptions**](https://www.inoreader.com/blog/2014/05/opml-subscriptions.html).
<br />
For other RSS readers, please see each help page.

<br /><br />

## 🆘 Help

- [**⚠️ Issues**]: Feature Requests or Bug Reports
- [**💬 Discussions**]: General Chats or Questions
- [**🛡️ Security Advisories**]: Security Issues that should not be public

[**⚠️ Issues**]: https://github.com/5ouma/opml-generator/issues/new/choose
[**💬 Discussions**]: https://github.com/5ouma/opml-generator/discussions/new/choose
[**🛡️ Security Advisories**]: https://github.com/5ouma/opml-generator/security/advisories/new

<br /><br />

## 🎽 Contributing

I happily welcome your contributions!
Before you contribute,
I would recommend reading [CONTRIBUTING.md](./.github/CONTRIBUTING.md)
for a better development experience.
