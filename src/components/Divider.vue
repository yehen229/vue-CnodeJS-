<template>
    <div class="divider"></div>
</template>

<script>
    export default {
        name: 'Divider'
    }
</script>

<style lang="scss" scoped>
    .divider {
        display: block;
        box-sizing: border-box;
        height: 1px;
        width: 100%;
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5;
        list-style: none;
        color: rgba(0, 0, 0, 0.65);
        background: #e8e8e8;
    }
</style>