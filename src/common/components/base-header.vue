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

<style scoped lang="scss">
.header {
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  z-index: 100;
  display: flex;
  position: fixed;
  padding: 5px 10px;
  justify-content: space-between;
  background-color: $color-white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  &__logo {
    a {
      display: flex;
      align-items: center;
    }

    &:hover img {
      border: 1px solid $color-gecko;
    }

    img {
      width: 100px;
      padding: 5px;
      border-radius: 3px;
      border: 1px solid transparent;
    }
  }

  &__links {
    display: flex;
    align-items: center;

    ul {
      display: flex;
      font-size: 14px;
      list-style: none;

      li {
        margin-left: 20px;
      }
    }
  }
}
</style>
