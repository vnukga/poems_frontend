<template>
    <div class="AutorizationPage">
        <div class="q-gutter-md center-box">
            Для входа в игру введите учетные данные и нажмите "Войти"
            <q-input outlined v-model="login" label="Логин" />
            <q-input type="password" outlined v-model="password" label="Пароль" />
            <span>Я не <a href="#" v-on:click="$router.push({ name:'register'})">зарегистрирован</a> в игре</span>
            <q-btn push color="primary" label="Войти" v-on:click="Autorize"/>
        </div>
    </div>
</template>

<script>

import { HttpRequestFactory } from '../../Core-prod/api/requests/HttpRequestFactory'
import { requestType } from '../../Core-prod/api/dataTypes'
import { showNotifyToast, NotifyTypes } from '../../Core-prod/UI/Notifyer';

export default {
    name: "AutorizationPage",
    data() {
        return {
            login: "",
            password: "",
        }
    },

    methods: {
        async Autorize() {

            let authInfo = {
                login : this.login,
                password : this.password
            };

            let response = await HttpRequestFactory.makeRequest( requestType.UserAuth, authInfo );

            if(response.data.success) {
                showNotifyToast(NotifyTypes.INFO, "Авторизация успешна!");
                console.log("Correct Auth request recieved!");
                this.$store.commit('LOGIN', response);
                console.log("[AUTH_FORM_LOGIN_RESULT]: " + JSON.stringify(this.$store.getters.GET_ID));
                this.$router.push({ name:'roomslist'});
            } else {
                console.log("ОШИБКА АВТОРИЗАЦИИ");
            }
            
            console.log("Added user with ID: " + this.$store.getters.GET_ID)
        }
    }
}

</script>

<style scoped>
    .center-box {
        margin: auto;
        text-align: center;
        border-radius: 4px;
        max-width: 330px;
    }
</style>