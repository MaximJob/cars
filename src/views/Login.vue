<template>
  <div class="login">
    <h2>Логин</h2>

    <form @submit.prevent="submit()">
      <v-text-field
        v-model.trim="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>
      <v-text-field
        v-model.trim="password"
        :error-messages="passwordErrors"
        label="Пароль"
        required
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      ></v-text-field>

      <v-btn type="submit" class="btnSubmit">Логин</v-btn>
      <div @click="toRegistration()" class="swap">
        <h5>Нет аккаунта? Зарегистрироваться.</h5>
      </div>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8) },
  },

  data: () => ({
    email: "",
    password: "",
  }),

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("E-mail должен быть валидным.");
      !this.$v.email.required && errors.push("E-mail отсутствует.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Минимальная длина пароля 8 символов.");
      !this.$v.password.required && errors.push("Пароль отсутствует.");
      return errors;
    },
  },

  methods: {
    submit() {
      if (!this.$v.$invalid) {
        const info = {
          email: this.email,
          password: this.password,
        };
        this.$store.dispatch("login", info);
      }
    },
    toRegistration() {
      this.$router.push("/registration");
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 10vh;
}

form {
  width: 30%;
  justify-content: center;
  align-items: center;
  padding: 30px 40px 20px 40px;
  margin: 0 auto;
  min-width: 400px;
  background-color: #fbfaf7;
  border-radius: 30px;
  display: grid;
  grid-template: 70px 70px 90px 30px / 1fr;
  box-shadow: 0 14px 20px 6px #999999;
}

h2 {
  font-size: 70px;
  font-weight: 500;
  color: #999999;
  text-align: center;
  margin: 0 0 60px 0;
}

label img {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}

.swap {
  display: flex;
  justify-content: center;
}

h5 {
  font-weight: 600;
  color: gray;
  position: relative;
  cursor: pointer;
}

h5::after {
  content: "";
  width: 0;
  height: 2px;
  position: absolute;
  background-color: #333333;
  left: 0;
  bottom: -2px;
  transition: all 0.4s;
}

h5:hover::after {
  width: 100%;
  transition: all 0.4s;
}

.btnSubmit {
  border-radius: 20px;
}

@media screen and (max-width: 768px) {
  h2 {
    font-size: 50px;
  }
}

@media screen and (max-width: 480px) {
  form {
    width: 30%;
    padding: 30px 40px 20px 40px;
    min-width: 300px;
  }

  h2 {
    font-size: 40px;
  }
}
</style>
