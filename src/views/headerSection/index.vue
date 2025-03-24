<template>
  <div class="header-section-demo">
    <HeaderSection title="标题">
      <el-button @click="handleImport" type="text" size="mini"
        >导入</el-button
      >
      <el-button @click="handleExport" type="text" size="mini"
        >导出</el-button
      >
      <el-button @click="handleDownload" type="text" size="mini"
        >下载模版</el-button
      >
      <el-button  plain  icon="el-icon-refresh"  @click="refresh()" size="mini"></el-button>
    </HeaderSection>
  </div>
</template>

<script>
import HeaderSection from "@/components/HeaderSection.vue";
export default {
  name: "HeaderSectionDemo",
  components: {
    HeaderSection
  },
  data() {
    return {};
  },
  methods: {
    handleImport() {
      console.log("handleImport ...");
    },
    handleExport() {
      console.log("handleExport ...");
    },
    handleDownload() {
      console.log("handleDownload ...");
    },
    refresh() {
      console.log("refresh ...");
    }
  }
};
</script>

<style lang="scss" scoped>
.header-section-demo {
}
</style>
