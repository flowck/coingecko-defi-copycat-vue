<template>
  <aside class="sidenav">
    <nav>
      <ul>
        <li>
          <router-link :to="{ name: 'CoinsListAll' }">DeFi coins</router-link>
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

<style lang="scss" scoped src="./sidenav.scss"></style>
