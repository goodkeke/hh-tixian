<template>
    <div class="container">
        <transition name='fade'>
        <router-view></router-view>
        </transition>
    </div>
</template>
<script>
    export default {
        name: "container",

    }
</script>

<style lang="scss" scoped>
    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.5);
        }
        100% {
            transform: scale(1);
        }
    }
</style>