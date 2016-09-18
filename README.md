# Wallethub
From the given set of problem statements.
I thought it would be nice to create a nice story board out of it. Thus this repo featuring WalletHub.
Stay tuned for the story

# Prerequisites
- If you wanna source build then you might wanna know dev deps
  - node 4.x
  - bower 1.7.X
  - typescript > 1.6.X
  - grunt
  
- Just wanna run it
  - clone the repo start it with your server (PS: or else you might need up with cors error)
  - simple solution on linux is to `cd <pathToRepo>` and excecute `python -m SimpleHTTPServer 8080`
  - add open browser with url `localhost:8080`
  - DONE
  
# Folder struture 
```
.
├── ./dist
│   ├── ./dist/css
│   │   ├── ./dist/css/main.css
│   │   └── ./dist/css/resources.css
│   ├── ./dist/img
│   │   ├── ./dist/img/banner.jpg
│   │   └── ./dist/img/wallethub.jpg
│   ├── ./dist/js
│   │   ├── ./dist/js/index.js
│   │   └── ./dist/js/resources.js
│   └── ./dist/partials
│       ├── ./dist/partials/baseComponent.html
│       ├── ./dist/partials/donor-list.html
│       ├── ./dist/partials/home.html
│       ├── ./dist/partials/profile-confirm.html
│       └── ./dist/partials/profile-form.html
├── ./dummyData.json
├── ./index.html
└── ./src
    ├── ./src/controllers
    │   ├── ./src/controllers/donor.list.ctrl.ts
    │   ├── ./src/controllers/profile.confirm.ctrl.ts
    │   └── ./src/controllers/profile.form.ctrl.ts
    ├── ./src/directives
    │   ├── ./src/directives/cardInfo.ts
    │   ├── ./src/directives/currency.ts
    │   └── ./src/directives/phoneNumber.ts
    ├── ./src/main.ts
    ├── ./src/route.ts
    ├── ./src/services
    │   ├── ./src/services/currencyUtil.ts
    │   ├── ./src/services/dataService.ts
    │   ├── ./src/services/objUtil.ts
    │   └── ./src/services/phoneUtil.ts
    └── ./src/typings
        └── ./src/typings/main.d.ts
  ```
  
`dist`
Has all the compiled and static hosted content

`src`
Has all the readable source code.To explore start from `main.ts`

# setup
- execute the following commands to compile 
  - npm install
  - bower install
  - grunt
  
If you feel the code is vilify,do raise issue would be happy to learn. :)
