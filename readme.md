# Microsoft Teams でもぴょこぴょこするアレ

Microsoft Teams の会議参加者が喋るとぴょこぴょこする（ための元データ）を生成します。

https://user-images.githubusercontent.com/1254213/155852124-a5290c46-d79e-478c-a7a5-1e74f0cd511e.mp4

## 前提条件

- 当初WebブラウザでTeams会議に参加してJavaScriptで`isSpeaking`などの状態を取得していたのがうまく取れなくなったので仕組みが変わりました。
- アプリとしてTeams会議に参加するTeamsClientと、発話状態を受信して、ユーザー管理とDiscord風の状態を生成するStatusServerの2つを使います。

## セットアップ

### サーバー

#### 事前準備

1. TeamsClientがTeams会議に参加するためのAzure Communication Services （TeamsClientのreadmeを参照）
2. `StatusServer\TwinkleTeams.StatusServer` で以下のコマンドを実行
  - `dotnet tool install --global dotnet-ef`
  - `dotnet ef migrations add Initial`
  - `dotnet ef database update`
 
## 利用方法

1. `StatusServer\TwinkleTeams.StatusServer` で `dotnet run` を実行する
1. TeamsClientを起動し、Teams会議に参加する
4. OBSでlocalhost:5132/user の情報を表示する

## Tips

- `http://localhost:5132/Home/Wstest` で受信したメッセージの name とAdminで登録したNameが一致する必要があります
- CSSサンプル … [一人ずつぴょこぴょこする立ち絵のカスタムCSS / 三日月望](https://n-mikaduki-fb.fanbox.cc/posts/902468)
- アイコンサイズを参加者別に個別に変えたい、個別のCSSを適用したいといった場合は `/user?id=1` のようにIDを指定してその参加者だけのステータスをOBSなどで指定、カスタムCSS適用などすると楽です。
- Teams参加者が「高品質のミュージックモード」を使用している場合、常時Speaking状態になる場合があります。（立ち絵に変化がなくなる）
  - ![image](https://user-images.githubusercontent.com/1254213/155852375-6fff1d0b-256f-43ae-85f3-adc2b0641b45.png)
  - ![image](https://user-images.githubusercontent.com/1254213/155852408-c720224a-8f0c-46c0-a556-564f12fa07c3.png)
