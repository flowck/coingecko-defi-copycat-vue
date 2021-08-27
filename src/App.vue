<template>
  <aside>
    <div></div>
    <nav></nav>
    <app-demo></app-demo>
  </aside>
  <router-view />
</template>

<script>
import Demo from "@/common/components/Demo.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: { "app-demo": Demo },
});
</script>

<style lang="scss"></style>
