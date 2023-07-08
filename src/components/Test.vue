<template>
    <div>
      <h1>Firestore Test</h1>
      <li v-for="(item, index) in data" :key="index">
        {{ item }}
      </li>
    </div>
  </template>
  
  <script>
  import { collection, getDocs } from 'firebase/firestore';
  import db from '@/firebase.js';
  
  export default {
    data() {
      return {
        data: [],
      };
    },
    mounted: async function() {
      const querySnapshot = await getDocs(collection(db, 'users'));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().email}`);
        this.data.push(doc.data().email);
      });
    },
  };
  </script>
  