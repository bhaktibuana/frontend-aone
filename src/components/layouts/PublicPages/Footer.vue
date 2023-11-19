<template>
  <a-layout-footer class="footer">
    <div class="wrapper">Copyright &copy; 2023 Aone</div>
  </a-layout-footer>
</template>

<style lang="scss" scoped>
.footer {
  padding: 0 !important;

  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: $size-24 0;
    background: $dark-primary;
    color: white;
    font-size: $size-14;
    line-height: $size-22;
  }
}
</style>
