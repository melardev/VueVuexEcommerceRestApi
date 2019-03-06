<template>
    <div :class="(showMessageBar?'':'hidden') + '  message-bar'">
        <div :class="messageClass">
            <Button bsStyle='link' class="btn btn-link close-btn" @click="closeMessageBar">
                <i class="fa fa-times"></i>
            </Button>
            <div>{{ currentMessage }}</div>
        </div>
    </div>
</template>

<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex';

    export default {
        name: 'Notifications',
        computed: {
            ...mapGetters('notifications', ['getMessages']),
            showMessageBar() {
                 return this.getMessages.message && this.getMessages.message.length > 0;
            },
            messageClass() {
                let mgClass = this.getMessages.messageClass;
                return "col-xs-12 panel panel-" + mgClass + " " + (this.showMessageBar ? "" : "hidden");
            },
            currentMessage() {
                return this.getMessages.message;
            }
        },
        methods: {
            ...mapActions('notifications', ['clearMessage']),
            closeMessageBar() {
                this.clearMessage();
            }
        }
    }
</script>

<style scoped>
    .message-bar {
        position: fixed;
        top: 0;
        left: 50%;
        width: 50%;
        min-height: 50px;
        z-index: 9999;
        margin-left: -25%;
    }

    .message-bar .close-btn {
        position: absolute;
        top: 0;
        right: 0;
        color: #FFF;
    }

    .message-bar .panel {
        border-color: transparent;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        padding-right: 25px;
    }

    .panel {
        padding: 10px 15px;
    }

    .panel-danger {
        background-color: #d9534f;
        color: #FFF;
    }

    .panel-success {
        background-color: #5cb85c;
        color: #FFF;
    }

    .panel-warning {
        background-color: #f0ad4e;
        color: #FFF;
    }
</style>
