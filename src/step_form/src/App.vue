<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Contact from '@/components/Contact.vue';
import Login from '@/components/Login.vue';
import Signup from '@/components/Signup.vue';
import Contact2 from '@/components/Contact2.vue';
import Result from '@/components/Result.vue';
import Footer from '@/components/Footer.vue';
import HistoryGraph from '@/components/MyPage/HistoryGraph.vue';

export default {
  name: 'App',
  components: {
    Header,
    Contact,
    Contact2,
    Result,
    Footer,
    Login,
    Signup,
    HistoryGraph,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap');
*,*::before,*::after{box-sizing:border-box}body,h1,h2,h3,h4,p,figure,blockquote,dl,dd{margin:0}ul[role="list"],ol[role="list"]{list-style:none}html:focus-within{scroll-behavior:smooth}body{min-height:100vh;text-rendering:optimizeSpeed;line-height:1.5}a:not([class]){text-decoration-skip-ink:auto}img,picture{max-width:100%;display:block}input,button,textarea,select{font:inherit}@media(prefers-reduced-motion:reduce){html:focus-within{scroll-behavior:auto}*,*::before,*::after{animation-duration:.01ms !important;animation-iteration-count:1 !important;transition-duration:.01ms !important;scroll-behavior:auto !important}}button{ background-color: transparent;border: none;cursor: pointer;outline: none;padding: 0;appearance: none;}
html{
  font-size: 62.5%;
  scroll-behavior: smooth;
  font-family: 'Noto Sans JP', sans-serif;
}
.container{
  width: 100%;
  margin: auto;
  padding-left: 15px;
  padding-right: 15px;
}
h3,p{
  line-height: 1.62;
  text-align: justify;
  text-justify: inter-ideograph;
  font-feature-settings: "palt" 1;
}
h3{
  font-size: 16px;
  font-size: 1.0rem;
}
p{
  font-size: 14px;
  font-size: 1.0rem;
}
button.template_color {
  background-color: #41b883;
  color: #fff;
}
button.template_color span {
  color: #fff;
}
.template_color_text {
  color: #41b883;
}

.mt10{ margin-top: 10px; }
.mt20{ margin-top: 20px; }
@media (min-width: 960px) {
  .container{
    width: 800px;
  }
}
</style>