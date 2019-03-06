<template>
    <div v-if="getToast.message !== ''" :class="getToast.class_name">
        {{getToast.message}}
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex';
    import {NotificationAction} from "../../store/types.actions";

    export default {
        name: "Notifications",
        methods: {
            ...mapMutations('notifications', {
                clearToast: NotificationAction.CLEAR_TOAST,
                clearDialog: NotificationAction.CLEAR_ALERT
            }),
        },
        computed: {
            // getToast is the same as this.$store.getters.getToast or as this.$store.state.toast
            ...mapGetters('notifications', ['getToast', 'getToastMessage']),

            alert() {

                return this.$store.getters['notifications/getAlert'];
            }
        },
        watch: {
            // WARNING: if you plan using this keyword, the functions should not be implemented with () =>{} but as below:
            alert: function () {
                if (this.$store.state.notifications.alert.message !== "") {
                    this.$toasted.show(this.$store.getters['notifications/getAlertMessage'], {
                        duration: 5000,
                        className: this.$store.state.notifications.alert.class_name
                    });
                    setTimeout(this.clearDialog, 3000);
                }
            },

            getToast: function () {
                if (this.getToastMessage !== "") {
                    setTimeout(() => this.$store.commit(NotificationAction.CLEAR_TOAST), 3000);
                }
            }
        }
    }
</script>

<style scoped>

</style>
