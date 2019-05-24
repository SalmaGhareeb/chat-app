
<template>
  <div class="row">
    <div class="card col-4">
      <div class="card-body">
        <div class="card-title">
          <h3>Online</h3>
          <hr>
        </div>
        <div class="card-body">
          <ul v-for="user in online">
            <li>{{user}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="card col-4">
      <div class="card-body">
        <div class="card-title">
          <h3>Messages</h3>
          <hr>
        </div>
        <div class="card-body">
          <div class="messages" ref="chatContainer">
            <div v-for="message in messages" class="mt-4 mb-4">
              <span slot="activator">
                <p class="grey--text text--darken-2">
                  <b class="indigo--text" v-if="isMyHandle(message.handle)">{{message.handle}} :</b>
                  <b class="pink--text" v-else>Me :</b>
                  {{message.message}}
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <form @submit.prevent="sendMessage">
          <div class="gorm-group">
            <label for="user">User:</label>
            <input type="text" v-model="user" class="form-control">
          </div>
          <div class="gorm-group pb-3">
            <label for="message">Message:</label>
            <input type="text" v-model="message" class="form-control">
          </div>
          <button type="submit" class="btn btn-success">Send</button>
        </form>
      </div>
    </div>
    <div class="card col-4">
      <app-chat-groups></app-chat-groups>
      <!-- <app-chat-buddies></app-chat-buddies> -->
    </div>
  </div>
</template>
<script>
import io from "socket.io-client";
import chatBuddies from "./OnlineBuddies";
import chatGroups from "./ChatGroups";

export default {
  components: {
    appChatBuddies: chatBuddies,
    appChatGroups: chatGroups
  },
  data() {
    return {
      message: "",
      id: this.$route.params.id
    };
  },
  sockets: {
    connect: function() {
      console.log("socket connected");

      this.$store.dispatch(
        "socket/SET_HANDLE",
        this.$store.state.authentication.user.username
      );
      this.$store.dispatch(
        "socket/SET_ONLINE_USER",
        this.$store.state.authentication.user.username
      );
    },
    disconnected: function() {
      this.$store.dispatch(
        "socket/REMOVE_USER",
        this.$store.state.authentication.user.username
      );
    },
    MESSAGE: function(data) {
      this.$store.dispatch("socket/ADD_CHAT", data);
    }
  },
  methods: {
    reload() {
      this.$store.dispatch("socket/SET_CHAT", this.$route.params.id);
    },
    async sendMessage() {
      if (this.message) {
        let message = {
          handle: this.$store.state.authentication.user.username,
          message: this.message,
          chat: this.$route.params.id
        };
        let response = await this.$socket.emit("MESSAGE", message);
        this.message = "";
      }
    },
    isMyHandle(handle) {
      if (handle !== this.$store.state.authentication.user.username) {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    this.$store.dispatch("socket/SET_CHAT", this.$route.params.id);
  },
  computed: {
    messages() {
      return this.$store.state.socket.chats;
    },
    user() {
      return this.$store.state.authentication.user.username;
    },
    online() {
      return this.$store.state.socket.online;
    }
  },
  updated() {
    var container = this.$refs.chatContainer;
    container.scrollTop = container.scrollHeight;
  },
  watch: {
    "$route.path": "reload"
  }
};
</script>