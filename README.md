
# Alert

Alerm 서비스에 대한 백엔드 코드입니다. 클라이언트로부터 알람 시간을 설정할 수 있고, 알람을 끄기 위해 사용자가 행해야하는 행동을 지정하고, 해당 행동을 한 경우 알람을 끌 수 있습니다.

## ❗️ Notice

<img src='https://static-00.iconduck.com/assets.00/jira-icon-256x256-cf536q0j.png' width='12.5'> [Backend JIRA](https://tatumhq.atlassian.net/wiki/spaces/BackendTeam/overview)


## 📌 Version

 <img src='https://d33wubrfki0l68.cloudfront.net/017d7d8828700fa58a0abdcd5538124a95e4f491/8d58a/ko/img/pnpm-light.svg' width='12.5'> PNPM v7.30.3

 <img src='https://cdn-icons-png.flaticon.com/512/5968/5968322.png' width='12.5'> Node v18.12.1

 <img src='https://nx.dev/favicon/favicon.svg' width='13'> Nx v15.8.9

 <img src='https://www.typescriptlang.org/favicon-32x32.png?v=8944a05a8b601855de116c8a56d3b3ae' width='12.5'> typescript v5.3.3

 <image src='https://python-poetry.org/images/favicon-origami-32.png' width='14'> poetry v1.6.1

## 🏃 Getting Started

간단하게 개발에 필요한 nx, pnpm 명령어 입니다.

### 🚧 Install packages

```bash
// install 명령어는 package.json의 설정된 dependencies 다운로드합니다.
pnpm install

// add 명령어는 package를 추가로 설치하고 package.json에 dependencie를 추가합니다.
pnpm add <PackageName>

// -D 옵션은 devDependencies를 설치하고 package.json에 추가합니다. 
pnpm add -D <PacakgeName>

```

### 🏗️ Development

``` bash
nx serve <ProductName>
```

### 🏘️ Build

``` bash
nx build <ProductName>
nx run-many --target=build
```

### 📄 Test

``` bash
nx test <ProductName>
nx run-many --target=test
```

### 🌐 E2E Test

``` bash
nx e2e <ProductName>
nx run-many --target=e2e
```

### 🛠️ Lint

``` bash
nx lint <ProductName>
nx run-many --target=lint
```

### 🚴‍♂️ 종합 실행

test, lint build를 한번에 실행하는 명령어 입니다.

``` bash
nx run-many --target=test,lint,build
```

### Create Product

신규 product를 생성하는 명령어입니다.

``` bash
nx g @nrwl/nest:app <Product Name>
```

### Create Module

신규 module을 생성하는 명령어입니다.

```bash
nx g @nrwl/js:lib <Module Name>
```
