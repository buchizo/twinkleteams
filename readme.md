# Microsoft Teams でもぴょこぴょこするアレ

Microsoft Teams の会議参加者が喋るとぴょこぴょこする（ための元データ）を生成します。

https://user-images.githubusercontent.com/1254213/155852124-a5290c46-d79e-478c-a7a5-1e74f0cd511e.mp4

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
- CSSサンプル … [一人ずつぴょこぴょこする立ち絵のカスタムCSS / 三日月望](https://n-mikaduki-fb.fanbox.cc/posts/902468)
- アイコンサイズを参加者別に個別に変えたい、個別のCSSを適用したいといった場合は `/user?id=1` のようにIDを指定してその参加者だけのステータスをOBSなどで指定、カスタムCSS適用などすると楽です。
- Teams参加者が「高品質のミュージックモード」を使用している場合、常時Speaking状態になる場合があります。（立ち絵に変化がなくなる）
  - ![image](https://user-images.githubusercontent.com/1254213/155852375-6fff1d0b-256f-43ae-85f3-adc2b0641b45.png)
  - ![image](https://user-images.githubusercontent.com/1254213/155852408-c720224a-8f0c-46c0-a556-564f12fa07c3.png)



