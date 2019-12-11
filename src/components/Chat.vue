<template>
  <div class="chat container">
    <h2 class="center teal-text">My Chat</h2>
    <div class="car">
      <div class="card-content">
        <ul class="messages" v-chat-scroll>
          <li v-for="message in messages" :key="message.id">
            <span class="teal-text">{{message.name}}</span>
            <span class="grey-text text-darken-3 msg-content msg-content">{{message.content}}</span>
            <span class="grey-text time">{{message.timestamp}}</span>
          </li>
        </ul>
      </div>
      <div class="card-action">
        <NewMessage :name="name" />
      </div>
    </div>
  </div>
</template>

<script>
import NewMessage from "./NewMessage";
import db from "../firebase/init";
import moment from "moment";
export default {
  name: "Chat",
  props: ["name"],
  components: { NewMessage },
  data() {
    return {
      messages: []
    };
  },
  created() {
    let ref = db.collection("messages").orderBy("timestamp");
    //referenca baze i onSnapshot prati promjene u bazi te dodaje obj kad je 'added'
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        const { doc } = change;
        if (change.type === "added") {
          let obj = {};
          obj.id = doc.id;
          obj.name = doc.data().name;
          obj.content = doc.data().content;
          obj.timestamp = moment(doc.data().timestamp).format("lll");

          this.messages.push(obj);
        }
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.chat {
  .messages {
    max-height: 300px;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 3px;
    }
    &::-webkit-scrollbar-track {
      background: #ddd;
    }
    &::-webkit-scrollbar-thumb {
      background: #aaa;
    }

    li {
      padding: 5px 0;
    }
  }
  h2 {
    font-size: 2.6em;
    margin-bottom: 40px;
  }
  span {
    font-size: 1.4em;
  }
  .msg-content {
    margin-left: 10px;
  }
  .time {
    display: block;
    font-size: 0.9em;
  }
}
</style>