<template>
  <aside class="sidenav">
    <nav>
      <ul>
        <li>
          <router-link to="#">DeFi coins</router-link>
        </li>
        <li>
          <router-link to="#">Decentralized Exchange</router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style lang="scss" scoped>
.sidenav {
  ul li {
    width: 100%;
    font-size: 14px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    a {
      display: block;
      padding: 12px 10px;
    }
  }
}
</style>
