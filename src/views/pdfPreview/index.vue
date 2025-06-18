<template>
  <div class="pdf-preview-demo">
    <!-- <PdfPreview :pdfUrl="pdfLink" />
    <PdfLinkViewer :pdfUrl="pdfLink" />
    <PdfViewer :pdfUrl="pdfLink" /> -->
    <PdfViewerDialog :pdfUrl="pdfLink2" />
    <PdfViewerDialogBase :pdfUrl="pdfLink2"  />
  </div>
</template>

<script>
import PdfPreview from "./PdfPreview.vue";
import PdfLinkViewer from "./PdfLinkViewer.vue";
import PdfViewer from "./PdfViewer.vue";
import PdfViewerDialog from "./PdfViewerDialog.vue";
import PdfViewerDialogBase from "./PdfViewerDialogBase.vue";

export default {
  components: { PdfPreview, PdfLinkViewer, PdfViewer, PdfViewerDialog, PdfViewerDialogBase },
  data() {
    return {
      pdfLink: "/data/frontend_overview.pdf",
      pdfLink2: "/data/frontend_overview.pdf"
    };
  }
};
</script>

<styles lang="scss" scoped>
.pdf-preview-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // height: 100vh;
  margin-bottom: 120px;
  overflow: auto;
}
</styles>
