<template>
    <div class="row">
        <div class="col-md-6 col-md-offset-3 col-xs-10 col-xs-offset-1">
            <form id="register-form" role="form">
                <h3 class="text-center">Register</h3>
                <div class="form-group">
                    <input type="text" name="first_name" id="first_name" class="form-control" placeholder="First name"
                           value=""
                           v-model="first_name">
                </div>
                <div class="form-group">
                    <input type="text" name="last_name" id="last_name" class="form-control" placeholder="Last name"
                           value=""
                           v-model="last_name">
                </div>
                <div class="form-group">
                    <input type="text" name="username" id="username" class="form-control" placeholder="Username"
                           value=""
                           v-model="username">
                </div>
                <div class="form-group">
                    <input type="email" name="email" id="email" class="form-control" placeholder="Email Address"
                           value=""
                           v-model="email">
                </div>
                <div class="form-group">
                    <input type="password" name="password" id="password" class="form-control" placeholder="Password"
                           v-model="password">
                </div>
                <div class="form-group">
                    <input type="password" name="password_confirmation" id="password_confirmation" class="form-control"
                           placeholder="Password"
                           v-model="password_confirmation">
                </div>
                <div class="form-group">
                    <button class="btn btn-success" style="width: 100%" @click.prevent="register"
                            :disabled="isLoading">
                        <i v-if="isLoading" class="fa fa-spinner fa-spin"></i>
                        Register
                    </button>
                </div>
                <div class="form-group">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="text-center">
                                <router-link to="/login"><a>Login</a></router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import {AuthAction} from "@/store/types.actions";

    export default {
        data() {
            return {
                first_name: '',
                last_name: '',
                username: '',
                email: '',
                password: '',
                password_confirmation: '',
                isLoading: false
            }
        },
        methods: {
            ...mapActions('auth', {registerUser: AuthAction.remote.REGISTER}),
            ...mapActions('notifications', ['clearMessage', 'addMessage']),
            register() {
                this.isLoading = true;
                let data = {
                    first_name: this.first_name,
                    last_name: this.last_name,
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                };
                // this.$store.dispatch([AuthAction.remote.REGISTER]) will be now this.registerUser
                this.registerUser(data).then(() => {
                    this.clearMessage();
                    this.$router.push({name: 'product-list'});
                })
                    .catch((error) => {
                        // console.log('register error', error);
                        let message_obj = {
                            message: error.message,
                            messageClass: "danger",
                            autoClose: true
                        };
                        this.addMessage(message_obj);
                    }).then(() => {
                    this.isLoading = false
                })
            }
        }
    }
</script>
