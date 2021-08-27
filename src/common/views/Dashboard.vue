<template>
  <base-header />
  <main class="dashboard">
    <base-sidenav class="dashboard__sidenav"></base-sidenav>
    <section class="dashboard__views">
      <!-- VIEW TITLE -->
      <h1 class="dashboard__views__title" v-if="viewTitle">{{ viewTitle }}</h1>

      <!-- VIEWS -->
      <router-view />
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseHeader from "@/common/components/base-header.vue";
import BaseSidenav from "@/common/components/base-sidenav.vue";

export default defineComponent({
  name: "Dashboard",
  components: { BaseHeader, BaseSidenav },
  computed: {
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
      font-family: "Lato-Bold";
    }
  }
}
</style>
