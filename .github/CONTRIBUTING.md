# Contributing Guide<!-- omit in toc -->

> [!NOTE]
> You must follow the [Code of Conduct](./CODE_OF_CONDUCT.md).

I happily welcome your contributions!
Before you contribute,
I would recommend reading this guideline for a better development experience.

<br />

- [💬 Commit Message](#-commit-message)
- [🔠 Branch Prefix](#-branch-prefix)
- [❓ Pull Requests Title](#-pull-requests-title)
- [🪵 Commit Log](#-commit-log)

<br /><br />

## 💬 Commit Message

I recommend you to follow [Conventional Commits] with this format.

```commit message
type(scope): Description

Body
```

[Conventional Commits]: https://www.conventionalcommits.org

<br />

## 🔠 Branch Prefix

You should follow these branch name rules
because [Pull Request Labeler] automatically adds labels to your Pull Requests.
<br />
For the details of each label, please see [Labels](https://github.com/5ouma/opml-generator/labels).

[Pull Request Labeler]: https://github.com/actions/labeler

|        Label        |         Branch Prefix RegEx          |
| :-----------------: | :----------------------------------: |
|    Type: Feature    |            `^feat(ure)?-`            |
|      Type: Bug      |               `^fix-`                |
|   Type: Security    |           `^sec(urity)?-`            |
| Type: Documentation |          `^doc(ument)?s?-`           |
|  Type: Refactoring  |          `^refactor(ing)?-`          |
|    Type: Testing    |          `^test(ing\|s)?-`           |
|  Type: Maintenance  | `^maintenance-` , `^maintain(ing)?-` |
|      Type: CI       |                `^ci-`                |
| Type: Dependencies  |   `^dep(endency\|endencies\|s)?-`    |
|     Type: Meta      |               `^meta-`               |

> Labels were generated with [@azu / github-label-setup](https://github.com/azu/github-label-setup)

<br />

## ❓ Pull Requests Title

You don't need to add any prefixes like `feature` or `bug fix`
to the Pull Requests title because I can recognize what kind of PR it is from labels.
Please give a clear title.

<br />

## 🪵 Commit Log

I do squash merge to the dev branch to keep the commit history clean.
When merging your Pull Request, I'll add the Conventional Commits type and scope.
