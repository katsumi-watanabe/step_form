<template>
    <div class="result-page">
      <div class="result-content">
        <h1 class="result-title">結果画面</h1>
        <p class="result-message">おめでとうございます！</p>
        <p class="result-description">素晴らしい結果を受け取りました。</p>
        <router-link to="/" class="cta-button">もう一度診断する！</router-link>
      </div>
    </div>
  </template>
  
  <style scoped>
  .result-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    background: linear-gradient(to bottom, #41b883, #32a672);
  }
  
  .result-content {
    text-align: center;
  }
  
  .result-title {
    font-size: 48px;
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 20px;
  }
  
  .result-message {
    font-size: 24px;
    font-weight: bold;
    color: #ffffff;
    animation: scaleIn 1s ease-in-out;
  }
  
  .result-description {
    font-size: 18px;
    color: #ffffff;
    margin-top: 10px;
    animation: fadeIn 1s ease-in-out;
    margin-bottom: 30px;
  }

  .cta-button {
  padding: 15px 40px;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  background-color: #fff;
  color: #41b883;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #ddd;
}
  
  @keyframes scaleIn {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  </style>
  