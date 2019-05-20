
<template>
  <div class="card mt-3">
    <div class="card-body">
      <div class="card-title">
        <h3>Chat Group</h3>
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
            <span>{{message.created | moment("HH:MM, DD-MM-YY")}}</span>
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
</template>
<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      message: ""
    };
  },
  sockets: {
    connect_error: function(e) {
      console.log("socket disconnected", e);
    },
    connect: function() {
      this.$store.dispatch("socket/SET_CHAT");
      this.$store.dispatch(
        "socket/SET_HANDLE",
        this.$store.state.authentication.user.username
      );
    },
    MESSAGE: function(data) {
      this.$store.dispatch("socket/ADD_CHAT", data);
    }
  },
  methods: {
    async sendMessage() {
      if (this.handle || this.message) {
        let message = {
          handle: this.$store.state.authentication.user.username,
          message: this.message
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
  computed: {
    messages() {
      return this.$store.state.socket.chats;
    },
    user() {
      return this.$store.state.authentication.user.username;
    }
  },
  updated() {
    var container = this.$refs.chatContainer;
    container.scrollTop = container.scrollHeight;
  }
};
</script>