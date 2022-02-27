# このリポジトリについて
このリポジトリは、WordPressプラグインを制作する上でモダンな環境からスタートできるテンプレートリポジトリです。

## このテンプレートでできること
* Linter/テストツールを採用したモダンな開発環境
* TypeScript
* 開発に便利なコマンド群
* GitHub Actionsを使ったCI/CD

### 各種Lintツール
PHP_CodeSniffer
ESLint
Stylelint

### 解析ツール
PHPStan

### テストツール
PHPUnit
Jest

### 便利なコマンド
|コマンド|できること|
|:--|:--:|
|composer zip|設定ファイル等を除いたzip化|
|composer release|cmd/create-verup-issue.shを使って<br>バージョンアップissue自動作成（要GitHub CLI）|
|composer phpstan|PHPStan実行|
|composer test|PHPUnit実行|
|composer make-jspot|JavaScript用の翻訳ファイル（.pot）生成|
|composer make-pot|PHP用の翻訳ファイル（.po）生成|
|composer make-json|JavaScript用の翻訳ファイル（.json）生成|

### GitHub Actions
|内容|条件|
|:--:|:--:|
|PHPUnit|class/ディレクトリ配下のファイルをプルリクエスト|
|ESLint/Stylelint|src/ディレクトリ配下のファイルをプルリクエスト|
|SVN自動デプロイ|tagをプッシュ|

#### githooks

以下のリポジトリから次のファイルが自動的にダウンロードされます。

* commit-msg
* pre-commit
* conf/linter_config.sh

これによりgitに以下の制約が加わります。
* ブランチ名は< ticket number >-< type >-< subject >にしないとcommitできない
* Linter（PHP_CodeSniffer/ESLint/Stylelint）にパスしないとcommitできない
* コミットメッセージにチケット番号の自動付与（e.g. refs #xx commit message）

詳しい内容は以下のリポジトリをご確認ください。

https://github.com/braveryk7/GitHooks

## 使い方

## まずやること
新規プロジェクトを開始したら、以下の手順で開発環境を整えましょう。

### パッケージインストール
npm/composerの各パッケージをインストールします。

```shell
$ npm install
```

```shell
$ composer install
```

### プロジェクトを始めるための修正
プロジェクト名が決まったら以下を修正します。
例えば、今回はmy-pluginというプロジェクト名と仮定します。

#### cmd/create-verup-issue.sh

```diff
body="
  - [ ] readme.txtの更新（バージョン情報、更新履歴）
- - [ ] .phpの更新（バージョン情報）
+ - [ ] my-plugin.phpの更新（バージョン情報）
  - [ ] GitHub Releaseの作成
  - [ ] 記事反映
  - [ ] SVN trunkへの追加
  - [ ] アップデート告知
"
```

#### cmd/zip.sh
```diff
# ZIP name
- zip_file_name=""
+ zip_file_name="my-plugin"
```

#### composer.json
```diff
"zip": "npm run build && bash cmd/zip.sh",
"release": "bash cmd/create-verup-issue.sh",
- "make-jspot": "./vendor/bin/wp i18n make-pot . languages/js/PROJECT_NAME-ja.pot --skip-php",
+ "make-jspot": "./vendor/bin/wp i18n make-pot . languages/js/my-plugin-ja.pot --skip-php",
- "make-pot": "./vendor/bin/wp i18n make-pot . languages/PROJECT_NAME-ja.po --skip-js",
+ "make-pot": "./vendor/bin/wp i18n make-pot . languages/my-plugin-ja.po --skip-js",
"make-json": "./vendor/bin/wp i18n make-json languages/js --no-purge"
```

#### .github/workflows/deploy-wordpress-svn.yml
```diff
 - name: Set outputs
 run: |
	 TAG=`echo ${GITHUB_REF##*/} | sed -e "s/v//"`
	 echo ::set-output name=VERSION::$TAG
-	 echo ::set-output name=PROJECT_NAME::
+	 echo ::set-output name=PROJECT_NAME::my-plugin
 id: svn-env
```

#### .github/workflows/create-rsync-cmd.sh
```diff
# SVN NAME
- SVN_NAME=""
+ SVN_NAME="my-plugin"
```
#### .github/workflows/phpunit.yml
```diff
on: 
  pull_request:
    paths:
      - 'class/**'
+     - 'my-plugin.php'
```

#### readme.txt
状況に合わせて修正してください。

### GitHub Secretsの登録
それぞれ以下の内容でGitHub Secretsを登録します。
|登録名|内容|
|:--:|:--:|
|SVN_URL|WordPressのSVNリポジトリURL|
|SVN_USERNAME|wordpress.orgのログインID|
|SVN_PASSWORD|wordpress.orgのパスワード|

GitHub SecretsはSVN自動デプロイ時に使用されます。
値を設定しないと自動デプロイは行なえません（GitHub Actionがタグプッシュのたびに失敗します）。

# 免責事項
当プログラムを利用したいかなる不都合も製作者は責任を負いかねます。

# 更新履歴

## Ver.1.0.0 2022/2/27
初版