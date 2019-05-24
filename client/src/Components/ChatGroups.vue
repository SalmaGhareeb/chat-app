<template>
  <div class="row">
    <div class="card-body">
      <div class="card-title">
        <h3>Chat Group</h3>
        <hr>
      </div>
      <div class="card-body">
        <div class="room" style="width: 100%;">
          <div class="room-header clearfix">
            <div class="room-about">
              <div class="room-title">Rooms</div>
              <div class="room-num-rooms">{{rooms.length}} Room(s)</div>
            </div>
            <i class="fa fa-th-list"></i>
          </div>
          <div class="room-list">
            <ul>
              <li v-for="room in rooms">
                <router-link v-bind:to="'/room/'+ room._id" refresh='true'>
                  <a>{{room.name}}</a>
                </router-link>
              </li>
            </ul>
          <router-view :key="$route.fullPath"></router-view>
          </div>
          <!-- end room-header -->

          <div class="card-footer">
            Create new Chat room
            <form @submit.prevent="createRoom">
              <div class="gorm-group pb-3">
                <label for="name">Name:</label>
                <input type="text" v-model="name" name="name" class="form-control">
              </div>
              <button type="submit" class="btn btn-success">Send</button>
            </form>
          </div>
          <!-- end room-create -->

          <!-- end room-list -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: ""
    };
  },
  methods: {
    createRoom() {
      let data = {
        name: this.name,
        type: "public"
      };
      this.$store.dispatch("chat/create", data);
    }
  },
  created() {
    this.$store.dispatch("chat/public");
  },
  computed: {
    rooms() {
      return this.$store.state.chat.rooms;
    }
  }
};
</script>

