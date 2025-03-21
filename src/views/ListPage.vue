<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              제목
            </th>
            <th class="text-left">
              내용
            </th>
            <th class="text-left">
              작성자
            </th>
            <th class="text-left">
              작성일
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in poastList" :key="item.name">
            <td>{{ item.title }}</td>
            <td>{{ item.ctnt }}</td>
            <td>{{ item.writer }}</td>
            <td>{{ item.crtDt }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div style="display: flex; justify-content: flex-end;">
      <v-btn depressed color="primary" @click="writePost">
        글쓰기
      </v-btn>
    </div>
  </div> 
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        poastList: [],
      }
    },
    methods: {
      writePost() {
        this.$router.push('/write');
      }
    }
  }
</script>
