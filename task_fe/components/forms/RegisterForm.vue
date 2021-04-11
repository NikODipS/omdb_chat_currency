<template>
  <div class="pt-4">
    <ValidationObserver ref="observer" disabled>
      <form action="/" @submit.prevent="registerUser">
        <div class="w-full grid grid-cols-2 gap-4">
          <div class="col-span-2">
            <InputGroup label="Email">
              <ValidationProvider
                v-slot="{ errors, invalid }"
                name="email"
                rules="required|email"
              >
                <input
                  v-model="email"
                  type="text"
                  placeholder="email"
                  name="email"
                >
                <div v-if="invalid" class="text-xs text-red-500">
                  {{ errors[0] }}
                </div>
              </ValidationProvider>
            </InputGroup>
          </div>

          <div>
            <InputGroup label="Release Year">
              <ValidationProvider
                v-slot="{ errors, invalid }"
                name="firstName"
                rules="required"
              >
                <input
                  v-model="firstName"
                  type="text"
                  placeholder="Name"
                  name="firstName"
                >
                <div v-if="invalid" class="text-xs text-red-500">
                  {{ errors[0] }}
                </div>
              </ValidationProvider>
            </InputGroup>
          </div>
          <div>
            <InputGroup label="Release Year">
              <ValidationProvider
                v-slot="{ errors, invalid }"
                name="lastName"
                rules="required"
              >
                <input
                  v-model="lastName"
                  type="text"
                  placeholder="Surname"
                  name="lastName"
                >
                <div v-if="invalid" class="text-xs text-red-500">
                  {{ errors[0] }}
                </div>
              </ValidationProvider>
            </InputGroup>
          </div>

          <div class="col-span-2 flex justify-end items-center">
            <button
              class="py-2 px-8 bg-blue-400 rounded-md w-full md:w-auto hover:bg-blue-600 font-bold hover:text-white transition-colors duration-200 focus:outline-none"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import {
  ValidationObserver,
  ValidationProvider
} from 'vee-validate/dist/vee-validate.full'
export default {
  components: { ValidationProvider, ValidationObserver },
  data () {
    return {
      firstName: '',
      lastName: '',
      email: ''
    }
  },
  computed: {
    err () {
      return this.errors
    }
  },
  methods: {
    registerUser (e) {
      this.$refs.observer.validate().then((valid) => {
        if (valid) {
          this.$emit('submitting', {
            email: this.email,
            name: this.firstName,
            surname: this.lastName
          })
        }
      })
      // if (!this.$guard.register(this.email, this.name, this.surname)) {
      //   e.preventDefault()
      // } else {
      //   this.$emit('registered')
      // }
    }
  }
}
</script>

<style></style>
