### MANAGEMENT CONTACT LARAVEL RESTFUL API  REACTJS


![Login](/docs/screenshot/screencapture-localhost-5173-login-2023-12-14-11_56_27.png)
![Register](/docs/screenshot/screencapture-localhost-5173-register-2023-12-14-11_56_05.png)
![Contacts](/docs/screenshot/screencapture-localhost-5173-dashboard-2023-12-14-11_54_02.png)
![Detail](/docs/screenshot/screencapture-localhost-5173-contact-10-2023-12-14-11_55_18.png)


#### ENDPOINT API

![user](/docs/screenshot/api/user.png) ![contact](/docs/screenshot/api/contact.png) ![address](/docs/screenshot/api/address.png)


### RUN PROJECT WITH LINUX OR TERMINAL GITBASH WINDOWS

```shell
npm i -g yarn
git clone https://github.com/ryugenxd/ContactApp;
cd ContactApp;
composer update;
```
- rename the ```.env.example``` file to ```.env```
- set database configuration in ```.env``` file

```shell
php artisan key:generate;
php artisan migrate:fresh;
php artisan serve;
```
- open a new terminal window

```shell
cd frontend;
yarn;
yarn dev;
```
- open with browser ```http://localhost:5173/```
