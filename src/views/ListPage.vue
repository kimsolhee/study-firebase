<template>
  <div style="top: 110px; position: relative;">
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">아이디</th>
            <th class="text-center">제목 </th>
            <th class="text-center">내용</th>
            <th class="text-center">작성자</th>
            <th class="text-center">작성일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in postList" :key="item.id" class="text-center">
            <td>{{ item.id }}</td>
            <td @click="doDetail(item.id)">{{ item.title }}</td>
            <td>{{ item.content }}</td>
            <td>{{ item.writer }}</td>
            <td>{{ item.createdAt }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div style="display: flex; justify-content: flex-end;" class="pt-9">
      <v-btn depressed color="primary" @click="doWrite">
        글쓰기
      </v-btn>
    </div>
  </div> 
</template>

<script>
import { ref, onValue } from "firebase/database";

export default {
  name: 'HelloWorld',
  created() {
    this.doList();
  },
  data () {
    return {
      postList: [],
    }
  },
  methods: {
    doWrite() {
      this.$router.push('/write');
    },
    doList() {
      this.postList = [];
      const postsRef = ref(this.$db, 'posts');
      
      onValue(postsRef, (snapshot) => {
        const data = snapshot.val();
        for (const id in data) {
          this.postList.push({
            id,
            ...data[id]
          });
        }
      });
    },
    doDetail(id) {
      this.$router.push({ path: '/write', query: { id } });
    }
  }
}
</script>
