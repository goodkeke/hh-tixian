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
