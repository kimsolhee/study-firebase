<template>
  <v-container>
    <v-form ref="form" class="pt-10" style="top: 43px;position: relative;">
      <v-text-field v-model="form.title" label="제목"/>
      <v-textarea v-model="form.content" label="내용" rows="5"/>
      <v-text-field v-model="form.writer" label="작성자"/>
      <div class="text-right">
        <template v-if="id != null && id != ''">
          <v-btn color="success" @click="updatePost">
            수정
          </v-btn>
          <v-btn color="error ml-3" @click="deletePost">
            삭제
          </v-btn>
        </template>
        <v-btn v-else color="primary" @click="createPost">
          등록
        </v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script>
import { ref, push, set, get, child, update } from "firebase/database";

export default {
  created() {
    this.id = this.$route.query.id;
    if(this.id != null && this.id != '') {
      this.doDetail();
    }
  },
  data () {
    return {
      form: {
        title: '',
        content: '',
        writer: '',
      },
      id: null,
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
    },
    doDetail() {
      const db = ref(this.$db);

      this.$nextTick(() => {
        get(child(db, `posts/${this.id}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              this.form.title = data.title;
              this.form.content = data.content;
              this.form.writer = data.writer;
            } else {
              alert("데이터가 존재하지 않습니다.");
            }
          })
          .catch((error) => {
            console.error("데이터 조회 실패:", error);
            alert("게시글 로딩 중 오류가 발생했습니다.");
          });
      });
    },
    updatePost() {
      const db = ref(this.$db, `posts/${this.id}`);

      const updatedData = {
        title: this.form.title,
        content: this.form.content,
        writer: this.form.writer,
        updatedAt: new Date().toISOString()
      };

      const updates = {};
      updates['/posts/' + this.id] = updatedData;

      update(db, updatedData);
    },
    deletePost() {
      const db = ref(this.$db, `posts/${this.id}`);
      set(db, null); 

      this.$router.push('/');
    }
  }
}
</script>