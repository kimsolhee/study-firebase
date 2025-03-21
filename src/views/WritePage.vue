<template>
  <v-container>
    <v-form ref="form" class="pt-10" style="top: 43px;position: relative;">
      <!-- 제목 -->
      <v-text-field v-model="form.title" label="제목"/>
      <!-- 내용 -->
      <v-textarea v-model="form.content" label="내용" rows="5"/>
      <!-- 작성자 -->
      <v-text-field v-model="form.author" label="작성자"/>
      <div class="text-right">
          <!-- 제출 버튼 -->
        <v-btn color="primary" @click="submitForm">
          제출
        </v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          title: '',
          ctnt: '',
          writer: ''
        }
      }
    },
    methods: {
      submitForm() {
        
      }
    }
  }
</script>