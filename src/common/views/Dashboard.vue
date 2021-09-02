<template>
  <loading v-show="isLoading" />
  <main-header>
    <template v-slot:currency-selector>
      <currency-selector></currency-selector>
    </template>
  </main-header>
  <main class="dashboard">
    <sidenav class="dashboard__sidenav"></sidenav>
    <section class="dashboard__views">
      <!-- VIEW TITLE -->
      <h1 class="dashboard__views__title" v-if="viewTitle">{{ viewTitle }}</h1>

      <!-- VIEWS -->
      <router-view />
    </section>
  </main>
</template>

<script lang="ts">
import { mapState } from "vuex";
import { defineComponent } from "vue";
import mainHeader from "../components/main-header/main-header.vue";

export default defineComponent({
  components: { mainHeader },
  name: "Dashboard",
  computed: {
    ...mapState(["isLoading"]),
    viewTitle(): string {
      return this.$route.meta.viewTitle as string;
    },
  },
});
</script>

<style lang="scss" scoped>
.dashboard {
  margin-top: 48px;
  $sidenav-width: 200px;

  &__sidenav {
    left: 0;
    height: 100%;
    position: fixed;
    width: $sidenav-width;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }

  &__views {
    padding: 20px;
    margin-left: $sidenav-width;
    min-height: calc(100vh - 48px);
    width: calc(100% - #{$sidenav-width});

    &__title {
      color: $color-title;
      margin-bottom: 20px;
      font-family: "Lato-Bold";
    }
  }
}
</style>
