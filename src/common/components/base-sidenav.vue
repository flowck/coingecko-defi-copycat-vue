<template>
  <aside class="sidenav">
    <nav>
      <ul>
        <li>
          <router-link :to="{ name: 'ListDeFiCoins' }">DeFi coins</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ListExchanges' }">Exchanges</router-link>
        </li>
      </ul>
    </nav>

    <div class="sidenav__version">
      <a
        :href="`https://gitlab.com/firmino.changani/coingecko-defi-copycat-vue/-/tags/v${app.version}`"
      >
        Version {{ app.version }}
      </a>
    </div>
  </aside>
</template>

<script>
import { mapState } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
  computed: {
    ...mapState(["app"]),
  },
});
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

      &.router-link-exact-active {
        color: $color-gecko;
      }
    }
  }

  &__version {
    width: 100%;
    bottom: 70px;
    font-size: 13px;
    position: absolute;
    text-align: center;
  }
}
</style>
