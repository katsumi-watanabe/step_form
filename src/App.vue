<template>
  <Header />
  <Contact />
  <Footer />
</template>

<script>
import Header from '@/components/Header.vue'
import Contact from '@/components/Contact.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Contact,
    Footer,
  },
}
</script>

<style>
</style>