<template>
  <div class="container">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="username">
        <Input type="text" v-model="formInline.username" placeholder="Username">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formInline.password" placeholder="Password">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
      </FormItem>
    </Form>
    <div v-if="$store.state.auth.user">{{$store.state.auth.user.username || ''}}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formInline: {
          username: '',
          password: ''
        },
        ruleInline: {
          username: [
            { required: true, message: 'Please fill in the username name', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please fill in the password.', trigger: 'blur' },
            { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
            this.login()
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      async login() {
        try {
          let response = await this.$auth.loginWith('local', { data: this.formInline })
          console.log(response)
        } catch (err) {
          console.log(err)
        }
      }
      // async asyncData({ $axios }) {
      //   const data = await $axios.$get('/courses')
      //   console.log(data)
      //   return {
      //     courses: data.data
      //   }
      // },
    }
  }
</script>
<style>
  .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
</style>