<template>
    <div id="ceshi">
        0.0
        {{$route.name}}
        {{$route.params.id}}
        {{$route.query}}
        <button @click="shuaxing()">click</button>
    </div>
</template>

<script>
    export default {
        name: "chuanzhiceshi",
        data(){
            return {
                // a:this.$route.params.id
            }
        },
        methods:{
            shuaxing(){
                this.$router.go(0);
            }
        },
        created() {
            console.log('0.0')
        },
        mounted() {
            console.log('0.0')
        }
    }
</script>

<style scoped>
#ceshi{
    padding-top: 100px;
}
</style>