<template>
    <div>
      <p>確認</p>
      <div style="width:400px">
        <RadarChart 
          v-bind:chartId="'my-radar-chart'"
          v-bind:cssClasses="'my-radar-chart-container'" />
      </div>
    </div>
</template>