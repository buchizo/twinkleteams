# Microsoft Teams でもぴょこぴょこするアレ

## セットアップ

### サーバー

1. `StatusServer\TwinkleTeams.StatusServer` で以下のコマンドを実行
  - `dotnet ef migrations add Initial`
  - `dotnet ef database update`
 
### ブラウザ拡張

1. Microsoft Edge (Chrmium) または Google Chrome で拡張機能を開き、開発者モードにして `ChromeExtension` フォルダーを追加する

## 利用方法

1. `StatusServer\TwinkleTeams.StatusServer` で `dotnet run` を実行する
2. ブラウザで localhost:5132 に接続、話者登録をしておく
3. Microsoft Teamsのミーティングにブラウザ拡張をインストールしたブラウザで参加する
4. OBSでlocalhost:5132/user の情報を表示する

## Tips

- Teamsの利用者ID的な情報は表示名を使ってるのでうまく取れない場合があります（Meetingに再度参加したりすると取れたりする）
- `http://localhost:5132/Home/Wstest` で受信したメッセージの name とAdminで登録したNameが一致する必要があります
- Chrome Extension内からSignalRサーバーへの接続など適当なのでStatusServerを起動してからMicrosoft Teamsに接続するとかしたほうがよいかも
- URLが変わる場合はChrome Extensionの `manifest.json` 内の `host_permissions` も修正してください
