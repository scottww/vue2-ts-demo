<template>
  <div class="draw-container">
    <!-- 工具栏 -->
    <div class="toolbar">
      <select v-model="tool">
        <option value="line">直线</option>
        <option value="dash-line">虚线</option>
        <option value="rect">矩形</option>
        <option value="dash-rect">虚线矩形</option>
        <option value="circle">圆</option>
        <option value="dash-circle">虚线圆</option>
        <option value="text">文字</option>
        <option value="free">自由绘制</option>
        <option value="eraser">橡皮擦</option>
        <option value="select">选择/移动</option>
      </select>

      <label>
        填充模式
        <input type="checkbox" v-model="isFill" />
      </label>

      <label>
        线条粗细
        <input type="number" v-model.number="lineWidth" min="1" max="50" />
      </label>

      <label>
        文字大小
        <input type="number" v-model.number="fontSize" min="10" max="100" />
      </label>

      <label v-if="tool==='eraser'">
        橡皮擦大小
        <input type="number" v-model.number="eraserSize" min="5" max="100" />
      </label>

      <input type="color" v-model="strokeColor" title="边框颜色" />
      <input type="color" v-model="fillColor" title="填充颜色" />
      <input type="text" v-model="textValue" placeholder="输入文字" />

      <button @click="undo">撤销</button>
      <button @click="redo">重做</button>
      <button @click="clearCanvas">清空</button>
      <button @click="exportImage">导出图片</button>
    </div>

    <!-- 画布 -->
    <canvas
      ref="canvas"
      width="800"
      height="500"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
    ></canvas>
  </div>
</template>

<script>
export default {
  name: "DrawBoard",
  data() {
    return {
      ctx: null,
      tool: "line",
      strokeColor: "#000000",
      fillColor: "#ff0000",
      textValue: "Hello",
      isFill: true,
      lineWidth: 10,
      fontSize: 20,
      eraserSize: 20, // ✅ 橡皮擦大小

      startX: 0,
      startY: 0,
      drawingFlag: false,
      movingFlag: false,
      selectedShape: null,

      freePoints: [],
      eraserPoints: [],
      shapes: [],
      history: [],
      redoStack: []
    };
  },
  mounted() {
    this.ctx = this.$refs.canvas.getContext("2d");
    this.saveHistory();
  },
  methods: {
    getMousePos(e) {
      const rect = this.$refs.canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    },

    handleMouseDown(e) {
      const { x, y } = this.getMousePos(e);
      this.startX = x;
      this.startY = y;

      if (this.tool === "select") {
        this.selectedShape = this.getShapeAt(x, y);
        if (this.selectedShape) this.movingFlag = true;
      } else if (this.tool === "free") {
        this.drawingFlag = true;
        this.freePoints = [{ x, y }];
      } else if (this.tool === "eraser") {
        this.drawingFlag = true;
        this.eraserPoints = [{ x, y }];
      } else {
        this.drawingFlag = true;
      }
    },

    handleMouseMove(e) {
      const { x, y } = this.getMousePos(e);

      if (this.movingFlag && this.selectedShape) {
        const dx = x - this.startX;
        const dy = y - this.startY;
        this.startX = x;
        this.startY = y;

        this.selectedShape.x += dx;
        this.selectedShape.y += dy;
        if (this.selectedShape.type === "line") {
          this.selectedShape.x2 += dx;
          this.selectedShape.y2 += dy;
        } else if (this.selectedShape.type === "free") {
          this.selectedShape.points.forEach(p => {
            p.x += dx;
            p.y += dy;
          });
        }
        this.redraw();
      } else if (this.drawingFlag) {
        if (this.tool === "free") {
          this.freePoints.push({ x, y });
          this.redraw();
          this.drawFreePreview();
        } else if (this.tool === "eraser") {
          this.eraserPoints.push({ x, y });
          this.redraw();
          this.drawEraserPreview(x, y);
        } else {
          this.redraw();
          this.drawPreview(x, y);
        }
      }
    },

    handleMouseUp() {
      if (this.tool === "free") {
        this.addFreeShape();
      } else if (this.tool === "eraser") {
        this.addEraserShape();
      } else if (this.tool !== "select") {
        const { x, y } = this.getMousePos(event);
        this.addShape(x, y);
      }
      this.drawingFlag = false;
      this.movingFlag = false;
      this.selectedShape = null;
      this.freePoints = [];
      this.eraserPoints = [];
      this.saveHistory();
    },

    // ✅ 橡皮擦半透明预览 + 连续擦除
    drawEraserPreview() {
      const ctx = this.ctx;
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = this.eraserSize;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.strokeStyle = "rgba(200,200,200,0.3)";
      ctx.globalCompositeOperation = "destination-out";
      ctx.moveTo(this.eraserPoints[0].x, this.eraserPoints[0].y);
      for (let i = 1; i < this.eraserPoints.length; i++) {
        ctx.lineTo(this.eraserPoints[i].x, this.eraserPoints[i].y);
      }
      ctx.stroke();
      ctx.restore();
    },

    addEraserShape() {
      if (this.eraserPoints.length > 1) {
        this.shapes.push({
          type: "eraser",
          points: [...this.eraserPoints],
          lineWidth: this.eraserSize
        });
      }
    },

    drawShape(shape) {
      const ctx = this.ctx;
      ctx.beginPath();

      if (shape.type === "eraser") {
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = shape.lineWidth;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.moveTo(shape.points[0].x, shape.points[0].y);
        shape.points.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.stroke();
        ctx.restore();
        return;
      }

      ctx.lineWidth = shape.lineWidth;
      ctx.strokeStyle = shape.strokeColor;
      ctx.fillStyle = shape.fillColor;
      ctx.setLineDash(shape.dash ? [5, 5] : []);

      switch (shape.type) {
        case "line":
          ctx.moveTo(shape.x, shape.y);
          ctx.lineTo(shape.x2, shape.y2);
          ctx.stroke();
          break;
        case "rect":
          ctx.rect(shape.x, shape.y, shape.w, shape.h);
          if (shape.isFill) ctx.fill();
          ctx.stroke();
          break;
        case "circle":
          ctx.arc(shape.x, shape.y, shape.r, 0, Math.PI * 2);
          if (shape.isFill) ctx.fill();
          ctx.stroke();
          break;
        case "free":
          ctx.moveTo(shape.points[0].x, shape.points[0].y);
          shape.points.forEach(p => ctx.lineTo(p.x, p.y));
          ctx.stroke();
          break;
        case "text":
          ctx.font = `${shape.fontSize}px Arial`;
          ctx.fillStyle = shape.strokeColor;
          ctx.fillText(shape.text, shape.x, shape.y);
          break;
      }
      ctx.setLineDash([]);
    },

    drawPreview(x, y) {
      const ctx = this.ctx;
      ctx.beginPath();
      ctx.lineWidth = this.lineWidth;
      ctx.strokeStyle = this.strokeColor;
      ctx.fillStyle = this.fillColor;
      switch (this.tool) {
        case "line":
        case "dash-line":
          ctx.setLineDash(this.tool.includes("dash") ? [5, 5] : []);
          ctx.moveTo(this.startX, this.startY);
          ctx.lineTo(x, y);
          ctx.stroke();
          break;
        case "rect":
        case "dash-rect":
          ctx.setLineDash(this.tool.includes("dash") ? [5, 5] : []);
          ctx.rect(this.startX, this.startY, x - this.startX, y - this.startY);
          if (this.isFill) ctx.fill();
          ctx.stroke();
          break;
        case "circle":
        case "dash-circle":
          ctx.setLineDash(this.tool.includes("dash") ? [5, 5] : []);
          const r = Math.sqrt(
            Math.pow(x - this.startX, 2) + Math.pow(y - this.startY, 2)
          );
          ctx.arc(this.startX, this.startY, r, 0, Math.PI * 2);
          if (this.isFill) ctx.fill();
          ctx.stroke();
          break;
      }
      ctx.setLineDash([]);
    },

    drawFreePreview() {
      const ctx = this.ctx;
      ctx.beginPath();
      ctx.lineWidth = this.lineWidth;
      ctx.strokeStyle = this.strokeColor;
      ctx.moveTo(this.freePoints[0].x, this.freePoints[0].y);
      this.freePoints.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.stroke();
    },

    addShape(x, y) {
      let shape = null;
      switch (this.tool) {
        case "line":
        case "dash-line":
          shape = {
            type: "line",
            x: this.startX,
            y: this.startY,
            x2: x,
            y2: y,
            strokeColor: this.strokeColor,
            lineWidth: this.lineWidth,
            dash: this.tool.includes("dash")
          };
          break;
        case "rect":
        case "dash-rect":
          shape = {
            type: "rect",
            x: this.startX,
            y: this.startY,
            w: x - this.startX,
            h: y - this.startY,
            strokeColor: this.strokeColor,
            fillColor: this.fillColor,
            lineWidth: this.lineWidth,
            isFill: this.isFill,
            dash: this.tool.includes("dash")
          };
          break;
        case "circle":
        case "dash-circle":
          shape = {
            type: "circle",
            x: this.startX,
            y: this.startY,
            r: Math.sqrt(Math.pow(x - this.startX, 2) + Math.pow(y - this.startY, 2)),
            strokeColor: this.strokeColor,
            fillColor: this.fillColor,
            lineWidth: this.lineWidth,
            isFill: this.isFill,
            dash: this.tool.includes("dash")
          };
          break;
        case "text":
          shape = {
            type: "text",
            x: this.startX,
            y: this.startY,
            text: this.textValue,
            strokeColor: this.strokeColor,
            fontSize: this.fontSize
          };
          break;
      }
      if (shape) {
        this.shapes.push(shape);
        this.redraw();
      }
    },

    addFreeShape() {
      if (this.freePoints.length > 1) {
        this.shapes.push({
          type: "free",
          points: [...this.freePoints],
          strokeColor: this.strokeColor,
          lineWidth: this.lineWidth
        });
        this.redraw();
      }
      this.freePoints = [];
    },

    redraw() {
      this.ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
      this.shapes.forEach(shape => this.drawShape(shape));
    },

    clearCanvas() {
      this.shapes = [];
      this.redraw();
      this.saveHistory();
    },

    exportImage() {
      const url = this.$refs.canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = "drawing.png";
      a.click();
    },

    saveHistory() {
      this.history.push(JSON.stringify(this.shapes));
      this.redoStack = [];
    },

    undo() {
      if (this.history.length > 1) {
        this.redoStack.push(this.history.pop());
        this.shapes = JSON.parse(this.history[this.history.length - 1]);
        this.redraw();
      }
    },

    redo() {
      if (this.redoStack.length > 0) {
        const data = this.redoStack.pop();
        this.history.push(data);
        this.shapes = JSON.parse(data);
        this.redraw();
      }
    },

    getShapeAt(x, y) {
      for (let i = this.shapes.length - 1; i >= 0; i--) {
        const shape = this.shapes[i];
        if (shape.type === "rect") {
          if (x >= shape.x && x <= shape.x + shape.w && y >= shape.y && y <= shape.y + shape.h)
            return shape;
        } else if (shape.type === "circle") {
          const dx = x - shape.x;
          const dy = y - shape.y;
          if (Math.sqrt(dx * dx + dy * dy) <= shape.r) return shape;
        } else if (shape.type === "line") {
          const dist = Math.abs((shape.y2 - shape.y) * x - (shape.x2 - shape.x) * y + shape.x2 * shape.y - shape.y2 * shape.x)
            / Math.sqrt(Math.pow(shape.y2 - shape.y, 2) + Math.pow(shape.x2 - shape.x, 2));
          if (dist < 5) return shape;
        } else if (shape.type === "text") {
          if (x >= shape.x && x <= shape.x + shape.text.length * shape.fontSize * 0.6 &&
              y <= shape.y && y >= shape.y - shape.fontSize) return shape;
        } else if (shape.type === "free") {
          for (let p of shape.points) {
            if (Math.abs(p.x - x) < 5 && Math.abs(p.y - y) < 5) return shape;
          }
        }
      }
      return null;
    }
  }
};
</script>

<style scoped>
.draw-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.toolbar {
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
canvas {
  border: 1px solid #ccc;
  cursor: crosshair;
}
</style>
