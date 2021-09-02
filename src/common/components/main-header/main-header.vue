<template>
  <header class="header">
    <div class="header__logo">
      <router-link :to="{ name: 'Dashboard' }">
        <img src="/img/coingecko-logo.webp" alt="CoinGecko" />
      </router-link>
    </div>

    <nav class="header__links">
      <ul>
        <li>
          <a
            href="https://gitlab.com/firmino.changani/coingecko-defi-copycat-vue/-/blob/develop/README.md"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="https://gitlab.com/firmino.changani/coingecko-defi-copycat-vue/-/tree/develop/docs"
          >
            Documentation
          </a>
        </li>
        <li>
          <a
            href="https://gitlab.com/firmino.changani/coingecko-defi-copycat-vue"
          >
            Gitlab
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
});
</script>

<style scoped lang="scss" src="./main-header.scss"></style>
