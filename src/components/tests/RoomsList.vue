<template> 
    <div class="RoomsList box">
        <input class="roomsbutton startbutton" type="button" value="Комнаты" v-on:click="ShowRooms">
        <input class="roomsbutton startbutton" type="button" value="Ошибка" v-on:click="showErrorNoti">
        <input class="roomsbutton startbutton" type="button" value="Объект" v-on:click="showObjectNoti">
        <input class="roomsbutton startbutton" type="button" value="Предупреждение" v-on:click="showWarningNoti">

        <div v-for="room in rooms.data" :key="room.id" class="roombox">
            <input class="startbutton" type="button" value="Инфо" v-on:click="GetRoom(room.id)"/>
            <input class="startbutton" type="button" value="Войти" v-on:click="EnterRoom(room.id)"/><br>
            <input class="startbutton" type="button" value="Перейти" v-on:click="$router.push({ name: 'insideroom', params: { id:room.id }})"/><br>
            <b>Комната №</b>{{ room.id }} <b>Играет </b>{{ room.users_rooms.length }} чел.
            <textarea value="" rows="2" cols="38"></textarea>
            <input class="startbutton" type="button" value="Отправить" v-on:click="SendMessage(room.id)"/>
            <input class="startbutton" type="button" value="Завершить" v-on:click="EndPoem(room.id)"/>
            <input class="startbutton" type="button" value="Покинуть" v-on:click="LeaveRoom(room.id)"/>
            <h6>Свободно: {{ room.places - room.users_rooms.length }} мест, создано: {{ Date.parse( room.created_at ) }} </h6>      
        </div>
    </div>
</template>

<script>
import { HttpRequestFactory } from '../../Core-prod/api/requests/HttpRequestFactory';
import { requestType } from '../../Core-prod/api/dataTypes';
import { showNotifyToast, NotifyTypes } from '../../Core-prod/UI/Notifyer';


export default {
    
    name: 'RoomsList',

    data() {
        return {
            rooms: {}
        }
    },

    methods: {
        async ShowRooms() {
            try {
            let getroom = { limit:10, offset:0 }
            let answer = await HttpRequestFactory.makeRequest(requestType.RoomsGet, getroom);
            this.rooms = {
                ...answer
            }
            console.log("ROOMS: " + JSON.stringify(answer));
            } catch(error) {
                console.log("[RoomsList] RoomsList not loaded. Server returns an error: " + error)
            }
        },
        async GetRoom(id) {
            try {
            let answer = await HttpRequestFactory.makeRequest(requestType.RoomGet, id);

            console.log("ROOM: " + JSON.stringify(answer));
            } catch(error) {
                console.log("[RoomsList] RoomsList not loaded. Server returns an error: " + error)
            }
        },
        async EnterRoom(id) {
            try {
            let answer = await HttpRequestFactory.makeRequest(requestType.EnterRoom, id);

            console.log("ROOM: " + JSON.stringify(answer));
            } catch(error) {
                console.log("[RoomsList] RoomsList not loaded. Server returns an error: " + error)
            }
        },
        async SendMessage(id) {
            let messageBody = { message: "Тут первый стих я напишу\nИ есть пойду свою лапшу!" }
            try {
            let answer = await HttpRequestFactory.makeRequest(requestType.SendMessage, messageBody, id);

            console.log("MSG: " + JSON.stringify(answer));
            } catch(error) {
                console.log("[SendMessage] RoomsList not loaded. Server returns an error: " + error)
            }
        },
        async EndPoem(id) {
            try {
            let answer = await HttpRequestFactory.makeRequest(requestType.EndPoem, id);

            console.log("MSG: " + JSON.stringify(answer));
            } catch(error) {
                console.log("[EndPoem] RoomsList not loaded. Server returns an error: " + error)
            }
        },
        async LeaveRoom(id) {
            try {
            let answer = await HttpRequestFactory.makeRequest(requestType.LeaveRoom, id);
            console.log("MSG: " + JSON.stringify(answer));
            } catch(error) {
                console.log("[LeaveRoom] RoomsList not loaded. Server returns an error: " + error)
            }
        },
        showErrorNoti() {
            showNotifyToast(NotifyTypes.ERROR, "Some testing error!")
        },
        showWarningNoti() {
            showNotifyToast(NotifyTypes.WARNING, "Some warning error!")
        },
        showObjectNoti() {
            showNotifyToast(NotifyTypes.ERROR, {"al":"No one lives forever, ", "ab":"No one lives forever!"})
        }
    }

}

</script>

<style scoped>
    .box {
        opacity: 0.9;
        margin: 100px auto;
        text-align: center;
        background-color: #dbcab3;
        border-radius: 4px;
        width: 350px;
        padding: 10px;
        box-shadow: 0 0 10px rgba(0,1,0,0.5);
    }
    .roombox {
        opacity: 0.9;
        margin: 15px;
        text-align: center;
        background-color: #dab787;
        border-radius: 4px;
        width: 300px;
        padding: 8px;
        box-shadow: 0 0 4px rgba(15, 13, 0, 0.5);
    }
    .verifyedinput {
        border-bottom: 2px solid #13b953;
    }
    .defaultinput {
        padding: 6px;
        margin: 10px;
        background-color: #B0C4DE;
        color: #191970;
        outline: 0;
        border: 0;
        border-radius: 4px;
        font-size: 1.2em;
        text-align: center;
    }
    .startbutton {
        padding: 6px;
        margin: 6px;
        background-color: #5F9EA0;
        color: #fff;
        outline: 0;
        border: 0;
        border-bottom: 2px solid #00CED1;
        border-radius: 4px;
        font-size: 1.2em;
        text-align: center;
        cursor: pointer;
        width: 150px;
    }
    .startbutton:hover {
        color: #fff;
        background-color: #CE7A05;
    }
</style>