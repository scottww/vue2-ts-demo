<template>
  <div class="scale-tool">
    <div class="controls">
      <label>Root:
        <select v-model="root">
          <option v-for="n in noteNamesDisplay" :key="n" :value="n">{{ n }}</option>
        </select>
      </label>

      <label>Scale:
        <select v-model="scaleKey">
          <option v-for="(v,k) in scaleDefs" :key="k" :value="k">{{ k }}</option>
        </select>
      </label>

      <label>Frets:
        <input type="number" v-model.number="frets" min="5" max="24" />
      </label>

      <label>
        Show Flats
        <input type="checkbox" v-model="useFlats" />
      </label>

      <button @click="invertOrder = !invertOrder">Invert Strings</button>
    </div>

    <div class="fretboard-wrapper">
      <div class="string-labels" v-if="!invertOrder">
        <div v-for="s in stringsDisplay" :key="s" class="string-label">{{ s }}</div>
      </div>

      <div class="fretboard">
        <div class="fret-header">
          <div class="nut">Nut</div>
          <div v-for="f in frets" :key="f" class="fret-number">{{ f }}</div>
        </div>

        <div class="strings">
          <div v-for="(string, sIdx) in renderStrings" :key="sIdx" class="string-row">
            <div class="string-name">{{ string }}</div>
            <div v-for="f in frets" :key="f" class="fret-cell" :class="cellClass(sIdx, f)">
              <div class="note-label">{{ noteAt(string, f) }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="string-labels" v-if="invertOrder">
        <div v-for="s in stringsDisplay" :key="s" class="string-label">{{ s }}</div>
      </div>
    </div>

    <div class="legend">
      <span class="legend-root">● Root</span>
      <span class="legend-scale">● Scale</span>
      <span class="legend-none">● Other</span>
    </div>
  </div>
</template>

<script>
// Vue 2 single-file component
export default {
  name: 'GuitarScaleFretboard',
  data() {
    return {
      // standard tuning low->high (6 -> 1): E A D G B E
      strings: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
      // display names for strings (just note name)
      stringsDisplay: ['E', 'A', 'D', 'G', 'B', 'E'],
      noteNamesSharp: ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'],
      noteNamesFlat:  ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'],
      useFlats: false,
      root: 'A',
      scaleKey: 'Minor Pentatonic',
      frets: 12,
      invertOrder: false,
      // scale definitions as semitone offsets from root
      scaleDefs: {
        'Major (Ionian)': [0,2,4,5,7,9,11],
        'Natural Minor (Aeolian)': [0,2,3,5,7,8,10],
        'Minor Pentatonic': [0,3,5,7,10],
        'Major Pentatonic': [0,2,4,7,9],
        'Blues': [0,3,5,6,7,10]
      }
    };
  },
  computed: {
    noteNamesDisplay() {
      return this.useFlats ? this.noteNamesFlat : this.noteNamesSharp;
    },
    noteToIndex() {
      const map = {};
      this.noteNamesSharp.forEach((n,i)=> map[n]=i);
      // also map flat names
      this.noteNamesFlat.forEach((n,i)=> map[n]=i);
      return map;
    },
    rootIndex() {
      // use sharp mapping by canonicalizing e.g. Bb -> A# mapping works via noteToIndex
      return this.noteToIndex[this.root] != null ? this.noteToIndex[this.root] : 9; // default A
    },
    scaleSet() {
      const offsets = this.scaleDefs[this.scaleKey] || [0,2,4,5,7,9,11];
      return new Set(offsets.map(o => (this.rootIndex + o) % 12));
    },
    rootPositions() {
      const r = (this.rootIndex%12+12)%12;
      return new Set([r]);
    },
    fretsRange() {
      // include 0 as open string
      const arr = [];
      for (let i=0;i<=this.frets;i++) arr.push(i);
      return arr;
    },
    renderStrings() {
      // if invertOrder true, reverse order (so high E on top)
      return this.invertOrder ? [...this.stringsDisplay].reverse() : this.stringsDisplay;
    }
  },
  methods: {
    noteAt(stringNote, fret) {
      // determine the note at given string and fret
      // stringNote is like 'E' or 'A' in stringsDisplay
      const base = stringNote.replace(/[^A-G#b]/g,'');
      const map = this.noteToIndex;
      let idx = map[base];
      if (idx == null) idx = 4; // E fallback
      const noteIdx = (idx + fret) % 12;
      return this.useFlats ? this.noteNamesFlat[noteIdx] : this.noteNamesSharp[noteIdx];
    },
    cellClass(sIdx, fret) {
      // compute note index for that string and fret
      const stringName = this.renderStrings[sIdx];
      const base = stringName.replace(/[^A-G#b]/g,'');
      const idx = this.noteToIndex[base];
      const noteIdx = (idx + fret) % 12;
      const inScale = this.scaleSet.has(noteIdx);
      const isRoot = this.rootPositions.has(noteIdx);
      return {
        'in-scale': inScale && !isRoot,
        'is-root': isRoot,
      };
    }
  }
};
</script>

<style scoped>
.scale-tool{font-family: Arial, Helvetica, sans-serif;}
.controls{display:flex;gap:12px;align-items:center;margin-bottom:12px;flex-wrap:wrap}
.controls label{font-size:14px}
.fretboard-wrapper{display:flex;align-items:flex-start}
.string-labels{display:flex;flex-direction:column;margin-right:8px}
.string-label{height:36px;display:flex;align-items:center;justify-content:center;width:36px;border:1px solid transparent}
.fretboard{overflow:auto}
.fret-header{display:flex;align-items:center}
.fret-number,.nut{width:56px;height:28px;display:flex;align-items:center;justify-content:center;border:1px solid #ddd}
.strings{display:flex;flex-direction:column}
.string-row{display:flex;align-items:center}
.string-name{width:36px;text-align:center}
.fret-cell{width:56px;height:36px;border:1px solid #eee;display:flex;align-items:center;justify-content:center;position:relative}
.note-label{font-size:12px}
.fret-cell.in-scale{background:rgba(60,130,240,0.15)}
.fret-cell.is-root{background:rgba(240,130,60,0.25);font-weight:700}
.legend{margin-top:10px}
.legend span{display:inline-block;margin-right:12px}
.legend .legend-root{color:rgb(240,130,60)}
.legend .legend-scale{color:rgb(60,130,240)}
.legend .legend-none{color:#999}
</style>
