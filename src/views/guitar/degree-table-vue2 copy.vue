<template>
  <div class="degree-table">
    <h2>根音 → 度数速查表（含升降）</h2>

    <div class="controls">
      <label>根音: 
        <select v-model="root">
          <option v-for="r in roots" :key="r" :value="r">{{ r }}</option>
        </select>
      </label>

      <label style="margin-left:12px">显示：
        <select v-model="mode">
          <option value="major">大调（1 2 3 4 5 6 7）</option>
          <option value="minor">自然小调（1 2 ♭3 4 5 ♭6 ♭7）</option>
          <option value="blues">布鲁斯（1 ♭3 4 ♭5 5 ♭7）</option>
        </select>
      </label>

      <button @click="copyText" style="margin-left:12px">复制文本</button>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>度数</th>
          <th>音名</th>
          <th>半音（相对根）</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in displayDegrees" :key="idx">
          <td>{{ item.degreeLabel }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.semitone }}</td>
        </tr>
      </tbody>
    </table>

    <p class="note">注：本组件用字母序（度数）确定音名的字母，再根据目标半音选择升降记号（可显示双升/双降）。</p>
  </div>
</template>

<script>
// Vue 2 单文件组件 (Options API)
export default {
  name: 'DegreeTable',
  data() {
    return {
      // 12 常见根音（用升记号和降记号都列出常见写法）
      roots: ['C','C#','Db','D','D#','Eb','E','F','F#','Gb','G','G#','Ab','A','A#','Bb','B'],
      root: 'E',
      mode: 'major', // major | minor | blues
      // 自然字母到自然半音值
      letterBase: { C:0, D:2, E:4, F:5, G:7, A:9, B:11 },
      // 大调度数相对半音
      intervals: {
        major: [0,2,4,5,7,9,11],
        minor: [0,2,3,5,7,8,10], // 自然小调
        blues: [0,3,5,6,7,10] // 1 ♭3 4 ♭5 5 ♭7  -> 用特别处理输出度数标签
      }
    }
  },
  computed: {
    // 解析 root 到标准化 semitone 与 letter
    rootInfo() {
      const r = this.root
      // 处理可能的写法（如 Db -> D b）
      const letter = r[0].toUpperCase()
      // semitone value for displayed root (support # or b)
      let accidental = r.slice(1) || ''
      let base = this.letterBase[letter]
      let semitone = base
      if (accidental.includes('#')) semitone = (base + accidental.length) % 12
      else if (accidental.includes('b')) semitone = (base - accidental.length + 12) % 12
      return { letter, semitone }
    },
    displayDegrees() {
      if (this.mode === 'blues') return this.buildBlues()
      return this.buildScale(this.mode)
    }
  },
  methods: {
    // 根据度数索引返回下一个字母（按音乐字母循环）
    letterStep(fromLetter, step) {
      const letters = ['C','D','E','F','G','A','B']
      let i = letters.indexOf(fromLetter)
      return letters[(i + step) % 7]
    },
    // 将半音差转换成升降记号字符串（支持 ## 或 bb）
    accidentalString(diff) {
      if (diff === 0) return ''
      if (diff === 1) return '#'
      if (diff === 2) return '##'
      if (diff === -1) return 'b'
      if (diff === -2) return 'bb'
      // 极少见的情况，展示 +/-N
      return (diff > 0 ? '+' + diff : diff)
    },
    // 规范化到 -6..+6 范围
    normDiff(n) {
      if (n > 6) return n - 12
      return n
    },
    // 给定目标半音和目标字母，计算合适的升降并格式化名称
    nameForLetterAndSemitone(letter, targetSemitone) {
      const base = this.letterBase[letter]
      // 计算差值（注意取模 12 并转成 -6..+6）
      let diff = ((targetSemitone - base) + 12) % 12
      diff = this.normDiff(diff)
      return letter + this.accidentalString(diff)
    },
    // 构建大调或小调表
    buildScale(which) {
      const ints = this.intervals[which]
      const rootLetter = this.rootInfo.letter
      const rootSemitone = this.rootInfo.semitone
      const out = []
      for (let i = 0; i < ints.length; i++) {
        const degreeIndex = i // 0=1, 1=2...
        const degreeLabel = (i+1).toString()
        const interval = ints[i]
        const target = (rootSemitone + interval) % 12
        const letter = this.letterStep(rootLetter, degreeIndex)
        const name = this.nameForLetterAndSemitone(letter, target)
        out.push({ degreeLabel, name, semitone: target })
      }
      return out
    },
    // 构建布鲁斯音阶展示（特殊度数标签）
    buildBlues() {
      const rootLetter = this.rootInfo.letter
      const rootSemitone = this.rootInfo.semitone
      // 度数标签和相对半音（相对于根）
      const degrees = [
        { label: '1', interval: 0, step:0 },
        { label: '♭3', interval: 3, step:2 }, // ♭3 用字母第三个
        { label: '4', interval:5, step:3 },
        { label: '♭5', interval:6, step:4 },
        { label: '5', interval:7, step:4 },
        { label: '♭7', interval:10, step:6 }
      ]
      const out = []
      for (let d of degrees) {
        const target = (rootSemitone + d.interval) % 12
        const letter = this.letterStep(rootLetter, d.step)
        const name = this.nameForLetterAndSemitone(letter, target)
        out.push({ degreeLabel: d.label, name, semitone: target })
      }
      return out
    },
    // 复制文本到剪贴板
    copyText() {
      const lines = this.displayDegrees.map(d => `${d.degreeLabel}: ${d.name} (semitone ${d.semitone})`)
      const text = `Root ${this.root} — ${this.mode}\n` + lines.join('\n')
      // 使用现代剪贴板 API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          alert('已复制到剪贴板')
        }, () => { alert('复制失败') })
      } else {
        // 回退方法
        const ta = document.createElement('textarea')
        ta.value = text
        document.body.appendChild(ta)
        ta.select()
        try { document.execCommand('copy'); alert('已复制到剪贴板') } catch(e) { alert('复制失败') }
        document.body.removeChild(ta)
      }
    }
  }
}
</script>

<style scoped>
.degree-table { font-family: Arial, Helvetica, sans-serif; max-width:760px; }
.controls { margin-bottom:10px; }
.table { width:100%; border-collapse:collapse; margin-top:8px }
.table th, .table td { border:1px solid #e0e0e0; padding:8px; text-align:left }
.note { color:#666; font-size:13px; margin-top:8px }
h2 {
  color: #fff;
}
input, select, button {
  color: #1a1a1a;
}
</style>
