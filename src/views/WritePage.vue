<template>
  <v-container>
    <v-form ref="form" class="pt-10" style="top: 43px;position: relative;">
      <v-text-field v-model="form.title" label="제목"/>
      <v-textarea v-model="form.content" label="내용" rows="5"/>
      <v-text-field v-model="form.writer" label="작성자"/>
      <div class="text-right">
        <v-btn color="primary" @click="createPost">
          제출
        </v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script>
import { ref, push, set } from "firebase/database";

export default {
  data () {
    return {
      form: {
        title: '',
        content: '',
        writer: '',
      }
    }
  },
  methods: {
    createPost() {
      const postData = {
        title: this.form.title,
        content: this.form.content,
        writer: this.form.writer,
        createdAt: new Date().toISOString()
      };

      try {
        const postsRef = ref(this.$db, 'posts');
        const newPostRef = push(postsRef);

        this.$nextTick(() => {
          set(newPostRef, postData);
          alert("게시글이 등록되었습니다.");

          // 입력 초기화
          this.form.title = '';
          this.form.content = '';
          this.form.writer = '';
        })
      } catch (error) {
        console.error("게시글 등록 실패:", error);
        alert("게시글 등록 중 오류가 발생했습니다.");
      }
    }
  }
}
</script>