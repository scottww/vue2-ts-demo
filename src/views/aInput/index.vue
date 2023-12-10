<template>
    <div class="a-input-demo">
        <an-input size="lg" disabled v-model="inputValue" placeholder="请输入" @input="handleInput">
        </an-input>
    </div>
</template>

<script>
import AnInput from "@/components/re-antdv/AnInput.vue";

export default {
    name: 'AInputDemo',
    components: {
        AnInput
    },
    data() {
        return {
            inputValue: ''
        }
    },
    methods: {
        handleInput(v) {
            console.log('input框的值', v);

            this.inputValue = v;
        }
    }
}
</script>