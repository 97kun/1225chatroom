<template>
    <div id="app">
        <HNav></HNav>
        <transition name="approuterbox">
            <keep-alive>
                <router-view class="approuterview"></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
    var timer = null;

    export default {
        name: 'app',
        data() {
            return {
                // warm:"",
            }
        },
        components: {},
        created() {
            console.log("%c请你善良，看见bug默默走开就好","font-size:35px;color:blue")
            function myFun(result) {
                let cityName = result.name;
                let url = "http://wthrcdn.etouch.cn/weather_mini?city=" + cityName;
                fetch(url)
                    .then(re => re.json())
                    .then(data => {
                        console.log(data);
                        this.$store.state.city = data.data.city;
                        this.$store.state.ganmao = data.data.ganmao;
                        this.$store.state.wendu=data.data.wendu;
                    }).then(() => {
                    var l = this.$store.state.ganmao.length;
                    var count = 1;
                    this.$store.state.warm = "";
                    timer = setInterval(function () {
                        this.$store.state.warm += (this.$store.state.ganmao).substring(count - 1, count);
                        count++;
                        // console.log("0.0")
                        if (count > l) {
                            clearInterval(timer)
                        }
                    }.bind(this), 200);
                    // console.log(this.l)
                })
            }

            var myCity = new BMap.LocalCity();
            myCity.get(myFun.bind(this));
           /* fetch("https://wd1843699377fzpwpa.wilddogio.com/name.json",{
                method:"POST",
                header:{
                    "Content-type":'application/json'
                },
                body:JSON.stringify(this.$store.state)

            }).then(re=>re.json()).then(data=>{
                console.log(data)
            })
                .catch(error =>console.log(err))*/
        }
    }
</script>

<style>
    @import "animatecss/animation.css";
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    /*html,body{
      height: 100%;
    }*/
    .header {
        background: rgba(0, 0, 0, 0.7);
    }

    a, span, label {
        display: inline-block;
        text-decoration: none;
    }

    h1 {
        font-weight: 400;
    }

    .approuterview {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
    }

    .approuterbox-enter-active {
        animation: mymove 1s;
    }

    .approuterbox-leave-active {
        animation: mymove 1s reverse;
    }

    @keyframes mymove {
        0% {
            transform: translate(-100%, 0);
            opacity: 0
        }
        100% {
            transform: translate(0, 0);
            opacity: 1
        }
    }
</style>
