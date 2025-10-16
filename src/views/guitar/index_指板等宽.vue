<template>
  <div class="gibson-scale-tool">
    <div class="controls">
      <label
        >Root:
        <select v-model="root">
          <option v-for="n in noteNamesDisplay" :key="n" :value="n">
            {{ n }}
          </option>
        </select>
      </label>

      <label
        >Scale:
        <select v-model="scaleKey">
          <option v-for="(v, k) in scaleDefs" :key="k" :value="k">
            {{ k }}
          </option>
        </select>
      </label>

      <label
        >Frets:
        <input type="number" v-model.number="frets" min="5" max="24" />
      </label>

      <label
        >Show Flats
        <input type="checkbox" v-model="useFlats" />
      </label>

      <button @click="invertOrder = !invertOrder">Invert Strings</button>
    </div>

    <div class="fretboard-container">
      <div class="fretboard">
        <!-- 每根弦一行，包括空弦音（0品） -->
        <div
          v-for="(string, sIdx) in renderStrings"
          :key="'string-' + sIdx"
          class="string-line"
          :style="stringStyle(sIdx)"
        >
          <!-- 空弦音 / 琴枕 -->
          <div class="fret-slot nut">
            <div class="note-marker root">{{ string }}</div>
          </div>

          <!-- 品位 -->
          <div
            v-for="f in fretPositions"
            :key="f"
            class="fret-slot"
            :style="fretStyle(f)"
          >
            <div v-if="isDotMarker(f, sIdx)" class="fret-dot"></div>
            <div
              v-if="isScaleNote(string, f)"
              class="note-marker"
              :class="{ root: isRoot(string, f) }"
            >
              {{ noteAt(string, f) }}
            </div>
          </div>
        </div>

        <!-- 品位分隔线，从1品开始绘制 -->
        <div
          v-for="(f, index) in fretPositions"
          :key="'fret-' + f"
          class="fret-divider"
          :style="dividerStyle(f, index)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GibsonFretboard",
  data() {
    return {
      strings: ["E", "A", "D", "G", "B", "E"],
      noteNamesSharp: [
        "C",
        "C#",
        "D",
        "D#",
        "E",
        "F",
        "F#",
        "G",
        "G#",
        "A",
        "A#",
        "B"
      ],
      noteNamesFlat: [
        "C",
        "Db",
        "D",
        "Eb",
        "E",
        "F",
        "Gb",
        "G",
        "Ab",
        "A",
        "Bb",
        "B"
      ],
      useFlats: false,
      root: "C",
      scaleKey: "Major (Ionian)",
      frets: 19,
      invertOrder: false,
      scaleDefs: {
        "Major (Ionian)": [0, 2, 4, 5, 7, 9, 11],
        "Natural Minor (Aeolian)": [0, 2, 3, 5, 7, 8, 10],
        "Minor Pentatonic": [0, 3, 5, 7, 10],
        "Major Pentatonic": [0, 2, 4, 7, 9],
        Blues: [0, 3, 5, 6, 7, 10]
      }
    };
  },
  computed: {
    noteNamesDisplay() {
      return this.useFlats ? this.noteNamesFlat : this.noteNamesSharp;
    },
    noteToIndex() {
      const map = {};
      this.noteNamesSharp.forEach((n, i) => (map[n] = i));
      this.noteNamesFlat.forEach((n, i) => (map[n] = i));
      return map;
    },
    rootIndex() {
      return this.noteToIndex[this.root] ?? 9;
    },
    scaleSet() {
      const offsets = this.scaleDefs[this.scaleKey] || [0, 2, 4, 5, 7, 9, 11];
      return new Set(offsets.map((o) => (this.rootIndex + o) % 12));
    },
    fretPositions() {
      return Array.from({ length: this.frets }, (_, i) => i + 1);
    },
    renderStrings() {
      return this.invertOrder ? this.strings : [...this.strings].reverse()  ;
    }
  },
  methods: {
    noteAt(stringNote, fret) {
      const idx = this.noteToIndex[stringNote];
      const noteIdx = (fret > 0 ? idx + fret : idx) % 12;
      return this.useFlats
        ? this.noteNamesFlat[noteIdx]
        : this.noteNamesSharp[noteIdx];
    },
    isScaleNote(string, fret) {
      const n = this.noteToIndex[this.noteAt(string, fret)];
      return this.scaleSet.has(n);
    },
    isRoot(string, fret) {
      const n = this.noteToIndex[this.noteAt(string, fret)];
      return n === this.rootIndex;
    },
    stringStyle(idx) {
      // const thickness = [3, 3.5, 4, 3, 2.5, 2];
      const thickness = [1, 1.2, 2, 3, 3.5, 4];
      let orderThickness = !this.invertOrder  ? [1, 1.2, 2, 3, 3.5, 4] : thickness.reverse()
      
      return { height: orderThickness[idx % 6] + "px", background: "#ccc" };
    },
    fretStyle(fret) {
      return {
        width: "60px",
        minWidth: "60px",
        position: "relative",
        marginLeft: "0px"
      }; // 给品位和琴枕间加点距离
    },
    dividerStyle(fret, index) {
      if (index === 0) {
        return { left: -20 + fret * 60 + "px", width: "4px !important" }; // 分隔线从琴枕右边开始
      }
      return { left: -20 + fret * 60 + "px", width: "2px" }; // 分隔线从琴枕右边开始
    },
    isDotMarker(fret, stringIdx) {
      const dotFrets = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
      if (!dotFrets.includes(fret)) return false;
      if (fret === 12) return stringIdx === 1 || stringIdx === 3;
      return stringIdx === 2;
    }
  }
};
</script>

<style scoped>
.gibson-scale-tool {
  font-family: "Segoe UI", sans-serif;
  padding: 10px;
  background: #1a1a1a;
  color: #fff;
}
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
}
.controls label {
  font-size: 14px;
}
.fretboard-container {
  overflow-x: auto;
  padding: 10px;
  border-radius: 8px;
  background: linear-gradient(90deg, #3b2a1e, #4b3526, #3b2a1e);
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
}
.fretboard {
  position: relative;
  white-space: nowrap;
  /* padding-top: 20px; */
  /* padding-bottom: 20px; */
}
.string-line {
  display: flex;
  align-items: center;
  position: relative;
  margin: 24px 0;
  border-radius: 4px;
}
.fret-slot {
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.fret-slot.nut {
  background: #222;
  height: 20px;
  min-width: 40px;
} /* 琴枕宽度+右间距 */
.fret-divider {
  position: absolute;
  top: 0;
  bottom: 0;
  /* width: 2px; */
  background: #999;
  opacity: 0.7;
}
.fret-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
}
.note-marker {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  color: #fff;
  background: rgba(30, 144, 255, 0.8);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
}
.note-marker.root {
  background: rgba(255, 80, 80, 0.9);
}

input, select, button {
  color: #1a1a1a;
}
</style>
