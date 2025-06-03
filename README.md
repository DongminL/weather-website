# 프로젝트 실행 방법

## 1. git clone
``` bash
git clone "https://github.com/DongminL/weather-website.git"
```

## 2. 프로젝트 루트 경로에 `.env.local` 파일 생성

![image](https://github.com/user-attachments/assets/009461dd-8b55-4f3c-a80a-b5da609a8536)


## 3. `.env.local` 파일 안에 아래와 같이 작성

```env
OPEN_WEATHER_MAP_BASE_URL="https://api.openweathermap.org/data/2.5"
OPEN_WEATHER_API_KEY="본인의 Open Weather Map API Key"
```

## 4. Next.js 프로젝트 의존성 설치

``` bash
$ npm install
```

## 5. 프로젝트 Build

``` bash
$ npm run build
```

## 6. 프로젝트 실행

``` bash
$ npm run start
```

# 웹 페이지 구현 화면

## 메인 페이지

![image](https://github.com/user-attachments/assets/79d79bf1-3d99-4c1e-a7c3-8ec547ab23d2)

## 도시별 날씨 페이지

### 토글이 닫혀 있을 때

![image](https://github.com/user-attachments/assets/fa5ff7c0-6e05-4a6a-bb93-69d73917543f)

### 토글 열려 있을 때

![image](https://github.com/user-attachments/assets/048b2d5e-cbaa-42b1-96f7-32c1b184ac51)
